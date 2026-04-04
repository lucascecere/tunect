# Tech Stack

## Mobile App

| Layer | Choice |
|-------|--------|
| Framework | React Native + Expo (SDK 51+) |
| Router | Expo Router (file-based) |
| State | Zustand |
| Styling | NativeWind (Tailwind for RN) |
| Animations | React Native Reanimated 3 |
| Backend | Supabase |
| Icons | Expo Vector Icons |

## Landing Page

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Fonts | Google Fonts (DM Sans + Inter) |

## Backend (Supabase)

- **Auth:** Supabase Auth — email/password for Tunect accounts
- **Database:** Postgres — users, music data, scores, messages
- **Realtime:** Supabase Realtime — now playing sync, messaging
- **Edge Functions:** Spotify token exchange + refresh (keeps client secret server-side only)
- **Storage:** Profile photos

---

## Install commands

```bash
# Mobile app
npx create-expo-app tunect --template tabs
cd tunect
npx expo install nativewind zustand @supabase/supabase-js
npx expo install react-native-reanimated expo-auth-session expo-web-browser

# Landing page
npx create-next-app landing --typescript --tailwind --app
```

---

## Folder structure

```
tunect/
├── app/                        # Expo Router screens
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/
│   │   ├── index.tsx           # home
│   │   ├── explore.tsx
│   │   ├── now-playing.tsx
│   │   ├── messages.tsx
│   │   └── profile.tsx
│   └── user/[id].tsx
├── components/
│   ├── ui/                     # Button, Text, Card, Avatar, Badge
│   ├── profile/                # NowPlaying, TopArtists, TopTracks, CompatScore
│   ├── music/                  # MusicPersonality, GenreBar, SharedSongs
│   └── explore/                # UserCard, SearchBar
├── lib/
│   ├── supabase.ts
│   ├── spotify.ts
│   └── compatibility.ts
├── stores/
│   ├── authStore.ts
│   └── musicStore.ts
├── constants/
│   ├── colors.ts
│   └── config.ts
└── landing/                    # Next.js (separate)
```

---

## Database schema

```sql
-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  spotify_connected boolean default false,
  apple_music_connected boolean default false,
  created_at timestamptz default now()
);

-- Streaming tokens (encrypted)
create table streaming_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  platform text not null, -- 'spotify' | 'apple_music'
  access_token text not null,
  refresh_token text,
  expires_at timestamptz not null
);

-- Music data snapshots
create table user_music_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  platform text not null,
  data_type text not null, -- 'top_tracks_short' | 'top_artists_medium' | etc.
  data jsonb not null,
  synced_at timestamptz default now()
);

-- Now playing (real-time)
create table now_playing (
  user_id uuid primary key references users(id) on delete cascade,
  track_name text,
  artist_name text,
  album_name text,
  album_art_url text,
  platform text,
  updated_at timestamptz default now()
);

-- Compatibility scores
create table compatibility_scores (
  id uuid primary key default gen_random_uuid(),
  user_a uuid references users(id) on delete cascade,
  user_b uuid references users(id) on delete cascade,
  score integer not null, -- 0-100
  breakdown jsonb,
  calculated_at timestamptz default now(),
  unique(user_a, user_b)
);

-- Connections/follows
create table connections (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  status text default 'following', -- 'following' | 'connected'
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,
  sender_id uuid references users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);
```

---

## Compatibility algorithm

```ts
// lib/compatibility.ts

export function calculateCompatibility(userA: MusicData, userB: MusicData): CompatResult {
  const artistOverlap = getOverlapScore(userA.topArtists, userB.topArtists)   // 40%
  const genreOverlap  = getOverlapScore(userA.topGenres,  userB.topGenres)    // 35%
  const eraOverlap    = getEraOverlap(userA.topTracks,    userB.topTracks)    // 15%
  const energyOverlap = getEnergyOverlap(userA, userB)                        // 10%

  const score = Math.round(
    artistOverlap * 0.40 +
    genreOverlap  * 0.35 +
    eraOverlap    * 0.15 +
    energyOverlap * 0.10
  )

  return {
    score,
    sharedArtists: getSharedItems(userA.topArtists, userB.topArtists),
    sharedTracks:  getSharedItems(userA.topTracks,  userB.topTracks),
    sharedGenres:  getSharedItems(userA.topGenres,  userB.topGenres),
  }
}

function getOverlapScore(a: string[], b: string[]): number {
  const setA = new Set(a)
  const shared = b.filter(x => setA.has(x))
  return (shared.length / Math.max(a.length, b.length)) * 100
}
```

## Environment variables

```
# .env.local (never commit)
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_REDIRECT_URI=tunect://auth/spotify/callback
```
