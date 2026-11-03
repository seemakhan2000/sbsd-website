"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      id="main-content"
      className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden bg-[#0A2540] px-6 py-20"
    >
      {/* Animated background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB] opacity-[0.08] blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating accent circles */}
        <div className="absolute -left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-white opacity-[0.03] blur-3xl motion-reduce:animate-none" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 animate-pulse rounded-full bg-[#2563EB] opacity-[0.06] blur-3xl motion-reduce:animate-none" />

        {/* Top accent line */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 mx-auto w-full max-w-2xl text-center transition-all duration-700 motion-reduce:transition-none ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none"
            />
            Under Development
          </span>
        </div>

        {/* Animated icon */}
        <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
          <svg
            aria-hidden="true"
            className="h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="none"
          >
            {/* Hourglass / clock icon */}
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.9"
            />
            <path
              d="M12 6.5V12l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Coming Soon
        </h1>

        {/* Gold-free divider */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-white"
        />

        {/* Description */}
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          This page is currently being redesigned to serve Virginia&apos;s small
          business community better. Please check back soon, or return to the
          homepage to explore other resources.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0A2540] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 12H5M5 12l6-6M5 12l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/about-us/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540] sm:w-auto"
          >
            Contact Us
          </Link>
        </div>

        {/* Helper text */}
        <p className="mt-10 text-xs uppercase tracking-[0.15em] text-white/40">
          Virginia Department of Small Business &amp; Supplier Diversity
        </p>
      </div>
    </main>
  );
}