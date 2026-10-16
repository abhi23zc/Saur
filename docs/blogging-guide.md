# Saur blogging guide

## Writing and publishing

1. Sign in at `/admin/login` with an administrator account and choose **New article**.
2. Write a title, short summary and article body. Use **Write** for visual editing; Markdown is optional. Use the table toolbar for technical comparisons and the image library for illustrations.
3. Choose topics and check the author name. Author role is optional. Upload a cover and describe what it shows; an image credit can go in the caption.
4. **Save draft** or press Ctrl/Cmd+S. Changes also autosave every 15 seconds, including new articles and incomplete drafts. Save feedback reports success/failure. The first successful save gives the article a permanent editor URL.
5. **Preview article** includes unsaved edits and shares the public article layout. Saved previews are private at `/admin/posts/[id]/preview`.
6. **Publish article** checks the required details and makes the article public. After publication, **Save draft** preserves private working changes; only **Update live article** replaces the public version.
7. Open **Schedule publication**, choose a future time in your device's time zone, and press **Schedule article**. Scheduling captures the current version. Later draft edits remain private until you reschedule or publish. The database checks due articles every minute. Public caches refresh within a further 60 seconds.
8. Use **Unpublish article** or **Cancel scheduled publication** to return an article to draft status. Changing a status never happens through autosave.

Published URLs are locked to preserve existing links. Select **Duplicate** to create a new draft based on another article. A duplicate does not overwrite the original.

## Images, topics and search settings

- `/admin/media` supports uploading JPG, PNG, WebP, GIF and AVIF images below 5 MB, editing descriptions/captions, reuse and deletion of unused images. Newly uploaded images are immediately available without a reload. Images referenced by articles, private drafts or revision history are protected from deletion.
- Cover descriptions/captions are copied into an article when selected and remain editable in that article. Editing the media-library description does not silently rewrite existing articles.
- Select existing topics or add a new topic in the editor. Multiple topics and tags are supported. Tags use commas; key takeaways use one line each. Limits are shown or enforced by the editor.
- **Search appearance** defaults to the article title and summary. Optional overrides include a search title, description, canonical URL, indexing preference and schema type. Social cards default to the search details and cover, with optional per-network overrides.
- The focus phrase is an editorial reminder, not a ranking score. Character counters are editing aids, not promises about how search engines display snippets.
- RSS is available at `/api/rss.xml`. Public search and pagination are database-backed, server-rendered and linkable. Search-filter pages are noindexed; article metadata and canonical URLs remain independent of filters.

## Recovery and collaboration

- Before leaving, wait for the saved indicator or explicitly save. Unsaved changes trigger a browser-navigation warning. A per-tab recovery copy is offered after reload where browser storage is available. This is an additional safeguard, not a replacement for database saves.
- A version number prevents two tabs from silently overwriting each other. On a conflict, copy any local writing you want to keep and reload before saving again.
- **Version history → Refresh versions** lists up to 30 saved versions. Restoring creates a working draft; it does not publish or unpublish the current public version.
- **Trash** removes articles from the public blog and scheduler. Restore returns them as drafts. There is no permanent article deletion control.

## Database setup and operations

For a fresh database, run `supabase/migrations/20260920_blog.sql` first and create an administrator through Supabase Auth, assigning the matching profile's role to `admin`. Never expose database credentials to the browser.

Then configure `SUPABASE_DB_URL` locally and run:

```bash
npm ci
npm run db:migrate -- --apply
npm run test:db
```

The migration runner checks whether the original CMS upgrade is missing, backs up the affected blog records and schema/policy/function definitions under `.local-backups/` (ignored by Git), runs the upgrade in a transaction, verifies existing article content/URLs/status and refreshes PostgREST's schema cache. Review SQL before running it against another database. This is a scoped blog backup; keep your normal full database backups too.

`SUPABASE_SSL_ROOT_CERT` can override the included public Supabase CA certificate. If Supabase rotates its CA, download the current certificate from the project's database settings. Certificate verification remains enabled. `--env-file`, `--ca` and `--backup-dir` are available for migration; the database tests accept `--env-file` and `--ca`.

The scheduler is a `pg_cron` job named `saur-publish-due-posts`, installed through `20261016000100_reliable_editor.sql`. The job executes `publish_due_posts()` every minute. Its execution permission is not granted to anonymous or authenticated web clients. Check `cron.job_run_details` for operational failures. It does not depend on Vercel cron or dashboard visits.

Private working documents are in `post_drafts`, protected by admin-only RLS. `save_editor_post` checks the caller's admin role, locks each post, verifies its draft version, records a revision and applies content/taxonomy changes atomically. Scheduled and published snapshots stay in `posts`; public reads exclude drafts, scheduled posts and Trash. `blog_index` uses invoker permissions and explicitly restricts results to public articles.

The app uses the existing Supabase anonymous key with authenticated cookies and RLS. No service-role or database password is embedded in the app. Proxy refreshes auth cookies on admin routes; every protected page/action still checks the user and administrator profile. Private routes are noindexed and not publicly cached.

## Verification

```bash
npm test
npm run test:db
npm run lint
npm run build -- --webpack
npm audit --omit=dev
```

The database suite performs synthetic operations in a transaction and rolls all test data back. It requires an existing admin profile and a privileged database connection, used only by the local test runner. It tests publication isolation, conflicts, SEO preservation, URL locks, schedule snapshots, public search, due publication, Trash and anonymous/non-admin permissions.

No production web deployment is performed by these commands. Configure the public Supabase URL/key and site URL on the deployment platform. `SUPABASE_DB_URL` is needed by local migration/tests, not by the deployed application.

References: [Supabase SSR client guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs), [Supabase TLS verification](https://supabase.com/docs/guides/platform/ssl-enforcement), [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

## Local Docker environment

Run `npm run local:setup` with Docker running, then `npm run dev`. This provisions a separate database, Auth, Storage, Studio, Mailpit inbox and the publishing scheduler. The three seeded articles are examples. Credentials are in `.local/admin-credentials.json`; previous environment settings are backed up under `.local/`. These files are private and excluded from Git. Stop with `npm run local:stop`; data persists. Repeat setup to start again without resetting articles, media or passwords. Studio is http://127.0.0.1:54323 and captured email is http://127.0.0.1:54324.
