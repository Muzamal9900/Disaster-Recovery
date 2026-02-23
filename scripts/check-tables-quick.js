const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.production');
const envContent = fs.readFileSync(envPath, 'utf-8');
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

  const res = await fetch(url + '/rest/v1/', {
    headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
  });
  const spec = await res.json();
  const paths = Object.keys(spec.paths || {});
  const tables = paths.filter(p => p !== '/').map(p => p.replace('/', ''));

  console.log('Total tables:', tables.length);

  // Check for Reddit tables
  const redditTables = tables.filter(t => t.toLowerCase().includes('reddit'));
  console.log('Reddit tables:', redditTables.length > 0 ? redditTables.join(', ') : 'NONE');

  // Try to query using RPC to run SQL via PostgREST
  const sqlRes = await fetch(url + '/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: 'SELECT 1 as test' }),
  });
  console.log('RPC exec_sql status:', sqlRes.status);
  if (sqlRes.ok) {
    console.log('RPC result:', await sqlRes.text());
  } else {
    console.log('RPC error:', (await sqlRes.text()).substring(0, 200));
  }
}

main().catch(e => console.error(e));
