"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
  userId?: string;
}

const AMBER = "#FF2D78";
const AMBER_BG = "rgba(255,45,120,0.1)";
const AMBER_BORDER = "rgba(255,45,120,0.25)";
const GREEN = "#4CAF7D";
const OG_GOLD = "#FFD700";

const USERS: Record<string, any> = {
  "1": {
    name: "Jamie Chen", username: "jamiechen",
    bio: "music is the only language i speak fluently",
    score: 94,
    breakdown: [
      { label: "Artist overlap",    pct: 88 },
      { label: "Genre match",       pct: 95 },
      { label: "Era alignment",     pct: 91 },
      { label: "Listening energy",  pct: 82 },
    ],
    sharedArtists: 14, sharedSongs: 8, sharedGenres: 5,
    sharedGenreList: ["Indie R&B", "Neo-Soul"],
    color: "from-cyan-500 to-teal-400",
    artists: ["Frank Ocean", "SZA", "Blood Orange", "Solange", "Steve Lacy"],
    genres: [
      { genre: "Indie R&B", pct: 81 },
      { genre: "Neo-Soul",  pct: 67 },
      { genre: "Jazz",      pct: 43 },
    ],
    label: "Night Owl",
    playing: true, track: "Novacane",
    ogBadges: [
      { artist: "Frank Ocean", badge: "🌟 Founder", gold: true  },
      { artist: "Noname",      badge: "🔥 Day One", gold: false },
    ],
    sharedSongList: [
      { name: "Novacane",       artist: "Frank Ocean" },
      { name: "Losing You",     artist: "Solange" },
      { name: "Jesus Children", artist: "Blood Orange" },
    ],
  },
  "2": {
    name: "Mia Torres", username: "mia.beats",
    bio: "if it doesn't hit in 5 seconds i'm skipping",
    score: 81,
    breakdown: [
      { label: "Artist overlap",   pct: 74 },
      { label: "Genre match",      pct: 83 },
      { label: "Era alignment",    pct: 79 },
      { label: "Listening energy", pct: 70 },
    ],
    sharedArtists: 9, sharedSongs: 5, sharedGenres: 3,
    sharedGenreList: ["R&B", "Pop"],
    color: "from-pink-500 to-rose-400",
    artists: ["The Weeknd", "Doja Cat", "PinkPantheress", "Charli XCX", "Tyla"],
    genres: [
      { genre: "Pop R&B",    pct: 66 },
      { genre: "Dance Pop",  pct: 48 },
      { genre: "Electronic", pct: 29 },
    ],
    label: "Pop Maximalist",
    playing: false,
    ogBadges: [
      { artist: "PinkPantheress", badge: "🔥 OG Fan", gold: false },
    ],
    sharedSongList: [
      { name: "Can't Feel My Face", artist: "The Weeknd" },
      { name: "Paint The Town Red", artist: "Doja Cat" },
    ],
  },
  "3": {
    name: "Sam Park", username: "sampark",
    bio: "every drive needs a soundtrack",
    score: 67,
    breakdown: [
      { label: "Artist overlap",   pct: 58 },
      { label: "Genre match",      pct: 71 },
      { label: "Era alignment",    pct: 64 },
      { label: "Listening energy", pct: 55 },
    ],
    sharedArtists: 6, sharedSongs: 2, sharedGenres: 2,
    sharedGenreList: ["Indie Rock", "Alternative"],
    color: "from-yellow-500 to-orange-400",
    artists: ["Arctic Monkeys", "Radiohead", "Tame Impala", "Foals", "The National"],
    genres: [
      { genre: "Indie Rock",   pct: 71 },
      { genre: "Alternative",  pct: 59 },
      { genre: "Psychedelic",  pct: 38 },
    ],
    label: "Indie Nocturnal",
    playing: true, track: "Do I Wanna Know?",
    ogBadges: [],
    sharedSongList: [],
  },
  "4": {
    name: "Riley Okafor", username: "rileyok",
    bio: "bars over beats always",
    score: 53,
    breakdown: [
      { label: "Artist overlap",   pct: 44 },
      { label: "Genre match",      pct: 58 },
      { label: "Era alignment",    pct: 52 },
      { label: "Listening energy", pct: 47 },
    ],
    sharedArtists: 4, sharedSongs: 1, sharedGenres: 2,
    sharedGenreList: ["Hip-Hop"],
    color: "from-red-500 to-rose-500",
    artists: ["Kendrick Lamar", "J. Cole", "JID", "Isaiah Rashad", "Ab-Soul"],
    genres: [
      { genre: "Conscious Rap", pct: 68 },
      { genre: "Hip-Hop",       pct: 61 },
      { genre: "Jazz Rap",      pct: 27 },
    ],
    label: "Hip-Hop Purist",
    playing: false,
    ogBadges: [],
    sharedSongList: [],
  },
  "5": {
    name: "Alex Novak", username: "anovak",
    bio: "sad songs only, you wouldn't get it",
    score: 44,
    breakdown: [
      { label: "Artist overlap",   pct: 33 },
      { label: "Genre match",      pct: 48 },
      { label: "Era alignment",    pct: 41 },
      { label: "Listening energy", pct: 38 },
    ],
    sharedArtists: 2, sharedSongs: 0, sharedGenres: 1,
    sharedGenreList: ["Indie Pop"],
    color: "from-violet-500 to-purple-400",
    artists: ["Billie Eilish", "Lorde", "Mitski", "Phoebe Bridgers", "boygenius"],
    genres: [
      { genre: "Indie Pop",  pct: 63 },
      { genre: "Dream Pop",  pct: 44 },
      { genre: "Folk",       pct: 31 },
    ],
    label: "Slow Burn Listener",
    playing: false,
    ogBadges: [],
    sharedSongList: [],
  },
};

const MY_NOW_PLAYING = "Novacane";

type ConnectState = "connect" | "requested" | "connected";

function scoreColor(s: number) {
  if (s >= 80) return GREEN;
  if (s >= 60) return "#3B82F6";
  if (s >= 40) return "#F59E0B";
  return "#505050";
}

export function UserProfileScreen({ go, userId }: Props) {
  const [followed, setFollowed] = useState(false);
  const [connectState, setConnectState] = useState<ConnectState>("connect");
  const user = USERS[userId ?? "1"] ?? USERS["1"];
  const sc = scoreColor(user.score);
  const listeningTogether = user.playing && user.track === MY_NOW_PLAYING;

  function handleConnect() {
    if (connectState === "connect") setConnectState("requested");
    else if (connectState === "requested") setConnectState("connect");
  }

  return (
    <div className="h-full overflow-y-auto bg-[#0A0A0A]" style={{ scrollbarWidth: "none" }}>
      {/* Back */}
      <button
        onClick={() => go("discover")}
        className="flex items-center gap-1 px-4 pt-3 pb-1 text-sm font-medium"
        style={{ color: AMBER }}
      >
        ← Discover
      </button>

      {/* Profile header */}
      <div className="flex flex-col items-center px-6 pt-2 pb-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-3xl mb-3`}>
          {user.name[0]}
        </div>
        <p className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.3px" }}>
          {user.name}
        </p>
        <p className="text-[#A0A0A0] text-sm mt-0.5">@{user.username}</p>
        <p className="text-[#505050] text-xs mt-2 text-center italic">{user.bio}</p>
        {/* Personality badge */}
        <div className="mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1"
          style={{ backgroundColor: AMBER_BG, border: `1px solid ${AMBER_BORDER}` }}>
          <span className="text-[11px] font-semibold" style={{ color: AMBER }}>🎵 {user.label}</span>
        </div>
        {user.playing && (
          <div className="mt-2.5 flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(76,175,125,0.1)", border: "1px solid rgba(76,175,125,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: GREEN }} />
            <span className="text-xs text-white">▶ {user.track}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2.5 px-5 mb-4">
        <button
          onClick={() => setFollowed(!followed)}
          className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all"
          style={{
            backgroundColor: followed ? "transparent" : "#1E1E1E",
            color: followed ? "#A0A0A0" : "#A0A0A0",
            border: "1px solid #2A2A2A",
          }}
        >
          {followed ? "Following ✓" : "Follow"}
        </button>
        <button
          onClick={handleConnect}
          className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all"
          style={{
            backgroundColor: connectState === "connect" ? AMBER : connectState === "connected" ? "rgba(76,175,125,0.12)" : "#141414",
            color: connectState === "connect" ? "#000" : connectState === "connected" ? GREEN : "#505050",
            border: connectState === "connect" ? "none" : connectState === "connected" ? "1px solid rgba(76,175,125,0.3)" : "1px solid #2A2A2A",
            boxShadow: connectState === "connect" ? `0 4px 16px rgba(255,45,120,0.3)` : "none",
          }}
        >
          {connectState === "connected" ? "Connected ✓" : connectState === "requested" ? "Requested" : "Connect"}
        </button>
      </div>

      {/* Listening Together banner */}
      {listeningTogether && (
        <div className="mx-4 mb-4 rounded-2xl p-3.5 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, rgba(76,175,125,0.1), rgba(255,45,120,0.08))", border: "1px solid rgba(76,175,125,0.3)" }}>
          <div className="relative shrink-0 flex items-center justify-center" style={{ width: 36, height: 36 }}>
            <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: "rgba(76,175,125,0.2)" }} />
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: GREEN }}>
              <span style={{ fontSize: 14 }}>♪</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold leading-tight">Listening together right now</p>
            <p className="text-[10px] mt-0.5 truncate text-[#A0A0A0]">
              You and {user.name.split(" ")[0]} are both playing <span className="font-semibold text-white">"{user.track}"</span>
            </p>
          </div>
          <button className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold text-black"
            style={{ backgroundColor: AMBER }}>
            Say hi →
          </button>
        </div>
      )}

      {/* Compatibility card — 4 breakdown bars */}
      <div className="mx-4 rounded-2xl p-4 mb-4" style={{ backgroundColor: "#141414", border: `1px solid ${sc}25` }}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold" style={{ color: sc, fontFamily: "var(--font-dm-sans)" }}>{user.score}%</span>
          <span className="text-[#A0A0A0] text-base">compatible</span>
        </div>
        <p className="text-[#505050] text-[10px] mb-3">
          {user.sharedArtists} shared artists · {user.sharedSongs} shared songs · {user.sharedGenres} shared genres
        </p>
        {/* 4 breakdown bars */}
        <div className="flex flex-col gap-2">
          {user.breakdown.map(({ label, pct }: { label: string; pct: number }) => (
            <div key={label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[#A0A0A0] text-[10px]">{label}</span>
                <span className="text-xs font-semibold" style={{ color: sc }}>{pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#2A2A2A" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: sc }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Their Taste DNA */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Their Taste DNA</p>
        <div className="rounded-2xl p-3.5" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
          {user.genres.map(({ genre, pct }: any) => (
            <div key={genre} className="mb-2 last:mb-0">
              <div className="flex justify-between mb-0.5">
                <span className="text-[#A0A0A0] text-xs">{genre}</span>
                <span className="text-[#505050] text-xs">{pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#2A2A2A" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: AMBER }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OG Badges */}
      {user.ogBadges?.length > 0 && (
        <div className="px-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: OG_GOLD }}>
            Their OG Badges
          </p>
          <div className="flex flex-col gap-2">
            {user.ogBadges.map((b: any) => (
              <div key={b.artist} className="flex items-center gap-3 rounded-xl px-3 py-2"
                style={{
                  backgroundColor: "#141414",
                  border: b.gold ? "1px solid rgba(255,215,0,0.3)" : "1px solid #2A2A2A",
                  boxShadow: b.gold ? "0 0 12px rgba(255,215,0,0.1)" : "none",
                }}>
                <span className="text-sm">🎤</span>
                <span className="text-white text-xs font-semibold flex-1">{b.artist}</span>
                <span className="text-[10px] font-bold rounded-full px-2 py-0.5"
                  style={{
                    color: b.gold ? OG_GOLD : AMBER,
                    backgroundColor: b.gold ? "rgba(255,215,0,0.1)" : AMBER_BG,
                    border: `1px solid ${b.gold ? "rgba(255,215,0,0.3)" : AMBER_BORDER}`,
                  }}>
                  {b.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Songs You Both Love */}
      <div className="px-4 pb-6">
        <p className="text-[10px] font-semibold text-[#505050] uppercase tracking-widest mb-3">Songs You Both Love</p>
        {user.sharedSongList?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {user.sharedSongList.map((s: any) => (
              <div key={s.name} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-600 flex items-center justify-center text-white text-xs shrink-0">♫</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{s.name}</p>
                  <p className="text-[#A0A0A0] text-xs truncate">{s.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#505050] text-xs italic">No shared songs yet — your tastes might surprise you</p>
        )}
      </div>
    </div>
  );
}
