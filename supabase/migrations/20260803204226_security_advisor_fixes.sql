-- Address findings from `get_advisors(type: security)` after the initial schema + storage migrations.

-- The bucket is public, so object GET already works unauthenticated via the
-- `/storage/v1/object/public/...` endpoint without needing a SELECT policy on
-- storage.objects. Keeping a broad SELECT policy additionally allows anyone to
-- LIST every object in the bucket, which we don't need and don't want.
drop policy if exists "project_media_public_read" on storage.objects;

-- Pre-existing platform function (auto-enables RLS on newly created public
-- tables) was executable directly via RPC by anon/authenticated. It's an
-- event trigger's target function, not something clients should call
-- directly, so revoke public execute.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated, service_role;
