-- 0001_init.sql
-- Buddhachaya Center: staff allowlist, posts, events, RLS, storage policies.
-- Source: project-roadmap.md section 6 (D8, D8a). Policy logic is unchanged.
-- Added in review (session 12): two indexes (marked "ADDED").
-- NOT tested in Postgres by Claude: run, then do the RLS tests (P2-4).
-- Do NOT put any email address or secret in this file (public repo).
-- Before running: create the public bucket 'dhamma-media' in the Supabase dashboard.

-- 1. Staff allowlist with roles
create table public.staff_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','editor')),
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.staff_users enable row level security;

-- A logged-in user may read only their own staff row (the admin UI needs their role)
create policy "Users read own staff row" on public.staff_users
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.staff_users where user_id = auth.uid());
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.staff_users
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- 2. updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3. Posts: teachings, news, activity write-ups
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  post_type text not null default 'teaching'
    check (post_type in ('teaching','news','activity')),
  category text,                       -- e.g. vipassana, abhidhamma, sutta
  status text not null default 'draft'
    check (status in ('draft','review','published')),
  published_at timestamptz,
  title_my text not null,
  title_en text,
  title_de text,
  excerpt_my text,
  excerpt_en text,
  excerpt_de text,
  content_my text not null,            -- Markdown
  content_en text,
  content_de text,
  author text not null default 'Sayadaw Ashin Kusalasami',
  cover_image_url text,
  youtube_url text,
  audio_url text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger posts_set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- ADDED: list pages filter by status and sort by date
create index posts_status_published_at_idx
  on public.posts (status, published_at desc);

-- 4. Events: upcoming schedule, retreats
create table public.events (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz,
  title_my text not null,
  title_en text,
  title_de text,
  description_my text,
  description_en text,
  description_de text,
  location text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger events_set_updated_at before update on public.events
  for each row execute function public.set_updated_at();

-- ADDED: schedule page filters by published and sorts by start time
create index events_published_starts_at_idx
  on public.events (is_published, starts_at);

-- 5. RLS: posts
alter table public.posts enable row level security;

create policy "Public reads published posts" on public.posts
  for select using (status = 'published');
create policy "Staff read all posts" on public.posts
  for select to authenticated using (public.is_staff());
create policy "Admins manage posts" on public.posts
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
-- Editors: create and edit only unpublished posts; cannot publish or delete
-- (D8a: to let editors publish, add 'published' to both status lists below)
create policy "Editors insert unpublished posts" on public.posts
  for insert to authenticated
  with check (public.is_staff() and status in ('draft','review') and created_by = auth.uid());
create policy "Editors update unpublished posts" on public.posts
  for update to authenticated
  using (public.is_staff() and status in ('draft','review'))
  with check (public.is_staff() and status in ('draft','review'));

-- 6. RLS: events
alter table public.events enable row level security;

create policy "Public reads published events" on public.events
  for select using (is_published = true);
create policy "Staff read all events" on public.events
  for select to authenticated using (public.is_staff());
create policy "Admins manage events" on public.events
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Editors insert unpublished events" on public.events
  for insert to authenticated
  with check (public.is_staff() and is_published = false and created_by = auth.uid());
create policy "Editors update unpublished events" on public.events
  for update to authenticated
  using (public.is_staff() and is_published = false)
  with check (public.is_staff() and is_published = false);

-- 7. Storage (create public bucket 'dhamma-media' in the dashboard first)
create policy "Staff list dhamma-media" on storage.objects
  for select to authenticated
  using (bucket_id = 'dhamma-media' and public.is_staff());
create policy "Staff upload dhamma-media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'dhamma-media' and public.is_staff());
create policy "Staff update dhamma-media" on storage.objects
  for update to authenticated
  using (bucket_id = 'dhamma-media' and public.is_staff())
  with check (bucket_id = 'dhamma-media' and public.is_staff());
create policy "Admins delete dhamma-media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'dhamma-media' and public.is_admin());

-- 8. Register staff: NOT part of this migration. Run by hand in the Supabase
-- SQL Editor after creating the Auth user (type the email there; never commit it):
--   insert into public.staff_users (user_id, role, display_name)
--     select id, 'admin', 'Aung' from auth.users where email = '<ADMIN_EMAIL>';
--   insert into public.staff_users (user_id, role, display_name)
--     select id, 'editor', '<NAME>' from auth.users where email = '<EDITOR_EMAIL>';
