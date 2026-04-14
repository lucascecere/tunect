# Tunect — Project Overview & Master Brief

## What Is Tunect?
Tunect is a music-first social platform where your listening history *is* your identity. It is **not** a streaming app — it's a social layer built on top of streaming platforms (Spotify, Apple Music, etc.) that connects people with similar music taste.

**Core thesis:** Music taste is the deepest signal of who you are. Tunect uses real listening data to help people find their people.

**Tagline:** "Find your people through music."

## Target User
- Age: 16–25
- Music-obsessed, uses Spotify or Apple Music daily
- Wants to find friends/connections online based on genuine shared taste
- Currently shares Spotify links over Instagram DMs or iMessage — no dedicated space for music-based connection

## The Problem
Spotify shows you what your friends listen to. There's no app that helps you find strangers you *should* be friends with — based on real listening data, not self-reported genre preferences.

## The Solution
Tunect reads your full listening history via Spotify OAuth and builds a living profile around it. Compatibility scores are calculated between users. You discover people. You connect. Relationships are built on the most honest signal available — what you actually listen to when no one's watching.

---

## Platform Strategy
- **Phase 1 (Launch):** Spotify only (OAuth + API)
- **Phase 2:** Apple Music integration
- **Phase 3:** Tidal, YouTube Music, Amazon Music
- **Vision:** Platform-agnostic — your Tunect profile pulls from wherever you listen. Someone on Apple Music and someone on Spotify can still match and connect.

---

## Brand Identity

### Voice & Tone
- Confident, not corporate
- Speaks like a music fan, not a tech company
- "Your people" not "your network"
- Raw and real — music is personal, the brand reflects that

### Visual Direction
- Dark-first (dark backgrounds, rich colors)
- Deep blacks, warm accent colors (think vinyl record warmth — amber, gold, deep red)
- Clean typography with character — not generic sans-serifs
- Waveform and vinyl-inspired visual motifs
- Feels like a music magazine crossed with a modern social app

### Color Palette
- Background: `#0A0A0A` (near black)
- Surface: `#141414`
- Card: `#1C1C1C`
- Primary accent: `#E8A838` (warm amber/gold)
- Secondary accent: `#C23B3B` (deep red)
- Text primary: `#F5F5F5`
- Text secondary: `#888888`
- Compatibility green: `#4CAF7D`

### Typography Direction
- Display/headings: Something with character — editorial, bold
- Body: Clean, readable, modern
- Avoid: Inter, Roboto, Arial, Space Grotesk

---

## Key Differentiators vs. Competition

| Feature | Tunect | Spotify Social | Last.fm |
|---|---|---|---|
| Music-based compatibility scoring | ✓ | ✗ | ✗ |
| Discover strangers | ✓ | ✗ Friends only | ⚠️ Limited |
| OG Fan Tracker | ✓ | ✗ | ✗ |
| Listening history museum | ✓ | ✗ | ✗ |
| Annual Wraps archive | ✓ | ✗ | ✗ |
| Social-first design | ✓ | ✗ | ✗ |

**The one-liner:** "Spotify tells you what your friends listen to. Tunect finds you the people you haven't met yet."

---

## Files in This Project
- `00-PROJECT-OVERVIEW.md` — This file. Master context.
- `01-LANDING-PAGE.md` — Landing page full spec
- `02-DEMO-APP.md` — Interactive demo full spec
- `03-PRODUCT-FEATURES.md` — Full product feature definitions
- `04-COPY-BANK.md` — All approved copy, headlines, microcopy
- `05-BUILD-INSTRUCTIONS.md` — Build order, tech decisions, quality checklist
- `06-DISCOVER-TAB.md` — Discover tab: Instagram Explore + Tinder card hybrid
- `07-CONCERTS-FEATURE.md` — Concerts tab: personalized show discovery, matchmaking
- `08-pricing.md` — Pricing model: Free vs Pro, upgrade triggers, ad policy
