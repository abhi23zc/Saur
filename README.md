## Local development with Docker

Docker must be running and accessible to your user. From this project directory:

```sh
npm install
npm run local:setup
npm run dev
```

The first setup downloads the Supabase images, runs all migrations, seeds three sample articles, creates a local admin and configures `.env.local`. Run it again to restart the stack; existing articles, uploads and the admin password are preserved. Hosted environment settings are backed up privately under `.local/` before switching. No hosted data is copied or changed.

- Admin: http://127.0.0.1:3000/admin/login
- Blog: http://127.0.0.1:3000/blog
- Supabase Studio: http://127.0.0.1:54323
- Captured test emails: http://127.0.0.1:54324
- Login email and password: `.local/admin-credentials.json` (private; excluded from Git)

`npm run local:stop` stops only this Supabase project and preserves its Docker volumes. Start again with `npm run local:setup`. Do not use `supabase db reset` or `supabase stop --no-backup` unless you intend to erase local data. The stack uses a dedicated Docker network with ports bound to loopback. Local services and sample content are for development; deployment requires production Supabase credentials and a production site URL.

Run `npm test`, `npm run test:db` and `node tests/blog-http.mjs` (with the app running) to check the blog workflows.

# Saur Engineering & Consultancy

Marketing site and protected content hub built with Next.js 16, React 19, Tailwind CSS, Supabase and Tiptap.

## Local development

1. Copy `.env.example` to `.env.local` and set the site, SMTP and Supabase variables.
2. Install dependencies with `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

## Blog and admin setup

1. Create a Supabase project and add its URL and anonymous key to `.env.local` and Vercel.
2. Run [20260920_blog.sql](supabase/migrations/20260920_blog.sql) in Supabase SQL Editor.
3. Run `npm run db:migrate -- --apply` with `SUPABASE_DB_URL` configured to apply the remaining CMS, private-draft and search migrations. Alternatively, run `20260921_blog_cms_upgrade.sql`, `20261016000100_reliable_editor.sql`, and `20261016000200_blog_index.sql`, and `20261016000300_editor_conflict_status.sql` in that order in the SQL editor.
4. For a fresh database only, run [seed.sql](supabase/seed.sql) to add the three launch articles. Skip seeding an existing client database.
5. In Supabase Auth, create each administrator with email/password. Then run `update public.profiles set role = 'admin' where id = '<auth-user-uuid>';` for each authorized account.
6. Configure Supabase Auth redirect URLs for your production domain and `http://localhost:3000` during development.

Public articles are available at `/blog`; administrators sign in at `/admin/login`. New articles start as drafts and must be explicitly published. Cover images are stored in the public `blog-media` bucket created by the migration.

## Validation

- `npm run lint`
- `npm run build`

## Deployment

Deploy to Vercel with all values from `.env.example` configured for Production, Preview, and Development as appropriate. Configure custom SMTP in Supabase before relying on password recovery emails, and configure the existing site SMTP variables for contact enquiries.

## Complete editorial workflow

See [the blogging guide](docs/blogging-guide.md) for writing, private autosave, deliberate publication, scheduling, media, SEO controls, recovery and database upgrade/test instructions. The latest migrations are required for the editor.

## Careers and recruitment

- Public page: `/careers`. Administrators manage draft, published, and closed vacancies at `/admin/jobs` using the existing administrator login.
- Apply `supabase/migrations/20261024000100_careers.sql` to the target Supabase database before using Jobs. Local development: `supabase migration up --local`. This migration does not seed vacancies or create applicant storage. Apply it to a hosted environment separately as part of an authorized release.
- Published job edits appear immediately; closing a vacancy removes it from public listings. Empty listings and unavailable listings have distinct messages. No sample jobs are shipped.
- `/api/applications` accepts multipart applications with PDF resumes up to 3 MB. Applications and attachments are sent to the two existing Saur contact inboxes using `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`; no extra mail credentials are required. Production SMTP must accept attachments and both recipient addresses.
- Applicants are not stored in Supabase or public media storage. The business inboxes receive and retain submitted email and attachments; deletion requests go to the published contact address.
- Run `npm test` for validation, application handling, and an isolated SMTP delivery test. Run `npm run test:careers:db` only with local Supabase configured; it verifies RLS and the vacancy lifecycle with rolled-back fixtures.
- Before releasing, apply the schema migration, publish approved real vacancies in Jobs, and confirm business SMTP attachment delivery. Training, courses, and internships share the `/careers` page. The legacy `/training` URL permanently redirects to its training section.

### Unified training enquiries

The six numbered training cards on `/careers#training-internships` open a compact course dialog. Its enquiry view submits `type: "training"` and the selected course title to the existing `/api/enquiries` endpoint, without a resume. Jobs and internship applications continue using `/api/applications` with a PDF resume. Course dialogs omit unconfirmed schedules, durations, and fees. All internal training links point to the combined page; `/training` is retained only as a permanent redirect for old links.
