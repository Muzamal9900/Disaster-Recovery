const fs = require('fs');
const path = require('path');

// Load .env.production
const envPath = path.join(__dirname, '..', '.env.production');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '').replace(/\\n$/, '');
  env[key] = val;
}

async function main() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) { console.error('NEXT_PUBLIC_SUPABASE_URL not set in .env.production'); process.exit(1); }
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  // Use PostgREST to query information_schema
  const res = await fetch(`${url}/rest/v1/rpc/`, {
    method: 'GET',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
  });
  console.log('RPC endpoint status:', res.status);

  // Try querying via the Supabase pg endpoint
  const pgRes = await fetch(`${url}/rest/v1/`, {
    method: 'GET',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
  });
  const pgText = await pgRes.text();
  console.log('REST root status:', pgRes.status);
  console.log('REST root (first 500 chars):', pgText.substring(0, 500));
}

main().catch(e => console.error('Fatal:', e.message));
