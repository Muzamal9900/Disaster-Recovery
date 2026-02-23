/**
 * Seed Script — Reddit Orchestrator
 *
 * Seeds the 5 content pillars and the v2.0 system prompt.
 * Run: npx tsx scripts/seed-reddit-orchestrator.ts
 */

import { PrismaClient } from '@prisma/client';
import { FALLBACK_SYSTEM_PROMPT } from '../src/lib/reddit/orchestrator/system-prompt';

const prisma = new PrismaClient();

const PILLARS = [
  {
    code: 'A',
    name: 'Indoor Environmental Health',
    description: 'Mould science, air quality, health risks, remediation standards',
    categories: ['mould', 'water-damage', 'property'],
  },
  {
    code: 'B',
    name: 'Qualified Restorer vs General Builder',
    description: 'IICRC certification value, equipment standards, legal precedents',
    categories: ['iicrc', 'training', 'network'],
  },
  {
    code: 'C',
    name: 'Insurance Claim Autopsy',
    description: 'Claims process education, insurer comparisons, policyholder rights',
    categories: ['insurance', 'cost-guide'],
  },
  {
    code: 'D',
    name: 'Commercial & Strata Restoration',
    description: 'Body corporate obligations, multi-level drying, business continuity',
    categories: ['property', 'network', 'software'],
  },
  {
    code: 'E',
    name: 'Mythbusting & Consumer Education',
    description: 'Common misconceptions, DIY vs professional, cost transparency',
    categories: ['water-damage', 'fire', 'mould', 'cost-guide'],
  },
];

async function main() {
  console.log('Seeding Reddit Orchestrator data...\n');

  // Seed content pillars
  for (const pillar of PILLARS) {
    const existing = await prisma.redditContentPillar.findUnique({
      where: { code: pillar.code },
    });

    if (existing) {
      console.log(`  Pillar ${pillar.code} already exists: "${pillar.name}"`);
    } else {
      await prisma.redditContentPillar.create({
        data: {
          code: pillar.code,
          name: pillar.name,
          description: pillar.description,
          categories: pillar.categories,
        },
      });
      console.log(`  Created pillar ${pillar.code}: "${pillar.name}"`);
    }
  }

  // Seed system prompt
  const existingPrompt = await prisma.redditSystemPrompt.findUnique({
    where: { version: 'v2.0' },
  });

  if (existingPrompt) {
    console.log('\n  System prompt v2.0 already exists');
  } else {
    await prisma.redditSystemPrompt.create({
      data: {
        version: 'v2.0',
        promptText: FALLBACK_SYSTEM_PROMPT,
        isActive: true,
      },
    });
    console.log('\n  Created system prompt v2.0 (active)');
  }

  console.log('\nSeed complete.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
