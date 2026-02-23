/**
 * CRON: Reddit Performance — Metrics sampling
 *
 * Scheduled: Every 6 hours (0 *​/6 * * * in vercel.json)
 * Polls Reddit for post metrics and feeds the performance loop.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRecentPostPerformance } from '@/lib/reddit/orchestrator';

export async function GET(request: NextRequest) {
  try {
    // Verify CRON secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorised' },
        { status: 401 },
      );
    }

    const result = await checkRecentPostPerformance();

    return NextResponse.json({
      success: true,
      postsTracked: result.snapshots.length,
      feedback: result.feedback,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
