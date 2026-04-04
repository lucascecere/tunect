"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
}

type Timeframe = "Week" | "Month" | "All time";

const ARTISTS = [
  { name: "Frank Ocean", color: "from-cyan-500 to-teal-400" },
  { name: "Tyler, the Creator", color: "from-yellow-500 to-orange-400" },
  { name: "SZA", color: "from-pink-500 to-rose-400" },
  { name: "Kendrick Lamar", color: "from-red-500 to-orange-500" },
  { name: "Solange", color: "from-purple-500 to-violet-400" },
];

const TRACKS = [
  { name: "Novacane", artist: "Frank Ocean", color: "from-cyan-600 to-teal-500" },
  { name: "EARFQUAKE", artist: "Tyler, the Creator", color: "from-yellow-500 to-orange-400" },
  { name: "Kill Bill", artist: "SZA", color: "from-pink-500 to-rose-400" },
  { name: "N95", artist: "Kendrick Lamar", color: "from-red-500 to-orange-500" },
  { name: "Cranes in the Sky", artist: "Solange", color: "from-purple-500 to-violet-400" },
];

const GENRES = [
  { genre: "Indie R&B", pct: 72 },
  { genre: "Alt-Hip-Hop", pct: 58 },
  { genre: "Neo-Soul", pct: 41 },
];

function NowPlaying() {
  return (
    <div
      className="rounded-2xl p-3 flex items-center gap-3 mx-4"
      style={{ backgroundColor: "#141414", border: "1px solid rgba(255,45,120,0.2)" }}
    >
      <span className="w-2 h-2 rounded-full shrink-0 animate-pulse-dot" style={{ backgroundColor: "#FF2D78" }} />
      <div className="w-9 h-9 rounded-lg shrink-0 bg-gradient-to-br from-cyan-600 to-teal-500" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-[12px] font-semibold truncate">Novacane</p>
        <p className="text-[#A0A0A0] text-[10px] truncate">Frank Ocean</p>
      </div>
      <div className="rounded-full px-1.5 py-0.5 shrink-0" style={{ backgroundColor: "rgba(29,185,84,0.15)" }}>
        <span className="text-[#1DB954] text-[8px] font-bold">SPT</span>
      </div>
    </div>
  );
}

export function ProfileScreen({ go }: Props) {
  const [timeframe, setTimeframe] = useState<Timeframe>("Month");
  const timeframes: Timeframe[] = ["Week", "Month", "All time"];

  return (
    <div className="h-full overflow-y-auto bg-[#0A0A0A]" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-4 pt-3 pb-4" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-bold" style={{ color: "#FF2D78", fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>tunect</span>
          <span className="text-lg text-[#505050]">⚙</span>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
            style={{ background: "linear-gradient(135deg, #FF2D78, #A855F7)" }}>
            A
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-dm-sans)" }}>Alex Rivera</p>
            <p className="text-[#A0A0A0] text-xs">@alexrivera</p>
            <p className="text-[11px] mt-1 italic text-[#505050]">music is the only language i speak fluently</p>
          </div>
          <div className="rounded-full px-3 py-1.5 text-xs font-medium text-[#A0A0A0] shrink-0" style={{ border: "1px solid #2A2A2A" }}>
            Edit
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <div className="py-3">
        <NowPlaying />
      </div>

      {/* Timeframe toggle */}
      <div className="flex gap-2 px-4 pb-3">
        {timeframes.map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-all"
            style={{
              backgroundColor: timeframe === t ? "rgba(255,45,120,0.12)" : "#141414",
              border: `1px solid ${timeframe === t ? "#FF2D78" : "#2A2A2A"}`,
              color: timeframe === t ? "#FF2D78" : "#505050",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top Artists */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Top Artists</p>
        <div className="flex flex-col gap-2.5">
          {ARTISTS.map((a, i) => (
            <div key={a.name} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.color} shrink-0`} />
              <span className="text-white text-sm font-medium flex-1">{a.name}</span>
              <span className="text-[#505050] text-xs">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Top Tracks</p>
        <div className="flex flex-col gap-2.5">
          {TRACKS.map((t, i) => (
            <div key={t.name} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${t.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{t.name}</p>
                <p className="text-[#A0A0A0] text-xs">{t.artist}</p>
              </div>
              <span className="text-[#505050] text-xs">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="px-4 pb-6">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Music Personality</p>
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
          <p className="text-xl font-bold mb-4" style={{ color: "#FF2D78", fontFamily: "var(--font-dm-sans)" }}>Soul Keeper</p>
          <div className="flex flex-col gap-2.5">
            {GENRES.map(({ genre, pct }) => (
              <div key={genre}>
                <div className="flex justify-between mb-1">
                  <span className="text-[#A0A0A0] text-xs">{genre}</span>
                  <span className="text-[#505050] text-xs">{pct}%</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#2A2A2A" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #FF2D78, #A855F7)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
