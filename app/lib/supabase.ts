import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createServerFn } from "@tanstack/start";
import type { Database } from "~/types/supabase";
import { parseCookies, setCookie } from "vinxi/http";
import { createSupabaseServerClient } from "./supabase.server";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables"
  );
}

// Server client
export const getSupabaseServerClient = createServerFn({
  method: "GET",
}).handler(async () => {
  const cookieStore = parseCookies();
  const cookies = Object.entries(cookieStore).map(([name, value]) => ({
    name,
    value,
  }));

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookies.find((cookie) => cookie.name === name)?.value;
      },
      set(name: string, value: string, options: any) {
        setCookie(name, value, options);
      },
      remove(name: string, options: any) {
        setCookie(name, "", { ...options, maxAge: 0 });
      },
    },
  });

  return supabase;
});

// Browser client
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

// Helper to get the current session
export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = await getSupabaseServerClient();
    const { data, error: _error } = await supabase.auth.getSession();

    if (!data.user?.email) {
      return null;
    }

    return data.user;
  }
);

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();
  return data.user
    ? {
        id: data.user.id,
        is_anonymous: data.user.is_anonymous,
        user_metadata: data.user.user_metadata,
        email: data.user.email,
      }
    : null;
});

// Helper to get the current user
export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getUser();
    return user;
  }
);
