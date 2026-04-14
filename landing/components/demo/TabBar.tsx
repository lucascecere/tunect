"use client";

import { Screen } from "./DemoShell";

interface Props {
  active: Screen;
  go: (screen: Screen) => void;
}

function DiscoverIcon({ active }: { active: boolean }) {
  const c = active ? "#FF2D78" : "#505050";
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="9.5" cy="9.5" r="6" stroke={c} strokeWidth="1.5" />
      <path d="M14 14l4.5 4.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FeedIcon({ active }: { active: boolean }) {
  const c = active ? "#FF2D78" : "#505050";
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="4" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="12" y="4" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="3" y="13" width="7" height="5" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="12" y="13" width="7" height="5" rx="1.5" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function ExploreIcon({ active }: { active: boolean }) {
  const c = active ? "#FF2D78" : "#505050";
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8.5" stroke={c} strokeWidth="1.5" />
      <path d="M14 8l-2 5.5-2.5 1L7.5 8 14 8z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="1.2" fill={c} />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  const c = active ? "#FF2D78" : "#505050";
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M4 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z"
        stroke={c} strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon({ active }: { active: boolean }) {
  const c = active ? "#FF2D78" : "#505050";
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" stroke={c} strokeWidth="1.5" />
      <path d="M3 19c0-4 3.58-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TabBar({ active, go }: Props) {
  const isDiscover = active === "discover" || active === "userProfile";
  const isFeed     = active === "feed";
  const isExplore  = active === "explore";
  const isMessages = active === "messages";
  const isProfile  = active === "profile";

  return (
    <div
      className="flex items-end justify-around bg-[#0A0A0A]"
      style={{ borderTop: "1px solid #1E1E1E", height: 64, paddingBottom: 8 }}
    >
      {/* Discover */}
      <button onClick={() => go("discover")} className="flex flex-col items-center gap-0.5 pt-2">
        <DiscoverIcon active={isDiscover} />
        <span className="text-[9px] font-medium" style={{ color: isDiscover ? "#FF2D78" : "#505050" }}>Discover</span>
      </button>

      {/* Feed */}
      <button onClick={() => go("feed")} className="flex flex-col items-center gap-0.5 pt-2">
        <FeedIcon active={isFeed} />
        <span className="text-[9px] font-medium" style={{ color: isFeed ? "#FF2D78" : "#505050" }}>Feed</span>
      </button>

      {/* Center — Explore */}
      <button
        onClick={() => go("explore")}
        className="flex items-center justify-center rounded-full text-white text-lg"
        style={{
          width: 52, height: 52, marginBottom: 14, flexShrink: 0,
          background: isExplore
            ? "linear-gradient(135deg, #A855F7, #FF2D78)"
            : "linear-gradient(135deg, #FF2D78, #A855F7)",
          boxShadow: "0 4px 20px rgba(255,45,120,0.45)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <path d="M14.5 7.5l-2.2 5.8-3 1.2 1.2-3L14.5 7.5z" fill="white" />
          <circle cx="11" cy="11" r="1.3" fill="white" opacity="0.7" />
        </svg>
      </button>

      {/* Messages */}
      <button onClick={() => go("messages")} className="flex flex-col items-center gap-0.5 pt-2">
        <ChatIcon active={isMessages} />
        <span className="text-[9px] font-medium" style={{ color: isMessages ? "#FF2D78" : "#505050" }}>Messages</span>
      </button>

      {/* Profile */}
      <button onClick={() => go("profile")} className="flex flex-col items-center gap-0.5 pt-2">
        <PersonIcon active={isProfile} />
        <span className="text-[9px] font-medium" style={{ color: isProfile ? "#FF2D78" : "#505050" }}>Profile</span>
      </button>
    </div>
  );
}
