"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen, userId?: string) => void;
}

type Tab = "For You" | "Friends";

const REGIONS = [
  {
    id: "nyc", label: "New York", emoji: "🗽",
    tracks: [
      { track: "Blinding Lights",   artist: "The Weeknd",      color: "from-blue-700 to-indigo-600"  },
      { track: "A$AP Forever",      artist: "A$AP Rocky",      color: "from-red-700 to-rose-600"     },
      { track: "Empire State of Mind", artist: "Jay-Z",        color: "from-zinc-700 to-zinc-500"    },
    ],
  },
  {
    id: "la", label: "Los Angeles", emoji: "🌴",
    tracks: [
      { track: "Not Like Us",       artist: "Kendrick Lamar",  color: "from-purple-700 to-violet-500"},
      { track: "Low Life",          artist: "Future",          color: "from-orange-700 to-amber-500" },
      { track: "Novacane",          artist: "Frank Ocean",     color: "from-teal-700 to-cyan-500"    },
    ],
  },
  {
    id: "atl", label: "Atlanta", emoji: "🍑",
    tracks: [
      { track: "Rich Flex",         artist: "Drake & 21",      color: "from-yellow-700 to-orange-500"},
      { track: "Bad and Boujee",    artist: "Migos",           color: "from-emerald-700 to-green-500"},
      { track: "Lifestyle",         artist: "Rich Gang",       color: "from-pink-700 to-rose-500"    },
    ],
  },
  {
    id: "uk", label: "London", emoji: "🎡",
    tracks: [
      { track: "Boy's a liar",      artist: "PinkPantheress",  color: "from-fuchsia-700 to-pink-500" },
      { track: "Escapism",          artist: "RAYE",            color: "from-cyan-700 to-sky-500"     },
      { track: "Strangers",         artist: "Kenya Grace",     color: "from-violet-700 to-purple-500"},
    ],
  },
];

const FOR_YOU_CARDS = [
  { id: "fy1", type: "new_release", size: "tall",   artist: "Frank Ocean",     track: "Pyramids",           label: "New from an artist you love",           color: "from-cyan-700 to-teal-500",        plays: "2.4M" },
  { id: "fy2", type: "trending",    size: "square", artist: "SZA",             track: "Snooze",             label: "Trending in Indie R&B",                 color: "from-rose-600 to-pink-500",        plays: "8.1M" },
  { id: "fy3", type: "similar",     size: "square", artist: "Steve Lacy",      track: "Bad Habit",          label: "Sounds like Frank Ocean",               color: "from-amber-600 to-yellow-400",     plays: "12M"  },
  { id: "fy4", type: "deep_cut",    size: "tall",   artist: "Blood Orange",    track: "You're Not Good Enough", label: "Deep cut in your rotation",         color: "from-violet-700 to-purple-500",    plays: "940K" },
  { id: "fy5", type: "genre",       size: "square", artist: "Syd",             track: "Body",               label: "Genre: Alt-R&B",                        color: "from-blue-600 to-indigo-500",      plays: "3.2M" },
  { id: "fy6", type: "trending",    size: "square", artist: "PinkPantheress",  track: "Boy's a liar",       label: "Trending with people like you",         color: "from-pink-600 to-fuchsia-500",     plays: "22M"  },
];

const FRIEND_ACTIVITY = [
  { id: "fr1", user: "Jamie Chen",   handle: "jamiechen", avatar: "from-cyan-500 to-teal-400",    type: "now_playing", track: "Nights",             artist: "Frank Ocean",       caption: "this song hits different at 2am",                   ago: "live", trackColor: "from-cyan-700 to-teal-600"    },
  { id: "fr2", user: "Mia Torres",   handle: "mia.beats",  avatar: "from-pink-500 to-rose-400",   type: "discovery",   track: "Dandelion",          artist: "Caribou",           caption: "never heard this until today. obsessed.",           ago: "12m",  trackColor: "from-lime-600 to-green-500"   },
  { id: "fr3", user: "Sam Park",     handle: "sampark",    avatar: "from-yellow-500 to-orange-400",type: "milestone",  track: "Do I Wanna Know?",   artist: "Arctic Monkeys",    caption: "played this 50 times 🔁",                            ago: "34m",  trackColor: "from-orange-600 to-red-500"   },
  { id: "fr4", user: "Jamie Chen",   handle: "jamiechen", avatar: "from-cyan-500 to-teal-400",    type: "share",       track: "Pilot Jones",        artist: "Frank Ocean",       caption: "most underrated frank track, change my mind",       ago: "1h",   trackColor: "from-teal-700 to-cyan-500"    },
  { id: "fr5", user: "Riley Okafor", handle: "rileyok",    avatar: "from-red-500 to-rose-500",    type: "discovery",   track: "The Heart Part 5",   artist: "Kendrick Lamar",    caption: "how did i sleep on this",                           ago: "2h",   trackColor: "from-red-700 to-rose-600"     },
];

function typeBadge(type: string) {
  if (type === "new_release") return "NEW";
  if (type === "trending")    return "🔥";
  if (type === "similar")     return "SIMILAR";
  if (type === "deep_cut")    return "DEEP CUT";
  return "GENRE";
}

function GridCard({ card }: { card: typeof FOR_YOU_CARDS[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} flex flex-col justify-end cursor-pointer`}
      style={{ aspectRatio: card.size === "tall" ? "0.72" : "1" }}
    >
      <div className="absolute inset-0 opacity-25"
        style={{ background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.3) 0%, transparent 55%)" }} />

      <div className="absolute top-2 left-2">
        <div className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
          {typeBadge(card.type)}
        </div>
      </div>

      <button
        className="absolute top-2 right-2 flex items-center justify-center"
        style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.45)" }}
        onClick={() => setLiked((l) => !l)}
      >
        <span style={{ fontSize: 10, color: liked ? "#FF2D78" : "#fff" }}>{liked ? "♥" : "♡"}</span>
      </button>

      <div className="relative px-2.5 pt-4 pb-2.5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" }}>
        <p className="text-white text-[10px] font-bold leading-tight truncate">{card.track}</p>
        <p className="text-white/65 text-[9px] truncate">{card.artist}</p>
        <p className="text-white/40 text-[8px] mt-0.5 truncate leading-tight">{card.label}</p>
      </div>
    </div>
  );
}

function FriendPost({ post }: { post: typeof FRIEND_ACTIVITY[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="px-4 py-3" style={{ borderBottom: "1px solid #1E1E1E" }}>
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.avatar} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {post.user[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-xs font-semibold">{post.user}</span>
            {post.type === "now_playing" && (
              <span className="flex items-center gap-1 text-[9px] font-semibold rounded-full px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(255,45,120,0.12)", color: "#FF2D78" }}>
                <span className="w-1 h-1 rounded-full bg-[#FF2D78] animate-pulse inline-block" />
                live
              </span>
            )}
          </div>
          <span className="text-[#505050] text-[10px]">@{post.handle} · {post.ago === "live" ? "now" : `${post.ago} ago`}</span>
        </div>
      </div>

      <div className="rounded-xl flex items-center gap-2.5 p-2.5 mb-2.5"
        style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${post.trackColor} shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate">{post.track}</p>
          <p className="text-[#A0A0A0] text-[10px] truncate">{post.artist}</p>
        </div>
        <span className="text-[#505050] text-sm">▷</span>
      </div>

      <p className="text-[#A0A0A0] text-xs mb-2 leading-relaxed">{post.caption}</p>

      <div className="flex items-center gap-4">
        <button onClick={() => setLiked((l) => !l)} className="flex items-center gap-1 text-[10px]"
          style={{ color: liked ? "#FF2D78" : "#505050" }}>
          <span>{liked ? "♥" : "♡"}</span><span>{liked ? "1" : "Like"}</span>
        </button>
        <button className="flex items-center gap-1 text-[10px] text-[#505050]">
          <span>💬</span><span>Reply</span>
        </button>
        <button className="flex items-center gap-1 text-[10px] text-[#505050]">
          <span>↗</span><span>Share</span>
        </button>
      </div>
    </div>
  );
}

function RegionalTrending() {
  const [active, setActive] = useState("nyc");
  const region = REGIONS.find((r) => r.id === active)!;

  return (
    <div className="mb-2">
      {/* Section header */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <div>
          <p className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>Trending by City</p>
          <p className="text-[#505050] text-[10px]">What's hot where people listen</p>
        </div>
        <span className="text-[#505050] text-[10px]">charts</span>
      </div>

      {/* City selector */}
      <div className="flex gap-2 px-3 pb-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {REGIONS.map((r) => (
          <button key={r.id} onClick={() => setActive(r.id)}
            className="shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
            style={{
              backgroundColor: active === r.id ? "rgba(255,45,120,0.12)" : "#141414",
              border: `1px solid ${active === r.id ? "#FF2D78" : "#2A2A2A"}`,
              color: active === r.id ? "#FF2D78" : "#505050",
            }}>
            <span>{r.emoji}</span>{r.label}
          </button>
        ))}
      </div>

      {/* Track list */}
      <div className="mx-3 rounded-2xl overflow-hidden" style={{ border: "1px solid #2A2A2A", backgroundColor: "#141414" }}>
        {region.tracks.map((t, i) => (
          <div key={t.track}
            className="flex items-center gap-3 px-3 py-2.5"
            style={{ borderBottom: i < region.tracks.length - 1 ? "1px solid #1E1E1E" : "none" }}>
            <span className="text-[#505050] text-xs font-bold w-4 shrink-0">#{i + 1}</span>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${t.color} shrink-0 flex items-center justify-center text-white text-sm`}>♪</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{t.track}</p>
              <p className="text-[#A0A0A0] text-[10px] truncate">{t.artist}</p>
            </div>
            {i === 0 && (
              <span className="shrink-0 text-[9px] font-bold rounded-full px-2 py-0.5"
                style={{ backgroundColor: "rgba(255,45,120,0.12)", color: "#FF2D78" }}>
                🔥 #1
              </span>
            )}
          </div>
        ))}
        <div className="px-3 py-2 flex items-center gap-1.5" style={{ borderTop: "1px solid #1E1E1E" }}>
          <span className="text-[9px] text-[#505050]">Based on streams in the last 7 days · {region.emoji} {region.label}</span>
        </div>
      </div>
    </div>
  );
}

export function ExploreScreen({ go }: Props) {
  const [tab, setTab] = useState<Tab>("For You");

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="px-4 pt-3 pb-0 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>
          Explore
        </h1>
        <div className="flex" style={{ borderBottom: "1px solid #1E1E1E" }}>
          {(["For You", "Friends"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="pb-2.5 mr-5 text-sm font-semibold transition-colors relative"
              style={{ color: tab === t ? "#fff" : "#505050" }}>
              {t}
              {tab === t && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,#FF2D78,#A855F7)" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {tab === "For You" ? (
          <div>
            <RegionalTrending />
            <div className="px-3 pt-1 pb-1">
              <p className="text-[#505050] text-[10px] font-semibold uppercase tracking-widest">Picked for you</p>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2" style={{ gridAutoRows: "minmax(0,1fr)" }}>
              {FOR_YOU_CARDS.map((card) => (
                <div key={card.id} className={card.size === "tall" ? "row-span-2" : ""}>
                  <GridCard card={card} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-1">
            {FRIEND_ACTIVITY.map((post) => (
              <FriendPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
