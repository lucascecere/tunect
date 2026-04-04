# MVP Features & Screen Specs

## Scope

Build only what is listed here. Do not add features not on this list.

---

## Screens

### 1. Onboarding / Splash
- App icon centered
- Tagline: "Connect through music"
- "Get started" button → signup
- "Log in" text link

### 2. Sign up
- Email + password fields
- "Create account" button
- → redirects to Connect Spotify screen

### 3. Log in
- Email + password
- "Log in" button
- Forgot password link

### 4. Connect Spotify
- Shown after signup and from settings
- Spotify logo + "Connect your Spotify"
- Subtext: "We use your listening history to build your profile and find your people."
- "Connect Spotify" button → OAuth flow
- "Skip for now" text link (limited experience)

### 5. My Profile `(tabs)/profile.tsx`
Sections in order:
1. **Header** — avatar, display name, @username, bio, edit button
2. **Now Playing** — pulsing blue dot, album art, track + artist, platform badge. Hidden if nothing playing.
3. **Timeframe toggle** — pill selector: Week / Month / All time
4. **Top Artists** — list of 5, each row: album art thumbnail + artist name
5. **Top Tracks** — list of 5, each row: album art + track name + artist
6. **Music Personality** — card showing generated label + top 3 genres as percentage bars

### 6. Explore `(tabs)/explore.tsx`
- Search bar at top (filter by username/display name)
- Default list: users sorted by compatibility score (highest first)
- Each user card:
  - Avatar + display name + @username
  - Compatibility % badge (color coded)
  - Top 3 artist names (text, small)
  - Now playing badge if active
- Tap → User Profile screen

### 7. User Profile `/user/[id].tsx`
Same layout as My Profile but:
- No edit button
- Shows Follow + Message buttons
- Shows compatibility card at top:
  - Score (large, color coded)
  - "X shared artists" · "X shared genres"
- Shows "Songs you both love" section (shared top tracks)
- Follow button: outline → filled on follow
- Message button: only active if both follow each other (connected)

### 8. Messages `(tabs)/messages.tsx`
- List of conversations
- Each row: avatar + name + last message preview + timestamp
- Tap → conversation thread

### 9. Conversation `/messages/[id].tsx`
- Chat bubbles (sent right, received left)
- Text input + send button at bottom
- Real-time via Supabase Realtime
- Keyboard avoiding view

### 10. Settings `/settings`
- Edit profile (name, bio, avatar)
- Connected accounts (Spotify — shows connected/disconnected, connect/disconnect button)
- Privacy toggle (public / followers only)
- Log out
- Delete account (destructive, confirm modal)

---

## Component specs

### NowPlaying component
```
[● pulsing dot] [48x48 album art] Track Name
                                  Artist Name  [Spotify badge]
```
- Dot: animated scale 1.0→1.2→1.0, 2s loop, color `#3B82F6`
- Container: `bgSurface` card, 12px radius, 12px padding
- Hidden when `nowPlaying === null`

### UserCard component
```
[56px avatar]  Display Name
               @username
               87% compatible    ← color coded pill
               Artist 1 · Artist 2 · Artist 3
               [now playing badge]   ← optional
```

### CompatibilityCard component
```
         87% Compatible
[───────────────────]
  12 shared artists · Indie, Alt-Rock
```
Score color: 80-100 green, 60-79 blue, 40-59 amber, 0-39 gray

### GenreBar component
```
Indie Rock    ██████████  78%
Hip-Hop       ████████    52%
Electronic    ██████      31%
```

---

## Tab bar

| Tab | Icon | Label |
|-----|------|-------|
| Home | house | Home |
| Explore | magnifying glass | Explore |
| (center) | Tunect icon | — |
| Messages | chat bubble | Messages |
| Profile | person | Profile |

Center tab is oversized (56px), deep blue background, white icon. Floats above the bar.

---

## Empty states (required on every screen)

| Screen | Empty state copy |
|--------|-----------------|
| Profile (no music) | "Connect Spotify to bring your profile to life" + Connect button |
| Explore (no users) | "No one here yet — invite a friend" |
| Messages (no convos) | "Connect with someone to start talking" |
| Now Playing (nothing) | "Nothing playing right now" (muted, no dot) |
| Shared songs (none) | "No shared songs yet — your tastes might surprise you" |

---

## Landing page sections

Built in `/landing` as a Next.js app.

### Section 1 — Hero
- Dark background (#0A0A0A)
- Large headline: "Your music taste, your identity."
- Subheadline: "Tunect connects you with people who actually get what you listen to."
- Email capture input + "Get early access" button
- Phone mockup showing the profile screen (static image or CSS mockup)
- App icon top left

### Section 2 — How it works
3 steps in a row:
1. Connect Spotify or Apple Music
2. Get your live music profile
3. Find people who match your taste

### Section 3 — Compatibility
- Show a fake compatibility card: "You and Alex are 94% compatible"
- Copy: "It's not just about liking the same artist. It's about shared taste, shared eras, shared energy."

### Section 4 — Features
Grid of 4 cards:
- Now Playing — See what people are listening to right now
- Taste DNA — Your genre breakdown, visualized
- Real Compatibility — A score built from your actual listening history
- Deep Cuts — Connect over the songs most people don't know

### Section 5 — CTA
- "Music is how you know someone. We built the app for that."
- Email input + "Join the waitlist"

### Footer
- Tunect logo + tagline
- © 2025 Tunect
