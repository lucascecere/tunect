"use client";

import { useState } from "react";
import { Screen } from "../DemoShell";

interface Props {
  go: (screen: Screen) => void;
}

const CONVOS = [
  { id: "1", name: "Jamie Chen", preview: "omg you listen to Frank Ocean too??", time: "2m", unread: 2, color: "from-cyan-500 to-teal-400" },
  { id: "2", name: "Mia Torres", preview: "that Brat album is everything rn", time: "1h", unread: 0, color: "from-pink-500 to-rose-400" },
  { id: "3", name: "Sam Park", preview: "new Arctic Monkeys deep cut??", time: "3h", unread: 1, color: "from-yellow-500 to-orange-400" },
  { id: "4", name: "Riley Okafor", preview: "Kendrick really said 🔥🔥", time: "1d", unread: 0, color: "from-red-500 to-rose-500" },
];

const THREAD: Record<string, { from: "me" | "them"; text: string }[]> = {
  "1": [
    { from: "them", text: "yo have you heard Blonde start to finish lately?" },
    { from: "me", text: "literally last night, everytime like a movie" },
    { from: "them", text: "omg you listen to Frank Ocean too??" },
    { from: "me", text: "he's literally top 1 for me rn" },
    { from: "them", text: "same 😭 our 94% makes so much sense now" },
  ],
  "2": [
    { from: "them", text: "that Brat album is everything rn" },
    { from: "me", text: "charli really ate" },
  ],
  "3": [
    { from: "them", text: "new Arctic Monkeys deep cut??" },
    { from: "me", text: "wait which one" },
    { from: "them", text: "505 live version, you have to hear it" },
  ],
  "4": [
    { from: "them", text: "Kendrick really said 🔥🔥" },
  ],
};

export function MessagesScreen({ go }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(THREAD);

  const openConvo = CONVOS.find((c) => c.id === openId);

  function sendMessage() {
    if (!draft.trim() || !openId) return;
    setThreads((prev) => ({
      ...prev,
      [openId]: [...(prev[openId] ?? []), { from: "me", text: draft.trim() }],
    }));
    setDraft("");
  }

  if (openId && openConvo) {
    const msgs = threads[openId] ?? [];
    return (
      <div className="h-full flex flex-col bg-[#0A0A0A]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid #1E1E1E" }}>
          <button onClick={() => setOpenId(null)} className="text-sm font-medium" style={{ color: "#FF2D78" }}>←</button>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${openConvo.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {openConvo.name[0]}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{openConvo.name}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2" style={{ scrollbarWidth: "none" }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[72%] rounded-2xl px-3 py-2 text-sm"
                style={
                  m.from === "me"
                    ? { background: "linear-gradient(135deg, #FF2D78, #A855F7)", color: "#fff", borderBottomRightRadius: 4 }
                    : { backgroundColor: "#1E1E1E", color: "#fff", borderBottomLeftRadius: 4 }
                }
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 pb-3 pt-2 shrink-0" style={{ borderTop: "1px solid #1E1E1E" }}>
          <input
            className="flex-1 rounded-full px-4 py-2 text-sm text-white placeholder-[#505050] outline-none"
            style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
            placeholder="Message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-sm"
            style={{ background: "linear-gradient(135deg, #FF2D78, #A855F7)" }}
          >
            ↑
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 shrink-0" style={{ borderBottom: "1px solid #1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>Messages</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {CONVOS.map((c, i) => (
          <div key={c.id}>
            <button
              onClick={() => setOpenId(c.id)}
              className="flex items-center gap-3 w-full px-4 py-3.5 text-left active:bg-[#141414] transition-colors"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-white text-sm font-semibold">{c.name}</span>
                  <span className="text-[#505050] text-xs">{c.time}</span>
                </div>
                <p className={`text-xs truncate ${c.unread > 0 ? "text-white font-medium" : "text-[#A0A0A0]"}`}>{c.preview}</p>
              </div>
              {c.unread > 0 && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: "linear-gradient(135deg, #FF2D78, #A855F7)" }}>
                  {c.unread}
                </div>
              )}
            </button>
            {i < CONVOS.length - 1 && <div className="ml-[76px] h-px" style={{ backgroundColor: "#1E1E1E" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
