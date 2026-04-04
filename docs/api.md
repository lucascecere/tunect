# Spotify API Integration

## How it works

Users authenticate with their own Spotify account via OAuth. Tunect receives a personal access token scoped only to that user's data. This is user-consented personal data access — not bulk developer API scraping. Spotify's developer restrictions do not apply.

---

## OAuth setup

Register at https://developer.spotify.com/dashboard
- Redirect URI: `tunect://auth/spotify/callback`
- Required scopes:
  - `user-read-recently-played`
  - `user-top-read`
  - `user-read-currently-playing`
  - `user-read-playback-state`
  - `user-library-read`

---

## Auth flow (PKCE — no client secret in app)

```ts
// lib/spotify.ts
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!
const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: 'tunect' })

const SCOPES = [
  'user-read-recently-played',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
]

export async function connectSpotify() {
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  }

  const request = new AuthSession.AuthRequest({
    clientId: SPOTIFY_CLIENT_ID,
    scopes: SCOPES,
    redirectUri: REDIRECT_URI,
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
  })

  const result = await request.promptAsync(discovery)

  if (result.type === 'success') {
    // Exchange code via Supabase Edge Function (keeps client secret server-side)
    const tokens = await exchangeCode(result.params.code, request.codeVerifier!)
    return tokens
  }
  return null
}
```

---

## Data fetching

```ts
// Top artists
export async function getTopArtists(
  token: string,
  range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

// Top tracks
export async function getTopTracks(
  token: string,
  range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

// Now playing
export async function getNowPlaying(token: string) {
  const res = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (res.status === 204) return null
  return res.json()
}
```

---

## Token refresh

Spotify tokens expire after 1 hour. Handle silently:

```ts
export async function getValidToken(userId: string): Promise<string> {
  const { access_token, refresh_token, expires_at } = await getStoredTokens(userId)

  // Refresh 60s before expiry
  if (Date.now() > new Date(expires_at).getTime() - 60000) {
    const fresh = await refreshViaEdgeFunction(refresh_token)
    await saveTokens(userId, fresh)
    return fresh.access_token
  }

  return access_token
}
```

Token exchange and refresh must happen via a **Supabase Edge Function** — never expose `SPOTIFY_CLIENT_SECRET` in the app.

---

## Sync strategy

| Event | Action |
|-------|--------|
| App opens | Sync top artists + top tracks (all 3 ranges) |
| App active | Poll now playing every 30 seconds |
| Background | Daily sync via scheduled Supabase function |
| Manual | Pull-to-refresh on profile screen |

---

## Data types

```ts
interface SpotifyArtist {
  id: string
  name: string
  images: { url: string }[]
  genres: string[]
  popularity: number
}

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
    release_date: string
  }
}

interface NowPlaying {
  is_playing: boolean
  item: SpotifyTrack
  progress_ms: number
}
```
