import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Contractor, ContractorTerritory, ContractorCompany, ContractorKPI } from '@prisma/client';

interface JobDistributionRequest {
  bookingId: string;
  serviceType: string;
  urgencyLevel: 'emergency' | 'urgent' | 'standard';
  location: {
    suburb: string;
    state: string;
    postcode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  customerDetails: {
    name: string;
    email: string;
    address: string;
  };
  damageDescription: string;
  propertyType: string;
  estimatedValue: number;
  insuranceDetails?: {
    hasInsurance: boolean;
    company?: string;
    claimNumber?: string;
  };
}

// Contractor with included relations from the database query
type ContractorWithRelations = Contractor & {
  territories: ContractorTerritory[];
  companyProfile: (ContractorCompany & Record<string, unknown>) | null;
  kpiMetrics: ContractorKPI[];
  _count: { jobs: number };
};

// Parse a JSON-encoded string field into a string array (territories store postcodes/suburbs as JSON strings)
function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Calculate contractor score for job matching
function calculateContractorScore(
  contractor: ContractorWithRelations,
  job: JobDistributionRequest
): number {
  let score = 0;

  // Location match — check across all active territories
  let locationScore = 0;
  let hasEmergency = false;
  let hasAfterHours = false;
  let maxJobsCapacity = 0;
  let currentActiveJobs = 0;

  for (const territory of contractor.territories) {
    if (!territory.active) continue;

    const postcodes = parseJsonArray(territory.postcodes);
    const suburbs = parseJsonArray(territory.suburbs);

    if (postcodes.includes(job.location.postcode)) {
      locationScore = Math.max(locationScore, 50);
    } else if (suburbs.some(s => s.toLowerCase() === job.location.suburb.toLowerCase())) {
      locationScore = Math.max(locationScore, 40);
    }

    if (territory.emergencyResponse) hasEmergency = true;
    if (territory.afterHours) hasAfterHours = true;
    maxJobsCapacity += territory.maxJobsPerDay;
    currentActiveJobs += territory.currentActiveJobs;
  }

  if (locationScore === 0) {
    return 0; // Outside all service areas
  }
  score += locationScore;

  // Urgency availability
  if (job.urgencyLevel === 'emergency') {
    if (!hasEmergency) return 0;
    score += 30;
  } else if (job.urgencyLevel === 'urgent') {
    if (!hasEmergency && !hasAfterHours) return 0;
    score += 20;
  } else {
    score += 10;
  }

  // Performance metrics from latest KPI record
  const latestKpi = contractor.kpiMetrics.length > 0
    ? contractor.kpiMetrics.reduce((latest, kpi) =>
        kpi.periodEnd > latest.periodEnd ? kpi : latest, contractor.kpiMetrics[0])
    : null;

  if (latestKpi) {
    score += (latestKpi.qualityScore ?? 0) * 0.5;
    score += (latestKpi.customerSatisfaction ?? 0) * 10;
    score += (latestKpi.complianceScore ?? 0) * 0.2;

    // Response time bonus (lower is better, measured in hours)
    const avgResponse = latestKpi.averageResponseTime ?? 999;
    if (avgResponse <= 0.5) {
      score += 25;
    } else if (avgResponse <= 1) {
      score += 15;
    }
  }

  // Capacity check (penalty if near max jobs)
  if (maxJobsCapacity > 0) {
    const capacityRatio = currentActiveJobs / maxJobsCapacity;
    if (capacityRatio < 0.5) {
      score += 20;
    } else if (capacityRatio < 0.8) {
      score += 10;
    } else if (capacityRatio >= 1) {
      return 0; // At capacity
    }
  }

  // Active job count penalty — contractors with fewer pending/in-progress jobs are preferred
  const activeJobCount = contractor._count.jobs;
  if (activeJobCount === 0) {
    score += 15;
  } else if (activeJobCount <= 3) {
    score += 5;
  }

  // Insurance preference bonus
  if (job.insuranceDetails?.hasInsurance) {
    score += 10;
  }

  return Math.max(0, score);
}

export async function POST(request: NextRequest) {
  try {
    const jobData: JobDistributionRequest = await request.json();

    // Find approved contractors with active territories in the job's area
    const contractors = await prisma.contractor.findMany({
      where: {
        status: 'APPROVED',
        territories: {
          some: {
            active: true,
          },
        },
      },
      include: {
        territories: {
          where: { active: true },
        },
        companyProfile: {
          select: {
            companyName: true,
            tradingName: true,
          },
        },
        kpiMetrics: {
          orderBy: { periodEnd: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            jobs: {
              where: {
                status: { in: ['pending', 'assigned', 'in_progress'] },
              },
            },
          },
        },
      },
    }) as ContractorWithRelations[];

    // Score and rank contractors
    const eligibleContractors = contractors
      .map(contractor => ({
        contractor,
        score: calculateContractorScore(contractor, jobData),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (eligibleContractors.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No contractors available for this job',
        data: {
          bookingId: jobData.bookingId,
          notifiedCount: 0,
        },
      }, { status: 404 });
    }

    // Notification strategy based on urgency
    let notificationLimit = 3;
    if (jobData.urgencyLevel === 'emergency') {
      notificationLimit = 5;
    } else if (jobData.urgencyLevel === 'urgent') {
      notificationLimit = 4;
    }

    // Select top contractors to notify
    const contractorsToNotify = eligibleContractors
      .slice(0, notificationLimit)
      .map(item => item.contractor);

    // Assign job to the top-scoring contractor
    const topContractor = contractorsToNotify[0];
    const companyName = topContractor.companyProfile?.companyName
      ?? topContractor.companyProfile?.tradingName
      ?? topContractor.username;

    // Create Job record in the database
    const job = await prisma.job.create({
      data: {
        contractorId: topContractor.id,
        serviceType: jobData.serviceType,
        urgency: jobData.urgencyLevel,
        status: 'pending',
        address: jobData.customerDetails.address,
        suburb: jobData.location.suburb,
        state: jobData.location.state,
        postcode: jobData.location.postcode,
        coordinates: jobData.location.coordinates
          ? { lat: jobData.location.coordinates.lat, lng: jobData.location.coordinates.lng }
          : undefined,
        customerName: jobData.customerDetails.name,
        customerEmail: jobData.customerDetails.email,
        customerPhone: '',
        insuranceClaim: jobData.insuranceDetails?.hasInsurance ?? false,
        insurerName: jobData.insuranceDetails?.company ?? null,
        claimNumber: jobData.insuranceDetails?.claimNumber ?? null,
        description: jobData.damageDescription,
        internalNotes: `Booking: ${jobData.bookingId} | Property: ${jobData.propertyType} | Est. value: $${jobData.estimatedValue}`,
        assignedAt: new Date(),
      },
    });

    // Create notifications for each contractor
    const notifications = await Promise.all(
      contractorsToNotify.map(async (contractor) => {
        const contractorCompanyName = contractor.companyProfile?.companyName
          ?? contractor.companyProfile?.tradingName
          ?? contractor.username;

        // Create a contractor notification record
        await prisma.contractorNotification.create({
          data: {
            contractorId: contractor.id,
            type: 'JOB',
            priority: jobData.urgencyLevel === 'emergency' ? 'URGENT' : 'NORMAL',
            subject: `New ${jobData.urgencyLevel} job: ${jobData.serviceType} in ${jobData.location.suburb}`,
            message: `A new ${jobData.serviceType} job is available in ${jobData.location.suburb}, ${jobData.location.state} ${jobData.location.postcode}. ${jobData.damageDescription}`,
            actionRequired: true,
            actionUrl: `/contractor/jobs/${job.id}/accept`,
            actionDeadline: new Date(Date.now() + (jobData.urgencyLevel === 'emergency' ? 30 : 120) * 60000),
          },
        });

        console.log(`Notifying ${contractorCompanyName} about job ${job.id}`);

        return {
          contractorId: contractor.id,
          companyName: contractorCompanyName,
          notificationMethod: 'email',
          sentAt: new Date().toISOString(),
          jobDetails: {
            bookingId: jobData.bookingId,
            jobId: job.id,
            serviceType: jobData.serviceType,
            urgency: jobData.urgencyLevel,
            location: `${jobData.location.suburb}, ${jobData.location.state}`,
            estimatedValue: jobData.estimatedValue,
            description: jobData.damageDescription,
          },
          acceptanceUrl: `/contractor/jobs/${job.id}/accept`,
          expiresIn: jobData.urgencyLevel === 'emergency' ? '30 minutes' : '2 hours',
        };
      })
    );

    const expiresAt = new Date(Date.now() + (jobData.urgencyLevel === 'emergency' ? 30 : 120) * 60000).toISOString();

    return NextResponse.json({
      success: true,
      message: `Job distributed to ${contractorsToNotify.length} contractors`,
      data: {
        bookingId: jobData.bookingId,
        jobId: job.id,
        notifiedCount: contractorsToNotify.length,
        assignedTo: {
          id: topContractor.id,
          companyName,
        },
        contractors: contractorsToNotify.map(c => ({
          id: c.id,
          companyName: c.companyProfile?.companyName ?? c.companyProfile?.tradingName ?? c.username,
          score: eligibleContractors.find(e => e.contractor.id === c.id)?.score ?? 0,
        })),
        notifications,
        jobExpiresAt: expiresAt,
      },
    });

  } catch (error) {
    console.error('Job distribution error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to distribute job to contractors',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// Get job distribution status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');
  const jobId = searchParams.get('jobId');

  if (!bookingId && !jobId) {
    return NextResponse.json({
      success: false,
      message: 'Booking ID or Job ID is required',
    }, { status: 400 });
  }

  // Query the job from the database
  const job = await prisma.job.findFirst({
    where: jobId
      ? { id: jobId }
      : { internalNotes: { contains: bookingId! } },
    include: {
      contractor: {
        select: {
          id: true,
          username: true,
          email: true,
          companyProfile: {
            select: { companyName: true, tradingName: true },
          },
        },
      },
    },
  });

  if (!job) {
    return NextResponse.json({
      success: false,
      message: 'Job not found',
    }, { status: 404 });
  }

  const companyName = job.contractor?.companyProfile?.companyName
    ?? job.contractor?.companyProfile?.tradingName
    ?? job.contractor?.username
    ?? 'Unassigned';

  return NextResponse.json({
    success: true,
    data: {
      jobId: job.id,
      status: job.status,
      serviceType: job.serviceType,
      urgency: job.urgency,
      location: `${job.suburb}, ${job.state} ${job.postcode}`,
      assignedTo: job.contractor ? {
        contractorId: job.contractor.id,
        companyName,
      } : null,
      assignedAt: job.assignedAt?.toISOString() ?? null,
      acceptedAt: job.acceptedAt?.toISOString() ?? null,
      createdAt: job.createdAt.toISOString(),
    },
  });
}