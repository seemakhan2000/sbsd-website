"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Image from "next/image";

type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

type NavigationGroup = {
  label: string;
  href: string;
  external?: boolean;
  items?: NavigationItem[];
};
const navigation: NavigationGroup[] = [
  {
    label: "About Us",
    href: "/coming-soon",
    items: [
      { label: "How We Help", href: "/coming-soon" },
      { label: "Staff Directory", href: "/coming-soon" },
      { label: "Contact Us", href: "/coming-soon" },
      { label: "Small Business Disparity Study", href: "/coming-soon" },
      { label: "SBSD News", href: "/coming-soon" },
    ],
  },
  {
    label: "Certification",
    href: "/coming-soon",
    items: [
      { label: "Types of Certification", href: "/coming-soon" },
      { label: "Apply for Certification", href: "/coming-soon" },
      { label: "Check Application Status", href: "/coming-soon" },
      { label: "Certification Portal Login", href: "/coming-soon" },
      { label: "Certified Business Directory", href: "/coming-soon" },
      { label: "Certification FAQs", href: "/coming-soon" },
    ],
  },
  {
    label: "Development",
    href: "/coming-soon",
    items: [
      { label: "Upcoming Webinars & Events", href: "/coming-soon" },
      { label: "Business One Stop", href: "/coming-soon" },
      { label: "SCALING4GROWTH", href: "/coming-soon" },
      { label: "Virginia Handbook for Success", href: "/coming-soon" },
    ],
  },
  {
    label: "Financing",
    href: "/coming-soon",
    items: [
      { label: "Loan Programs (for Borrowers)", href: "/coming-soon" },
      { label: "Credit Support Programs (for Lenders)", href: "/coming-soon" },
      { label: "Bond Programs", href: "/coming-soon" },
      { label: "Grant Programs", href: "/coming-soon" },
      { label: "Venture Capital Programs", href: "/coming-soon" },
    ],
  },
  {
    label: "Sourcing & Compliance",
    href: "/coming-soon",
    items: [
      { label: "Expenditure Dashboard", href: "/coming-soon" },
      { label: "Find Your SAC Manager", href: "/coming-soon" },
    ],
  },
  {
    label: "Quick Links",
    href: "#",
    items: [
      { label: "Certification Application Status", href: "/coming-soon" },
      { label: "Certification Portal", href: "/coming-soon" },
      { label: "DBE Legal Updates", href: "/coming-soon" },
      { label: "Expenditure Dashboard", href: "/coming-soon" },
      { label: "FAQs", href: "/coming-soon" },
      { label: "Important Forms", href: "/coming-soon" },
      { label: "NAICS Codes", href: "/coming-soon" },
      { label: "SWaM Application Tutorial", href: "/coming-soon" },
      { label: "SWaM & DBE Directory", href: "/coming-soon" },
    ],
  },
  {
    label: "Events",
    href: "/coming-soon",
  },
];
const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/VirginiaSBSD",
    icon: (
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1Z"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/VirginiaSBSD",
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
    href: "https://www.youtube.com/@virginiasmallbusiness",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/virginia-department-of-small-business-and-supplier-diversity",
    icon: (
      <path
        fill="currentColor"
        d="M6.5 9H3.8v11h2.7V9ZM5.2 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.2 20h-2.7v-5.4c0-1.3-.5-2.1-1.6-2.1-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V20h-2.7s.1-8.8 0-11h2.7v1.6c.4-.6 1-1.8 2.9-1.8 2.2 0 3.2 1.4 3.2 4.1V20Z"
      />
    ),
  },
];

/* Brand tokens: Virginia navy + state gold, with a cool neutral surface scale */
const C = {
  navy: "#0A2540",
  navyDeep: "#061A2E",
  blue: "#2563EB",
  gold: "#061A2E",
  goldDeep: "#061A2E",
  surface: "#F8FAFC",
  tint: "#EFF4FF",
  line: "#E2E8F0",
};

const focusRingBlue =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2B5C]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ open, className = "h-3.5 w-3.5" }: { open: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} transition-transform duration-200 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function closeMenus() {
    setActiveMenu(null);
    setMobileOpen(false);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    // Uses the existing SBSD WordPress search as a fallback.
    window.location.href = `https://sbsd.virginia.gov/?s=${encodeURIComponent(query)}`;
  }

  /* Shadow strengthens after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on outside click / Escape */
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* Lock page scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Focus the search field when the panel opens */
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full bg-[#0B2B5C] text-white transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_8px_30px_rgba(10,37,64,0.12)]"
          : "shadow-[0_1px_0_rgba(10,37,64,0.06)]"
      }`}
    >
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-[#0A2540] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Main navigation */}
      <div className="flex min-h-[72px] w-full items-center justify-between gap-4 px-[10px] py-2">
        {/* Logo */}
        <a
          href="/"
          aria-label="SBSD homepage"
          onClick={closeMenus}
        className={`group flex min-w-0 shrink-0 items-center rounded-xl bg-[#0B2B5C] px-3 py-1.5 ${focusRingBlue}`}
        >
         <Image
                         src="/images/sbsd-logo2.png"
                         alt="Virginia Department of Small Business and Supplier Diversity"
                         width={260}
                         height={90}
                         className="h-auto w-[220px] object-contain sm:w-[240px]"
                         unoptimized
                       />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item, index) => {
            const isOpen = activeMenu === item.label;
            const alignRight = index >= navigation.length - 3;
            const subItems = item.items ?? [];

            if (subItems.length === 0) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-3 text-[13px] font-semibold tracking-[0.005em] text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white xl:px-4 xl:text-[15px] ${focusRingBlue}`}
                >
                  {item.label}
                  {item.external && (
                    <span aria-label="Opens in a new tab" className="text-xs">
                      ↗
                    </span>
                  )}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
                onFocus={() => setActiveMenu(item.label)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setActiveMenu(null);
                }}
              >
                <a
                  href={item.href}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={(event) => {
                    if (item.href === "#") {
                      event.preventDefault();
                      setActiveMenu(isOpen ? null : item.label);
                    } else {
                      closeMenus();
                    }
                  }}
                  className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-3 text-[13px] font-semibold tracking-[0.005em] transition-colors duration-200 xl:px-4 xl:text-[15px] ${focusRingBlue} ${
                    isOpen
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                  <Chevron open={isOpen} />

                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>

                {/* Animated dropdown */}
                <div
                  className={`absolute top-full w-[350px] pt-[17px] transition-all duration-200 motion-reduce:transition-none ${
                    alignRight ? "right-0" : "left-0"
                  } ${
                    isOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_55px_rgba(10,37,64,0.18)]">
                    <div className="h-1 bg-[#0B2B5C]" />

                    <div className="p-3.5">

                      <div className="space-y-0.5">
                        {subItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            target={subItem.external ? "_blank" : undefined}
                            rel={subItem.external ? "noopener noreferrer" : undefined}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={closeMenus}
                            className={`group flex items-center justify-between gap-3 rounded-lg px-5 py-3 text-[14px] leading-5 text-slate-600 transition-colors hover:bg-[#EFF4FF] hover:text-[#0A2540] ${focusRing}`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-[#0B2B5C]"
                              />
                              {subItem.label}
                            </span>
                            {subItem.external && (
                              <span aria-label="Opens in a new tab" className="shrink-0 text-xs">
                                ↗
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Search button */}
        <button
          type="button"
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
          onClick={() => {
            setSearchOpen((previous) => !previous);
            setActiveMenu(null);
          }}
          className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors lg:flex ${focusRingBlue} ${
            searchOpen
              ? "border-white bg-white text-[#0B2B5C] hover:bg-white/90"
              : "border-white/30 text-white hover:border-white hover:bg-white/10"
          }`}
        >
          {searchOpen ? (
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <SearchIcon />
          )}
        </button>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((previous) => !previous);
            setActiveMenu(null);
          }}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:bg-white/10 lg:hidden ${focusRingBlue}`}
        >
          {mobileOpen ? (
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop search panel */}
      {searchOpen && (
        <div className="hidden border-t border-[#E2E8F0] bg-[#F8FAFC] px-[10px] py-5 lg:block">
          <form onSubmit={handleSearch} role="search" className="mx-auto flex max-w-3xl gap-3">
            <label htmlFor="sbsd-search" className="sr-only">
              Search SBSD website
            </label>

            <div className="relative min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                id="sbsd-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search certifications, resources, events..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#0A2540] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#061A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain border-t border-[#E2E8F0] bg-white px-[10px] py-3 shadow-lg lg:hidden"
        >
          <div className="mx-auto max-w-7xl">
            {navigation.map((item) => {
              const isOpen = activeMenu === item.label;
              const subItems = item.items ?? [];

              if (subItems.length === 0) {
                return (
                  <div key={item.label} className="border-b border-[#F1F5F9]">
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={closeMenus}
                      className={`flex items-center justify-between rounded-md px-1 py-4 text-sm font-semibold text-slate-700 transition-colors hover:text-[#0A2540] ${focusRing}`}
                    >
                      <span>{item.label}</span>
                      {item.external && <span aria-hidden="true">↗</span>}
                    </a>
                  </div>
                );
              }

              return (
                <div key={item.label} className="border-b border-[#F1F5F9] last:border-b-0">
                  <div className="flex items-center gap-2">
                    <a
                      href={item.href}
                      onClick={(event) => {
                        if (item.href === "#") {
                          event.preventDefault();
                          setActiveMenu(isOpen ? null : item.label);
                          return;
                        }
                        closeMenus();
                      }}
                      className={`flex-1 rounded-md px-1 py-4 text-sm font-semibold transition-colors hover:text-[#0A2540] ${focusRing} ${
                        isOpen ? "text-[#0A2540]" : "text-slate-700"
                      }`}
                    >
                      {item.label}
                    </a>

                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={isOpen}
                      onClick={() => setActiveMenu(isOpen ? null : item.label)}
                      className={`flex h-10 w-10 items-center justify-center rounded-md text-[#0A2540] transition-colors hover:bg-[#EFF4FF] ${focusRing}`}
                    >
                      <Chevron open={isOpen} className="h-5 w-5" />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mb-3 ml-2 border-l-2 border-[#0B2B5C] pl-2">

                      {subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={subItem.external ? "noopener noreferrer" : undefined}
                          onClick={closeMenus}
                          className={`flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm leading-5 text-slate-600 transition-colors hover:bg-[#EFF4FF] hover:text-[#0A2540] ${focusRing}`}
                        >
                          <span>{subItem.label}</span>
                          {subItem.external && <span aria-hidden="true">↗</span>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

           
          </div>
        </nav>
      )}

    </header>
  );
}