"use client";

import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
}

export function NowPlayingScreen({ go }: Props) {
  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] relative overflow-hidden">
      {/* Background blur from album art */}
      <div
        className="absolute inset-0 scale-110 blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse at 50% 40%, #0e7490 0%, #1a1a2e 60%, #0A0A0A 100%)" }}
      />

      <div className="relative flex flex-col h-full px-6 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => go("discover")} className="text-sm font-medium" style={{ color: "#FF2D78" }}>
            ← Back
          </button>
          <span className="text-xs font-semibold text-[#505050] uppercase tracking-widest">Now Playing</span>
          <div className="w-10" />
        </div>

        {/* Album art */}
        <div className="flex justify-center mb-8">
          <div
            className="rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center"
            style={{
              width: 220,
              height: 220,
              boxShadow: "0 24px 48px rgba(6,182,212,0.3), 0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <span className="text-white/30 text-8xl">♫</span>
          </div>
        </div>

        {/* Track info */}
        <div className="mb-6">
          <p className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>Novacane</p>
          <p className="text-[#A0A0A0] text-base mt-1">Frank Ocean</p>
          <p className="text-[#505050] text-sm">Channel Orange · 2012</p>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="h-1 rounded-full overflow-hidden mb-1.5" style={{ backgroundColor: "#2A2A2A" }}>
            <div className="h-full rounded-full" style={{ width: "43%", background: "linear-gradient(90deg, #FF2D78, #A855F7)" }} />
          </div>
          <div className="flex justify-between">
            <span className="text-[#505050] text-xs">1:52</span>
            <span className="text-[#505050] text-xs">4:21</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <button className="text-[#505050] text-lg px-2">⇄</button>
          <button className="text-[#A0A0A0] text-2xl px-2">⏮</button>
          <button
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: "linear-gradient(135deg, #FF2D78, #A855F7)", boxShadow: "0 4px 16px rgba(255,45,120,0.4)" }}
          >
            ⏸
          </button>
          <button className="text-[#A0A0A0] text-2xl px-2">⏭</button>
          <button className="text-[#505050] text-lg px-2">↺</button>
        </div>

        {/* Spotify badge + activity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ backgroundColor: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)" }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1DB954" }} />
            <span className="text-xs font-semibold" style={{ color: "#1DB954" }}>Spotify</span>
          </div>
          <p className="text-[#505050] text-xs">3 friends also listening</p>
        </div>
      </div>
    </div>
  );
}
