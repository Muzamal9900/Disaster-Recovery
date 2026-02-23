/**
 * Infographic Builder — Server-side chart and infographic renderer
 *
 * Uses the `canvas` npm package for stat infographics and cost breakdowns,
 * and puppeteer for comparison tables and process flows.
 * All output is 1200x675 (16:9) PNG matching the DR brand palette.
 */

import { createCanvas } from 'canvas';
import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import type { ImageType, PostCategory } from '../reddit-types';

// ---------------------------------------------------------------------------
// Brand colour constants
// ---------------------------------------------------------------------------

const COLOURS = {
  bgDark: '#1a1a2e',
  deepBlue: '#1e3a5f',
  amber: '#d4a853',
  white: '#ffffff',
  lightGrey: '#c0c0c0',
  midGrey: '#3a3a5e',
  accent: '#2a5a8f',
} as const;

const CHART_PALETTE = [
  COLOURS.deepBlue,
  COLOURS.amber,
  COLOURS.accent,
  '#5b8fb9',
  '#b8860b',
  '#4682b4',
  '#cd853f',
  '#6495ed',
];

const WIDTH = 1200;
const HEIGHT = 675;

// ---------------------------------------------------------------------------
// 1. Stat Infographic (canvas)
// ---------------------------------------------------------------------------

export async function generateStatInfographic(
  title: string,
  stats: { label: string; value: string | number; color?: string }[],
  outputPath: string,
): Promise<void> {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLOURS.bgDark;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Top accent line
  ctx.fillStyle = COLOURS.amber;
  ctx.fillRect(0, 0, WIDTH, 4);

  // Title
  ctx.fillStyle = COLOURS.white;
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, WIDTH / 2, 60, WIDTH - 80);

  // Stat cards — vertical list layout for full readability
  const cardCount = stats.length;
  const cardPadding = 14;
  const cardMarginX = 60;
  const cardWidth = WIDTH - cardMarginX * 2;
  const availableHeight = HEIGHT - 110 - 40; // below title, above footer
  const cardHeight = Math.min(110, (availableHeight - cardPadding * (cardCount - 1)) / cardCount);
  const totalCardsHeight = cardCount * cardHeight + (cardCount - 1) * cardPadding;
  const startY = 90 + (availableHeight - totalCardsHeight) / 2;

  stats.forEach((stat, i) => {
    const x = cardMarginX;
    const y = startY + i * (cardHeight + cardPadding);

    // Card background
    ctx.fillStyle = COLOURS.midGrey;
    roundRect(ctx, x, y, cardWidth, cardHeight, 10);

    // Left colour accent bar
    const barColour = stat.color || CHART_PALETTE[i % CHART_PALETTE.length];
    ctx.fillStyle = barColour;
    roundRect(ctx, x, y, 6, cardHeight, 10);

    // Stat number/highlight — extract leading number if present
    const valueStr = String(stat.value);
    const numberMatch = valueStr.match(/^([\d$%.,]+(?:\s?(?:billion|million|%|B|M|K))?)/i);
    const highlight = numberMatch ? numberMatch[1] : '';
    const restOfStat = highlight ? valueStr.slice(highlight.length).trim() : valueStr;

    if (highlight) {
      // Big number on left side of card
      ctx.fillStyle = COLOURS.amber;
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'left';
      const highlightWidth = ctx.measureText(highlight).width;
      ctx.fillText(highlight, x + 24, y + cardHeight / 2 - 8);

      // Rest of stat text — word-wrapped
      ctx.fillStyle = COLOURS.white;
      ctx.font = '16px sans-serif';
      const textX = x + 24 + highlightWidth + 12;
      const maxTextWidth = cardWidth - (textX - x) - 20;
      wrapText(ctx, restOfStat, textX, y + cardHeight / 2 - 14, maxTextWidth, 20, 2);
    } else {
      // Full stat as wrapped text
      ctx.fillStyle = COLOURS.white;
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'left';
      wrapText(ctx, valueStr, x + 24, y + cardHeight / 2 - 14, cardWidth - 48, 20, 3);
    }

    // Source label — bottom right
    ctx.fillStyle = COLOURS.lightGrey;
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(stat.label, x + cardWidth - 16, y + cardHeight - 14);
  });

  // Footer
  ctx.fillStyle = COLOURS.lightGrey;
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Source: DisasterRecovery.com.au', WIDTH / 2, HEIGHT - 20);

  // Write to file
  await ensureDir(outputPath);
  const buffer = canvas.toBuffer('image/png');
  await writeFile(outputPath, buffer);
}

// ---------------------------------------------------------------------------
// 2. Comparison Table (puppeteer)
// ---------------------------------------------------------------------------

export async function generateComparisonTable(
  title: string,
  headers: string[],
  rows: string[][],
  outputPath: string,
): Promise<void> {
  const headerCells = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const bodyRows = rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`,
    )
    .join('');

  const rowCount = rows.length;
  const fontSize = rowCount > 5 ? 13 : 15;
  const cellPadding = rowCount > 5 ? '8px 14px' : '10px 16px';

  const html = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px;
    background: ${COLOURS.bgDark};
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 24px 40px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  h1 {
    color: ${COLOURS.white}; font-size: 28px; margin-bottom: 20px;
    text-align: center; width: 100%; flex-shrink: 0;
  }
  .accent-bar { width: 100%; height: 4px; background: ${COLOURS.amber}; position: absolute; top: 0; left: 0; }
  .table-wrap { flex: 1; display: flex; align-items: center; width: 100%; max-width: 1120px; }
  table { border-collapse: collapse; width: 100%; }
  th {
    background: ${COLOURS.deepBlue}; color: ${COLOURS.amber};
    padding: ${cellPadding}; font-size: ${fontSize + 1}px; text-align: left;
    border-bottom: 2px solid ${COLOURS.amber};
  }
  td {
    color: ${COLOURS.lightGrey}; padding: ${cellPadding}; font-size: ${fontSize}px;
    border-bottom: 1px solid ${COLOURS.midGrey};
  }
  tr:nth-child(even) td { background: rgba(30,58,95,0.25); }
  td:first-child { color: ${COLOURS.white}; font-weight: 500; }
  .footer {
    color: ${COLOURS.lightGrey}; font-size: 12px;
    text-align: center; padding-top: 12px; flex-shrink: 0;
  }
</style></head><body>
  <div class="accent-bar"></div>
  <h1>${escapeHtml(title)}</h1>
  <div class="table-wrap"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>
  <div class="footer">Source: DisasterRecovery.com.au</div>
</body></html>`;

  await renderHtmlToPng(html, outputPath);
}

// ---------------------------------------------------------------------------
// 3. Process Flow (puppeteer)
// ---------------------------------------------------------------------------

export async function generateProcessFlow(
  title: string,
  steps: { step: string; description: string }[],
  outputPath: string,
): Promise<void> {
  const stepCards = steps
    .map((s, i) => {
      const arrow = i < steps.length - 1
        ? `<div class="arrow">&rarr;</div>`
        : '';
      return `<div class="step-wrapper">
        <div class="step-card">
          <div class="step-number">${i + 1}</div>
          <div class="step-title">${escapeHtml(s.step)}</div>
          <div class="step-desc">${escapeHtml(s.description)}</div>
        </div>
        ${arrow}
      </div>`;
    })
    .join('');

  const html = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px;
    background: ${COLOURS.bgDark};
    display: flex; flex-direction: column; align-items: center;
    padding: 32px 40px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  h1 {
    color: ${COLOURS.white}; font-size: 28px; margin-bottom: 32px;
    text-align: center; width: 100%;
  }
  .accent-bar { width: 100%; height: 4px; background: ${COLOURS.amber}; position: absolute; top: 0; left: 0; }
  .flow-container {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: nowrap; gap: 0; flex: 1; width: 100%;
  }
  .step-wrapper { display: flex; align-items: center; }
  .step-card {
    background: ${COLOURS.midGrey}; border-radius: 12px; padding: 20px 16px;
    width: ${Math.min(180, (WIDTH - 120) / steps.length - 30)}px;
    text-align: center; border-top: 3px solid ${COLOURS.amber};
  }
  .step-number {
    background: ${COLOURS.deepBlue}; color: ${COLOURS.amber};
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; font-size: 18px; margin: 0 auto 10px;
  }
  .step-title { color: ${COLOURS.white}; font-size: 14px; font-weight: bold; margin-bottom: 8px; }
  .step-desc { color: ${COLOURS.lightGrey}; font-size: 12px; line-height: 1.4; }
  .arrow { color: ${COLOURS.amber}; font-size: 28px; margin: 0 8px; flex-shrink: 0; }
  .footer {
    color: ${COLOURS.lightGrey}; font-size: 12px; margin-top: auto;
    text-align: center; padding-top: 12px;
  }
</style></head><body>
  <div class="accent-bar"></div>
  <h1>${escapeHtml(title)}</h1>
  <div class="flow-container">${stepCards}</div>
  <div class="footer">Source: DisasterRecovery.com.au</div>
</body></html>`;

  await renderHtmlToPng(html, outputPath);
}

// ---------------------------------------------------------------------------
// 4. Cost Breakdown (canvas — doughnut chart)
// ---------------------------------------------------------------------------

export async function generateCostBreakdown(
  title: string,
  items: { label: string; cost: string; percentage: number }[],
  outputPath: string,
): Promise<void> {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLOURS.bgDark;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Top accent line
  ctx.fillStyle = COLOURS.amber;
  ctx.fillRect(0, 0, WIDTH, 4);

  // Title
  ctx.fillStyle = COLOURS.white;
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, WIDTH / 2, 50, WIDTH - 80);

  // Doughnut chart — left side
  const centreX = 340;
  const centreY = 360;
  const outerRadius = 200;
  const innerRadius = 110;

  const total = items.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = -Math.PI / 2; // start at top

  items.forEach((item, i) => {
    const sliceAngle = (item.percentage / total) * Math.PI * 2;
    const colour = CHART_PALETTE[i % CHART_PALETTE.length];

    ctx.beginPath();
    ctx.arc(centreX, centreY, outerRadius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(centreX, centreY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();

    currentAngle += sliceAngle;
  });

  // Centre hole background
  ctx.beginPath();
  ctx.arc(centreX, centreY, innerRadius - 2, 0, Math.PI * 2);
  ctx.fillStyle = COLOURS.bgDark;
  ctx.fill();

  // Centre label
  ctx.fillStyle = COLOURS.white;
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Cost', centreX, centreY - 8);
  ctx.fillText('Breakdown', centreX, centreY + 18);

  // Legend — right side
  const legendX = 620;
  let legendY = 120;
  const legendItemHeight = Math.min(50, (HEIGHT - 180) / items.length);

  items.forEach((item, i) => {
    const colour = CHART_PALETTE[i % CHART_PALETTE.length];

    // Colour swatch
    ctx.fillStyle = colour;
    roundRect(ctx, legendX, legendY, 20, 20, 4);

    // Label
    ctx.fillStyle = COLOURS.white;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, legendX + 30, legendY + 15, 280);

    // Cost and percentage
    ctx.fillStyle = COLOURS.lightGrey;
    ctx.font = '14px sans-serif';
    ctx.fillText(`${item.cost}  (${item.percentage}%)`, legendX + 30, legendY + 35, 280);

    legendY += legendItemHeight;
  });

  // Footer
  ctx.fillStyle = COLOURS.lightGrey;
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Source: DisasterRecovery.com.au', WIDTH / 2, HEIGHT - 20);

  // Write to file
  await ensureDir(outputPath);
  const buffer = canvas.toBuffer('image/png');
  await writeFile(outputPath, buffer);
}

// ---------------------------------------------------------------------------
// 5. Main dispatcher
// ---------------------------------------------------------------------------

export async function generateVisualForPost(
  postId: string,
  imageType: ImageType,
  category: PostCategory,
  title: string,
  data: unknown,
  outputDir: string,
): Promise<string> {
  const filename = `${postId}-${imageType}.png`;
  const outputPath = join(outputDir, filename);
  await ensureDir(outputPath);

  switch (imageType) {
    case 'stat-infographic': {
      const d = data as { stats: { label: string; value: string | number; color?: string }[] };
      await generateStatInfographic(title, d.stats, outputPath);
      break;
    }
    case 'comparison-table': {
      const d = data as { headers: string[]; rows: string[][] };
      await generateComparisonTable(title, d.headers, d.rows, outputPath);
      break;
    }
    case 'process-flow': {
      const d = data as { steps: { step: string; description: string }[] };
      await generateProcessFlow(title, d.steps, outputPath);
      break;
    }
    case 'cost-breakdown': {
      const d = data as { items: { label: string; cost: string; percentage: number }[] };
      await generateCostBreakdown(title, d.items, outputPath);
      break;
    }
    case 'hero-banner': {
      // Hero banners use the Nano Banana Pro pipeline (visual-generator.ts),
      // not the infographic builder. Import dynamically to avoid circular deps.
      const { generateVisual } = await import('../../visual-generator');
      const { buildRedditHeroBannerPrompt } = await import('./reddit-visual-prompts');
      const prompt = buildRedditHeroBannerPrompt(title, category);
      const result = await generateVisual({
        brand: 'disaster-recovery',
        assetType: 'hero-image',
        description: prompt,
        aspectRatio: '16:9',
      });
      const imgBuffer = Buffer.from(result.imageBase64, 'base64');
      await writeFile(outputPath, imgBuffer);
      break;
    }
  }

  return outputPath;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function roundRect(
  ctx: ReturnType<ReturnType<typeof createCanvas>['getContext']>,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function wrapText(
  ctx: ReturnType<ReturnType<typeof createCanvas>['getContext']>,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
): void {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      if (lineCount >= maxLines - 1) {
        // Last allowed line — truncate with ellipsis
        ctx.fillText(line + '...', x, y + lineCount * lineHeight);
        return;
      }
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = words[i];
      lineCount++;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y + lineCount * lineHeight);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

async function renderHtmlToPng(html: string, outputPath: string): Promise<void> {
  await ensureDir(outputPath);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outputPath as `${string}.png`, type: 'png' });
  } finally {
    await browser.close();
  }
}
