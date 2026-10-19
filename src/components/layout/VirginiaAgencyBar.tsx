"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const languages = [
  { label: "English", code: "en" },
  { label: "Amharic", code: "am" },
  { label: "Arabic", code: "ar" },
  { label: "Chinese (Simplified)", code: "zh-cn" },
  { label: "Chinese (Traditional)", code: "zh-tw" },
  { label: "French", code: "fr" },
  { label: "Hindi", code: "hi" },
  { label: "Korean", code: "ko" },
  { label: "Spanish", code: "es" },
  { label: "Tagalog", code: "tl" },
  { label: "Urdu", code: "ur" },
  { label: "Vietnamese", code: "vi-vn" },
] as const;

const STORAGE_KEY = "sbsd-language-preference";
const NAVY = "#0B2B5C";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111820]";

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-slate-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 text-slate-300 transition-transform duration-200 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[#0B2B5C]"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="m4.5 10.5 3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("en");
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = Math.max(
    0,
    languages.findIndex((language) => language.code === selected)
  );

  const current = languages[selectedIndex];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (
        saved &&
        languages.some((language) => language.code === saved)
      ) {
        setSelected(saved);
      }
    } catch {
      // English remains available if browser storage is disabled.
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleDocumentKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setActiveIndex(selectedIndex);

    const frame = window.requestAnimationFrame(() => {
      optionRefs.current[selectedIndex]?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, selectedIndex]);

  function chooseLanguage(index: number) {
    const language = languages[index];

    setSelected(language.code);
    setActiveIndex(index);
    setOpen(false);

    try {
      window.localStorage.setItem(STORAGE_KEY, language.code);
    } catch {
      // Selection still works for the current session.
    }

    buttonRef.current?.focus();

    // Connect your translation provider here for actual translation.
  }

  function handleButtonKeyDown(
    event: KeyboardEvent<HTMLButtonElement>
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (index + 1) % languages.length;
        break;

      case "ArrowUp":
        nextIndex = (index - 1 + languages.length) % languages.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = languages.length - 1;
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        chooseLanguage(index);
        return;

      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;

      case "Tab":
        setOpen(false);
        return;

      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  }

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto">
      <span id="va-language-label" className="sr-only">
        Select website language
      </span>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="va-language-list"
        aria-labelledby="va-language-label va-language-button-text"
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={handleButtonKeyDown}
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-medium text-white transition-all duration-200 sm:min-w-[165px] ${focusRing} ${
          open
            ? "border-white/60 bg-white/10"
            : "border-white/20 bg-transparent hover:border-white/50 hover:bg-white/5"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <GlobeIcon />
          <span id="va-language-button-text" className="truncate">
            {current.label}
          </span>
        </span>

        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          id="va-language-list"
          className="absolute right-0 top-full z-[80] mt-2 w-[270px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_18px_50px_rgba(11,43,92,0.22)]"
        >
          {/* Navy blue accent */}
          <div className="h-1 bg-[#0B2B5C]" />

          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Website language
            </p>
          </div>

          {/* Scroll works; scrollbar remains hidden */}
          <div
            role="listbox"
            aria-label="Available website languages"
            aria-activedescendant={`va-lang-${languages[activeIndex].code}`}
            className="max-h-[min(60vh,360px)] overflow-y-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {languages.map((language, index) => {
              const isSelected = language.code === selected;
              const isActive = index === activeIndex;

              return (
                <button
                  key={language.code}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  id={`va-lang-${language.code}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  lang={language.code}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) =>
                    handleOptionKeyDown(event, index)
                  }
                  onClick={() => chooseLanguage(index)}
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B2B5C] ${
                    isActive || isSelected
                      ? "bg-[#EFF4FF] text-[#0B2B5C]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0B2B5C]"
                  } ${isSelected ? "font-semibold" : ""}`}
                >
                  <span>{language.label}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5">
            <p className="text-[11px] leading-4 text-slate-500">
              {ready
                ? "Language preference saved on this device."
                : "Loading language preference..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VirginiaAgencyBar() {
  return (
    <header className="relative z-[60] border-b border-white/10 bg-[#111820] text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-3 sm:px-6 lg:min-h-[68px] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10">
        {/* Commonwealth branding and agency information */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:gap-5">
          <a
            href="https://www.virginia.gov/"
            aria-label="Commonwealth of Virginia official website"
            className={`flex shrink-0 items-center rounded-sm ${focusRing}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bbar_logos-white.svg"
              alt="Commonwealth of Virginia"
              width={64}
              height={44}
              className="h-10 w-auto object-contain sm:h-11"
            />
          </a>

          <div className="flex min-w-0 flex-col gap-1 border-l border-white/15 pl-3 sm:pl-4 lg:pl-5">
            <a
              href="https://sbsd.virginia.gov/"
              className={`w-fit max-w-full rounded-sm text-[13px] font-bold leading-5 tracking-[0.005em] text-white transition-colors hover:text-slate-300 sm:text-sm ${focusRing}`}
            >
              Virginia Department of Small Business and Supplier Diversity
            </a>

            <p className="text-xs leading-5 text-slate-300">
              An official website of the Commonwealth of Virginia.{" "}
              <a
                href="https://www.virginia.gov/"
                className={`inline rounded-sm font-medium text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white ${focusRing}`}
              >
                Learn more
              </a>
            </p>
          </div>
        </div>

        {/* Language selector and government resources */}
        <nav
          aria-label="Government resources"
          className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:shrink-0"
        >
          <LanguageDropdown />

          <a
            href="https://www.virginia.gov/agencies/"
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white transition-all duration-200 hover:border-white/60 hover:bg-white hover:text-[#0B2B5C] ${focusRing}`}
          >
            <span>Find a Commonwealth Resource</span>

            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 10h10m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
