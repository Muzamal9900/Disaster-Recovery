const fs = require('fs');
const path = require('path');

// Load credentials from .env.production
const envPath2 = path.join(__dirname, '..', '.env.production');
const envContent = fs.readFileSync(envPath2, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '');
}

async function main() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.production'); process.exit(1); }

  // Read the SQL file
  const sql = fs.readFileSync(path.join(__dirname, 'migration-reddit-orchestrator.sql'), 'utf-8');

  // Split into individual statements (split on semicolons followed by newlines, but not inside $$ blocks)
  // For safety, let's try the pg_query endpoint
  const res = await fetch(`${url}/pg/query`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  console.log('pg/query status:', res.status);
  if (res.ok) {
    const data = await res.json();
    console.log('Result:', JSON.stringify(data).substring(0, 500));
  } else {
    const text = await res.text();
    console.log('Error:', text.substring(0, 500));

    // Try alternative endpoint
    console.log('\nTrying /sql endpoint...');
    const res2 = await fetch(`${url}/sql`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    });
    console.log('/sql status:', res2.status);
    const text2 = await res2.text();
    console.log('/sql result:', text2.substring(0, 500));
  }
}

main().catch(e => console.error('Fatal:', e.message));
