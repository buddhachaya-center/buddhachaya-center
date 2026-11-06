-- 0004: Courses table (public Courses page and admin).
-- Text fields per language like posts and events. Burmese title required.
-- objectives_* hold one learning point per line.
-- zoom_link must start with https:// (it becomes a public link).
-- RLS follows events: public reads published; staff read all; admins manage;
-- editors insert and update unpublished rows only.

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 100,

  title_my text not null check (btrim(title_my) <> ''),
  title_en text,
  title_de text,
  subtitle_my text,
  subtitle_en text,
  subtitle_de text,
  description_my text,
  description_en text,
  description_de text,
  objectives_my text,
  objectives_en text,
  objectives_de text,
  schedule_my text,
  schedule_en text,
  schedule_de text,
  duration_my text,
  duration_en text,
  duration_de text,
  target_my text,
  target_en text,
  target_de text,

  zoom_link text check (zoom_link is null or zoom_link ~ '^https://[^[:space:]]+$'),
  zoom_note_my text,
  zoom_note_en text,
  zoom_note_de text,

  image_url text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index courses_published_sort_idx on public.courses (is_published, sort_order);

create trigger courses_set_updated_at before update on public.courses
  for each row execute function public.set_updated_at();

alter table public.courses enable row level security;

create policy "Public reads published courses" on public.courses
  for select using (is_published = true);
create policy "Staff read all courses" on public.courses
  for select to authenticated using (public.is_staff());
create policy "Admins manage courses" on public.courses
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Editors insert unpublished courses" on public.courses
  for insert to authenticated
  with check (public.is_staff() and is_published = false and created_by = auth.uid());
create policy "Editors update unpublished courses" on public.courses
  for update to authenticated
  using (public.is_staff() and is_published = false)
  with check (public.is_staff() and is_published = false);