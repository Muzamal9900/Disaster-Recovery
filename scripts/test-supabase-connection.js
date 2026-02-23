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

const { createClient } = require('@supabase/supabase-js');
const url = env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) { console.error('NEXT_PUBLIC_SUPABASE_URL not set in .env.production'); process.exit(1); }
const key = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', url);
console.log('Key exists:', !!key);

const supabase = createClient(url, key);

async function main() {
  // Test basic query
  const { data, error } = await supabase.from('Agency').select('id').limit(1);
  if (error) {
    console.log('DB Error:', error.message, error.code);
  } else {
    console.log('DB reachable! Agency rows:', data.length);
  }

  // Try running DDL via rpc
  const { data: d2, error: e2 } = await supabase.rpc('exec_sql', {
    query: 'SELECT 1 as test'
  }).single();
  if (e2) {
    console.log('RPC not available (expected):', e2.message);
  } else {
    console.log('RPC result:', d2);
  }
}

main().catch(e => console.error('Fatal:', e.message));
