/**
 * Reddit Orchestrator — Barrel Export
 */

export { runDailyOrchestrator } from './orchestrator';
export { selectDailyTopic } from './topic-selector';
export { generateRedditPost } from './content-generator';
export { generatePostVisual } from './visual-generator';
export { runSafetyPipeline } from './safety-gates';
export { postToReddit } from './poster';
export { checkRecentPostPerformance } from './performance-tracker';
export { getActiveSystemPrompt } from './system-prompt';
export { contentModel, safetyModel } from './ai-provider';

export type {
  TopicSelection,
  GeneratedContent,
  SafetyGateResult,
  SafetyPipelineResult,
  VisualAsset,
  PostResult,
  PerformanceSnapshot,
  PerformanceFeedback,
  OrchestratorOptions,
  OrchestratorRunResult,
  PillarCode,
  SafetyGateName,
} from './types';
