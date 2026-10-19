import type { Metadata } from "next";

const SITE_URL = "https://sbsd.virginia.gov";

export const homeMetadata: Metadata = {
  title:
    "Virginia Department of Small Business and Supplier Diversity",

  description:
    "Discover Virginia SBSD resources, certification programs, and opportunities supporting small, women-owned, and minority-owned businesses.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName:
      "Virginia Department of Small Business and Supplier Diversity",
    title:
      "Virginia Department of Small Business and Supplier Diversity",
    description:
      "Explore business certification, supplier diversity, and resources for Virginia's small business community.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Virginia Department of Small Business and Supplier Diversity",
    description:
      "Explore certification programs and resources for Virginia's small business community.",
  },

  robots: {
    index: true,
    follow: true,
  },
};