-- 0003: Schedule fields on public.events
-- Adds category, weekday, optional text overrides, per-language location and an optional picture.
-- starts_at becomes optional (weekly and "July-August" style events have no single date).
-- RLS policies are not changed.

alter table public.events
  alter column starts_at drop not null;

alter table public.events
  add column category text not null default 'annual'
    check (category in ('annual', 'weekly')),
  add column weekday smallint
    check (weekday is null or weekday between 0 and 6),
  add column date_text_my text,
  add column date_text_en text,
  add column date_text_de text,
  add column time_text_my text,
  add column time_text_en text,
  add column time_text_de text,
  add column location_my text,
  add column location_en text,
  add column location_de text,
  add column image_url text;

-- A weekly event needs a weekday; an annual event needs a date or a date text.
alter table public.events
  add constraint events_schedule_check check (
    (category = 'weekly' and weekday is not null)
    or
    (category = 'annual' and (
      starts_at is not null
      or coalesce(btrim(date_text_my), '') <> ''
      or coalesce(btrim(date_text_en), '') <> ''
      or coalesce(btrim(date_text_de), '') <> ''
    ))
  );