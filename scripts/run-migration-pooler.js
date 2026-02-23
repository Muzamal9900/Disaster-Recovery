const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to Supabase via pooler (aws-1)');

  const sql = fs.readFileSync(path.join(__dirname, 'migration-reddit-orchestrator.sql'), 'utf-8');

  // Execute the full SQL script
  try {
    await client.query(sql);
    console.log('Migration executed successfully');
  } catch (e) {
    console.error('Migration error:', e.message);
    // If it's a multi-statement issue, try splitting
    if (e.message.includes('cannot insert multiple commands')) {
      console.log('Retrying with individual statements...');
      // Split on semicolons that are followed by newlines (but not inside $$ blocks)
      const statements = [];
      let current = '';
      let inDollarBlock = false;
      for (const line of sql.split('\n')) {
        if (line.trim().startsWith('--')) continue;
        if (line.includes('$$')) inDollarBlock = !inDollarBlock;
        current += line + '\n';
        if (!inDollarBlock && line.trim().endsWith(';')) {
          statements.push(current.trim());
          current = '';
        }
      }
      if (current.trim()) statements.push(current.trim());

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        if (!stmt || stmt === ';') continue;
        try {
          await client.query(stmt);
          // Extract a short label from the statement
          const label = stmt.substring(0, 60).replace(/\n/g, ' ');
          console.log(`  [${i + 1}/${statements.length}] OK: ${label}...`);
        } catch (stmtErr) {
          console.error(`  [${i + 1}/${statements.length}] ERROR: ${stmtErr.message}`);
          console.error(`  Statement: ${stmt.substring(0, 100)}...`);
        }
      }
    }
  }

  // Verify tables
  const result = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'Reddit%' ORDER BY table_name"
  );
  console.log('\nReddit tables after migration:');
  result.rows.forEach(r => console.log('  -', r.table_name));

  // Check seed data
  const pillars = await client.query('SELECT code, name FROM "RedditContentPillar" ORDER BY code');
  console.log('\nContent pillars:', pillars.rows.length);
  pillars.rows.forEach(r => console.log(`  ${r.code}: ${r.name}`));

  const prompts = await client.query('SELECT version, "isActive" FROM "RedditSystemPrompt"');
  console.log('\nSystem prompts:', prompts.rows.length);
  prompts.rows.forEach(r => console.log(`  ${r.version}: active=${r.isActive}`));

  await client.end();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
