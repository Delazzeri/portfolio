-- Storage bucket for project cover/banner/gallery images.
-- Path convention: {project_id}/cover/..., {project_id}/banner/..., {project_id}/gallery/...

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true);

create policy "project_media_public_read" on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-media');

create policy "project_media_admin_all" on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'project-media'
    and (select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com'
  )
  with check (
    bucket_id = 'project-media'
    and (select auth.jwt() ->> 'email') = 'dudu.delazeri@gmail.com'
  );
