#!/usr/bin/env node

/**
 * Phase 5 Antigravity Conversion Script
 * Converts portal/dashboard pages with AG chrome wrapper.
 * These pages have complex state, auth flows, and dashboard layouts
 * so they use the wrapper approach (preserving original content).
 *
 * Usage:
 *   node scripts/convert-phase5-to-antigravity.js --dry-run
 *   node scripts/convert-phase5-to-antigravity.js
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

function extractFunctionName(content) {
  const match = content.match(/export\s+default\s+function\s+(\w+)/);
  return match ? match[1] : null;
}

function getRelativePath(filePath) {
  return path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
}

/* -------------------------------------------------------------------------- */
/* Portal directories to convert                                               */
/* -------------------------------------------------------------------------- */

const PORTAL_DIRS = [
  'admin',
  'contractor-portal',
  'client-portal',
  'portal',
  'contractor',
];

/* -------------------------------------------------------------------------- */
/* Main conversion                                                             */
/* -------------------------------------------------------------------------- */

console.log(`\nPhase 5 Antigravity Conversion — Portal Pages ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log('═'.repeat(60));

for (const dir of PORTAL_DIRS) {
  const dirPath = path.join(APP_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`\n  Skipping ${dir}/ (directory not found)`);
    continue;
  }

  console.log(`\n🏢 Converting ${dir}/ pages...`);
  const pageFiles = getAllPageFiles(dirPath);
  let dirCount = 0;

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
    if (!functionName) {
      console.log(`  Skipping (no default export): ${relPath}`);
      continue;
    }

    const isClientComponent = content.includes("'use client'") || content.includes('"use client"');

    let newContent = content;

    // Add imports
    const featureFlagImport = "import { FEATURE_FLAGS } from '@/lib/feature-flags';";
    const navImport = "import { AntigravityNavbar } from '@/components/antigravity';";
    const footerImport = "import { AntigravityFooter } from '@/components/antigravity';";

    if (isClientComponent) {
      newContent = newContent.replace(
        /((['"])use client\2;?\s*\n)/,
        `$1\n${featureFlagImport}\n${navImport}\n${footerImport}\n`
      );
    } else {
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

    // Add new default export
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
    console.log(`  ${DRY_RUN ? '[DRY] ' : ''}Converted: ${relPath}`);
    dirCount++;
  }

  console.log(`  → ${dirCount} pages converted in ${dir}/`);
  totalConverted += dirCount;
}

console.log('\n' + '═'.repeat(60));
console.log(`Total Phase 5 pages converted: ${totalConverted}`);
if (DRY_RUN) {
  console.log('(No files were modified — this was a dry run)');
}
