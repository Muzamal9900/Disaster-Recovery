# Supabase Tables Introspection

> Generated: 2026-02-22

## Summary

- **Total Supabase tables**: 90 (excluding _prisma_migrations)
- **Already in Prisma schema**: 3
- **Missing from Prisma schema**: 87

---

## Tables Already in Prisma Schema (3)

| Supabase Table | Prisma Model | Notes |
|---|---|---|
| `AuditLog` | `AuditLog` | Exact match |
| `Contractor` | `Contractor` | Exact match |
| `ContractorDocument` | `ContractorDocument` | Exact match |

---

## Tables Missing from Prisma Schema (87)

These tables exist in Supabase but have NO corresponding Prisma model.
Each will need a Prisma model with `@@map("table_name")` directives.

### Client/Customer (7 tables)

#### `client_emergency_contacts`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientProfileId` | String | No | - | Note: This is a Foreign Key to `client_profiles.id`.<fk table='client_profiles' column='id'/> |
| `name` | String | No | - | - |
| `relationship` | String | No | - | - |
| `phone` | String | No | - | - |
| `email` | String | Yes | - | - |
| `allowContractorContact` | Boolean | No | false | - |
| `isPrimary` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `client_insurance`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientProfileId` | String | No | - | Note: This is a Foreign Key to `client_profiles.id`.<fk table='client_profiles' column='id'/> |
| `hasInsurance` | Boolean | No | false | - |
| `insuranceProvider` | String | Yes | - | - |
| `policyNumber` | String | Yes | - | - |
| `policyExpiryDate` | DateTime | Yes | - | - |
| `policyDocumentUrls` | String[] (array) | Yes | - | - |
| `policyVerified` | Boolean | No | false | - |
| `verifiedAt` | DateTime | Yes | - | - |
| `verifiedBy` | String | Yes | - | - |
| `hasPreviousClaims` | Boolean | No | false | - |
| `claimCount` | Int | No | 0 | - |
| `lastClaimDate` | DateTime | Yes | - | - |
| `preferredContractors` | String[] (array) | Yes | - | - |
| `restrictedContractors` | String[] (array) | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `client_module_progress`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `onboardingId` | String | No | - | Note: This is a Foreign Key to `client_onboarding.id`.<fk table='client_onboarding' column='id'/> |
| `moduleId` | String | No | - | - |
| `moduleName` | String | Yes | - | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `completed` | Boolean | No | false | - |
| `status` | String | No | NOT_STARTED | - |
| `progress` | Int | No | 0 | - |
| `quizScore` | Int | Yes | - | - |
| `quizAttempts` | Int | No | 0 | - |
| `quizPassed` | Boolean | No | false | - |
| `timeSpentSeconds` | Int | No | 0 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `client_onboarding`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `client_profiles.userId`.<fk table='client_profiles' column='userId'/> |
| `startDate` | DateTime | Yes | - | - |
| `targetCompletionDate` | DateTime | Yes | - | - |
| `actualCompletionDate` | DateTime | Yes | - | - |
| `status` | String | No | PENDING_START | - |
| `currentPhase` | String | Yes | - | - |
| `completedPhases` | String[] (array) | Yes | - | - |
| `flowVariant` | String | Yes | - | - |
| `experimentId` | String | Yes | - | - |
| `certificateIssued` | Boolean | No | false | - |
| `certificateUrl` | String | Yes | - | - |
| `tourCompleted` | Boolean | No | false | - |
| `firstRequestCreated` | Boolean | No | false | - |
| `badgeAwarded` | Boolean | No | false | - |
| `totalTimeSpentSeconds` | Int | No | 0 | - |
| `deviceType` | String | Yes | - | - |
| `browserLanguage` | String | Yes | - | - |
| `lastActivityAt` | DateTime | Yes | - | - |
| `abandonedAt` | DateTime | Yes | - | - |
| `abandonedPhase` | String | Yes | - | - |
| `reminderSentAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `client_payments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientProfileId` | String | No | - | Note: This is a Foreign Key to `client_profiles.id`.<fk table='client_profiles' column='id'/> |
| `stripeCustomerId` | String | Yes | - | - |
| `stripePaymentMethodId` | String | Yes | - | - |
| `cardBrand` | String | Yes | - | - |
| `cardLast4` | String | Yes | - | - |
| `cardExpiryMonth` | Int | Yes | - | - |
| `cardExpiryYear` | Int | Yes | - | - |
| `billingAddressSameAs` | Boolean | No | true | - |
| `billingStreet` | String | Yes | - | - |
| `billingSuburb` | String | Yes | - | - |
| `billingPostcode` | String | Yes | - | - |
| `billingState` | String | Yes | - | - |
| `autoPayEnabled` | Boolean | No | false | - |
| `invoiceDeliveryMethod` | String | No | email | - |
| `taxInvoiceRecipient` | String | Yes | - | - |
| `abnNumber` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `client_profiles`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `displayName` | String | Yes | - | - |
| `phoneNumber` | String | Yes | - | - |
| `phoneNumberVerified` | Boolean | No | false | - |
| `preferredContactMethod` | String | No | email | - |
| `timezone` | String | No | Australia/Sydney | - |
| `language` | String | No | en-AU | - |
| `propertyOwnershipStatus` | String | Yes | - | - |
| `propertyCount` | Int | No | 1 | - |
| `isProfileComplete` | Boolean | No | false | - |
| `tier` | String | No | standard | - |
| `vipAssignedManagerId` | String | Yes | - | - |
| `riskZone` | String | Yes | - | - |
| `riskAssessmentOffered` | Boolean | No | false | - |
| `riskAssessmentCompleted` | Boolean | No | false | - |
| `flaggedForReview` | Boolean | No | false | - |
| `flagReason` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `client_properties`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientProfileId` | String | No | - | Note: This is a Foreign Key to `client_profiles.id`.<fk table='client_profiles' column='id'/> |
| `streetAddress` | String | No | - | - |
| `suburb` | String | No | - | - |
| `postcode` | String | No | - | - |
| `state` | String | No | - | - |
| `country` | String | No | AU | - |
| `propertyType` | String | No | - | - |
| `propertySize` | String | Yes | - | - |
| `buildingAge` | String | Yes | - | - |
| `accessInstructions` | String | Yes | - | - |
| `accessKeyId` | String | Yes | - | - |
| `accessDecryptedAt` | DateTime | Yes | - | - |
| `accessDecryptedBy` | String | Yes | - | - |
| `parkingAvailable` | Boolean | No | true | - |
| `securityAccess` | Boolean | No | false | - |
| `petOnPremises` | Boolean | No | false | - |
| `petDetails` | String | Yes | - | - |
| `recommendedServices` | String[] (array) | Yes | - | - |
| `isPrimary` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

### Contractor (10 tables)

#### `contractor_applications`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `businessName` | String | No | - | - |
| `contactName` | String | No | - | - |
| `email` | String | No | - | - |
| `phone` | String | No | - | - |
| `abn` | String | No | - | - |
| `certifications` | String[] (array) | Yes | - | - |
| `serviceAreas` | String[] (array) | Yes | - | - |
| `yearsInBusiness` | Int | No | - | - |
| `status` | String | No | PENDING | - |
| `reviewedBy` | String | Yes | - | - |
| `reviewedAt` | DateTime | Yes | - | - |
| `rejectionReason` | String | Yes | - | - |
| `notes` | String | Yes | - | - |
| `source` | String | Yes | - | - |
| `utmSource` | String | Yes | - | - |
| `utmMedium` | String | Yes | - | - |
| `utmCampaign` | String | Yes | - | - |
| `utmContent` | String | Yes | - | - |
| `utmTerm` | String | Yes | - | - |
| `emailSent` | Boolean | No | false | - |
| `contacted` | Boolean | No | false | - |
| `contactedAt` | DateTime | Yes | - | - |
| `convertedContractor` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `contractor_assessments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `onboardingId` | String (uuid) | No | - | Note: This is a Foreign Key to `contractor_onboarding.id`.<fk table='contractor_onboarding' column='id'/> |
| `moduleId` | String | No | - | - |
| `assessmentType` | String | Yes | - | - |
| `score` | Int | Yes | - | - |
| `maxScore` | Int | No | 100 | - |
| `completedAt` | DateTime | Yes | - | - |
| `feedback` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `contractor_certifications`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `certificationName` | String | No | - | - |
| `certificationLevel` | Int | Yes | - | - |
| `issueDate` | DateTime | Yes | - | - |
| `expiryDate` | DateTime | Yes | - | - |
| `specializations` | String[] (array) | Yes | - | - |
| `verified` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `contractor_location_history`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `jobId` | String | No | - | - |
| `contractorId` | String | No | - | - |
| `latitude` | Float | No | - | - |
| `longitude` | Float | No | - | - |
| `accuracy` | Float | Yes | - | - |
| `heading` | Float | Yes | - | - |
| `speed` | Float | Yes | - | - |
| `timestamp` | DateTime | No | CURRENT_TIMESTAMP | - |
| `deviceType` | String | Yes | - | - |
| `batteryLevel` | Int | Yes | - | - |

#### `contractor_matches`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `contractor_profiles.id`.<fk table='contractor_profiles' column='id'/> |
| `serviceRequestId` | String | Yes | - | Note: This is a Foreign Key to `service_requests.id`.<fk table='service_requests' column='id'/> |
| `matchScore` | Float | No | - | - |
| `status` | String | No | PENDING | - |
| `contractorMessage` | String | Yes | - | - |
| `clientMessage` | String | Yes | - | - |
| `budget` | String | Yes | - | - |
| `timeline` | String | Yes | - | - |
| `startDate` | String | Yes | - | - |
| `estimatedHours` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `claimId` | String | Yes | - | Note: This is a Foreign Key to `public_claims.id`.<fk table='public_claims' column='id'/> |
| `contractorRespondedAt` | DateTime | Yes | - | - |
| `contractorResponse` | String | Yes | - | - |
| `isBackup` | Boolean | No | false | - |
| `matchReason` | String[] (array) | Yes | - | - |
| `notificationSentAt` | DateTime | Yes | - | - |
| `notificationStatus` | String | Yes | - | - |
| `responseDeadline` | DateTime | Yes | - | - |

#### `contractor_module_progress`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `onboardingId` | String (uuid) | No | - | Note: This is a Foreign Key to `contractor_onboarding.id`.<fk table='contractor_onboarding' column='id'/> |
| `moduleId` | String | No | - | - |
| `courseName` | String | Yes | - | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `completed` | Boolean | No | false | - |
| `status` | String | No | NOT_STARTED | - |
| `progress` | Int | No | 0 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `contractor_onboarding`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `specialization` | String | No | - | - |
| `assessmentScore` | Int | Yes | - | - |
| `recommendedModules` | Json | Yes | - | - |
| `startDate` | DateTime | Yes | - | - |
| `targetCompletionDate` | DateTime | Yes | - | - |
| `actualCompletionDate` | DateTime | Yes | - | - |
| `status` | String | No | PENDING_START | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `contractor_preferences`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `serviceCategories` | String[] (array) | Yes | - | - |
| `locations` | String[] (array) | Yes | - | - |
| `experience` | String | Yes | - | - |
| `expertise` | String[] (array) | Yes | - | - |
| `background` | String | Yes | - | - |
| `hourlyRate` | String | Yes | - | - |
| `availability` | String | Yes | - | - |
| `maxDistance` | String | Yes | - | - |
| `selectedTheme` | String | Yes | - | - |
| `brandingColor` | String | Yes | - | - |
| `isOnboardingComplete` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `contractor_profiles`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `businessName` | String | Yes | - | - |
| `phone` | String | Yes | - | - |
| `address` | String | Yes | - | - |
| `city` | String | Yes | - | - |
| `state` | String | Yes | - | - |
| `zipCode` | String | Yes | - | - |
| `licenseNumber` | String | Yes | - | - |
| `insuranceProvider` | String | Yes | - | - |
| `insuranceExpiry` | DateTime | Yes | - | - |
| `services` | String[] (array) | Yes | - | - |
| `serviceAreas` | String[] (array) | Yes | - | - |
| `hourlyRate` | Float | Yes | - | - |
| `experience` | Int | No | 0 | - |
| `rating` | Float | No | 0 | - |
| `totalJobs` | Int | No | 0 | - |
| `bio` | String | Yes | - | - |
| `availability` | String | No | AVAILABLE | - |
| `isVerified` | Boolean | No | false | - |
| `stripeConnectAccountId` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `contractor_rotation`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `workspaceId` | String | No | - | Note: This is a Foreign Key to `workspaces.id`.<fk table='workspaces' column='id'/> |
| `postcode` | String | No | - | - |
| `lastJobReceivedAt` | DateTime | Yes | - | - |
| `totalJobsReceived` | Int | No | 0 | - |
| `totalJobsDeclined` | Int | No | 0 | - |
| `declineRate` | Float | No | 0 | - |
| `availabilityStatus` | String | No | available | - |
| `serviceRadiusKm` | Int | No | 25 | - |
| `updatedAt` | DateTime | No | - | - |
| `totalJobsOffered` | Int | No | 0 | - |
| `unavailableUntil` | DateTime | Yes | - | - |

### Inspection/Assessment (6 tables)

#### `cost_estimates`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `totalLaborHours` | Float | No | - | - |
| `totalLaborCost` | Float | No | - | - |
| `totalMaterialCost` | Float | No | - | - |
| `totalEquipmentCost` | Float | No | - | - |
| `subtotal` | Float | No | - | - |
| `gst` | Float | No | - | - |
| `totalCost` | Float | No | - | - |
| `pricingDate` | DateTime | No | CURRENT_TIMESTAMP | - |
| `jurisdiction` | String | No | - | - |
| `pricingSource` | String | No | - | - |
| `contingencyPercent` | Float | No | 10 | - |
| `contingencyAmount` | Float | No | - | - |
| `assumptions` | String | Yes | - | - |
| `exclusions` | String | Yes | - | - |
| `validityPeriod` | Int | No | 30 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `damage_areas`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `areaName` | String | No | - | - |
| `floor` | String | No | - | - |
| `roomType` | String | No | - | - |
| `damageCategory` | String | No | - | - |
| `affectedArea` | Float | No | - | - |
| `affectedMaterials` | String[] (array) | Yes | - | - |
| `initialMoistureLevel` | Float | Yes | - | - |
| `targetMoistureLevel` | Float | Yes | - | - |
| `description` | String | No | - | - |
| `severity` | String | No | - | - |
| `requiredActions` | String[] (array) | Yes | - | - |
| `equipmentNeeded` | String[] (array) | Yes | - | - |
| `estimatedDryingTime` | Int | Yes | - | - |
| `estimatedCost` | Float | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `inspection_photos`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `damageAreaId` | String | Yes | - | Note: This is a Foreign Key to `damage_areas.id`.<fk table='damage_areas' column='id'/> |
| `photoUrl` | String | No | - | - |
| `thumbnailUrl` | String | Yes | - | - |
| `filename` | String | No | - | - |
| `fileSize` | Int | No | - | - |
| `mimeType` | String | No | - | - |
| `photoType` | String | No | - | - |
| `caption` | String | No | - | - |
| `description` | String | Yes | - | - |
| `capturedAt` | DateTime | No | - | - |
| `gpsLatitude` | Float | Yes | - | - |
| `gpsLongitude` | Float | Yes | - | - |
| `deviceModel` | String | Yes | - | - |
| `sortOrder` | Int | No | 0 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `aiEnhanced` | Boolean | No | false | - |
| `aiEnhancedAt` | DateTime | Yes | - | - |
| `aiModel` | String | Yes | - | - |

#### `inspection_reports`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportNumber` | String | No | - | - |
| `bookingId` | String | No | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `insuranceClaimId` | String | Yes | - | Note: This is a Foreign Key to `InsuranceClaimAU.id`.<fk table='InsuranceClaimAU' column='id'/> |
| `inspectionDate` | DateTime | No | - | - |
| `inspectorId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `jurisdiction` | String | No | - | - |
| `applicableCodes` | String[] (array) | Yes | - | - |
| `iicrcStandards` | String[] (array) | Yes | - | - |
| `status` | String | No | SCHEDULED | - |
| `version` | Int | No | 1 | - |
| `isDraft` | Boolean | No | true | - |
| `technicalReviewerId` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `technicalReviewDate` | DateTime | Yes | - | - |
| `technicalReviewNotes` | String | Yes | - | - |
| `managerReviewerId` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `managerReviewDate` | DateTime | Yes | - | - |
| `managerReviewNotes` | String | Yes | - | - |
| `finalApproverId` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `finalApprovalDate` | DateTime | Yes | - | - |
| `executiveSummary` | String | Yes | - | - |
| `scopeOfWork` | String | No | - | - |
| `findings` | String | No | - | - |
| `recommendations` | String | No | - | - |
| `limitations` | String | Yes | - | - |
| `pdfUrl` | String | Yes | - | - |
| `pdfGeneratedAt` | DateTime | Yes | - | - |
| `pdfVersion` | Int | No | 0 | - |
| `complianceStatus` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `createdBy` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `moisture_readings`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `readingDate` | DateTime | No | - | - |
| `location` | String | No | - | - |
| `material` | String | No | - | - |
| `moistureContent` | Float | No | - | - |
| `ambientTemperature` | Float | Yes | - | - |
| `ambientHumidity` | Float | Yes | - | - |
| `meterType` | String | No | - | - |
| `readingDepth` | String | Yes | - | - |
| `latitude` | Float | Yes | - | - |
| `longitude` | Float | Yes | - | - |
| `notes` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `triage_assessments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `email` | String | No | - | - |
| `phone` | String | No | - | - |
| `postcode` | String | No | - | - |
| `state` | String | No | - | - |
| `responses` | Json | No | - | - |
| `urgencyScore` | Int | No | - | - |
| `urgencyLevel` | String | No | - | - |
| `estimatedCost` | Int | No | 0 | - |
| `recommendations` | String[] (array) | Yes | - | - |
| `requiredServices` | String[] (array) | Yes | - | - |
| `triageSessionId` | String | No | - | - |
| `completedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `ipAddress` | String | Yes | - | - |
| `userAgent` | String | Yes | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

### Workspace/Multi-tenant (5 tables)

#### `tenant_configurations`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `tenantId` | String | No | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `key` | String | No | - | - |
| `value` | String | No | - | - |
| `type` | String | No | string | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `tenants`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `domain` | String | Yes | - | - |
| `subdomain` | String | Yes | - | - |
| `logo` | String | Yes | - | - |
| `primaryColor` | String | Yes | - | - |
| `secondaryColor` | String | Yes | - | - |
| `customCss` | String | Yes | - | - |
| `industry` | String | Yes | - | - |
| `isActive` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `currentPeriodEnd` | DateTime | Yes | - | - |
| `currentPeriodStart` | DateTime | Yes | - | - |
| `monthlyRequestLimit` | Int | No | 50 | - |
| `seatLimit` | Int | No | 5 | - |
| `stripeCustomerId` | String | Yes | - | - |
| `stripeSubscriptionId` | String | Yes | - | - |
| `subscriptionStatus` | String | No | TRIAL | - |
| `subscriptionTier` | String | No | BASIC | - |
| `trialEndsAt` | DateTime | Yes | - | - |

#### `workspace_audit_logs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `workspaceId` | String | Yes | - | Note: This is a Foreign Key to `workspaces.id`.<fk table='workspaces' column='id'/> |
| `userId` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `action` | String | No | - | - |
| `entityType` | String | Yes | - | - |
| `entityId` | String | Yes | - | - |
| `metadata` | Json | Yes | - | - |
| `ipAddress` | String | Yes | - | - |
| `userAgent` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `workspace_members`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `workspaceId` | String | No | - | Note: This is a Foreign Key to `workspaces.id`.<fk table='workspaces' column='id'/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `role` | String | No | TECHNICIAN | - |
| `invitedBy` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `invitedAt` | DateTime | Yes | - | - |
| `joinedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `workspaces`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `businessName` | String | No | - | - |
| `abnNumber` | String | Yes | - | - |
| `acnNumber` | String | Yes | - | - |
| `subscriptionTier` | String | No | BASIC | - |
| `subscriptionStatus` | String | No | TRIAL | - |
| `stripeCustomerId` | String | Yes | - | - |
| `stripeSubscriptionId` | String | Yes | - | - |
| `currentPeriodStart` | DateTime | Yes | - | - |
| `currentPeriodEnd` | DateTime | Yes | - | - |
| `seatLimit` | Int | No | 1 | - |
| `monthlyJobLimit` | Int | No | 10 | - |
| `serviceRadiusKm` | Int | No | 25 | - |
| `currentMonthJobs` | Int | No | 0 | - |
| `totalJobsCompleted` | Int | No | 0 | - |
| `totalOverageFees` | Float | No | 0 | - |
| `crmType` | String | Yes | - | - |
| `crmApiKey` | String | Yes | - | - |
| `crmWebhookSecret` | String | Yes | - | - |
| `completionRate` | Float | No | 0 | - |
| `averageRating` | Float | No | 0 | - |
| `averageResponseTime` | Int | No | 0 | - |
| `totalDeclines` | Int | No | 0 | - |
| `isActive` | Boolean | No | true | - |
| `suspendedAt` | DateTime | Yes | - | - |
| `cancelledAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `ownerId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |

### Blog/Content (4 tables)

#### `blog_faqs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `blogPostId` | String | No | - | Note: This is a Foreign Key to `blog_posts.id`.<fk table='blog_posts' column='id'/> |
| `question` | String | No | - | - |
| `answer` | String | No | - | - |
| `order` | Int | No | - | - |

#### `blog_posts`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `title` | String | No | - | - |
| `slug` | String | No | - | - |
| `excerpt` | String | No | - | - |
| `content` | String | No | - | - |
| `category` | String | No | - | - |
| `tags` | String[] (array) | Yes | - | - |
| `metaTitle` | String | Yes | - | - |
| `metaDescription` | String | Yes | - | - |
| `keywords` | String[] (array) | Yes | - | - |
| `authorId` | String | No | - | - |
| `authorName` | String | No | - | - |
| `authorBio` | String | Yes | - | - |
| `status` | String | No | DRAFT | - |
| `publishedAt` | DateTime | Yes | - | - |
| `scheduledFor` | DateTime | Yes | - | - |
| `viewCount` | Int | No | 0 | - |
| `shareCount` | Int | No | 0 | - |
| `isFeatured` | Boolean | No | false | - |
| `featuredImage` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `case_studies`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `title` | String | No | - | - |
| `slug` | String | No | - | - |
| `customerName` | String | No | - | - |
| `customerType` | String | No | - | - |
| `serviceType` | String | No | - | - |
| `location` | String | No | - | - |
| `incidentDate` | DateTime | No | - | - |
| `challenge` | String | No | - | - |
| `solution` | String | No | - | - |
| `results` | String | No | - | - |
| `testimonial` | String | Yes | - | - |
| `beforeImages` | String[] (array) | Yes | - | - |
| `afterImages` | String[] (array) | Yes | - | - |
| `videoUrl` | String | Yes | - | - |
| `projectCost` | Float | Yes | - | - |
| `responseTime` | Int | Yes | - | - |
| `completionTime` | Int | Yes | - | - |
| `customerRating` | Float | Yes | - | - |
| `metaTitle` | String | Yes | - | - |
| `metaDescription` | String | Yes | - | - |
| `isPublished` | Boolean | No | false | - |
| `publishedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `faqs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `question` | String | No | - | - |
| `answer` | String | No | - | - |
| `category` | String | No | - | - |
| `tags` | String[] (array) | Yes | - | - |
| `serviceType` | String | Yes | - | - |
| `location` | String | Yes | - | - |
| `keywords` | String[] (array) | Yes | - | - |
| `searchVolume` | Int | Yes | - | - |
| `viewCount` | Int | No | 0 | - |
| `helpful` | Int | No | 0 | - |
| `notHelpful` | Int | No | 0 | - |
| `order` | Int | No | 0 | - |
| `isPublished` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

### SEO/Competition (6 tables)

#### `backlinks`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `competitorId` | String | No | - | Note: This is a Foreign Key to `competitors.id`.<fk table='competitors' column='id'/> |
| `sourceUrl` | String | No | - | - |
| `targetUrl` | String | No | - | - |
| `sourceDomain` | String | No | - | - |
| `anchorText` | String | Yes | - | - |
| `linkType` | String | Yes | - | - |
| `domainRating` | Float | Yes | - | - |
| `traffic` | Int | Yes | - | - |
| `firstSeen` | DateTime | Yes | - | - |
| `lastSeen` | DateTime | No | CURRENT_TIMESTAMP | - |
| `isActive` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `competitor_analyses`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `competitorId` | String | No | - | Note: This is a Foreign Key to `competitors.id`.<fk table='competitors' column='id'/> |
| `organicTraffic` | Int | Yes | - | - |
| `paidTraffic` | Int | Yes | - | - |
| `totalKeywords` | Int | Yes | - | - |
| `organicKeywords` | Int | Yes | - | - |
| `paidKeywords` | Int | Yes | - | - |
| `domainRating` | Float | Yes | - | - |
| `trustFlow` | Float | Yes | - | - |
| `citationFlow` | Float | Yes | - | - |
| `totalBacklinks` | Int | Yes | - | - |
| `referringDomains` | Int | Yes | - | - |
| `pageSpeed` | Float | Yes | - | - |
| `mobileScore` | Float | Yes | - | - |
| `coreWebVitals` | Json | Yes | - | - |
| `totalPages` | Int | Yes | - | - |
| `blogPosts` | Int | Yes | - | - |
| `servicePages` | Int | Yes | - | - |
| `analysisDate` | DateTime | No | CURRENT_TIMESTAMP | - |
| `dataSource` | String | No | - | - |
| `rawData` | Json | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `competitor_keywords`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `competitorId` | String | No | - | Note: This is a Foreign Key to `competitors.id`.<fk table='competitors' column='id'/> |
| `keyword` | String | No | - | - |
| `searchVolume` | Int | Yes | - | - |
| `difficulty` | Float | Yes | - | - |
| `cpc` | Float | Yes | - | - |
| `position` | Int | Yes | - | - |
| `previousPosition` | Int | Yes | - | - |
| `url` | String | Yes | - | - |
| `intent` | String | Yes | - | - |
| `category` | String | Yes | - | - |
| `opportunityScore` | Float | Yes | - | - |
| `difficultyTier` | String | Yes | - | - |
| `lastChecked` | DateTime | No | CURRENT_TIMESTAMP | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `competitors`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `domain` | String | No | - | - |
| `name` | String | No | - | - |
| `category` | String | No | - | - |
| `priority` | Int | No | 5 | - |
| `isActive` | Boolean | No | true | - |
| `businessModel` | String | Yes | - | - |
| `targetMarket` | String | Yes | - | - |
| `geographicFocus` | String[] (array) | Yes | - | - |
| `contactInfo` | Json | Yes | - | - |
| `socialProfiles` | Json | Yes | - | - |
| `notes` | String | Yes | - | - |
| `discoveredAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `lastAnalyzedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `keyword_opportunities`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `keyword` | String | No | - | - |
| `searchVolume` | Int | No | - | - |
| `difficulty` | Float | No | - | - |
| `cpc` | Float | Yes | - | - |
| `competitorCount` | Int | No | - | - |
| `averagePosition` | Float | No | - | - |
| `gapScore` | Float | No | - | - |
| `difficultyTier` | String | No | - | - |
| `category` | String | Yes | - | - |
| `intent` | String | Yes | - | - |
| `competitors` | Json | No | - | - |
| `identifiedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `swot_analyses`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `competitorId` | String | No | - | Note: This is a Foreign Key to `competitors.id`.<fk table='competitors' column='id'/> |
| `strengths` | Json | No | - | - |
| `weaknesses` | Json | No | - | - |
| `opportunities` | Json | No | - | - |
| `threats` | Json | No | - | - |
| `summary` | String | Yes | - | - |
| `recommendations` | Json | Yes | - | - |
| `competitiveAdvantages` | Json | Yes | - | - |
| `generatedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `generatedBy` | String | Yes | - | - |

### Insurance/Claims (3 tables)

#### `InsuranceClaimAU`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `bookingId` | String | No | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `insuranceProviderId` | String | No | - | Note: This is a Foreign Key to `InsuranceProvider.id`.<fk table='InsuranceProvider' column='id'/> |
| `policyNumber` | String | No | - | - |
| `claimNumber` | String | Yes | - | - |
| `totalClaimAmountAUD` | Float | No | - | - |
| `approvedAmountAUD` | Float | Yes | - | - |
| `paymentAmountAUD` | Float | Yes | - | - |
| `status` | String | No | DRAFT | - |
| `damageDescription` | String | No | - | - |
| `damagePhotos` | String[] (array) | Yes | - | - |
| `invoiceUrl` | String | Yes | - | - |
| `estimateUrl` | String | Yes | - | - |
| `additionalDocuments` | String[] (array) | Yes | - | - |
| `submittedAt` | DateTime | Yes | - | - |
| `reviewedAt` | DateTime | Yes | - | - |
| `approvedAt` | DateTime | Yes | - | - |
| `paidAt` | DateTime | Yes | - | - |
| `denialReason` | String | Yes | - | - |
| `deniedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `InsuranceProvider`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `providerType` | String | No | - | - |
| `code` | String | No | - | - |
| `contactEmail` | String | No | - | - |
| `contactPhone` | String | No | - | - |
| `apiEndpoint` | String | Yes | - | - |
| `apiKey` | String | Yes | - | - |
| `webhookUrl` | String | Yes | - | - |
| `supportedStates` | String[] (array) | Yes | - | - |
| `isActive` | Boolean | No | true | - |
| `isVerified` | Boolean | No | false | - |
| `verificationNotes` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `public_claims`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientName` | String | No | - | - |
| `clientEmail` | String | No | - | - |
| `clientPhone` | String | No | - | - |
| `propertyAddress` | String | No | - | - |
| `suburb` | String | No | - | - |
| `postcode` | String | No | - | - |
| `disasterType` | String | No | - | - |
| `incidentDate` | DateTime | No | - | - |
| `isOngoing` | Boolean | No | false | - |
| `isEmergency` | Boolean | No | false | - |
| `damageDescription` | String | No | - | - |
| `hasInsurance` | Boolean | No | false | - |
| `insuranceProvider` | String | Yes | - | - |
| `policyNumber` | String | Yes | - | - |
| `priority` | String | No | Medium | - |
| `status` | String | No | PENDING | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `notes` | String | Yes | - | - |
| `requiredIICRCCerts` | String[] (array) | Yes | - | - |

### Billing/Payment (3 tables)

#### `InvoiceAU`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `paymentId` | String | No | - | Note: This is a Foreign Key to `Payment.id`.<fk table='Payment' column='id'/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `invoiceNumber` | String | No | - | - |
| `dateIssued` | DateTime | No | CURRENT_TIMESTAMP | - |
| `dateDue` | DateTime | No | - | - |
| `subtotalAUD` | Float | No | - | - |
| `gstAUD` | Float | No | - | - |
| `totalAUD` | Float | No | - | - |
| `isPaid` | Boolean | No | false | - |
| `paidDate` | DateTime | Yes | - | - |
| `description` | String | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `Payment`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `bookingId` | String | No | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `contractorId` | String | Yes | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `amountAUD` | Float | No | - | - |
| `platformFeeAUD` | Float | No | - | - |
| `platformFeePercentage` | Float | No | 15 | - |
| `gstAUD` | Float | No | - | - |
| `netAmountAUD` | Float | No | - | - |
| `paymentMethod` | String | No | - | - |
| `stripePaymentIntentId` | String | Yes | - | - |
| `transactionId` | String | Yes | - | - |
| `status` | String | No | PENDING | - |
| `processedAt` | DateTime | Yes | - | - |
| `failureReason` | String | Yes | - | - |
| `receiptUrl` | String | Yes | - | - |
| `invoiceNumber` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `service_request_callout_payments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `serviceRequestId` | String | No | - | Note: This is a Foreign Key to `service_requests.id`.<fk table='service_requests' column='id'/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `contractorProfileId` | String | Yes | - | Note: This is a Foreign Key to `contractor_profiles.id`.<fk table='contractor_profiles' column='id'/> |
| `totalAUD` | Float | No | - | - |
| `totalExGstAUD` | Float | No | - | - |
| `gstAUD` | Float | No | - | - |
| `platformFeeAUD` | Float | No | - | - |
| `platformFeeExGstAUD` | Float | No | - | - |
| `platformFeeGstAUD` | Float | No | - | - |
| `contractorEntitlementAUD` | Float | No | - | - |
| `contractorEntitlementExGstAUD` | Float | No | - | - |
| `contractorEntitlementGstAUD` | Float | No | - | - |
| `gstInclusive` | Boolean | No | true | - |
| `status` | String | No | CREATED | - |
| `stripeCheckoutSessionId` | String | Yes | - | - |
| `stripePaymentIntentId` | String | Yes | - | - |
| `stripeTransferId` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

### Beta/Feedback (4 tables)

#### `beta_enrollments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `programId` | String | No | - | Note: This is a Foreign Key to `beta_programs.id`.<fk table='beta_programs' column='id'/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `status` | String | No | INVITED | - |
| `invitedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `invitedBy` | String | No | - | - |
| `acceptedAt` | DateTime | Yes | - | - |
| `tierOverride` | String | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `withdrawnAt` | DateTime | Yes | - | - |
| `withdrawReason` | String | Yes | - | - |
| `adminNotes` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `beta_feedback`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `programId` | String | No | - | Note: This is a Foreign Key to `beta_programs.id`.<fk table='beta_programs' column='id'/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `category` | String | No | - | - |
| `title` | String | No | - | - |
| `description` | String | No | - | - |
| `screenshotUrl` | String | Yes | - | - |
| `screenshotKey` | String | Yes | - | - |
| `pageUrl` | String | Yes | - | - |
| `userAgent` | String | Yes | - | - |
| `deviceType` | String | Yes | - | - |
| `isReviewed` | Boolean | No | false | - |
| `reviewedAt` | DateTime | Yes | - | - |
| `reviewedBy` | String | Yes | - | - |
| `adminResponse` | String | Yes | - | - |
| `priority` | String | Yes | - | - |
| `status` | String | No | new | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `beta_nps_surveys`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `programId` | String | No | - | Note: This is a Foreign Key to `beta_programs.id`.<fk table='beta_programs' column='id'/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `score` | Int | No | - | - |
| `followUpAnswer` | String | Yes | - | - |
| `surveyTrigger` | String | Yes | - | - |
| `featureContext` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `beta_programs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `description` | String | Yes | - | - |
| `featureArea` | String | No | - | - |
| `startDate` | DateTime | No | - | - |
| `endDate` | DateTime | No | - | - |
| `isActive` | Boolean | No | true | - |
| `maxParticipants` | Int | No | 10 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

### NRPG/Training (4 tables)

#### `nrpg_certification_points`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `govCert4Points` | Int | No | 0 | - |
| `govCert4Status` | String | Yes | - | - |
| `govCert4EnrolledAt` | DateTime | Yes | - | - |
| `govCert4CompletedAt` | DateTime | Yes | - | - |
| `iicrcCorePoints` | Int | No | 0 | - |
| `iicrcAdvancedPoints` | Int | No | 0 | - |
| `iicrcMasterBonus` | Int | No | 0 | - |
| `carsiMembershipPoints` | Int | No | 0 | - |
| `carsiCoursePoints` | Int | No | 0 | - |
| `carsiCECPoints` | Int | No | 0 | - |
| `annualCECCredits` | Int | No | 0 | - |
| `carsiMemberId` | String | Yes | - | - |
| `primaryAssocPoints` | Int | No | 0 | - |
| `secondaryAssocPoints` | Int | No | 0 | - |
| `primaryAssociation` | String | Yes | - | - |
| `secondaryAssociations` | String[] (array) | Yes | - | - |
| `totalPoints` | Int | No | 0 | - |
| `partnershipLevel` | String | No | CANDIDATE | - |
| `lastCalculatedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `nrpg_commitments`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `professionalStandards` | Boolean | No | false | - |
| `codeOfConduct` | Boolean | No | false | - |
| `qualityAssurance` | Boolean | No | false | - |
| `continuingEducation` | Boolean | No | false | - |
| `clientProtection` | Boolean | No | false | - |
| `industryContribution` | Boolean | No | false | - |
| `signatureData` | String | Yes | - | - |
| `signatureType` | String | Yes | - | - |
| `signedAt` | DateTime | Yes | - | - |
| `signedIpAddress` | String | Yes | - | - |
| `witnessName` | String | Yes | - | - |
| `witnessEmail` | String | Yes | - | - |
| `commitmentPdfUrl` | String | Yes | - | - |
| `pdfGeneratedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `nrpg_onboarding_phases`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `phase1Status` | String | No | NOT_STARTED | - |
| `phase1StartDate` | DateTime | Yes | - | - |
| `phase1CompleteDate` | DateTime | Yes | - | - |
| `applicationSubmitted` | Boolean | No | false | - |
| `eligibilityReviewed` | Boolean | No | false | - |
| `backgroundCheckInitiated` | Boolean | No | false | - |
| `phase2Status` | String | No | NOT_STARTED | - |
| `phase2StartDate` | DateTime | Yes | - | - |
| `phase2CompleteDate` | DateTime | Yes | - | - |
| `carsiOnboarded` | Boolean | No | false | - |
| `associationIntegrated` | Boolean | No | false | - |
| `competencyVerified` | Boolean | No | false | - |
| `phase3Status` | String | No | NOT_STARTED | - |
| `phase3StartDate` | DateTime | Yes | - | - |
| `phase3CompleteDate` | DateTime | Yes | - | - |
| `standardsTrainingComplete` | Boolean | No | false | - |
| `commitmentSigned` | Boolean | No | false | - |
| `commitmentSignedAt` | DateTime | Yes | - | - |
| `platformActivated` | Boolean | No | false | - |
| `phase4Status` | String | No | NOT_STARTED | - |
| `phase4StartDate` | DateTime | Yes | - | - |
| `phase4CompleteDate` | DateTime | Yes | - | - |
| `probationEndDate` | DateTime | Yes | - | - |
| `performanceReviewScore` | Float | Yes | - | - |
| `fullCertificationGranted` | Boolean | No | false | - |
| `criminalCheckStatus` | String | No | NOT_INITIATED | - |
| `criminalCheckDate` | DateTime | Yes | - | - |
| `criminalCheckRef` | String | Yes | - | - |
| `financialCheckStatus` | String | No | NOT_INITIATED | - |
| `financialCheckDate` | DateTime | Yes | - | - |
| `financialCheckRef` | String | Yes | - | - |
| `professionalCheckStatus` | String | No | NOT_INITIATED | - |
| `professionalCheckDate` | DateTime | Yes | - | - |
| `professionalCheckRef` | String | Yes | - | - |
| `insuranceCheckStatus` | String | No | NOT_INITIATED | - |
| `insuranceCheckDate` | DateTime | Yes | - | - |
| `insuranceCheckRef` | String | Yes | - | - |
| `allChecksPass` | Boolean | No | false | - |
| `overallStatus` | String | No | NOT_STARTED | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `nrpg_training_progress`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String (uuid) | No | gen_random_uuid() | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | - |
| `courseId` | String | No | - | - |
| `moduleId` | String | No | - | - |
| `moduleName` | String | No | - | - |
| `moduleOrder` | Int | No | 0 | - |
| `status` | String | No | NOT_STARTED | - |
| `progress` | Int | No | 0 | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `estimatedMinutes` | Int | No | 0 | - |
| `actualMinutes` | Int | No | 0 | - |
| `quizAttempts` | Int | No | 0 | - |
| `bestQuizScore` | Int | Yes | - | - |
| `lastQuizScore` | Int | Yes | - | - |
| `lastQuizAt` | DateTime | Yes | - | - |
| `quizPassed` | Boolean | No | false | - |
| `contentViewedAt` | DateTime | Yes | - | - |
| `exercisesComplete` | Boolean | No | false | - |
| `resourcesViewed` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

### Admin (3 tables)

#### `admin_service_categories`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `description` | String | Yes | - | - |
| `icon` | String | Yes | - | - |
| `theme` | String | No | - | - |
| `isActive` | Boolean | No | true | - |
| `sortOrder` | Int | No | 0 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `admin_services`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `categoryId` | String | No | - | Note: This is a Foreign Key to `admin_service_categories.id`.<fk table='admin_service_categories' column='id'/> |
| `name` | String | No | - | - |
| `description` | String | Yes | - | - |
| `icon` | String | Yes | - | - |
| `theme` | String | No | - | - |
| `isActive` | Boolean | No | true | - |
| `sortOrder` | Int | No | 0 | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `admin_themes`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `identifier` | String | No | - | - |
| `primaryColor` | String | No | - | - |
| `secondaryColor` | String | No | - | - |
| `accentColor` | String | No | - | - |
| `backgroundColor` | String | No | - | - |
| `textColor` | String | No | - | - |
| `isActive` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

### Jobs/Tasks (4 tables)

#### `ai_batch_processing_jobs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `jobType` | String | No | - | - |
| `status` | String | No | - | - |
| `totalImages` | Int | No | - | - |
| `processedImages` | Int | No | 0 | - |
| `successCount` | Int | No | 0 | - |
| `failureCount` | Int | No | 0 | - |
| `totalCostUSD` | Float | No | 0 | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `initiatedBy` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `metadata` | Json | Yes | - | - |

#### `background_jobs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `jobType` | String | No | - | - |
| `status` | String | No | PENDING | - |
| `priority` | Int | No | 5 | - |
| `input` | Json | No | - | - |
| `output` | Json | Yes | - | - |
| `attemptCount` | Int | No | 0 | - |
| `maxAttempts` | Int | No | 3 | - |
| `lastError` | String | Yes | - | - |
| `errorStack` | String | Yes | - | - |
| `scheduledFor` | DateTime | No | CURRENT_TIMESTAMP | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `nextRetryAt` | DateTime | Yes | - | - |
| `claimId` | String | Yes | - | Note: This is a Foreign Key to `public_claims.id`.<fk table='public_claims' column='id'/> |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `initiatedBy` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `job_messages`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `jobId` | String | No | - | - |
| `senderId` | String | No | - | - |
| `senderType` | String | No | - | - |
| `receiverId` | String | No | - | - |
| `receiverType` | String | No | - | - |
| `content` | String | No | - | - |
| `isRead` | Boolean | No | false | - |
| `readAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `tasks`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `customerLifecycleId` | String | Yes | - | Note: This is a Foreign Key to `customer_lifecycle.id`.<fk table='customer_lifecycle' column='id'/> |
| `opportunityId` | String | Yes | - | Note: This is a Foreign Key to `opportunities.id`.<fk table='opportunities' column='id'/> |
| `title` | String | No | - | - |
| `description` | String | Yes | - | - |
| `assignedToId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `createdById` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `status` | String | No | TODO | - |
| `priority` | String | No | MEDIUM | - |
| `dueDate` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `reminderDate` | DateTime | Yes | - | - |
| `isOverdue` | Boolean | No | false | - |
| `relatedEntityType` | String | Yes | - | - |
| `relatedEntityId` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

### Other (28 tables)

#### `Booking`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `contractorId` | String | Yes | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `australianServiceType` | String | No | - | - |
| `description` | String | No | - | - |
| `estimatedDamagePhotosCount` | Int | No | 0 | - |
| `servicePostcode` | String | No | - | - |
| `serviceState` | String | No | - | - |
| `serviceSuburb` | String | No | - | - |
| `streetAddress` | String | No | - | - |
| `status` | String | No | PENDING | - |
| `emergencyResponseLevel` | String | No | STANDARD | - |
| `scheduledDate` | DateTime | Yes | - | - |
| `startedAt` | DateTime | Yes | - | - |
| `completedAt` | DateTime | Yes | - | - |
| `estimatedCostAUD` | Float | No | - | - |
| `finalCostAUD` | Float | Yes | - | - |
| `notes` | String | Yes | - | - |
| `internalNotes` | String | Yes | - | - |
| `clientNotes` | String | Yes | - | - |
| `damagePhotos` | String[] (array) | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `ContractorServiceArea`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `postcode` | String | No | - | - |
| `state` | String | No | - | - |
| `isActive` | Boolean | No | true | - |
| `responseTimeMinutes` | Int | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `city` | String | Yes | - | - |
| `coverageLevel` | String | No | STANDARD | - |
| `isPrimaryArea` | Boolean | No | true | - |
| `latitude` | Float | Yes | - | - |
| `longitude` | Float | Yes | - | - |
| `priorityLevel` | Int | No | 1 | - |
| `radiusKm` | Int | No | 25 | - |
| `suburb` | String | Yes | - | - |

#### `ContractorVerificationHistory`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `action` | String | No | - | - |
| `previousStatus` | String | Yes | - | - |
| `newStatus` | String | No | - | - |
| `reason` | String | Yes | - | - |
| `notes` | String | Yes | - | - |
| `performedBy` | String | No | - | - |
| `performedByName` | String | Yes | - | - |
| `isSystemAction` | Boolean | No | false | - |
| `ipAddress` | String | Yes | - | - |
| `userAgent` | String | Yes | - | - |
| `metadata` | Json | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `DisasterAlert`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `disasterType` | String | No | - | - |
| `severity` | String | No | - | - |
| `affectedPostcodes` | String[] (array) | Yes | - | - |
| `affectedStates` | String[] (array) | Yes | - | - |
| `description` | String | No | - | - |
| `alertUrl` | String | Yes | - | - |
| `startDate` | DateTime | No | - | - |
| `endDate` | DateTime | Yes | - | - |
| `isActive` | Boolean | No | true | - |
| `isResolved` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `IICRCCertification`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `certificationLevel` | String | No | - | - |
| `certificationCode` | String | No | - | - |
| `certificationDate` | DateTime | No | - | - |
| `expiryDate` | DateTime | No | - | - |
| `verificationDate` | DateTime | Yes | - | - |
| `isActive` | Boolean | No | true | - |
| `verifiedBy` | String | Yes | - | - |
| `certificatePdfUrl` | String | Yes | - | - |
| `certificateFileName` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `LoginAttempt`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `ipAddress` | String | No | - | - |
| `userAgent` | String | No | - | - |
| `success` | Boolean | No | - | - |
| `attemptedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `Rating`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `bookingId` | String | No | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `clientId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `rating` | Int | No | - | - |
| `comment` | String | Yes | - | - |
| `wouldRecommend` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `communication` | Int | Yes | - | - |
| `contractorReply` | String | Yes | - | - |
| `editedAt` | DateTime | Yes | - | - |
| `flagReason` | String | Yes | - | - |
| `flaggedAt` | DateTime | Yes | - | - |
| `flaggedBy` | String | Yes | - | - |
| `helpfulVotes` | Int | No | 0 | - |
| `isEdited` | Boolean | No | false | - |
| `isFlagged` | Boolean | No | false | - |
| `isPinned` | Boolean | No | false | - |
| `isPublished` | Boolean | No | true | - |
| `isVerified` | Boolean | No | true | - |
| `moderatedAt` | DateTime | Yes | - | - |
| `moderatedBy` | String | Yes | - | - |
| `photoUrls` | String[] (array) | Yes | - | - |
| `professionalism` | Int | Yes | - | - |
| `qualityOfWork` | Int | Yes | - | - |
| `repliedAt` | DateTime | Yes | - | - |
| `replyEditedAt` | DateTime | Yes | - | - |
| `timeliness` | Int | Yes | - | - |
| `title` | String | Yes | - | - |
| `unhelpfulVotes` | Int | No | 0 | - |
| `valueForMoney` | Int | Yes | - | - |
| `videoUrl` | String | Yes | - | - |

#### `RiskAssessment`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `bookingId` | String | No | - | - |
| `riskScore` | Float | No | - | - |
| `riskFactors` | String[] (array) | Yes | - | - |
| `recommendation` | String | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `VerificationToken`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `token` | String | No | - | - |
| `type` | String | No | - | - |
| `expiresAt` | DateTime | No | - | - |
| `usedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `activities`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `customerLifecycleId` | String | Yes | - | Note: This is a Foreign Key to `customer_lifecycle.id`.<fk table='customer_lifecycle' column='id'/> |
| `opportunityId` | String | Yes | - | Note: This is a Foreign Key to `opportunities.id`.<fk table='opportunities' column='id'/> |
| `bookingId` | String | Yes | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `claimId` | String | Yes | - | Note: This is a Foreign Key to `InsuranceClaimAU.id`.<fk table='InsuranceClaimAU' column='id'/> |
| `type` | String | No | - | - |
| `subject` | String | No | - | - |
| `description` | String | Yes | - | - |
| `outcome` | String | Yes | - | - |
| `performedById` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `customerId` | String | Yes | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `contractorId` | String | Yes | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `activityDate` | DateTime | No | CURRENT_TIMESTAMP | - |
| `durationMinutes` | Int | Yes | - | - |
| `attachments` | String[] (array) | Yes | - | - |
| `sentiment` | String | Yes | - | - |
| `sentimentScore` | Float | Yes | - | - |
| `requiresFollowUp` | Boolean | No | false | - |
| `followUpDate` | DateTime | Yes | - | - |
| `followUpTaskId` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `ai_image_enhancement_logs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `photoId` | String | No | - | Note: This is a Foreign Key to `inspection_photos.id`.<fk table='inspection_photos' column='id'/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `prompt` | String | No | - | - |
| `originalDesc` | String | Yes | - | - |
| `enhancedDesc` | String | No | - | - |
| `model` | String | No | - | - |
| `tokensUsed` | Int | No | - | - |
| `costUSD` | Float | No | - | - |
| `processingMs` | Int | No | - | - |
| `success` | Boolean | No | true | - |
| `error` | String | Yes | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `business_rule_violations`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `businessRuleId` | String | No | - | Note: This is a Foreign Key to `business_rules.id`.<fk table='business_rules' column='id'/> |
| `entityType` | String | No | - | - |
| `entityId` | String | No | - | - |
| `actualValue` | Float | No | - | - |
| `expectedValue` | Float | No | - | - |
| `severity` | String | No | - | - |
| `isResolved` | Boolean | No | false | - |
| `resolvedAt` | DateTime | Yes | - | - |
| `resolvedById` | String | Yes | - | - |
| `resolutionNote` | String | Yes | - | - |
| `detectedAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `business_rules`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `name` | String | No | - | - |
| `description` | String | No | - | - |
| `ruleType` | String | No | - | - |
| `metric` | String | No | - | - |
| `threshold` | Float | No | - | - |
| `comparison` | String | No | - | - |
| `actionOnViolation` | String[] (array) | Yes | - | - |
| `ownerId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `isActive` | Boolean | No | true | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `compliance_checks`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `checkName` | String | No | - | - |
| `checkCode` | String | No | - | - |
| `jurisdiction` | String | No | - | - |
| `status` | String | No | - | - |
| `required` | Boolean | No | true | - |
| `evidence` | String | Yes | - | - |
| `referenceSection` | String | Yes | - | - |
| `validatedBy` | String | Yes | - | - |
| `validatedAt` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `connection_logs`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `userType` | String | No | - | - |
| `channelName` | String | No | - | - |
| `connectedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `disconnectedAt` | DateTime | Yes | - | - |
| `lastHeartbeat` | DateTime | No | - | - |
| `reconnects` | Int | No | 0 | - |
| `deviceType` | String | Yes | - | - |
| `browser` | String | Yes | - | - |
| `ipAddress` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |

#### `customer_lifecycle`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `currentStage` | String | No | LEAD | - |
| `previousStage` | String | Yes | - | - |
| `stageChangedAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `totalInteractions` | Int | No | 0 | - |
| `lastInteractionDate` | DateTime | Yes | - | - |
| `daysSinceLastContact` | Int | No | 0 | - |
| `lifetimeValueAUD` | Float | No | 0 | - |
| `averageJobValueAUD` | Float | No | 0 | - |
| `totalJobsCompleted` | Int | No | 0 | - |
| `healthScore` | Int | No | 50 | - |
| `healthScoreReason` | String | Yes | - | - |
| `churnRiskScore` | Int | No | 0 | - |
| `isAtRisk` | Boolean | No | false | - |
| `atRiskReasons` | String[] (array) | Yes | - | - |
| `assignedCSMId` | String | Yes | - | - |
| `nextTouchpointDate` | DateTime | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `equipment_line_items`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `costEstimateId` | String | No | - | Note: This is a Foreign Key to `cost_estimates.id`.<fk table='cost_estimates' column='id'/> |
| `description` | String | No | - | - |
| `equipmentCode` | String | No | - | - |
| `quantity` | Int | No | - | - |
| `rentalDays` | Int | No | - | - |
| `dailyRate` | Float | No | - | - |
| `subtotal` | Float | No | - | - |
| `jurisdiction` | String | No | - | - |
| `rateEffectiveDate` | DateTime | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `labor_line_items`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `costEstimateId` | String | No | - | Note: This is a Foreign Key to `cost_estimates.id`.<fk table='cost_estimates' column='id'/> |
| `description` | String | No | - | - |
| `taskCode` | String | No | - | - |
| `iicrcLevel` | String | No | - | - |
| `hours` | Float | No | - | - |
| `hourlyRate` | Float | No | - | - |
| `subtotal` | Float | No | - | - |
| `jurisdiction` | String | No | - | - |
| `rateEffectiveDate` | DateTime | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `material_line_items`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `costEstimateId` | String | No | - | Note: This is a Foreign Key to `cost_estimates.id`.<fk table='cost_estimates' column='id'/> |
| `description` | String | No | - | - |
| `materialCode` | String | No | - | - |
| `quantity` | Float | No | - | - |
| `unit` | String | No | - | - |
| `unitPrice` | Float | No | - | - |
| `supplierName` | String | Yes | - | - |
| `supplierSKU` | String | Yes | - | - |
| `subtotal` | Float | No | - | - |
| `jurisdiction` | String | No | - | - |
| `priceEffectiveDate` | DateTime | No | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `messages`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `senderId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `receiverId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `requestId` | String | Yes | - | - |
| `subject` | String | Yes | - | - |
| `content` | String | No | - | - |
| `messageType` | String | No | GENERAL | - |
| `isRead` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `notification_preferences`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `soundEnabled` | Boolean | No | true | - |
| `soundType` | String | No | subtle_chime | - |
| `smsEnabled` | Boolean | No | true | - |
| `smsPhone` | String | Yes | - | - |
| `smsOfflineDelay` | Int | No | 120 | - |
| `newJobEnabled` | Boolean | No | true | - |
| `statusUpdateEnabled` | Boolean | No | true | - |
| `urgentJobAlarm` | Boolean | No | true | - |
| `quietHoursEnabled` | Boolean | No | false | - |
| `quietHoursStart` | String | Yes | - | - |
| `quietHoursEnd` | String | Yes | - | - |
| `quietHoursTimezone` | String | No | Australia/Sydney | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `opportunities`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `customerLifecycleId` | String | No | - | Note: This is a Foreign Key to `customer_lifecycle.id`.<fk table='customer_lifecycle' column='id'/> |
| `serviceRequestId` | String | Yes | - | Note: This is a Foreign Key to `service_requests.id`.<fk table='service_requests' column='id'/> |
| `bookingId` | String | Yes | - | Note: This is a Foreign Key to `Booking.id`.<fk table='Booking' column='id'/> |
| `name` | String | No | - | - |
| `stage` | String | No | DISCOVERY | - |
| `estimatedValueAUD` | Float | No | - | - |
| `probabilityPercent` | Int | No | 50 | - |
| `australianServiceType` | String | No | - | - |
| `urgencyLevel` | String | No | - | - |
| `serviceState` | String | No | - | - |
| `servicePostcode` | String | No | - | - |
| `expectedCloseDate` | DateTime | Yes | - | - |
| `actualCloseDate` | DateTime | Yes | - | - |
| `assignedContractorId` | String | Yes | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `closeReason` | String | Yes | - | - |
| `competitorChosen` | String | Yes | - | - |
| `forecastCategory` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `realtime_subscriptions`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `contractorId` | String | No | - | Note: This is a Foreign Key to `Contractor.id`.<fk table='Contractor' column='id'/> |
| `tier` | String | No | - | - |
| `status` | String | No | TRIAL | - |
| `pricePerMonth` | Float | No | - | - |
| `trialEndsAt` | DateTime | Yes | - | - |
| `startDate` | DateTime | No | CURRENT_TIMESTAMP | - |
| `endDate` | DateTime | Yes | - | - |
| `stripeSubscriptionId` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `report_revisions`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `reportId` | String | No | - | Note: This is a Foreign Key to `inspection_reports.id`.<fk table='inspection_reports' column='id'/> |
| `version` | Int | No | - | - |
| `revisionReason` | String | No | - | - |
| `changedBy` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `snapshotData` | Json | No | - | - |
| `pdfUrl` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `service_requests`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `serviceCategory` | String | No | - | - |
| `urgency` | String | No | - | - |
| `serviceTitle` | String | No | - | - |
| `description` | String | No | - | - |
| `location` | String | No | - | - |
| `budget` | String | Yes | - | - |
| `phone` | String | Yes | - | - |
| `preferredTime` | String | Yes | - | - |
| `insurance` | Boolean | No | false | - |
| `urgentResponse` | Boolean | No | false | - |
| `status` | String | No | PENDING | - |
| `leadScore` | Float | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |

#### `user_preferences`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `userId` | String | No | - | Note: This is a Foreign Key to `users.id`.<fk table='users' column='id'/> |
| `interests` | String[] (array) | Yes | - | - |
| `serviceTypes` | String[] (array) | Yes | - | - |
| `budgetRange` | String | Yes | - | - |
| `urgencyLevel` | String | Yes | - | - |
| `communicationStyle` | String | Yes | - | - |
| `notificationSettings` | Json | Yes | - | - |
| `dashboardLayout` | Json | Yes | - | - |
| `themePreferences` | Json | Yes | - | - |
| `isOnboardingComplete` | Boolean | No | false | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |
| `brandingColor` | String | Yes | - | - |
| `selectedTheme` | String | Yes | - | - |

#### `users`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `email` | String | No | - | - |
| `name` | String | Yes | - | - |
| `password` | String | Yes | - | - |
| `userType` | String | No | CLIENT | - |
| `googleId` | String | Yes | - | - |
| `avatar` | String | Yes | - | - |
| `australianPhoneNumber` | String | Yes | - | - |
| `australianPostcode` | String | Yes | - | - |
| `australianState` | String | Yes | - | - |
| `suburb` | String | Yes | - | - |
| `streetAddress` | String | Yes | - | - |
| `isEmailVerified` | Boolean | No | false | - |
| `emailVerificationToken` | String | Yes | - | - |
| `emailVerificationTokenExpiry` | DateTime | Yes | - | - |
| `isActive` | Boolean | No | true | - |
| `isBlocked` | Boolean | No | false | - |
| `lastLoginAt` | DateTime | Yes | - | - |
| `tenantId` | String | Yes | - | Note: This is a Foreign Key to `tenants.id`.<fk table='tenants' column='id'/> |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

#### `waitlist_submissions`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | String | No | - | Note: This is a Primary Key.<pk/> |
| `email` | String | No | - | - |
| `fullName` | String | No | - | - |
| `userType` | String | No | - | - |
| `source` | String | Yes | - | - |
| `utmSource` | String | Yes | - | - |
| `utmMedium` | String | Yes | - | - |
| `utmCampaign` | String | Yes | - | - |
| `utmContent` | String | Yes | - | - |
| `utmTerm` | String | Yes | - | - |
| `consentEmail` | Boolean | No | false | - |
| `emailSent` | Boolean | No | false | - |
| `notifiedLaunch` | Boolean | No | false | - |
| `convertedUser` | String | Yes | - | - |
| `createdAt` | DateTime | No | CURRENT_TIMESTAMP | - |
| `updatedAt` | DateTime | No | - | - |

---

## Quick Reference: Suggested Prisma Model Names and @@map() Directives

Below is a suggested mapping from snake_case Supabase table names to PascalCase Prisma model names.

| Supabase Table | Suggested Prisma Model | @@map() Directive |
|---|---|---|
| `Booking` | `Booking` | Not needed (already PascalCase) |
| `ContractorServiceArea` | `ContractorServiceArea` | Not needed (already PascalCase) |
| `ContractorVerificationHistory` | `ContractorVerificationHistory` | Not needed (already PascalCase) |
| `DisasterAlert` | `DisasterAlert` | Not needed (already PascalCase) |
| `IICRCCertification` | `IICRCCertification` | Not needed (already PascalCase) |
| `InsuranceClaimAU` | `InsuranceClaimAU` | Not needed (already PascalCase) |
| `InsuranceProvider` | `InsuranceProvider` | Not needed (already PascalCase) |
| `InvoiceAU` | `InvoiceAU` | Not needed (already PascalCase) |
| `LoginAttempt` | `LoginAttempt` | Not needed (already PascalCase) |
| `Payment` | `Payment` | Not needed (already PascalCase) |
| `Rating` | `Rating` | Not needed (already PascalCase) |
| `RiskAssessment` | `RiskAssessment` | Not needed (already PascalCase) |
| `VerificationToken` | `VerificationToken` | Not needed (already PascalCase) |
| `activities` | `Activities` | `@@map("activities")` |
| `admin_service_categories` | `AdminServiceCategories` | `@@map("admin_service_categories")` |
| `admin_services` | `AdminServices` | `@@map("admin_services")` |
| `admin_themes` | `AdminThemes` | `@@map("admin_themes")` |
| `ai_batch_processing_jobs` | `AiBatchProcessingJobs` | `@@map("ai_batch_processing_jobs")` |
| `ai_image_enhancement_logs` | `AiImageEnhancementLogs` | `@@map("ai_image_enhancement_logs")` |
| `background_jobs` | `BackgroundJobs` | `@@map("background_jobs")` |
| `backlinks` | `Backlinks` | `@@map("backlinks")` |
| `beta_enrollments` | `BetaEnrollments` | `@@map("beta_enrollments")` |
| `beta_feedback` | `BetaFeedback` | `@@map("beta_feedback")` |
| `beta_nps_surveys` | `BetaNpsSurveys` | `@@map("beta_nps_surveys")` |
| `beta_programs` | `BetaPrograms` | `@@map("beta_programs")` |
| `blog_faqs` | `BlogFaqs` | `@@map("blog_faqs")` |
| `blog_posts` | `BlogPosts` | `@@map("blog_posts")` |
| `business_rule_violations` | `BusinessRuleViolations` | `@@map("business_rule_violations")` |
| `business_rules` | `BusinessRules` | `@@map("business_rules")` |
| `case_studies` | `CaseStudies` | `@@map("case_studies")` |
| `client_emergency_contacts` | `ClientEmergencyContacts` | `@@map("client_emergency_contacts")` |
| `client_insurance` | `ClientInsurance` | `@@map("client_insurance")` |
| `client_module_progress` | `ClientModuleProgress` | `@@map("client_module_progress")` |
| `client_onboarding` | `ClientOnboarding` | `@@map("client_onboarding")` |
| `client_payments` | `ClientPayments` | `@@map("client_payments")` |
| `client_profiles` | `ClientProfiles` | `@@map("client_profiles")` |
| `client_properties` | `ClientProperties` | `@@map("client_properties")` |
| `competitor_analyses` | `CompetitorAnalyses` | `@@map("competitor_analyses")` |
| `competitor_keywords` | `CompetitorKeywords` | `@@map("competitor_keywords")` |
| `competitors` | `Competitors` | `@@map("competitors")` |
| `compliance_checks` | `ComplianceChecks` | `@@map("compliance_checks")` |
| `connection_logs` | `ConnectionLogs` | `@@map("connection_logs")` |
| `contractor_applications` | `ContractorApplications` | `@@map("contractor_applications")` |
| `contractor_assessments` | `ContractorAssessments` | `@@map("contractor_assessments")` |
| `contractor_certifications` | `ContractorCertifications` | `@@map("contractor_certifications")` |
| `contractor_location_history` | `ContractorLocationHistory` | `@@map("contractor_location_history")` |
| `contractor_matches` | `ContractorMatches` | `@@map("contractor_matches")` |
| `contractor_module_progress` | `ContractorModuleProgress` | `@@map("contractor_module_progress")` |
| `contractor_onboarding` | `ContractorOnboarding` | `@@map("contractor_onboarding")` |
| `contractor_preferences` | `ContractorPreferences` | `@@map("contractor_preferences")` |
| `contractor_profiles` | `ContractorProfiles` | `@@map("contractor_profiles")` |
| `contractor_rotation` | `ContractorRotation` | `@@map("contractor_rotation")` |
| `cost_estimates` | `CostEstimates` | `@@map("cost_estimates")` |
| `customer_lifecycle` | `CustomerLifecycle` | `@@map("customer_lifecycle")` |
| `damage_areas` | `DamageAreas` | `@@map("damage_areas")` |
| `equipment_line_items` | `EquipmentLineItems` | `@@map("equipment_line_items")` |
| `faqs` | `Faqs` | `@@map("faqs")` |
| `inspection_photos` | `InspectionPhotos` | `@@map("inspection_photos")` |
| `inspection_reports` | `InspectionReports` | `@@map("inspection_reports")` |
| `job_messages` | `JobMessages` | `@@map("job_messages")` |
| `keyword_opportunities` | `KeywordOpportunities` | `@@map("keyword_opportunities")` |
| `labor_line_items` | `LaborLineItems` | `@@map("labor_line_items")` |
| `material_line_items` | `MaterialLineItems` | `@@map("material_line_items")` |
| `messages` | `Messages` | `@@map("messages")` |
| `moisture_readings` | `MoistureReadings` | `@@map("moisture_readings")` |
| `notification_preferences` | `NotificationPreferences` | `@@map("notification_preferences")` |
| `nrpg_certification_points` | `NrpgCertificationPoints` | `@@map("nrpg_certification_points")` |
| `nrpg_commitments` | `NrpgCommitments` | `@@map("nrpg_commitments")` |
| `nrpg_onboarding_phases` | `NrpgOnboardingPhases` | `@@map("nrpg_onboarding_phases")` |
| `nrpg_training_progress` | `NrpgTrainingProgress` | `@@map("nrpg_training_progress")` |
| `opportunities` | `Opportunities` | `@@map("opportunities")` |
| `public_claims` | `PublicClaims` | `@@map("public_claims")` |
| `realtime_subscriptions` | `RealtimeSubscriptions` | `@@map("realtime_subscriptions")` |
| `report_revisions` | `ReportRevisions` | `@@map("report_revisions")` |
| `service_request_callout_payments` | `ServiceRequestCalloutPayments` | `@@map("service_request_callout_payments")` |
| `service_requests` | `ServiceRequests` | `@@map("service_requests")` |
| `swot_analyses` | `SwotAnalyses` | `@@map("swot_analyses")` |
| `tasks` | `Tasks` | `@@map("tasks")` |
| `tenant_configurations` | `TenantConfigurations` | `@@map("tenant_configurations")` |
| `tenants` | `Tenants` | `@@map("tenants")` |
| `triage_assessments` | `TriageAssessments` | `@@map("triage_assessments")` |
| `user_preferences` | `UserPreferences` | `@@map("user_preferences")` |
| `users` | `Users` | `@@map("users")` |
| `waitlist_submissions` | `WaitlistSubmissions` | `@@map("waitlist_submissions")` |
| `workspace_audit_logs` | `WorkspaceAuditLogs` | `@@map("workspace_audit_logs")` |
| `workspace_members` | `WorkspaceMembers` | `@@map("workspace_members")` |
| `workspaces` | `Workspaces` | `@@map("workspaces")` |
