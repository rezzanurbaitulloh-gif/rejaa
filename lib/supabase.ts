import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
let clientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Supabase client — created lazily on first CMS fetch so the heavy
 * supabase-js chunk stays out of the initial bundle. Never throws.
 * Shared promise prevents StrictMode double-fetch race.
 */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (client) return client;
  if (clientPromise) return clientPromise;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  clientPromise = (async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      client = createClient(url, key);
      return client;
    } catch {
      return null;
    }
  })();
  return clientPromise;
}
