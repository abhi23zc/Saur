// Creates a separate Docker-backed development environment. Never connects to hosted Supabase.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

fs.mkdirSync('.local', { recursive: true, mode: 0o700 });
const run = (command, args) => {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`${command} failed. ${result.stderr || 'Check Docker is running and accessible.'}`);
  return result.stdout;
};
try {
  const network = spawnSync('docker', ['network', 'inspect', 'saur-local-network'], { stdio: 'ignore' });
  if (network.status !== 0) run('docker', ['network', 'create', '-o', 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1', 'saur-local-network']);
  console.log('Starting local Supabase. First run downloads Docker images; allow several minutes.');
  const log = fs.openSync('.local/supabase-start.log', 'w', 0o600);
  const started = spawnSync('node_modules/.bin/supabase', ['start', '--network-id', 'saur-local-network'], { stdio: ['ignore', log, log] });
  fs.closeSync(log);
  if (started.status !== 0) throw new Error('Supabase could not start. See .local/supabase-start.log.');
  const status = JSON.parse(run('node_modules/.bin/supabase', ['status', '-o', 'json']));
  const local = (url) => ['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname);
  if (!local(status.API_URL) || !local(status.DB_URL)) throw new Error('Refusing setup: Supabase endpoints must be loopback addresses.');
  const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const login = createClient(status.API_URL, status.ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const credentialFile = '.local/admin-credentials.json';
  let credentials;
  if (fs.existsSync(credentialFile)) {
    credentials = JSON.parse(fs.readFileSync(credentialFile, 'utf8'));
    const { error } = await login.auth.signInWithPassword(credentials);
    if (error) throw new Error('Saved local credentials no longer work. No existing password was changed.');
    await login.auth.signOut();
  } else {
    credentials = { email: 'admin@saur.local', password: `Saur!${randomBytes(15).toString('base64url')}` };
    const { error } = await admin.auth.admin.createUser({ ...credentials, email_confirm: true, user_metadata: { full_name: 'Local Saur Admin' } });
    if (error) throw error;
    // Save immediately so a failed profile update can be retried without resetting passwords.
    fs.writeFileSync(credentialFile, JSON.stringify(credentials, null, 2) + '\n', { mode: 0o600 });
    console.log('Created local admin account.');
  }
  const { data: session, error: loginError } = await login.auth.signInWithPassword(credentials);
  if (loginError) throw loginError;
  const userId = session.user.id;
  await login.auth.signOut();
  const { error: profileError } = await admin.from('profiles').update({ role: 'admin', full_name: 'Local Saur Admin' }).eq('id', userId);
  if (profileError) throw profileError;
  const envPath = '.env.local';
  if (fs.existsSync(envPath)) {
    const old = fs.readFileSync(envPath, 'utf8');
    if (!old.includes(`NEXT_PUBLIC_SUPABASE_URL=${status.API_URL}\n`)) {
      const backup = `.local/environment-backup-${Date.now()}`;
      fs.writeFileSync(backup, old, { mode: 0o600 });
      console.log(`Previous environment preserved in ${backup}.`);
    }
  }
  const env = {
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: status.ANON_KEY,
    SUPABASE_DB_URL: status.DB_URL,
    SMTP_HOST: '127.0.0.1', SMTP_PORT: '54325', SMTP_USER: '', SMTP_PASSWORD: '', SMTP_FROM: 'Saur Local <admin@saur.local>',
  };
  fs.writeFileSync(envPath, Object.entries(env).map(([key, value]) => `${key}=${value}`).join('\n') + '\n', { mode: 0o600 });
  console.log('Local environment ready. Restart npm run dev after switching environments.');
  console.log('Admin: http://127.0.0.1:3000/admin/login');
  console.log('Studio: http://127.0.0.1:54323 | Email inbox: http://127.0.0.1:54324');
  console.log('Login details: .local/admin-credentials.json (private, ignored by Git).');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
