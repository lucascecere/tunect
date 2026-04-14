# Tunect — Concerts Feature Spec

## Concept
Concerts is the bridge between Tunect's digital connections and real-world experiences. It uses your listening data to surface shows you'll actually care about, helps you coordinate with connects, and lets you find other Tunect users attending the same shows.

Three distinct use cases:
1. **Personal discovery** — concerts near you, personalized to your listening history
2. **Group planning** — shows your friend group collectively cares about
3. **Concert matchmaking** — find other Tunect users going to the same show

---

## Data Source
- **Primary:** Bandsintown API (concert/event data, artist tour dates)
- **Secondary:** Songkick API (backup / additional event coverage)
- **Artist data:** Spotify API (to match artists in user's listening history to touring artists)
- Ticketing: link out to Ticketmaster, Spotify, venue box office — never handle tickets in-app

---

## Where It Lives
- Bottom navigation: replace or add alongside existing tabs
- Suggested nav: ⊕ Discover | 🎤 Concerts | ▦ Feed | ♪ Profile | ✉ Messages
- Or: accessible from the Feed tab as a pinned section
- **Recommendation:** Make it a dedicated bottom nav tab — it's a major enough feature

---

## Concerts Tab — Layout

### Header
- "Concerts" title
- 📍 Location chip (shows current city, tappable to change)
- 🔍 Search icon (search artist or venue)

### Section 1: For You
*Personalized to your listening history*

Header: "For You 🎵"
Subheader: "Based on your listening"

Horizontal scroll of event cards. Each card:
- Artist photo / event image (full bleed)
- Artist name (bold)
- Venue name + city
- Date (formatted: "Sat, Mar 15" or "This Friday")
- Compatibility with you: shown as a small badge if artist is in your top artists
- "X Tunect users going" count
- Ticket link button: "Get Tickets →" (links out to Ticketmaster/Songkick/venue)

Personalization logic:
- Priority 1: Artists in user's top 50 all-time
- Priority 2: Artists in user's top 50 this month
- Priority 3: Artists similar to user's top artists (Spotify related artists)
- Priority 4: Artists any of user's connects listen to
- Filter: within user's selected radius (default 50 miles)

---

### Section 2: Friends Are Going
*Shows featuring connects who have RSVPed*

Header: "Friends Are Going 🔥"
Subheader: "Your connects are attending these"

Vertical list of event cards (larger format). Each card:
- Event image + artist name + venue + date
- Connect avatars: "Jamie, Mia, and 2 others are going"
- Your compatibility with this artist (%)
- "X Tunect users going" total
- "Get Tickets →" link out
- "Going" toggle button (RSVP)

Only shows if at least one connect has RSVPed.
If no connects have RSVPed yet: section is hidden entirely.

---

### Section 3: Near You
*All upcoming shows in your area, regardless of listening history*

Header: "Near You 📍"
Subheader: "[City name] · Next 30 days"

Filter chips: This Week | This Month | All Genres | [Genre filters]

Grid of event cards (2-column, similar to Discover category grid):
- Artist image
- Artist name
- Venue
- Date
- "X going" count
- Tunect users going indicator (if any)

---

### Section 4: Your Shows
*Shows you've RSVPed to*

Header: "Your Shows 🗓️"
Only visible if user has RSVPed to at least one show.

List of upcoming shows user marked as going:
- Event details (artist, venue, date)
- Connect avatars going: "Jamie Chen is also going"
- "See who's going" button → opens attendee view
- "Get Tickets →" link
- "Remove" option (un-RSVP)

---

## Individual Concert Page

Tapping any event card opens the full Concert Page.

### Header
- Back arrow
- Event image (full width, hero)

### Event Info
- Artist name (large, bold)
- Venue name
- Full date + time: "Saturday, March 15 · Doors 7PM · Show 8PM"
- City, State
- "Get Tickets →" button (amber, prominent, links out to best available source)

### Your Connection to This Artist
- Compatibility bar: "This artist matches 78% of your taste"
- Your listening stats: "#3 most played artist this month"
- OG badge if applicable: "You've been listening since they had 8K listeners 🔥"

### Tunect Attendees Section
Header: "Tunect users going ([N])"

**Subsection: Your Connects**
- Avatar list of connects who are going
- Tap avatar → their profile
- If connects are going: "Jamie Chen and Mia Torres are going 🎵"
- Message button → opens DM with those connects (existing conversation)

**Subsection: Others Going** (non-connects)
- Grid of profile cards (similar to Discover cards but smaller)
- Shows: avatar, name, compatibility %, top badge
- Tap → opens their profile (can connect from there)
- Sort: by compatibility % (highest first)
- This is the concert matchmaking feature — find your people at the show
- Interaction: can only connect from their profile — no direct messaging until mutual connect

### RSVP Button
- Large, full-width: "I'm Going 🗓️" (toggle)
- When active: amber filled, shows checkmark
- When inactive: ghost outline
- RSVP is public to your connects and visible to others on this concert page
- Un-RSVP option: hold button or tap again → confirm modal

### Share Button
- Share concert page within Tunect (posts to Feed)
- Auto-generated feed post: "[User] is going to [Artist] at [Venue] on [Date]"
- External share: share link to Tunect concert page + ticket link

---

## Feed Integration

When a connect RSVPs to a show, it auto-generates a Feed post:
- "Jamie Chen is going to Frank Ocean at [Venue] · March 15 🗓️"
- Includes: event image, venue, date, "Get Tickets →" link
- Interaction: connects can react or comment (mutual connects only, per app rules)
- "I'm going too" quick-action button on the post → RSVPs you and shows you on the concert page

---

## Notifications

- "Jamie Chen is going to [Artist] — are you in?" (when a connect RSVPs to show matching your taste)
- "3 Tunect users in your area are going to [Artist] this Friday" (weekly digest)
- "[Artist] just announced a show near you" (for top artists in listening history)
- "[Artist] you discovered early just announced their first tour" (OG Fan angle — powerful)
- "Tickets selling fast: [Artist] near you" (if available via API)

The OG notification is particularly compelling:
> "You've been listening to Brent Faiyaz since he had 6K listeners. He just announced his first arena tour in Boston. 🔥"

---

## Concert Matchmaking Flow

This is the standout feature within Concerts.

**Scenario:** User wants to go to a show but none of their connects are going.

1. User opens Concert Page → sees "Others Going" section
2. Sees other Tunect users attending, sorted by compatibility
3. Taps a profile → opens their full profile with compatibility breakdown
4. Taps Connect → sends connect request
5. If accepted before the show → DMs unlock, they can coordinate
6. Auto-message suggestion when connecting from a concert page:
   > 💡 "You're both going to [Artist] at [Venue] — mention it when you connect"

This is the only place in the app where a real-world event creates a reason to connect with a stranger. It's the killer use case: "I found someone to go to the show with through Tunect."

---

## Group Planning Feature

Accessed from a connect's profile or from the Concerts tab.

**"What would we both like?"**
- On any connect's profile: "See concerts you'd both enjoy" button
- Pulls intersection of both users' top artists + similar artists
- Shows upcoming shows matching that intersection
- Both users can RSVP from this view

**Group view (3+ connects):**
- From Concerts tab: "Plan with friends" button
- Select connects (multi-select, up to 10)
- Shows concerts that match the collective taste of the group
- Ranked by: how many group members listen to the artist
- Each show card shows which group members listen to that artist

---

## Privacy & Settings

- **RSVP visibility:** Public to connects (default) | Private
- **Location:** Required for Near You — city level only, same as Discover
- **Concert notifications:** Granular toggles (new shows from top artists / connects RSVPing / weekly digest)

---

## Future / Partnership Angle (For Pitch)

Note for business plan: the Concerts feature creates a natural partnership opportunity with:
- **Ticketmaster / Live Nation** — referral fee per ticket purchased via Tunect link
- **Spotify** — already has concert data in artist pages, potential data-sharing agreement
- **Bandsintown / Songkick** — potential white-label or API partnership
- **Venue sponsors** — promoted concert placement in For You feed

This is a future revenue stream that requires scale first (~100K+ active users) but is a credible path. Include in pitch as Phase 3 revenue alongside advertising and Pro subscriptions.

---

## Demo Update Instructions (for 02-DEMO-APP.md)

Add Concerts as a 5th bottom nav tab: 🎤

### Demo Screen: Concerts Tab (Browse)

**For You section (horizontal scroll, 3 cards):**

Card 1:
- Artist: Frank Ocean
- Venue: TD Garden, Boston
- Date: Sat, Apr 19
- "2 connects going"
- "94% taste match"
- "Get Tickets →"

Card 2:
- Artist: Tyler, the Creator
- Venue: Roadrunner, Boston
- Date: Fri, May 2
- "1 connect going"
- "89% taste match"
- "Get Tickets →"

Card 3:
- Artist: SZA
- Venue: Fenway Park, Boston
- Date: Sat, Jun 7
- "Get Tickets →"

**Friends Are Going section (1 card, full width):**
- Frank Ocean · TD Garden · Apr 19
- "Jamie Chen and Mia Torres are going 🎵"
- "Going" toggle button (inactive by default)
- "Get Tickets →"

**Near You section (2-column grid, 4 cards):**
- Various artists with venue + date

### Demo Interaction: Tap Frank Ocean card → Concert Page

Concert Page shows:
- Hero image
- "Get Tickets →" button
- "Your connection: #1 most played artist · 🌟 Founder — you listened when they had 800 listeners"
- Connects going: Jamie Chen avatar + Mia Torres avatar
- Others going: 3 profile cards with compatibility scores (78%, 71%, 65%)
- "I'm Going 🗓️" RSVP button (tapping animates to filled state)

---

## Notes for Claude Code

### API Integration (real app)
```javascript
// Bandsintown API
GET https://rest.bandsintown.com/artists/{artistName}/events
  ?app_id={YOUR_APP_ID}
  &date=upcoming

// Run for each artist in user's top 50
// Filter by user's location radius
// Cache results — refresh every 6 hours
// Store RSVPs in Supabase: { user_id, event_id, artist, venue, date, created_at }
```

### Key Supabase Tables
```sql
concert_events     -- cached event data from Bandsintown
  id, artist_name, artist_id, venue, city, state, date, ticket_url, image_url

concert_rsvps      -- user RSVPs
  id, user_id, event_id, created_at

-- Query: who else is going to this event?
SELECT u.name, u.handle, u.avatar, compatibility_scores.score
FROM concert_rsvps r
JOIN users u ON r.user_id = u.id
LEFT JOIN compatibility_scores cs ON (cs.user_a = {current_user} AND cs.user_b = u.id)
WHERE r.event_id = {event_id}
ORDER BY cs.score DESC
```

### Ticket Link Priority
1. Spotify artist page (if available)
2. Bandsintown event link
3. Songkick event link
4. Venue website
5. Ticketmaster search URL as fallback

### Location for Concerts
Same opt-in flow as Discover location. Reuse the same stored location — don't ask twice.
```
Default radius: 50 miles
User can adjust: 10mi | 25mi | 50mi | 100mi | Any
```
