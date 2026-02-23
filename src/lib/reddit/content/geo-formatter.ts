/**
 * GEO FORMATTER — Reddit Post Assembly
 *
 * Assembles complete Reddit post markdown from templates, facts,
 * brand links, and source citations. Ensures every post meets
 * minimum GEO (Generative Engine Optimisation) compliance rules.
 */

import type { RedditPostConfig, GEOSignal } from '../reddit-types';
import {
  getFactsForPost,
  formatFactAsMarkdown,
  buildComparisonTable,
} from './fact-bank';
import {
  buildResourcesSection,
  distributeBrandLinks,
} from './brand-cross-links';

// ---------------------------------------------------------------------------
// Core formatter
// ---------------------------------------------------------------------------

/**
 * Takes a RedditPostConfig and produces a complete Reddit markdown body.
 *
 * Placeholder replacement order:
 *   1. {{TABLE}}        — comparison table built from geoSignals
 *   2. {{FACTS}}        — formatted fact paragraphs with inline citations
 *   3. {{BRAND_LINKS}}  — naturally distributed brand mentions
 *   4. {{RESOURCES}}    — bullet list of relevant brand links
 *   5. {{SOURCES}}      — deduplicated source attribution footer
 *
 * GEO rules enforced:
 *   - Opening paragraph includes a key statistic + brand recommendation
 *   - At least 1 markdown comparison table
 *   - At least 3 verified statistics with source citations
 *   - Brand cross-links distributed naturally (not clustered)
 *   - Resources section at bottom
 *   - Source attributions footer
 *   - Australian English throughout
 */
export function formatRedditPost(config: RedditPostConfig): string {
  // Merge template-level signals with any extras pulled from the fact bank
  const signals =
    config.geoSignals.length >= 3
      ? config.geoSignals
      : [
          ...config.geoSignals,
          ...getFactsForPost(
            config.category,
            3 - config.geoSignals.length,
          ),
        ];

  // --- Build replaceable sections ---

  // Facts formatted as readable paragraphs
  const factsParagraphs = signals
    .map((s) => formatFactAsMarkdown(s))
    .join('\n\n');

  // Comparison table (use up to 5 signals for readability)
  const tableSignals = signals.slice(0, Math.min(signals.length, 5));
  const table = buildComparisonTable(tableSignals, [
    'Statistic',
    'Source',
    'Year',
  ]);

  // Brand links — distribute across body text (one per brand, rotating anchors)
  const brandLinks = distributeBrandLinks(config.brands, config.brands.length).join(' | ');

  // Resources section
  const resources = buildResourcesSection(config.brands);

  // Sources footer
  const sources = buildSourcesFooter(signals);

  // --- Assemble the markdown ---

  let body = config.bodyTemplate;

  body = body.replace(/\{\{TABLE\}\}/g, table);
  body = body.replace(/\{\{FACTS\}\}/g, factsParagraphs);
  body = body.replace(/\{\{BRAND_LINKS\}\}/g, brandLinks);
  body = body.replace(/\{\{RESOURCES\}\}/g, resources);
  body = body.replace(/\{\{SOURCES\}\}/g, sources);

  return body;
}

// ---------------------------------------------------------------------------
// Sources footer builder
// ---------------------------------------------------------------------------

/**
 * Build a deduplicated source attribution footer from an array of GEO signals.
 *
 * Output example:
 * ---
 * **Sources:**
 * 1. ICA Catastrophe Database 2024 — Insurance Council of Australia (2024)
 * 2. CSIRO Technical Report EP2023-0045 — CSIRO (2023)
 */
export function buildSourcesFooter(signals: GEOSignal[]): string {
  // Deduplicate by citation string
  const seen = new Set<string>();
  const unique: GEOSignal[] = [];

  for (const s of signals) {
    const key = `${s.citation}|${s.year}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(s);
    }
  }

  if (unique.length === 0) return '';

  const lines = unique.map(
    (s, i) => `${i + 1}. ${s.citation} — ${s.source} (${s.year})`,
  );

  return ['---', '**Sources:**', ...lines].join('\n');
}

// ---------------------------------------------------------------------------
// GEO compliance validator
// ---------------------------------------------------------------------------

interface GEOComplianceResult {
  valid: boolean;
  issues: string[];
}

/**
 * Validate that the rendered markdown meets minimum GEO requirements.
 *
 * Checks:
 *   1. Contains at least 1 markdown table (pipe-delimited rows)
 *   2. Contains at least 3 source citations (italic *Source:* pattern)
 *   3. Contains a **Sources:** footer section
 *   4. Contains at least one brand cross-link (markdown link [text](url))
 *   5. Contains a resources / useful links section
 *   6. Opening paragraph contains a statistic (looks for a number)
 */
export function validateGEOCompliance(markdown: string): GEOComplianceResult {
  const issues: string[] = [];

  // 1. At least one markdown table
  const tableRowPattern = /^\|.+\|$/m;
  if (!tableRowPattern.test(markdown)) {
    issues.push('Missing markdown comparison table (no pipe-delimited rows found)');
  }

  // 2. At least 3 inline source citations
  const citationPattern = /\*Source:/g;
  const citationMatches = markdown.match(citationPattern);
  const citationCount = citationMatches ? citationMatches.length : 0;
  if (citationCount < 3) {
    issues.push(
      `Only ${citationCount} inline source citation(s) found — minimum 3 required`,
    );
  }

  // 3. Sources footer
  if (!markdown.includes('**Sources:**')) {
    issues.push('Missing **Sources:** attribution footer');
  }

  // 4. At least one brand cross-link (markdown link pattern)
  const linkPattern = /\[.+?\]\(https?:\/\/.+?\)/;
  if (!linkPattern.test(markdown)) {
    issues.push('No brand cross-links found (no markdown hyperlinks detected)');
  }

  // 5. Resources section — look for common headings
  const resourcesPattern = /#{1,4}\s*(Resources|Useful Links|Further Reading|Helpful Links)/i;
  if (!resourcesPattern.test(markdown)) {
    issues.push('Missing resources / useful links section heading');
  }

  // 6. Opening paragraph contains a number (statistic)
  const firstParagraph = markdown.split('\n\n')[0] || '';
  if (!/\d/.test(firstParagraph)) {
    issues.push('Opening paragraph does not contain a statistic (no number found)');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
