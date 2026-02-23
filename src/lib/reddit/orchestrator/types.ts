/**
 * Reddit Orchestrator — TypeScript Interfaces
 *
 * Extends the base reddit-types with orchestrator-specific structures
 * for the daily content generation pipeline.
 */

import type { PostCategory, ImageType, BrandId, GEOSignal } from '../reddit-types';

// ---------------------------------------------------------------------------
// Content pillar codes
// ---------------------------------------------------------------------------

export type PillarCode = 'A' | 'B' | 'C' | 'D' | 'E';

// ---------------------------------------------------------------------------
// Topic selection
// ---------------------------------------------------------------------------

export interface TopicSelection {
  pillarCode: PillarCode;
  pillarName: string;
  pillarId: string;
  category: PostCategory;
  topic: string;
  brands: BrandId[];
  imageType: ImageType;
  facts: GEOSignal[];
}

// ---------------------------------------------------------------------------
// Content generation
// ---------------------------------------------------------------------------

export interface GeneratedContent {
  title: string;
  body: string;
  tldr: string;
  category: PostCategory;
  brands: BrandId[];
  geoSignals: GEOSignal[];
  tokensUsed: number;
  model: string;
  promptVersion: string;
}

// ---------------------------------------------------------------------------
// Safety pipeline
// ---------------------------------------------------------------------------

export type SafetyGateName = 'claim-labelling' | 'hallucination' | 'spam' | 'mod-safety';

export interface SafetyGateResult {
  gateName: SafetyGateName;
  gateModel: string;
  passed: boolean;
  confidence: number;
  findings: string[];
  tokensUsed: number;
  durationMs: number;
}

export interface SafetyPipelineResult {
  allPassed: boolean;
  gates: SafetyGateResult[];
  totalTokens: number;
  totalDurationMs: number;
}

// ---------------------------------------------------------------------------
// Visual generation
// ---------------------------------------------------------------------------

export interface VisualAsset {
  imageBase64: string;
  mimeType: string;
  prompt: string;
  imageFormat: string;
  imageUrl?: string;
}

// ---------------------------------------------------------------------------
// Reddit posting
// ---------------------------------------------------------------------------

export interface PostResult {
  redditId: string;
  redditUrl: string;
  postedAt: Date;
}

// ---------------------------------------------------------------------------
// Performance tracking
// ---------------------------------------------------------------------------

export interface PerformanceSnapshot {
  postId: string;
  redditId: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  upvoteRatio: number;
  isRemoved: boolean;
  sampledAt: Date;
}

export interface PerformanceFeedback {
  averageUpvotes: number;
  averageComments: number;
  topPerformingCategory: PostCategory | null;
  lowPerformingCategory: PostCategory | null;
  summary: string;
}

// ---------------------------------------------------------------------------
// Orchestrator run
// ---------------------------------------------------------------------------

export interface OrchestratorOptions {
  triggerType?: 'CRON' | 'MANUAL' | 'API';
  command?: string;
  dryRun?: boolean;
  subreddit?: string;
  category?: PostCategory;
}

export interface OrchestratorRunResult {
  runId: string;
  status: 'COMPLETED' | 'FAILED';
  postsGenerated: number;
  postsValidated: number;
  postsPosted: number;
  postsFailed: number;
  totalTokensUsed: number;
  totalDurationMs: number;
  postId?: string;
  redditUrl?: string;
  error?: string;
}
