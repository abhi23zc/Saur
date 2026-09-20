# Saur Engineering & Consultancy

Marketing site and protected content hub built with Next.js 16, React 19, Tailwind CSS, Supabase and Tiptap.

## Local development

1. Copy `.env.example` to `.env.local` and set the site, SMTP and Supabase variables.
2. Install dependencies with `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

## Blog and admin setup

1. Create a Supabase project and add its URL and anonymous key to `.env.local` and Vercel.
2. Run [20260920_blog.sql](supabase/migrations/20260920_blog.sql) in Supabase SQL Editor.
3. Run [seed.sql](supabase/seed.sql) to add the three launch articles.
4. In Supabase Auth, create each administrator with email/password. Then run `update public.profiles set role = 'admin' where id = '<auth-user-uuid>';` for each authorized account.
5. Configure Supabase Auth redirect URLs for your production domain and `http://localhost:3000` during development.

Public articles are available at `/blog`; administrators sign in at `/admin/login`. New articles start as drafts and must be explicitly published. Cover images are stored in the public `blog-media` bucket created by the migration.

## Validation

- `npm run lint`
- `npm run build`

## Deployment

Deploy to Vercel with all values from `.env.example` configured for Production, Preview, and Development as appropriate. Configure custom SMTP in Supabase before relying on password recovery emails, and configure the existing site SMTP variables for contact enquiries.
