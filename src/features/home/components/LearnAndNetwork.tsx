"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowUpRight, BookOpen, MoveRight } from "lucide-react";

import { learnAndNetworkData } from "../data/home.data";

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

// Word-by-word reveal for the main title
const AnimatedTitle = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 -mb-2">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number], 
              delay: i * 0.08 
            }}
          >
            {word}
          </motion.span>
          {i !== words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// Isolated Card Component to handle its own Parallax Scroll
function ScrollAnimatedCard({ card, index, reduceMotion }: { card: any; index: number; reduceMotion: boolean | null }) {
  const cardRef = useRef(null);
  const external = isExternalLink(card.href);

  // Parallax Scroll setup
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Image moves slightly slower/faster than the card container on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Staggered card reveal
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: reduceMotion ? 0 : (index % 3) * 0.15 // Staggered based on column
      },
    },
  };

  const cardContent = (
    <>
      {/* Card image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {/* Parallax Image Wrapper */}
        <motion.div 
          style={{ y: imageY }}
          className="absolute inset-0 h-[120%] w-full -top-[10%]"
        >
          <motion.div 
            whileHover={reduceMotion ? {} : { scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative h-full w-full"
          >
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc((100vw - 72px) / 2), 384px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Program number */}
        <span className="absolute left-5 top-5 inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-2 text-sm font-bold tabular-nums text-white shadow-sm backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* External navigation indicator */}
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0A1128] shadow-xl transition-all duration-500 group-hover:bg-[#0A1128] group-hover:text-white group-hover:rotate-45"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>

        {/* Bottom accent line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-blue-500 transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>

      {/* Card information */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="mb-4 h-[3px] w-10 rounded-full bg-[#0A1128]/20 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0A1128]"
        />

        <h3 className="text-xl font-bold leading-snug tracking-tight text-[#0A1128] sm:text-2xl transition-colors duration-300 group-hover:text-blue-800">
          {card.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-loose">
          {card.description}
        </p>

        {/* Call to action */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <span className="text-sm font-bold uppercase tracking-wider text-[#0A1128] sm:text-sm">
            {card.linkLabel}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors duration-300 group-hover:bg-blue-50">
            <MoveRight
              aria-hidden="true"
              className="h-4 w-4 text-[#0A1128] transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </div>
        </div>
      </div>
    </>
  );

  // Card styling adjusted for White Background
  const cardClassName =
    "group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] " +
    "border border-slate-200 bg-white " +
    "shadow-[0_8px_30px_rgb(0,0,0,0.06)] " +
    "transition-all duration-500 " +
    "hover:-translate-y-2 hover:border-slate-300 " +
    "hover:shadow-[0_20px_40px_-15px_rgba(10,17,40,0.15)] " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-[#0A1128] focus-visible:ring-offset-4 " +
    "motion-reduce:transform-none motion-reduce:transition-none";

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
    </motion.article>
  );
}

export default function LearnAndNetwork() {
  const data = learnAndNetworkData;
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
      id="learn-and-network"
      aria-labelledby="learn-network-heading"
      // Clean white background, removed isolate and overflow-hidden as they aren't needed without the design elements
      className="bg-white py-24 sm:py-32"
    >
      {/* 
        Yahan se saare background design elements (grid, blobs, glows) 
        remove kar diye gaye hain.
      */}

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <motion.header 
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
            className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4 text-[#0A1128]" strokeWidth={2} />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A1128] sm:text-sm">
              {data.eyebrow}
            </span>
          </motion.span>

          <h2
            id="learn-network-heading"
            className="mt-6 text-balance font-serif text-4xl font-medium tracking-tight text-[#0A1128] sm:text-5xl lg:text-6xl"
          >
            <AnimatedTitle text={data.title} />
          </h2>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-8 h-[2px] w-20 origin-center bg-[#0A1128]"
          />

          <motion.p 
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-loose"
          >
            Discover learning opportunities and build meaningful
            connections to help strengthen your business.
          </motion.p>
        </motion.header>

        {/* Learning and networking cards Grid */}
        <motion.div 
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8"
        >
          {data.cards.map((card, index) => (
            <ScrollAnimatedCard 
              key={card.id} 
              card={card} 
              index={index} 
              reduceMotion={reduceMotion} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}