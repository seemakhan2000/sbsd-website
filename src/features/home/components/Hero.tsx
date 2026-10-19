
"use client";

import { useEffect, useRef, useState } from "react";
import { heroData } from "../data/home.data";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (heroData.videos.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % heroData.videos.length
      );
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.play().catch(() => {
        });
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section
      aria-label="Virginia SBSD introduction"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Video backgrounds */}
      {heroData.videos.map((video, index) => (
      <video
  key={video.id}
  ref={(el) => {
    videoRefs.current[index] = el;
  }}
  aria-hidden="true"
  tabIndex={-1}
  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
    index === activeIndex
      ? "opacity-100"
      : "pointer-events-none opacity-0"
  }`}
  muted
  loop
  playsInline
  preload={index === 0 ? "auto" : "none"}
>
  <source src={video.src} type="video/mp4" />
</video>
      ))}

      {/* Dark overlay for text readability */}
 <div
  className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/60 to-slate-950/40"
  aria-hidden="true"
/>

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-5 py-24 text-center text-white md:px-8">
       <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white md:text-base">
  {heroData.eyebrow}
</p>

        <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {heroData.title}
        </h1>

        <div
          className="mx-auto my-7 h-1 w-24 rounded-full bg-blue-900"
          aria-hidden="true"
        />

        <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-slate-100 sm:text-xl md:text-2xl">
          {heroData.subtitle}
        </p>
      </div>
    </section>
  );
}
