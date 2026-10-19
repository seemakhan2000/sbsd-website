
import Image from "next/image";
import Link from "next/link";
import { howWeHelpData } from "../data/home.data";
import { mediaAssets } from "../constants/media";

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function HowWeHelp() {
  const { title, cards } = howWeHelpData;
  const { howWeHelpImages } = mediaAssets;

  return (
    <section
      id="how-we-help"
      aria-labelledby="how-we-help-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-950 shadow-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-blue-800"
            />
            How We Help
          </span>

          <h2
            id="how-we-help-heading"
            className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-950 to-blue-700 sm:mt-6"
          />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            Explore the resources, programs, and opportunities available
            to support your business at every stage.
          </p>
        </header>

        {/* Resource cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map((card) => {
            const imageSrc = howWeHelpImages[card.imageKey];
            const external = isExternalLink(card.href);

            const cardContent = (
              <>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={card.title}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 72px) / 2), (max-width: 1279px) calc((100vw - 88px) / 4), 280px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${card.title} image unavailable`}
                      className="flex h-full min-h-40 items-center justify-center bg-slate-100 text-sm text-slate-500"
                    >
                      Image unavailable
                    </div>
                  )}

                  {/* Image overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Bottom accent */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-1 w-0 bg-blue-700 transition-all duration-300 group-hover:w-full motion-reduce:transition-none"
                  />
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-blue-900 sm:text-xl">
                    {card.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                    {card.description}
                  </p>

                  {/* Call to action */}
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <span className="text-sm font-bold text-blue-950 sm:text-base">
                      Learn more
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-blue-950 transition-colors duration-300 group-hover:border-blue-950 group-hover:bg-blue-950 group-hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m-6-6 6 6-6 6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </>
            );

            return (
              <article
                key={card.id}
                className="flex min-w-0"
              >
                {external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${card.title} — Learn more (opens in a new tab)`}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    aria-label={`${card.title} — Learn more`}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none"
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
