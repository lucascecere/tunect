# Tunect — Interactive Demo Spec

## Purpose
Let visitors experience the app before it exists. The demo should feel like a real app — not a slideshow. It runs at `/demo` and is fully clickable/tappable.

## Format
- Mobile phone frame (375px wide) centered on desktop
- Looks like an iPhone app running in a browser
- Fake data throughout — no real Spotify connection needed
- Bottom navigation to switch between screens
- Should feel smooth, fast, and real

## Demo Persona
The demo user is **Alex Rivera** — music taste: Indie R&B, Neo-Soul, Alt-Pop. Top artists: Frank Ocean, Tyler the Creator, SZA.

---

## Screens to Build

### Screen 1: Profile (Default/Home Screen)

**Header:**
- Back arrow (non-functional) | "tunect" wordmark | Settings gear icon

**Profile section:**
- Avatar: Large circle with "A" initial (amber background)
- Name: Alex Rivera
- Handle: @alexrivera
- Personality label badge: `🎵 Soul Keeper`
- Now Playing: ▶ "Novacane — Frank Ocean" (animated pulse dot)

**Taste DNA section:**
- Section header: "Taste DNA"
- Genre bars (animated fill on load):
  - Indie R&B: 72%
  - Neo-Soul: 54%
  - Alt-Pop: 38%
  - Jazz: 21%
  - Trap: 15%

**Top Artists (this week):**
- Filter tabs: Week | Month | Year | All Time
- List:
  1. Frank Ocean — 847 plays
  2. Tyler, the Creator — 623 plays
  3. SZA — 441 plays
  4. Sade — 312 plays
  5. Brent Faiyaz — 287 plays

**Badge shelf:**
- Row of earned badges: `Soul Keeper` `Night Owl` `Deep Diver` `OG Fan`
- Tap badge → shows tooltip explaining what it means

**OG Fan section:**
- Header: "You heard them first 🏆"
- Cards showing:
  - Frank Ocean — `🌟 Founder` — "You listened when they had 800 listeners. They now have 18.4M."
  - Brent Faiyaz — `🔥 Day One` — "You listened when they had 6.2K listeners. They now have 8.1M."
  - Steve Lacy — `🔥 OG Fan` — "You listened when they had 74K listeners. They now have 12.3M."

**Wraps Hall of Fame:**
- Header: "Wraps Hall of Fame 🏆"
- Horizontal scroll of year cards:
  - 2025 Wrapped card (Spotify green): "#1 Frank Ocean · 94,230 mins · Indie R&B"
  - 2024 Wrapped card: "#1 Tyler, the Creator · 81,440 mins"
  - 2023 Wrapped card: "#1 SZA · 76,110 mins"
  - 2022 Wrapped card: "#1 Frank Ocean · 68,920 mins"

**Bottom navigation:**
- ⊕ Discover | ▦ Feed | ♪ Profile (active) | ✉ Messages | ⚙ Settings

---

### Screen 2: Discover Tab

**Header:** "Discover" + filter icon

**Filter chips (horizontal scroll):**
`All` `Live now` `Indie R&B` `Neo-Soul` `Hip-Hop` `Jazz` `Pop`

**User cards (vertical scroll):**

Card 1 — Jamie Chen
- Avatar: "J" (purple)
- Name: Jamie Chen | @jamiechen
- `▶ listening now` green pulse
- Compatibility: **94%**
- Shared: Frank Ocean, SZA, Sade
- Genres: Indie R&B · Neo-Soul
- Badges: Soul Keeper | Night Owl

Card 2 — Mia Torres
- Avatar: "M" (coral)
- Name: Mia Torres | @miatorres
- Compatibility: **81%**
- Shared: Tyler the Creator, Brent Faiyaz
- Genres: Alt-Pop · Trap
- Badges: Genre Hopper | OG Fan

Card 3 — Sam Park
- Avatar: "S" (teal)
- Name: Sam Park | @sampark
- `▶ listening now` green pulse
- Compatibility: **67%**
- Shared: Frank Ocean, Jazz artists
- Genres: Jazz · Neo-Soul
- Badges: Deep Diver | Loyalist

Card 4 — Riley Okafor
- Avatar: "R" (amber)
- Name: Riley Okafor | @rileyokafor
- Compatibility: **53%**
- Shared: SZA, Alt-Pop artists
- Genres: Alt-Pop · Pop
- Badges: Early Fan

**Tap a user card → navigates to their profile view (Screen 5)**

---

### Screen 3: Feed Tab

**Header:** "Feed" + notification bell

**Feed posts (auto-generated from listening data):**

Post 1 — Jamie Chen
- Avatar + name + timestamp: "2m ago"
- Content: "Just hit 1,000 plays of *Blonde* by Frank Ocean 🎵"
- Compatibility chip: `94% match`
- Interaction: locked 🔒 (not connected yet)

Post 2 — System/Tunect
- "🎉 You earned a new badge: *Night Owl*"
- "You've listened to 847 songs between midnight and 4am this month."

Post 3 — Mia Torres
- "Mia Torres just discovered **Emotional Oranges** — 8.2K monthly listeners"
- OG Tracker note: "If they blow up, she was here first."
- Compatibility chip: `81% match`

Post 4 — Alex Rivera (self)
- "Your top genre this month shifted: **Neo-Soul** is up 12% 📈"

Post 5 — Sam Park
- "Sam Park just finished listening to *In Rainbows* front to back 🎧"
- Badge earned: `Deep Diver`

**Interactions on all posts show lock icon with tooltip: "Connect with [name] to interact"**

---

### Screen 4: Messages Tab

**Header:** "Messages"

**Compatibility suggestion banner:**
> 💡 "You and Jamie Chen both love Frank Ocean — ask them which album got them first."

**Conversation list:**

Jamie Chen — `94%`
- Last message: "our 94% makes so much sense 😭"
- Timestamp: 2m
- Unread badge: 2

Mia Torres — `81%`
- Last message: "that Brat album is everything"
- Timestamp: 1h

Sam Park — `67%`
- Last message: "505 live — you HAVE to hear it"
- Timestamp: 3h
- Unread badge: 1

**Tap Jamie Chen → opens conversation (Screen 6)**

---

### Screen 5: Other User Profile (Jamie Chen)

**Accessed by tapping a user card in Discover**

**Header:** Back arrow | @jamiechen | ⋮ menu

**Profile:**
- Avatar: "J" (large, purple)
- Name: Jamie Chen
- Handle: @jamiechen
- Badge: `🎵 Night Owl`
- Now Playing: ▶ "Pink + White — Frank Ocean"

**Compatibility section (unique to viewing another profile):**
- Large compatibility score: **94%**
- Breakdown bars:
  - Artist overlap: 88%
  - Genre match: 95%
  - Era alignment: 91%
  - Listening energy: 82%
- Shared artists: Frank Ocean, SZA, Sade, Brent Faiyaz
- "14 shared artists · 8 shared songs · 5 shared genres"

**Action buttons:**
- `Follow` (ghost) | `Connect` (primary — amber)
- Below: "Connect to unlock DMs and interactions"

**Their Taste DNA:**
- Indie R&B: 81%
- Neo-Soul: 67%
- Jazz: 43%

**Their OG Badges:**
- Frank Ocean: `🌟 Founder`
- Noname: `🔥 Day One`

---

### Screen 6: DM Conversation (Jamie Chen)

**Header:** Back | Jamie Chen `94%` | ▶ Pink + White

**Message bubbles:**
- Jamie: "ok wait our 94% is sending me 😭"
- Alex: "RIGHT like how is it that high"
- Jamie: "we literally have the same top 5 artists"
- Alex: "frank ocean been carrying both of us clearly"
- Jamie: "which album got you first though"
- Alex: "blonde obviously. you?"
- Jamie: "channel orange changed my life ngl"

**AI suggestion chip above input:**
> 💡 "You both saved 'Ivy' — ask them when they first heard it"

**Input bar:** Text field + send button

---

## Demo Navigation Flow
```
Landing Page
    └── /demo → Opens to Profile screen (Screen 1)

Bottom Nav:
    ⊕ → Discover (Screen 2)
    ▦ → Feed (Screen 3)
    ✉ → Messages (Screen 4)
    ♪ → Profile (Screen 1)

Discover → tap user card → User Profile (Screen 5)
Messages → tap conversation → DM (Screen 6)
User Profile → tap Connect → shows "Request Sent" state
```

---

## Interaction Details

### Compatibility Score Animation
- When viewing another profile, the score counts up from 0 to final number
- Duration: 1.2s, easing: ease-out
- The breakdown bars fill simultaneously

### Now Playing Pulse
- Small green dot next to "listening now" text
- Subtle pulse animation (scale 1 → 1.3 → 1, 2s loop)

### Badge Tooltips
- Tap any badge → small tooltip appears above explaining what it means
- Tap elsewhere → dismisses

### Locked Interactions
- Feed posts from non-connected users show 🔒 on interaction areas
- Tapping locked area shows: "Connect with [name] to unlock"

### OG Fan Cards
- Subtle golden glow on Founder badge cards
- Numbers animate counting up (listener count growth)

### Wrap Cards
- Horizontal scroll with snap
- Each card has Spotify-green or Apple-red accent depending on platform
- Tap card → expands to show more detail (top 5 artists of that year)

---

## Visual/Style Notes
- Phone frame: dark bezel, rounded corners (iPhone-style)
- Status bar at top: 9:41, signal, battery icons
- All backgrounds: `#0A0A0A` to `#141414`
- Accent: `#E8A838` amber for primary actions, badges, highlights
- Compatibility scores: `#4CAF7D` green
- OG Fan gold: `#FFD700` with glow
- Font: Same as landing page — consistent brand
- Transitions between screens: slide left/right (native-feel)
- Bottom nav active state: amber underline + icon color change
