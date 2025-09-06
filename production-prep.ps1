# Production Preparation Script
# Generated: 2025-09-07

param(
    [switch]$DryRun = $false,
    [switch]$Force = $false,
    [string]$Domain = "https://disaster-recovery-seven.vercel.app"
)

# Override DryRun if Force is specified
if ($Force) {
    $DryRun = $false
}

$ErrorActionPreference = 'Stop'

function Invoke-Step { 
    param([string]$Label,[ScriptBlock]$Action) 
    Write-Host "[STEP] $Label" -ForegroundColor Cyan
    & $Action 
}

function Write-File { 
    param([string]$Path,[string]$Content,[switch]$NoNewLine=$false) 
    $dir = Split-Path -Parent $Path
    if ($dir -and -not (Test-Path $dir)) { 
        New-Item -ItemType Directory -Force -Path $dir | Out-Null 
    }
    if ($DryRun) { 
        Write-Host "DRY-RUN: write -> $Path" -ForegroundColor Yellow
    } else { 
        if ($NoNewLine) { 
            Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8 -NoNewline 
        } else { 
            Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8 
        } 
    } 
}

$STAMP = Get-Date -Format 'yyyyMMdd-HHmmss'

Write-Host "========================================" -ForegroundColor Magenta
Write-Host " Production Preparation Script" -ForegroundColor Magenta
Write-Host " Mode: $(if($DryRun) {'DRY RUN'} else {'LIVE EXECUTION'})" -ForegroundColor $(if($DryRun) {'Yellow'} else {'Green'})
Write-Host " Domain: $Domain" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta

# 0) Sanity checks
Invoke-Step 'Preflight: Node & npm present' { 
    node -v
    npm -v 
}

Invoke-Step 'Preflight: Git status' { 
    try { 
        git status -s 
    } catch { 
        Write-Host 'Git not available (ok for zip-only bundle)' -ForegroundColor Yellow 
    } 
}

# 1) Ensure required folders exist
Invoke-Step 'Ensure required folders' { 
    if (-not (Test-Path 'public')) { 
        if ($DryRun) { 
            Write-Host 'DRY-RUN: mkdir public' -ForegroundColor Yellow
        } else { 
            New-Item -ItemType Directory public | Out-Null 
        } 
    }
    if (-not (Test-Path 'SITE_DOCUMENTS')) { 
        if ($DryRun) { 
            Write-Host 'DRY-RUN: mkdir SITE_DOCUMENTS' -ForegroundColor Yellow
        } else { 
            New-Item -ItemType Directory SITE_DOCUMENTS | Out-Null 
        } 
    } 
}

# 2) Robots.txt (disallow CRM/admin/api; point to sitemap)
Invoke-Step 'Generate robots.txt' {
    $disallows = @('/crm','/admin','/api','/_archive')
    $robotsContent = @"
User-agent: *
$($disallows | ForEach-Object { "Disallow: $_" } | Out-String)Allow: /
Sitemap: $Domain/sitemap.xml

# AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /
"@
    Write-File -Path 'public/robots.txt' -Content $robotsContent
}

# 3) Build prep: minimal 404 & 500 (if missing)
Invoke-Step 'Ensure basic public error pages (fallbacks)' {
    if (-not (Test-Path 'public/404.html')) { 
        Write-File 'public/404.html' '<!doctype html><meta charset="utf-8"><title>Not Found</title><h1>404 - Not Found</h1><p>Sorry, we could not find that page.</p>' 
    }
    if (-not (Test-Path 'public/500.html')) { 
        Write-File 'public/500.html' '<!doctype html><meta charset="utf-8"><title>Error</title><h1>500 - Server Error</h1><p>Please try again later.</p>' 
    }
}

# 4) Env file scaffolding (non-secret example)
Invoke-Step 'Ensure .env.production.example exists' {
    if (-not (Test-Path '.env.production.example')) {
        $envExample = @"
# Production env example (copy to .env.production and fill real secrets)
NEXT_PUBLIC_SITE_URL=$Domain
NEXT_PUBLIC_APP_URL=$Domain
NEXTAUTH_URL=$Domain
# DATABASE_URL=
# NEXTAUTH_SECRET=
# SENTRY_DSN=
# MAINTENANCE_MODE=false
"@
        Write-File '.env.production.example' $envExample
    }
}

# 5) Generate sitemap.xml for existing pages
Invoke-Step 'Generate sitemap.xml from app directory' {
    $routes = @('/')
    $appDir = 'app'
    
    if (Test-Path $appDir) {
        # Get all page.tsx files
        $pages = Get-ChildItem -Path $appDir -Recurse -Filter 'page.tsx' -ErrorAction SilentlyContinue
        
        foreach ($p in $pages) {
            $dir = Split-Path -Parent $p.FullName
            $rel = ($dir.Substring((Resolve-Path $appDir).Path.Length)).Replace('\', '/')
            
            # Skip dynamic routes, API routes, CRM, admin
            if ($rel -notmatch '\[' -and $rel -notmatch '\(' -and 
                $rel -notmatch '/api' -and $rel -notmatch '/crm' -and 
                $rel -notmatch '/admin' -and $rel -notmatch '/_') {
                
                $urlPath = if ($rel -eq '') { '/' } else { $rel }
                if ($routes -notcontains $urlPath) { 
                    $routes += $urlPath 
                }
            }
        }
    }
    
    $lastmod = (Get-Date).ToString('yyyy-MM-dd')
    $xmlContent = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$($routes | ForEach-Object { "  <url><loc>$Domain$_</loc><lastmod>$lastmod</lastmod><priority>$(if($_ -eq '/') {'1.0'} elseif($_ -match '^/services') {'0.9'} elseif($_ -match '^/locations') {'0.8'} else {'0.7'})</priority></url>" } | Out-String)</urlset>
"@
    
    Write-File 'public/sitemap.xml' $xmlContent
    Write-Host "  Found $($routes.Count) routes for sitemap" -ForegroundColor Gray
}

# 6) Health check endpoint
Invoke-Step 'Write /public/healthz.txt' { 
    Write-File 'public/healthz.txt' "ok $STAMP" 
}

# 7) Security headers sample
Invoke-Step 'Emit security headers sample' {
    $headers = @'
# --- Suggested Reverse Proxy Headers for disaster-recovery-seven.vercel.app ---
# For Nginx:
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" always;

# For Apache (.htaccess):
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set Referrer-Policy "no-referrer-when-downgrade"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(self)"
'@
    Write-File 'SITE_DOCUMENTS/security-headers.conf' $headers
}

# 8) Summary
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host " Summary" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

if ($DryRun) {
    Write-Host "`nThis was a DRY RUN. Files were not actually created/modified." -ForegroundColor Yellow
    Write-Host "To execute the preparation, run:" -ForegroundColor Yellow
    Write-Host "  .\production-prep.ps1 -DryRun:`$false" -ForegroundColor Cyan
} else {
    Write-Host "`nProduction preparation completed!" -ForegroundColor Green
    Write-Host "Created/Updated:" -ForegroundColor Cyan
    Write-Host "  - public/robots.txt (SEO directives)" -ForegroundColor Gray
    Write-Host "  - public/sitemap.xml (all static routes)" -ForegroundColor Gray
    Write-Host "  - public/healthz.txt (health check endpoint)" -ForegroundColor Gray
    Write-Host "  - public/404.html & 500.html (error pages)" -ForegroundColor Gray
    Write-Host "  - .env.production.example (environment template)" -ForegroundColor Gray
    Write-Host "  - SITE_DOCUMENTS/security-headers.conf (security headers)" -ForegroundColor Gray
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Run 'npm run build:mvp' to create production build" -ForegroundColor Gray
    Write-Host "  2. Deploy to Vercel or your hosting platform" -ForegroundColor Gray
}

Write-Host "`nDomain configured: $Domain" -ForegroundColor Cyan