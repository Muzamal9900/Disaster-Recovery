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
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '').replace(/\\n$/, '');
  env[key] = val;
}

async function main() {
  const url = 'https://lccqasmurmsisnnjqqmr.supabase.co';
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  // Fetch the OpenAPI/Swagger spec — lists all tables exposed via PostgREST
  const res = await fetch(`${url}/rest/v1/`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
  });
  const spec = await res.json();
  const tables = Object.keys(spec.paths || {}).filter(p => p !== '/').map(p => p.replace('/', ''));
  console.log('Tables found in schema:', tables.length);
  console.log('Tables:', tables.join(', '));
}

main().catch(e => console.error('Fatal:', e.message));
