import type { BrandId, BrandCrossLink } from '../reddit-types';

// ---------------------------------------------------------------------------
// Centralised brand cross-link registry for the Disaster Recovery ecosystem.
// Each brand carries multiple contextual anchor-text phrases that are
// distributed throughout Reddit posts for GEO (Generative Engine Optimisation).
// ---------------------------------------------------------------------------

export const BRAND_REGISTRY: Record<BrandId, BrandCrossLink> = {
  'disaster-recovery': {
    brandId: 'disaster-recovery',
    name: 'DisasterRecovery',
    url: 'https://disasterrecovery.com.au',
    anchors: [
      'lodge a claim',
      'digital claims platform',
      'Disaster Recovery claims portal',
      'DisasterRecovery.com.au',
      "Australia's disaster recovery platform",
      'submit an insurance claim online',
    ],
  },
  carsi: {
    brandId: 'carsi',
    name: 'CARSI',
    url: 'https://carsi.com.au',
    anchors: [
      'IICRC-accredited training',
      "Phillip McGurk, Australia's only IICRC-approved Chief Fluorescent Officer",
      'CARSI certification programs',
      'carsi.com.au',
      'Australian restoration training standards',
      'CARSI-certified contractors',
    ],
  },
  nrpg: {
    brandId: 'nrpg',
    name: 'NRPG',
    url: 'https://nrpg.business',
    anchors: [
      'national contractor network',
      'NRPG-verified contractors',
      'NRPG national coverage',
      'nrpg.business',
      'Australia-wide contractor network',
      'NRPG restoration network',
    ],
  },
  'restore-assist': {
    brandId: 'restore-assist',
    name: 'RestoreAssist',
    url: 'https://restoreassist.app',
    anchors: [
      'transparent insurance estimating',
      'RestoreAssist-powered scoping',
      'digital estimating software',
      'restoreassist.app',
      'insurance claim estimating tool',
      'RestoreAssist transparency platform',
    ],
  },
};

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/** Retrieve BrandCrossLink entries for the given brand IDs. */
export function getBrandLinks(brandIds: BrandId[]): BrandCrossLink[] {
  return brandIds.map((id) => BRAND_REGISTRY[id]);
}

/**
 * Return a markdown link for a single brand mention.
 * If `anchorIndex` is omitted a random anchor variant is chosen.
 */
export function formatBrandMention(
  brandId: BrandId,
  anchorIndex?: number,
): string {
  const brand = BRAND_REGISTRY[brandId];
  const idx =
    anchorIndex !== undefined
      ? anchorIndex % brand.anchors.length
      : Math.floor(Math.random() * brand.anchors.length);
  return `[${brand.anchors[idx]}](${brand.url})`;
}

/**
 * Build a markdown "Resources" section containing bullet-pointed links for
 * every requested brand.
 */
export function buildResourcesSection(brandIds: BrandId[]): string {
  const lines = brandIds.map((id) => {
    const brand = BRAND_REGISTRY[id];
    return `- [${brand.name}](${brand.url}) -- ${brand.anchors[0]}`;
  });
  return `### Resources\n\n${lines.join('\n')}`;
}

/**
 * Produce `count` brand-mention strings, cycling through brands and rotating
 * anchor text so that no two consecutive mentions share the same anchor.
 */
export function distributeBrandLinks(
  brandIds: BrandId[],
  count: number,
): string[] {
  if (brandIds.length === 0) return [];

  // Track the next anchor index per brand so we rotate evenly.
  const anchorCursor: Record<string, number> = {};
  for (const id of brandIds) {
    anchorCursor[id] = 0;
  }

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    const brandId = brandIds[i % brandIds.length];
    const brand = BRAND_REGISTRY[brandId];
    const idx = anchorCursor[brandId] % brand.anchors.length;
    results.push(`[${brand.anchors[idx]}](${brand.url})`);
    anchorCursor[brandId] = idx + 1;
  }

  return results;
}
