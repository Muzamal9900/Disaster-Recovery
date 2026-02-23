/**
 * Review API — Admin review of recent Reddit posts + safety results
 *
 * GET /api/reddit/review?days=7&status=POSTED
 * Returns RedditPost records with embedded safety audit summaries.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7', 10);
    const status = searchParams.get('status') || undefined;

    const since = new Date();
    since.setDate(since.getDate() - days);

    const posts = await prisma.redditPost.findMany({
      where: {
        createdAt: { gte: since },
        ...(status ? { status } : {}),
      },
      include: {
        safetyAudits: {
          select: {
            gateName: true,
            passed: true,
            confidence: true,
            findings: true,
            durationMs: true,
          },
        },
        contentPillar: {
          select: {
            code: true,
            name: true,
          },
        },
        performanceLogs: {
          orderBy: { sampledAt: 'desc' },
          take: 1,
          select: {
            upvotes: true,
            downvotes: true,
            commentCount: true,
            upvoteRatio: true,
            sampledAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format safety findings from JSON strings
    const formatted = posts.map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category,
      status: post.status,
      subreddit: post.subreddit,
      redditUrl: post.redditUrl,
      pillar: post.contentPillar,
      safetyStatus: post.safetyStatus,
      safetyAudits: post.safetyAudits.map((audit) => ({
        ...audit,
        findings: (() => {
          try { return JSON.parse(audit.findings); } catch { return audit.findings; }
        })(),
      })),
      imageGenerated: post.imageGenerated,
      imageFormat: post.imageFormat,
      geoCompliant: post.geoCompliant,
      latestPerformance: post.performanceLogs[0] || null,
      aiModel: post.aiModel,
      generationTokens: post.generationTokens,
      createdAt: post.createdAt,
      postedAt: post.postedAt,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      days,
      posts: formatted,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
