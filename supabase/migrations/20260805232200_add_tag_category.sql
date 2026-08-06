-- Adds a category to tags so the same table can hold both grouping tags
-- (Editorial, Embalagem...) and tool tags (Photoshop, HTML...) without a
-- separate table/relation. Grouping by tag on the home pages keeps filtering
-- to category = 'topic'; tool tags are only ever displayed on the project.

create type public.tag_category as enum ('topic', 'tool');

alter table public.tags
  add column category public.tag_category not null default 'topic';

create index tags_category_idx on public.tags (category);
