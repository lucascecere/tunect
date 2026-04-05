"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen, userId?: string) => void;
}

const ALL_USERS = [
  { id: "1", name: "Jamie Chen",    handle: "jamiechen",  color: "from-cyan-500 to-teal-400",      personality: "Indie Nocturnal",  artists: ["Frank Ocean", "SZA", "Blood Orange"],           playing: true,  track: "Seigfried"          },
  { id: "2", name: "Mia Torres",    handle: "mia.beats",  color: "from-pink-500 to-rose-400",      personality: "Bass & Heat",      artists: ["The Weeknd", "Doja Cat", "PinkPantheress"],      playing: false, track: ""                   },
  { id: "3", name: "Sam Park",      handle: "sampark",    color: "from-yellow-500 to-orange-400",  personality: "Alt-Rock Obsessive",artists: ["Arctic Monkeys", "Radiohead", "Tame Impala"],  playing: true,  track: "Do I Wanna Know?"   },
  { id: "4", name: "Riley Okafor",  handle: "rileyok",    color: "from-red-500 to-rose-500",       personality: "Rap Theorist",     artists: ["Kendrick Lamar", "J. Cole", "JID"],             playing: false, track: ""                   },
  { id: "5", name: "Alex Novak",    handle: "anovak",     color: "from-violet-500 to-purple-400",  personality: "Sad Indie Hours",  artists: ["Billie Eilish", "Lorde", "Mitski"],             playing: false, track: ""                   },
  { id: "6", name: "Priya Nair",    handle: "priya.wav",  color: "from-emerald-500 to-teal-400",   personality: "Global Ear",       artists: ["Arooj Aftab", "Anoushka Shankar", "Coke Studio"],playing: true, track: "Last Night"          },
];

const SUGGESTED_SEARCHES = ["Indie R&B", "Neo-Soul", "Alt-Rock", "Rap", "Dream Pop", "Hyperpop"];

// Simulated: your current track + someone else playing it right now
const LISTENING_TOGETHER = {
  user: ALL_USERS[0], // Jamie
  track: "Novacane",
  artist: "Frank Ocean",
  trackColor: "from-cyan-700 to-teal-600",
};

export function DiscoverScreen({ go }: Props) {
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0
    ? ALL_USERS.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.handle.toLowerCase().includes(query.toLowerCase()) ||
        u.personality.toLowerCase().includes(query.toLowerCase()) ||
        u.artists.some((a) => a.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const showSuggested = query.trim().length === 0;

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header + search */}
      <div className="px-4 pt-3 pb-3 shrink-0" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>
          Discover
        </h1>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#505050" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#505050] outline-none"
            style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
            placeholder="Search people, artists, genres…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#505050] text-base"
              onClick={() => setQuery("")}>✕</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Suggested tags when empty */}
        {showSuggested && (
          <div className="px-4 pt-4">
            <p className="text-[#505050] text-xs font-semibold uppercase tracking-widest mb-3">Browse by genre</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {SUGGESTED_SEARCHES.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                  style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", color: "#A0A0A0" }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Same song right now */}
            <div className="mb-5">
              <p className="text-[#505050] text-xs font-semibold uppercase tracking-widest mb-3">Listening to the same song as you</p>
              <button
                onClick={() => go("userProfile", LISTENING_TOGETHER.user.id)}
                className="w-full rounded-2xl p-3.5 text-left transition-opacity active:opacity-70"
                style={{ background: "linear-gradient(135deg, rgba(255,45,120,0.1), rgba(168,85,247,0.08))", border: "1px solid rgba(255,45,120,0.3)" }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with outer pulse ring */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full animate-ping" style={{ backgroundColor: "rgba(255,45,120,0.2)" }} />
                    <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${LISTENING_TOGETHER.user.color} flex items-center justify-center text-white font-bold text-base`}>
                      {LISTENING_TOGETHER.user.name[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-white text-sm font-bold">{LISTENING_TOGETHER.user.name}</p>
                      <span className="text-[9px] font-semibold rounded-full px-1.5 py-0.5"
                        style={{ backgroundColor: "rgba(255,45,120,0.15)", color: "#FF2D78" }}>
                        ● live
                      </span>
                    </div>
                    <p className="text-[#505050] text-[10px]">@{LISTENING_TOGETHER.user.handle}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-semibold" style={{ color: "#FF6FA3" }}>View →</p>
                  </div>
                </div>
                {/* Track card */}
                <div className="mt-3 flex items-center gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${LISTENING_TOGETHER.trackColor} shrink-0 flex items-center justify-center text-white text-sm`}>♪</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{LISTENING_TOGETHER.track}</p>
                    <p className="text-[#A0A0A0] text-[10px] truncate">{LISTENING_TOGETHER.artist}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[3,5,4,6,3,5].map((h, i) => (
                      <div key={i} className="w-0.5 rounded-full animate-pulse" style={{ height: h * 2, backgroundColor: "#FF2D78", animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-center" style={{ color: "#FFB3CC" }}>
                  You and {LISTENING_TOGETHER.user.name.split(" ")[0]} are both listening right now — say something
                </p>
              </button>
            </div>

            <p className="text-[#505050] text-xs font-semibold uppercase tracking-widest mb-3">People nearby</p>
            <div className="flex flex-col gap-2">
              {ALL_USERS.map((u) => (
                <UserRow key={u.id} user={u} go={go} />
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {!showSuggested && results.length > 0 && (
          <div className="px-4 pt-3 flex flex-col gap-2">
            <p className="text-[#505050] text-xs mb-1">{results.length} result{results.length !== 1 ? "s" : ""}</p>
            {results.map((u) => (
              <UserRow key={u.id} user={u} go={go} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!showSuggested && results.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 px-8 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-[#505050] text-sm text-center">No one matches "{query}"<br />Try an artist name or genre</p>
          </div>
        )}
      </div>
    </div>
  );
}

function UserRow({ user, go }: { user: typeof ALL_USERS[0]; go: (s: Screen, id?: string) => void }) {
  return (
    <button
      onClick={() => go("userProfile", user.id)}
      className="flex items-center gap-3 rounded-2xl p-3 text-left w-full transition-opacity active:opacity-70"
      style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
    >
      <div className="relative shrink-0">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-base`}>
          {user.name[0]}
        </div>
        {user.playing && (
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414] bg-[#FF2D78] animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{user.name}</p>
        <p className="text-[#505050] text-[10px]">@{user.handle}</p>
        {user.playing && user.track ? (
          <p className="text-[10px] mt-0.5 truncate" style={{ color: "#FF6FA3" }}>▶ {user.track}</p>
        ) : (
          <p className="text-[#A0A0A0] text-[10px] mt-0.5 truncate">{user.artists.slice(0, 2).join(" · ")}</p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className="text-[10px] font-semibold text-gradient">{user.personality}</p>
      </div>
    </button>
  );
}
