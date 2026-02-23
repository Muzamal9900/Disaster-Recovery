#!/usr/bin/env tsx
/**
 * Generate Emergency Make-Safe Guide images via Nano Banana Pro pipeline.
 *
 * Generates 4 insurance-category visuals and saves to public/images/optimised/insurance/
 * with companion JSON metadata files.
 *
 * Usage:
 *   npx tsx scripts/generate-insurance-visuals.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenAI } from '@google/genai';
import { buildCinematicPrompt } from '../src/lib/visual-prompts';
import type { BrandKey, AssetType, AspectRatio, Resolution } from '../src/lib/visual-prompts';

// ── Load environment ──────────────────────────────────────────────────
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
  } catch {
    // File not found — skip
  }
}

const PROJECT_ROOT = path.resolve(__dirname, '..');
loadEnvFile(path.join(PROJECT_ROOT, '.env.local'));
loadEnvFile(path.join(PROJECT_ROOT, '.env'));

const MODEL_ID = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'optimised', 'insurance');

// ── Image definitions ─────────────────────────────────────────────────
interface ImageDef {
  filename: string;
  id: string;
  title: string;
  description: string;
  brand: BrandKey;
  assetType: AssetType;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  seoAlt: string;
  seoDesc: string;
  keywords: string[];
}

const IMAGES: ImageDef[] = [
  {
    filename: '3D Emergency Make-Safe.png',
    id: 'insurance-make-safe-001',
    title: '3D Emergency Make-Safe Operation',
    description:
      'A dramatic 3D isometric view of an emergency make-safe operation in progress on a storm-damaged Australian house. ' +
      'Blue tarps are being professionally applied to a damaged roof with missing tiles and exposed rafters. ' +
      'Emergency LED flood lighting illuminates the scene in the evening. ' +
      'A professional restoration van is parked outside with "Emergency Response" branding on its side in dark blue and orange. ' +
      'Workers in high-visibility safety gear are on the roof securing the tarp. ' +
      'Dark blue and orange colour palette. Rain is falling lightly. ' +
      'Professional, clean 3D isometric render with dramatic cinematic lighting. Australian suburban setting with native vegetation.',
    brand: 'disaster-recovery',
    assetType: 'service-visual',
    aspectRatio: '1:1',
    resolution: '2K',
    seoAlt: '3D Emergency Make-Safe Operation - Professional storm damage response and temporary roof protection services',
    seoDesc: 'High-quality 3D render of an emergency make-safe operation showing professional tarping of a storm-damaged Australian home',
    keywords: ['emergency make-safe', 'storm damage', 'roof tarping', 'emergency response', 'disaster recovery', 'property protection', 'insurance claim'],
  },
  {
    filename: '3D Insurance Reimbursement.png',
    id: 'insurance-reimbursement-001',
    title: '3D Insurance Reimbursement Process',
    description:
      'A 3D isometric scene showing the insurance reimbursement process for emergency make-safe work. ' +
      'Centre frame: a professional invoice document on a desk showing "$2,750 Emergency Make-Safe" with line items visible. ' +
      'On the left side, a professional contractor figure in blue uniform presents the paperwork. ' +
      'On the right side, an insurance company desk with a green approval stamp being applied to the document. ' +
      'A large green checkmark/tick hovers above indicating approval. ' +
      'Blue and white professional colour theme with clean, corporate styling. ' +
      'Australian dollar symbols visible. Clean 3D isometric render with soft professional lighting. ' +
      'Office environment with modern furniture.',
    brand: 'disaster-recovery',
    assetType: 'service-visual',
    aspectRatio: '1:1',
    resolution: '2K',
    seoAlt: '3D Insurance Reimbursement Process - Professional invoice approval for emergency make-safe services',
    seoDesc: 'High-quality 3D render showing the insurance reimbursement workflow for emergency make-safe contractor invoices',
    keywords: ['insurance reimbursement', 'emergency invoice', 'insurance claim', 'make-safe cost', 'contractor payment', 'insurance approval', 'disaster recovery'],
  },
  {
    filename: '3D Authority to Commence.png',
    id: 'insurance-authority-commence-001',
    title: '3D Authority to Commence Document',
    description:
      'A 3D isometric view of a professional contract document titled "Authority to Commence" displayed prominently on a wooden clipboard. ' +
      'A gold-coloured pen rests beside the document ready for signing. ' +
      'Alongside the clipboard sits a white hard hat with a dark blue stripe and an inspection report folder marked "Property Assessment". ' +
      'Property blueprints and floor plans are partially visible underneath, rolled open. ' +
      'Dark navy and gold colour scheme throughout. ' +
      'Professional lighting with warm highlights on the gold accents. ' +
      'Clean, corporate 3D isometric render. ' +
      'An official-looking seal or stamp is visible on the document.',
    brand: 'disaster-recovery',
    assetType: 'service-visual',
    aspectRatio: '1:1',
    resolution: '2K',
    seoAlt: '3D Authority to Commence Document - Professional property restoration contract and assessment paperwork',
    seoDesc: 'High-quality 3D render of the Authority to Commence document with hard hat, blueprints, and inspection reports',
    keywords: ['authority to commence', 'restoration contract', 'property assessment', 'insurance documentation', 'disaster recovery', 'building inspection', 'claims process'],
  },
  {
    filename: '3D NRPG Contractor.png',
    id: 'insurance-nrpg-contractor-001',
    title: '3D NRPG Contractor Comparison',
    description:
      'A 3D isometric split-screen comparison scene showing two contractors side by side. ' +
      'LEFT SIDE (labelled "Unvetted"): A basic contractor standing next to a plain white unmarked van with minimal equipment. ' +
      'The contractor wears casual clothes, no safety gear, no certifications visible. Dull, flat lighting. ' +
      'RIGHT SIDE (labelled "NRPG Certified"): A professional contractor in full branded uniform with safety vest ' +
      'standing next to a fully branded vehicle with professional signage. ' +
      'IICRC certification badge visible on the uniform. ' +
      'Professional equipment visible including a thermal imaging camera, moisture metre, industrial dehumidifier. ' +
      'Bright, confident lighting on the right side. ' +
      'A clear dividing line separates the two halves. Dark blue professional colour theme overall. ' +
      'Clean 3D isometric render with dramatic contrast between the two sides.',
    brand: 'disaster-recovery',
    assetType: 'service-visual',
    aspectRatio: '1:1',
    resolution: '2K',
    seoAlt: '3D NRPG Contractor Comparison - Unvetted vs certified professional disaster recovery contractor',
    seoDesc: 'High-quality 3D split-screen comparison showing the difference between unvetted and NRPG-certified restoration contractors',
    keywords: ['NRPG contractor', 'certified restoration', 'IICRC certified', 'professional contractor', 'vetted tradesperson', 'disaster recovery', 'contractor comparison'],
  },
];

// ── Generation ────────────────────────────────────────────────────────

async function generateImage(def: ImageDef, client: GoogleGenAI): Promise<void> {
  const prompt = buildCinematicPrompt({
    brand: def.brand,
    assetType: def.assetType,
    description: def.description,
    aspectRatio: def.aspectRatio,
    resolution: def.resolution,
  });

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Generating: ${def.filename}`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Prompt (first 200 chars): ${prompt.slice(0, 200)}...`);
  console.log('Calling Nano Banana Pro (Gemini 3 Pro Image)...\n');

  const response = await client.models.generateContent({
    model: MODEL_ID,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
      // @ts-expect-error — image_config is supported by the API but not yet in SDK types
      image_config: {
        aspect_ratio: def.aspectRatio || '1:1',
        image_size: def.resolution || '2K',
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error(`No response parts for ${def.filename}`);
  }

  const imagePart = parts.find(
    (p: Record<string, unknown>) =>
      p.inlineData &&
      typeof (p.inlineData as Record<string, unknown>).mimeType === 'string' &&
      ((p.inlineData as Record<string, unknown>).mimeType as string).startsWith('image/')
  );

  if (!imagePart?.inlineData) {
    // Log any text response for debugging
    const textPart = parts.find((p: Record<string, unknown>) => typeof p.text === 'string');
    if (textPart && 'text' in textPart) {
      console.error(`Model returned text instead of image: ${(textPart as { text: string }).text}`);
    }
    throw new Error(`No image data returned for ${def.filename}. The model may have returned text only.`);
  }

  const imageData = (imagePart.inlineData as { data: string }).data;
  const buffer = Buffer.from(imageData, 'base64');

  // Write image file
  const imagePath = path.join(OUTPUT_DIR, def.filename);
  fs.writeFileSync(imagePath, buffer);
  console.log(`Saved image: ${imagePath} (${(buffer.length / 1024).toFixed(1)} KB)`);

  // Write companion JSON metadata
  const jsonFilename = def.filename.replace('.png', '.json');
  const jsonPath = path.join(OUTPUT_DIR, jsonFilename);
  const metadata = {
    id: def.id,
    title: def.title,
    filename: def.filename,
    category: 'insurance',
    seo: {
      altText: def.seoAlt,
      description: def.seoDesc,
      keywords: def.keywords,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        name: def.title,
        contentUrl: `/images/optimised/insurance/${def.filename}`,
        thumbnail: `/images/optimised/thumbnails/${def.filename}`,
        description: def.seoAlt,
        keywords: def.keywords.join(', '),
      },
    },
    technical: {
      format: 'png',
      optimisation: 'web-ready',
      responsive: true,
    },
    created: new Date().toISOString(),
  };
  fs.writeFileSync(jsonPath, JSON.stringify(metadata, null, 2));
  console.log(`Saved metadata: ${jsonPath}`);
}

async function main(): Promise<void> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('ERROR: GOOGLE_GENAI_API_KEY or GEMINI_API_KEY must be set.');
    process.exit(1);
  }

  console.log('Nano Banana Pro — Insurance Visual Generation');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Images to generate: ${IMAGES.length}`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const client = new GoogleGenAI({ apiKey });

  const results: { name: string; status: string }[] = [];

  for (const def of IMAGES) {
    try {
      await generateImage(def, client);
      results.push({ name: def.filename, status: 'SUCCESS' });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`\nFAILED: ${def.filename} — ${message}\n`);
      results.push({ name: def.filename, status: `FAILED: ${message}` });
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log('Generation Summary');
  console.log('='.repeat(70));
  for (const r of results) {
    console.log(`  ${r.status === 'SUCCESS' ? '[OK]' : '[!!]'} ${r.name} — ${r.status}`);
  }
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
