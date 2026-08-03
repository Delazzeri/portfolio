-- The only `authenticated` session in this project is the single admin (no public
-- signup, no other user accounts), and admin access is already fully covered by the
-- `*_admin_all` policies. Scoping `*_public_read` to `anon` only removes the
-- redundant second permissive SELECT policy the performance advisor flagged for
-- the `authenticated` role, without changing any actual access outcome.

alter policy "projects_public_read" on public.projects to anon;
alter policy "project_images_public_read" on public.project_images to anon;
alter policy "project_links_public_read" on public.project_links to anon;
alter policy "tags_public_read" on public.tags to anon;
alter policy "project_tags_public_read" on public.project_tags to anon;
