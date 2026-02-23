/**
 * Topic Selector — Daily pillar rotation with category deduplication
 *
 * Selects the least-recently-used content pillar, picks a category that
 * hasn't been posted in the last 7 days, and assigns an appropriate
 * image type based on pillar-to-visual mapping.
 */

import { prisma } from '@/lib/prisma';
import { getFactsForPost } from '../content/fact-bank';
import { getPostsByCategory } from '../content/post-templates';
import type { PostCategory, ImageType, BrandId } from '../reddit-types';
import type { TopicSelection, PillarCode } from './types';

// ---------------------------------------------------------------------------
// Pillar → category mapping
// ---------------------------------------------------------------------------

const PILLAR_CATEGORIES: Record<PillarCode, PostCategory[]> = {
  A: ['mould', 'water-damage', 'property'],           // Indoor Environmental Health
  B: ['iicrc', 'training', 'network'],                 // Qualified Restorer vs Builder
  C: ['insurance', 'cost-guide'],                       // Insurance Claim Autopsy
  D: ['property', 'network', 'software'],               // Commercial & Strata
  E: ['water-damage', 'fire', 'mould', 'cost-guide'],  // Mythbusting & Consumer Education
};

// ---------------------------------------------------------------------------
// Pillar → preferred image types
// ---------------------------------------------------------------------------

const PILLAR_IMAGE_TYPES: Record<PillarCode, ImageType[]> = {
  A: ['stat-infographic', 'hero-banner'],
  B: ['comparison-table', 'hero-banner'],
  C: ['stat-infographic', 'cost-breakdown'],
  D: ['hero-banner', 'process-flow'],
  E: ['hero-banner', 'comparison-table'],
};

// ---------------------------------------------------------------------------
// Pillar → brand focus
// ---------------------------------------------------------------------------

const PILLAR_BRANDS: Record<PillarCode, BrandId[]> = {
  A: ['disaster-recovery', 'carsi', 'nrpg'],
  B: ['carsi', 'nrpg', 'disaster-recovery'],
  C: ['disaster-recovery', 'restore-assist', 'nrpg'],
  D: ['nrpg', 'disaster-recovery', 'restore-assist'],
  E: ['disaster-recovery', 'carsi', 'restore-assist'],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Select the daily topic by:
 * 1. Querying the least-recently-used active pillar
 * 2. Filtering out categories posted in the last 7 days
 * 3. Picking a random category from the remaining options
 * 4. Selecting a topic title from existing POST_TEMPLATES for that category
 * 5. Assigning an image type based on pillar mapping
 * 6. Pulling 3-5 facts from the FACT_BANK
 */
export async function selectDailyTopic(forceCategory?: PostCategory): Promise<TopicSelection> {
  // 1. Get least-recently-used pillar
  const pillar = await prisma.redditContentPillar.findFirst({
    where: { isActive: true },
    orderBy: { lastUsedAt: 'asc' },
  });

  if (!pillar) {
    throw new Error('No active content pillars found. Run the seed script first.');
  }

  const pillarCode = pillar.code as PillarCode;
  const availableCategories = PILLAR_CATEGORIES[pillarCode] || ['water-damage'];

  // 2. Check recently posted categories (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentPosts = await prisma.redditPost.findMany({
    where: {
      postedAt: { gte: sevenDaysAgo },
      status: 'POSTED',
    },
    select: { category: true },
  });

  const recentCategories = new Set(recentPosts.map((p) => p.category));

  // 3. Filter out recently used categories
  let category: PostCategory;
  if (forceCategory) {
    category = forceCategory;
  } else {
    const unused = availableCategories.filter((c) => !recentCategories.has(c));
    const pool = unused.length > 0 ? unused : availableCategories;
    category = pool[Math.floor(Math.random() * pool.length)];
  }

  // 4. Select a topic from existing templates
  const templates = getPostsByCategory(category);
  const topic = templates.length > 0
    ? templates[Math.floor(Math.random() * templates.length)].title
    : `Australian ${category.replace(/-/g, ' ')} — Expert guide`;

  // 5. Assign image type
  const imageTypes = PILLAR_IMAGE_TYPES[pillarCode] || ['hero-banner'];
  const imageType = imageTypes[Math.floor(Math.random() * imageTypes.length)];

  // 6. Pull facts
  const facts = getFactsForPost(category, 4);

  // 7. Get brands
  const brands = PILLAR_BRANDS[pillarCode] || ['disaster-recovery'];

  // 8. Update pillar usage
  await prisma.redditContentPillar.update({
    where: { id: pillar.id },
    data: {
      lastUsedAt: new Date(),
      usageCount: { increment: 1 },
    },
  });

  return {
    pillarCode,
    pillarName: pillar.name,
    pillarId: pillar.id,
    category,
    topic,
    brands,
    imageType,
    facts,
  };
}
