
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Handshake,
  ShieldCheck,
} from "lucide-react";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B30]";

export default function VirginiaAgencyBar() {
  return (
    <header className="relative z-[60] border-b border-white/10 bg-[#0B1B30] text-white">
      {/* Subtle brand accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#7CB8FF] to-transparent" />

      <div className="mx-auto flex min-h-[58px] max-w-[1600px] flex-col justify-center gap-3 px-4 py-2 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-5 lg:px-10">

        {/* Virginia / SBSD branding */}
        <Link
          href="https://sbsd.virginia.gov/"
          aria-label="Virginia Department of Small Business and Supplier Diversity"
          className={`group flex min-w-0 items-center gap-3 ${focusRing}`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-300/30 bg-blue-400/10 text-sm font-extrabold tracking-[-0.08em] text-blue-200 transition-colors group-hover:bg-blue-400/20">
            VA
          </span>

          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
              Commonwealth of Virginia
            </span>

            <span className="truncate text-xs font-semibold tracking-wide text-white sm:text-[13px]">
              Small Business & Supplier Diversity
            </span>
          </span>
        </Link>

        {/* Professional resource links */}
        <nav
          aria-label="Government and business resources"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium"
        >
          <Link
            href="https://sbsd.virginia.gov/"
            className={`inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white ${focusRing}`}
          >
            <BriefcaseBusiness className="h-4 w-4 shrink-0 text-blue-300" />
            <span>Business Resources</span>
          </Link>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-white/15 sm:block"
          />

          <Link
            href="https://sbsd.virginia.gov/"
            className={`inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white ${focusRing}`}
          >
            <Handshake className="h-4 w-4 shrink-0 text-blue-300" />
            <span>Supplier Diversity</span>
          </Link>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-white/15 sm:block"
          />

          <Link
            href="https://www.virginia.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-blue-200 transition-colors hover:text-white ${focusRing}`}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Official Virginia Website</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
