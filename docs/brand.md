# Brand Guide

## App name
**Tunect** — always lowercase in the logo, title case in prose ("Tunect is a music app").

## Tagline
**Connect through music**

## Tone
Cool, underground, emotionally real. Speaks to people who find themselves in music. Not corporate, not bubbly. Think: the kid who had a song for every moment of their life.

---

## Colors

```ts
// constants/colors.ts
export const colors = {
  primary:      '#1A56DB',  // deep blue — CTA buttons, active states
  primaryMid:   '#3B82F6',  // blue 500 — secondary actions, highlights
  primaryLight: '#93C5FD',  // blue 300 — glows, now playing pulse
  primaryGhost: '#1A56DB22',// blue tint — subtle backgrounds

  bgBase:      '#0A0A0A',   // main background
  bgSurface:   '#141414',   // cards, bottom sheets
  bgElevated:  '#1E1E1E',   // modals
  bgBorder:    '#2A2A2A',   // dividers

  textPrimary:   '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted:     '#505050',

  success: '#22C55E',
  error:   '#EF4444',
  warning: '#F59E0B',

  // Compatibility score colors
  matchStrong: '#22C55E',   // 80–100
  matchGood:   '#3B82F6',   // 60–79
  matchFair:   '#F59E0B',   // 40–59
  matchLow:    '#505050',   // 0–39
}
```

---

## Logo

The Tunect icon is a deep blue square with rounded corners (rx=30) containing:
- A white eighth note (stem + flag + note head)
- Two small white dots with dashed connector lines — representing connection between people

SVG source is in `/docs/logo.svg`. Use this file for the app icon, landing page, and any branded assets.

**Usage rules:**
- Minimum size: 32×32px
- Always use on dark or deep blue backgrounds
- Never stretch or recolor the icon
- Wordmark: `tunect` in lowercase, weight 500, letter-spacing -0.5px, color white or #1A56DB

---

## Typography

### App (React Native)
- System font stack (`-apple-system`, `SF Pro`)
- Sizes: 11 / 13 / 15 / 17 / 20 / 24 / 30
- Weights: 400 regular, 500 medium, 700 bold

### Landing page (web)
- Display: `"DM Sans"` (Google Fonts) — headings
- Body: `"Inter"` — body text (exception to generic rule — works here because of pairing with DM Sans)
- OR use `"Syne"` for display + `"Manrope"` for body — more distinctive

---

## Landing page design direction

Dark background (#0A0A0A). Hero section: large headline, app icon, phone mockup. Sections: How it works, Compatibility score demo, Features. CTA: "Get early access" email capture.

Feel: like a premium music app announcement. References: Spotify brand campaigns, Linear.app launch pages.

---

## Music personality labels

Assign based on genre distribution in user's top artists:

| Pattern | Label |
|---------|-------|
| Heavy indie/alt-rock | "Indie Nocturnal" |
| Mostly hip-hop | "Hip-Hop Purist" |
| Wide spread (5+ genres >10%) | "Genre Fluid" |
| Heavy pop | "Pop Maximalist" |
| Electronic/dance dominant | "Frequency Chaser" |
| R&B/soul dominant | "Soul Keeper" |
| Rock, older catalog | "Classic Devotee" |
| Jazz/lo-fi/ambient | "Slow Burn Listener" |
| Metal/punk | "Loud and Proud" |
| Latin dominant | "Ritmo Core" |
