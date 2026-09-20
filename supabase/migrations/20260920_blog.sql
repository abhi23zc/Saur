create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique,
  excerpt text not null, content jsonb not null, cover_image text, seo_title text, seo_description text,
  author_name text not null default 'Saur Engineering Team', status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.categories (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique);
create table if not exists public.tags (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique);
create table if not exists public.post_categories (post_id uuid references public.posts(id) on delete cascade, category_id uuid references public.categories(id) on delete cascade, primary key (post_id, category_id));
create table if not exists public.post_tags (post_id uuid references public.posts(id) on delete cascade, tag_id uuid references public.tags(id) on delete cascade, primary key (post_id, tag_id));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', '')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.profiles enable row level security; alter table public.posts enable row level security; alter table public.categories enable row level security; alter table public.tags enable row level security; alter table public.post_categories enable row level security; alter table public.post_tags enable row level security;
create policy "profiles read own" on public.profiles for select using (id = auth.uid());
create policy "published posts read" on public.posts for select using (status = 'published' or public.is_admin());
create policy "admins manage posts" on public.posts for all using (public.is_admin()) with check (public.is_admin());
create policy "public categories read" on public.categories for select using (true); create policy "admins manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "public tags read" on public.tags for select using (true); create policy "admins manage tags" on public.tags for all using (public.is_admin()) with check (public.is_admin());
create policy "public post categories read" on public.post_categories for select using (true); create policy "admins manage post categories" on public.post_categories for all using (public.is_admin()) with check (public.is_admin());
create policy "public post tags read" on public.post_tags for select using (true); create policy "admins manage post tags" on public.post_tags for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('blog-media', 'blog-media', true) on conflict (id) do nothing;
create policy "public blog media read" on storage.objects for select using (bucket_id = 'blog-media');
create policy "admins manage blog media" on storage.objects for all using (bucket_id = 'blog-media' and public.is_admin()) with check (bucket_id = 'blog-media' and public.is_admin());
