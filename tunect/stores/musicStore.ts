import { create } from 'zustand'
import { SpotifyArtist, SpotifyTrack, NowPlaying, getTopArtists, getTopTracks, getNowPlaying } from '@/lib/spotify'
import { getMusicPersonality, artistsToMusicData } from '@/lib/compatibility'

export type Timeframe = 'short_term' | 'medium_term' | 'long_term'

interface MusicState {
  topArtists: SpotifyArtist[]
  topTracks: SpotifyTrack[]
  nowPlaying: NowPlaying | null
  timeframe: Timeframe
  personalityLabel: string
  topGenres: { genre: string; pct: number }[]
  loading: boolean
  setTimeframe: (t: Timeframe) => void
  syncMusic: (token: string) => Promise<void>
  pollNowPlaying: (token: string) => Promise<void>
}

function computeGenres(artists: SpotifyArtist[]) {
  const counts: Record<string, number> = {}
  artists.forEach(a => a.genres.forEach(g => { counts[g] = (counts[g] ?? 0) + 1 }))
  const total = Object.values(counts).reduce((s, v) => s + v, 0)
  return Object.entries(counts)
    .map(([genre, count]) => ({ genre, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5)
}

export const useMusicStore = create<MusicState>((set, get) => ({
  topArtists: [],
  topTracks: [],
  nowPlaying: null,
  timeframe: 'medium_term',
  personalityLabel: '',
  topGenres: [],
  loading: false,

  setTimeframe: (timeframe) => set({ timeframe }),

  syncMusic: async (token) => {
    set({ loading: true })
    try {
      const { timeframe } = get()
      const [artistsRes, tracksRes] = await Promise.all([
        getTopArtists(token, timeframe),
        getTopTracks(token, timeframe),
      ])
      const artists: SpotifyArtist[] = artistsRes.items ?? []
      const tracks: SpotifyTrack[] = tracksRes.items ?? []
      const allGenres = artists.flatMap(a => a.genres)
      const label = getMusicPersonality(allGenres)
      const topGenres = computeGenres(artists)
      set({ topArtists: artists, topTracks: tracks, personalityLabel: label, topGenres, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  pollNowPlaying: async (token) => {
    try {
      const data = await getNowPlaying(token)
      set({ nowPlaying: data?.is_playing ? data : null })
    } catch {}
  },
}))
