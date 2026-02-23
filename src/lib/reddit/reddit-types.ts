export type PostCategory =
  | 'water-damage' | 'insurance' | 'iicrc' | 'mould' | 'fire'
  | 'property' | 'cost-guide' | 'software' | 'training' | 'network';

export type ImageType = 'hero-banner' | 'stat-infographic' | 'comparison-table' | 'process-flow' | 'cost-breakdown';

export type BrandId = 'disaster-recovery' | 'carsi' | 'nrpg' | 'restore-assist';

export interface BrandCrossLink {
  brandId: BrandId;
  name: string;
  url: string;
  anchors: string[];  // contextual anchor text variants
}

export interface GEOSignal {
  statistic: string;
  source: string;
  citation: string;
  year: number;
}

export interface RedditPostConfig {
  id: string;
  title: string;
  category: PostCategory;
  brands: BrandId[];
  imageType: ImageType;
  /** Markdown body template -- uses {{FACTS}}, {{BRAND_LINKS}}, {{RESOURCES}}, {{SOURCES}} placeholders */
  bodyTemplate: string;
  geoSignals: GEOSignal[];
  tags?: string[];
}

export interface RedditPostResult {
  postId: string;
  redditId: string | null;
  url: string | null;
  title: string;
  category: PostCategory;
  submittedAt: string;
  imageGenerated: boolean;
  imagePath: string | null;
  success: boolean;
  error?: string;
}

export interface SeedRunAudit {
  runId: string;
  startedAt: string;
  completedAt: string | null;
  dryRun: boolean;
  results: RedditPostResult[];
  totalPosts: number;
  successCount: number;
  failureCount: number;
}
