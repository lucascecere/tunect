# Tunect — Full Product Feature Definitions

## 1. Authentication & Platform Connection

### Spotify OAuth (Phase 1)
- Login with Spotify button
- Scopes needed:
  - `user-read-recently-played`
  - `user-top-read`
  - `user-read-currently-playing`
  - `user-read-playback-state`
  - `user-follow-read`
- We read data. We NEVER post to their Spotify. We NEVER modify playlists.
- On first login: show clear permission screen explaining exactly what we read and why

### Apple Music (Phase 2)
- MusicKit JS / Apple Music API
- Same read-only philosophy

### Multi-platform profiles
- Users can connect multiple services
- Profile shows unified data across platforms
- Compatibility scores work cross-platform (Spotify user can match with Apple Music user)

---

## 2. The Music Museum (Profile)

### Now Playing
- Real-time pull from Spotify API
- Shows: song name, artist, album art (blurred background behind profile)
- If not currently playing: shows last played track with "last played" label
- Updates every 30 seconds

### Taste DNA
- Genre breakdown pulled from top artists' genre tags
- Displayed as animated percentage bars
- Sub-genres supported (not just "Hip-Hop" but "Memphis Rap", "Conscious Hip-Hop", "Drill")
- Updates weekly based on rolling listening window
- Visual: could be bars, could be a bubble chart — designer's choice

### Listening History (Museum)
- Time filter: This Week | This Month | This Year | All Time
- Shows: Top Artists, Top Tracks, Top Albums for each period
- Data stored permanently — doesn't disappear when Spotify API window closes
- This is the key differentiator vs. Spotify's 6-month API limit: Tunect stores the data long-term

### Listening Eras
- Auto-detected phases based on dominant genres/artists per time period
- Examples:
  - "Your Jazz Phase — Spring 2023"
  - "Indie Era — 2021–2022"
  - "Trap Season — Summer 2022"
- Timeline visualization on profile (horizontal scroll, oldest → newest)
- Algorithm: detect when top genre changes for 4+ consecutive weeks = new era

### Wraps Hall of Fame
- Dedicated profile section
- Auto-pull: Spotify Wrapped data pulled via API where available
- Manual upload fallback: user uploads screenshot, we display it as a card
- Apple Music Replay: manual upload for now, auto-pull in Phase 2
- Format: year cards, horizontal scroll, oldest → newest
- Each card shows: year, platform, #1 artist, total minutes, top genre
- Tap to expand: shows top 5 artists, top 5 songs of that year
- Permanent — never disappears from profile

### Personality Label
- Auto-generated from listening data
- Single badge shown prominently on profile
- Examples:
  - Soul Keeper (high Neo-Soul/R&B)
  - Trap Lord (high trap/rap)
  - Indie Kid (indie rock/folk dominant)
  - Jazz Head (jazz dominant)
  - Night Owl (listening peaks after midnight)
  - Genre Nomad (extreme diversity, no dominant genre)
  - Deep Cuts Digger (mostly album tracks, rarely top 10 songs)
  - Hype Machine (early adopter, follows new releases closely)
- Label updates monthly

---

## 3. Badge System

All badges are earned automatically from listening data. No self-reporting. No way to game them.

### Genre Badges (Tier 1)
Earned by hitting listening thresholds in a genre over 30-day rolling window:
- Soul Keeper — 40%+ Neo-Soul/R&B
- Trap Lord — 40%+ Trap/Rap
- Indie Kid — 40%+ Indie Rock/Folk
- Jazz Head — 30%+ Jazz
- Metal Warrior — 40%+ Metal
- Pop Royalty — 50%+ Pop
- Classical Mind — 30%+ Classical
- Electronic Spirit — 40%+ Electronic/EDM

### Behavior Badges (Tier 2)
- Night Owl — 60%+ of listening between 11pm–5am over 30 days
- Deep Diver — 70%+ of listening is album tracks (not singles/playlists)
- Loyalist — Same #1 artist for 3+ consecutive months
- Genre Hopper — 6+ distinct genres in top listening, no single genre over 25%
- Marathon Listener — 4+ consecutive hours of listening in a single session (detected)
- Early Adopter — Regularly listens to artists with under 50K monthly listeners

### OG Fan Badges (Tier 3) — SIGNATURE FEATURE
Earned when: user's listening timestamp predates an artist reaching a follower threshold.

**Tiers:**
- 🔥 Early Fan — listened before artist hit 500K monthly listeners on Spotify
- 🔥 OG Fan — listened before artist hit 100K monthly listeners
- 🔥 Day One — listened before artist hit 10K monthly listeners
- 🌟 Founder — listened before artist hit 1K monthly listeners

**Technical implementation:**
- On each new artist listen: pull current Spotify monthly listener count via API
- Store: {user_id, artist_id, listen_timestamp, listener_count_at_time}
- This record is permanent and immutable
- If artist later grows past a threshold: badge is retroactively awarded and displayed
- "Discovery Feed" feature: shows user a feed of artists they listened to early + their growth

**Display on profile:**
- OG badge shelf: scrollable row of artist cards
- Each card: artist name + badge tier + "You listened when they had X listeners. They now have Y."
- Sorted by most impressive (Founder first, then Day One, etc.)

---

## 4. Compatibility Score

### Calculation (weighted)
- Artist overlap: 40% weight
  - Number of shared artists in top 50, weighted by rank overlap
- Genre match: 35% weight
  - Cosine similarity between two users' genre vectors
- Era alignment: 15% weight
  - Do they like music from the same decades/eras?
- Listening energy: 10% weight
  - Similar listening intensity patterns (time of day, session length, etc.)

### Display
- Large percentage number (e.g., "94%") on another user's profile
- Color: green spectrum (low = muted, high = bright green)
- Breakdown section: shows the 4 components as bars
- "You share X artists · Y songs · Z genres" summary line

### In Discover Feed
- Users sorted by compatibility score by default
- Score shown on each user card
- Can filter by genre, compatibility threshold, online status

---

## 5. Social Graph

### Follow vs. Connect
- **Follow:** One-directional. Anyone can follow anyone. Follower/following counts visible on profile.
- **Connect:** Mutual. User A requests, User B accepts. Like a "friendship" not just a follow.
- Connections unlock: DMs, comments, post interactions, full compatibility breakdown

### Discover Tab
- Default sort: compatibility score (highest first)
- Filters: genre, currently listening, mutual connects, location (optional, future)
- "Live now" section at top: users currently playing music
- Infinite scroll

### Feed
- Auto-generated posts from listening activity — users don't manually post
- Feed types:
  - Milestone posts: "Just hit 1,000 plays of [artist]"
  - Discovery posts: "Just listened to [artist] for the first time — they have 8K listeners"
  - Era shift: "Your top genre just changed to [genre]"
  - Badge earned: "[User] just earned the Night Owl badge"
  - OG unlock: "[Artist] just hit 1M listeners — you were an OG Fan"
- Feed shows: Following feed (connects only) + For You feed (algorithm, all users)

### DMs
- Only available between mutual connects
- AI conversation starter suggestion: "You both saved [song] — ask them when they first heard it"
- Song sharing: share directly from Spotify/Apple Music into DM
- Now Playing share: "Currently listening to [song]" — one-tap share

### Comments
- Only mutual connects can comment on each other's feed posts
- No public comment sections — keeps it intentional

---

## 6. Notifications
- New connect request
- Connect accepted — DM unlocked
- OG Fan badge earned (artist you listened to grew past a threshold)
- New badge earned
- Compatibility milestone: "You and [user] are 90%+ compatible"
- Weekly listening summary

---

## 7. Pricing & Monetization

### Free Tier
- Full music profile + Taste DNA
- Compatibility scores with all users
- OG Fan Tracker (all tiers)
- Music Museum (full history)
- Wraps Hall of Fame
- Unlimited follows
- Discover tab (full access)
- Mutual Connect + DMs
- Up to 10 active connect requests at a time
- Ad-supported (tasteful, music-relevant ads only)

### Pro Tier — $2.99/month or $24.99/year
- Everything in Free
- Ad-free everywhere, always
- See who viewed your profile (last 7 days)
- Deep compatibility breakdown (full 4-component breakdown vs. just score)
- Unlimited connect requests
- Profile customization (color accent, pinned track, profile layout)
- Extended listening history stats (beyond 6 months)
- Pro badge on profile
- Priority in Discover algorithm
- Early access to new features

### Future Revenue (Phase 2+)
- Artist partnerships: verified artist profiles, fan engagement tools
- Data insights (anonymized/aggregated) for music industry
- Premium compatibility features (deeper algorithmic matching)

---

## 8. Privacy & Data

### What We Read
- Listening history (top artists, tracks, recently played)
- Currently playing track
- Spotify follower counts of artists you listen to (for OG tracking)

### What We Never Do
- Post anything to your Spotify/Apple Music
- Modify playlists
- Access payment information
- Share individual listening data with third parties

### User Controls
- Private mode: hide profile from Discover, only visible to connects
- Listening activity: toggle real-time Now Playing on/off
- History visibility: choose what time periods are visible on your profile
- Block and report functionality

---

## 9. Technical Architecture Notes (for Claude Code)

### Frontend
- React Native + Expo (mobile app)
- Next.js (web/landing page)
- Tailwind CSS

### Backend
- Supabase (database + auth)
- Edge functions for Spotify API polling
- Scheduled jobs for:
  - Polling now playing (every 30s per active user)
  - Updating artist listener counts (daily)
  - Calculating compatibility scores (on profile view + nightly batch)
  - Detecting listening era shifts (weekly)

### Key Database Tables
- `users` — profile data, preferences
- `listening_history` — permanent archive of listening data
- `artist_snapshots` — artist listener counts at time of user's first listen
- `badges` — earned badges per user
- `compatibility_scores` — cached scores between user pairs
- `connections` — follow/connect relationships
- `wraps` — annual wrap data per user

### Spotify API Endpoints Used
- `GET /me/top/artists` — top artists
- `GET /me/top/tracks` — top tracks
- `GET /me/player/recently-played` — recent history
- `GET /me/player/currently-playing` — now playing
- `GET /artists/{id}` — artist data including follower count
