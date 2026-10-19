
import Image from "next/image";
import Link from "next/link";
import { smallBusinessImpactData } from "../data/home.data";

type ImpactParagraph = {
  text: string;
  link?: {
    text: string;
    href: string;
  };
};

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}

function ImpactParagraphContent({
  paragraph,
}: {
  paragraph: ImpactParagraph;
}) {
  const { text, link } = paragraph;

  if (!link) {
    return <>{text}</>;
  }

  const linkIndex = text.indexOf(link.text);

  // Preserve the original paragraph if its link text is missing.
  if (linkIndex === -1) {
    return <>{text}</>;
  }

  const before = text.slice(0, linkIndex);
  const after = text.slice(linkIndex + link.text.length);

  const linkClassName =
    "font-semibold text-blue-900 underline decoration-blue-300 " +
    "underline-offset-4 transition-colors hover:text-blue-700 " +
    "hover:decoration-blue-700 focus-visible:rounded-sm " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-blue-800 focus-visible:ring-offset-2";

  return (
    <>
      {before}
      {isExternalLink(link.href) ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {link.text}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link href={link.href} className={linkClassName}>
          {link.text}
        </Link>
      )}
      {after}
    </>
  );
}

export default function SmallBusinessImpact() {
  const data = smallBusinessImpactData;

  return (
    <section
      id="small-business-impact"
      aria-labelledby="small-business-impact-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-950 shadow-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-blue-800"
            />
            {data.eyebrow}
          </span>

          <h2
            id="small-business-impact-heading"
            className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-4xl lg:text-5xl"
          >
            {data.title}
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-900 sm:mt-6"
          />

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            {data.introduction}
          </p>
        </header>

        {/* Impact sections */}
        <div className="space-y-6 sm:space-y-8">
          {data.sections.map((section, index) => (
            <article
              key={section.id}
              id={`sbi-${section.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
                {/* Text content */}
                <div className="min-w-0 p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-sm font-bold tabular-nums text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-blue-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-800 motion-reduce:transition-none"
                    />

                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Impact area
                    </span>
                  </div>

                  {section.title && (
                    <h3 className="border-l-[3px] border-blue-900 pl-4 text-xl font-bold leading-snug tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-blue-950 sm:text-2xl lg:text-3xl">
                      {section.title}
                    </h3>
                  )}

                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${section.id}-${paragraphIndex}`}
                        className="text-base leading-7 text-slate-600 sm:leading-8"
                      >
                        <ImpactParagraphContent
                          paragraph={paragraph as ImpactParagraph}
                        />
                      </p>
                    ))}
                  </div>
                </div>

                {/* Supporting image */}
                <figure className="relative mx-5 mb-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:mx-8 sm:mb-8 lg:mx-5 lg:my-6 lg:ml-0">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-1 bg-blue-950"
                  />

                  <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-64">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 340px"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5"
                  />
                </figure>
              </div>
            </article>
          ))}
        </div>

        {/* Source and information */}
        <footer className="mt-10 sm:mt-14">
          <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-950 ring-1 ring-inset ring-blue-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M12 11v5m0-8h.01"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <div className="min-w-0">
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-900 sm:text-sm">
                Source &amp; Information
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {data.sourceNote}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
