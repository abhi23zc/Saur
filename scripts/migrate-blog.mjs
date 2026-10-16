// Run with: node scripts/migrate-blog.mjs --apply --ca /path/to/prod-supabase.cer
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
const { Client } = pg;
const arg = (name) => { const i=process.argv.indexOf(name); return i<0 ? undefined : process.argv[i+1]; };
const envFile=arg('--env-file') || '.env.local';
if(fs.existsSync(envFile))process.loadEnvFile(envFile);
const certificate=arg('--ca') || process.env.SUPABASE_SSL_ROOT_CERT || 'supabase/certificates/prod-supabase.cer';
if(!process.argv.includes('--apply')){console.log('Prepared migration: private working drafts, atomic publication, media/revisions, recoverable trash and pg_cron publication. Use --apply to back up affected objects and apply it.');process.exit(0);}
(async()=>{
 const c=new Client({connectionString:process.env.SUPABASE_DB_URL,ssl:["localhost","127.0.0.1","[::1]"].includes(new URL(process.env.SUPABASE_DB_URL).hostname)?false:{rejectUnauthorized:true,...(certificate?{ca:fs.readFileSync(certificate,'utf8')}:{})},connectionTimeoutMillis:15000});
 try {
  await c.connect();
  const tables=['posts','post_drafts','categories','tags','post_categories','post_tags','post_revisions','media_assets','article_metrics'];
  const backup={createdAt:new Date().toISOString(),tables:{},columns:[],constraints:[],indexes:[],triggers:[],policies:[],grants:[],functions:[],scheduler:[]};
  for(const table of tables){if((await c.query('select to_regclass($1) as name',[`public.${table}`])).rows[0].name)backup.tables[table]=(await c.query(`select * from public.${table}`)).rows;}
  backup.columns=(await c.query("select * from information_schema.columns where table_schema='public' and table_name=any($1) order by table_name,ordinal_position",[tables])).rows;
  backup.constraints=(await c.query("select c.relname as table_name,con.conname,pg_get_constraintdef(con.oid) as definition from pg_constraint con join pg_class c on con.conrelid=c.oid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname=any($1)",[tables])).rows;
  backup.indexes=(await c.query("select * from pg_indexes where schemaname='public' and tablename=any($1)",[tables])).rows;
  backup.triggers=(await c.query("select c.relname as table_name,t.tgname,pg_get_triggerdef(t.oid) as definition from pg_trigger t join pg_class c on t.tgrelid=c.oid where c.relname=any($1) and not t.tgisinternal",[tables])).rows;
  backup.policies=(await c.query("select * from pg_policies where schemaname='public' and tablename=any($1)",[tables])).rows;
  backup.grants=(await c.query("select * from information_schema.role_table_grants where table_schema='public' and table_name=any($1)",[tables])).rows;
  backup.functions=(await c.query("select p.proname,pg_get_functiondef(p.oid) as definition,p.proacl::text as grants from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname=any($1)",[['save_editor_post','publish_due_posts','trim_post_revisions','record_article_view','blog_index']])).rows;
  if((await c.query("select to_regclass('cron.job') as name")).rows[0].name)backup.scheduler=(await c.query("select * from cron.job where jobname='saur-publish-due-posts'")).rows;
  const dir=arg('--backup-dir') || '.local-backups';fs.mkdirSync(dir,{recursive:true,mode:0o700});const backupPath=path.join(dir,`blog-${Date.now()}.json`);fs.writeFileSync(backupPath,JSON.stringify(backup,null,2),{mode:0o600});
  const needsUpgrade=!backup.columns.some((column)=>column.table_name==='posts' && column.column_name==='scheduled_for');
  const sql=(needsUpgrade?fs.readFileSync('supabase/migrations/20260921_blog_cms_upgrade.sql','utf8')+'\n':'')+fs.readFileSync('supabase/migrations/20261016000100_reliable_editor.sql','utf8').replace(/^begin;$/m,'').replace(/^commit;$/m,'')+'\n'+fs.readFileSync('supabase/migrations/20261016000200_blog_index.sql','utf8')+'\n'+fs.readFileSync('supabase/migrations/20261016000300_editor_conflict_status.sql','utf8');
  await c.query('begin');await c.query("set local lock_timeout='10s'");await c.query(sql);await c.query("NOTIFY pgrst, 'reload schema'");
  // Existing content, URLs and status must survive the upgrade unchanged.
  const after=(await c.query('select id,title,slug,content,status from public.posts')).rows;
  for(const before of backup.tables.posts || []) {const post=after.find((row)=>row.id===before.id);if(!post || post.title!==before.title || post.slug!==before.slug || post.status!==before.status || JSON.stringify(post.content)!==JSON.stringify(before.content))throw new Error('Existing article preservation check failed.');}
  await c.query('commit');
  console.log(`Migration applied. ${after.length} existing articles preserved. Backup: ${backupPath}`);
  console.log('Scheduler:',(await c.query("select jobname,schedule,active from cron.job where jobname='saur-publish-due-posts'")).rows);
 }catch(error){try{await c.query('rollback');}catch{}console.error('Migration failed:',error.code || error.name,String(error.message).replace(process.env.SUPABASE_DB_URL,'[database URL]'));process.exitCode=1;}finally{await c.end();}
})();
