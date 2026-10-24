// Local-only integration test. All fixture writes are rolled back.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import pg from 'pg';
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const url = process.env.SUPABASE_DB_URL;
if (!url || !['127.0.0.1', 'localhost', '[::1]'].includes(new URL(url).hostname)) throw new Error('Careers database tests require a local SUPABASE_DB_URL.');
const db = new pg.Client({ connectionString: url });
try {
  await db.connect(); await db.query('begin');
  const admin = (await db.query("select id from public.profiles where role='admin' limit 1")).rows[0]; assert.ok(admin, 'Local administrator required');
  const id = crypto.randomUUID();
  await db.query("select set_config('request.jwt.claim.sub', $1, true)", [admin.id]); await db.query('set local role authenticated');
  await db.query(`insert into public.jobs(id,title,discipline,location,experience,employment_type,summary,responsibilities,qualifications) values($1,'Fixture Engineer','Electrical','Mumbai','2 years','Full-time','A test engineering role.','Prepare engineering drawings.','An engineering qualification.')`, [id]);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub','',true)"); await db.query('set local role anon');
  assert.equal((await db.query('select id from public.jobs where id=$1', [id])).rowCount, 0);
  await db.query('savepoint denied'); await assert.rejects(db.query("update public.jobs set status='published' where id=$1", [id]), { code: '42501' }); await db.query('rollback to savepoint denied');
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,true)", [admin.id]); await db.query('set local role authenticated');
  const before = (await db.query('select updated_at from public.jobs where id=$1', [id])).rows[0].updated_at;
  await db.query("update public.jobs set status='published' where id=$1", [id]);
  assert.equal((await db.query('select updated_at from public.jobs where id=$1', [id])).rows[0].updated_at > before, true);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub','',true)"); await db.query('set local role anon');
  assert.equal((await db.query('select id from public.jobs where id=$1', [id])).rowCount, 1);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,true)", [admin.id]); await db.query('set local role authenticated');
  await db.query("update public.jobs set status='closed' where id=$1", [id]);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub','',true)"); await db.query('set local role anon');
  assert.equal((await db.query('select id from public.jobs where id=$1', [id])).rowCount, 0);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,true)", [crypto.randomUUID()]); await db.query('set local role authenticated');
  await db.query('savepoint denied_insert'); await assert.rejects(db.query("insert into public.jobs(title,discipline,location,experience,employment_type,summary,responsibilities,qualifications) values('Unauthorized opening','Electrical','Mumbai','2 years','Full-time','A test engineering role.','Prepare engineering drawings.','An engineering qualification.')"), { code: '42501' }); await db.query('rollback to savepoint denied_insert');
  assert.equal((await db.query("update public.jobs set status='published' where id=$1 returning id", [id])).rowCount, 0);
  await db.query('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,true)", [admin.id]); await db.query('set local role authenticated');
  await db.query("update public.jobs set status='published' where id=$1", [id]);
  assert.equal((await db.query('select status from public.jobs where id=$1', [id])).rows[0].status, 'published');
  await db.query('rollback'); console.log('PASS: administrator create/publish/close/reopen, public visibility, anonymous and non-admin write protection. Fixtures rolled back.');
} finally { await db.query('rollback').catch(() => {}); await db.end(); }
