# Google Indexing API Integration

**Date:** 2026-02-23
**Status:** Approved

## Purpose

A standalone Node.js script that submits URLs to Google's Indexing API for faster crawl/indexing after deploys. Callable by Claude Code or manually via npm script.

## Usage

```bash
# Submit specific URLs
node scripts/google-indexing.js https://disasterrecovery.com.au/operational-excellence

# Submit all URLs from live sitemap
node scripts/google-indexing.js --sitemap

# npm shorthand
npm run index-urls -- https://disasterrecovery.com.au/operational-excellence
npm run index-urls -- --sitemap
```

## Authentication

- Google Cloud service account with Indexing API enabled
- JSON key file path stored as `GOOGLE_INDEXING_KEY_PATH` env var
- Service account email added as Owner in Google Search Console

## Dependencies

- `googleapis` (Google official Node.js client)

## Files

| File | Action |
|------|--------|
| `scripts/google-indexing.js` | New |
| `package.json` | Modified (add `index-urls` script) |
| `.env.example` | Modified (add `GOOGLE_INDEXING_KEY_PATH`) |

## Behaviour

1. Load service account credentials from `GOOGLE_INDEXING_KEY_PATH`
2. Parse CLI args: explicit URLs or `--sitemap` flag
3. For `--sitemap`: fetch `https://disasterrecovery.com.au/sitemap.xml`, extract `<loc>` URLs
4. For each URL, call `indexing.urlNotifications.publish` with type `URL_UPDATED`
5. Log success/failure per URL
6. Exit code 0 on all success, 1 on any failure
7. Warn if batch exceeds Google's 200 requests/day quota

## One-time Google Cloud Setup

1. Google Cloud Console: create/select project
2. Enable Indexing API (`indexing.googleapis.com`)
3. Create Service Account, download JSON key
4. Google Search Console: add service account email as Owner
5. Set `GOOGLE_INDEXING_KEY_PATH=/path/to/key.json` in `.env.local`
