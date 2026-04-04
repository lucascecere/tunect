import { Logo, LogoIcon, LogoWordmark } from "../components/Logo";
import { EmailCapture } from "../components/EmailCapture";

// ─── Phone Mockup ────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="animate-float relative mx-auto w-[260px]">
      {/* Outer glow */}
      <div className="animate-glow-pulse absolute inset-0 -z-10 scale-110 rounded-[44px] bg-[#1A56DB]/20 blur-2xl" />

      {/* Phone frame */}
      <div className="relative rounded-[40px] border border-white/10 bg-[#0D0D0D] p-2 shadow-2xl">
        {/* Screen */}
        <div className="overflow-hidden rounded-[34px] bg-[#0A0A0A]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1">
            <span className="text-[10px] text-white/50 font-medium">9:41</span>
            <div className="h-4 w-16 rounded-full bg-black" />
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-3 rounded-sm bg-white/40" />
            </div>
          </div>

          {/* Profile content */}
          <div className="px-4 pb-4 pt-2 space-y-3">
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1A56DB] to-[#7C3AED] flex items-center justify-center text-white text-lg font-bold shrink-0">
                A
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">Alex Rivera</p>
                <p className="text-[#A0A0A0] text-xs">@alexrivera</p>
                <p className="text-[#3B82F6] text-[10px] font-medium mt-0.5">Genre Fluid</p>
              </div>
            </div>

            {/* Now playing */}
            <div className="rounded-xl bg-[#141414] p-3 flex items-center gap-2.5 border border-[#2A2A2A]">
              <div className="animate-pulse-dot h-2 w-2 rounded-full bg-[#3B82F6] shrink-0" />
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-white text-[11px] font-medium truncate">Blinding Lights</p>
                <p className="text-[#A0A0A0] text-[10px] truncate">The Weeknd</p>
              </div>
              <div className="ml-auto shrink-0">
                <div className="rounded-full bg-[#1DB954]/20 px-1.5 py-0.5">
                  <span className="text-[#1DB954] text-[8px] font-bold">SPT</span>
                </div>
              </div>
            </div>

            {/* Top artists */}
            <div>
              <p className="text-[#A0A0A0] text-[10px] font-medium uppercase tracking-wider mb-2">Top Artists</p>
              <div className="space-y-2">
                {[
                  { name: "The Weeknd", color: "from-purple-600 to-pink-500" },
                  { name: "Arctic Monkeys", color: "from-yellow-600 to-orange-500" },
                  { name: "Frank Ocean", color: "from-blue-500 to-cyan-400" },
                ].map((artist) => (
                  <div key={artist.name} className="flex items-center gap-2.5">
                    <div className={`h-7 w-7 rounded-md bg-gradient-to-br ${artist.color} shrink-0`} />
                    <span className="text-white text-[11px] font-medium">{artist.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Genre bars */}
            <div>
              <p className="text-[#A0A0A0] text-[10px] font-medium uppercase tracking-wider mb-2">Taste DNA</p>
              <div className="space-y-1.5">
                {[
                  { genre: "Indie R&B", pct: 72 },
                  { genre: "Alt-Rock", pct: 54 },
                  { genre: "Electronic", pct: 38 },
                ].map(({ genre, pct }) => (
                  <div key={genre}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[#A0A0A0] text-[9px]">{genre}</span>
                      <span className="text-[#A0A0A0] text-[9px]">{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[#2A2A2A] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#1A56DB]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="border-t border-[#1E1E1E] flex items-center justify-around px-4 py-2 bg-[#0D0D0D]">
            {["⌂", "⊕", "♪", "✉", "◉"].map((icon, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  i === 2
                    ? "bg-[#1A56DB] text-white"
                    : "text-[#505050]"
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compatibility Card ───────────────────────────────────────────────────────

function CompatibilityCardDemo() {
  return (
    <div className="relative mx-auto max-w-sm w-full">
      {/* glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-[#22C55E]/10 blur-xl" />

      <div className="rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6">
        <div className="flex items-center gap-4 mb-5">
          {/* Avatar A */}
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1A56DB] to-[#7C3AED] flex items-center justify-center text-white font-bold shrink-0">
            Y
          </div>
          {/* Score */}
          <div className="flex-1 text-center">
            <div className="text-[42px] font-bold leading-none" style={{ color: "#22C55E", fontFamily: "var(--font-dm-sans)" }}>
              94%
            </div>
            <div className="text-[#A0A0A0] text-xs mt-1">compatible</div>
          </div>
          {/* Avatar B */}
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
            A
          </div>
        </div>

        {/* Score bar */}
        <div className="h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden mb-4">
          <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#22C55E] to-[#3B82F6]" />
        </div>

        {/* Stats */}
        <div className="flex gap-3 text-sm">
          <div className="flex-1 rounded-xl bg-[#1E1E1E] px-3 py-2.5 text-center">
            <div className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>14</div>
            <div className="text-[#A0A0A0] text-xs mt-0.5">shared artists</div>
          </div>
          <div className="flex-1 rounded-xl bg-[#1E1E1E] px-3 py-2.5 text-center">
            <div className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>8</div>
            <div className="text-[#A0A0A0] text-xs mt-0.5">shared songs</div>
          </div>
          <div className="flex-1 rounded-xl bg-[#1E1E1E] px-3 py-2.5 text-center">
            <div className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>5</div>
            <div className="text-[#A0A0A0] text-xs mt-0.5">shared genres</div>
          </div>
        </div>

        <p className="mt-4 text-center text-[#A0A0A0] text-xs">
          Indie R&B · Alt-Rock · Electronic
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[#1E1E1E]/60 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size={36} />
          <a
            href="#waitlist"
            className="rounded-full bg-[#1A56DB] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#1648c0] active:scale-95"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#1A56DB]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: copy */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1A56DB]/30 bg-[#1A56DB]/10 px-4 py-1.5 text-sm text-[#93C5FD]"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse-dot" />
                Now accepting early access
              </div>

              <h1
                className="text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Your music taste,<br />
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] bg-clip-text text-transparent">
                  your identity.
                </span>
              </h1>

              <p className="text-lg text-[#A0A0A0] leading-relaxed max-w-md">
                Tunect connects you with people who actually get what you listen to.
                Your real listening history. Your real vibe.
              </p>

              <EmailCapture size="large" />

              <p className="text-xs text-[#505050]">
                No spam. Just an invite when we launch.
              </p>
            </div>

            {/* Right: phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-medium text-[#3B82F6] mb-3 uppercase tracking-widest"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              How it works
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Three steps to your sound
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your music",
                body: "Link Spotify or Apple Music. We read your listening history — nothing else.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#3B82F6"/>
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Get your live profile",
                body: "Your top artists, top tracks, genre DNA, and what's playing right now. Always up to date.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#3B82F6"/>
                    <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#3B82F6" opacity="0.6"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#3B82F6" opacity="0.6"/>
                    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#3B82F6" opacity="0.3"/>
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Find your people",
                body: "Get a compatibility score with every user. Built from actual listening overlap, not just genre labels.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="8" r="3.5" fill="#3B82F6"/>
                    <circle cx="15" cy="8" r="3.5" fill="#3B82F6" opacity="0.5"/>
                    <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17 14c2.21 0 4 1.79 4 4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                ),
              },
            ].map(({ step, title, body, icon }) => (
              <div
                key={step}
                className="group relative rounded-2xl border border-[#2A2A2A] bg-[#141414] p-7 transition-all hover:border-[#1A56DB]/40 hover:bg-[#141414]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A56DB]/15">
                    {icon}
                  </div>
                  <span
                    className="text-4xl font-bold text-[#1E1E1E]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {step}
                  </span>
                </div>
                <h3
                  className="mb-2 text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatibility ──────────────────────────────────────────────── */}
      <section className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Card */}
            <CompatibilityCardDemo />

            {/* Copy */}
            <div className="flex flex-col gap-5">
              <p className="text-sm font-medium text-[#3B82F6] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                Compatibility
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-white md:text-4xl"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Not just the same artist.
                <br />
                <span className="text-[#A0A0A0]">The same feeling.</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg leading-relaxed">
                It's not about liking the same artist. It's about shared taste, shared eras, shared energy.
                We score compatibility across artists, genres, release era, and listening intensity.
              </p>
              <ul className="space-y-3 text-sm text-[#A0A0A0]">
                {[
                  { label: "Artist overlap", pct: "40%" },
                  { label: "Genre match", pct: "35%" },
                  { label: "Era alignment", pct: "15%" },
                  { label: "Listening energy", pct: "10%" },
                ].map(({ label, pct }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                    <span>{label}</span>
                    <span className="ml-auto font-medium text-[#3B82F6]">{pct}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-medium text-[#3B82F6] mb-3 uppercase tracking-widest"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Features
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Built around how you actually listen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                title: "Now Playing",
                body: "See exactly what people are listening to right now. Real-time, not a playlist.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="#3B82F6" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="3" fill="#3B82F6"/>
                    <path d="M11 1v3M11 18v3M1 11h3M18 11h3" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                ),
                accent: "from-[#1A56DB]/20 to-transparent",
              },
              {
                title: "Taste DNA",
                body: "Your genre breakdown, visualized. See yourself the way your music does.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M2 16h4v4H2zM8 10h4v10H8zM14 6h4v14h-4z" fill="#3B82F6"/>
                    <path d="M2 12h4M8 8h4M14 4h4" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>
                  </svg>
                ),
                accent: "from-[#7C3AED]/20 to-transparent",
              },
              {
                title: "Real Compatibility",
                body: "A score built from your actual listening history. Not vibes. Data.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L13.5 8.5H20L14.75 12.5L16.75 19L11 15L5.25 19L7.25 12.5L2 8.5H8.5L11 2Z" fill="#3B82F6" opacity="0.3" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                ),
                accent: "from-[#22C55E]/10 to-transparent",
              },
              {
                title: "Deep Cuts",
                body: "Connect over the songs most people don't know. The ones that define you.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 11a6 6 0 0 1 12 0" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M2 11a9 9 0 0 1 18 0" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                    <circle cx="11" cy="14" r="2.5" fill="#3B82F6"/>
                  </svg>
                ),
                accent: "from-[#F59E0B]/10 to-transparent",
              },
            ].map(({ title, body, icon, accent }) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#141414] p-7 transition-all hover:border-[#3B82F6]/30`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-60`} />
                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E1E1E]">
                    {icon}
                  </div>
                  <h3
                    className="mb-2 text-lg font-semibold text-white"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="waitlist" className="border-t border-[#1E1E1E] px-6 py-28 relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[#1A56DB]/12 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Music is how you know someone.
          </h2>
          <p className="mb-10 text-lg text-[#A0A0A0] leading-relaxed">
            We built the app for that.
          </p>

          <div className="flex justify-center">
            <EmailCapture
              placeholder="your@email.com"
              buttonText="Join the waitlist"
              size="large"
            />
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1E1E1E] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={28} />
            <div>
              <LogoWordmark className="text-base" />
              <p className="text-[10px] text-[#505050] mt-0.5">Connect through music</p>
            </div>
          </div>
          <p className="text-xs text-[#505050]">© 2025 Tunect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
