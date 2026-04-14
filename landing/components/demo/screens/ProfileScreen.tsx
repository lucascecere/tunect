"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
}

type Timeframe = "Week" | "Month" | "Year" | "All Time";

const AMBER = "#FF2D78";
const AMBER_BG = "rgba(255,45,120,0.1)";
const AMBER_BORDER = "rgba(255,45,120,0.25)";
const GREEN = "#4CAF7D";
const OG_GOLD = "#FFD700";

const TOP_ARTISTS: Record<Timeframe, { name: string; plays: number; color: string }[]> = {
  "Week": [
    { name: "Frank Ocean",         plays: 847,  color: "from-cyan-600 to-teal-500" },
    { name: "Tyler, the Creator",  plays: 623,  color: "from-yellow-500 to-orange-400" },
    { name: "SZA",                 plays: 441,  color: "from-pink-500 to-rose-400" },
    { name: "Sade",                plays: 312,  color: "from-purple-500 to-violet-400" },
    { name: "Brent Faiyaz",        plays: 287,  color: "from-emerald-600 to-teal-400" },
  ],
  "Month": [
    { name: "Frank Ocean",         plays: 2840, color: "from-cyan-600 to-teal-500" },
    { name: "Tyler, the Creator",  plays: 2210, color: "from-yellow-500 to-orange-400" },
    { name: "SZA",                 plays: 1890, color: "from-pink-500 to-rose-400" },
    { name: "Sade",                plays: 1240, color: "from-purple-500 to-violet-400" },
    { name: "Brent Faiyaz",        plays: 980,  color: "from-emerald-600 to-teal-400" },
  ],
  "Year": [
    { name: "Frank Ocean",         plays: 12400, color: "from-cyan-600 to-teal-500" },
    { name: "Tyler, the Creator",  plays: 9800,  color: "from-yellow-500 to-orange-400" },
    { name: "SZA",                 plays: 8200,  color: "from-pink-500 to-rose-400" },
    { name: "Sade",                plays: 6100,  color: "from-purple-500 to-violet-400" },
    { name: "Brent Faiyaz",        plays: 5400,  color: "from-emerald-600 to-teal-400" },
  ],
  "All Time": [
    { name: "Frank Ocean",         plays: 94230, color: "from-cyan-600 to-teal-500" },
    { name: "Tyler, the Creator",  plays: 81440, color: "from-yellow-500 to-orange-400" },
    { name: "SZA",                 plays: 76110, color: "from-pink-500 to-rose-400" },
    { name: "Sade",                plays: 68920, color: "from-purple-500 to-violet-400" },
    { name: "Brent Faiyaz",        plays: 52380, color: "from-emerald-600 to-teal-400" },
  ],
};

const TASTE_DNA = [
  { genre: "Indie R&B", pct: 72 },
  { genre: "Neo-Soul",  pct: 54 },
  { genre: "Alt-Pop",   pct: 38 },
  { genre: "Jazz",      pct: 21 },
  { genre: "Trap",      pct: 15 },
];

const BADGES = [
  { id: "soul_keeper", icon: "🎵", label: "Soul Keeper", tooltip: "Your listening is dominated by Neo-Soul and R&B. You feel music in your chest." },
  { id: "night_owl",   icon: "🦉", label: "Night Owl",   tooltip: "Most of your listening happens after midnight. The late-night playlist is your natural habitat." },
  { id: "deep_diver",  icon: "🌊", label: "Deep Diver",  tooltip: "You listen to full albums, not just singles. You trust the artist's vision." },
  { id: "og_fan",      icon: "🔥", label: "OG Fan",      tooltip: "You found them before the world did. The timestamp is locked." },
];

const OG_CARDS = [
  { artist: "Frank Ocean",  badge: "🌟 Founder", then: "800",  now: "18.4M", gold: true  },
  { artist: "Brent Faiyaz", badge: "🔥 Day One", then: "6.2K", now: "8.1M",  gold: false },
  { artist: "Steve Lacy",   badge: "🔥 OG Fan",  then: "74K",  now: "12.3M", gold: false },
];

const WRAPS = [
  { year: "2025", platformColor: "#1DB954", artist: "Frank Ocean",        mins: "94,230", genre: "Indie R&B" },
  { year: "2024", platformColor: "#1DB954", artist: "Tyler, the Creator", mins: "81,440", genre: "Alt-Hip-Hop" },
  { year: "2023", platformColor: "#1DB954", artist: "SZA",                mins: "76,110", genre: "Neo-Soul" },
  { year: "2022", platformColor: "#1DB954", artist: "Frank Ocean",        mins: "68,920", genre: "Indie R&B" },
];

export function ProfileScreen({ go }: Props) {
  const [timeframe, setTimeframe] = useState<Timeframe>("Week");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const timeframes: Timeframe[] = ["Week", "Month", "Year", "All Time"];

  return (
    <div
      className="h-full overflow-y-auto bg-[#0A0A0A]"
      style={{ scrollbarWidth: "none" }}
      onClick={() => setActiveTooltip(null)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <span className="text-base font-bold" style={{ color: AMBER, fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>
          tunect
        </span>
        <span className="text-lg text-[#505050]">⚙</span>
      </div>

      {/* Profile */}
      <div className="px-4 py-3 flex items-start gap-3">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
          style={{ backgroundColor: AMBER }}
        >
          A
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Alex Rivera
          </p>
          <p className="text-[#A0A0A0] text-xs">@alexrivera</p>
          <div
            className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5"
            style={{ backgroundColor: AMBER_BG, border: `1px solid ${AMBER_BORDER}` }}
          >
            <span className="text-[10px] font-semibold" style={{ color: AMBER }}>🎵 Soul Keeper</span>
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <div className="mx-4 mb-3 rounded-2xl p-3 flex items-center gap-2.5"
        style={{ backgroundColor: "#141414", border: `1px solid ${AMBER_BORDER}` }}>
        <div className="relative shrink-0 flex items-center justify-center" style={{ width: 10, height: 10 }}>
          <span className="absolute inline-flex h-3 w-3 rounded-full animate-ping" style={{ backgroundColor: "rgba(76,175,125,0.4)" }} />
          <span className="relative w-2 h-2 rounded-full block" style={{ backgroundColor: GREEN }} />
        </div>
        <div className="w-9 h-9 rounded-lg shrink-0 bg-gradient-to-br from-cyan-600 to-teal-500" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate">Novacane</p>
          <p className="text-[#A0A0A0] text-[10px] truncate">Frank Ocean</p>
        </div>
        <span className="text-[10px] shrink-0" style={{ color: GREEN }}>▶ listening now</span>
      </div>

      {/* Taste DNA */}
      <div className="px-4 mb-3">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-2">Taste DNA</p>
        <div className="space-y-1.5">
          {TASTE_DNA.map(({ genre, pct }) => (
            <div key={genre}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[#A0A0A0] text-[10px]">{genre}</span>
                <span className="text-[#505050] text-[10px]">{pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#2A2A2A" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: AMBER }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="px-4 mb-3">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-2">Top Artists</p>
        {/* Timeframe filter */}
        <div className="flex gap-1 mb-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {timeframes.map((t) => (
            <button
              key={t}
              onClick={(e) => { e.stopPropagation(); setTimeframe(t); }}
              className="rounded-full px-2 py-0.5 text-[9px] font-medium transition-all shrink-0"
              style={{
                backgroundColor: timeframe === t ? AMBER_BG : "#141414",
                border: `1px solid ${timeframe === t ? AMBER : "#2A2A2A"}`,
                color: timeframe === t ? AMBER : "#505050",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {TOP_ARTISTS[timeframe].map((a, i) => (
            <div key={a.name} className="flex items-center gap-2.5">
              <span className="text-[#505050] text-[10px] w-4 shrink-0 text-right">#{i + 1}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.color} shrink-0`} />
              <span className="text-white text-xs font-medium flex-1 truncate">{a.name}</span>
              <span className="text-[#505050] text-[10px] shrink-0">{a.plays.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge shelf */}
      <div className="px-4 mb-3">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-2">Badges</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {BADGES.map((b) => (
            <div key={b.id} className="relative shrink-0">
              {/* Tooltip */}
              {activeTooltip === b.id && (
                <div
                  className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 rounded-xl p-2.5 text-center"
                  style={{ width: 140, backgroundColor: "#1E1E1E", border: "1px solid #2A2A2A", boxShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
                >
                  <p className="text-white text-[9px] font-semibold mb-0.5">{b.label}</p>
                  <p className="text-[#A0A0A0] text-[8px] leading-tight">{b.tooltip}</p>
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === b.id ? null : b.id); }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap"
                style={{
                  backgroundColor: activeTooltip === b.id ? AMBER_BG : "#141414",
                  border: `1px solid ${activeTooltip === b.id ? AMBER : "#2A2A2A"}`,
                  color: activeTooltip === b.id ? AMBER : "#A0A0A0",
                }}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* OG Fan section */}
      <div className="px-4 mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: OG_GOLD }}>
          You heard them first 🏆
        </p>
        <div className="flex flex-col gap-2">
          {OG_CARDS.map((c) => (
            <div
              key={c.artist}
              className="rounded-xl px-3 py-2.5 flex items-center gap-3"
              style={{
                backgroundColor: "#141414",
                border: c.gold ? "1px solid rgba(255,215,0,0.3)" : "1px solid #2A2A2A",
                boxShadow: c.gold ? "0 0 16px rgba(255,215,0,0.1)" : "none",
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{ backgroundColor: c.gold ? "rgba(255,215,0,0.15)" : "#1E1E1E" }}>
                🎤
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">{c.artist}</p>
                <p className="text-[9px] text-[#A0A0A0]">You listened when they had {c.then} listeners.</p>
                <p className="text-[9px] text-[#505050]">They now have {c.now} monthly listeners.</p>
              </div>
              <div
                className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap"
                style={{
                  backgroundColor: c.gold ? "rgba(255,215,0,0.12)" : AMBER_BG,
                  color: c.gold ? OG_GOLD : AMBER,
                  border: `1px solid ${c.gold ? "rgba(255,215,0,0.3)" : AMBER_BORDER}`,
                }}
              >
                {c.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wraps Hall of Fame */}
      <div className="px-4 pb-6">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-2">
          Wraps Hall of Fame 🏆
        </p>
        <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {WRAPS.map((w) => (
            <div
              key={w.year}
              className="shrink-0 rounded-xl overflow-hidden"
              style={{ width: 108, border: "1px solid #2A2A2A" }}
            >
              <div className="px-2.5 pt-2 pb-1.5" style={{ backgroundColor: w.platformColor }}>
                <p className="text-white text-[7px] font-bold uppercase tracking-wider opacity-80">Spotify</p>
                <p className="text-white text-xl font-bold leading-tight">{w.year}</p>
              </div>
              <div className="px-2.5 py-2" style={{ backgroundColor: "#141414" }}>
                <p className="text-[#505050] text-[8px] uppercase tracking-wider mb-0.5">#1 Artist</p>
                <p className="text-white text-[10px] font-semibold truncate">{w.artist}</p>
                <p className="text-[#A0A0A0] text-[8px] mt-0.5">{w.mins} mins</p>
                <div className="mt-1 rounded-full px-1.5 py-0.5 inline-block"
                  style={{ backgroundColor: AMBER_BG }}>
                  <span className="text-[8px] font-semibold" style={{ color: AMBER }}>{w.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
