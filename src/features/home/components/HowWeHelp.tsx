"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";

import { howWeHelpData } from "../data/home.data";
import { mediaAssets } from "../constants/media";

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

// Isolated Card Component to handle Scroll Parallax
function ScrollAnimatedCard({ 
  card, 
  index, 
  imageSrc, 
  reduceMotion 
}: { 
  card: any; 
  index: number; 
  imageSrc: string | undefined; 
  reduceMotion: boolean | null 
}) {
  const cardRef = useRef(null);
  const external = isExternalLink(card.href);

  // Parallax Scroll effect for the image
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Staggered reveal animation
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: reduceMotion ? 0 : (index % 4) * 0.1 // Staggered based on column
      },
    },
  };

  const cardClassName =
    "group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] " +
    "border border-slate-200/80 bg-white " +
    "shadow-[0_8px_30px_rgb(0,0,0,0.04)] " +
    "transition-all duration-500 " +
    "hover:-translate-y-2 hover:border-slate-300 " +
    "hover:shadow-[0_20px_40px_-15px_rgba(10,17,40,0.12)] " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-[#0A1128] focus-visible:ring-offset-4 " +
    "motion-reduce:transform-none motion-reduce:transition-none";

  const content = (
    <>
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {imageSrc ? (
          <motion.div 
            style={{ y: imageY }} 
            className="absolute inset-0 h-[120%] w-full -top-[10%]"
          >
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative h-full w-full"
            >
              <Image
                src={imageSrc}
                alt={card.title}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-200">
            <span className="font-semibold text-slate-600">{card.title}</span>
          </div>
        )}

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Number Badge */}
        <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-sm font-extrabold text-white shadow-sm backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Bottom Accent Line */}
        <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-500 group-hover:scale-x-100" />
      </div>

      {/* Text Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold leading-snug tracking-tight text-[#0A1128] transition-colors duration-300 group-hover:text-blue-800 sm:text-2xl">
          {card.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-loose">
          {card.description}
        </p>

        {/* CTA Button Area */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0A1128]">
            Learn more
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-[#0A1128] transition-all duration-300 group-hover:bg-[#0A1128] group-hover:text-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className="min-w-0 h-full"
    >
      {external ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.title} — Learn more (opens in a new tab)`}
          className={cardClassName}
        >
          {content}
        </a>
      ) : (
        <Link
          href={card.href}
          aria-label={`${card.title} — Learn more`}
          className={cardClassName}
        >
          {content}
        </Link>
      )}
    </motion.article>
  );
}

export default function HowWeHelp() {
  const { title, cards } = howWeHelpData;
  const { howWeHelpImages } = mediaAssets;
  const reduceMotion = useReducedMotion();

  const scrollViewport = { once: false, amount: 0.15 };

  // Staggered animation for the grid container
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  return (
    <section
      id="how-we-help"
      aria-labelledby="how-we-help-heading"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-24"
        >
          <motion.span 
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A1128] sm:text-sm">
              How We Help
            </span>
          </motion.span>

          <h2
            id="how-we-help-heading"
            className="text-balance font-serif text-4xl font-medium tracking-tight text-[#0A1128] sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-8 h-[2px] w-20 origin-center bg-[#0A1128]"
          />
        </motion.div>

        {/* Animated Cards Grid */}
        <motion.div 
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map((card, index) => {
            const imageSrc = howWeHelpImages[card.imageKey];

            return (
              <ScrollAnimatedCard
                key={card.id}
                card={card}
                index={index}
                imageSrc={imageSrc}
                reduceMotion={reduceMotion}
              />
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}