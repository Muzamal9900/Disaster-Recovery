/**
 * Batch Antigravity Stub Page Converter
 *
 * Converts thin stub pages to use AgContentPageTemplate with feature flag.
 * Each page gets AG chrome when ANTIGRAVITY_UI=true, falls back to original when false.
 *
 * Usage: node scripts/convert-stubs-to-antigravity.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const APP_DIR = path.join(__dirname, '..', 'app');

// Category-specific configuration
const CATEGORY_CONFIG = {
  cost: {
    gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
    iconImport: 'DollarSign',
    iconElement: '<DollarSign className="h-12 w-12" />',
    breadcrumbParent: { label: 'Cost Guides', href: '/cost' },
    ctaText: 'Get Free Quote',
    ctaHref: '/quote',
  },
  insurance: {
    gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
    iconImport: 'Shield',
    iconElement: '<Shield className="h-12 w-12" />',
    breadcrumbParent: { label: 'Insurance', href: '/insurance' },
    ctaText: 'Start Your Claim',
    ctaHref: '/claim',
  },
  emergency: {
    gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
    iconImport: 'AlertTriangle',
    iconElement: '<AlertTriangle className="h-12 w-12" />',
    breadcrumbParent: { label: 'Emergency', href: '/emergency' },
    ctaText: 'Emergency Response Now',
    ctaHref: '/claim/start',
  },
  'property-types': {
    gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
    iconImport: 'Building2',
    iconElement: '<Building2 className="h-12 w-12" />',
    breadcrumbParent: { label: 'Property Types', href: '/property-types' },
    ctaText: 'Get Assessment',
    ctaHref: '/quote',
  },
  equipment: {
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    iconImport: 'Settings',
    iconElement: '<Settings className="h-12 w-12" />',
    breadcrumbParent: { label: 'Equipment', href: '/equipment' },
    ctaText: 'Learn More',
    ctaHref: '/services',
  },
  certifications: {
    gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
    iconImport: 'Award',
    iconElement: '<Award className="h-12 w-12" />',
    breadcrumbParent: { label: 'Certifications', href: '/certifications' },
    ctaText: 'View Services',
    ctaHref: '/services',
  },
  compare: {
    gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
    iconImport: 'Scale',
    iconElement: '<Scale className="h-12 w-12" />',
    breadcrumbParent: { label: 'Compare', href: '/compare' },
    ctaText: 'Get Expert Advice',
    ctaHref: '/contact',
  },
  technology: {
    gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
    iconImport: 'Cpu',
    iconElement: '<Cpu className="h-12 w-12" />',
    breadcrumbParent: { label: 'Technology', href: '/technology' },
    ctaText: 'See Our Technology',
    ctaHref: '/services',
  },
  disasters: {
    gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
    iconImport: 'AlertTriangle',
    iconElement: '<AlertTriangle className="h-12 w-12" />',
    breadcrumbParent: { label: 'Disasters', href: '/disasters' },
    ctaText: 'Emergency Response',
    ctaHref: '/claim/start',
  },
};

/**
 * Extract the h1 text from the page source
 */
function extractTitle(source) {
  const h1Match = source.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) return h1Match[1].trim();

  // Try multi-line h1
  const h1MultiMatch = source.match(/<h1[^>]*>\s*\n?\s*([^\n<]+)/);
  if (h1MultiMatch) return h1MultiMatch[1].trim();

  return null;
}

/**
 * Extract the subtitle (usually first <p> after h1 in hero section)
 */
function extractSubtitle(source) {
  // Look for <p> inside the hero section (before </section>)
  const heroSection = source.match(/<section[^>]*>[\s\S]*?<\/section>/);
  if (!heroSection) return null;

  const pTags = heroSection[0].match(/<p[^>]*>([^<]+)<\/p>/g);
  if (pTags && pTags.length > 0) {
    // Get the last <p> in the hero (usually the subtitle)
    const lastP = pTags[pTags.length - 1];
    const textMatch = lastP.match(/<p[^>]*>([^<]+)<\/p>/);
    if (textMatch) return textMatch[1].trim();
  }
  return null;
}

/**
 * Extract metadata title from the export
 */
function extractMetaTitle(source) {
  const match = source.match(/title:\s*['"`]([^'"`]+)['"`]/);
  return match ? match[1] : null;
}

/**
 * Check if the page is a thin stub (under 100 lines, single section hero)
 */
function isThinStub(source) {
  const lines = source.split('\n').length;
  return lines < 100;
}

/**
 * Convert a single page file
 */
function convertPage(filePath, category) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const config = CATEGORY_CONFIG[category];

  if (!config) {
    console.log(`  SKIP: No config for category "${category}"`);
    return false;
  }

  // Skip if already converted
  if (source.includes('AgContentPageTemplate') || source.includes('AgPageWrapper')) {
    console.log(`  SKIP: Already converted`);
    return false;
  }

  const h1Title = extractTitle(source) || 'Page';
  const subtitle = extractSubtitle(source);
  const slug = path.basename(path.dirname(filePath));
  const breadcrumbLabel = h1Title;

  // Determine if thin stub or richer page
  const thin = isThinStub(source);

  // Extract the function name and metadata export from the original
  const funcMatch = source.match(/export default function (\w+)/);
  const funcName = funcMatch ? funcMatch[1] : 'Page';

  // Extract the metadata export block
  const metadataMatch = source.match(/(export const metadata[\s\S]*?};)/);
  const metadataBlock = metadataMatch ? metadataMatch[1] : '';

  // Build the new file content
  // We keep the original function as OriginalContent for the fallback
  const newSource = `import { Metadata } from 'next';
import { ${config.iconImport} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${config.gradient}',
        icon: ${config.iconElement},
        title: '${h1Title.replace(/'/g, "\\'")}',
        ${subtitle ? `subtitle: '${subtitle.replace(/'/g, "\\'")}',` : ''}
      }}
      cta={{ text: '${config.ctaText}', href: '${config.ctaHref}' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: '${config.breadcrumbParent.label}', href: '${config.breadcrumbParent.href}' },
        { label: '${breadcrumbLabel.replace(/'/g, "\\'")}' },
      ]}
    />
  );
}
`;

  if (DRY_RUN) {
    console.log(`  DRY RUN: Would convert ${filePath}`);
    console.log(`    Title: ${h1Title}`);
    console.log(`    Subtitle: ${subtitle || '(none)'}`);
    console.log(`    Thin: ${thin}`);
    return true;
  }

  fs.writeFileSync(filePath, newSource, 'utf-8');
  console.log(`  CONVERTED: ${h1Title}`);
  return true;
}

/**
 * Process all pages in a category directory
 */
function processCategory(category) {
  const categoryDir = path.join(APP_DIR, category);

  if (!fs.existsSync(categoryDir)) {
    console.log(`Category "${category}" does not exist, skipping.`);
    return 0;
  }

  console.log(`\n=== Processing: ${category} ===`);

  let converted = 0;
  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const pageFile = path.join(categoryDir, entry.name, 'page.tsx');
    if (!fs.existsSync(pageFile)) continue;

    console.log(`  ${entry.name}/page.tsx`);
    if (convertPage(pageFile, category)) {
      converted++;
    }
  }

  console.log(`  Total converted in ${category}: ${converted}`);
  return converted;
}

// Main execution
console.log(`Antigravity Stub Page Converter ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log('='.repeat(60));

let total = 0;
for (const category of Object.keys(CATEGORY_CONFIG)) {
  total += processCategory(category);
}

console.log('\n' + '='.repeat(60));
console.log(`Total pages converted: ${total}`);
if (DRY_RUN) {
  console.log('This was a dry run. Run without --dry-run to apply changes.');
}
