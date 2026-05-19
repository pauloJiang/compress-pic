#!/usr/bin/env node
/**
 * Generates robots.txt and sitemap.xml from scripts/seo.config.js
 * Run: node scripts/generate-seo.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SEO_CONFIG } from "./seo.config.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { siteUrl, pages } = SEO_CONFIG;

function generateRobots() {
  return [
    "# https://www.robotstxt.org/robotstxt.html",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

function generateSitemap() {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

writeFileSync(join(root, "robots.txt"), generateRobots(), "utf8");
writeFileSync(join(root, "sitemap.xml"), generateSitemap(), "utf8");

console.log("Generated robots.txt and sitemap.xml for", siteUrl);
