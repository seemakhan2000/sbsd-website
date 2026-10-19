const SITE_URL = "https://sbsd.virginia.gov";

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#organization`,
      name:
        "Virginia Department of Small Business and Supplier Diversity",
      alternateName: "Virginia SBSD",
      url: SITE_URL,
      description:
        "Virginia's state agency supporting small business development, supplier diversity, certification, and economic opportunity.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name:
        "Virginia Department of Small Business and Supplier Diversity",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name:
        "Virginia Department of Small Business and Supplier Diversity",
      description:
        "Explore Virginia SBSD programs, certification resources, and opportunities for small businesses.",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};