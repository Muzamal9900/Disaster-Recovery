#!/usr/bin/env node

/**
 * Phase 4 Antigravity Conversion Script
 * Converts root-level and unique pages (non-portal).
 *
 * Two conversion strategies:
 *   1. Simple content pages → full AgContentPageTemplate replacement
 *   2. Complex/interactive pages → AG chrome wrapper (preserves original content)
 *
 * Usage:
 *   node scripts/convert-phase4-to-antigravity.js --dry-run
 *   node scripts/convert-phase4-to-antigravity.js
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const APP_DIR = path.join(__dirname, '..', 'app');

let totalConverted = 0;

/* -------------------------------------------------------------------------- */
/* Utilities                                                                   */
/* -------------------------------------------------------------------------- */

function getAllPageFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllPageFiles(fullPath));
    } else if (entry.name === 'page.tsx') {
      results.push(fullPath);
    }
  }
  return results;
}

function isAlreadyConverted(content) {
  return (
    content.includes('AgContentPageTemplate') ||
    content.includes('AgGuidePageTemplate') ||
    content.includes('AgPricingPageTemplate') ||
    content.includes('AgFAQPageTemplate') ||
    content.includes('AgLegalPageTemplate') ||
    content.includes('AntigravityServicePageTemplate') ||
    content.includes('AntigravityHomePage') ||
    content.includes('FEATURE_FLAGS.ANTIGRAVITY_UI')
  );
}

function extractMetadataTitle(content) {
  // Use double-quote match first to avoid escaped single-quote issues
  const dqMatch = content.match(/title:\s*"([^"]+?)(?:\s*\|[^"]*)?"/);
  if (dqMatch) return dqMatch[1].trim();
  // Single-quote match — handle escaped quotes
  const sqMatch = content.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
  if (sqMatch) return sqMatch[1].replace(/\\'/g, "'").split('|')[0].trim();
  // Template literal
  const tlMatch = content.match(/title:\s*`([^`]+?)(?:\s*\|[^`]*)?`/);
  if (tlMatch) return tlMatch[1].trim();
  // h1
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) return h1Match[1].trim();
  return null;
}

function extractMetadataDescription(content) {
  const dqMatch = content.match(/description:\s*"([^"]{10,}?)"/);
  if (dqMatch) return dqMatch[1].trim();
  const sqMatch = content.match(/description:\s*'((?:[^'\\]|\\.){10,}?)'/);
  if (sqMatch) return sqMatch[1].replace(/\\'/g, "'").trim();
  return null;
}

function extractFunctionName(content) {
  const match = content.match(/export\s+default\s+function\s+(\w+)/);
  return match ? match[1] : 'Page';
}

function extractMetadataBlock(content) {
  const match = content.match(/(export\s+const\s+metadata[\s\S]*?};)/);
  return match ? match[1] : null;
}

function sanitiseForDoubleQuotes(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getRelativePath(filePath) {
  return path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
}

/* -------------------------------------------------------------------------- */
/* Simple content page conversion (full replacement)                           */
/* -------------------------------------------------------------------------- */

const SIMPLE_PAGES = {
  'about':                        { icon: 'Users', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'careers':                      { icon: 'Briefcase', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'View Openings', ctaHref: '/careers' },
  'testimonials':                 { icon: 'Star', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', cta: 'Get Help Now', ctaHref: '/claim/start' },
  'emergency-guide':              { icon: 'Siren', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', cta: 'Get Emergency Help', ctaHref: '/claim/start' },
  'privacy':                      { icon: 'Lock', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'terms':                        { icon: 'FileText', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'cookies':                      { icon: 'FileText', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'government-funding':           { icon: 'Building2', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Learn More', ctaHref: '/contact' },
  'investors':                    { icon: 'TrendingUp', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', cta: 'Investor Contact', ctaHref: '/contact' },
  'media':                        { icon: 'Newspaper', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Media Contact', ctaHref: '/contact' },
  'get-help':                     { icon: 'LifeBuoy', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', cta: 'Get Help Now', ctaHref: '/claim/start' },
  'coming-soon':                  { icon: 'Clock', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'is-it-covered':                { icon: 'Shield', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Check Coverage', ctaHref: '/claim/start' },
  'why-first':                    { icon: 'Award', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Get Started', ctaHref: '/claim/start' },
  'why-independent-professionals':{ icon: 'Users', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Find Professionals', ctaHref: '/services' },
  'sitemap':                      { icon: 'Map', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Home', ctaHref: '/' },
  'sitemap-page':                 { icon: 'Map', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Home', ctaHref: '/' },
  'events':                       { icon: 'Calendar', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Contact Us', ctaHref: '/contact' },
  'client':                       { icon: 'User', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Get Started', ctaHref: '/claim/start' },
  'contractors':                  { icon: 'Wrench', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', cta: 'Apply Now', ctaHref: '/contractor/apply' },
  'simple':                       { icon: 'Zap', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Get Started', ctaHref: '/' },
  'test':                         { icon: 'Zap', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', cta: 'Get Started', ctaHref: '/' },
};

function convertSimplePages() {
  let converted = 0;

  for (const [slug, config] of Object.entries(SIMPLE_PAGES)) {
    const filePath = path.join(APP_DIR, slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    if (isAlreadyConverted(content)) {
      continue;
    }

    const title = extractMetadataTitle(content) || slugToTitle(slug);
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);
    const safeTitle = sanitiseForDoubleQuotes(title);
    const safeSubtitle = sanitiseForDoubleQuotes(subtitle).substring(0, 200);

    const newContent = `import { Metadata } from 'next';
import { ${config.icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: "${safeTitle} | Disaster Recovery",\n  description: "${safeSubtitle}",\n};`}

export default function ${functionName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${config.gradient}',
        icon: <${config.icon} className="h-12 w-12" />,
        title: "${safeTitle}",
        subtitle: "${safeSubtitle}",
      }}
      cta={{ text: '${config.cta}', href: '${config.ctaHref}' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "${safeTitle.length > 40 ? safeTitle.substring(0, 37) + '...' : safeTitle}" },
      ]}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted (simple): ${getRelativePath(filePath)}`);
    converted++;
  }

  // Also convert nested simple pages
  const nestedSimple = [
    { dir: 'events/gallery', icon: 'Camera', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' },
    { dir: 'knowledge/toxins-contamination', icon: 'AlertTriangle', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)' },
    { dir: 'contractors/apply', icon: 'ClipboardCheck', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)' },
  ];

  for (const item of nestedSimple) {
    const filePath = path.join(APP_DIR, item.dir, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    if (isAlreadyConverted(content)) continue;

    const title = extractMetadataTitle(content) || slugToTitle(item.dir.split('/').pop());
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);
    const safeTitle = sanitiseForDoubleQuotes(title);
    const safeSubtitle = sanitiseForDoubleQuotes(subtitle).substring(0, 200);

    const breadcrumbParts = item.dir.split('/');
    let breadcrumbs = `        { label: 'Home', href: '/' },\n`;
    if (breadcrumbParts.length > 1) {
      breadcrumbs += `        { label: "${slugToTitle(breadcrumbParts[0])}", href: "/${breadcrumbParts[0]}" },\n`;
    }
    breadcrumbs += `        { label: "${safeTitle.length > 40 ? safeTitle.substring(0, 37) + '...' : safeTitle}" },`;

    const newContent = `import { Metadata } from 'next';
import { ${item.icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: "${safeTitle} | Disaster Recovery",\n  description: "${safeSubtitle}",\n};`}

export default function ${functionName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${item.gradient}',
        icon: <${item.icon} className="h-12 w-12" />,
        title: "${safeTitle}",
        subtitle: "${safeSubtitle}",
      }}
      cta={{ text: 'Get Started', href: '/claim/start' }}
      breadcrumbs={[
${breadcrumbs}
      ]}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted (simple/nested): ${getRelativePath(filePath)}`);
    converted++;
  }

  return converted;
}

/* -------------------------------------------------------------------------- */
/* Complex page conversion (AG chrome wrapper with feature flag)               */
/* -------------------------------------------------------------------------- */

// These directories contain complex/interactive pages that need the wrapper approach
const COMPLEX_DIRS = [
  'contact',
  'login',
  'signup',
  'search',
  'quote',
  'claim',
  'book-service',
  'schedule',
  'demo',
  'premium-demo',
  'r6-demo',
  'preview',
  'workflow-demo',
  'pitch',
  'whos-first',
  'track',
  'image-optimizer',
  'lighthouse-report',
  'crm',
  'dashboard',
  'partner-portal',
];

function convertComplexPages() {
  let converted = 0;

  for (const dir of COMPLEX_DIRS) {
    const dirPath = path.join(APP_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const pageFiles = getAllPageFiles(dirPath);
    for (const filePath of pageFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relPath = getRelativePath(filePath);

      if (isAlreadyConverted(content)) {
        continue;
      }

      // Skip dynamic route files
      if (relPath.includes('[')) {
        console.log(`  Skipping dynamic route: ${relPath}`);
        continue;
      }

      const functionName = extractFunctionName(content);
      const isClientComponent = content.includes("'use client'") || content.includes('"use client"');

      // Wrap the original component with AG chrome via feature flag
      let newContent = content;

      // Add imports
      const featureFlagImport = "import { FEATURE_FLAGS } from '@/lib/feature-flags';";
      const navImport = "import { AntigravityNavbar } from '@/components/antigravity';";
      const footerImport = "import { AntigravityFooter } from '@/components/antigravity';";

      // Find the right insertion point (after 'use client' if present, then after other imports)
      if (isClientComponent) {
        // Insert after 'use client' line
        newContent = newContent.replace(
          /((['"])use client\2;?\s*\n)/,
          `$1\n${featureFlagImport}\n${navImport}\n${footerImport}\n`
        );
      } else {
        // Insert at the top of imports
        const firstImport = newContent.match(/^(import\s+)/m);
        if (firstImport) {
          newContent = newContent.replace(
            /^(import\s+)/m,
            `${featureFlagImport}\n${navImport}\n${footerImport}\n$1`
          );
        } else {
          newContent = `${featureFlagImport}\n${navImport}\n${footerImport}\n\n${newContent}`;
        }
      }

      // Rename the default export
      newContent = newContent.replace(
        new RegExp(`export\\s+default\\s+function\\s+${functionName}\\s*\\(`),
        `function ${functionName}Original(`
      );

      // Add new default export at the end
      newContent += `
export default function ${functionName}() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <${functionName}Original />;
  }

  return (
    <>
      <AntigravityNavbar />
      <${functionName}Original />
      <AntigravityFooter />
    </>
  );
}
`;

      if (!DRY_RUN) {
        fs.writeFileSync(filePath, newContent);
      }
      console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted (chrome wrap): ${relPath}`);
      converted++;
    }
  }

  return converted;
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

console.log(`\nPhase 4 Antigravity Conversion ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log('═'.repeat(60));

console.log('\n📄 Converting Simple Content Pages...');
const simpleCount = convertSimplePages();
console.log(`  → ${simpleCount} simple pages converted`);
totalConverted += simpleCount;

console.log('\n⚙️  Converting Complex Pages (AG chrome wrapper)...');
const complexCount = convertComplexPages();
console.log(`  → ${complexCount} complex pages converted`);
totalConverted += complexCount;

console.log('\n' + '═'.repeat(60));
console.log(`Total Phase 4 pages converted: ${totalConverted}`);
if (DRY_RUN) {
  console.log('(No files were modified — this was a dry run)');
}
