/**
 * Visual Generator — Post imagery via Nano Banana Pro (Gemini 3 Pro Image)
 *
 * Generates 16:9 hero visuals for Reddit posts using the existing
 * generateVisual() pipeline and reddit-visual-prompts category system.
 */

import { generateVisual } from '@/lib/visual-generator';
import { buildRedditHeroBannerPrompt, REDDIT_VISUAL_CONFIGS } from '../visual/reddit-visual-prompts';
import type { TopicSelection, GeneratedContent, VisualAsset } from './types';
import type { ImageType } from '../reddit-types';

// ---------------------------------------------------------------------------
// Image type → visual prompt strategy
// ---------------------------------------------------------------------------

interface VisualStrategy {
  buildPrompt: (title: string, category: string, content: GeneratedContent) => string;
}

const VISUAL_STRATEGIES: Partial<Record<ImageType, VisualStrategy>> = {
  'stat-infographic': {
    buildPrompt: (title, category, content) => {
      const stats = content.geoSignals.slice(0, 3).map((s) => s.statistic).join('; ');
      return [
        `Professional infographic for Reddit: "${title}"`,
        '',
        `Data points to visualise: ${stats}`,
        '',
        'Style: Clean data infographic with bold icons, clear hierarchy, and readable typography.',
        'Brand: DisasterRecovery deep blue (#1e3a5f) and amber (#d4a84b) colour palette.',
        'Layout: Vertical flow with 3-5 key facts, each with an icon and bold stat.',
        'Australian context. 16:9 aspect ratio for Reddit social preview.',
        '',
        'IMPORTANT: No tiny text. All text must be legible at social media preview size.',
        'No watermarks. Photorealistic quality, clean professional design.',
      ].join('\n');
    },
  },
  'comparison-table': {
    buildPrompt: (title, _category, _content) => {
      return [
        `Side-by-side comparison visual for Reddit: "${title}"`,
        '',
        'Split-screen composition: left shows general builder with basic tools in a residential setting,',
        'right shows IICRC-certified restorer with professional moisture meters, HEPA equipment, and branded PPE.',
        '',
        'Style: Clean professional comparison with subtle dividing line.',
        'Left side: Warm but slightly muted tones. Right side: Vibrant, professional lighting.',
        'Brand: DisasterRecovery deep blue (#1e3a5f) accent on the professional side.',
        'Australian residential environment. 16:9 aspect ratio.',
        '',
        'IMPORTANT: No text in image. Photorealistic quality. Dramatic lighting contrast.',
      ].join('\n');
    },
  },
  'cost-breakdown': {
    buildPrompt: (title, _category, content) => {
      const stats = content.geoSignals.slice(0, 2).map((s) => s.statistic).join('; ');
      return [
        `Financial data visualisation for Reddit: "${title}"`,
        '',
        `Key data: ${stats}`,
        '',
        'Style: Professional financial chart/graph visual with clear data hierarchy.',
        'Brand: Deep blue (#1e3a5f) primary with amber (#d4a84b) accent highlights.',
        'Modern dashboard aesthetic with clean lines and professional typography.',
        'Australian dollar context. 16:9 aspect ratio for Reddit.',
        '',
        'IMPORTANT: No tiny text. All numbers must be clearly legible. No watermarks.',
      ].join('\n');
    },
  },
  'process-flow': {
    buildPrompt: (title, _category, _content) => {
      return [
        `Process flow diagram visual for Reddit: "${title}"`,
        '',
        'Horizontal step-by-step process flow with 4-5 numbered stages.',
        'Each stage has a circular icon and connecting arrows.',
        'Professional restoration workflow context — assessment, extraction, drying, monitoring, completion.',
        '',
        'Style: Clean modern infographic with professional icons.',
        'Brand: Deep blue (#1e3a5f) backgrounds with amber (#d4a84b) accent arrows.',
        'Australian commercial restoration environment. 16:9 aspect ratio.',
        '',
        'IMPORTANT: Minimal text, icon-driven. No watermarks.',
      ].join('\n');
    },
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a visual asset for a Reddit post using Nano Banana Pro.
 *
 * Strategy:
 * 1. Check if a specialised visual strategy exists for the image type
 * 2. If so, build a custom prompt; otherwise use the default hero banner prompt
 * 3. Generate via the existing generateVisual() pipeline
 */
export async function generatePostVisual(
  topic: TopicSelection,
  content: GeneratedContent,
): Promise<VisualAsset> {
  const strategy = VISUAL_STRATEGIES[topic.imageType];
  let prompt: string;

  if (strategy) {
    prompt = strategy.buildPrompt(content.title, content.category, content);
  } else {
    // Default: use the category-based hero banner prompt
    prompt = buildRedditHeroBannerPrompt(content.title, content.category);
  }

  const config = REDDIT_VISUAL_CONFIGS[topic.imageType] || REDDIT_VISUAL_CONFIGS['hero-banner'];

  const result = await generateVisual({
    brand: config.brand,
    assetType: 'hero-image',
    description: prompt,
    aspectRatio: '16:9',
    resolution: '2K',
  });

  return {
    imageBase64: result.imageBase64,
    mimeType: result.mimeType,
    prompt: result.prompt,
    imageFormat: topic.imageType,
  };
}
