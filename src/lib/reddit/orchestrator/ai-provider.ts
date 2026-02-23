/**
 * AI Provider — Vercel AI SDK Model Configuration
 *
 * Centralised model definitions for the Reddit orchestrator pipeline.
 * Content generation uses Claude Sonnet; safety gates use Claude Haiku.
 */

import { anthropic } from '@ai-sdk/anthropic';

/** Primary content generation model — Claude Sonnet */
export const contentModel = anthropic('claude-sonnet-4-20250514');

/** Safety gate model — Claude Haiku (fast, low-cost) */
export const safetyModel = anthropic('claude-haiku-4-5-20251001');
