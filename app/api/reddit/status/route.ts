import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import type { SeedRunAudit } from '@/lib/reddit/reddit-types';

const AUDIT_DIR = path.join(process.cwd(), 'data', 'reddit', 'audit');

export async function GET() {
  try {
    // Check if audit directory exists
    if (!fs.existsSync(AUDIT_DIR)) {
      return NextResponse.json({
        success: true,
        runs: [],
        message: 'No seed runs found. Run the seeder first.',
      });
    }

    // Read all audit files
    const files = fs
      .readdirSync(AUDIT_DIR)
      .filter((f) => f.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first

    const runs: SeedRunAudit[] = files.map((file) => {
      const content = fs.readFileSync(path.join(AUDIT_DIR, file), 'utf-8');
      return JSON.parse(content) as SeedRunAudit;
    });

    // Summary
    const latestRun = runs[0] || null;

    return NextResponse.json({
      success: true,
      totalRuns: runs.length,
      latestRun: latestRun
        ? {
            runId: latestRun.runId,
            startedAt: latestRun.startedAt,
            completedAt: latestRun.completedAt,
            dryRun: latestRun.dryRun,
            totalPosts: latestRun.totalPosts,
            successCount: latestRun.successCount,
            failureCount: latestRun.failureCount,
          }
        : null,
      runs: runs.map((r) => ({
        runId: r.runId,
        startedAt: r.startedAt,
        completedAt: r.completedAt,
        dryRun: r.dryRun,
        totalPosts: r.totalPosts,
        successCount: r.successCount,
        failureCount: r.failureCount,
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
