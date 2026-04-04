"use client";

import { Screen } from "./DemoShell";

interface Props {
  active: Screen;
  go: (screen: Screen) => void;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H14v-5H8v5H4a1 1 0 0 1-1-1V9.5z"
        stroke={active ? "#FF2D78" : "#505050"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="9.5" cy="9.5" r="6" stroke={active ? "#FF2D78" : "#505050"} strokeWidth="1.5" />
      <path d="M14 14l4.5 4.5" stroke={active ? "#FF2D78" : "#505050"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M4 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z"
        stroke={active ? "#FF2D78" : "#505050"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" stroke={active ? "#FF2D78" : "#505050"} strokeWidth="1.5" />
      <path d="M3 19c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? "#FF2D78" : "#505050"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TabBar({ active, go }: Props) {
  const isProfile = active === "profile";
  const isExplore = active === "explore";
  const isMessages = active === "messages";

  return (
    <div
      className="flex items-center justify-around bg-[#0A0A0A] border-t"
      style={{ borderColor: "#1E1E1E", paddingTop: 10, paddingBottom: 8, height: 60 }}
    >
      {/* Profile */}
      <button onClick={() => go("profile")} className="flex flex-col items-center gap-0.5 pb-1">
        <PersonIcon active={isProfile} />
        <span className="text-[9px]" style={{ color: isProfile ? "#FF2D78" : "#505050" }}>Profile</span>
      </button>

      {/* Explore */}
      <button onClick={() => go("explore")} className="flex flex-col items-center gap-0.5 pb-1">
        <SearchIcon active={isExplore} />
        <span className="text-[9px]" style={{ color: isExplore ? "#FF2D78" : "#505050" }}>Explore</span>
      </button>

      {/* Center tunect button */}
      <button
        onClick={() => go("profile")}
        className="flex items-center justify-center rounded-full text-white text-lg"
        style={{
          width: 48,
          height: 48,
          marginBottom: 16,
          background: "linear-gradient(135deg, #FF2D78, #A855F7)",
          boxShadow: "0 4px 16px rgba(255,45,120,0.4)",
        }}
      >
        ♪
      </button>

      {/* Messages */}
      <button onClick={() => go("messages")} className="flex flex-col items-center gap-0.5 pb-1">
        <ChatIcon active={isMessages} />
        <span className="text-[9px]" style={{ color: isMessages ? "#FF2D78" : "#505050" }}>Messages</span>
      </button>

      {/* Placeholder 5th */}
      <button onClick={() => go("profile")} className="flex flex-col items-center gap-0.5 pb-1 opacity-0 pointer-events-none">
        <HomeIcon active={false} />
        <span className="text-[9px] text-[#505050]"> </span>
      </button>
    </div>
  );
}
