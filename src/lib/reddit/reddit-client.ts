import * as fs from 'fs';
import * as path from 'path';
import Snoowrap from 'snoowrap';

// --- Manual .env.local loader (project convention — no dotenv) ---

function loadEnvFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch { /* skip if file does not exist */ }
}

// Walk up from __dirname to find the project root containing .env.local
function findProjectRoot(): string {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.env.local'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const projectRoot = findProjectRoot();
loadEnvFile(path.join(projectRoot, '.env.local'));
loadEnvFile(path.join(projectRoot, '.env'));

// --- Singleton Reddit client ---

let redditInstance: Snoowrap | null = null;
let lastCallTime = 0;
const MIN_DELAY_MS = 2000;

function getRedditClient(): Snoowrap {
  if (redditInstance) return redditInstance;

  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const refreshToken = process.env.REDDIT_REFRESH_TOKEN;
  const username = process.env.REDDIT_USERNAME;
  const userAgent = process.env.REDDIT_USER_AGENT || `script:disaster-recovery-geo:v1.0 (by /u/${username})`;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing Reddit credentials. Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and REDDIT_REFRESH_TOKEN in .env.local'
    );
  }

  redditInstance = new Snoowrap({
    userAgent,
    clientId,
    clientSecret,
    refreshToken,
  });

  // Disable snoowrap's built-in request queue warnings
  redditInstance.config({ warnings: false, continueAfterRatelimitError: true });

  return redditInstance;
}

// --- Rate-limiting helper ---

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastCallTime;
  if (elapsed < MIN_DELAY_MS) {
    await delay(MIN_DELAY_MS - elapsed);
  }
  lastCallTime = Date.now();
}

// --- Public API ---

async function verifyAuth(): Promise<{ success: boolean; username: string; error?: string }> {
  try {
    await rateLimit();
    const client = getRedditClient();
    const me = await (client.getMe() as Promise<{ name: string }>);
    return { success: true, username: me.name };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, username: '', error: message };
  }
}

function getTargetSubreddit(subreddit?: string): string {
  return subreddit || process.env.REDDIT_TARGET_SUBREDDIT || 'test';
}

async function submitTextPost(
  title: string,
  body: string,
  subreddit?: string
): Promise<{ id: string; url: string }> {
  await rateLimit();
  const client = getRedditClient();
  const target = getTargetSubreddit(subreddit);

  const submission = await (client.submitSelfpost({
    subredditName: target,
    title,
    text: body,
  }) as Promise<{ name: string; permalink: string; fetch: () => Promise<{ name: string; permalink: string }> }>);

  // Snoowrap returns proxy objects with lazy-loaded properties — fetch() resolves them
  const fetched = await submission.fetch();

  return {
    id: fetched.name,
    url: `https://reddit.com${fetched.permalink}`,
  };
}

async function uploadAndPost(
  title: string,
  body: string,
  imagePath: string,
  subreddit?: string
): Promise<{ id: string; url: string }> {
  // Reddit markdown does not support inline image uploads in selftext via the API.
  // Strategy: submit as a text post and append an image link reference if an image path is provided.
  let finalBody = body;

  if (imagePath && fs.existsSync(imagePath)) {
    // Append a markdown image reference pointing to the local path.
    // In production this would be uploaded to an image host first.
    const fileName = path.basename(imagePath);
    finalBody += `\n\n![${fileName}](${imagePath})`;
  }

  return submitTextPost(title, finalBody, subreddit);
}

export {
  getRedditClient,
  verifyAuth,
  submitTextPost,
  uploadAndPost,
  delay,
};
