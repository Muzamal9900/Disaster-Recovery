#!/usr/bin/env node

/**
 * Phase 3 Antigravity Conversion Script
 * Converts guide pages, service pages, industry pages, and case study pages.
 *
 * Usage:
 *   node scripts/convert-phase3-to-antigravity.js --dry-run
 *   node scripts/convert-phase3-to-antigravity.js
 *   node scripts/convert-phase3-to-antigravity.js --category=guides
 *   node scripts/convert-phase3-to-antigravity.js --category=services
 *   node scripts/convert-phase3-to-antigravity.js --category=industries
 *   node scripts/convert-phase3-to-antigravity.js --category=case-studies
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const CATEGORY_FILTER = process.argv.find(a => a.startsWith('--category='))?.split('=')[1] || null;

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
    content.includes('AntigravityHomePage')
  );
}

function extractMetadataTitle(content) {
  // Try metadata title first
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+?)(?:\s*\|[^'"`]*)?['"`]/);
  if (titleMatch) return titleMatch[1].trim();

  // Try h1 content
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) return h1Match[1].trim();

  return null;
}

function extractMetadataDescription(content) {
  const descMatch = content.match(/description:\s*['"`]([^'"`]{10,}?)['"`]/);
  return descMatch ? descMatch[1].trim() : null;
}

function extractFunctionName(content) {
  const match = content.match(/export\s+default\s+function\s+(\w+)/);
  return match ? match[1] : 'Page';
}

function extractMetadataBlock(content) {
  // Extract full metadata export if present
  const match = content.match(/(export\s+const\s+metadata[\s\S]*?};)/);
  return match ? match[1] : null;
}

function sanitiseString(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
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
/* Guide Pages Converter                                                       */
/* -------------------------------------------------------------------------- */

const GUIDE_CATEGORY_CONFIG = {
  'water-damage':    { gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)', icon: 'Droplets' },
  'fire-damage':     { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Flame' },
  'mould':           { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'Bug' },
  'storm-damage':    { gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)', icon: 'CloudLightning' },
  'biohazard':       { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'AlertTriangle' },
  'flood-damage':    { gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)', icon: 'Waves' },
  'emergency':       { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Siren' },
  'emergency-guides':{ gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Siren' },
  'insurance':       { gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)', icon: 'Shield' },
  'insurance-guides':{ gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)', icon: 'Shield' },
  'commercial':      { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'Building2' },
  'cost-guides':     { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'DollarSign' },
  'equipment':       { gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)', icon: 'Settings' },
  'certifications':  { gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)', icon: 'Award' },
  'professional':    { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'Users' },
  'services':        { gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)', icon: 'Wrench' },
  'industry-problems':{ gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)', icon: 'Factory' },
  'pricing':         { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'DollarSign' },
  'locations':       { gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)', icon: 'MapPin' },
};

// These 4 category index pages are interactive (use client, useState, framer-motion)
// They need a different conversion approach
const INTERACTIVE_GUIDE_CATEGORIES = ['water-damage', 'fire-damage', 'mould', 'storm-damage'];

function convertGuides() {
  const guidesDir = path.join(APP_DIR, 'guides');
  if (!fs.existsSync(guidesDir)) {
    console.log('  No guides directory found, skipping.');
    return 0;
  }

  const pageFiles = getAllPageFiles(guidesDir);
  let converted = 0;

  for (const filePath of pageFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = getRelativePath(filePath);

    if (isAlreadyConverted(content)) {
      continue;
    }

    // Determine the guide category from path
    const pathParts = relPath.replace('app/guides/', '').split('/');
    const category = pathParts[0];
    const isArticle = pathParts.length > 2; // Has a sub-slug beyond category
    const isCategoryIndex = pathParts.length === 2 && pathParts[1] === 'page.tsx';

    const config = GUIDE_CATEGORY_CONFIG[category] || {
      gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
      icon: 'BookOpen',
    };

    // Skip interactive category index pages for now — they need manual AG chrome wrapping
    if (isCategoryIndex && INTERACTIVE_GUIDE_CATEGORIES.includes(category)) {
      // Wrap interactive pages with feature flag + AG chrome
      convertInteractiveGuidePage(filePath, content, category, config);
      converted++;
      continue;
    }

    const title = extractMetadataTitle(content) || slugToTitle(pathParts.slice(0, -1).pop() || category);
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);
    const categoryTitle = slugToTitle(category);

    // Build breadcrumbs
    let breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Guides', href: '/guides' },\n`;
    if (isArticle) {
      breadcrumbEntries += `        { label: '${sanitiseString(categoryTitle)}', href: '/guides/${category}' },\n`;
    }
    breadcrumbEntries += `        { label: '${sanitiseString(title.length > 50 ? title.substring(0, 47) + '...' : title)}' },`;

    const newContent = `import { Metadata } from 'next';
import { ${config.icon} } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: '${sanitiseString(title)} | Disaster Recovery Guide',\n  description: '${sanitiseString(subtitle)}',\n};`}

export default function ${functionName}() {
  return (
    <AgGuidePageTemplate
      category="${sanitiseString(categoryTitle)}"
      title="${sanitiseString(title)}"
      subtitle="${sanitiseString(subtitle).substring(0, 200)}"
      gradient="${config.gradient}"
      icon={<${config.icon} className="h-10 w-10" />}
      breadcrumbs={[
${breadcrumbEntries}
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted: ${relPath}`);
    converted++;
  }

  return converted;
}

function convertInteractiveGuidePage(filePath, content, category, config) {
  const relPath = getRelativePath(filePath);
  const functionName = extractFunctionName(content);
  const title = extractMetadataTitle(content) || slugToTitle(category) + ' Guide';
  const categoryTitle = slugToTitle(category);

  // For interactive pages: rename original component, wrap with feature flag
  // The original component becomes the fallback
  const newContent = content
    // Add AG imports at the top (after existing imports)
    .replace(
      /(import\s+Link\s+from\s+'next\/link';)/,
      `$1\nimport { FEATURE_FLAGS } from '@/lib/feature-flags';\nimport { AntigravityNavbar } from '@/components/antigravity';\nimport { AntigravityFooter } from '@/components/antigravity';`
    )
    // Rename the default export to Original
    .replace(
      `export default function ${functionName}()`,
      `function ${functionName}Original()`
    )
    // Add a new default export that wraps with AG chrome
    + `
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
  console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted (interactive): ${relPath}`);
}

/* -------------------------------------------------------------------------- */
/* Service Pages Converter                                                     */
/* -------------------------------------------------------------------------- */

const SERVICE_CONFIG = {
  'biohazard':                { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'AlertTriangle' },
  'biohazard-cleaning':       { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'AlertTriangle' },
  'biohazard-cleanup':        { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'AlertTriangle' },
  'bushfire-damage-restoration': { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Flame' },
  'commercial':               { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'Building2' },
  'commercial-services':      { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'Building2' },
  'cyclone-damage-restoration': { gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)', icon: 'Wind' },
  'emergency-response':       { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Siren' },
  'emergency-services':       { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Siren' },
  'fire-damage':              { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Flame' },
  'fire-damage-restoration':  { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', icon: 'Flame' },
  'flood-damage-restoration': { gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)', icon: 'Waves' },
  'indoor-environmental-professional': { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'Leaf' },
  'laser-cleaning':           { gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)', icon: 'Zap' },
  'location-specific':        { gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)', icon: 'MapPin' },
  'meth-lab-decontamination': { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'AlertTriangle' },
  'mold-remediation':         { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'Bug' },
  'mould-remediation':        { gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)', icon: 'Bug' },
  'sewage-cleanup':           { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'Droplets' },
  'specialty-services':       { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'Star' },
  'storm-damage':             { gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)', icon: 'CloudLightning' },
  'storm-damage-restoration': { gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)', icon: 'CloudLightning' },
  'structural-drying':        { gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)', icon: 'Wind' },
  'technical-assessment':     { gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', icon: 'ClipboardCheck' },
  'trauma-cleanup':           { gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)', icon: 'Heart' },
  'water-damage':             { gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)', icon: 'Droplets' },
  'water-damage-restoration': { gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)', icon: 'Droplets' },
};

function convertServices() {
  const servicesDir = path.join(APP_DIR, 'services');
  if (!fs.existsSync(servicesDir)) {
    console.log('  No services directory found, skipping.');
    return 0;
  }

  const pageFiles = getAllPageFiles(servicesDir);
  let converted = 0;

  for (const filePath of pageFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = getRelativePath(filePath);

    if (isAlreadyConverted(content)) {
      continue;
    }

    // Skip dynamic route files ([category] and [slug] and [...slug])
    if (relPath.includes('[')) {
      console.log(`  Skipping dynamic route: ${relPath}`);
      continue;
    }

    const pathParts = relPath.replace('app/services/', '').split('/');
    const serviceSlug = pathParts[0] === 'page.tsx' ? 'services' : pathParts[0];
    const isSubPage = pathParts.length > 2;

    const config = SERVICE_CONFIG[serviceSlug] || {
      gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
      icon: 'Wrench',
    };

    const title = extractMetadataTitle(content) || slugToTitle(serviceSlug);
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);
    const serviceTitle = slugToTitle(serviceSlug);

    // Build breadcrumbs
    let breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Services', href: '/services' },\n`;
    if (isSubPage) {
      breadcrumbEntries += `        { label: '${sanitiseString(serviceTitle)}', href: '/services/${serviceSlug}' },\n`;
    }
    breadcrumbEntries += `        { label: '${sanitiseString(title.length > 50 ? title.substring(0, 47) + '...' : title)}' },`;

    // Determine icon — collect unique icons used
    const icons = new Set([config.icon]);

    const newContent = `import { Metadata } from 'next';
import { ${[...icons].join(', ')} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: '${sanitiseString(title)} | Disaster Recovery',\n  description: '${sanitiseString(subtitle)}',\n};`}

export default function ${functionName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${config.gradient}',
        icon: <${config.icon} className="h-12 w-12" />,
        title: '${sanitiseString(title)}',
        subtitle: '${sanitiseString(subtitle).substring(0, 200)}',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
${breadcrumbEntries}
      ]}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted: ${relPath}`);
    converted++;
  }

  return converted;
}

/* -------------------------------------------------------------------------- */
/* Industry Pages Converter                                                    */
/* -------------------------------------------------------------------------- */

function convertIndustries() {
  const industriesDir = path.join(APP_DIR, 'industries');
  if (!fs.existsSync(industriesDir)) {
    console.log('  No industries directory found, skipping.');
    return 0;
  }

  const pageFiles = getAllPageFiles(industriesDir);
  let converted = 0;

  for (const filePath of pageFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = getRelativePath(filePath);

    if (isAlreadyConverted(content)) {
      continue;
    }

    const pathParts = relPath.replace('app/industries/', '').split('/');
    const slug = pathParts[0] === 'page.tsx' ? 'industries' : pathParts[0];

    const title = extractMetadataTitle(content) || slugToTitle(slug);
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);

    let breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Industries', href: '/industries' },\n`;
    if (slug !== 'industries') {
      breadcrumbEntries += `        { label: '${sanitiseString(title.length > 50 ? title.substring(0, 47) + '...' : title)}' },`;
    } else {
      breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Industries' },`;
    }

    const newContent = `import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: '${sanitiseString(title)} | Disaster Recovery',\n  description: '${sanitiseString(subtitle)}',\n};`}

export default function ${functionName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: '${sanitiseString(title)}',
        subtitle: '${sanitiseString(subtitle).substring(0, 200)}',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
${breadcrumbEntries}
      ]}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted: ${relPath}`);
    converted++;
  }

  return converted;
}

/* -------------------------------------------------------------------------- */
/* Case Study Pages Converter                                                  */
/* -------------------------------------------------------------------------- */

function convertCaseStudies() {
  const caseStudiesDir = path.join(APP_DIR, 'case-studies');
  if (!fs.existsSync(caseStudiesDir)) {
    console.log('  No case-studies directory found, skipping.');
    return 0;
  }

  const pageFiles = getAllPageFiles(caseStudiesDir);
  let converted = 0;

  for (const filePath of pageFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = getRelativePath(filePath);

    if (isAlreadyConverted(content)) {
      continue;
    }

    const pathParts = relPath.replace('app/case-studies/', '').split('/');
    const slug = pathParts[0] === 'page.tsx' ? 'case-studies' : pathParts[0];

    const title = extractMetadataTitle(content) || slugToTitle(slug);
    const subtitle = extractMetadataDescription(content) || '';
    const metadataBlock = extractMetadataBlock(content);
    const functionName = extractFunctionName(content);

    let breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Case Studies', href: '/case-studies' },\n`;
    if (slug !== 'case-studies') {
      breadcrumbEntries += `        { label: '${sanitiseString(title.length > 50 ? title.substring(0, 47) + '...' : title)}' },`;
    } else {
      breadcrumbEntries = `        { label: 'Home', href: '/' },\n        { label: 'Case Studies' },`;
    }

    const newContent = `import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock || `export const metadata: Metadata = {\n  title: '${sanitiseString(title)} | Disaster Recovery Case Study',\n  description: '${sanitiseString(subtitle)}',\n};`}

export default function ${functionName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: '${sanitiseString(title)}',
        subtitle: '${sanitiseString(subtitle).substring(0, 200)}',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
${breadcrumbEntries}
      ]}
    />
  );
}
`;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
    }
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted: ${relPath}`);
    converted++;
  }

  return converted;
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

console.log(`\nPhase 3 Antigravity Conversion ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log('═'.repeat(60));

if (!CATEGORY_FILTER || CATEGORY_FILTER === 'guides') {
  console.log('\n📖 Converting Guide Pages...');
  const guideCount = convertGuides();
  console.log(`  → ${guideCount} guide pages converted`);
  totalConverted += guideCount;
}

if (!CATEGORY_FILTER || CATEGORY_FILTER === 'services') {
  console.log('\n🔧 Converting Service Pages...');
  const serviceCount = convertServices();
  console.log(`  → ${serviceCount} service pages converted`);
  totalConverted += serviceCount;
}

if (!CATEGORY_FILTER || CATEGORY_FILTER === 'industries') {
  console.log('\n🏭 Converting Industry Pages...');
  const industryCount = convertIndustries();
  console.log(`  → ${industryCount} industry pages converted`);
  totalConverted += industryCount;
}

if (!CATEGORY_FILTER || CATEGORY_FILTER === 'case-studies') {
  console.log('\n📋 Converting Case Study Pages...');
  const caseStudyCount = convertCaseStudies();
  console.log(`  → ${caseStudyCount} case study pages converted`);
  totalConverted += caseStudyCount;
}

console.log('\n' + '═'.repeat(60));
console.log(`Total Phase 3 pages converted: ${totalConverted}`);
if (DRY_RUN) {
  console.log('(No files were modified — this was a dry run)');
}
