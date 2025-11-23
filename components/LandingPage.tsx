'use client';

import { SignInButton, SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-yellow-400">
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 sm:pt-28 lg:pt-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400 sm:text-6xl">
              Connect. Collaborate. Grow.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Join <span className="font-semibold text-yellow-400">PeerSpace</span> — 
              your digital campus hub for connecting with classmates, sharing resources, 
              and discovering exciting events around you.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-300 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                    Get Started
                  </button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <button className="text-sm font-semibold leading-6 text-gray-200 hover:text-yellow-400 transition">
                    Sign In <span aria-hidden="true">→</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">
                  <button className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-300 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                    Go to Dashboard
                  </button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-400 uppercase tracking-wide">
              Everything You Need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Features That Empower Your Campus Life
            </p>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Designed to help you make the most out of your student experience.
            </p>
          </div>

          {/* Feature Boxes */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Box 1 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-yellow-500/30 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all hover:scale-[1.03]">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Connect with Peers
              </h3>
              <p className="text-gray-300 text-base">
                Discover and connect with students who share your passions, 
                courses, and goals — all within your campus network.
              </p>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-yellow-500/30 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all hover:scale-[1.03]">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Share Resources
              </h3>
              <p className="text-gray-300 text-base">
                Exchange notes, study materials, and valuable insights to support 
                each other's learning journey.
              </p>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-900 border border-yellow-500/30 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all hover:scale-[1.03]">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Stay in the Loop
              </h3>
              <p className="text-gray-300 text-base">
                Keep track of campus happenings — from academic sessions 
                to club events and exciting new opportunities.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}