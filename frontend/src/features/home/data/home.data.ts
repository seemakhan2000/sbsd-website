
import { MEDIA, mediaAssets } from "../constants/media";


export interface HeroVideo {
  id: number;
  src: string;
  alt: string;
}

export const heroData = {
  videos: [
    {
      id: 1,
      src: MEDIA.VIDEOS.WAREHOUSE_HERO,
      alt: "Small business warehouse team",
    },
    {
      id: 2,
      src: MEDIA.VIDEOS.RETAIL_HERO,
      alt: "Retail business",
    },
    {
      id: 3,
      src: MEDIA.VIDEOS.CAFE_HERO,
      alt: "Independent cafe business",
    },
    {
      id: 4,
      src: MEDIA.VIDEOS.SLIDE_HERO,
      alt: "Virginia small business community",
    },
  ] satisfies HeroVideo[],

  eyebrow: "Virginia Small Business & Supplier Diversity",

  title:
    "The Virginia Department of Small Business and Supplier Diversity",

  subtitle:
    "Empowering small, women, and minority-owned businesses",
};

export const MissionData = {
  mission: {
    title: "Our Mission",
    description: "The mission of the Virginia Department of Small Business and Supplier Diversity (SBSD) is to provide education and assistance, economic opportunity, and access to capital to generate employment and economic growth for small businesses.",
    cta: {
      text: "Learn More About SBSD",
      href: "/coming-soon",
    },
  },
};

 export const howWeHelpData = {
    title: "How We Help",
    cards: [
      {
        id: "development",
        title: "Business Development & Outreach",
        description: "The Business Development and Outreach Services (BDOS) Division of SBSD supports economic development in Virginia by working with aspiring entrepreneurs and small businesses, offering a variety of business development training.",
        href: "/coming-soon",
        imageKey: "developmentTile" as const,
      },
      {
        id: "financing",
        title: "Financing",
        description: "Aligned within SBSD, the Virginia Small Business Finance Authority (VSBFA) offers programs to provide businesses, not-for-profits, and economic development authorities with the financing opportunities needed for economic growth and expansion throughout the Commonwealth.",
        href: "/coming-soon",
        imageKey: "financingTile" as const,
      },
      {
        id: "certification",
        title: "Certification",
        description: "Our certification programs enable Small, Women, and Minority-owned businesses (SWaM), Disadvantaged Business Enterprise (DBE), Service-Disabled Veteran-owned businesses (SDV), and Employment Services Organizations (ESO) to qualify for Virginia's specialized procurement and contracting opportunities.",
        href: "/coming-soon",
        imageKey: "certificationTile" as const,
      },
      {
        id: "sourcing",
        title: "Sourcing & Compliance",
        description: "Our Sourcing and Compliance (SAC) division facilitates the sourcing of SWaM certified businesses and monitors their utilization to maximize small business participation in state procurements and contracting through outreach, compliance, and training.",
        href: "/coming-soon",
        imageKey: "sourcingTile" as const,
      },
    ],
  }

  export const smallBusinessImpactData = {
  eyebrow: "SMALL BUSINESS IMPACT",

  title: "Virginia Runs on Small Business",

  introduction:
    "Small businesses are everywhere in Virginia and their impact is vital in every region of the state.",

  sections: [
    {
      id: "businesses",

      title: "",

      paragraphs: [
        {
          text: "In fact, 99.6% of all businesses in the Commonwealth are considered small businesses. That means nearly every local shop, consulting firm, trucking company, creative agency, contractor, restaurant, startup, and family-owned business helps fuel Virginia’s economy every single day.",

          link: {
            text: "99.6% of all businesses in the Commonwealth are considered small businesses",
            href: "/coming-soon",
          },
        },

        {
          text: "And they’re not just creating opportunity close to home. Virginia small businesses account for more than 84% of the state’s export revenue, helping Virginia-made products and services reach customers around the world.",
        },
      ],

      image: {
        src: MEDIA.IMAGES.SMALL_BUSINESS,
        alt: "99.6% of Virginia businesses are small businesses",
      },
    },

    {
      id: "industries",

      title: "The Industries Powering the Commonwealth",

      paragraphs: [
        {
          text: "Virginia’s small business community reflects the diversity and innovation of the state itself. The largest concentration of small businesses can be found in professional, scientific, and technical services, with more than 136,000 businesses operating across industries like consulting, engineering, IT, and research.",
        },

        {
          text: "Close behind is transportation and warehousing, with more than 104,000 small businesses helping move goods, connect communities, and keep supply chains running throughout the Commonwealth and beyond.",
        },

        {
          text: "Together, small businesses employ 45.9% of Virginia’s workforce, supporting millions of Virginians and strengthening local economies in every corner of the state.",
        },
      ],

      image: {
        src: MEDIA.IMAGES.SMALL_BUSINESS_WORKFORCE,
        alt: "45.9% of Virginia's workforce is employed by small businesses",
      },
    },

    {
      id: "entrepreneurs",

      title: "Women and Minority Entrepreneurs Are Driving Growth",

      paragraphs: [
        {
          text: "Virginia’s business landscape continues to evolve, with women and minority entrepreneurs playing a major role in shaping the future of the state’s economy.",

          link: {
            text: "women and minority entrepreneurs",
            href: "/coming-soon",
          },
        },

        {
          text: "Women own 45.4% of Virginia small businesses and make up 47.2% of the small business workforce. Even more exciting, women are currently the fastest-growing group of new business owners year over year.",
        },

        {
          text: "Nearly 40% of Virginia small businesses are owned by members of racial minority groups, reflecting the strength, diversity, and entrepreneurial spirit found throughout Virginia communities.",
        },
      ],

      image: {
        src: MEDIA.IMAGES.WOMEN_OWNED_BUSINESS,
        alt: "45.4% of Virginia small businesses are owned by women",
      },
    },

    {
      id: "community",

      title: "Building Community and Connections",

      paragraphs: [
        {
          text: "Virginia small businesses do more than create jobs and generate revenue. They invest directly in the communities they serve.",
        },

        {
          text: "More than 90% of Virginia small business owners report donating money to local charities, schools, and community organizations. Meanwhile, 76% volunteer their time to support causes that matter in their neighborhoods.",

          link: {
            text: "report donating money to local charities",
            href: "/coming-soon",
          },
        },

        {
          text: "These businesses are more than economic drivers. They are mentors, sponsors, volunteers, innovators, and community champions helping strengthen the future of the Commonwealth.",
        },
      ],

      image: {
        src: MEDIA.IMAGES.SMALL_BUSINESS_COMMUNITY,
        alt: "Virginia small businesses supporting local communities",
      },
    },
  ],

  sourceNote:
    "Statistics sourced from 2025 data provided by the U.S. Small Business Administration Office of Advocacy, Small Business Majority, and the National Federation of Independent Business.",
} as const;





export const learnAndNetworkData = {
  eyebrow: "CONNECT • LEARN • GROW",

  title: "Learn and Network",

  cards: [
    {
      id: "transferable-businesses",
      title: "Building Transferable Businesses™",
      description:
        "This free webinar series is designed to help you build a stronger, more valuable business and prepare for a more successful and profitable ownership transition.",
      image:
        mediaAssets.learnAndNetworkImages.transferableBusinesses,
      imageAlt: "Building Transferable Businesses",
      href: "/coming-soon",
      linkLabel: "Explore program",
    },
    {
      id: "workforce-wednesdays",
      title: "Workforce Wednesdays",
      description:
        "This three-part webinar series is designed specifically for small business owners and operators who want practical guidance for building, managing, and leading a strong team.",
      image:
       mediaAssets.learnAndNetworkImages.workforceWednesdays,
      imageAlt: "Workforce Wednesdays",
      href: "/coming-soon",
      linkLabel: "Explore program",
    },
    {
      id: "big-opportunities",
      title: "Big Opportunities, Big Partnerships",
      description:
        "In partnership with Radford University and Virginia Tech, this free virtual learning series helps you learn how to do business with Virginia colleges and universities.",
      image:
       mediaAssets.learnAndNetworkImages.bigOpportunities,
      imageAlt: "Big Opportunities, Big Partnerships",
      href: "/coming-soon",
      linkLabel: "Explore program",
    },
  ],
} as const;
