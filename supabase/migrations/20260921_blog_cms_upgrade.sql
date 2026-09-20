-- Editorial CMS upgrade: scheduling, recoverable revisions, media inventory and anonymous aggregates.
alter table public.posts drop constraint if exists posts_status_check;
alter table public.posts add constraint posts_status_check check (status in ('draft', 'scheduled', 'published'));
alter table public.posts add column if not exists scheduled_for timestamptz;
alter table public.posts add column if not exists published_by uuid references auth.users(id) on delete set null;
alter table public.posts add column if not exists original_published_at timestamptz;
alter table public.posts add constraint posts_scheduled_date_check check (status <> 'scheduled' or scheduled_for is not null);
create table if not exists public.post_revisions (id uuid primary key default gen_random_uuid(), post_id uuid not null references public.posts(id) on delete cascade, snapshot jsonb not null, created_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now());
create index if not exists post_revisions_post_created_idx on public.post_revisions(post_id, created_at desc);
create or replace function public.trim_post_revisions() returns trigger language plpgsql security definer set search_path = public as $$ begin delete from public.post_revisions where id in (select id from public.post_revisions where post_id = new.post_id order by created_at desc offset 30); return new; end; $$;
drop trigger if exists trim_post_revisions_after_insert on public.post_revisions;
create trigger trim_post_revisions_after_insert after insert on public.post_revisions for each row execute procedure public.trim_post_revisions();
create table if not exists public.media_assets (id uuid primary key default gen_random_uuid(), storage_path text not null unique, public_url text not null, file_name text not null, mime_type text not null, width integer, height integer, alt_text text not null, caption text, uploaded_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now());
create index if not exists media_assets_created_idx on public.media_assets(created_at desc);
create table if not exists public.article_metrics (article_id uuid not null references public.posts(id) on delete cascade, metric_date date not null default current_date, referrer_host text not null default 'direct', views integer not null default 0 check (views >= 0), primary key (article_id, metric_date, referrer_host));
alter table public.post_revisions enable row level security; alter table public.media_assets enable row level security; alter table public.article_metrics enable row level security;
create policy "admins manage revisions" on public.post_revisions for all using (public.is_admin()) with check (public.is_admin());
create policy "public media assets read" on public.media_assets for select using (true);
create policy "admins manage media assets" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read metrics" on public.article_metrics for select using (public.is_admin());
-- No cookies, IPs, user agents or visitor identifiers are stored; only a daily aggregate and referrer host.
create or replace function public.record_article_view(p_article_id uuid, p_referrer_host text default 'direct') returns void language plpgsql security definer set search_path = public as $$ begin if exists (select 1 from public.posts where id = p_article_id and status = 'published') then insert into public.article_metrics(article_id, metric_date, referrer_host, views) values (p_article_id, current_date, left(coalesce(nullif(p_referrer_host, ''), 'direct'), 255), 1) on conflict (article_id, metric_date, referrer_host) do update set views = article_metrics.views + 1; end if; end; $$;
grant execute on function public.record_article_view(uuid, text) to anon, authenticated;
create or replace function public.publish_due_posts() returns integer language plpgsql security definer set search_path = public as $$ declare updated_count integer; begin update public.posts set status = 'published', published_at = coalesce(original_published_at, now()), original_published_at = coalesce(original_published_at, now()), scheduled_for = null, updated_at = now() where status = 'scheduled' and scheduled_for <= now(); get diagnostics updated_count = row_count; return updated_count; end; $$;


-- Webifyit-inspired editorial controls adapted for Saur's CMS structure.
alter table public.posts add column if not exists author_role text;
alter table public.posts add column if not exists tech_takeaways text[] not null default '{}';
alter table public.posts add column if not exists related_post_ids uuid[] not null default '{}';
alter table public.posts add column if not exists seo_focus_keyword text;
alter table public.posts add column if not exists seo_canonical_url text;
alter table public.posts add column if not exists seo_og_title text;
alter table public.posts add column if not exists seo_og_description text;
alter table public.posts add column if not exists seo_og_image text;
alter table public.posts add column if not exists seo_twitter_title text;
alter table public.posts add column if not exists seo_twitter_description text;
alter table public.posts add column if not exists seo_twitter_image text;
alter table public.posts add column if not exists seo_schema_type text not null default 'BlogPosting';
alter table public.posts add column if not exists seo_no_index boolean not null default false;
alter table public.posts drop constraint if exists posts_seo_schema_type_check;
alter table public.posts add constraint posts_seo_schema_type_check check (seo_schema_type in ('Article', 'BlogPosting', 'NewsArticle'));
create index if not exists posts_related_post_ids_idx on public.posts using gin (related_post_ids);
