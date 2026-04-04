import { DemoShell } from "../../components/demo/DemoShell";

export const metadata = {
  title: "tunect — live demo",
  description: "Try the tunect app experience",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-start py-8 px-4">
      {/* Back link */}
      <div className="w-full max-w-sm mb-6 flex items-center justify-between">
        <a
          href="/"
          className="text-sm text-[#A0A0A0] hover:text-white transition-colors flex items-center gap-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ← tunect
        </a>
        <span
          className="text-xs text-[#505050]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          interactive demo
        </span>
      </div>

      {/* Phone frame + app */}
      <DemoShell />
    </div>
  );
}
