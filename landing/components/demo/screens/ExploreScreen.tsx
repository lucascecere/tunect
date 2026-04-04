"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen, userId?: string) => void;
}

const USERS = [
  { id: "1", name: "Jamie Chen", username: "jamiechen", score: 94, artists: ["Frank Ocean", "SZA", "Blood Orange"], playing: true, track: "Seigfried", color: "from-cyan-500 to-teal-400" },
  { id: "2", name: "Mia Torres", username: "mia.beats", score: 81, artists: ["The Weeknd", "Doja Cat", "PinkPantheress"], playing: false, color: "from-pink-500 to-rose-400" },
  { id: "3", name: "Sam Park", username: "sampark", score: 67, artists: ["Arctic Monkeys", "Radiohead", "Tame Impala"], playing: true, track: "Do I Wanna Know?", color: "from-yellow-500 to-orange-400" },
  { id: "4", name: "Riley Okafor", username: "rileyok", score: 53, artists: ["Kendrick Lamar", "J. Cole", "JID"], playing: false, color: "from-red-500 to-rose-500" },
  { id: "5", name: "Alex Novak", username: "anovak", score: 44, artists: ["Billie Eilish", "Lorde", "Mitski"], playing: false, color: "from-violet-500 to-purple-400" },
];

function scoreColor(s: number) {
  if (s >= 80) return "#22C55E";
  if (s >= 60) return "#A855F7";
  if (s >= 40) return "#F59E0B";
  return "#505050";
}

export function ExploreScreen({ go }: Props) {
  const [query, setQuery] = useState("");

  const filtered = USERS.filter(
    (u) =>
      !query ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 shrink-0" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>Explore</h1>
        <div className="relative">
          <input
            className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#505050] outline-none"
            style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", fontFamily: "var(--font-dm-sans)" }}
            placeholder="Search by name or username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5" style={{ scrollbarWidth: "none" }}>
        {filtered.map((u) => {
          const sc = scoreColor(u.score);
          return (
            <button
              key={u.id}
              onClick={() => go("userProfile", u.id)}
              className="flex items-center gap-3 rounded-2xl p-3 text-left transition-opacity active:opacity-70 w-full"
              style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {u.name[0]}
                </div>
                {u.playing && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414]" style={{ backgroundColor: "#FF2D78" }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{u.name}</p>
                <p className="text-[#505050] text-xs truncate">@{u.username}</p>
                <p className="text-[#A0A0A0] text-[10px] mt-1 truncate">{u.artists.slice(0, 3).join(" · ")}</p>
                {u.playing && u.track && (
                  <p className="text-[10px] mt-0.5 truncate" style={{ color: "#FF2D78" }}>▶ {u.track}</p>
                )}
              </div>

              {/* Score */}
              <div
                className="shrink-0 rounded-full px-2.5 py-1.5 flex flex-col items-center"
                style={{ border: `1px solid ${sc}40`, backgroundColor: `${sc}15` }}
              >
                <span className="text-xs font-bold leading-none" style={{ color: sc }}>{u.score}%</span>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center pt-16">
            <p className="text-[#505050] text-sm italic">No one here yet — invite a friend</p>
          </div>
        )}
      </div>
    </div>
  );
}
