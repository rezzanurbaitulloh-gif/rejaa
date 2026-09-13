import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
let attempted = false;

/**
 * Supabase client — created lazily on first CMS fetch so the heavy
 * supabase-js chunk stays out of the initial bundle. Never throws.
 */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (client) return client;
  if (attempted) return null;
  attempted = true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    client = createClient(url, key);
    return client;
  } catch {
    return null;
  }
}
