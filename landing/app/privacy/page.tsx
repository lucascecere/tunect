import Link from "next/link";
import { LogoIcon, LogoWordmark } from "../../components/Logo";

export const metadata = {
  title: "Privacy Policy — Tunect",
  description: "How Tunect handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#1E1E1E]/60 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoIcon size={28} />
            <LogoWordmark className="text-base" />
          </Link>
          <Link href="/" className="text-sm text-[#A0A0A0] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            ← Back
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}>
            Privacy Policy
          </h1>
          <p className="text-[#505050] text-sm mb-12">Last updated: April 2025</p>

          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-[#A0A0A0] leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Overview</h2>
              <p>
                Tunect ("we", "our", "us") is a music-based social app that connects people through their listening habits.
                This policy explains what data we collect, how we use it, and what control you have over it.
                We take your privacy seriously and will never sell your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Data we collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-1">From Spotify</h3>
                  <p>When you connect your Spotify account, we access:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Your display name and profile photo</li>
                    <li>Your email address (for account creation only)</li>
                    <li>Your top artists and top tracks (short, medium, and long term)</li>
                    <li>What you're currently playing</li>
                    <li>Your recently played tracks</li>
                  </ul>
                  <p className="mt-2">We never read your playlists, saved albums, or private data beyond what's listed above. We never post to your Spotify account.</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-1">From your use of Tunect</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Your profile information (display name, bio, username)</li>
                    <li>Who you follow and connect with</li>
                    <li>Messages you send within the app</li>
                    <li>App usage data (for performance and bug fixing)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>How we use your data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To build and display your music profile</li>
                <li>To calculate compatibility scores between users</li>
                <li>To show your real-time listening status to users you allow</li>
                <li>To power the Discover feed, sorted by musical compatibility</li>
                <li>To enable messaging between mutually connected users</li>
                <li>To improve the app experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Data sharing</h2>
              <p>
                We do not sell your personal data to third parties. Your music data is only used within Tunect to power the features described above.
                We use Supabase for secure data storage and infrastructure. Your Spotify tokens are stored securely server-side and never exposed to other users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Your controls</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Disconnect Spotify</strong> — remove Spotify access at any time from Settings. This clears your music data.</li>
                <li><strong className="text-white">Delete account</strong> — deletes all your data from Tunect permanently.</li>
                <li><strong className="text-white">Revoke Spotify access</strong> — go to Spotify account settings → Connected apps → Remove Tunect.</li>
                <li><strong className="text-white">Profile visibility</strong> — you can set your profile to followers-only at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Data retention</h2>
              <p>
                Your music data is refreshed each time you open the app. If you disconnect Spotify, your music data is removed within 24 hours.
                If you delete your account, all data is permanently deleted within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Children's privacy</h2>
              <p>
                Tunect is not intended for users under the age of 13. We do not knowingly collect data from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>Contact</h2>
              <p>
                Questions about this policy? Email us at{" "}
                <a href="mailto:privacy@tunect.app" className="text-[#FF2D78] hover:underline">privacy@tunect.app</a>.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E1E1E] px-6 py-8">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <p className="text-xs text-[#505050]">© 2025 Tunect. All rights reserved.</p>
          <Link href="/" className="text-xs text-[#505050] hover:text-[#A0A0A0] transition-colors">tunect.app</Link>
        </div>
      </footer>
    </div>
  );
}
