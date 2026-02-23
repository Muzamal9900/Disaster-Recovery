/**
 * Safety Gates — 4-gate parallel safety pipeline
 *
 * Runs all 4 gates concurrently via Promise.all using Claude Haiku:
 * 1. Claim Type Labelling — verifies factual claims are tagged
 * 2. Hallucination Audit — cross-checks stats against FACT_BANK
 * 3. Spam Pattern Audit — checks brand density and promotional language
 * 4. Mod Safety Audit — checks for medical/legal advice and mod triggers
 */

import { generateText } from 'ai';
import { safetyModel } from './ai-provider';
import { FACT_BANK } from '../content/fact-bank';
import { BRAND_REGISTRY } from '../content/brand-cross-links';
import type { SafetyGateName, SafetyGateResult, SafetyPipelineResult } from './types';
import type { PostCategory } from '../reddit-types';

// ---------------------------------------------------------------------------
// Gate definitions
// ---------------------------------------------------------------------------

interface GateConfig {
  name: SafetyGateName;
  buildPrompt: (title: string, body: string, category: PostCategory) => string;
}

const GATES: GateConfig[] = [
  {
    name: 'claim-labelling',
    buildPrompt: (title, body) => `You are a fact-checking auditor for Reddit posts about Australian disaster recovery.

Analyse this Reddit post and verify that ALL factual claims include proper source attribution.

## Post Title: ${title}

## Post Body:
${body}

## Task:
1. Identify every factual claim (statistics, percentages, dollar amounts, dates, legal references)
2. Check if each claim has an inline source citation (e.g. *Source: [citation] (year)*)
3. Flag any unsourced factual claims

## Output Format (JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "findings": ["list of issues found, empty if all claims are sourced"]
}

Return ONLY the JSON object.`,
  },
  {
    name: 'hallucination',
    buildPrompt: (title, body, category) => {
      const knownFacts = FACT_BANK[category]
        ?.map((f) => `- "${f.statistic}" (${f.source}, ${f.year})`)
        .join('\n') || 'No facts available for this category';

      return `You are a hallucination detection auditor for Australian disaster recovery content.

## Post Title: ${title}

## Post Body:
${body}

## KNOWN VERIFIED FACTS for category "${category}":
${knownFacts}

## Task:
1. Extract every statistic, number, and factual claim from the post
2. Cross-reference each against the KNOWN VERIFIED FACTS above
3. Flag any statistic that does NOT appear in the verified facts list
4. Minor paraphrasing is acceptable; fabricated numbers are NOT

## Output Format (JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "findings": ["list of potentially hallucinated facts, empty if all check out"]
}

Return ONLY the JSON object.`;
    },
  },
  {
    name: 'spam',
    buildPrompt: (title, body) => {
      const brandNames = Object.values(BRAND_REGISTRY).map((b) => b.name).join(', ');
      const brandUrls = Object.values(BRAND_REGISTRY).map((b) => b.url).join(', ');

      return `You are a Reddit spam pattern auditor. Check this post for promotional spam signals.

## Post Title: ${title}

## Post Body:
${body}

## Known Brand Names: ${brandNames}
## Known Brand URLs: ${brandUrls}

## Spam Rules:
1. Maximum 2 mentions per brand name (case-insensitive)
2. Maximum 8 total hyperlinks in the post
3. No aggressive call-to-action language ("Buy now!", "Sign up today!", "Limited offer!")
4. No excessive superlatives ("best ever", "number one", "guaranteed")
5. Educational tone, not promotional — post should provide value independent of brand mentions
6. Brand links should be contextually relevant, not forced

## Output Format (JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "findings": ["list of spam signals found, empty if clean"]
}

Return ONLY the JSON object.`;
    },
  },
  {
    name: 'mod-safety',
    buildPrompt: (title, body) => `You are a Reddit moderator safety auditor for r/Disaster_Recovery_Qld.

## Post Title: ${title}

## Post Body:
${body}

## Moderation Rules:
1. NO medical advice (e.g. "you should see a doctor", specific health recommendations)
2. NO legal advice (e.g. "you should sue", specific legal strategies)
3. NO absolute safety claims ("guaranteed safe", "100% effective")
4. NO fear-mongering or alarmist language designed to panic
5. NO personal attacks on competitors or insurers
6. NO misinformation about government programs or emergency services
7. Content should be suitable for a professional industry subreddit
8. Australian context — references should be to Australian organisations and standards

## Output Format (JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "findings": ["list of moderation issues found, empty if safe"]
}

Return ONLY the JSON object.`,
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Run all 4 safety gates in parallel.
 * Returns the combined result — if ANY gate fails, the pipeline fails.
 */
export async function runSafetyPipeline(
  title: string,
  body: string,
  category: PostCategory,
): Promise<SafetyPipelineResult> {
  const startTime = Date.now();

  const gateResults = await Promise.all(
    GATES.map((gate) => runSingleGate(gate, title, body, category)),
  );

  const totalDurationMs = Date.now() - startTime;
  const totalTokens = gateResults.reduce((sum, g) => sum + g.tokensUsed, 0);
  const allPassed = gateResults.every((g) => g.passed);

  return {
    allPassed,
    gates: gateResults,
    totalTokens,
    totalDurationMs,
  };
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

async function runSingleGate(
  gate: GateConfig,
  title: string,
  body: string,
  category: PostCategory,
): Promise<SafetyGateResult> {
  const startTime = Date.now();

  try {
    const prompt = gate.buildPrompt(title, body, category);

    const result = await generateText({
      model: safetyModel,
      prompt,
      maxOutputTokens: 1024,
      temperature: 0.1,
    });

    const durationMs = Date.now() - startTime;
    const parsed = parseGateResponse(result.text);

    return {
      gateName: gate.name,
      gateModel: 'claude-haiku-4-5-20251001',
      passed: parsed.passed,
      confidence: parsed.confidence,
      findings: parsed.findings,
      tokensUsed: result.usage?.totalTokens ?? 0,
      durationMs,
    };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    return {
      gateName: gate.name,
      gateModel: 'claude-haiku-4-5-20251001',
      passed: false,
      confidence: 0,
      findings: [`Gate error: ${error instanceof Error ? error.message : String(error)}`],
      tokensUsed: 0,
      durationMs,
    };
  }
}

function parseGateResponse(text: string): { passed: boolean; confidence: number; findings: string[] } {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  const jsonStr = (jsonMatch[1] || text).trim();

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      passed: Boolean(parsed.passed),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.5,
      findings: Array.isArray(parsed.findings) ? parsed.findings : [],
    };
  } catch {
    return {
      passed: false,
      confidence: 0,
      findings: ['Failed to parse safety gate response'],
    };
  }
}
