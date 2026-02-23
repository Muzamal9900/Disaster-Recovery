async function main() {
  const url = 'https://lccqasmurmsisnnjqqmr.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY3Fhc211cm1zaXNubmpxcW1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDEwNjYwNCwiZXhwIjoyMDg1NDY2NjA0fQ.9z0GOSpOqAQQc00ABduxKoncxntjc9tNlKf03RYd20c';

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
