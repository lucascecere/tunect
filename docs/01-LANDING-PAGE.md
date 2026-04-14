# Tunect — Landing Page Spec

## Purpose
Convert visitors into waitlist signups. Tell the story of what Tunect is, why it matters, and make them feel like they need to be in early.

## Tech Stack
- Next.js (or plain HTML/CSS/JS if simpler for Vercel deploy)
- Tailwind CSS
- Framer Motion for animations
- Deploy target: Vercel

## URL Structure
- `/` — Main landing page
- `/demo` — Interactive app demo (see `02-DEMO-APP.md`)
- `/privacy` — Privacy policy (placeholder)

---

## Page Structure & Sections

### 1. Navigation
- Logo: `tunect` (lowercase, wordmark only — no icon needed)
- Right side: `Try Demo` (ghost button) + `Get Early Access` (primary CTA button)
- Sticky on scroll, slight blur backdrop
- Mobile: hamburger collapses to just logo + CTA

### 2. Hero Section
**Headline (large, bold, display font):**
> "Find your people through music."

**Subheadline:**
> "Tunect reads your real listening history and builds a compatibility score with everyone. Not genre labels. Not what you say you like. What you actually play."

**CTAs:**
- Primary: `Get Early Access` — scrolls to waitlist form
- Secondary: `Try the demo →` — links to `/demo`

**Visual:**
- Animated phone mockup showing the Discover tab with compatibility scores
- Background: dark with subtle animated waveform or particle effect
- Floating badges (Soul Keeper, OG Fan, Day One) drifting in from the sides

**Social proof line (below CTAs):**
> "Join [X] people already on the waitlist"

---

### 3. Problem Statement Section
**Headline:**
> "Music is the closest thing to your soul. So why is it buried in a streaming app?"

**Body:**
> Spotify shows you what your friends are playing. Apple Music has Replay. But no app has ever asked the real question: *who else in the world listens the way you do?*
>
> Tunect is the answer.

**Visual:** Split — left shows generic Spotify friend feed, right shows Tunect compatibility breakdown. Contrast the two.

---

### 4. How It Works — 3 Steps
**Section headline:** "Three steps to your sound."

**Step 1 — Connect**
Icon: Spotify/Apple Music logo
> "Log in with Spotify or Apple Music. We read your listening history — never your playlists, never posting to your account."

**Step 2 — Get your profile**
Icon: Profile/DNA icon
> "Your Music Museum builds automatically. Top artists, Taste DNA, listening eras, OG Fan badges — always live, always yours."

**Step 3 — Find your people**
Icon: Two people / connection icon
> "Browse users by compatibility score. Follow freely. DMs and interactions unlock when both of you connect — so every conversation starts with real mutual interest."

---

### 5. Feature Highlights — Key Features

#### Feature 1: Compatibility Score
**Headline:** "Not just the same artist. The same feeling."
**Body:** "Your compatibility score is built from artist overlap, genre match, era alignment, and listening energy. It's the difference between someone who likes rap and someone who listens to the same corner of rap you do at 2am."
**Visual:** Compatibility breakdown UI — showing the 4 components as a visual breakdown

#### Feature 2: Music Museum
**Headline:** "Your taste. Your history. Your identity."
**Body:** "Your profile is a living archive of everything you've ever listened to. Week, month, year, all time. Watch your taste evolve. Show people exactly who you are through the only thing that never lies — what you actually listen to."
**Visual:** Profile screen showing listening eras timeline

#### Feature 3: OG Fan Tracker ⭐
**Headline:** "You heard them first. Now you can prove it."
**Body:** "When you listen to an artist before they blow up, we lock that timestamp to your profile. If they hit a million streams later, you were there first — and Tunect has the receipts."
**Badge tiers visual:**
- 🔥 Early Fan — before 500K monthly listeners
- 🔥 OG Fan — before 100K monthly listeners
- 🔥 Day One — before 10K monthly listeners
- 🌟 Founder — before 1K monthly listeners
**Visual:** OG Fan badge on a profile, with "You discovered them 2 years ago. They now have 4.2M listeners."

#### Feature 4: Wraps Hall of Fame
**Headline:** "Your Wrapped deserves to live forever."
**Body:** "Every year you get a Spotify Wrapped or Apple Music Replay. Every year it disappears by January. Tunect archives every single one on your profile — a permanent, scrollable record of your musical years."
**Visual:** Profile showing Wrapped cards from 2021, 2022, 2023, 2024, 2025 stacked

#### Feature 5: Mutual Connect
**Headline:** "Every conversation starts with real interest."
**Body:** "Follow anyone freely. But DMs, comments, and interactions only unlock when both of you connect. No cold messages from strangers. Just people who actually want to talk."
**Visual:** Connect button UI, DM unlocking animation

---

### 6. Badge System Showcase
**Headline:** "Earn your badge. Wear your taste."
**Body:** "Badges are earned automatically from your listening data. No self-reporting. No faking it."

**Show a grid of badges with names:**
- Soul Keeper
- Trap Lord
- Indie Kid
- Jazz Head
- Metal Warrior
- Night Owl (listens mostly after midnight)
- Deep Diver (full albums, not singles)
- Loyalist (same top artist 3+ months)
- Genre Hopper (high diversity score)
- OG Fan / Day One / Founder

---

### 7. Pricing Section
**Headline:** "Free forever. Pro if you want more."

**Free — $0/month**
- Full music profile + Taste DNA
- Compatibility scores with all users
- OG Fan Tracker
- Music Museum (full history)
- Wraps Hall of Fame
- Unlimited follows + Discover tab
- Mutual Connect + DMs
- Up to 10 active connect requests

**Pro — $2.99/month** (or $24.99/year — save 30%)
- Everything in Free
- Ad-free everywhere
- See who viewed your profile
- Deep compatibility breakdown
- Unlimited connect requests
- Profile customization + pinned track
- Extended listening history stats
- Pro badge on profile

---

### 8. Research-Backed Trust Section
**Headline:** "Science already knew it. We built it."

**Stat cards (cite real research):**
- "Shared music preferences create social bonds by signaling similar values" — *Personality and Social Psychology Bulletin*
- "Music taste is an honest signal of the group we belong to, revealing who we are and where we grew up" — *Oxford University*
- "Listening to music increases levels of cooperation, interaction, and conversation" — *UC Berkeley Greater Good*

---

### 9. Waitlist CTA Section
**Headline:** "Music is how you know someone. We built the app for that."
**Subheadline:** "Join the waitlist. No spam. Just an invite when we launch."

**Form:**
- Email input field
- Optional: "What platform do you use?" dropdown (Spotify / Apple Music / Both / Other)
- Submit button: `Get Early Access`
- Below form: "🔒 We never share your email. Cancel anytime."

---

### 10. Footer
- Logo
- Links: Privacy Policy | Try Demo
- © 2025 Tunect
- Tagline: "Connect through music."

---

## Animation & Interaction Notes
- Hero phone mockup: subtle floating animation (translateY loop)
- Compatibility score: animates counting up when scrolled into view
- Badge grid: staggered fade-in on scroll
- Feature sections: alternate left/right layout, slide in on scroll
- OG Fan badges: glow effect on hover
- Waitlist form: success state shows "You're on the list 🎵"

## Performance Notes
- Dark background throughout — no jarring light sections
- Mobile-first responsive
- All phone mockups should be CSS/HTML mock-ups, not image files (easier to maintain)
- Waitlist form can use a simple API route or Formspree/Mailchimp for now
