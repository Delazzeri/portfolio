create type public.hero_media_type as enum ('image', 'video');

create table public.hero_slides (
  id bigint generated always as identity primary key,
  media_type public.hero_media_type not null,
  media_url text not null,
  title_pt text not null,
  title_en text not null,
  description_pt text,
  description_en text,
  project_id bigint references public.projects (id) on delete set null,
  published boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index hero_slides_position_idx on public.hero_slides (position);

create trigger hero_slides_set_updated_at
  before update on public.hero_slides
  for each row execute function public.set_updated_at();

alter table public.hero_slides enable row level security;

create policy "hero_slides_public_read" on public.hero_slides
  for select to anon
  using (published = true);

create policy "hero_slides_admin_all" on public.hero_slides
  for all to authenticated
  using ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com');
