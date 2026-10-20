"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";

import { smallBusinessImpactData } from "../data/home.data";

type ImpactParagraph = {
  text: string;
  link?: {
    text: string;
    href: string;
  };
};

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function ImpactParagraphContent({ paragraph }: { paragraph: ImpactParagraph }) {
  const { text, link } = paragraph;
  if (!link) return <>{text}</>;

  const linkIndex = text.indexOf(link.text);
  if (linkIndex === -1) return <>{text}</>;

  const before = text.slice(0, linkIndex);
  const after = text.slice(linkIndex + link.text.length);

  const linkClassName =
    "relative font-semibold text-[#0A1128] inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#0A1128] after:transition-transform after:duration-500 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1128] focus-visible:ring-offset-2 rounded-sm";

  return (
    <>
      {before}
      {isExternalLink(link.href) ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
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

// Isolated Card Component
function ImpactCard({ section, index, reduceMotion }: { section: any; index: number; reduceMotion: boolean | null }) {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  // Parallax Scroll effect for the image
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const scrollViewport = { once: false, amount: 0.15 };

  // FIX: Added explicit "Variants" type and asserted the ease array as a tuple
  const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const textItem: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // FIX: Tuple assertion
      }, 
    },
  };

  return (
    <motion.article
      ref={cardRef}
      id={`sbi-${section.id}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={scrollViewport}
      variants={textContainer}
      className={`relative flex flex-col gap-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      
      {/* IMAGE SECTION (Clean & Clear) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative w-full lg:w-1/2 lg:sticky lg:top-32"
      >
        <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 lg:aspect-[4/3]">
          
          {/* Inner Parallax Image Container */}
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-50">
            <motion.div style={{ y: imageY }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
            </motion.div>
          </div>
          
          {/* Elegant Corner Accents */}
          <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[#0A1128]/20 transition-all duration-500 group-hover:h-full group-hover:w-full pointer-events-none rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#0A1128]/20 transition-all duration-500 group-hover:h-full group-hover:w-full pointer-events-none rounded-bl-xl" />
        </div>
      </motion.div>

      {/* TEXT SECTION (Clear & Readable) */}
      <div className="relative z-10 flex w-full flex-col justify-center lg:w-1/2">
        
        {/* Massive Background Number (Behind Text) */}
        <motion.div variants={textItem} className="absolute -top-12 -left-4 lg:-top-16 lg:-left-8 pointer-events-none select-none -z-10">
          <span className="text-[8rem] lg:text-[12rem] font-black leading-none text-transparent opacity-[0.06]" style={{ WebkitTextStroke: "2px #0A1128" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Content Box */}
        <div className="relative">
          {/* Tagline */}
          <motion.div variants={textItem} className="mb-6 flex items-center gap-4">
            <span className="h-[2px] w-10 bg-[#0A1128]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A1128]">
              Impact Area
            </span>
          </motion.div>

          {/* Title */}
          {section.title && (
            <motion.h3 
              variants={textItem}
              className="mb-6 font-serif text-3xl font-medium leading-[1.15] tracking-tight text-[#0A1128] sm:text-4xl lg:text-5xl"
            >
              {section.title}
            </motion.h3>
          )}

          {/* Paragraphs */}
          <div className="space-y-6">
            {section.paragraphs.map((paragraph: ImpactParagraph, pIndex: number) => (
              <motion.p
                key={`${section.id}-${pIndex}`}
                variants={textItem}
                className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-loose"
              >
                <ImpactParagraphContent paragraph={paragraph} />
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function SmallBusinessImpact() {
  const data = smallBusinessImpactData;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="small-business-impact"
      aria-labelledby="small-business-impact-heading"
      className="relative isolate overflow-hidden bg-[#F8FAFC] py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        
        {/* Premium Header */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mx-auto mb-20 max-w-4xl text-center sm:mb-28"
        >
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-3 border-b-2 border-[#0A1128] pb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0A1128]">
              {data.eyebrow}
            </span>
          </div>

          <h2
            id="small-business-impact-heading"
            className="text-balance font-serif text-4xl font-medium tracking-tight text-[#0A1128] sm:text-5xl lg:text-6xl"
          >
            {data.title}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">
            {data.introduction}
          </p>
        </motion.header>

        {/* Impact Cards Container */}
        <div className="relative">
          <div className="flex flex-col">
            {data.sections.map((section, index) => (
              <ImpactCard 
                key={section.id} 
                section={section} 
                index={index} 
                reduceMotion={reduceMotion} 
              />
            ))}
          </div>
        </div>

        {/* Minimalist Footer Note */}
        <motion.footer
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-24 border-t border-slate-200 pt-12"
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#0A1128] text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5m0-8h.01" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A1128]">
                Source &amp; Information
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-500 sm:text-right">
              {data.sourceNote}
            </p>
          </div>
        </motion.footer>

      </div>
    </section>
  );
}