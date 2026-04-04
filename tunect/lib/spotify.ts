import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { config } from '@/constants/config'

WebBrowser.maybeCompleteAuthSession()

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!
const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: 'tunect' })

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

export async function connectSpotify() {
  const request = new AuthSession.AuthRequest({
    clientId: SPOTIFY_CLIENT_ID,
    scopes: config.spotifyScopes,
    redirectUri: REDIRECT_URI,
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
  })
  const result = await request.promptAsync(discovery)
  if (result.type === 'success') {
    return { code: result.params.code, codeVerifier: request.codeVerifier! }
  }
  return null
}

export async function getTopArtists(
  token: string,
  range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=${config.topItemsLimit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

export async function getTopTracks(
  token: string,
  range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=${config.topItemsLimit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

export async function getNowPlaying(token: string) {
  const res = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (res.status === 204) return null
  return res.json()
}

export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string }[]
  genres: string[]
  popularity: number
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
    release_date: string
  }
}

export interface NowPlaying {
  is_playing: boolean
  item: SpotifyTrack
  progress_ms: number
}
