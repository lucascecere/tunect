import { create } from 'zustand'
import { supabase, User, Session } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  spotifyConnected: boolean
  setSession: (session: Session | null) => void
  setSpotifyConnected: (v: boolean) => void
  signUp: (email: string, password: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  init: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  spotifyConnected: false,

  setSession: (session) =>
    set({ session, user: session?.user ?? null, loading: false }),

  setSpotifyConnected: (v) => set({ spotifyConnected: v }),

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return error.message
    set({ session: data.session, user: data.user })
    return null
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return error.message
    set({ session: data.session, user: data.user })
    return null
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, user: null, spotifyConnected: false })
  },

  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null })
    })
  },
}))
