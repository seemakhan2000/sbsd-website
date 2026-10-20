
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MissionData } from "../data/home.data";
import { mediaAssets } from "../constants/media";

/* -------------------------------------------------------------------------- */
/* ScrollReveal                                                               */
/* -------------------------------------------------------------------------- */

interface ScrollRevealProps {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  reduceMotion: boolean;
}

function ScrollReveal({
  progress,
  range,
  children,
  className,
  y = 32,
  x = 0,
  reduceMotion,
}: ScrollRevealProps) {
  const opacity = useTransform(
    progress,
    range,
    reduceMotion ? [1, 1] : [0, 1]
  );

  const translateY = useTransform(
    progress,
    range,
    reduceMotion ? [0, 0] : [y, 0]
  );

  const translateX = useTransform(
    progress,
    range,
    reduceMotion ? [0, 0] : [x, 0]
  );

  return (
    <motion.div
      style={{
        opacity,
        y: translateY,
        x: translateX,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* AnimatedLine                                                               */
/* Animates one complete paragraph line                                       */
/* -------------------------------------------------------------------------- */

interface AnimatedLineProps {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
}

function AnimatedLine({
  text,
  progress,
  range,
  reduceMotion,
}: AnimatedLineProps) {
  const opacity = useTransform(
    progress,
    range,
    reduceMotion ? [1, 1] : [0, 1]
  );

  const y = useTransform(
    progress,
    range,
    reduceMotion ? [0, 0] : [18, 0]
  );

  return (
    <motion.span
      className="block"
      style={{ opacity, y }}
    >
      {text}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* WordReveal                                                                 */
/* Detects actual paragraph lines and animates them line by line               */
/* -------------------------------------------------------------------------- */

interface WordRevealProps {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  reduceMotion: boolean;
}

function WordReveal({
  text,
  progress,
  range,
  className,
  reduceMotion,
}: WordRevealProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [lines, setLines] = useState<string[]>([text]);

  useEffect(() => {
    const paragraph = paragraphRef.current;

    if (!paragraph) return;

    let frame = 0;

    const measureLines = () => {
      const element = paragraphRef.current;

      if (!element) return;

      const words = [...text.matchAll(/\S+/g)];

      if (!words.length) {
        setLines([]);
        return;
      }

      const computed = window.getComputedStyle(element);
      const measure = document.createElement("div");

      Object.assign(measure.style, {
        position: "fixed",
        left: "-10000px",
        top: "0",
        visibility: "hidden",
        pointerEvents: "none",
        width: `${element.clientWidth}px`,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        fontStyle: computed.fontStyle,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        wordSpacing: computed.wordSpacing,
        whiteSpace: "normal",
        overflowWrap: computed.overflowWrap,
        wordBreak: computed.wordBreak,
        padding: "0",
        margin: "0",
        border: "0",
      });

      const textNode = document.createTextNode(text);
      measure.appendChild(textNode);
      document.body.appendChild(measure);

      const groupedLines: { top: number; text: string }[] = [];
      const textRange = document.createRange();

      for (const match of words) {
        const startIndex = match.index ?? 0;
        const endIndex = startIndex + match[0].length;

        textRange.setStart(textNode, startIndex);
        textRange.setEnd(textNode, endIndex);

        const rect = textRange.getBoundingClientRect();
        const top = Math.round(rect.top);

        const previousLine = groupedLines[groupedLines.length - 1];

        if (previousLine && Math.abs(previousLine.top - top) <= 1) {
          previousLine.text += ` ${match[0]}`;
        } else {
          groupedLines.push({
            top,
            text: match[0],
          });
        }
      }

      measure.remove();

      const measuredLines = groupedLines.map((line) => line.text);

      if (measuredLines.length) {
        setLines((previous) => {
          const unchanged =
            previous.length === measuredLines.length &&
            previous.every(
              (line, index) => line === measuredLines[index]
            );

          return unchanged ? previous : measuredLines;
        });
      }
    };

    const scheduleMeasurement = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureLines);
    };

    scheduleMeasurement();

    const observer = new ResizeObserver(scheduleMeasurement);
    observer.observe(paragraph);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [text]);

  const [start, end] = range;
  const step = (end - start) / Math.max(lines.length, 1);

  return (
    <p ref={paragraphRef} className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="block">
        {lines.map((line, index) => {
          const lineStart = start + index * step;

          const lineEnd =
            index === lines.length - 1
              ? end
              : start + (index + 1) * step;

          return (
            <AnimatedLine
              key={`${index}-${line}`}
              text={line}
              progress={progress}
              range={[
                lineStart,
                Math.max(lineEnd, lineStart + 0.001),
              ]}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Mission                                                                    */
/* -------------------------------------------------------------------------- */

export default function Mission() {
  const { description, cta } = MissionData.mission;
  const { poster } = mediaAssets.mission;

  const reduceMotion = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ------------------------------ Image motion ----------------------------- */

  const clipPath = useTransform(
    scrollYProgress,
    [0.05, 0.38],
    reduceMotion
      ? ["inset(0 0 0 0%)", "inset(0 0 0 0%)"]
      : ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    reduceMotion ? [1, 1] : [1.2, 1.04]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-5%", "5%"]
  );

  /* ----------------------------- Heading motion ---------------------------- */

  const headingY = useTransform(
    scrollYProgress,
    [0.08, 0.28],
    reduceMotion ? ["0%", "0%"] : ["110%", "0%"]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.2],
    reduceMotion ? [1, 1] : [0, 1]
  );

  /* ------------------------------ Accent line ------------------------------ */

  const lineScale = useTransform(
    scrollYProgress,
    [0.2, 0.36],
    reduceMotion ? [1, 1] : [0, 1]
  );

  /* ------------------------------- Image glow ------------------------------ */

  const imageOverlayOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    reduceMotion ? [0, 0] : [0.18, 0]
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="mission-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Text */}
        <div className="order-2 min-w-0 lg:order-1 lg:max-w-[560px] lg:-translate-y-5">
          {/* Eyebrow */}
          <ScrollReveal
            progress={scrollYProgress}
            range={[0.05, 0.2]}
            y={20}
            reduceMotion={reduceMotion}
          >
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-9 bg-[#2f6db5]"
              />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f6db5] sm:text-sm">
                The Department
              </p>
            </div>
          </ScrollReveal>

          {/* Animated heading */}
          <h2
            id="mission-heading"
            className="overflow-hidden pb-2 font-serif text-4xl font-medium leading-tight tracking-tight text-[#0b1b33] sm:text-5xl lg:text-6xl"
          >
            <motion.span
              className="block"
              style={{
                y: headingY,
                opacity: headingOpacity,
              }}
            >
              Our Mission
            </motion.span>
          </h2>

          {/* Animated blue accent */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleX: lineScale,
              originX: 0,
            }}
            className="my-6 h-[3px] w-20 bg-[#2f6db5]"
          />

          {/* Paragraph: line-by-line animation only */}
          <WordReveal
            text={description}
            progress={scrollYProgress}
            range={[0.18, 0.42]}
            reduceMotion={reduceMotion}
            className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9"
          />

          {/* Animated CTA */}
          <ScrollReveal
            progress={scrollYProgress}
            range={[0.36, 0.52]}
            y={28}
            reduceMotion={reduceMotion}
            className="mt-8 sm:mt-9"
          >
            <a
              href={cta.href}
              className="group inline-flex min-h-[52px] items-center gap-3 border border-[#0b1b33] px-6 py-3 text-sm font-semibold text-[#0b1b33] transition-colors duration-300 hover:bg-[#0b1b33] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6db5] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {cta.text}

              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </a>
          </ScrollReveal>
        </div>

        {/* Image — original animation preserved */}
        <div className="relative order-1 aspect-[4/3] overflow-hidden bg-slate-100 lg:order-2 lg:aspect-[5/4]">
          {/* Image wipe reveal */}
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.img
              src={poster}
              alt="Small business owner smiling in her shop"
              loading="lazy"
              decoding="async"
              style={{
                y: imageY,
                scale: imageScale,
              }}
              className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
            />

            {/* Subtle image overlay */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: imageOverlayOpacity }}
              className="absolute inset-0 bg-[#0b1b33]"
            />
          </motion.div>

          {/* Image frame accents */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute inset-4 border border-white/50 sm:inset-6"
          />

          {/* Bottom image caption */}
          <ScrollReveal
            progress={scrollYProgress}
            range={[0.2, 0.4]}
            y={20}
            reduceMotion={reduceMotion}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="bg-gradient-to-t from-[#0b1b33]/90 via-[#0b1b33]/40 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Virginia
              </p>

              <p className="mt-1 text-lg font-medium text-white sm:text-xl">
                Supporting Small Business
              </p>
            </div>
          </ScrollReveal>

          {/* Blue decorative bar */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleX: lineScale,
              originX: 0,
            }}
            className="absolute bottom-0 left-0 z-10 h-1 w-full bg-[#2f6db5]"
          />
        </div>
      </div>
    </section>
  );
}
