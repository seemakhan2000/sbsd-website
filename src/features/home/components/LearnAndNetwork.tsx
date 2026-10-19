
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  MoveRight,
} from "lucide-react";

import { learnAndNetworkData } from "../data/home.data";

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function LearnAndNetwork() {
  const data = learnAndNetworkData;

  return (
    <section
      id="learn-and-network"
      aria-labelledby="learn-network-heading"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-50/80 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-96 w-96 rounded-full bg-slate-100/70 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#dce5f2] bg-[#f5f8fd] px-4 py-2">
            <BookOpen
              aria-hidden="true"
              className="h-4 w-4 text-[#102d62]"
              strokeWidth={1.8}
            />

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#102d62]">
              {data.eyebrow}
            </span>
          </span>

          <h2
            id="learn-network-heading"
            className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-[#0b1f46] sm:mt-6 sm:text-4xl lg:text-5xl"
          >
            {data.title}
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#102d62] sm:mt-6"
          />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            Discover learning opportunities and build meaningful
            connections to help strengthen your business.
          </p>
        </header>

        {/* Learning and networking cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {data.cards.map((card, index) => {
            const external = isExternalLink(card.href);

            const cardContent = (
              <>
                {/* Card image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f5fa]">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc((100vw - 72px) / 2), 384px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />

                  {/* Image overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071a3b]/60 via-[#071a3b]/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Program number */}
                  <span className="absolute left-5 top-5 inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/40 bg-[#0b1f46]/90 px-2 text-sm font-bold tabular-nums text-white shadow-sm backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* External navigation indicator */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white text-[#102d62] shadow-lg transition-colors duration-300 group-hover:bg-[#102d62] group-hover:text-white"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>

                  {/* Bottom accent */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#315b9a] transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </div>

                {/* Card information */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div
                    aria-hidden="true"
                    className="mb-4 h-1 w-10 rounded-full bg-[#102d62] transition-all duration-300 group-hover:w-14 motion-reduce:transition-none"
                  />

                  <h3 className="text-xl font-bold leading-snug tracking-tight text-[#0b1f46] sm:text-2xl">
                    {card.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {card.description}
                  </p>

                  {/* Call to action */}
                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <span className="text-sm font-bold text-[#102d62] sm:text-base">
                      {card.linkLabel}
                    </span>

                    <MoveRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#102d62] transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
                    />
                  </div>
                </div>
              </>
            );

            const cardClassName =
              "group flex h-full w-full flex-col overflow-hidden rounded-2xl " +
              "border border-slate-200 bg-white " +
              "shadow-[0_4px_24px_rgba(11,31,70,0.05)] " +
              "transition-[border-color,box-shadow,transform] duration-300 " +
              "hover:-translate-y-1 hover:border-[#c7d5ea] " +
              "hover:shadow-[0_18px_45px_rgba(11,31,70,0.12)] " +
              "focus-visible:outline-none focus-visible:ring-2 " +
              "focus-visible:ring-[#102d62] focus-visible:ring-offset-4 " +
              "motion-reduce:transform-none motion-reduce:transition-none";

            return (
              <article
                key={card.id}
                className="min-w-0"
              >
                {external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${card.title} — ${card.linkLabel} (opens in a new tab)`}
                    className={cardClassName}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    aria-label={`${card.title} — ${card.linkLabel}`}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
