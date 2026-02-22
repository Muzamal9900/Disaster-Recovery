#!/usr/bin/env tsx
/**
 * CLI script for generating visuals via Nano Banana Pro.
 *
 * Usage:
 *   npx tsx scripts/generate-visual.ts \
 *     --brand disaster-recovery \
 *     --type hero-image \
 *     --desc "Emergency water extraction team with professional drying equipment"
 *
 * Options:
 *   --brand   Brand key: disaster-recovery | synthex | restore-assist | unite-hub
 *   --type    Asset type: hero-image | card-background | logo-render | service-visual
 *   --desc    Description of the visual to generate
 *   --ratio   Aspect ratio: 16:9 | 1:1 | 5:4  (default: 16:9)
 *   --res     Resolution: 1K | 2K | 4K  (default: 2K)
 *   --prompt  Print the generated prompt without calling the API
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateVisual, buildCinematicPrompt } from '../src/lib/visual-generator';
import type { VisualRequest } from '../src/lib/visual-generator';
import type { AspectRatio, Resolution, BrandKey, AssetType } from '../src/lib/visual-prompts';

// Load environment variables — .env.local first (Next.js convention), then .env
// Uses native fs to avoid dotenv dependency
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
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // File not found — skip
  }
}
loadEnvFile(path.join(process.cwd(), '.env.local'));
loadEnvFile(path.join(process.cwd(), '.env'));

const VALID_BRANDS: BrandKey[] = ['disaster-recovery', 'synthex', 'restore-assist', 'unite-hub'];
const VALID_TYPES: AssetType[] = ['hero-image', 'card-background', 'logo-render', 'service-visual'];
const VALID_RATIOS: AspectRatio[] = ['16:9', '1:1', '5:4'];
const VALID_RESOLUTIONS: Resolution[] = ['1K', '2K', '4K'];

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    if (key.startsWith('--') && i + 1 < argv.length) {
      args[key.slice(2)] = argv[++i];
    }
  }
  return args;
}

function printUsage(): void {
  console.log(`
Usage: npx tsx scripts/generate-visual.ts --brand <brand> --type <type> --desc "<description>"

Options:
  --brand   ${VALID_BRANDS.join(' | ')}
  --type    ${VALID_TYPES.join(' | ')}
  --desc    Description of the visual
  --ratio   ${VALID_RATIOS.join(' | ')}  (default: 16:9)
  --res     ${VALID_RESOLUTIONS.join(' | ')}  (default: 2K)
  --prompt  "true" to print prompt only (no API call)
`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  if (!args.brand || !args.type || !args.desc) {
    printUsage();
    process.exit(1);
  }

  const brand = args.brand as BrandKey;
  const assetType = args.type as AssetType;
  const description = args.desc;
  const aspectRatio = (args.ratio as AspectRatio) || '16:9';
  const resolution = (args.res as Resolution) || '2K';

  if (!VALID_BRANDS.includes(brand)) {
    console.error(`Invalid brand: ${brand}. Must be one of: ${VALID_BRANDS.join(', ')}`);
    process.exit(1);
  }
  if (!VALID_TYPES.includes(assetType)) {
    console.error(`Invalid type: ${assetType}. Must be one of: ${VALID_TYPES.join(', ')}`);
    process.exit(1);
  }

  const request: VisualRequest = { brand, assetType, description, aspectRatio, resolution };

  // Prompt-only mode
  if (args.prompt === 'true') {
    const prompt = buildCinematicPrompt(request);
    console.log('\n--- Generated Prompt ---\n');
    console.log(prompt);
    console.log('\n--- End Prompt ---\n');
    return;
  }

  console.log(`Generating ${assetType} for ${brand}...`);
  console.log(`Description: ${description}`);
  console.log(`Aspect ratio: ${aspectRatio} | Resolution: ${resolution}`);
  console.log('');

  const result = await generateVisual(request);

  // Determine output directory and filename
  const outputDir = path.join(process.cwd(), 'public', 'images', 'generated', brand);
  fs.mkdirSync(outputDir, { recursive: true });

  const timestamp = Date.now();
  const ext = result.mimeType.includes('png') ? 'png' : 'webp';
  const filename = `${assetType}-${timestamp}.${ext}`;
  const outputPath = path.join(outputDir, filename);

  // Write the image
  const buffer = Buffer.from(result.imageBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Generated: ${outputPath}`);
  console.log(`Size: ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log(`MIME: ${result.mimeType}`);
  console.log('');
  console.log('Note: Convert to .webp or .avif for production use (v3 spec requirement).');
}

main().catch((err) => {
  console.error('Generation failed:', err.message || err);
  process.exit(1);
});
