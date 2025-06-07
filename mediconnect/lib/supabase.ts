import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbnzenigtqzkqsircghg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibnplbmlndHF6a3FzaXJjZ2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTI4MTcsImV4cCI6MjA2MzMyODgxN30.f8-P1COuSn4NPDJKAU8V-c7CaU11vbfZpR_QLOJpBEo";

// ✅ Correct setup
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Test session
if (typeof window !== "undefined") {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Supabase session error:", error.message);
    } else {
      console.log("Session:", data.session);
    }
  });
}

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
};
