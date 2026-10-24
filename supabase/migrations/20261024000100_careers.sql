begin;
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 160),
  discipline text not null check (char_length(trim(discipline)) between 2 and 100),
  location text not null check (char_length(trim(location)) between 2 and 160),
  experience text not null check (char_length(trim(experience)) between 1 and 100),
  employment_type text not null check (char_length(trim(employment_type)) between 2 and 80),
  summary text not null check (char_length(trim(summary)) between 10 and 1000),
  responsibilities text not null check (char_length(trim(responsibilities)) between 10 and 8000),
  qualifications text not null check (char_length(trim(qualifications)) between 10 and 8000),
  status text not null default 'draft' check (status in ('draft','published','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index jobs_public_listing on public.jobs (created_at desc) where status = 'published';
create function public.touch_job_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = clock_timestamp(); return new; end;
$$;
create trigger jobs_updated_at before update on public.jobs for each row execute function public.touch_job_updated_at();
alter table public.jobs enable row level security;
revoke all on public.jobs from anon, authenticated;
grant select on public.jobs to anon, authenticated;
grant insert, update on public.jobs to authenticated;
create policy "public read open jobs" on public.jobs for select using (status = 'published' or public.is_admin());
create policy "admins create jobs" on public.jobs for insert to authenticated with check (public.is_admin());
create policy "admins update jobs" on public.jobs for update to authenticated using (public.is_admin()) with check (public.is_admin());
notify pgrst, 'reload schema';
commit;
