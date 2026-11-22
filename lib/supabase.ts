import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      images: {
        Row: {
          id: string;
          path: string;
          url: string;
          mime_type: string;
          size: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          path: string;
          url: string;
          mime_type: string;
          size: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          path?: string;
          url?: string;
          mime_type?: string;
          size?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
