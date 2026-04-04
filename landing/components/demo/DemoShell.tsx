"use client";

import { useState } from "react";
import { SplashScreen } from "./screens/SplashScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ExploreScreen } from "./screens/ExploreScreen";
import { UserProfileScreen } from "./screens/UserProfileScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { TabBar } from "./TabBar";

export type Screen =
  | "splash"
  | "profile"
  | "explore"
  | "userProfile"
  | "messages";

export type NavState = {
  screen: Screen;
  userId?: string;
};

export function DemoShell() {
  const [nav, setNav] = useState<NavState>({ screen: "splash" });

  function go(screen: Screen, userId?: string) {
    setNav({ screen, userId });
  }

  const showTabs = nav.screen !== "splash";

  return (
    <div className="relative" style={{ width: 375 }}>
      {/* Outer glow */}
      <div
        className="animate-glow-pulse pointer-events-none absolute inset-0 -z-10 scale-105 rounded-[48px] blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(255,45,120,0.2) 0%, rgba(168,85,247,0.15) 60%, transparent 80%)" }}
      />

      {/* Phone frame */}
      <div
        className="relative overflow-hidden bg-[#0A0A0A]"
        style={{
          width: 375,
          height: 780,
          borderRadius: 44,
          border: "1.5px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-8 pt-4 pb-1 bg-[#0A0A0A]">
          <span className="text-[11px] font-semibold text-white/70">9:41</span>
          <div className="h-5 w-24 rounded-full bg-black" />
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-3 rounded-sm bg-white/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Screen content */}
        <div className="relative flex-1 overflow-hidden" style={{ height: showTabs ? 668 : 720 }}>
          {nav.screen === "splash" && <SplashScreen go={go} />}
          {nav.screen === "profile" && <ProfileScreen go={go} />}
          {nav.screen === "explore" && <ExploreScreen go={go} />}
          {nav.screen === "userProfile" && <UserProfileScreen go={go} userId={nav.userId} />}
          {nav.screen === "messages" && <MessagesScreen go={go} />}
        </div>

        {/* Tab bar */}
        {showTabs && <TabBar active={nav.screen} go={go} />}

        {/* Home indicator */}
        <div className="flex justify-center pb-2 bg-[#0A0A0A]">
          <div className="h-1 w-28 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Hint text */}
      <p className="mt-5 text-center text-xs text-[#505050]" style={{ fontFamily: "var(--font-dm-sans)" }}>
        tap to interact · mock data
      </p>
    </div>
  );
}
