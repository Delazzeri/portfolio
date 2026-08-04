drop index if exists projects_featured_position_idx;
alter table public.projects
  drop column if exists featured,
  drop column if exists featured_position;
