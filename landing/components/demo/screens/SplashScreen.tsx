"use client";

import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
}

export function SplashScreen({ go }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-between h-full bg-[#0A0A0A] px-8 py-10 overflow-hidden">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "#E8A838" }} />
      <div className="pointer-events-none absolute bottom-[40px] right-[-80px] w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#C23B3B" }} />

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* Icon */}
        <div className="relative">
          <div
            className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center text-4xl text-white"
            style={{
              background: "linear-gradient(135deg, #E8A838, #C23B3B)",
              boxShadow: "0 12px 32px rgba(232,168,56,0.4)",
            }}
          >
            ♪
          </div>
          <div className="absolute top-0 right-[-6px] w-3 h-3 rounded-full bg-[#C23B3B]" />
          <div className="absolute bottom-1 right-[-14px] w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E8A838" }} />
        </div>

        <div className="text-center mt-2">
          <h1
            className="text-[38px] font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-1.5px" }}
          >
            tunect
          </h1>
          <p className="text-sm text-[#A0A0A0] mt-2">Connect through music</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => go("profile")}
          className="w-full rounded-full py-4 text-white font-semibold text-base active:scale-95 transition-transform"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: "linear-gradient(135deg, #E8A838, #C23B3B)",
            boxShadow: "0 8px 24px rgba(232,168,56,0.35)",
          }}
        >
          Get started
        </button>
        <button
          onClick={() => go("profile")}
          className="w-full rounded-full py-4 text-[#A0A0A0] font-medium text-base"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
