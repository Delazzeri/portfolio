import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service-role client: bypasses RLS. Reserved for trusted maintenance operations
// (e.g. removing a project's Storage folder after its row is already gone), never
// for routine reads/writes — those go through the RLS-gated server client.
export function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
