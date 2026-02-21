#!/usr/bin/env node

/**
 * Final Sweep — Convert remaining unconverted pages.
 * Handles both static content pages and dynamic route pages.
 */

const fs = require('fs');
const path = require('path');

let count = 0;

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
  const dq = content.match(/title:\s*"([^"]+?)(?:\s*\|[^"]*)?"/);
  if (dq) return dq[1].trim();
  const sq = content.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
  if (sq) return sq[1].replace(/\\'/g, "'").split('|')[0].trim();
  const h1 = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1) return h1[1].trim();
  return null;
}

function extractMetadataDescription(content) {
  const dq = content.match(/description:\s*"([^"]{10,}?)"/);
  if (dq) return dq[1].trim();
  const sq = content.match(/description:\s*'((?:[^'\\]|\\.){10,}?)'/);
  if (sq) return sq[1].replace(/\\'/g, "'").trim();
  return null;
}

function extractMetadataBlock(content) {
  const m = content.match(/(export\s+const\s+metadata[\s\S]*?};)/);
  return m ? m[1] : null;
}

function extractFunctionName(content) {
  const m = content.match(/export\s+default\s+function\s+(\w+)/);
  return m ? m[1] : 'Page';
}

function safe(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugToTitle(slug) {
  return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// Static pages to convert with AgContentPageTemplate
const staticPages = [
  { file: 'app/certifications/page.tsx',                    icon: 'Award', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' },
  { file: 'app/disasters/page.tsx',                          icon: 'AlertTriangle', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)' },
  { file: 'app/emergency/page.tsx',                          icon: 'Siren', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)' },
  { file: 'app/emergency/checklists/fire-damage/page.tsx',   icon: 'Flame', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)' },
  { file: 'app/emergency/checklists/general/page.tsx',       icon: 'ClipboardCheck', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)' },
  { file: 'app/emergency/checklists/mould/page.tsx',         icon: 'Bug', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)' },
  { file: 'app/emergency/checklists/sewage/page.tsx',        icon: 'Droplets', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)' },
  { file: 'app/emergency/checklists/storm-damage/page.tsx',  icon: 'CloudLightning', gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)' },
  { file: 'app/emergency/checklists/water-damage/page.tsx',  icon: 'Droplets', gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)' },
  { file: 'app/insurance/page.tsx',                          icon: 'Shield', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' },
  { file: 'app/insurance-decoder/page.tsx',                  icon: 'FileSearch', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' },
  { file: 'app/insurance-decoder/fire-damage/page.tsx',      icon: 'Flame', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)' },
  { file: 'app/insurance-decoder/mould/page.tsx',            icon: 'Bug', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)' },
  { file: 'app/insurance-decoder/storm-damage/page.tsx',     icon: 'CloudLightning', gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)' },
  { file: 'app/insurance-decoder/water-damage/page.tsx',     icon: 'Droplets', gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)' },
  { file: 'app/partners/clean-claims/page.tsx',              icon: 'Handshake', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' },
  { file: 'app/partners/nrma/page.tsx',                      icon: 'Handshake', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' },
  { file: 'app/partners/suncorp/page.tsx',                   icon: 'Handshake', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' },
  { file: 'app/property/commercial/page.tsx',                icon: 'Building2', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)' },
  { file: 'app/property/industrial/page.tsx',                icon: 'Factory', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)' },
  { file: 'app/property/residential/page.tsx',               icon: 'Home', gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' },
  { file: 'app/property-types/page.tsx',                     icon: 'Building2', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)' },
  { file: 'app/technology/page.tsx',                         icon: 'Cpu', gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)' },
];

for (const p of staticPages) {
  if (!fs.existsSync(p.file)) { continue; }
  const content = fs.readFileSync(p.file, 'utf8');
  if (isAlreadyConverted(content)) { continue; }

  const title = extractMetadataTitle(content) || slugToTitle(path.basename(path.dirname(p.file)));
  const subtitle = extractMetadataDescription(content) || '';
  const metaBlock = extractMetadataBlock(content);
  const fn = extractFunctionName(content);
  const safeT = safe(title);
  const safeS = safe(subtitle).substring(0, 200);

  const parts = p.file.replace('app/', '').split('/');
  let bc = '        { label: "Home", href: "/" },\n';
  if (parts.length > 2) {
    bc += `        { label: "${slugToTitle(parts[0])}", href: "/${parts[0]}" },\n`;
  }
  bc += `        { label: "${safeT.length > 40 ? safeT.substring(0, 37) + '...' : safeT}" },`;

  const newContent = `import { Metadata } from 'next';
import { ${p.icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metaBlock || `export const metadata: Metadata = {\n  title: "${safeT} | Disaster Recovery",\n  description: "${safeS}",\n};`}

export default function ${fn}() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${p.gradient}',
        icon: <${p.icon} className="h-12 w-12" />,
        title: "${safeT}",
        subtitle: "${safeS}",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
${bc}
      ]}
    />
  );
}
`;

  fs.writeFileSync(p.file, newContent);
  console.log('Converted (static): ' + p.file);
  count++;
}

// Dynamic routes — chrome wrapper approach
const dynamicRoutes = [
  'app/contractor/onboarding/day/[day]/page.tsx',
  'app/equipment/specifications/[id]/page.tsx',
  'app/locations/[city]/[service]/page.tsx',
  'app/services/[...slug]/page.tsx',
  'app/services/[category]/page.tsx',
  'app/track/[claimId]/page.tsx',
  'app/whos-first/[scenario]/page.tsx',
];

for (const route of dynamicRoutes) {
  if (!fs.existsSync(route)) { continue; }
  const content = fs.readFileSync(route, 'utf8');
  if (isAlreadyConverted(content)) { continue; }

  const fn = extractFunctionName(content);
  if (!fn) { console.log('Skipping (no default fn): ' + route); continue; }

  const isClient = content.includes("'use client'") || content.includes('"use client"');
  let newContent = content;

  const imports = `import { FEATURE_FLAGS } from '@/lib/feature-flags';\nimport { AntigravityNavbar } from '@/components/antigravity';\nimport { AntigravityFooter } from '@/components/antigravity';`;

  if (isClient) {
    newContent = newContent.replace(/((['"])use client\2;?\s*\n)/, `$1\n${imports}\n`);
  } else {
    const firstImportMatch = newContent.match(/^(import\s+)/m);
    if (firstImportMatch) {
      newContent = newContent.replace(/^(import\s+)/m, `${imports}\n$1`);
    } else {
      newContent = `${imports}\n\n${newContent}`;
    }
  }

  newContent = newContent.replace(
    new RegExp(`export\\s+default\\s+function\\s+${fn}\\s*\\(`),
    `function ${fn}Original(`
  );

  newContent += `
export default function ${fn}() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <${fn}Original />;
  }

  return (
    <>
      <AntigravityNavbar />
      <${fn}Original />
      <AntigravityFooter />
    </>
  );
}
`;

  fs.writeFileSync(route, newContent);
  console.log('Converted (dynamic): ' + route);
  count++;
}

console.log('\nTotal final sweep pages converted: ' + count);
