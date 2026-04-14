# Tunect — Pricing & Monetization

## Model overview

Freemium. Free tier is fully functional — no time limits, no feature walls on core social experience. Pro is an enhancement layer for power users who want more depth, more customization, and no ads.

Monetization streams:
1. Pro subscriptions (primary)
2. In-feed advertising (secondary, free tier only)

---

## Free tier

Everything a normal user needs to get real value from Tunect.

### Included
- Full music profile (now playing, top artists, top tracks, taste DNA, personality label)
- Compatibility scores with all users
- Full Discover tab — ranked by compatibility, all filters
- Unlimited follows
- Up to 10 active outgoing connect requests at one time
- DMs with all mutual connections
- Full feed (Following + For You)
- Manual song sharing in feed and DMs
- Basic compatibility view — score % + shared artists

### Limitations
- Ads shown in feed (music-relevant only — see ad policy below)
- Cannot see who viewed their profile
- Connect requests capped at 10 active at once (accepted/declined requests free up slots)
- Basic compatibility breakdown only (score + shared artists)
- No profile customization

---

## Pro tier — $2.99/month or $24.99/year

### Billing options
| Plan | Price | Savings |
|------|-------|---------|
| Monthly | $2.99/mo | — |
| Annual | $24.99/yr | Save 30% |

Annual plan should be the visually prominent default on the upgrade screen.

### Pro features
| Feature | Detail |
|---------|--------|
| Ad-free | No ads anywhere in the app, ever |
| Profile views | See a full list of who viewed your profile, with timestamps. Shows last 30 days. |
| Deep compatibility | Full breakdown: era overlap, energy match, obscurity score, listening pattern similarity — in addition to standard score |
| Unlimited connects | No cap on active outgoing connect requests |
| Profile customization | Accent color (blue variants), pinned track on profile, custom bio link |
| Full listening history | Extended stats beyond top 50 — deeper data pulls |
| Priority in Discover | Pro profiles ranked slightly higher when compatibility scores are equal |
| Pro badge | Small blue indicator on profile and user cards |

---

## Upgrade triggers — where to show the upsell

These are the moments users naturally hit a Pro wall. Show a smooth, non-aggressive upgrade prompt.

### 1. Connect request cap (strongest trigger)
When user tries to send their 11th connect request:
```
You've reached your connect limit

Free accounts can have 10 active requests at a time.
Upgrade to Pro for unlimited connects.

[Upgrade to Pro — $2.99/mo]
[Maybe later]
```

### 2. Profile views teaser
On own profile, show a blurred/locked section:
```
3 people viewed your profile this week

[Unlock with Pro]
```
Always show the count even on free — just lock the identities. The curiosity is the hook.

### 3. Compatibility breakdown lock
On other user's profile, after the basic score show a locked card:
```
[Deep compatibility — Pro]
Era overlap · Energy match · Obscurity score
[Unlock full breakdown]
```

### 4. Settings — upgrade entry point
Always accessible from Settings > Upgrade to Pro.

### 5. Profile customization prompt
When user taps Edit Profile and tries to change accent color or add pinned track:
```
Profile customization is a Pro feature
[Upgrade to Pro]
```

---

## Upgrade screen design

Full screen modal, dark background.

Layout:
1. Tunect Pro badge + "Unlock the full experience"
2. Feature list with blue checkmarks (all 8 Pro features)
3. Billing toggle: [Monthly $2.99] [Annual $24.99 — Best value badge]
4. Primary CTA: "Start Pro" (blue, full width)
5. Fine print: "Cancel anytime. Billed via App Store / Google Play."
6. "Maybe later" text link at bottom — always present, never hidden

Annual plan is selected by default. User must actively tap to switch to monthly.

---

## In-app purchases implementation

Use `expo-in-app-purchases` or `react-native-purchases` (RevenueCat — recommended).

RevenueCat handles:
- App Store + Google Play billing
- Subscription state management
- Receipt validation
- Webhooks to Supabase on subscription events

### Supabase schema addition
```sql
alter table users add column
  pro_status text default 'free', -- 'free' | 'pro'
  pro_expires_at timestamptz,
  revenuecat_id text;
```

### Pro status check pattern
```ts
// hooks/usePro.ts
export function usePro() {
  const { user } = useAuthStore()
  const isPro = user?.pro_status === 'pro'
    && user?.pro_expires_at
    && new Date(user.pro_expires_at) > new Date()
  return { isPro }
}

// Usage in any component
const { isPro } = usePro()
if (!isPro) return <UpgradePrompt feature="profile-views" />
```

---

## Ad policy (free tier)

Ads must feel like content, not noise. Tunect's brand depends on this.

### Acceptable ad types
- Music festival lineups and ticket promotions
- New album / artist announcements (Spotify, Apple Music promoted)
- Music gear and equipment (headphones, instruments)
- Music streaming service promotions
- Concert and live event discovery apps

### Never acceptable
- Generic DTC products (skincare, supplements, etc.)
- Political ads
- Gambling
- Anything unrelated to music culture

### Ad placement
- 1 ad unit per 8 feed posts (not more frequent)
- Clearly labeled "Sponsored"
- Same card design as feed posts — not a banner, not a popup
- No full-screen interstitials ever

### Ad implementation (Phase 2)
For MVP: no ads yet. Build the Pro subscription first. Add ads in Phase 2 once user base exists.

---

## Financial model (rough)

At 1,000 active users:
- 5% Pro conversion = 50 Pro users
- 50 × $2.99/mo = ~$150/mo revenue
- Enough to cover Supabase, Expo EAS, and domain costs

At 10,000 active users:
- 8% Pro conversion = 800 Pro users
- 800 × $2.99/mo = ~$2,400/mo
- Sustainable indie app

Goal: hit 1,000 active users before spending on paid acquisition. Organic growth via shareable moments (personality reveal, compatibility screenshots, wrapped-style cards).
