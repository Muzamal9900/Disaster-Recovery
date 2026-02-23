# Database & Schema Gap Analysis Report

**Date**: 2026-02-22
**Project**: Disaster Recovery Platform (DR-NRPG)
**Supabase Project**: `[SUPABASE_PROJECT_REF]` (Disaster Recovery Qld.au — Pro Plan)

---

## CRITICAL FINDING: Three Disconnected Database Systems

The project has **three separate database systems that are NOT connected to each other**:

### 1. Prisma + SQLite (What the app actually uses)
- **Schema**: `prisma/schema.prisma` with `provider = "sqlite"`
- **Connection**: `src/lib/prisma.ts` → `PrismaClient()`
- **Dev**: `file:./dev.db` | Build: `file:./build.db`
- **Models**: 38 Prisma models defined
- **API routes using this**: 18 routes import Prisma
- **PROBLEM**: SQLite is ephemeral on Vercel — database resets every deployment

### 2. Supabase PostgreSQL (91 tables, ZERO app connections)
- **Project**: `[SUPABASE_PROJECT_REF]` (Sydney ap-southeast-2)
- **URL**: `https://[SUPABASE_PROJECT_REF].supabase.co`
- **Tables**: 91 in public schema
- **App code connections**: **ZERO** — no `@supabase/supabase-js` installed
- **Security issues**: 57 (all tables have RLS disabled)
- **PROBLEM**: Completely orphaned database with no application code connecting to it

### 3. Neon PostgreSQL (Vercel Storage integration)
- **Host**: `ep-curly-cherry-ahnzhy0c-pooler.c-3.us-east-1.aws.neon.tech`
- **Database**: `neondb`
- **Connection strings**: 8 variants in `.env.local` (pooled, unpooled, Prisma URL, etc.)
- **App code connections**: **ZERO** — no code references STORAGE_DATABASE_URL
- **PROBLEM**: Database exists but nothing in the app connects to it

---

## Supabase Tables (91 total)

### Tables WITH Prisma Model Equivalent (partial overlap)
| Supabase Table | Prisma Model | Match Quality |
|---|---|---|
| `Contractor` | `Contractor` | Partial — different columns |
| `ContractorDocument` | `ContractorDocument` | Good |
| `ContractorServiceArea` | `ContractorTerritory` | Different name/structure |
| `AuditLog` | `AuditLog` | Good |
| `users` | `User` | Partial — Supabase has `password` exposed |
| `_prisma_migrations` | (system table) | Prisma internal |

### Tables in Supabase with NO Prisma Model (85 tables)

#### Core Business Tables (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `Booking` | Service bookings | Orphaned |
| `InsuranceClaimAU` | Australian insurance claims | Orphaned |
| `InsuranceProvider` | Insurance company records | Orphaned |
| `InvoiceAU` | Australian invoices | Orphaned |
| `Payment` | Payment records | Orphaned |
| `Rating` | Contractor/service ratings | Orphaned |
| `service_requests` | Client service requests | Orphaned |
| `service_request_callout_payments` | Callout payment tracking | Orphaned |
| `public_claims` | Public insurance claims | Orphaned |
| `cost_estimates` | Job cost estimates | Orphaned |
| `opportunities` | Business opportunities | Orphaned |

#### Client Management (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `client_profiles` | Client profile data | Orphaned |
| `client_payments` | Client payment history | Orphaned |
| `client_properties` | Client property records | Orphaned |
| `client_emergency_contacts` | Emergency contact info | Orphaned |
| `client_insurance` | Client insurance details | Orphaned |
| `client_module_progress` | Client training progress | Orphaned |
| `client_onboarding` | Client onboarding state | Orphaned |
| `customer_lifecycle` | Customer lifecycle tracking | Orphaned |

#### Contractor System (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `contractor_profiles` | Extended contractor profiles | Orphaned |
| `contractor_preferences` | Contractor settings | Orphaned |
| `contractor_applications` | Application submissions | Orphaned |
| `contractor_assessments` | Skill assessments | Orphaned |
| `contractor_certifications` | Certification records | Orphaned |
| `contractor_location_history` | GPS/location tracking | Orphaned |
| `contractor_matches` | Job-contractor matching | Orphaned |
| `contractor_module_progress` | Training module progress | Orphaned |
| `contractor_onboarding` | Onboarding state | Orphaned |
| `contractor_rotation` | Job distribution rotation | Orphaned |
| `ContractorVerificationHistory` | Verification audit trail | Orphaned |

#### Inspection & Reporting (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `inspection_reports` | Field inspection reports | Orphaned |
| `inspection_photos` | Inspection photo records | Orphaned |
| `moisture_readings` | Moisture meter readings | Orphaned |
| `damage_areas` | Documented damage zones | Orphaned |
| `report_revisions` | Report version history | Orphaned |
| `triage_assessments` | Damage triage assessments | Orphaned |

#### Cost Estimation (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `labor_line_items` | Labor cost line items | Orphaned |
| `material_line_items` | Material cost line items | Orphaned |
| `equipment_line_items` | Equipment cost line items | Orphaned |

#### NRPG Onboarding (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `nrpg_certification_points` | Certification point system | Orphaned |
| `nrpg_commitments` | Contractor commitments | Orphaned |
| `nrpg_onboarding_phases` | Onboarding phase tracking | Orphaned |
| `nrpg_training_progress` | Training progress tracking | Orphaned |

#### SEO & Analytics (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `competitors` | Competitor profiles | Orphaned |
| `competitor_analyses` | Competitor analysis data | Orphaned |
| `competitor_keywords` | Competitor keyword tracking | Orphaned |
| `backlinks` | Backlink monitoring | Orphaned |
| `keyword_opportunities` | Keyword opportunity tracking | Orphaned |
| `swot_analyses` | SWOT analysis records | Orphaned |

#### Content (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `blog_faqs` | Blog FAQ entries | Orphaned |
| `blog_posts` | Blog post content | Orphaned |
| `case_studies` | Case study records | Orphaned |
| `faqs` | FAQ entries | Orphaned |

#### Multi-Tenant System (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `tenants` | Tenant definitions | Orphaned |
| `tenant_configurations` | Tenant-specific config | Orphaned |
| `workspaces` | Workspace definitions | Orphaned |
| `workspace_members` | Workspace membership | Orphaned |
| `workspace_audit_logs` | Workspace audit trail | Orphaned |

#### Auth & Security (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `LoginAttempt` | Login attempt tracking | Orphaned |
| `VerificationToken` | Email verification tokens | Orphaned |
| `RiskAssessment` | Security risk assessments | Orphaned |
| `DisasterAlert` | Disaster alert notifications | Orphaned |

#### Beta Program (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `beta_enrollments` | Beta program signups | Orphaned |
| `beta_feedback` | Beta user feedback | Orphaned |
| `beta_nps_surveys` | Beta NPS survey results | Orphaned |
| `beta_programs` | Beta program definitions | Orphaned |

#### System & Operations (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `activities` | Activity log | Orphaned |
| `background_jobs` | Async job queue | Orphaned |
| `business_rules` | Business rule engine | Orphaned |
| `business_rule_violations` | Rule violation records | Orphaned |
| `compliance_checks` | Compliance check results | Orphaned |
| `connection_logs` | Connection tracking | Orphaned |
| `messages` | Messaging system | Orphaned |
| `job_messages` | Job-specific messages | Orphaned |
| `notification_preferences` | User notification settings | Orphaned |
| `realtime_subscriptions` | Realtime subscription config | Orphaned |
| `tasks` | Task management | Orphaned |
| `waitlist_submissions` | Pre-launch waitlist | Orphaned |
| `ai_batch_processing_jobs` | AI batch processing | Orphaned |
| `ai_image_enhancement_logs` | AI image processing logs | Orphaned |

#### Admin Configuration (NO code connection)
| Table | Purpose | Status |
|---|---|---|
| `admin_service_categories` | Service category config | Orphaned |
| `admin_services` | Service definitions | Orphaned |
| `admin_themes` | Theme configuration | Orphaned |

---

## Prisma Models with NO Supabase Table (32 models)

These models exist in `prisma/schema.prisma` but have no corresponding Supabase table:

| Prisma Model | Schema | Purpose |
|---|---|---|
| `Agency` | main | Agency/company records |
| `Client` | main | Client records |
| `Audit` | main | Audit records |
| `Proposal` | main | Proposals |
| `Invoice` | main | Invoices (different from InvoiceAU) |
| `Enquiry` | main | Contact enquiries |
| `Notification` | main | User notifications |
| `Lead` | main | Lead records |
| `Partner` | main | Partner records |
| `PartnerBilling` | main | Partner billing |
| `PartnerPayment` | main | Partner payments |
| `LeadTracking` | main | Lead event tracking |
| `LeadNote` | main | Lead notes |
| `ContractorCompany` | main | Contractor company details |
| `ContractorCertification` | main | Certification records |
| `ContractorInsurance` | main | Insurance records |
| `ContractorReference` | main | Reference checks |
| `BackgroundCheck` | main | Background check records |
| `ContractorSubscription` | main | Subscription management |
| `ContractorPayment` | main | Contractor payments |
| `ContractorInvoice` | main | Contractor invoices |
| `ContractorTerritory` | main | Territory definitions |
| `ContractorKPI` | main | KPI metrics |
| `ContractorAgreement` | main | Legal agreements |
| `ContractorTraining` | main | Training records |
| `ContractorProject` | main | Project portfolio |
| `ContractorNotification` | main | Contractor notifications |
| `ContractorSupport` | main | Support tickets |
| `SupportMessage` | main | Support ticket messages |
| `ContractorAuditLog` | main | Contractor audit trail |
| `OnboardingPayment` | main | Onboarding payments |
| `OnboardingProgress` | main | Onboarding progress |
| `ModuleProgress` | main | Module progress |
| `SubscriptionPricing` | main | Pricing plans |
| `ErrorLog` | main | Error tracking |

---

## API Routes Analysis (47 routes)

### Routes Using Prisma (18 — operating on ephemeral SQLite)
- `app/api/analytics/compliance/route.ts`
- `app/api/analytics/kpi/route.ts`
- `app/api/audit/log/route.ts`
- `app/api/auth/current-user/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/signup/route.ts`
- `app/api/contractor/login/route.ts`
- `app/api/contractor/register/route.ts`
- `app/api/fraud-detection/analyze/route.ts`
- `app/api/inspection-reports/review/route.ts`
- `app/api/inspection-reports/submit/route.ts`
- `app/api/leads/capture/route.ts`
- `app/api/log-error/route.ts`
- `app/api/proof-of-work/submit/route.ts`
- `app/api/proof-of-work/verify/route.ts`
- `app/api/seo/generate-pages/route.ts`
- `app/api/stripe/create-payment/route.ts`
- `app/api/stripe/webhook/route.ts`

### Routes with NO Database Connection (29)
These API routes exist but likely don't persist data to any database:
- `app/api/agents/research/route.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/auth/verify/route.ts`
- `app/api/bookings/availability/route.ts`
- `app/api/bookings/create/route.ts`
- `app/api/claims/submit/route.ts`
- `app/api/contact/submit/route.ts`
- `app/api/contractor/analytics/route.ts`
- `app/api/contractor/dashboard/route.ts`
- `app/api/contractor/jobs/[id]/route.ts`
- `app/api/contractor/jobs/route.ts`
- `app/api/contractor/leads/route.ts`
- `app/api/contractor/profile/route.ts`
- `app/api/contractor/validate/route.ts`
- `app/api/contractors/distribute-job/route.ts`
- `app/api/contractors/release-payment/route.ts`
- `app/api/demo/workflow/route.ts`
- `app/api/disputes/route.ts`
- `app/api/elevenlabs-tts/route.ts`
- `app/api/elevenlabs/narrate/route.ts`
- `app/api/email/test/route.ts`
- `app/api/image-stats/route.ts`
- `app/api/payments/create-booking/route.ts`
- `app/api/payments/refund/route.ts`
- `app/api/protected/dashboard/route.ts`
- `app/api/search/route.ts`
- `app/api/semrush/test/route.ts`
- `app/api/tickets/create/route.ts`
- `app/api/upload/route.ts`

---

## Missing Webhook Handlers

### Currently Exists (1)
- `app/api/stripe/webhook/route.ts` — Stripe payment events

### Missing (Should Exist)
| Webhook | Purpose | Priority |
|---|---|---|
| Supabase Auth webhook | Auth events (signup, login, password reset) | CRITICAL |
| Supabase Database webhook | Row-level change triggers | HIGH |
| Contractor status webhook | Onboarding state changes → auto-generate pages | HIGH |
| Lead assignment webhook | New lead → notify matched contractors | HIGH |
| Insurance claim webhook | Claim updates from insurance APIs | MEDIUM |
| Twilio webhook | SMS/WhatsApp message events | MEDIUM |
| SendGrid/email webhook | Email delivery/bounce events | LOW |

---

## Security Issues (57 from Supabase Advisor)

### CRITICAL: Password Exposure
- Table `public.users` has `password` column exposed via Data API without RLS
- **Immediate action required**: Enable RLS or restrict API access

### All 91 Tables Have RLS Disabled
- RLS policies exist on 5 tables (`contractor_profiles`, `messages`, `service_requests`, `tenant_configurations`, `users`) but **RLS is not enabled**
- 13+ SQL queries were previously saved attempting to fix this — none completed
- Previous work includes: tenant isolation policies, tenantId column additions, workspace setup

---

## Recommended Fix Sequence

### Phase 1: Database Unification (CRITICAL)
1. **Choose ONE database** — Supabase PostgreSQL is recommended (already has 91 tables, Pro plan, Sydney region)
2. Install `@supabase/supabase-js` in the project
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_ANON_KEY` to environment
4. Create `src/lib/supabase.ts` client configuration
5. Migrate Prisma schema from SQLite to PostgreSQL (`provider = "postgresql"`)
6. Point Prisma `DATABASE_URL` at Supabase connection string

### Phase 2: Schema Alignment
1. Generate Prisma migration from current schema → PostgreSQL
2. Reconcile Prisma models with existing Supabase tables
3. Create missing tables for Prisma models not in Supabase
4. Drop or archive unused Supabase tables

### Phase 3: Security
1. Enable RLS on ALL public tables
2. Complete tenant isolation policies
3. Remove `password` column from `users` table API exposure
4. Set up proper auth policies via Supabase Auth

### Phase 4: Webhook Integration
1. Add Supabase Auth webhook handler
2. Add database change webhook for contractor/lead events
3. Connect Twilio webhook for SMS events
4. Add email delivery webhook

### Phase 5: API Route Migration
1. Update all 18 Prisma-using API routes to use Supabase/PostgreSQL
2. Connect remaining 29 routes to persistent database
3. Remove SQLite build workaround from `scripts/vercel-build.js`

---

## SQL Files Status

### Existing SQL Files (2)
| File | Purpose | Status |
|---|---|---|
| `prisma/migrations/20250905043504_add_missing_models/migration.sql` | Create all tables (SQLite) | Complete but targets SQLite |
| `prisma/migrations/add_contractor_tables.sql` | Contractor CRM tables | Incomplete (abbreviated) |

### Missing SQL Files Needed
1. **PostgreSQL migration** — Convert SQLite schema to PostgreSQL syntax
2. **Supabase RLS policies** — Enable RLS on all 91 tables
3. **Tenant isolation** — Complete the half-finished tenantId migration
4. **Reconciliation** — Align Prisma models with Supabase tables
5. **Webhook triggers** — Database triggers for event-driven webhooks
6. **Indexes** — Performance indexes for production queries

---

## Bot Schema (`prisma/schema-bots.prisma`)

A separate PostgreSQL schema exists for the bot system with 12 models:
- `VerifiedContent`, `StepByStepGuide`, `GuideStep`, `ServiceProcedure`
- `EmergencyGuide`, `InsuranceProcess`, `Contractor` (conflicts with main!)
- `ContractorTerritory` (conflicts), `ContractorAvailability`, `Job`
- `BotConversation`, `ComplianceAudit`, `BotMetrics`

**Status**: Unknown if ever deployed. Has conflicting model names with main schema.

---

## Saved SQL Queries in Supabase (34 private)

Evidence of previous attempts to fix these issues:
1. Remove skill_executions foreign key constraint
2. Skill Executions Structure and Foreign Keys
3. Backfill tenantId Across Tables
4. Tenant isolation RLS policies (×8 variations)
5. Add tenantId Columns (×3 variations)
6. Enable Row-Level Security on Core Models
7. Complete RLS Policies for Remaining Tables (×2)
8. Cache Performance Summary
9. Workspace Members Schema/Columns
10. Workspace Skills and Executions Migration (×2)
11. Public Storage Bucket Policies
12. Demo account/user queries (×4)
13. Users Table Schema
14. List Selected Public Tables
15. List Public Tables (auto-saved from this session)

**None of these queries were fully executed** — they represent incomplete work.
