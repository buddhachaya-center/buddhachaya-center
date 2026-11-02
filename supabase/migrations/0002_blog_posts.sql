-- 0002_blog_posts.sql
-- Roadmap D20 / P3-8. Never edit 0001_init.sql; this file changes `posts` only.
--
-- 1. Add the post type 'blog'.
-- 2. title_my and content_my become nullable, so a Blog post may exist in one
--    language only (Burmese or English or German), as the Sayadaw writes it.
-- 3. A check keeps the old rule for every other post type (D4: Burmese required)
--    and requires at least one non-blank language for title and content on blog posts.
--
-- RLS policies are NOT changed: none of them reads post_type. Re-run the RLS tests anyway.
-- The table is empty at the time of writing (verified in session 15), so the new check
-- cannot fail on existing rows.

alter table public.posts
  drop constraint if exists posts_post_type_check;

alter table public.posts
  add constraint posts_post_type_check
  check (post_type in ('teaching','news','activity','blog'));

alter table public.posts alter column title_my drop not null;
alter table public.posts alter column content_my drop not null;

alter table public.posts
  add constraint posts_language_check
  check (
    (
      post_type <> 'blog'
      and title_my is not null
      and content_my is not null
    )
    or
    (
      post_type = 'blog'
      and coalesce(nullif(trim(title_my), ''), nullif(trim(title_en), ''), nullif(trim(title_de), '')) is not null
      and coalesce(nullif(trim(content_my), ''), nullif(trim(content_en), ''), nullif(trim(content_de), '')) is not null
    )
  );
