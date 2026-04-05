"use client";

import { useState } from "react";

interface EmailCaptureProps {
  placeholder?: string;
  buttonText?: string;
  size?: "default" | "large";
}

export function EmailCapture({
  placeholder = "Enter your email",
  buttonText = "Get early access",
  size = "default",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-3 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-5 ${
          size === "large" ? "py-4" : "py-3"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="shrink-0"
        >
          <circle cx="9" cy="9" r="9" fill="#22C55E" />
          <path
            d="M5 9l3 3 5-5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={`text-[#22C55E] ${size === "large" ? "text-base" : "text-sm"}`}>
          You're on the list. We'll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={`w-full rounded-full border border-[#2A2A2A] bg-[#141414] text-white placeholder-[#505050] outline-none transition-all focus:border-[#FF2D78] focus:ring-2 focus:ring-[#FF2D78]/20 sm:flex-1 ${
          size === "large" ? "px-6 py-4 text-base" : "px-5 py-3 text-sm"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-full font-medium text-white transition-all active:scale-95 disabled:opacity-60 sm:w-auto sm:shrink-0 ${
          size === "large" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
        }`}
        style={{
          fontFamily: "var(--font-dm-sans)",
          background: "linear-gradient(135deg, #FF2D78, #A855F7)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />
              <path
                d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Joining...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
