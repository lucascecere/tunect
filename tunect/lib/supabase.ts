import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://hbblrjoeojfbrblmngs.supabase.co'
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiYmxycmpvZW9qZmJyYmxtbmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNDQ4OTQsImV4cCI6MjA5MDkyMDg5NH0.2rJanin-nsGd0-wp_GTif3cwG9MUIFUcghA06Ob_A9A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export type { User, Session } from '@supabase/supabase-js'
