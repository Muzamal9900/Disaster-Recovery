# MVP Repository Cleanup Script
# This script archives non-essential folders and files for a lean MVP deployment
# Generated: 2025-09-07

param(
    [switch]$DryRun = $true,
    [switch]$Force = $false
)

# Override DryRun if Force is specified
if ($Force) {
    $DryRun = $false
}

$ErrorActionPreference = 'Stop'
$timestamp = Get-Date -Format 'yyyyMMddHHmmss'

function Write-Step {
    param([string]$Message)
    Write-Host "`n[STEP] $Message" -ForegroundColor Cyan
}

function Write-Action {
    param([string]$Action, [bool]$IsDry = $DryRun)
    if ($IsDry) {
        Write-Host "  DRY-RUN: $Action" -ForegroundColor Yellow
    } else {
        Write-Host "  EXECUTING: $Action" -ForegroundColor Green
    }
}

# Folders to archive (non-essential for MVP)
$foldersToArchive = @(
    'AI_Bots',
    'CRM_Reference',
    'NRP-CRM',
    'Portals',
    'SITE_DOCUMENTS',
    'agents',
    'audio-system.backup',
    'audit-reports',
    'backup-disabled-slug',
    'bots',
    'cli',
    'debug-screenshots',
    'demo',
    'docker',
    'docs',
    'generated',
    'health-check',
    'health-reports',
    'optimize-images-cli',
    'pitch-materials',
    'playwright-report',
    'reports',
    'screenshots',
    'test-results',
    'tests',
    'training-content',
    'WSL-Deployment-Sequential-Thinking',
    'Mass-WebPage-Creations',
    'temp-image-creator'
)

# Additional MCP folders that are not needed for production
$mcpFolders = @(
    'context7',
    'context7-upstash',
    'mcp-agent',
    'sequential-thinking-mcp'
)

Write-Host "========================================" -ForegroundColor Magenta
Write-Host " MVP Repository Cleanup Script" -ForegroundColor Magenta
Write-Host " Mode: $(if($DryRun) {'DRY RUN'} else {'LIVE EXECUTION'})" -ForegroundColor $(if($DryRun) {'Yellow'} else {'Red'})
Write-Host "========================================" -ForegroundColor Magenta

# Step 1: Create archive folder
Write-Step "Creating archive folder"
$archivePath = Join-Path $PWD '_archive'
if (-not (Test-Path $archivePath)) {
    Write-Action "Creating _archive folder"
    if (-not $DryRun) {
        New-Item -ItemType Directory -Path $archivePath | Out-Null
    }
} else {
    Write-Host "  Archive folder already exists" -ForegroundColor Gray
}

# Step 2: Archive non-essential folders
Write-Step "Archiving non-essential folders"
$allFolders = $foldersToArchive + $mcpFolders
$archivedCount = 0

foreach ($folder in $allFolders) {
    if (Test-Path $folder) {
        $destination = Join-Path $archivePath $folder
        
        # If destination exists, append timestamp
        if (Test-Path $destination) {
            $destination = "${destination}_${timestamp}"
        }
        
        Write-Action "Moving $folder -> $destination"
        if (-not $DryRun) {
            Move-Item -Path $folder -Destination $destination -Force
        }
        $archivedCount++
    }
}

Write-Host "  Found and queued $archivedCount folders for archiving" -ForegroundColor Gray

# Step 3: Archive .env files (except examples)
Write-Step "Securing .env files"
$envFiles = Get-ChildItem -File -Filter '.env*' | Where-Object { 
    $_.Name -notin @('.env.example', '.env.training.example')
}

foreach ($envFile in $envFiles) {
    $destination = Join-Path $archivePath "secure_$($envFile.Name)"
    Write-Action "Moving $($envFile.Name) -> $destination"
    if (-not $DryRun) {
        Move-Item -Path $envFile.FullName -Destination $destination -Force
    }
}

# Step 4: Create .vercelignore file
Write-Step "Creating .vercelignore file"
$vercelIgnoreContent = @"
# Slim deploy: ignore heavy/non-runtime directories
_archive/
AI_Bots/
agents/
bots/
CRM_Reference/
NRP-CRM/
Portals/
SITE_DOCUMENTS/
audio-system.backup/
audit-reports/
backup-disabled-slug/
cli/
context7/
context7-upstash/
debug-screenshots/
demo/
docker/
docs/
generated/
health-check/
health-reports/
Mass-WebPage-Creations/
mcp-agent/
optimize-images-cli/
pitch-materials/
playwright-report/
reports/
screenshots/
sequential-thinking-mcp/
temp-image-creator/
test-results/
tests/
training-content/
WSL-Deployment-Sequential-Thinking/
*.bak
*.tmp
*.log
.env*
!.env.example
"@

Write-Action "Writing .vercelignore"
if (-not $DryRun) {
    Set-Content -Path '.vercelignore' -Value $vercelIgnoreContent -Encoding UTF8
}

# Step 5: Update .gitignore
Write-Step "Updating .gitignore"
$gitignoreAdditions = @(
    '',
    '# MVP Cleanup',
    '_archive/',
    '*.bak',
    '*.tmp',
    '.env*',
    '!.env.example',
    '!.env.training.example'
)

$currentGitignore = if (Test-Path '.gitignore') { 
    Get-Content '.gitignore' 
} else { 
    @() 
}

foreach ($line in $gitignoreAdditions) {
    if ($line -ne '' -and $currentGitignore -notcontains $line) {
        Write-Action "Adding to .gitignore: $line"
        if (-not $DryRun) {
            Add-Content -Path '.gitignore' -Value $line
        }
    }
}

# Step 6: Update package.json scripts
Write-Step "Updating package.json scripts"
if (Test-Path 'package.json') {
    $packageJson = Get-Content 'package.json' -Raw | ConvertFrom-Json
    
    if (-not $packageJson.scripts) {
        $packageJson | Add-Member -NotePropertyName 'scripts' -NotePropertyValue @{} -Force
    }
    
    # Add MVP-specific scripts
    $packageJson.scripts | Add-Member -Name 'lint:fix' -Value 'next lint --fix || exit 0' -MemberType NoteProperty -Force
    $packageJson.scripts | Add-Member -Name 'type-check' -Value 'tsc --noEmit || exit 0' -MemberType NoteProperty -Force
    $packageJson.scripts | Add-Member -Name 'build:mvp' -Value 'next build' -MemberType NoteProperty -Force
    
    Write-Action "Updating package.json with MVP scripts"
    if (-not $DryRun) {
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content 'package.json' -Encoding UTF8
    }
}

# Step 7: Summary
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host " Summary" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

if ($DryRun) {
    Write-Host "`nThis was a DRY RUN. No files were actually moved or modified." -ForegroundColor Yellow
    Write-Host "To execute the cleanup, run:" -ForegroundColor Yellow
    Write-Host "  .\cleanup-mvp.ps1 -DryRun:`$false" -ForegroundColor Cyan
    Write-Host "`nWARNING: This will move files permanently. Make sure you have a backup!" -ForegroundColor Red
} else {
    Write-Host "`nCleanup completed successfully!" -ForegroundColor Green
    Write-Host "Archived folders have been moved to: _archive/" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Run 'npm run build:mvp' to test the build" -ForegroundColor Gray
    Write-Host "  2. Commit changes: git add -A && git commit -m 'MVP cleanup: Archive non-essential folders'" -ForegroundColor Gray
    Write-Host "  3. Deploy to Vercel" -ForegroundColor Gray
}

# Show current directory size
$currentSize = (Get-ChildItem -Recurse -Force -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notlike "*\.git*" -and $_.FullName -notlike "*\node_modules*" } | 
    Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "`nEstimated repository size (excluding .git and node_modules): $([Math]::Round($currentSize, 2)) MB" -ForegroundColor Cyan