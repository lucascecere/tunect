"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
  userId?: string;
}

const USERS: Record<string, any> = {
  "1": {
    name: "Jamie Chen", username: "jamiechen",
    bio: "music is the only language i speak fluently",
    score: 94, sharedArtists: 14, sharedGenres: ["Indie R&B", "Neo-Soul"],
    color: "from-cyan-500 to-teal-400",
    artists: ["Frank Ocean", "Blood Orange", "SZA", "Solange", "Steve Lacy"],
    genres: [{ genre: "Indie R&B", pct: 74 }, { genre: "Neo-Soul", pct: 55 }, { genre: "Alt-Pop", pct: 33 }],
    label: "Soul Keeper",
    playing: true, track: "Seigfried",
  },
  "2": {
    name: "Mia Torres", username: "mia.beats",
    bio: "if it doesn't hit in 5 seconds i'm skipping",
    score: 81, sharedArtists: 9, sharedGenres: ["R&B", "Pop"],
    color: "from-pink-500 to-rose-400",
    artists: ["The Weeknd", "Doja Cat", "PinkPantheress", "Charli XCX", "Tyla"],
    genres: [{ genre: "Pop R&B", pct: 66 }, { genre: "Dance Pop", pct: 48 }, { genre: "Electronic", pct: 29 }],
    label: "Pop Maximalist",
    playing: false,
  },
  "3": {
    name: "Sam Park", username: "sampark",
    bio: "every drive needs a soundtrack",
    score: 67, sharedArtists: 6, sharedGenres: ["Indie Rock", "Alternative"],
    color: "from-yellow-500 to-orange-400",
    artists: ["Arctic Monkeys", "Radiohead", "Tame Impala", "Foals", "The National"],
    genres: [{ genre: "Indie Rock", pct: 71 }, { genre: "Alternative", pct: 59 }, { genre: "Psychedelic", pct: 38 }],
    label: "Indie Nocturnal",
    playing: true, track: "Do I Wanna Know?",
  },
  "4": {
    name: "Riley Okafor", username: "rileyok",
    bio: "bars over beats always",
    score: 53, sharedArtists: 4, sharedGenres: ["Hip-Hop"],
    color: "from-red-500 to-rose-500",
    artists: ["Kendrick Lamar", "J. Cole", "JID", "Isaiah Rashad", "Ab-Soul"],
    genres: [{ genre: "Conscious Rap", pct: 68 }, { genre: "Hip-Hop", pct: 61 }, { genre: "Jazz Rap", pct: 27 }],
    label: "Hip-Hop Purist",
    playing: false,
  },
  "5": {
    name: "Alex Novak", username: "anovak",
    bio: "sad songs only, you wouldn't get it",
    score: 44, sharedArtists: 2, sharedGenres: ["Indie Pop"],
    color: "from-violet-500 to-purple-400",
    artists: ["Billie Eilish", "Lorde", "Mitski", "Phoebe Bridgers", "boygenius"],
    genres: [{ genre: "Indie Pop", pct: 63 }, { genre: "Dream Pop", pct: 44 }, { genre: "Folk", pct: 31 }],
    label: "Slow Burn Listener",
    playing: false,
  },
};

function scoreColor(s: number) {
  if (s >= 80) return "#22C55E";
  if (s >= 60) return "#A855F7";
  if (s >= 40) return "#F59E0B";
  return "#505050";
}

export function UserProfileScreen({ go, userId }: Props) {
  const [followed, setFollowed] = useState(false);
  const user = USERS[userId ?? "1"] ?? USERS["1"];
  const sc = scoreColor(user.score);

  return (
    <div className="h-full overflow-y-auto bg-[#0A0A0A]" style={{ scrollbarWidth: "none" }}>
      {/* Back */}
      <button
        onClick={() => go("explore")}
        className="flex items-center gap-1 px-4 pt-3 pb-1 text-sm font-medium"
        style={{ color: "#FF2D78", fontFamily: "var(--font-dm-sans)" }}
      >
        ← Explore
      </button>

      {/* Profile header */}
      <div className="flex flex-col items-center px-6 pt-2 pb-5">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-3xl mb-3`}>
          {user.name[0]}
        </div>
        <p className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.3px" }}>{user.name}</p>
        <p className="text-[#A0A0A0] text-sm mt-0.5">@{user.username}</p>
        <p className="text-[#505050] text-xs mt-2 text-center italic">{user.bio}</p>

        {/* Now playing */}
        {user.playing && (
          <div className="mt-3 flex items-center gap-2 rounded-full px-3 py-1.5" style={{ backgroundColor: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "#FF2D78" }} />
            <span className="text-xs text-white">▶ {user.track}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2.5 px-5 mb-4">
        <button
          onClick={() => setFollowed(!followed)}
          className="flex-1 rounded-full py-3 text-sm font-semibold transition-all"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: followed ? "transparent" : "linear-gradient(135deg, #FF2D78, #A855F7)",
            color: followed ? "#A0A0A0" : "#fff",
            border: followed ? "1px solid #2A2A2A" : "none",
            boxShadow: followed ? "none" : "0 4px 16px rgba(255,45,120,0.3)",
          }}
        >
          {followed ? "Following ✓" : "Follow"}
        </button>
        <button
          className="flex-1 rounded-full py-3 text-sm font-semibold text-[#A0A0A0]"
          style={{ fontFamily: "var(--font-dm-sans)", border: "1px solid #2A2A2A", backgroundColor: "#141414" }}
        >
          Message
        </button>
      </div>

      {/* Compatibility card */}
      <div className="mx-4 rounded-2xl p-4 mb-4" style={{ backgroundColor: "#141414", border: `1px solid ${sc}25` }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-bold" style={{ color: sc, fontFamily: "var(--font-dm-sans)" }}>{user.score}%</span>
          <span className="text-[#A0A0A0] text-base">compatible</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ backgroundColor: "#2A2A2A" }}>
          <div className="h-full rounded-full" style={{ width: `${user.score}%`, backgroundColor: sc }} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#A0A0A0]">{user.sharedArtists} shared artists</span>
          <span className="text-[#505050] text-xs">·</span>
          <span className="text-xs text-[#A0A0A0]">{user.sharedGenres.join(", ")}</span>
        </div>
      </div>

      {/* Top Artists */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Top Artists</p>
        <div className="flex flex-col gap-2.5">
          {user.artists.map((a: string, i: number) => (
            <div key={a} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${user.color} shrink-0 flex items-center justify-center text-white text-xs font-bold`}>
                {a[0]}
              </div>
              <span className="text-white text-sm flex-1">{a}</span>
              <span className="text-[#505050] text-xs">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Music Personality</p>
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
          <p className="text-lg font-bold mb-3" style={{ color: "#FF2D78", fontFamily: "var(--font-dm-sans)" }}>{user.label}</p>
          {user.genres.map(({ genre, pct }: any) => (
            <div key={genre} className="mb-2">
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

      {/* Shared songs */}
      <div className="px-4 pb-6">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-2">Songs You Both Love</p>
        <p className="text-[#505050] text-xs italic">No shared songs yet — your tastes might surprise you</p>
      </div>
    </div>
  );
}
