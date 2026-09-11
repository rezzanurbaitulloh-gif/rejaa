import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  const store = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (pairs) => {
        pairs.forEach(({ name, value, options }) => {
          try {
            store.set(name, value, options);
          } catch {
            /* route handler / RSC read-only */
          }
        });
      },
    },
  });
}

/** Service-role hanya untuk skrip/migrasi server. Jangan impor dari komponen client. */
export function serviceRoleKeyPresent() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
