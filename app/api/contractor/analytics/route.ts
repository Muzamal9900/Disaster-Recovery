import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { handleAPIError, successResponse, APIError, getPaginationParams } from '@/lib/api-error-handler';
import { prisma } from '@/lib/prisma';

/**
 * Calculate a date range filter based on the period string.
 * Supports: 7d, 30d, 90d, 12m, or custom startDate/endDate.
 */
function getDateRange(period: string, startDate: string | null, endDate: string | null) {
  if (startDate && endDate) {
    return {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  const now = new Date();
  let start: Date;

  switch (period) {
    case '30d':
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '12m':
      start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    case '7d':
    default:
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
  }

  return { gte: start, lte: now };
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '7d';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const dateRange = getDateRange(period, startDate, endDate);

    // Resolve the contractor ID -- check both ContractorProfile and Contractor tables
    const contractorProfile = await prisma.contractorProfile.findFirst({
      where: { userId: user.id },
      select: { id: true, userId: true }
    });

    const contractor = await prisma.contractor.findFirst({
      where: { email: user.email },
      select: { id: true }
    });

    const contractorId = contractor?.id ?? null;
    const contractorUserId = contractorProfile?.userId ?? user.id;

    // ── Overview Queries ──────────────────────────────────────────────

    // Total leads assigned to this contractor (via Partner model linked by email)
    const partner = await prisma.partner.findFirst({
      where: { email: user.email },
      select: { id: true }
    });

    const totalLeads = partner ? await prisma.lead.count({
      where: {
        partnerId: partner.id,
        createdAt: dateRange
      }
    }) : 0;

    const acceptedLeads = partner ? await prisma.lead.count({
      where: {
        partnerId: partner.id,
        status: 'ACCEPTED',
        createdAt: dateRange
      }
    }) : 0;

    // Jobs completed (from Job table)
    const completedJobs = contractorId ? await prisma.job.count({
      where: {
        contractorId: contractorId,
        status: 'completed',
        completedAt: dateRange
      }
    }) : 0;

    const activeJobs = contractorId ? await prisma.job.count({
      where: {
        contractorId: contractorId,
        status: { in: ['assigned', 'in_progress'] }
      }
    }) : 0;

    // Revenue from Payment table
    const revenueAgg = await prisma.payment.aggregate({
      where: {
        contractorId: contractorUserId,
        status: 'COMPLETED',
        processedAt: dateRange
      },
      _sum: { amountAUD: true },
      _count: { id: true }
    });

    const revenue = revenueAgg._sum.amountAUD ?? 0;
    const paidJobsCount = revenueAgg._count.id ?? 0;
    const averageJobValue = paidJobsCount > 0 ? parseFloat((revenue / paidJobsCount).toFixed(2)) : 0;

    // Ratings
    const ratingAgg = await prisma.rating.aggregate({
      where: {
        contractorId: contractorUserId,
        createdAt: dateRange
      },
      _avg: { rating: true },
      _count: { rating: true }
    });

    const avgRating = ratingAgg._avg.rating ? parseFloat(ratingAgg._avg.rating.toFixed(1)) : 0;
    const totalReviews = ratingAgg._count.rating ?? 0;

    const conversionRate = totalLeads > 0
      ? parseFloat(((acceptedLeads / totalLeads) * 100).toFixed(1))
      : 0;

    // ── Performance Queries ───────────────────────────────────────────

    // Get latest KPI record for response time / completion metrics
    const latestKPI = contractorId ? await prisma.contractorKPI.findFirst({
      where: { contractorId: contractorId },
      orderBy: { periodStart: 'desc' }
    }) : null;

    const avgResponseTimeHrs = latestKPI?.averageResponseTime ?? null;
    const avgCompletionDays = latestKPI?.averageCompletionTime ?? null;

    // Calculate on-time rate from KPIs if available
    const onTimeRate = latestKPI?.qualityScore ?? 0;

    // ── Revenue by Category ───────────────────────────────────────────

    // Get jobs with service types to calculate revenue by category
    const jobsByType = contractorId ? await prisma.job.groupBy({
      by: ['serviceType'],
      where: {
        contractorId: contractorId,
        status: 'completed',
        completedAt: dateRange
      },
      _count: { id: true }
    }) : [];

    // Get bookings for cost breakdown by service type
    const bookingsByType = await prisma.booking.groupBy({
      by: ['australianServiceType'],
      where: {
        contractorId: contractorUserId,
        status: 'COMPLETED',
        completedAt: dateRange
      },
      _sum: { finalCostAUD: true },
      _count: { id: true }
    });

    const revenueByCategory = bookingsByType.map(b => {
      const amount = b._sum.finalCostAUD ?? 0;
      const percentage = revenue > 0 ? parseFloat(((amount / revenue) * 100).toFixed(1)) : 0;
      return {
        category: b.australianServiceType,
        amount,
        percentage
      };
    });

    // ── Trends (daily breakdown) ──────────────────────────────────────

    // Build daily trend data from jobs and payments within the period
    const jobsInPeriod = contractorId ? await prisma.job.findMany({
      where: {
        contractorId: contractorId,
        createdAt: dateRange
      },
      select: {
        createdAt: true,
        status: true
      },
      orderBy: { createdAt: 'asc' }
    }) : [];

    const paymentsInPeriod = await prisma.payment.findMany({
      where: {
        contractorId: contractorUserId,
        status: 'COMPLETED',
        processedAt: dateRange
      },
      select: {
        processedAt: true,
        amountAUD: true
      },
      orderBy: { processedAt: 'asc' }
    });

    // Aggregate by date
    const dailyMap = new Map<string, { leads: number; jobs: number; revenue: number }>();

    for (const job of jobsInPeriod) {
      const dateKey = job.createdAt.toISOString().split('T')[0];
      const entry = dailyMap.get(dateKey) || { leads: 0, jobs: 0, revenue: 0 };
      entry.jobs += 1;
      dailyMap.set(dateKey, entry);
    }

    for (const payment of paymentsInPeriod) {
      if (payment.processedAt) {
        const dateKey = payment.processedAt.toISOString().split('T')[0];
        const entry = dailyMap.get(dateKey) || { leads: 0, jobs: 0, revenue: 0 };
        entry.revenue += payment.amountAUD;
        dailyMap.set(dateKey, entry);
      }
    }

    // Add leads to daily map if partner exists
    if (partner) {
      const leadsInPeriod = await prisma.lead.findMany({
        where: {
          partnerId: partner.id,
          createdAt: dateRange
        },
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' }
      });

      for (const lead of leadsInPeriod) {
        const dateKey = lead.createdAt.toISOString().split('T')[0];
        const entry = dailyMap.get(dateKey) || { leads: 0, jobs: 0, revenue: 0 };
        entry.leads += 1;
        dailyMap.set(dateKey, entry);
      }
    }

    const dailyTrends = Array.from(dailyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        leads: data.leads,
        jobs: data.jobs,
        revenue: parseFloat(data.revenue.toFixed(2))
      }));

    // ── Locations ─────────────────────────────────────────────────────

    const jobsBySuburb = contractorId ? await prisma.job.groupBy({
      by: ['suburb'],
      where: {
        contractorId: contractorId,
        status: 'completed',
        completedAt: dateRange
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    }) : [];

    const topAreas = jobsBySuburb.map(j => ({
      suburb: j.suburb,
      jobs: j._count.id,
      revenue: 0 // Revenue per suburb would need a join; provide job counts
    }));

    // Get contractor territories for coverage info
    const territories = contractorId ? await prisma.contractorTerritory.findMany({
      where: { contractorId: contractorId, active: true },
      select: { name: true }
    }) : [];

    // ── Feedback ──────────────────────────────────────────────────────

    const recentRatings = await prisma.rating.findMany({
      where: {
        contractorId: contractorUserId,
        createdAt: dateRange,
        isPublished: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        rating: true,
        comment: true,
        createdAt: true,
        clientId: true,
        title: true
      }
    });

    const recentFeedback = recentRatings.map(r => ({
      customer: r.clientId ? `Client ${r.clientId.substring(0, 6)}` : 'Anonymous',
      rating: r.rating,
      comment: r.comment ?? '',
      date: r.createdAt.toISOString().split('T')[0]
    }));

    // Sentiment breakdown from ratings
    const allRatingsInPeriod = await prisma.rating.groupBy({
      by: ['rating'],
      where: {
        contractorId: contractorUserId,
        createdAt: dateRange
      },
      _count: { id: true }
    });

    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;
    for (const r of allRatingsInPeriod) {
      if (r.rating >= 4) positiveCount += r._count.id;
      else if (r.rating === 3) neutralCount += r._count.id;
      else negativeCount += r._count.id;
    }
    const sentimentTotal = positiveCount + neutralCount + negativeCount;

    // ── Previous Period Revenue for Growth Calculation ─────────────────

    const periodMs = dateRange.lte.getTime() - dateRange.gte.getTime();
    const previousDateRange = {
      gte: new Date(dateRange.gte.getTime() - periodMs),
      lte: new Date(dateRange.gte.getTime())
    };

    const prevRevenueAgg = await prisma.payment.aggregate({
      where: {
        contractorId: contractorUserId,
        status: 'COMPLETED',
        processedAt: previousDateRange
      },
      _sum: { amountAUD: true }
    });

    const previousRevenue = prevRevenueAgg._sum.amountAUD ?? 0;
    const revenueGrowth = previousRevenue > 0
      ? parseFloat((((revenue - previousRevenue) / previousRevenue) * 100).toFixed(1))
      : 0;

    // ── Build Response ────────────────────────────────────────────────

    const analytics = {
      overview: {
        totalLeads,
        acceptedLeads,
        conversionRate,
        completedJobs,
        activeJobs,
        revenue: parseFloat(revenue.toFixed(2)),
        averageJobValue,
        rating: avgRating,
        totalReviews
      },
      performance: {
        responseTime: {
          average: avgResponseTimeHrs ? `${Math.round(avgResponseTimeHrs * 60)} minutes` : '0 minutes',
          fastest: null,
          target: '60 minutes',
          onTimeRate
        },
        completion: {
          average: avgCompletionDays ? `${avgCompletionDays.toFixed(1)} days` : '0 days',
          fastest: null,
          onScheduleRate: latestKPI?.complianceScore ?? 0
        }
      },
      revenue: {
        current: parseFloat(revenue.toFixed(2)),
        previous: parseFloat(previousRevenue.toFixed(2)),
        growth: revenueGrowth,
        byCategory: revenueByCategory
      },
      trends: {
        daily: dailyTrends
      },
      locations: {
        topAreas,
        coverage: {
          primary: territories.slice(0, 3).map(t => t.name),
          secondary: territories.slice(3, 6).map(t => t.name),
          total: territories.length
        }
      },
      feedback: {
        recent: recentFeedback,
        sentiment: {
          positive: sentimentTotal > 0 ? Math.round((positiveCount / sentimentTotal) * 100) : 0,
          neutral: sentimentTotal > 0 ? Math.round((neutralCount / sentimentTotal) * 100) : 0,
          negative: sentimentTotal > 0 ? Math.round((negativeCount / sentimentTotal) * 100) : 0
        }
      },
      period: period,
      generatedAt: new Date().toISOString()
    };

    return successResponse(analytics);

  } catch (error) {
    return handleAPIError(error);
  }
}
