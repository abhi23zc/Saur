# Hosted Supabase connection

The app is configured locally for the `saur` project (`nagwjjoxekqrpfybpsou`). The runtime connection is in `.env.local`, which is excluded from Git. The browser uses a publishable key through the existing `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable; no privileged key is needed by the app.

## Local access

Run `npm run dev`, then open http://127.0.0.1:3000/admin/login. Hosted admin credentials are stored privately in `.local/hosted-admin-credentials.json`. The new hosted blog starts empty; the local Docker articles and uploads are preserved separately. Previous local environment settings are backed up under `.local/local-environment-before-hosted-*`.

The `blog-media` bucket is public for article images, with uploads and modifications restricted to admins. Private drafts and revisions require admin access. Due articles are published by the `saur-publish-due-posts` database scheduler every minute.

## GitHub and deployment

Never commit `.env.local`, `.local/`, database backups or admin credentials. GitHub stores the source and migrations; it does not configure a deployment's environment variables automatically.

For deployment configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable key) and `NEXT_PUBLIC_SITE_URL` (the final HTTPS site URL). Configure production SMTP settings separately for contact enquiries. The Docker Mailpit settings currently used for development do not deliver production email. Add the final site URL to Supabase Authentication URL configuration before using email-based login links or account recovery.

The hosted database was initialized with the SQL files in `supabase/migrations/`. Database passwords and privileged API keys are not part of the app runtime. Future schema updates can be reviewed and run in Supabase SQL Editor, or use a private `SUPABASE_DB_URL` with verified TLS in the migration tooling. Keep the database connection value out of Git.

Run `npm run local:setup` only when you intend to switch back to local Docker Supabase; it preserves the current environment privately before changing `.env.local`.
