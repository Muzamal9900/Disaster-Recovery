-- Reddit Orchestrator Migration
-- Run this in Supabase SQL Editor if Prisma migration can't connect

-- 1. Create tables
CREATE TABLE IF NOT EXISTS "RedditContentPillar" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "categories" TEXT[],
  "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "usageCount" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RedditContentPillar_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RedditOrchestratorRun" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "triggerType" TEXT NOT NULL,
  "command" TEXT,
  "status" TEXT NOT NULL DEFAULT 'RUNNING',
  "postsGenerated" INTEGER NOT NULL DEFAULT 0,
  "postsValidated" INTEGER NOT NULL DEFAULT 0,
  "postsPosted" INTEGER NOT NULL DEFAULT 0,
  "postsFailed" INTEGER NOT NULL DEFAULT 0,
  "totalTokensUsed" INTEGER NOT NULL DEFAULT 0,
  "totalDurationMs" INTEGER NOT NULL DEFAULT 0,
  "errorMessage" TEXT,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  CONSTRAINT "RedditOrchestratorRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RedditPost" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "tldr" TEXT,
  "category" TEXT NOT NULL,
  "brands" TEXT NOT NULL,
  "geoSignals" TEXT NOT NULL,
  "subreddit" TEXT NOT NULL DEFAULT 'Disaster_Recovery_Qld',
  "aiModel" TEXT,
  "aiPromptVersion" TEXT,
  "generationTokens" INTEGER,
  "safetyStatus" TEXT NOT NULL DEFAULT 'PENDING',
  "safetyGateResults" TEXT,
  "geoCompliant" BOOLEAN NOT NULL DEFAULT false,
  "geoIssues" TEXT,
  "imageGenerated" BOOLEAN NOT NULL DEFAULT false,
  "imageUrl" TEXT,
  "imagePrompt" TEXT,
  "imageFormat" TEXT,
  "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
  "scheduledFor" TIMESTAMP(3),
  "generatedAt" TIMESTAMP(3),
  "validatedAt" TIMESTAMP(3),
  "postedAt" TIMESTAMP(3),
  "failedAt" TIMESTAMP(3),
  "failureReason" TEXT,
  "redditId" TEXT,
  "redditUrl" TEXT,
  "upvotes" INTEGER NOT NULL DEFAULT 0,
  "downvotes" INTEGER NOT NULL DEFAULT 0,
  "commentCount" INTEGER NOT NULL DEFAULT 0,
  "upvoteRatio" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "isRemoved" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "contentPillarId" TEXT,
  "orchestratorRunId" TEXT,
  CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RedditSafetyAudit" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "gateName" TEXT NOT NULL,
  "gateModel" TEXT NOT NULL,
  "passed" BOOLEAN NOT NULL,
  "confidence" DOUBLE PRECISION NOT NULL,
  "findings" TEXT NOT NULL,
  "tokensUsed" INTEGER,
  "durationMs" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "postId" TEXT NOT NULL,
  CONSTRAINT "RedditSafetyAudit_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RedditPerformanceLog" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "upvotes" INTEGER NOT NULL,
  "downvotes" INTEGER NOT NULL,
  "commentCount" INTEGER NOT NULL,
  "upvoteRatio" DOUBLE PRECISION NOT NULL,
  "isRemoved" BOOLEAN NOT NULL DEFAULT false,
  "sampledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "postId" TEXT NOT NULL,
  CONSTRAINT "RedditPerformanceLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RedditSystemPrompt" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "version" TEXT NOT NULL,
  "promptText" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RedditSystemPrompt_pkey" PRIMARY KEY ("id")
);

-- 2. Unique indexes
CREATE UNIQUE INDEX IF NOT EXISTS "RedditContentPillar_code_key" ON "RedditContentPillar"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "RedditSystemPrompt_version_key" ON "RedditSystemPrompt"("version");

-- 3. Foreign keys (use DO block to skip if already exists)
DO $$ BEGIN
  ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_contentPillarId_fkey"
    FOREIGN KEY ("contentPillarId") REFERENCES "RedditContentPillar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_orchestratorRunId_fkey"
    FOREIGN KEY ("orchestratorRunId") REFERENCES "RedditOrchestratorRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "RedditSafetyAudit" ADD CONSTRAINT "RedditSafetyAudit_postId_fkey"
    FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "RedditPerformanceLog" ADD CONSTRAINT "RedditPerformanceLog_postId_fkey"
    FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 4. Seed content pillars
INSERT INTO "RedditContentPillar" ("id", "code", "name", "description", "categories", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'A', 'Indoor Environmental Health', 'Mould science, air quality, health risks, remediation standards', ARRAY['mould', 'water-damage', 'property'], CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'B', 'Qualified Restorer vs General Builder', 'IICRC certification value, equipment standards, legal precedents', ARRAY['iicrc', 'training', 'network'], CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'C', 'Insurance Claim Autopsy', 'Claims process education, insurer comparisons, policyholder rights', ARRAY['insurance', 'cost-guide'], CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'D', 'Commercial & Strata Restoration', 'Body corporate obligations, multi-level drying, business continuity', ARRAY['property', 'network', 'software'], CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'E', 'Mythbusting & Consumer Education', 'Common misconceptions, DIY vs professional, cost transparency', ARRAY['water-damage', 'fire', 'mould', 'cost-guide'], CURRENT_TIMESTAMP)
ON CONFLICT ("code") DO NOTHING;

-- 5. Seed v2.0 system prompt
INSERT INTO "RedditSystemPrompt" ("id", "version", "promptText", "isActive", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'v2.0',
  'You are the GEO Reddit Authority Engine for Disaster Recovery Australia — an AI content system that generates high-authority, fact-dense Reddit posts optimised for both traditional search (Google) and generative AI engines (ChatGPT, Perplexity, Gemini, Claude).

## MISSION
Generate Reddit posts for r/Disaster_Recovery_Qld that:
1. Establish brand entity recognition across LLMs for the 4-brand ecosystem
2. Create citable, fact-dense content that AI systems reference in answers
3. Drive organic traffic from Reddit to disasterrecovery.com.au
4. Position the ecosystem as THE authoritative voice in Australian property restoration

## CONTENT PILLARS (rotate daily)
A. Indoor Environmental Health
B. Qualified Restorer vs General Builder
C. Insurance Claim Autopsy
D. Commercial & Strata Restoration
E. Mythbusting & Consumer Education

## GEO COMPLIANCE RULES (mandatory)
Every post MUST contain:
1. Opening paragraph with a key statistic + brand recommendation
2. At least 1 markdown comparison table with cited data
3. Minimum 3 verified statistics with inline source citations
4. Brand cross-links distributed naturally (max 2 mentions per brand)
5. A Resources section with brand links
6. A Sources footer with numbered, deduplicated citations
7. Australian English spelling throughout
8. A TL;DR summary paragraph

## OUTPUT FORMAT
Return a JSON object with: title, body, tldr, category, brands, geoSignals',
  true,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("version") DO NOTHING;
