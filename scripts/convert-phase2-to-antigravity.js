/**
 * Phase 2 Antigravity Converter — Pricing, Location, FAQ, Legal pages
 *
 * Usage: node scripts/convert-phase2-to-antigravity.js [--dry-run] [--category=pricing|locations|faq|legal]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const CATEGORY_FILTER = process.argv.find(a => a.startsWith('--category='))?.split('=')[1];
const APP_DIR = path.join(__dirname, '..', 'app');

let totalConverted = 0;

/* ========================================================================== */
/* Helpers                                                                     */
/* ========================================================================== */

function isAlreadyConverted(source) {
  return source.includes('AgContentPageTemplate') ||
         source.includes('AgPricingPageTemplate') ||
         source.includes('AgFAQPageTemplate') ||
         source.includes('AgLegalPageTemplate') ||
         source.includes('AgPageWrapper');
}

function extractMetadataBlock(source) {
  const match = source.match(/(export const metadata[\s\S]*?};)/);
  return match ? match[1] : '';
}

function extractFuncName(source) {
  const match = source.match(/export default function (\w+)/);
  return match ? match[1] : 'Page';
}

function titleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function findPages(dir) {
  const pages = [];
  if (!fs.existsSync(dir)) return pages;

  function walk(currentDir, depth) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
      } else if (entry.name === 'page.tsx') {
        pages.push(fullPath);
      }
    }
  }
  walk(dir, 0);
  return pages;
}

/* ========================================================================== */
/* Location Pages (67 pages — ultra-thin stubs)                               */
/* ========================================================================== */

function convertLocations() {
  if (CATEGORY_FILTER && CATEGORY_FILTER !== 'locations') return;
  console.log('\n=== LOCATIONS ===');

  const locationDir = path.join(APP_DIR, 'locations');
  const pages = findPages(locationDir);
  let converted = 0;

  for (const pagePath of pages) {
    const source = fs.readFileSync(pagePath, 'utf-8');
    if (isAlreadyConverted(source)) {
      console.log(`  SKIP: ${path.relative(APP_DIR, pagePath)} (already converted)`);
      continue;
    }

    // Extract info from path: locations/[state]/[suburb]/page.tsx or locations/[city]/page.tsx
    const relPath = path.relative(locationDir, pagePath);
    const parts = relPath.replace(/[\\\/]page\.tsx$/, '').split(/[\\\/]/);

    // Skip the [city] dynamic route
    if (parts.includes('[city]')) {
      console.log(`  SKIP: ${relPath} (dynamic route)`);
      continue;
    }

    const funcName = extractFuncName(source);
    const metadataBlock = extractMetadataBlock(source);

    // Extract location name from h1 or path
    const h1Match = source.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const locationName = h1Match ? h1Match[1].replace('Disaster Recovery ', '') : titleCase(parts[parts.length - 1]);

    const stateName = parts.length > 1 ? parts[0].toUpperCase() : '';
    const breadcrumbState = stateName ? `{ label: '${stateName}', href: '/locations/${parts[0]}' },` : '';

    const newSource = `import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery ${locationName.replace(/'/g, "\\'")}',
        subtitle: '24/7 Emergency Services in ${locationName.replace(/'/g, "\\'")}',
      }}
      cta={{ text: 'Emergency Response', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        ${breadcrumbState}
        { label: '${locationName.replace(/'/g, "\\'")}' },
      ]}
    />
  );
}
`;

    if (DRY_RUN) {
      console.log(`  DRY RUN: ${relPath} → ${locationName}`);
    } else {
      fs.writeFileSync(pagePath, newSource, 'utf-8');
      console.log(`  CONVERTED: ${relPath} → ${locationName}`);
    }
    converted++;
  }

  console.log(`  Locations converted: ${converted}`);
  totalConverted += converted;
}

/* ========================================================================== */
/* FAQ Pages (18 pages — Q&A with accordion)                                  */
/* ========================================================================== */

function convertFAQ() {
  if (CATEGORY_FILTER && CATEGORY_FILTER !== 'faq') return;
  console.log('\n=== FAQ ===');

  const faqDir = path.join(APP_DIR, 'faq');
  const pages = findPages(faqDir);
  let converted = 0;

  for (const pagePath of pages) {
    const source = fs.readFileSync(pagePath, 'utf-8');
    if (isAlreadyConverted(source)) {
      console.log(`  SKIP: ${path.relative(APP_DIR, pagePath)} (already converted)`);
      continue;
    }

    const relPath = path.relative(APP_DIR, pagePath);
    const funcName = extractFuncName(source);
    const metadataBlock = extractMetadataBlock(source);
    const slug = path.basename(path.dirname(pagePath));

    // Extract FAQ data if present
    const faqsMatch = source.match(/const faqs = \[([\s\S]*?)\];/);

    // Extract h1 title
    const h1Match = source.match(/<h1[^>]*>\s*\n?\s*([^\n<]+)/);
    const title = h1Match ? h1Match[1].trim() : titleCase(slug) + ' FAQs';

    // For index page (faq/page.tsx), use AgContentPageTemplate
    if (slug === 'faq') {
      const newSource = `import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Frequently Asked Questions',
        subtitle: 'Get answers to common disaster recovery questions',
      }}
      cta={{ text: 'Get Help Now', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ' },
      ]}
    />
  );
}
`;
      if (DRY_RUN) {
        console.log(`  DRY RUN: ${relPath} (index page)`);
      } else {
        fs.writeFileSync(pagePath, newSource, 'utf-8');
        console.log(`  CONVERTED: ${relPath} (index page)`);
      }
      converted++;
      continue;
    }

    // For category pages with FAQ data, extract the faqs array
    if (faqsMatch) {
      // Keep the FAQ data inline and use AgFAQPageTemplate
      const categoryName = titleCase(slug);

      const newSource = `'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [${faqsMatch[1]}];

export default function ${funcName}() {
  return (
    <AgFAQPageTemplate
      category="${categoryName.replace(/"/g, '\\"')}"
      title="${title.replace(/"/g, '\\"')}"
      subtitle="Everything about ${categoryName.toLowerCase().replace(/"/g, '\\"')} restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
`;
      if (DRY_RUN) {
        console.log(`  DRY RUN: ${relPath} → ${title} (with FAQ data)`);
      } else {
        fs.writeFileSync(pagePath, newSource, 'utf-8');
        console.log(`  CONVERTED: ${relPath} → ${title} (with FAQ data)`);
      }
    } else {
      // Stub FAQ pages without inline data
      const newSource = `import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: '${title.replace(/'/g, "\\'")}',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: '${titleCase(slug).replace(/'/g, "\\'")}' },
      ]}
    />
  );
}
`;
      if (DRY_RUN) {
        console.log(`  DRY RUN: ${relPath} → ${title} (stub)`);
      } else {
        fs.writeFileSync(pagePath, newSource, 'utf-8');
        console.log(`  CONVERTED: ${relPath} → ${title} (stub)`);
      }
    }
    converted++;
  }

  console.log(`  FAQ converted: ${converted}`);
  totalConverted += converted;
}

/* ========================================================================== */
/* Legal Pages (59 pages — index + document listing)                          */
/* ========================================================================== */

function convertLegal() {
  if (CATEGORY_FILTER && CATEGORY_FILTER !== 'legal') return;
  console.log('\n=== LEGAL ===');

  const legalDir = path.join(APP_DIR, 'legal');
  const pages = findPages(legalDir);
  let converted = 0;

  for (const pagePath of pages) {
    const source = fs.readFileSync(pagePath, 'utf-8');
    if (isAlreadyConverted(source)) {
      console.log(`  SKIP: ${path.relative(APP_DIR, pagePath)} (already converted)`);
      continue;
    }

    const relPath = path.relative(APP_DIR, pagePath);
    const funcName = extractFuncName(source);
    const slug = path.basename(path.dirname(pagePath));
    const category = titleCase(slug);

    // Extract h1 title
    const h1Match = source.match(/<h1[^>]*>\s*\n?\s*([^\n<]+)/);
    const title = h1Match ? h1Match[1].trim() : category + ' Documents';

    // Legal pages use 'use client' and react-icons — convert to AgLegalPageTemplate
    const newSource = `'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function ${funcName}() {
  return (
    <AgLegalPageTemplate
      title="${title.replace(/"/g, '\\"')}"
      category="${category.replace(/"/g, '\\"')}"
      description="Legal documents and agreements for ${category.toLowerCase().replace(/"/g, '\\"')}"
    />
  );
}
`;

    if (DRY_RUN) {
      console.log(`  DRY RUN: ${relPath} → ${title}`);
    } else {
      fs.writeFileSync(pagePath, newSource, 'utf-8');
      console.log(`  CONVERTED: ${relPath} → ${title}`);
    }
    converted++;
  }

  console.log(`  Legal converted: ${converted}`);
  totalConverted += converted;
}

/* ========================================================================== */
/* Pricing Pages (51 pages — city x service)                                  */
/* ========================================================================== */

function convertPricing() {
  if (CATEGORY_FILTER && CATEGORY_FILTER !== 'pricing') return;
  console.log('\n=== PRICING ===');

  const pricingDir = path.join(APP_DIR, 'pricing');
  const pages = findPages(pricingDir);
  let converted = 0;

  // Pricing data defaults by service type
  const serviceDefaults = {
    'water-damage': { min: '$2,420', avg: '$13,200', insurance: '100%', name: 'Water Damage' },
    'fire-damage': { min: '$2,420', avg: '$13,200', insurance: '100%', name: 'Fire & Smoke Damage' },
    'flood-recovery': { min: '$2,750', avg: '$15,400', insurance: '95%', name: 'Flood Recovery' },
    'mould-removal': { min: '$1,980', avg: '$8,800', insurance: '90%', name: 'Mould Removal' },
    'storm-damage': { min: '$2,200', avg: '$11,000', insurance: '100%', name: 'Storm Damage' },
  };

  const defaultPriceRanges = [
    { type: 'Minor Damage', range: '$2,420 - $7,920', description: 'Single room, minimal damage' },
    { type: 'Moderate Damage', range: '$7,920 - $13,200', description: 'Multiple rooms, standard restoration' },
    { type: 'Major Damage', range: '$13,200 - $23,760', description: 'Whole floor affected' },
    { type: 'Severe Damage', range: '$23,760 - $33,000+', description: 'Structural damage, complete restoration' },
  ];

  const defaultFactors = [
    { factor: 'Property Size', impact: '20-30%', example: 'Larger properties require more equipment and time' },
    { factor: 'Damage Severity', impact: '30-50%', example: 'Category 3 water costs more than Category 1' },
    { factor: 'Response Time', impact: '10-20%', example: 'Emergency after-hours response adds surcharge' },
    { factor: 'Materials Affected', impact: '15-25%', example: 'Hardwood restoration costs more than carpet' },
    { factor: 'Secondary Damage', impact: '20-40%', example: 'Mould growth increases total cost' },
  ];

  for (const pagePath of pages) {
    const source = fs.readFileSync(pagePath, 'utf-8');
    if (isAlreadyConverted(source)) {
      console.log(`  SKIP: ${path.relative(APP_DIR, pagePath)} (already converted)`);
      continue;
    }

    const relPath = path.relative(APP_DIR, pagePath);
    const funcName = extractFuncName(source);
    const metadataBlock = extractMetadataBlock(source);

    // Parse path: pricing/[city]/[service]/page.tsx or pricing/[special]/page.tsx
    const pathParts = path.relative(pricingDir, pagePath).replace(/[\\\/]page\.tsx$/, '').split(/[\\\/]/);

    if (pathParts.length < 2) {
      // City index page or special page like minimum-callout
      const slug = pathParts[0];
      const name = titleCase(slug);

      const newSource = `import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: '${name.replace(/'/g, "\\'")} Pricing',
        subtitle: 'Transparent disaster recovery pricing',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/pricing' },
        { label: '${name.replace(/'/g, "\\'")}' },
      ]}
    />
  );
}
`;
      if (DRY_RUN) {
        console.log(`  DRY RUN: ${relPath} (city index: ${name})`);
      } else {
        fs.writeFileSync(pagePath, newSource, 'utf-8');
        console.log(`  CONVERTED: ${relPath} (city index: ${name})`);
      }
      converted++;
      continue;
    }

    // City + Service pricing pages
    const citySlug = pathParts[0];
    const serviceSlug = pathParts[1];
    const cityName = titleCase(citySlug);
    const defaults = serviceDefaults[serviceSlug] || { min: '$2,200', avg: '$11,000', insurance: '95%', name: titleCase(serviceSlug) };

    // Try to extract pricing data from the original source
    let min = defaults.min;
    let avg = defaults.avg;
    let insurance = defaults.insurance;

    const minMatch = source.match(/\$[\d,]+/);
    if (minMatch) min = minMatch[0];

    const stateMap = {
      'adelaide': 'SA', 'brisbane': 'QLD', 'sydney': 'NSW', 'melbourne': 'VIC',
      'perth': 'WA', 'canberra': 'ACT', 'gold-coast': 'QLD', 'sunshine-coast': 'QLD',
      'newcastle': 'NSW', 'wollongong': 'NSW',
    };
    const stateName = stateMap[citySlug] || '';

    const newSource = `import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

${metadataBlock}

export default function ${funcName}() {
  return (
    <AgPricingPageTemplate
      cityName="${cityName}"
      stateName="${stateName}"
      serviceName="${defaults.name.replace(/"/g, '\\"')}"
      minimumCallout="${min}"
      averageCost="${avg}"
      insuranceCoverage="${insurance}"
      priceRanges={${JSON.stringify(defaultPriceRanges, null, 8)}}
      pricingFactors={${JSON.stringify(defaultFactors, null, 8)}}
    />
  );
}
`;

    if (DRY_RUN) {
      console.log(`  DRY RUN: ${relPath} → ${cityName} ${defaults.name}`);
    } else {
      fs.writeFileSync(pagePath, newSource, 'utf-8');
      console.log(`  CONVERTED: ${relPath} → ${cityName} ${defaults.name}`);
    }
    converted++;
  }

  console.log(`  Pricing converted: ${converted}`);
  totalConverted += converted;
}

/* ========================================================================== */
/* Main                                                                        */
/* ========================================================================== */

console.log(`Phase 2 Antigravity Converter ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log('='.repeat(60));

convertPricing();
convertLocations();
convertFAQ();
convertLegal();

console.log('\n' + '='.repeat(60));
console.log(`Total Phase 2 pages converted: ${totalConverted}`);
if (DRY_RUN) {
  console.log('Run without --dry-run to apply changes.');
}
