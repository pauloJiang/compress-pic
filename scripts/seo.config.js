/**
 * Central SEO configuration — used by generate-seo.mjs
 */
export const SEO_CONFIG = {
  siteUrl: "https://compressjpg.pro",
  siteName: "Compress JPG Pro",
  locale: "en_US",
  themeColor: "#6ab04c",
  twitterHandle: "@compressjpgpro",
  pages: [
    { path: "/", changefreq: "weekly", priority: "1.0", lastmod: "2026-05-19" },
    { path: "/compress-jpg/", changefreq: "weekly", priority: "0.9", lastmod: "2026-05-19" },
    { path: "/compress-png/", changefreq: "weekly", priority: "0.9", lastmod: "2026-05-19" },
    { path: "/compress-webp/", changefreq: "weekly", priority: "0.9", lastmod: "2026-05-19" },
    { path: "/jpg-to-200kb/", changefreq: "weekly", priority: "0.85", lastmod: "2026-05-19" },
  ],
  assets: {
    favicon: "/assets/favicon.svg",
    ogImage: "/assets/og-image.svg",
  },
};
