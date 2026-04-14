# Claude Code — Build Instructions for Tunect

## How to Use These Files

This folder contains the complete spec for the Tunect landing page and interactive demo.
Read all files before writing any code. They are the source of truth.

---

## File Index

| File | Purpose |
|---|---|
| `00-PROJECT-OVERVIEW.md` | Brand, colors, fonts, competitive context |
| `01-LANDING-PAGE.md` | Full landing page section-by-section spec |
| `02-DEMO-APP.md` | Interactive demo — all 6 screens, interactions, flows |
| `03-PRODUCT-FEATURES.md` | Complete product feature definitions |
| `04-COPY-BANK.md` | All approved copy, headlines, microcopy |
| `05-BUILD-INSTRUCTIONS.md` | This file |
| `06-DISCOVER-TAB.md` | Discover tab: Instagram Explore + Tinder card hybrid spec |
| `07-CONCERTS-FEATURE.md` | Concerts tab: personalized show discovery, matchmaking |
| `08-pricing.md` | Pricing model: Free vs Pro, upgrade triggers, ad policy |

---

## What to Build

### Deliverable 1: Landing Page (`/`)
A conversion-focused landing page that:
- Tells the Tunect story in a compelling, music-fan-native way
- Captures waitlist email signups
- Links to the demo at `/demo`
- Feels premium, dark, music-magazine-meets-social-app

**Reference:** `01-LANDING-PAGE.md` for structure, `04-COPY-BANK.md` for all copy, `00-PROJECT-OVERVIEW.md` for brand/colors

### Deliverable 2: Interactive Demo (`/demo`)
A fully clickable mobile app demo that:
- Shows the app running in an iPhone-style frame
- Has 6 navigable screens (Profile, Discover, Feed, Messages, User Profile, DM)
- Uses realistic fake data (Alex Rivera as the demo user)
- Feels like a real app — smooth transitions, animations, interactions

**Reference:** `02-DEMO-APP.md` for all screen specs and interaction details

---

## Tech Decisions

### Framework
- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- Deploy to **Vercel**

### Fonts
Do NOT use Inter, Roboto, or Arial. Choose something with character.
Suggestions (all available on Google Fonts):
- Display: **DM Serif Display**, **Playfair Display**, **Archivo Black**, or **Syne**
- Body: **DM Sans**, **Plus Jakarta Sans**, or **Outfit**
Pick a pairing that feels like a premium music editorial magazine.

### Colors (use as CSS variables)
```css
:root {
  --bg: #0A0A0A;
  --surface: #141414;
  --card: #1C1C1C;
  --accent: #E8A838;        /* amber/gold — primary */
  --accent-red: #C23B3B;    /* deep red — secondary */
  --text: #F5F5F5;
  --text-muted: #888888;
  --green: #4CAF7D;         /* compatibility scores */
  --og-gold: #FFD700;       /* OG fan badges */
  --border: #2A2A2A;
}
```

---

## Landing Page — Build Order

1. **Layout shell** — nav, footer, page structure
2. **Hero section** — headline, subheadline, CTAs, phone mockup
3. **Problem statement** — emotional hook
4. **How it works** — 3 steps
5. **Feature highlights** — 5 features (compatibility, museum, OG tracker, wraps, connect)
6. **Badge showcase** — grid of badges
7. **Pricing** — free vs pro comparison
8. **Research section** — 3 stat cards
9. **Waitlist CTA** — email capture form
10. **Animations** — add scroll-triggered reveals, counting numbers, floating elements

### Phone Mockup (Hero)
Build the phone as HTML/CSS — not an image. It should show the Discover tab with:
- 3 user cards with compatibility scores (94%, 81%, 67%)
- "▶ listening now" indicators
- Bottom navigation
This makes it easy to update and looks sharper than a screenshot.

### Waitlist Form
Use **Formspree** (free tier) for email capture to start:
```
action="https://formspree.io/f/YOUR_FORM_ID"
method="POST"
```
Or build an API route if Supabase is already set up.

---

## Demo App — Build Order

1. **Phone frame shell** — iPhone-style container, status bar, bottom nav
2. **Screen 1: Profile** — the most complex screen, build first
3. **Navigation system** — bottom nav switching between screens
4. **Screen 2: Discover** — user cards with compatibility scores
5. **Screen 5: User Profile** — accessed from Discover (tap on a user)
6. **Screen 3: Feed** — auto-generated posts, locked interactions
7. **Screen 4: Messages** — conversation list
8. **Screen 6: DM** — conversation view
9. **Animations** — compatibility count-up, badge tooltips, transitions
10. **Polish** — Now Playing pulse, scroll behaviors, hover states

### Demo State Management
Use React useState to track:
- `currentScreen` — which of the 6 screens is active
- `selectedUser` — which user was tapped in Discover (to populate User Profile screen)
- `badgeTooltip` — which badge tooltip is showing (null if none)
- `wrapExpanded` — which wrap card is expanded (null if none)

### Screen Transitions
- Screens slide left when navigating forward
- Screens slide right when going back
- Bottom nav switches use fade transition (not slide)
- Use Framer Motion `AnimatePresence` for this

---

## Specific Component Notes

### Compatibility Score Display
```
Large number (e.g., "94%") in --green color
Below: 4 bars (Artist overlap, Genre match, Era alignment, Listening energy)
Each bar: label on left, percentage on right, animated fill
Count-up animation: starts at 0, reaches final value in 1.2s
Trigger: when component enters viewport
```

### OG Fan Cards
```
Card layout:
- Artist name (bold)
- Badge tier (emoji + label)
- "You listened when they had [X] listeners."
- "They now have [Y] monthly listeners."
Gold glow effect on Founder cards: box-shadow: 0 0 20px rgba(255, 215, 0, 0.3)
```

### Badge Shelf
```
Horizontal scroll row
Each badge: pill shape, icon + label
Tap → tooltip appears above badge
Tooltip: badge name (bold) + explanation copy (from 04-COPY-BANK.md)
Tooltip dismisses on tap elsewhere
```

### Now Playing Indicator
```
Small circle, --green color
CSS animation:
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
  }
  animation: pulse 2s ease-in-out infinite;
```

### Locked Feed Interactions
```
Post card: normal display
Interaction area (like/comment zone):
  - Greyed out
  - 🔒 icon
  - Cursor: default (not pointer)
  - Tap: shows small toast "Connect with [name] to interact"
```

### Wrap Cards (Hall of Fame)
```
Horizontal scroll with CSS scroll-snap
Each card:
  - Platform color header (Spotify green #1DB954, Apple red #FC3C44)
  - Year (large, bold)
  - #1 Artist
  - Total minutes
  - Top genre
  - Platform logo/wordmark
Tap to expand: shows top 5 artists + songs in a modal/sheet
```

---

## What NOT to Build (Yet)
- Actual Spotify OAuth (demo uses fake data)
- Real backend/database (landing page waitlist uses Formspree)
- Push notifications
- Real-time data
- Payments/subscription handling

These are for the real app build in Claude Code with Supabase. The landing page and demo are pure frontend.

---

## Quality Checklist Before Shipping

### Landing Page
- [ ] All 9 sections present
- [ ] Waitlist form submits and shows success state
- [ ] Demo link works (`/demo`)
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] Animations trigger on scroll (not on load)
- [ ] No generic fonts (Inter, Roboto, Arial)
- [ ] Dark theme throughout — no jarring white sections
- [ ] Copy matches `04-COPY-BANK.md` exactly

### Demo
- [ ] All 6 screens built
- [ ] Bottom nav navigates correctly
- [ ] Back navigation works (User Profile → Discover, DM → Messages)
- [ ] Badge tooltips work
- [ ] Compatibility score animates on User Profile screen
- [ ] Wrap cards horizontal scroll works
- [ ] OG Fan cards display correctly
- [ ] Now Playing pulse animation running
- [ ] Locked interactions show lock state
- [ ] Feels like a real app (smooth, no janky transitions)
- [ ] Phone frame looks correct on desktop and mobile

---

## Deployment
- Push to GitHub
- Connect repo to Vercel
- Set domain: tunect-landing.vercel.app (or custom domain later)
- No environment variables needed for pure frontend demo
- If using Formspree: add NEXT_PUBLIC_FORMSPREE_ID to Vercel env vars
