"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen, userId?: string) => void;
}

type FeedMode = "For You" | "Following";

interface Post {
  id: string;
  userId: string;
  name: string;
  username: string;
  color: string;
  time: string;
  type: "now_playing" | "song_share" | "monthly_wrap" | "repeat_milestone" | "new_discovery";
  track?: string;
  artist?: string;
  caption?: string;
  milestone?: number;
  monthLabel?: string;
  topArtists?: string[];
  personalityLabel?: string;
  discoveredArtist?: string;
  likes: number;
  comments: number;
}

const FOR_YOU: Post[] = [
  {
    id: "1", userId: "1", name: "Jamie Chen", username: "jamiechen", color: "from-cyan-500 to-teal-400",
    time: "2m", type: "now_playing",
    track: "Blonde", artist: "Frank Ocean",
    likes: 12, comments: 2,
  },
  {
    id: "2", userId: "2", name: "Mia Torres", username: "mia.beats", color: "from-pink-500 to-rose-400",
    time: "1h", type: "song_share",
    track: "Bags", artist: "Clairo",
    caption: "this song at 2am will never hit different",
    likes: 34, comments: 8,
  },
  {
    id: "3", userId: "3", name: "Sam Park", username: "sampark", color: "from-yellow-500 to-orange-400",
    time: "1d", type: "monthly_wrap",
    monthLabel: "October wrap",
    topArtists: ["Arctic Monkeys", "Radiohead", "Tame Impala"],
    personalityLabel: "Indie Nocturnal",
    likes: 21, comments: 5,
  },
  {
    id: "4", userId: "4", name: "Riley Okafor", username: "rileyok", color: "from-red-500 to-rose-500",
    time: "2d", type: "repeat_milestone",
    track: "HUMBLE.", artist: "Kendrick Lamar",
    milestone: 50,
    likes: 45, comments: 11,
  },
  {
    id: "5", userId: "5", name: "Alex Novak", username: "anovak", color: "from-violet-500 to-purple-400",
    time: "3d", type: "new_discovery",
    discoveredArtist: "Phoebe Bridgers",
    track: "Savior Complex", artist: "Phoebe Bridgers",
    likes: 18, comments: 3,
  },
];

const FOLLOWING: Post[] = [
  {
    id: "f1", userId: "1", name: "Jamie Chen", username: "jamiechen", color: "from-cyan-500 to-teal-400",
    time: "2m", type: "now_playing",
    track: "Seigfried", artist: "Frank Ocean",
    likes: 7, comments: 1,
  },
  {
    id: "f2", userId: "2", name: "Mia Torres", username: "mia.beats", color: "from-pink-500 to-rose-400",
    time: "3h", type: "song_share",
    track: "Espresso", artist: "Sabrina Carpenter",
    caption: "ok this is literally the song of the year no debate",
    likes: 29, comments: 6,
  },
];

function TrackCard({ track, artist, type }: { track: string; artist: string; type?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 mt-2" style={{ backgroundColor: "#1E1E1E", border: "1px solid #2A2A2A" }}>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-600 shrink-0 flex items-center justify-center text-white text-sm">♫</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{track}</p>
        <p className="text-[#A0A0A0] text-xs truncate">{artist}</p>
      </div>
      {type === "now_playing" && (
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "#FF2D78" }} />
          <span className="text-[10px]" style={{ color: "#FF2D78" }}>live</span>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, go, liked, onLike }: { post: Post; go: (s: Screen, id?: string) => void; liked: boolean; onLike: () => void }) {
  return (
    <div className="px-4 py-3" style={{ borderBottom: "1px solid #1E1E1E" }}>
      {/* Author row */}
      <div className="flex items-center gap-2.5 mb-2">
        <button onClick={() => go("userProfile", post.userId)}>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {post.name[0]}
          </div>
        </button>
        <div className="flex-1 min-w-0">
          <button onClick={() => go("userProfile", post.userId)}>
            <span className="text-white text-sm font-semibold">{post.name}</span>
          </button>
          <span className="text-[#505050] text-xs ml-1.5">· {post.time}</span>
        </div>
      </div>

      {/* Post body */}
      {post.type === "now_playing" && (
        <>
          <p className="text-[#A0A0A0] text-xs mb-1">▶ Listening now</p>
          <TrackCard track={post.track!} artist={post.artist!} type="now_playing" />
        </>
      )}

      {post.type === "song_share" && (
        <>
          {post.caption && <p className="text-white text-sm mb-1 leading-snug">"{post.caption}"</p>}
          <TrackCard track={post.track!} artist={post.artist!} />
        </>
      )}

      {post.type === "monthly_wrap" && (
        <div className="rounded-xl p-3 mt-1" style={{ backgroundColor: "#1E1E1E", border: "1px solid #2A2A2A" }}>
          <p className="text-white text-sm font-semibold mb-2">{post.monthLabel}</p>
          <p className="text-[#505050] text-[10px] uppercase tracking-widest font-semibold mb-1">Top Artists</p>
          {post.topArtists?.map((a, i) => (
            <p key={a} className="text-[#A0A0A0] text-xs">{i + 1}. {a}</p>
          ))}
          <div className="mt-2 inline-block rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(255,45,120,0.12)", border: "1px solid rgba(255,45,120,0.3)" }}>
            <span className="text-[10px] font-semibold" style={{ color: "#FF2D78" }}>{post.personalityLabel}</span>
          </div>
        </div>
      )}

      {post.type === "repeat_milestone" && (
        <>
          <p className="text-[#A0A0A0] text-sm mb-1">
            Just played <span className="text-white font-semibold">{post.track}</span> for the <span className="text-white font-semibold">{post.milestone}th</span> time 🔥
          </p>
          <TrackCard track={post.track!} artist={post.artist!} />
        </>
      )}

      {post.type === "new_discovery" && (
        <>
          <p className="text-[#A0A0A0] text-sm mb-1">
            Just discovered <span className="text-white font-semibold">{post.discoveredArtist}</span> ✨
          </p>
          <TrackCard track={post.track!} artist={post.artist!} />
        </>
      )}

      {/* Reactions */}
      <div className="flex items-center gap-4 mt-2.5">
        <button onClick={onLike} className="flex items-center gap-1.5 transition-opacity active:opacity-60">
          <span className="text-sm" style={{ color: liked ? "#FF2D78" : "#505050" }}>{liked ? "♥" : "♡"}</span>
          <span className="text-xs" style={{ color: liked ? "#FF2D78" : "#505050" }}>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <button className="flex items-center gap-1.5">
          <span className="text-sm text-[#505050]">💬</span>
          <span className="text-xs text-[#505050]">{post.comments}</span>
        </button>
      </div>
    </div>
  );
}

export function FeedScreen({ go }: Props) {
  const [mode, setMode] = useState<FeedMode>("For You");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const posts = mode === "For You" ? FOR_YOU : FOLLOWING;

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 shrink-0" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>Feed</h1>
        {/* Toggle */}
        <div className="flex rounded-xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}>
          {(["For You", "Following"] as FeedMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: mode === m ? "rgba(255,45,120,0.12)" : "transparent",
                color: mode === m ? "#FF2D78" : "#505050",
                borderBottom: mode === m ? "2px solid #FF2D78" : "2px solid transparent",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            go={go}
            liked={liked.has(post.id)}
            onLike={() => toggleLike(post.id)}
          />
        ))}
        {posts.length === 0 && (
          <div className="flex items-center justify-center pt-16 px-6">
            <p className="text-[#505050] text-sm italic text-center">
              Follow people in Discover to see their music activity
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
