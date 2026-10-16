import assert from 'node:assert/strict';
import fs from 'node:fs';
import pg from 'pg';
const {Client}=pg;
const arg=(name)=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
const env=arg('--env-file') || '.env.local';if(fs.existsSync(env))process.loadEnvFile(env);
(async()=>{const cert=arg('--ca')||process.env.SUPABASE_SSL_ROOT_CERT || 'supabase/certificates/prod-supabase.cer';const c=new Client({connectionString:process.env.SUPABASE_DB_URL,ssl:["localhost","127.0.0.1","[::1]"].includes(new URL(process.env.SUPABASE_DB_URL).hostname)?false:{rejectUnauthorized:true,...(cert?{ca:fs.readFileSync(cert,'utf8')}:{})}});try{
 await c.connect();await c.query('begin');
 const administrator=(await c.query("select id from public.profiles where role='admin' limit 1")).rows[0];assert.ok(administrator,'An existing administrator is required');
 await c.query("select set_config('request.jwt.claim.sub',$1,true)",[administrator.id]);
 await c.query('set local role authenticated');
 const id=crypto.randomUUID();const second=crypto.randomUUID();
 const doc={title:'Transactional test article',slug:`test-${id}`,excerpt:'An isolated integration test that is always rolled back.',content:{type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'Original public content'}]}]},cover_image:null,cover_alt:'',cover_caption:'',author_name:'Integration test',author_role:null,categories:['Test-only category'],tags:['Test-only tag'],tech_takeaways:[],related_post_ids:[],seo_title:'Preserved title',seo_description:null,seo_focus_keyword:null,seo_canonical_url:null,seo_og_title:null,seo_og_description:null,seo_og_image:null,seo_twitter_title:null,seo_twitter_description:null,seo_twitter_image:null,seo_schema_type:'BlogPosting',seo_no_index:true};
 const save=async(article,document,action,version)=>(await c.query('select public.save_editor_post($1,$2,$3,$4) as result',[article,document,action,version])).rows[0].result;
 let saved=await save(id,doc,'save',0);assert.equal(saved.version,1);assert.equal(saved.status,'draft');
 saved=await save(id,doc,'publish',1);assert.equal(saved.status,'published');
 const edit={...doc,title:'Private working title',content:{type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'Private unfinished changes'}]}]}};
 saved=await save(id,edit,'save',2);assert.equal(saved.status,'published');
 let live=(await c.query('select title,content,seo_title from public.posts where id=$1',[id])).rows[0];assert.equal(live.title,doc.title);assert.equal(live.seo_title,'Preserved title');assert.equal(live.content.content[0].content[0].text,'Original public content');
 assert.equal((await c.query('select document from public.post_drafts where post_id=$1',[id])).rows[0].document.title,'Private working title');
 const index=(await c.query('select public.blog_index($1,$2,$3,$4) as result',[doc.title,'',1,1])).rows[0].result;assert.equal(index.count,1);assert.equal(index.posts.length,1);assert.equal(JSON.stringify(index).includes('Private unfinished changes'),false);
 await c.query('savepoint conflict');try{await save(id,edit,'save',2);assert.fail('stale save must fail');}catch(e){assert.ok(['40001','PT409'].includes(e.code));await c.query('rollback to savepoint conflict');}
 await c.query('savepoint slug');try{await save(id,{...edit,slug:'changed-published-url'},'publish',3);assert.fail('published URL must be locked');}catch(e){assert.match(e.message,/URLs cannot be changed/);await c.query('rollback to savepoint slug');}
 saved=await save(id,edit,'publish',3);assert.equal(saved.version,4);assert.equal((await c.query('select title from public.posts where id=$1',[id])).rows[0].title,edit.title);
 const scheduled={...doc,slug:`scheduled-${second}`,scheduled_for:new Date(Date.now()+3600000).toISOString()};
 saved=await save(second,scheduled,'schedule',0);assert.equal(saved.status,'scheduled');
 await save(second,{...scheduled,title:'Private edit after scheduling'},'save',1);
 assert.equal((await c.query('select title from public.posts where id=$1',[second])).rows[0].title,doc.title);
 await c.query('reset role');
 await c.query("update public.posts set scheduled_for=now()-interval '1 minute' where id=$1",[second]);await c.query('select public.publish_due_posts()');assert.equal((await c.query('select status from public.posts where id=$1',[second])).rows[0].status,'published');
 await c.query("update public.posts set deleted_at=now(),status='draft' where id=$1",[id]);
 await c.query("select set_config('request.jwt.claim.sub','',true)");await c.query('set local role anon');
 assert.equal((await c.query('select id from public.posts where id=$1',[id])).rowCount,0);
 assert.equal((await c.query('select * from public.post_drafts where post_id=$1',[second])).rowCount,0);
 await c.query('savepoint anonymous');try{await save(id,doc,'publish',4);assert.fail('anonymous save must fail');}catch(e){assert.equal(e.code,'42501');await c.query('rollback to savepoint anonymous');}
 await c.query('reset role');await c.query("select set_config('request.jwt.claim.sub',$1,true)",[crypto.randomUUID()]);await c.query('set local role authenticated');await c.query('savepoint nonadmin');try{await save(id,doc,'save',4);assert.fail('non-admin must not save');}catch(e){assert.equal(e.code,'42501');await c.query('rollback to savepoint nonadmin');}await c.query('reset role');await c.query('rollback');console.log('PASS: atomic saves, new draft IDs, publication isolation, optimistic conflicts, SEO preservation, locked URLs, scheduling snapshots, due publishing, trash exclusion and anonymous/non-admin access. All test writes rolled back.');
 }catch(e){try{await c.query('rollback')}catch{}console.error('Database test failed:',e.code||e.name,e.message);process.exitCode=1;}finally{await c.end();}})();
