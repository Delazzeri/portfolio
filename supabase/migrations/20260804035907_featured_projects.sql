alter table public.projects
  add column featured boolean not null default false,
  add column featured_position integer;

create index projects_featured_position_idx on public.projects (featured_position) where featured = true;
