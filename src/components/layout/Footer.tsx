"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

/* ---------- Content (labels same, links → /coming-soon) ---------- */

const legalLinks = [
  { label: "Virginia FOIA", href: "/coming-soon" },
  { label: "Internet Privacy Policy", href: "/coming-soon" },
];

const certificationLinks = [
  { label: "Certification Types", href: "/coming-soon" },
  { label: "Certification Tutorial", href: "/coming-soon" },
  { label: "Certification Portal", href: "/coming-soon" },
  { label: "Certification Status Check", href: "/coming-soon" },
];

const resourceLinks = [
  { label: "SWaM and DBE Directory", href: "/coming-soon" },
  { label: "Important Forms", href: "/coming-soon" },
  { label: "NAICS Codes", href: "/coming-soon" },
  { label: "State Expenditure Dashboard", href: "/coming-soon" },
  { label: "FAQ", href: "/coming-soon" },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "/coming-soon",
    icon: (
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1Z"
      />
    ),
  },
  {
    label: "Instagram",
    href: "/coming-soon",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "/coming-soon",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "/coming-soon",
    icon: (
      <path
        fill="currentColor"
        d="M6.5 9H3.8v11h2.7V9ZM5.2 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.2 20h-2.7v-5.4c0-1.3-.5-2.1-1.6-2.1-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V20h-2.7s.1-8.8 0-11h2.7v1.6c.4-.6 1-1.8 2.9-1.8 2.2 0 3.2 1.4 3.2 4.1V20Z"
      />
    ),
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540] rounded-sm";

/* ---------- Footer ---------- */

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full bg-[#0A2540] text-white"
    >
      {/* Top white accent line */}
      <div className="h-1 w-full bg-white" />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Column 1 — Logo + address + phone */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="SBSD homepage"
              className={`inline-block ${focusRing}`}
            >
              <Image
                src="/images/sbsd-logo2.png"
                alt="Virginia Department of Small Business and Supplier Diversity"
                width={260}
                height={90}
                className="h-auto w-[220px] object-contain sm:w-[240px]"
                unoptimized
              />
            </Link>

            <p className="mt-5 text-sm italic text-white/80">
              Empowering small, women, and minority-owned businesses.
            </p>

            <address className="mt-6 not-italic text-sm leading-relaxed text-white/85">
              600 East Broad Street, Suite 300
              <br />
              Richmond, VA 23219
            </address>

            <p className="mt-4 text-sm text-white/85">
              Phone:{" "}
              <a
                href="tel:8047866585"
                className={`font-semibold text-white transition-opacity hover:opacity-80 ${focusRing}`}
              >
                (804) 786-6585
              </a>{" "}
              <span className="mx-1 text-white/40">|</span> Fax:{" "}
              <a
                href="tel:8047869736"
                className={`font-semibold text-white transition-opacity hover:opacity-80 ${focusRing}`}
              >
                (804)-786-9736
              </a>
            </p>
          </div>

          {/* Column 2 — Legal */}
          <nav aria-label="Legal" className="lg:col-span-2">
            <h3 className="relative mb-5 text-sm font-bold uppercase tracking-[0.12em] text-white">
              Legal
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-[2px] w-10 bg-white"
              />
            </h3>
            <ul className="mt-6 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm text-white/85 transition-colors hover:text-white ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Certification */}
          <nav aria-label="Certification" className="lg:col-span-3">
            <h3 className="relative mb-5 text-sm font-bold uppercase tracking-[0.12em] text-white">
              Certification
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-[2px] w-10 bg-white"
              />
            </h3>
            <ul className="mt-6 space-y-3">
              {certificationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-white ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Resources */}
          <nav aria-label="Resources" className="lg:col-span-3">
            <h3 className="relative mb-5 text-sm font-bold uppercase tracking-[0.12em] text-white">
              Resources
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-[2px] w-10 bg-white"
              />
            </h3>
            <ul className="mt-6 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-white ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Social row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs uppercase tracking-[0.12em] text-white/60">
            Stay Connected
          </p>

          <ul className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#0A2540] ${focusRing}`}
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    {social.icon}
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#061A2E]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-white/70 sm:text-left">
            Copyright © 2026 - Virginia Department of Small Business &amp; Supplier Diversity
          </p>

          <a
            href="#top"
            className={`group inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white ${focusRing}`}
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}