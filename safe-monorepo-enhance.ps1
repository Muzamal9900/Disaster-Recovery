# Safe Monorepo Enhancement Script
# This creates the monorepo structure alongside existing app without disruption
# Generated: 2025-09-07

param(
    [switch]$DryRun = $false,
    [switch]$Force = $false
)

# Override DryRun if Force is specified
if ($Force) {
    $DryRun = $false
}

$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string]$Message)
    Write-Host "`n[STEP] $Message" -ForegroundColor Cyan
}

function Write-Action {
    param([string]$Action)
    if ($DryRun) {
        Write-Host "  DRY-RUN: $Action" -ForegroundColor Yellow
    } else {
        Write-Host "  EXECUTING: $Action" -ForegroundColor Green
    }
}

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        Write-Action "Creating directory: $Path"
        if (-not $DryRun) {
            New-Item -ItemType Directory -Force -Path $Path | Out-Null
        }
    }
}

function Write-FileContent {
    param([string]$Path, [string]$Content)
    Write-Action "Writing file: $Path"
    if (-not $DryRun) {
        $dir = Split-Path -Parent $Path
        if ($dir -and -not (Test-Path $dir)) {
            New-Item -ItemType Directory -Force -Path $dir | Out-Null
        }
        Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8
    }
}

Write-Host "========================================" -ForegroundColor Magenta
Write-Host " Safe Monorepo Enhancement Script" -ForegroundColor Magenta
Write-Host " Mode: $(if($DryRun) {'DRY RUN'} else {'LIVE EXECUTION'})" -ForegroundColor $(if($DryRun) {'Yellow'} else {'Green'})
Write-Host "========================================" -ForegroundColor Magenta

# Step 1: Create future monorepo structure (without moving existing files)
Write-Step "Creating future monorepo structure"
Ensure-Directory "apps"
Ensure-Directory "apps/website"
Ensure-Directory "apps/crm"
Ensure-Directory "apps/contractor"
Ensure-Directory "packages"
Ensure-Directory "packages/ui/src"
Ensure-Directory "packages/tailwind-config"
Ensure-Directory "packages/eslint-config"
Ensure-Directory "packages/tsconfig"
Ensure-Directory "packages/auth"

# Step 2: Create README for future migration
Write-Step "Creating migration documentation"
$migrationDoc = @"
# Monorepo Migration Plan

## Current Structure
The application currently runs as a single Next.js app in the root directory.

## Future Structure
- **apps/website** - Public-facing disaster recovery website (current root app)
- **apps/crm** - Internal CRM for staff (future)
- **apps/contractor** - Contractor portal (future)
- **packages/ui** - Shared UI components
- **packages/tailwind-config** - Shared design tokens
- **packages/eslint-config** - Shared linting rules
- **packages/tsconfig** - Shared TypeScript config
- **packages/auth** - Shared authentication

## Migration Steps (Future)
1. Copy current app to apps/website
2. Update imports and paths
3. Configure Turbo for monorepo builds
4. Deploy apps to subdomains:
   - website: www.disasterrecovery.com.au
   - crm: crm.disasterrecovery.com.au
   - contractor: contractors.disasterrecovery.com.au

## Benefits
- Code sharing between apps
- Consistent design system
- Single source of truth for auth
- Parallel development
- Independent deployments
"@
Write-FileContent "apps/MIGRATION_PLAN.md" $migrationDoc

# Step 3: Create shared UI package structure
Write-Step "Setting up shared UI package"
$uiPackageJson = @"
{
  "name": "@disaster-recovery/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./primitives": "./src/primitives.tsx",
    "./layout": "./src/layout.tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.4.0"
  }
}
"@
Write-FileContent "packages/ui/package.json" $uiPackageJson

# Step 4: Create shared Tailwind config
Write-Step "Setting up shared Tailwind configuration"
$tailwindPreset = @"
// Shared design tokens for Disaster Recovery brand
const preset = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0D3B66',
          light: '#2D5B86',
          dark: '#082640'
        },
        accent: {
          DEFAULT: '#F4D35E',
          dark: '#C9A93C'
        },
        emergency: {
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        18: '4.5rem',
        88: '22rem'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.08)',
        hover: '0 8px 20px rgba(0,0,0,0.12)'
      }
    }
  }
};

module.exports = preset;
"@
Write-FileContent "packages/tailwind-config/preset.js" $tailwindPreset
Write-FileContent "packages/tailwind-config/package.json" '{"name":"@disaster-recovery/tailwind-config","version":"0.1.0","main":"preset.js"}'

# Step 5: Create placeholder apps
Write-Step "Creating placeholder CRM app"
$crmPage = @"
# CRM Application

This will be the internal CRM for Disaster Recovery staff.

## Features (Planned)
- Lead management
- Case tracking
- SLA monitoring
- Contractor assignment
- Reporting dashboard

## Status
Placeholder - to be developed after MVP launch
"@
Write-FileContent "apps/crm/README.md" $crmPage

Write-Step "Creating placeholder Contractor app"
$contractorPage = @"
# Contractor Portal

This will be the contractor portal for Disaster Recovery partners.

## Features (Planned)
- Job assignments
- Compliance tracking
- Document upload
- Payment tracking
- Performance metrics

## Status
Placeholder - to be developed after MVP launch
"@
Write-FileContent "apps/contractor/README.md" $contractorPage

# Step 6: Create future turbo.json (not active yet)
Write-Step "Creating future Turbo configuration"
$turboConfig = @"
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
"@
Write-FileContent "turbo.future.json" $turboConfig

# Step 7: Create workspace documentation
Write-Step "Creating workspace documentation"
$workspaceDoc = '# Future Workspace Configuration

When ready to migrate to monorepo, add to package.json:

{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}

Then install Turbo:
npm install -D turbo

Update scripts in root package.json:
{
  "scripts": {
    "dev": "turbo dev",
    "dev:website": "turbo dev --filter=website",
    "dev:crm": "turbo dev --filter=crm",
    "dev:contractor": "turbo dev --filter=contractor",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check"
  }
}'
Write-FileContent "WORKSPACE_SETUP.md" $workspaceDoc

# Summary
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host " Summary" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

if ($DryRun) {
    Write-Host "`nThis was a DRY RUN. No files were actually created." -ForegroundColor Yellow
    Write-Host "To execute the enhancement, run:" -ForegroundColor Yellow
    Write-Host "  .\safe-monorepo-enhance.ps1 -DryRun:`$false" -ForegroundColor Cyan
} else {
    Write-Host "`nMonorepo structure enhancement completed!" -ForegroundColor Green
    Write-Host "`nCreated:" -ForegroundColor Cyan
    Write-Host "  - apps/ directory structure for future apps" -ForegroundColor Gray
    Write-Host "  - packages/ for shared code" -ForegroundColor Gray
    Write-Host "  - Migration documentation" -ForegroundColor Gray
    Write-Host "  - Shared design tokens and configs" -ForegroundColor Gray
    Write-Host "`nNo existing files were moved or modified." -ForegroundColor Green
    Write-Host "The current build remains completely intact." -ForegroundColor Green
    Write-Host "`nWhen ready to migrate, follow MIGRATION_PLAN.md" -ForegroundColor Cyan
}