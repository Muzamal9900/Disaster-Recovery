const fs = require('fs');
const path = require('path');

async function main() {
  const url = 'https://lccqasmurmsisnnjqqmr.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY3Fhc211cm1zaXNubmpxcW1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDEwNjYwNCwiZXhwIjoyMDg1NDY2NjA0fQ.9z0GOSpOqAQQc00ABduxKoncxntjc9tNlKf03RYd20c';

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
