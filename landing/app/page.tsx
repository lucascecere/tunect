import Link from "next/link";
import { Logo, LogoIcon, LogoWordmark } from "../components/Logo";
import { EmailCapture } from "../components/EmailCapture";
import { AnimateIn } from "../components/AnimateIn";
import { CountUp } from "../components/CountUp";
import { TiltCard } from "../components/TiltCard";

// ─── Phone frame wrapper ──────────────────────────────────────────────────────

function PhoneFrame({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`relative shrink-0 ${className}`} style={style}>
      <div className="relative overflow-hidden bg-[#0A0A0A]"
        style={{ width: 220, height: 460, borderRadius: 32, border: "1.5px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1">
          <span className="text-[9px] text-white/50 font-medium">9:41</span>
          <div className="h-3.5 w-14 rounded-full bg-black" />
          <div className="flex gap-1">
            <div className="h-1.5 w-2.5 rounded-sm bg-white/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Profile screen mockup ────────────────────────────────────────────────────

function ProfileMockup() {
  return (
    <PhoneFrame>
      <div className="px-3.5 pt-1.5 pb-16 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: "#FF2D78" }}>tunect</span>
          <span className="text-[#505050] text-sm">⚙</span>
        </div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#A855F7] flex items-center justify-center text-white text-base font-bold shrink-0">A</div>
          <div>
            <p className="text-white text-xs font-semibold">Alex Rivera</p>
            <p className="text-[#505050] text-[10px]">@alexrivera</p>
            <p className="text-[9px] font-semibold mt-0.5 text-gradient">Soul Keeper</p>
          </div>
        </div>
        <div className="rounded-xl bg-[#141414] p-2.5 flex items-center gap-2 mb-2.5 animate-border-glow" style={{ border: "1px solid rgba(255,45,120,0.2)" }}>
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[#FF2D78] shrink-0" />
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-cyan-600 to-teal-500 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-white text-[10px] font-medium truncate">Novacane</p>
            <p className="text-[#A0A0A0] text-[9px] truncate">Frank Ocean</p>
          </div>
          <div className="shrink-0 rounded-full bg-[#1DB954]/20 px-1.5 py-0.5">
            <span className="text-[#1DB954] text-[7px] font-bold">SPT</span>
          </div>
        </div>
        <div className="flex gap-1.5 mb-2.5">
          {["Week", "Month", "All time"].map((t, i) => (
            <div key={t} className="rounded-full px-2.5 py-0.5 text-[9px] font-medium"
              style={i === 1 ? { backgroundColor: "rgba(255,45,120,0.12)", border: "1px solid #FF2D78", color: "#FF2D78" }
                          : { backgroundColor: "#141414", border: "1px solid #2A2A2A", color: "#505050" }}>{t}</div>
          ))}
        </div>
        <p className="text-[#505050] text-[9px] font-semibold uppercase tracking-widest mb-1.5">Top Artists</p>
        <div className="space-y-1.5 mb-2.5">
          {[{ name: "Frank Ocean", color: "from-cyan-600 to-teal-500" }, { name: "Tyler, the Creator", color: "from-yellow-500 to-orange-400" }, { name: "SZA", color: "from-pink-500 to-rose-400" }].map((a, i) => (
            <div key={a.name} className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-md bg-gradient-to-br ${a.color} shrink-0`} />
              <span className="text-white text-[10px] font-medium flex-1 truncate">{a.name}</span>
              <span className="text-[#505050] text-[9px]">#{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-[#505050] text-[9px] font-semibold uppercase tracking-widest mb-1.5">Taste DNA</p>
        <div className="space-y-1.5">
          {[{ g: "Indie R&B", p: 72 }, { g: "Neo-Soul", p: 54 }, { g: "Alt-Pop", p: 38 }].map(({ g, p }) => (
            <div key={g}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[#A0A0A0] text-[8px]">{g}</span>
                <span className="text-[#505050] text-[8px]">{p}%</span>
              </div>
              <div className="h-0.5 rounded-full bg-[#2A2A2A] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${p}%`, background: "linear-gradient(90deg,#FF2D78,#A855F7)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1E1E1E] flex items-center justify-around px-3 py-1.5 bg-[#0A0A0A]">
        {["⊕","▦","♪","✉","◉"].map((icon, i) => (
          <div key={i} className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${i === 4 ? "text-[#FF2D78]" : "text-[#505050]"}`}
            style={i === 2 ? { background: "linear-gradient(135deg,#FF2D78,#A855F7)", color: "#fff" } : {}}>{icon}</div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ─── Discover screen mockup ───────────────────────────────────────────────────

function DiscoverMockup() {
  const users = [
    { name: "Jamie Chen",   score: 94, color: "from-cyan-500 to-teal-400",      sc: "#22C55E", playing: true  },
    { name: "Mia Torres",   score: 81, color: "from-pink-500 to-rose-400",      sc: "#A855F7", playing: false },
    { name: "Sam Park",     score: 67, color: "from-yellow-500 to-orange-400",  sc: "#F59E0B", playing: true  },
    { name: "Riley Okafor", score: 53, color: "from-red-500 to-rose-500",       sc: "#F59E0B", playing: false },
  ];
  return (
    <PhoneFrame>
      <div className="px-3 pt-1 pb-14">
        <h2 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.3px" }}>Discover</h2>
        <div className="rounded-lg bg-[#141414] border border-[#2A2A2A] px-2.5 py-1.5 mb-2">
          <span className="text-[#505050] text-[10px]">Search by name or @username</span>
        </div>
        <div className="flex gap-1.5 mb-2.5">
          {["All", "Live now", "Indie Rock"].map((f, i) => (
            <div key={f} className="rounded-full px-2 py-0.5 text-[8px] font-medium"
              style={i === 0 ? { backgroundColor: "rgba(255,45,120,0.12)", border: "1px solid #FF2D78", color: "#FF2D78" }
                           : { backgroundColor: "#141414", border: "1px solid #2A2A2A", color: "#505050" }}>{f}</div>
          ))}
        </div>
        <div className="space-y-1.5">
          {users.map((u) => (
            <div key={u.name} className="flex items-center gap-2 rounded-xl p-2" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
              <div className="relative shrink-0">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-white text-xs font-bold`}>{u.name[0]}</div>
                {u.playing && <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-[#141414]" style={{ backgroundColor: "#FF2D78" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[10px] font-semibold truncate">{u.name}</p>
                {u.playing && <p className="text-[9px]" style={{ color: "#FF2D78" }}>▶ listening now</p>}
                {!u.playing && <p className="text-[9px] text-[#505050]">@{u.name.toLowerCase().replace(" ", "")}</p>}
              </div>
              <div className="shrink-0 rounded-full px-1.5 py-0.5" style={{ border: `1px solid ${u.sc}40`, backgroundColor: `${u.sc}15` }}>
                <span className="text-[9px] font-bold" style={{ color: u.sc }}>{u.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1E1E1E] flex items-center justify-around px-3 py-1.5 bg-[#0A0A0A]">
        {["⊕","▦","♪","✉","◉"].map((icon, i) => (
          <div key={i} className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${i === 0 ? "text-[#FF2D78]" : "text-[#505050]"}`}
            style={i === 2 ? { background: "linear-gradient(135deg,#FF2D78,#A855F7)", color: "#fff" } : {}}>{icon}</div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ─── Messages mockup ──────────────────────────────────────────────────────────

function MessagesMockup() {
  return (
    <PhoneFrame>
      <div className="px-3 pt-1 pb-14">
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.3px" }}>Messages</h2>
        {[
          { name: "Jamie Chen",  msg: "our 94% makes so much sense 😭",  color: "from-cyan-500 to-teal-400",    time: "2m", unread: 2 },
          { name: "Mia Torres",  msg: "that Brat album is everything",    color: "from-pink-500 to-rose-400",    time: "1h", unread: 0 },
          { name: "Sam Park",    msg: "505 live — you HAVE to hear it",   color: "from-yellow-500 to-orange-400", time: "3h", unread: 1 },
        ].map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center gap-2.5 py-2.5">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-0.5">
                  <span className="text-white text-[11px] font-semibold">{c.name}</span>
                  <span className="text-[#505050] text-[9px]">{c.time}</span>
                </div>
                <p className={`text-[10px] truncate ${c.unread > 0 ? "text-white font-medium" : "text-[#A0A0A0]"}`}>{c.msg}</p>
              </div>
              {c.unread > 0 && (
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,#FF2D78,#A855F7)" }}>{c.unread}</div>
              )}
            </div>
            {i < 2 && <div className="ml-[52px] h-px bg-[#1E1E1E]" />}
          </div>
        ))}
        <div className="mt-2 rounded-2xl p-2.5" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
          <p className="text-[#505050] text-[9px] mb-1.5">💡 You both love Frank Ocean — ask them which album got them first.</p>
          <div className="flex justify-end">
            <div className="rounded-xl px-2.5 py-1.5 text-white text-[10px]"
              style={{ background: "linear-gradient(135deg,#FF2D78,#A855F7)", borderBottomRightRadius: 3 }}>
              Blonde era for sure 🙌
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1E1E1E] flex items-center justify-around px-3 py-1.5 bg-[#0A0A0A]">
        {["⊕","▦","♪","✉","◉"].map((icon, i) => (
          <div key={i} className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${i === 3 ? "text-[#FF2D78]" : "text-[#505050]"}`}
            style={i === 2 ? { background: "linear-gradient(135deg,#FF2D78,#A855F7)", color: "#fff" } : {}}>{icon}</div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-[#1E1E1E]/60 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Logo size={32} />
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/demo"
              className="rounded-full border border-[#2A2A2A] px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#A0A0A0] transition-all hover:border-[#FF2D78]/40 hover:text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Try demo
            </a>
            <a href="#waitlist"
              className="btn-primary rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Get early access
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24">
        {/* Animated background orbs */}
        <div className="animate-orb-a pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF2D78]/10 blur-[120px]" />
        <div className="animate-orb-b pointer-events-none absolute right-1/4 top-10 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-[#A855F7]/10 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#FF2D78]/5 blur-[80px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Hero text — staggered entrance */}
          <div className="hero-sequence text-center mb-10 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 sm:px-4 py-1.5 text-xs sm:text-sm mb-6"
                style={{ fontFamily: "var(--font-dm-sans)", borderColor: "rgba(255,45,120,0.3)", backgroundColor: "rgba(255,45,120,0.08)", color: "#FFB3CC" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF2D78] animate-pulse-dot" />
                Now accepting early access
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight text-white mb-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                Find your people<br />
                <span className="text-gradient animate-gradient-pan">through music.</span>
              </h1>
            </div>
            <div>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-lg mx-auto">
                Tunect gives you a compatibility score with everyone — built from your real listening history, not just genre labels.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 mt-6">
              <EmailCapture size="large" />
              <a href="/demo" className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#FF6FA3", fontFamily: "var(--font-dm-sans)" }}>
                or try the interactive demo →
              </a>
            </div>
          </div>

          {/* Phones */}
          <div className="phones-sequence flex items-end justify-center gap-4 sm:gap-8 md:gap-10">
            {/* Left — Discover (hidden on mobile) */}
            <div className="animate-float-left hidden md:block">
              <DiscoverMockup />
            </div>
            {/* Center — Profile */}
            <div className="animate-float relative">
              <div className="animate-glow-pulse absolute inset-0 -z-10 scale-110 rounded-[44px] blur-2xl"
                style={{ background: "radial-gradient(ellipse, rgba(255,45,120,0.25) 0%, rgba(168,85,247,0.15) 60%, transparent 80%)" }} />
              <ProfileMockup />
            </div>
            {/* Right — Messages (hidden on mobile) */}
            <div className="animate-float-right hidden md:block">
              <MessagesMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof marquee ── */}
      <div className="border-y border-[#1E1E1E] py-5 bg-[#0D0D0D] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "Built on real Spotify listening data",
                "Compatibility across artists, genres & era",
                "Live now-playing — not playlists",
                "Mutual connect — like Tinder for music",
                "Music personality label, always live",
                "DMs unlock when both say yes",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 mx-8">
                  <span className="h-1 w-1 rounded-full bg-[#FF2D78] shrink-0" />
                  <span className="text-xs text-[#505050]" style={{ fontFamily: "var(--font-dm-sans)" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <section className="border-b border-[#1E1E1E] px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <AnimateIn className="mb-10 sm:mb-14 text-center">
            <p className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-widest text-gradient"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Three steps to your sound
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                step: "01", title: "Connect Spotify",
                body: "Log in with Spotify. We read your listening history — never your playlists, never posting to your account.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#FF2D78"/></svg>,
              },
              {
                step: "02", title: "Get your live profile",
                body: "Top artists, tracks, genre DNA, personality label — and what you're playing right now. Always live, never stale.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#FF2D78"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#A855F7" opacity="0.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#A855F7" opacity="0.6"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#FF2D78" opacity="0.4"/></svg>,
              },
              {
                step: "03", title: "Find your people",
                body: "Browse users sorted by compatibility score. Follow freely, Connect mutually — DMs unlock when both say yes.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" fill="#FF2D78"/><circle cx="15" cy="8" r="3.5" fill="#A855F7" opacity="0.7"/><path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="#FF2D78" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 14c2.21 0 4 1.79 4 4" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/></svg>,
              },
            ].map(({ step, title, body, icon }, i) => (
              <AnimateIn key={step} delay={i * 120}>
                <TiltCard className="relative rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6 sm:p-7 h-full card-hover">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,45,120,0.1)" }}>{icon}</div>
                    <span className="text-3xl sm:text-4xl font-bold text-[#1E1E1E]" style={{ fontFamily: "var(--font-dm-sans)" }}>{step}</span>
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>{title}</h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{body}</p>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatibility ── */}
      <section className="border-b border-[#1E1E1E] px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Card */}
            <AnimateIn direction="left">
              <div className="relative mx-auto max-w-sm w-full">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-[#FF2D78]/15 blur-xl animate-glow-pulse" />
                <TiltCard className="rounded-2xl border border-[#FF2D78]/20 bg-[#141414] p-5 sm:p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#A855F7] flex items-center justify-center text-white font-bold shrink-0">Y</div>
                    <div className="flex-1 text-center">
                      <div className="text-4xl sm:text-[42px] font-bold leading-none text-gradient animate-gradient-pan" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        <CountUp target={94} suffix="%" />
                      </div>
                      <div className="text-[#A0A0A0] text-xs mt-1">compatible</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center text-white font-bold shrink-0">J</div>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden mb-4">
                    <div className="h-full w-[94%] rounded-full" style={{ background: "linear-gradient(90deg,#FF2D78,#A855F7)" }} />
                  </div>
                  <div className="flex gap-2 sm:gap-3 mb-4">
                    {[{ n: "14", l: "shared artists" }, { n: "8", l: "shared songs" }, { n: "5", l: "shared genres" }].map(({ n, l }) => (
                      <div key={l} className="flex-1 rounded-xl bg-[#1E1E1E] px-2 sm:px-3 py-2.5 text-center">
                        <div className="text-white font-semibold text-base sm:text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>{n}</div>
                        <div className="text-[#A0A0A0] text-[10px] sm:text-xs mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[#A0A0A0] text-xs">Indie R&B · Neo-Soul · Alt-Pop</p>
                </TiltCard>
              </div>
            </AnimateIn>

            {/* Copy */}
            <AnimateIn direction="right" delay={100}>
              <div className="flex flex-col gap-4 sm:gap-5">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-gradient" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Compatibility
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Not just the same artist.<br />
                  <span className="text-[#A0A0A0]">The same feeling.</span>
                </h2>
                <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed">
                  Spotify shows you what your friends listen to. Tunect finds you strangers you haven't met yet — ranked by how deep the musical overlap actually goes.
                </p>
                <ul className="space-y-3 text-sm text-[#A0A0A0]">
                  {[{ label: "Artist overlap", pct: "40%" }, { label: "Genre match", pct: "35%" }, { label: "Era alignment", pct: "15%" }, { label: "Listening energy", pct: "10%" }].map(({ label, pct }) => (
                    <li key={label} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF2D78] shrink-0" />
                      <span>{label}</span>
                      <div className="flex-1 h-px bg-[#1E1E1E]" />
                      <span className="font-semibold" style={{ color: "#FF6FA3" }}>{pct}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Try the demo ── */}
      <section className="border-b border-[#1E1E1E] px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.1) 0%, transparent 65%)" }} />
        <AnimateIn className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-widest mb-4 text-gradient" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Interactive demo
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
            See the full app in action
          </h2>
          <p className="text-[#A0A0A0] text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Browse Discover, scroll the Feed, open a DM, try the Now Playing screen. No sign-up, fully interactive.
          </p>
          <a href="/demo"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white"
            style={{ fontFamily: "var(--font-dm-sans)", boxShadow: "0 8px 32px rgba(255,45,120,0.3)" }}>
            Try the demo →
          </a>
        </AnimateIn>
      </section>

      {/* ── Features ── */}
      <section className="border-b border-[#1E1E1E] px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <AnimateIn className="mb-10 sm:mb-14 text-center">
            <p className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-widest text-gradient" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Features
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Built around how you actually listen
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
            {[
              { title: "Now Playing", accent: "from-[#FF2D78]/12", body: "See what people are listening to right now. The actual song, live — not a playlist from last month.", icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#FF2D78" strokeWidth="1.5"/><circle cx="11" cy="11" r="3" fill="#FF2D78"/><path d="M11 1v3M11 18v3M1 11h3M18 11h3" stroke="#FF2D78" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg> },
              { title: "Taste DNA", accent: "from-[#A855F7]/12", body: "Your genre breakdown, personality label, and top artists — visualized. Shareable in one tap.", icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M2 16h4v4H2zM8 10h4v10H8zM14 6h4v14h-4z" fill="#A855F7"/></svg> },
              { title: "Music Feed", accent: "from-[#FF2D78]/10", body: "Auto-generated posts from listening data — milestones, discoveries, monthly wraps. The app posts so you don't have to.", icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="3" width="6" height="6" rx="1.5" fill="#FF2D78"/><rect x="10" y="3" width="10" height="2.5" rx="1" fill="#FF2D78" opacity="0.4"/><rect x="10" y="7" width="7" height="2" rx="1" fill="#FF2D78" opacity="0.25"/><rect x="2" y="11" width="6" height="6" rx="1.5" fill="#FF2D78" opacity="0.5"/><rect x="10" y="11" width="10" height="2.5" rx="1" fill="#FF2D78" opacity="0.4"/><rect x="10" y="15" width="7" height="2" rx="1" fill="#FF2D78" opacity="0.25"/></svg> },
              { title: "Mutual Connect", accent: "from-[#A855F7]/12", body: "Follow anyone freely. DMs unlock only when both say yes — so every conversation starts with real mutual interest.", icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z" stroke="#A855F7" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
            ].map(({ title, body, icon, accent }, i) => (
              <AnimateIn key={title} delay={i * 80}>
                <TiltCard className={`relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6 sm:p-7 h-full card-hover`}>
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} to-transparent opacity-60`} />
                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E1E1E]">{icon}</div>
                    <h3 className="mb-2 text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>{title}</h3>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed">{body}</p>
                  </div>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="border-b border-[#1E1E1E] px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <AnimateIn className="mb-10 sm:mb-14 text-center">
            <p className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-widest text-gradient" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Pricing
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Free forever. Pro if you want more.
            </h2>
            <p className="text-[#A0A0A0] text-base max-w-md mx-auto">No paywalls on the core experience. Pro is for power users who want deeper data and no ads.</p>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free */}
            <AnimateIn direction="left">
              <TiltCard className="rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6 sm:p-8 h-full card-hover">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#505050] mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>Free</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>$0</span>
                    <span className="text-[#A0A0A0] text-sm">/month</span>
                  </div>
                  <p className="text-[#A0A0A0] text-sm mt-2">Everything you need to find your people.</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Full music profile + personality label",
                    "Compatibility scores with all users",
                    "Unlimited follows + Discover tab",
                    "DMs with mutual connections",
                    "Full feed (Following + For You)",
                    "Up to 10 active connect requests",
                    "Shared artists compatibility view",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#A0A0A0]">
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2A2A2A" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className="block w-full rounded-full border border-[#2A2A2A] py-3 text-center text-sm font-semibold text-[#A0A0A0] transition-all hover:border-[#FF2D78]/40 hover:text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Join waitlist
                </a>
              </TiltCard>
            </AnimateIn>

            {/* Pro */}
            <AnimateIn direction="right" delay={80}>
              <TiltCard className="relative rounded-2xl border bg-[#141414] p-6 sm:p-8 h-full card-hover overflow-hidden" style={{ borderColor: "rgba(255,45,120,0.35)" }}>
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF2D78]/8 via-[#A855F7]/5 to-transparent" />
                {/* Best value badge */}
                <div className="absolute top-4 right-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg,#FF2D78,#A855F7)", color: "#fff" }}>
                  Best value
                </div>
                <div className="relative mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gradient" style={{ fontFamily: "var(--font-dm-sans)" }}>Pro</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>$2.99</span>
                    <span className="text-[#A0A0A0] text-sm">/month</span>
                  </div>
                  <p className="text-[#A0A0A0] text-sm mt-1">or <span className="text-white font-semibold">$24.99/year</span> <span className="text-[#FF6FA3] text-xs font-medium">— save 30%</span></p>
                </div>
                <ul className="relative space-y-3 mb-8">
                  {[
                    "Everything in Free",
                    "Ad-free everywhere, always",
                    "See who viewed your profile",
                    "Deep compatibility breakdown",
                    "Unlimited connect requests",
                    "Profile customization + pinned track",
                    "Extended listening history stats",
                    "Pro badge on your profile",
                  ].map((f, i) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#A0A0A0]">
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="rgba(255,45,120,0.12)" stroke="rgba(255,45,120,0.3)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke={i === 0 ? "#A0A0A0" : "#FF2D78"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className={i === 0 ? "" : "text-white"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className="btn-primary relative block w-full rounded-full py-3 text-center text-sm font-semibold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Get early access
                </a>
                <p className="relative text-center text-[10px] text-[#505050] mt-3">Cancel anytime. Billed via App Store.</p>
              </TiltCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="waitlist" className="px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
        <div className="animate-orb-a pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(255,45,120,0.1) 0%, rgba(168,85,247,0.07) 50%, transparent 70%)" }} />
        <AnimateIn className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Music is how you know someone.
          </h2>
          <p className="mb-8 sm:mb-10 text-lg sm:text-xl text-[#A0A0A0] leading-relaxed">We built the app for that.</p>
          <div className="flex justify-center">
            <EmailCapture placeholder="your@email.com" buttonText="Join the waitlist" size="large" />
          </div>
          <p className="mt-4 text-xs text-[#505050]">No spam. Just an invite when we launch.</p>
        </AnimateIn>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1E1E1E] px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={26} />
            <div>
              <LogoWordmark className="text-sm sm:text-base" />
              <p className="text-[10px] text-[#505050] mt-0.5">Connect through music</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-xs text-[#505050] hover:text-[#A0A0A0] transition-colors">Privacy Policy</Link>
            <Link href="/demo" className="text-xs text-[#505050] hover:text-[#A0A0A0] transition-colors">Try demo</Link>
            <p className="text-xs text-[#505050]">© 2025 Tunect</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
