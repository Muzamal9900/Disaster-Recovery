#!/usr/bin/env tsx
/**
 * Reddit GEO Blue Ocean Content Seeder
 *
 * CLI orchestrator for seeding r/Disaster_Recovery_Qld with 25 educational
 * posts, each with AI-generated visuals and strategic brand cross-links.
 *
 * Usage:
 *   npx tsx scripts/reddit-seed.ts                          # Post all 24
 *   npx tsx scripts/reddit-seed.ts --dry-run                # Generate content + images locally
 *   npx tsx scripts/reddit-seed.ts --verify-auth            # Test Reddit credentials
 *   npx tsx scripts/reddit-seed.ts --post-id <id>           # Post single entry
 *   npx tsx scripts/reddit-seed.ts --category water-damage  # Post one category
 *   npx tsx scripts/reddit-seed.ts --delay 600000           # Custom delay between posts (ms)
 */

import * as fs from 'fs';
import * as path from 'path';
import { POST_TEMPLATES, getPostById, getPostsByCategory } from '../src/lib/reddit/content/post-templates';
import { formatRedditPost, validateGEOCompliance } from '../src/lib/reddit/content/geo-formatter';
import { generateVisualForPost } from '../src/lib/reddit/visual/infographic-builder';
import { verifyAuth, submitTextPost, delay } from '../src/lib/reddit/reddit-client';
import type { RedditPostConfig, RedditPostResult, SeedRunAudit, PostCategory } from '../src/lib/reddit/reddit-types';

// ---------------------------------------------------------------------------
// Environment loading (project convention — no dotenv)
// ---------------------------------------------------------------------------

function loadEnvFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch { /* skip */ }
}

loadEnvFile(path.join(process.cwd(), '.env.local'));
loadEnvFile(path.join(process.cwd(), '.env'));

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

interface CLIArgs {
  dryRun: boolean;
  verifyAuth: boolean;
  postId: string | null;
  category: PostCategory | null;
  delayMs: number;
}

function parseArgs(argv: string[]): CLIArgs {
  const args: CLIArgs = {
    dryRun: false,
    verifyAuth: false,
    postId: null,
    category: null,
    delayMs: 600000, // 10 minutes default (Reddit new-subreddit limits)
  };

  for (let i = 2; i < argv.length; i++) {
    switch (argv[i]) {
      case '--dry-run':
        args.dryRun = true;
        break;
      case '--verify-auth':
        args.verifyAuth = true;
        break;
      case '--post-id':
        args.postId = argv[++i] || null;
        break;
      case '--category':
        args.category = (argv[++i] || null) as PostCategory | null;
        break;
      case '--delay':
        args.delayMs = parseInt(argv[++i], 10) || 600000;
        break;
    }
  }

  return args;
}

// ---------------------------------------------------------------------------
// Output directory management
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), 'data', 'reddit');
const POSTS_DIR = path.join(DATA_DIR, 'posts');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const AUDIT_DIR = path.join(DATA_DIR, 'audit');

function ensureDirs(): void {
  for (const dir of [DATA_DIR, POSTS_DIR, IMAGES_DIR, AUDIT_DIR]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Visual data defaults per image type (used when post doesn't provide data)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Post-specific process flow steps
// ---------------------------------------------------------------------------

function getProcessFlowSteps(postId: string): { step: string; description: string }[] {
  const flowMap: Record<string, { step: string; description: string }[]> = {
    '48-hour-critical-window': [
      { step: 'Document', description: 'Photo & video evidence within first hour' },
      { step: 'Extract', description: 'Emergency water removal using truck-mounted pumps' },
      { step: 'Dry', description: 'Deploy dehumidifiers and air movers for 48-72 hrs' },
      { step: 'Map', description: 'Thermal imaging and moisture meter verification' },
      { step: 'Report', description: 'Drying log and clearance certificate to insurer' },
    ],
    'maximise-insurance-claim': [
      { step: 'Document', description: 'Photograph all damage before any cleanup' },
      { step: 'Lodge', description: 'Submit claim within 24 hours with evidence' },
      { step: 'Scope', description: 'Get independent assessment using RestoreAssist' },
      { step: 'Negotiate', description: 'Compare insurer scope vs actual damage report' },
      { step: 'Settle', description: 'Agree final scope, approve contractor and begin work' },
    ],
    'diy-mould-removal-fails': [
      { step: 'Test', description: 'Air quality testing to identify mould species' },
      { step: 'Contain', description: 'Negative air pressure and plastic containment' },
      { step: 'Remove', description: 'HEPA-filtered removal of contaminated materials' },
      { step: 'Treat', description: 'Antimicrobial application to all affected surfaces' },
      { step: 'Verify', description: 'Post-remediation clearance testing to confirm safe levels' },
    ],
    'high-rise-water-damage': [
      { step: 'Alert', description: 'Notify strata manager and isolate water source' },
      { step: 'Contain', description: 'Prevent cascade to lower floors with barriers' },
      { step: 'Extract', description: 'Multi-floor water removal with pumps and vacuums' },
      { step: 'Dry', description: 'Floor-by-floor structural drying with monitoring' },
      { step: 'Restore', description: 'Repair affected common areas and individual lots' },
    ],
  };

  return flowMap[postId] || [
    { step: 'Assess', description: 'Initial damage assessment and documentation' },
    { step: 'Respond', description: 'Emergency make-safe and water extraction' },
    { step: 'Restore', description: 'Professional drying and remediation' },
    { step: 'Verify', description: 'Moisture mapping and quality assurance' },
    { step: 'Close', description: 'Insurance sign-off and handover' },
  ];
}

// ---------------------------------------------------------------------------
// Post-specific cost breakdown data
// ---------------------------------------------------------------------------

function getCostBreakdownItems(postId: string): { label: string; cost: string; percentage: number }[] {
  const costMap: Record<string, { label: string; cost: string; percentage: number }[]> = {
    'fire-damage-restoration-au': [
      { label: 'Smoke & Soot Removal', cost: '$3,000–$8,000', percentage: 25 },
      { label: 'Structural Assessment', cost: '$2,000–$5,000', percentage: 15 },
      { label: 'Content Cleaning', cost: '$1,500–$4,000', percentage: 15 },
      { label: 'Odour Treatment', cost: '$1,000–$3,000', percentage: 10 },
      { label: 'Structural Rebuild', cost: '$5,000–$20,000', percentage: 30 },
      { label: 'Testing & Clearance', cost: '$500–$2,000', percentage: 5 },
    ],
    'real-costs-water-damage-2025': [
      { label: 'Water Extraction', cost: '$1,500–$3,000', percentage: 15 },
      { label: 'Structural Drying', cost: '$2,500–$5,000', percentage: 25 },
      { label: 'Mould Prevention', cost: '$1,000–$3,000', percentage: 15 },
      { label: 'Content Restoration', cost: '$800–$2,500', percentage: 10 },
      { label: 'Repairs & Rebuild', cost: '$3,000–$12,000', percentage: 30 },
      { label: 'Reports & Compliance', cost: '$500–$1,500', percentage: 5 },
    ],
  };

  return costMap[postId] || [
    { label: 'Water Extraction', cost: '$1,500–$3,000', percentage: 20 },
    { label: 'Structural Drying', cost: '$2,500–$5,000', percentage: 30 },
    { label: 'Mould Remediation', cost: '$1,000–$4,000', percentage: 20 },
    { label: 'Repairs & Rebuild', cost: '$3,000–$10,000', percentage: 25 },
    { label: 'Testing & Reports', cost: '$500–$1,500', percentage: 5 },
  ];
}

// ---------------------------------------------------------------------------
// Post-specific comparison table data
// ---------------------------------------------------------------------------

function getComparisonTableData(config: RedditPostConfig): { headers: string[]; rows: string[][] } {
  const tableMap: Record<string, { headers: string[]; rows: string[][] }> = {
    'flood-plain-water-categories': {
      headers: ['Category', 'Source', 'Health Risk', 'Restoration'],
      rows: [
        ['Cat 1 — Clean', 'Burst pipe, supply line', 'Low', 'Extract & dry (24-48 hrs)'],
        ['Cat 2 — Grey', 'Washing machine, dishwasher', 'Moderate', 'Antimicrobial + drying (48-72 hrs)'],
        ['Cat 3 — Black', 'Sewage, floodwater, storm surge', 'Severe', 'Full remediation + disposal (5-14 days)'],
        ['Cat 2→3 Escalation', 'Untreated grey water (48+ hrs)', 'Severe', 'Reclassified — full hazmat protocol'],
        ['Flood Plain Risk', 'Overland flow in Australia', 'Cat 3 default', 'Immediate extraction critical'],
      ],
    },
    'sudden-vs-gradual-damage': {
      headers: ['Factor', 'Sudden Damage', 'Gradual Damage'],
      rows: [
        ['Example', 'Burst pipe, storm, appliance failure', 'Slow leak, rising damp, condensation'],
        ['Insurance Coverage', 'Typically covered in full', 'Often excluded or limited'],
        ['Claim Processing', 'Average 21 days (ICA 2024)', 'Frequently disputed — 60+ days'],
        ['Evidence Required', 'Photos + emergency call log', 'Maintenance records + expert report'],
        ['Avg Claim Value', '$7,500 (ICA 2024)', '$2,000–$5,000 (if covered)'],
        ['Key Legal Case', 'CGU v Porcelain [2019] HCA 38', 'Clarified flood vs storm definitions'],
      ],
    },
    'iicrc-s500-vs-s520': {
      headers: ['Standard', 'IICRC S500', 'IICRC S520'],
      rows: [
        ['Focus', 'Water damage restoration', 'Mould remediation'],
        ['Trigger', 'Any water intrusion event', 'Visible mould or spore count > threshold'],
        ['Key Process', 'Extraction → drying → monitoring', 'Containment → removal → clearance'],
        ['Equipment', 'Dehumidifiers, air movers, meters', 'HEPA filters, neg-air, PPE'],
        ['Timeline', '3-5 days typical dry-out', '5-14 days depending on severity'],
        ['Certification Cost', '$1,500–$2,500 per module', '$2,000–$3,000 per module'],
      ],
    },
    'commercial-kitchen-recovery': {
      headers: ['Factor', 'Residential', 'Commercial Kitchen'],
      rows: [
        ['Downtime Cost', '$0 (inconvenience)', '$5,000–$15,000/day revenue loss'],
        ['Compliance', 'Building code only', 'Food Safety Act + council health regs'],
        ['Contamination', 'Mould & bacteria standard', 'Grease traps, hood systems, cold storage'],
        ['Equipment at Risk', 'Appliances, furniture', 'Walk-in freezers, combi ovens ($50K+)'],
        ['Restoration Priority', 'Structure first', 'Get kitchen operational ASAP'],
        ['Insurance Complexity', 'Standard home policy', 'Business interruption + public liability'],
      ],
    },
    'professional-vs-diy-comparison': {
      headers: ['Factor', 'DIY Approach', 'Professional Restoration'],
      rows: [
        ['Initial Cost', '$200–$500 (fans, towels)', '$2,500–$8,000 (full service)'],
        ['Mould Risk', '40-65% recurrence rate', '5-10% recurrence rate'],
        ['Hidden Damage', 'Often missed entirely', 'Thermal imaging detects 100%'],
        ['Insurance Accepted', '60-70% of the time', '95%+ acceptance rate'],
        ['Property Value Impact', 'Up to 23% loss if botched', 'Full value preserved'],
        ['Total Cost (1 year)', '$5,000–$50,000 with callbacks', '$2,500–$8,000 one-time'],
      ],
    },
    'emergency-make-safe-2750-guide': {
      headers: ['Requirement', 'Authority to Commence', 'Insurer Reimbursement'],
      rows: [
        ['Site Address', 'Required', 'Must match policy'],
        ['Client Details', 'Required', 'Must match policyholder'],
        ['Event Description', 'Required', 'Aligns with claim'],
        ['Date of Incidence', 'Required', 'Establishes timeline'],
        ['Inspection Report', 'Required', 'Evidence of damage'],
        ['Scope of Works', 'Required', 'Defines approved works'],
        ['Cost Estimate', 'Required ($2,750)', 'Substantiates amount'],
        ['Signatures', 'Both parties', 'Legal binding'],
      ],
    },
  };

  if (tableMap[config.id]) return tableMap[config.id];

  // Fallback — use geoSignals
  return {
    headers: ['Statistic', 'Year', 'Source'],
    rows: config.geoSignals.slice(0, 6).map((s) => [s.statistic, `${s.year}`, s.source]),
  };
}

function getDefaultVisualData(config: RedditPostConfig): unknown {
  switch (config.imageType) {
    case 'stat-infographic':
      return {
        stats: config.geoSignals.slice(0, 5).map((s) => ({
          label: `${s.source} (${s.year})`,
          value: s.statistic,
        })),
      };
    case 'comparison-table':
      return getComparisonTableData(config);
    case 'process-flow':
      return { steps: getProcessFlowSteps(config.id) };
    case 'cost-breakdown':
      return { items: getCostBreakdownItems(config.id) };
    case 'hero-banner':
    default:
      return {};
  }
}

// ---------------------------------------------------------------------------
// Single post pipeline
// ---------------------------------------------------------------------------

async function processPost(
  config: RedditPostConfig,
  dryRun: boolean,
): Promise<RedditPostResult> {
  const startTime = new Date().toISOString();
  console.log(`\n--- Processing: ${config.title} ---`);
  console.log(`  Category: ${config.category} | Image: ${config.imageType}`);

  const result: RedditPostResult = {
    postId: config.id,
    redditId: null,
    url: null,
    title: config.title,
    category: config.category,
    submittedAt: startTime,
    imageGenerated: false,
    imagePath: null,
    success: false,
  };

  try {
    // 1. Build markdown body
    console.log('  [1/4] Formatting post body...');
    const body = formatRedditPost(config);

    // Validate GEO compliance
    const compliance = validateGEOCompliance(body);
    if (!compliance.valid) {
      console.log(`  [!] GEO compliance issues (non-blocking):`);
      compliance.issues.forEach((issue) => console.log(`      - ${issue}`));
    }

    // 2. Generate image
    console.log(`  [2/4] Generating ${config.imageType} image...`);
    try {
      const visualData = getDefaultVisualData(config);
      const imagePath = await generateVisualForPost(
        config.id,
        config.imageType,
        config.category,
        config.title,
        visualData,
        IMAGES_DIR,
      );
      result.imageGenerated = true;
      result.imagePath = imagePath;
      console.log(`  [2/4] Image saved: ${imagePath}`);
    } catch (imgErr: unknown) {
      const msg = imgErr instanceof Error ? imgErr.message : String(imgErr);
      console.log(`  [2/4] Image generation failed (non-blocking): ${msg}`);
    }

    // 3. Save content locally
    console.log('  [3/4] Saving post content locally...');
    const postFile = path.join(POSTS_DIR, `${config.id}.json`);
    fs.writeFileSync(
      postFile,
      JSON.stringify(
        {
          id: config.id,
          title: config.title,
          category: config.category,
          brands: config.brands,
          imageType: config.imageType,
          body,
          geoCompliance: compliance,
          generatedAt: startTime,
        },
        null,
        2,
      ),
    );
    console.log(`  [3/4] Saved: ${postFile}`);

    // 4. Submit to Reddit (or skip in dry-run)
    if (dryRun) {
      console.log('  [4/4] DRY RUN — skipping Reddit submission');
      result.success = true;
    } else {
      console.log('  [4/4] Submitting to Reddit...');
      const submission = await submitTextPost(config.title, body);
      result.redditId = submission.id;
      result.url = submission.url;
      result.success = true;
      console.log(`  [4/4] Posted: ${submission.url}`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    result.error = msg;
    console.error(`  [ERROR] ${msg}`);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  console.log('=== Reddit GEO Blue Ocean Content Seeder ===');
  console.log(`Mode: ${args.dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Delay between posts: ${args.delayMs / 1000}s`);
  console.log('');

  // --- Verify auth mode ---
  if (args.verifyAuth) {
    console.log('Verifying Reddit credentials...');
    const authResult = await verifyAuth();
    if (authResult.success) {
      console.log(`Authenticated as: /u/${authResult.username}`);
    } else {
      console.error(`Auth failed: ${authResult.error}`);
      process.exit(1);
    }
    return;
  }

  // --- Determine which posts to process ---
  let posts: RedditPostConfig[];

  if (args.postId) {
    const post = getPostById(args.postId);
    if (!post) {
      console.error(`Post not found: ${args.postId}`);
      console.log('Available IDs:', POST_TEMPLATES.map((p) => p.id).join(', '));
      process.exit(1);
    }
    posts = [post];
  } else if (args.category) {
    posts = getPostsByCategory(args.category);
    if (posts.length === 0) {
      console.error(`No posts found for category: ${args.category}`);
      process.exit(1);
    }
  } else {
    posts = POST_TEMPLATES;
  }

  console.log(`Posts to process: ${posts.length}`);

  // --- Auth check (skip for dry-run) ---
  if (!args.dryRun) {
    console.log('Verifying Reddit credentials...');
    const authResult = await verifyAuth();
    if (!authResult.success) {
      console.error(`Auth failed: ${authResult.error}`);
      console.error('Run with --verify-auth to debug, or use --dry-run to generate locally.');
      process.exit(1);
    }
    console.log(`Authenticated as: /u/${authResult.username}`);
  }

  // --- Ensure output directories ---
  ensureDirs();

  // --- Process posts ---
  const audit: SeedRunAudit = {
    runId: `seed-${new Date().toISOString().replace(/[:.]/g, '-')}`,
    startedAt: new Date().toISOString(),
    completedAt: null,
    dryRun: args.dryRun,
    results: [],
    totalPosts: posts.length,
    successCount: 0,
    failureCount: 0,
  };

  for (let i = 0; i < posts.length; i++) {
    const result = await processPost(posts[i], args.dryRun);
    audit.results.push(result);

    if (result.success) {
      audit.successCount++;
    } else {
      audit.failureCount++;
    }

    // Rate-limit delay between posts (skip in dry-run and after last post)
    if (i < posts.length - 1 && !args.dryRun) {
      console.log(`\n  Waiting ${args.delayMs / 1000}s before next post...`);
      await delay(args.delayMs);
    }
  }

  audit.completedAt = new Date().toISOString();

  // --- Write audit log ---
  const auditFile = path.join(AUDIT_DIR, `${audit.runId}.json`);
  fs.writeFileSync(auditFile, JSON.stringify(audit, null, 2));
  console.log(`\n=== Seed Complete ===`);
  console.log(`Total: ${audit.totalPosts} | Success: ${audit.successCount} | Failed: ${audit.failureCount}`);
  console.log(`Audit log: ${auditFile}`);

  if (audit.failureCount > 0) {
    console.log('\nFailed posts:');
    audit.results
      .filter((r) => !r.success)
      .forEach((r) => console.log(`  - ${r.postId}: ${r.error}`));
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message || err);
  process.exit(1);
});
