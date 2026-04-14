# Tunect — Discover Tab (Updated Spec)

## Concept
Discover is a hybrid of Instagram Explore + Tinder card swiping.

- **Instagram Explore layer:** Grid/category view with filter chips. Pick a category (location, genre, etc.) and enter a focused feed.
- **Tinder card layer:** Inside each category, profiles are presented as swipeable multi-slide cards. Swipe right to connect, swipe left to pass, tap to expand.

This means zero learning curve — users already know both patterns.

---

## Layout: Two Modes

### Mode 1: Browse Mode (Default)
What you see when you first open Discover.

**Header:**
- "Discover" title
- 🔍 search icon (search by username)

**Compatibility strip (top):**
- Horizontal scroll of user avatars, sorted by compatibility %
- Label: "Your top matches"
- Each avatar shows: photo/initial + compatibility % below
- Tap avatar → enters that user's profile card directly

**Category Grid:**
Instagram Explore-style grid of category tiles. Each tile has:
- Background image/gradient relevant to category
- Category label (bold, white)
- User count: "2.4K people"

**Category tiles to include:**
- 📍 Near Me *(location-based)*
- 🏙️ [User's City] — e.g. "Boston"
- 🎵 Indie R&B
- 🎸 Alternative
- 🎤 Hip-Hop
- 🎹 Jazz
- 🎧 Electronic
- 🤘 Metal
- 🎻 Classical
- 🌍 World Music
- 🦉 Night Owls *(users with Night Owl badge)*
- 🏅 OG Fans *(users with OG Fan badges)*
- 🌟 Founders *(users with Founder badges)*
- 🧠 Deep Divers *(album listeners)*
- 🔥 Live Now *(currently playing music)*
- ✨ New Members *(joined in last 7 days)*

**Category tile design:**
- 2-column grid (like Instagram Explore)
- Featured tile occasionally spans full width (like IG's big featured post)
- Gradient overlay on each tile — dark at bottom, transparent at top
- Genre tiles use color-coded gradients:
  - Indie R&B: warm amber/peach
  - Hip-Hop: deep purple/black
  - Jazz: navy/gold
  - Electronic: cyan/blue
  - Metal: dark red/black
  - Classical: cream/brown

---

### Mode 2: Category Feed Mode
Entered when user taps a category tile.

**Header:**
- Back arrow ← | Category name (e.g., "Boston" or "Indie R&B") | Filter icon
- Sub-header: "Sorted by compatibility · 847 people"

**Feed: Tinder-style swipeable profile cards**
Full-screen swipeable cards (one at a time, like Tinder).

Each card is a **multi-slide profile** — user swipes horizontally within the card to see different slides.

---

## Profile Card Structure (Inside Category Feed)

Each profile card has **4 slides**. User swipes left/right within the card to browse slides. Swipe UP to connect, swipe DOWN (or tap X) to pass.

### Slide 1: First Impression
- Full card background: blurred album art of their currently playing (or last played) track
- Top overlay (dark gradient):
  - Avatar (large circle) + Name + @handle
  - Compatibility score: big, prominent — `94% compatible`
  - Personality badge: `🎵 Soul Keeper`
  - Location: "Boston, MA" (if shared)
- Bottom overlay (dark gradient):
  - Now Playing: ▶ "Novacane — Frank Ocean" (with pulse dot)
  - Swipe hint: `← Swipe to see more  ·  ↑ Connect  ·  ↓ Pass →`

### Slide 2: Taste DNA
- Background: dark card
- Header: "Taste DNA"
- Genre bars (animated):
  - Indie R&B: 72%
  - Neo-Soul: 54%
  - Alt-Pop: 38%
  - Jazz: 21%
- "Shared with you:" section below
  - Shared artists (chips): Frank Ocean · SZA · Sade
  - "14 shared artists · 5 shared genres"
- Compatibility breakdown mini-bars:
  - Artist overlap: 88%
  - Genre match: 95%
  - Era alignment: 91%

### Slide 3: OG Badges & Highlights
- Background: dark card with subtle gold tint
- Header: "Their cred 🏆"
- OG badge cards (compact):
  - Frank Ocean — 🌟 Founder — "800 listeners → 18.4M"
  - Steve Lacy — 🔥 Day One — "6K listeners → 8.1M"
  - Brent Faiyaz — 🔥 OG Fan — "74K listeners → 12.3M"
- Badge shelf below: Soul Keeper · Night Owl · Deep Diver
- "Top album this month": *Blonde* — Frank Ocean

### Slide 4: Connect Prompt
- Background: dark with amber accent glow
- Large compatibility score centered: "94%"
- "You and Jamie Chen share:"
  - 14 artists · 8 songs · 5 genres
- Two action buttons (large, full-width):
  - ✓ Connect (amber, primary)
  - ✗ Pass (ghost, secondary)
- Below: "You can always find them in Discover later"
- Slide indicator dots (4 dots, current slide highlighted)

---

## Swipe Gestures (Card Navigation)

### Within a profile card (horizontal swipe):
- Swipe LEFT on card → next slide (Slide 1 → 2 → 3 → 4)
- Swipe RIGHT on card → previous slide
- Slide indicator dots show position

### Between profiles (vertical swipe OR action):
- **↑ Swipe UP** on card → Connect (same as tapping Connect button)
- **↓ Swipe DOWN** on card → Pass (move to next profile)
- **Tap X button** → Pass
- **Tap ✓ button** → Connect

### Connect action:
- Card animates: scale up slightly + green glow + "Connect Sent ✓" overlay
- Card slides away (up direction)
- Next profile card slides in from bottom

### Pass action:
- Card animates: slides away (down direction) or fades
- Next profile card slides in

---

## Additional Interaction Details

### Slide Indicator
- 4 dots at bottom of each card
- Active dot: white, slightly larger
- Inactive dots: white at 30% opacity
- Positioned above the action buttons on Slide 4, or bottom-center on Slides 1-3

### Card Stack Effect
- Behind the active card, show 2 ghost cards (slightly scaled down, offset down)
- Creates depth — feels like a real deck
- Stack count: "47 more in Boston" shown below stack

### Profile Expansion
- Tap on name/avatar on any slide → opens full profile view (Screen 5 from original spec)
- Full profile shows complete Music Museum, all badges, Wraps Hall of Fame
- Back arrow returns to category feed at same position

### Undo
- Shake gesture or "Undo" button (appears briefly after passing) → brings back previous card
- Max 1 undo per session on free tier, unlimited on Pro

---

## Filter System (Inside Category Feed)

Tap filter icon in header → bottom sheet slides up with:

**Sort by:**
- Compatibility (default)
- Recently joined
- Most active

**Refine:**
- Compatibility minimum: slider (0% – 100%, default 0%)
- Online status: Any | Live now only
- Has OG badges: toggle
- Age range: 16–18 | 18–25 | 25+ | Any

**Apply Filters** button (amber, full-width)
**Reset** link

---

## Location Handling

### "Near Me" category:
- Requests location permission on tap
- Permission prompt copy: "Tunect uses your location to show you people nearby. We never share your exact location."
- Shows users within configurable radius (default 25 miles)
- Location shown as city only on profiles — never exact address

### City categories (e.g., "Boston"):
- Auto-populated based on user's location on signup
- Other city categories surfaced based on listening patterns (e.g., if user listens to artists from Atlanta, "Atlanta" may appear)

### Privacy:
- Location sharing is opt-in
- Can set to: Exact city | General area (50mi radius) | Hidden
- Hidden = don't appear in any location categories

---

## Empty States

- No profiles in category: "No one in [category] yet. Check back soon — or invite a friend."
- All profiles passed: "You've seen everyone in [Boston] for now. Check back tomorrow or explore another category."
- Filters too narrow: "No one matches those filters. Try widening your search."

---

## Updates to Make in Demo (02-DEMO-APP.md)

Replace the current Discover screen (Screen 2) with:

**Browse Mode (default Discover view):**
- Compatibility strip at top (3-4 avatars with % scores)
- Category grid (2-column, 6-8 tiles visible):
  - Near Me | Boston | Indie R&B | Hip-Hop | Night Owls | OG Fans | Live Now | New Members

**Category Feed (tapped "Boston" or "Indie R&B"):**
- Header: ← Boston · "Sorted by compatibility · 847 people"
- Profile card stack (Jamie Chen as top card)
- 4-slide card experience as specced above
- Card stack ghost cards visible behind
- Action buttons: ✓ Connect | ✗ Pass

**Demo interactions:**
- Tapping any category tile → enters category feed mode
- Swiping left on card → advances to next slide
- Tapping Connect → connect animation → next card (Mia Torres)
- Tapping Pass → pass animation → next card
- Tapping name on card → full profile view (Screen 5)
- Back arrow → returns to Browse Mode

---

## Notes for Claude Code

### Animation library
Use **Framer Motion** for:
- Card swipe gestures (`useDragControls`, `useMotionValue`)
- Card stack depth effect
- Connect/pass animations
- Slide transitions within cards

### Gesture implementation
```
drag="y" // for connect (up) / pass (down)
dragConstraints={{ top: -200, bottom: 200 }}
onDragEnd:
  if dragY < -100 → trigger connect
  if dragY > 100 → trigger pass

// Inner slides: horizontal swipe
drag="x"
dragConstraints={{ left: 0, right: 0 }}
onDragEnd:
  if dragX < -50 → next slide
  if dragX > 50 → previous slide
```

### Card stack CSS
```css
.card-stack-1 { transform: scale(0.97) translateY(8px); z-index: 1; }
.card-stack-2 { transform: scale(0.94) translateY(16px); z-index: 0; }
.card-active   { transform: scale(1) translateY(0); z-index: 2; }
```

### State to track in demo
- `discoverMode`: 'browse' | 'category'
- `selectedCategory`: string (e.g., "Boston")
- `currentCardIndex`: number
- `currentSlide`: number (0-3)
- `lastAction`: 'connect' | 'pass' | null (for undo)
