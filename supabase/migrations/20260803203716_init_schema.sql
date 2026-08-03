-- Initial schema: projects, gallery images, dynamic links, tags, and RLS policies.
-- Admin write access is gated by a single hardcoded email (see CLAUDE.md: single-owner admin).

create type public.project_type as enum ('design', 'code');
create type public.link_type as enum ('github', 'vercel', 'live_site', 'instagram', 'ebook', 'other');

create table public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique,
  type public.project_type not null,
  title_pt text not null,
  title_en text not null,
  description_pt text,
  description_en text,
  cover_image_url text,
  banner_image_url text,
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index projects_type_position_idx on public.projects (type, position);
create index projects_position_idx on public.projects (position);

create table public.project_images (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects (id) on delete cascade,
  image_url text not null,
  position integer not null default 0
);

create index project_images_project_id_idx on public.project_images (project_id, position);

create table public.project_links (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects (id) on delete cascade,
  label text not null,
  url text not null,
  type public.link_type not null default 'other',
  position integer not null default 0
);

create index project_links_project_id_idx on public.project_links (project_id, position);

create table public.tags (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name_pt text not null,
  name_en text not null,
  constraint tags_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create table public.project_tags (
  project_id bigint not null references public.projects (id) on delete cascade,
  tag_id bigint not null references public.tags (id) on delete cascade,
  primary key (project_id, tag_id)
);

create index project_tags_tag_id_idx on public.project_tags (tag_id);

-- updated_at trigger for projects
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- Row Level Security
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.project_links enable row level security;
alter table public.tags enable row level security;
alter table public.project_tags enable row level security;

-- projects: public can read published rows; admin (single hardcoded email) has full access.
create policy "projects_public_read" on public.projects
  for select
  to anon, authenticated
  using (published = true);

create policy "projects_admin_all" on public.projects
  for all
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');

-- project_images: visible when the parent project is published; admin has full access.
create policy "project_images_public_read" on public.project_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id and p.published = true
    )
  );

create policy "project_images_admin_all" on public.project_images
  for all
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');

-- project_links: same shape as project_images.
create policy "project_links_public_read" on public.project_links
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_links.project_id and p.published = true
    )
  );

create policy "project_links_admin_all" on public.project_links
  for all
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');

-- tags: global, not project-scoped; readable by everyone, admin manages.
create policy "tags_public_read" on public.tags
  for select
  to anon, authenticated
  using (true);

create policy "tags_admin_all" on public.tags
  for all
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');

-- project_tags: same visibility shape as project_images/project_links.
create policy "project_tags_public_read" on public.project_tags
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_tags.project_id and p.published = true
    )
  );

create policy "project_tags_admin_all" on public.project_tags
  for all
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');
