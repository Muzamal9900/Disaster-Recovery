/**
 * Poster — Reddit submission wrapper
 *
 * Thin wrapper around the existing reddit-client.ts functions.
 * Handles image link appending and RedditPost record updates.
 */

import { prisma } from '@/lib/prisma';
import { verifyAuth, submitTextPost } from '../reddit-client';
import type { PostResult, VisualAsset } from './types';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Submit a post to Reddit and update the database record.
 *
 * Steps:
 * 1. Verify Reddit authentication
 * 2. Append image link to body if visual was generated
 * 3. Submit text post via Snoowrap
 * 4. Update RedditPost record with reddit ID, URL, and timestamp
 */
export async function postToReddit(
  postId: string,
  title: string,
  body: string,
  subreddit?: string,
  visual?: VisualAsset,
): Promise<PostResult> {
  // Verify auth
  const auth = await verifyAuth();
  if (!auth.success) {
    throw new Error(`Reddit authentication failed: ${auth.error}`);
  }

  // Append image link if visual was generated and has a URL
  let finalBody = body;
  if (visual?.imageUrl) {
    finalBody += `\n\n---\n\n![Post visual](${visual.imageUrl})`;
  }

  // Submit to Reddit
  const result = await submitTextPost(title, finalBody, subreddit);

  const postedAt = new Date();

  // Update database record
  await prisma.redditPost.update({
    where: { id: postId },
    data: {
      redditId: result.id,
      redditUrl: result.url,
      postedAt,
      status: 'POSTED',
    },
  });

  return {
    redditId: result.id,
    redditUrl: result.url,
    postedAt,
  };
}
