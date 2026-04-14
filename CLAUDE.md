# Tunect — Claude Code Project Brief

## What you are building

**Tunect** is a music-based social app. Users connect their Spotify or Apple Music account and get a live, dynamic profile built from their real listening data — top artists, top tracks, genre breakdown, and what they're playing right now. The core mechanic: a compatibility score between users based on musical taste overlap.

Two deliverables:
1. **Landing page** — a marketing website (Next.js) deployed to Vercel
2. **Mobile app** — React Native (Expo) iOS app

Read all files in `/docs` before writing any code. Start with this file.

---

## Docs index

| File | Contents |
|------|----------|
| `docs/brand.md` | Colors, typography, logo usage, tone |
| `docs/tech-stack.md` | Frameworks, libraries, folder structure |
| `docs/features.md` | MVP screens, user flows, component specs |
| `docs/api.md` | Spotify OAuth flow, data endpoints, token refresh |
| `docs/00-PROJECT-OVERVIEW.md` | Brand identity, target user, competitive context, platform strategy |
| `docs/01-LANDING-PAGE.md` | Landing page full spec — all 10 sections, animations, copy direction |
| `docs/02-DEMO-APP.md` | Interactive demo — all 6 screens, interactions, navigation flows |
| `docs/03-PRODUCT-FEATURES.md` | Full product feature definitions — OG Fan, badges, compatibility, social graph |
| `docs/04-COPY-BANK.md` | All approved copy, headlines, microcopy, badge tooltips, pitch lines |
| `docs/05-BUILD-INSTRUCTIONS.md` | Build order, tech decisions, component specs, quality checklist |
| `docs/06-DISCOVER-TAB.md` | Discover tab: Instagram Explore + Tinder card swipe hybrid, category grid, 4-slide profile cards, gestures |
| `docs/07-CONCERTS-FEATURE.md` | Concerts tab: personalized show discovery, friend RSVPs, concert matchmaking, Bandsintown API, group planning |
| `docs/08-pricing.md` | Pricing model: Free vs Pro ($2.99/mo), upgrade triggers, RevenueCat, ad policy |
| `docs/schema.sql` | Supabase database schema (7 tables + RLS + Realtime) |

---

## Core rules

- **Dark mode first.** The app lives in dark mode. Design every screen dark first.
- **Mobile first.** All app screens are phone screens. 375px base width.
- **No placeholder content.** Every screen needs real copy, real empty states, real loading states.
- **Album art everywhere.** It makes the UI feel alive. Use it liberally.
- **Smooth animations.** Use React Native Reanimated. Transitions should feel premium.
- **Never expose secrets in the app.** Spotify client secret lives in a Supabase Edge Function only.

---

## Project structure

```
tunect/
├── CLAUDE.md                  ← you are here
├── docs/
│   ├── brand.md
│   ├── tech-stack.md
│   ├── features.md
│   └── api.md
├── app/                       ← Expo Router (mobile)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/
│   │   ├── index.tsx          ← home
│   │   ├── explore.tsx
│   │   ├── now-playing.tsx
│   │   ├── messages.tsx
│   │   └── profile.tsx
│   └── user/[id].tsx
├── components/
│   ├── ui/                    ← shared primitives
│   ├── profile/
│   ├── music/
│   └── explore/
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
└── landing/                   ← Next.js landing page (separate)
    ├── app/
    ├── components/
    └── public/
```

---

## Start here

Build in this order:

1. **Landing page** (`/landing`) — Next.js, Tailwind. Single page. See `docs/brand.md` for design direction and `docs/features.md` for copy.
2. **Auth screens** — signup, login, connect Spotify
3. **My Profile screen** — the core of the app
4. **Explore screen** — discover users
5. **User Profile screen** — viewing someone else
6. **Messages** — conversation list + thread

Do not build features outside the MVP scope defined in `docs/features.md`.
