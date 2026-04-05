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

### 6. Discover `(tabs)/discover.tsx`
Pure people search. Not a ranked list — a browseable directory.
- Search bar at top (searches name, @username, personality label, artist names)
- Empty state: genre filter pills + "People nearby" default list
- Each user row: avatar (with live dot if playing), display name, @username, now playing track or top artists, personality label
- Tap → User Profile screen

**Listening Together card** (pinned at top of empty state):
- When you are currently playing a track AND another user is playing the exact same track right now, surface a highlighted card above the people list
- Card shows: their avatar with a pulsing ring, track info, animated equalizer bars
- CTA: "Say something" → tapping opens their profile with the co-listening banner visible
- Only shown when there is an active match. If nobody is on the same song, section is hidden.

### 7. Explore `(tabs)/explore.tsx`
Two sub-tabs: **For You** and **Friends**.

**For You tab:**
- Regional trending section at top (see feature below)
- 2-column staggered grid of music content cards
- Card types: New Release, Trending, Similar Artist, Deep Cut, Genre Dive
- Each card: album art gradient, badge, track + artist, like button
- Content is personalized based on your top artists and genres

**Friends tab:**
- Chronological feed of what people you follow are doing
- Post types: now playing (live), new discovery, milestone (50th play), manual song share
- Each post: avatar, name, live badge if active, track card, caption, like/reply/share actions

**Trending by City** (within For You tab):
- City selector pill row: New York, Los Angeles, Atlanta, London (expandable)
- Per city: top 3 tracks ranked, album art, artist name, #1 highlighted
- Footer: "Based on streams in the last 7 days · [City]"
- Data source: aggregate stream counts by user location from Supabase + Spotify data
- UI note: city tabs are horizontally scrollable; default to user's city if known

### 8. User Profile `/user/[id].tsx`
Same layout as My Profile but:
- No edit button
- Shows Follow + Connect buttons
- Shows compatibility card: score (large, color coded), shared artists count, shared genres
- Shows "Songs you both love" section (shared top tracks)
- Follow button: outline → filled on follow
- Connect button: Connect → Requested → Connected (DMs unlock on mutual connect)

**Listening Together banner** (conditional):
- When you and the person whose profile you're viewing are both playing the exact same track right now, show a prominent banner between the action buttons and compatibility card
- Banner: pulsing gradient ring icon, "Listening together right now", track name, "Say hi →" button that opens DMs (or connect prompt if not yet connected)
- This is the strongest social trigger in the app — it's real-time serendipity, not algorithmic
- Powered by comparing `now_playing.track_id` between the two users in Supabase Realtime

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
