import type { Metadata } from "next";

import Mission from "@/src/features/home/components/Mission";
import Hero from "@/src/features/home/components/Hero";
import HowWeHelp from "@/src/features/home/components/HowWeHelp";
import SmallBusinessImpact from "@/src/features/home/components/SmallBusinessImpact";
import LearnAndNetwork from "@/src/features/home/components/LearnAndNetwork";
import { homeMetadata } from "@/src/features/home/seo/homeMetadata";
import { homeJsonLd } from "@/src/features/home/seo/homeJsonLd";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Hero />
      <Mission />
      <HowWeHelp/>
      <SmallBusinessImpact/>
      <LearnAndNetwork/>
      </main>
   
  );
}