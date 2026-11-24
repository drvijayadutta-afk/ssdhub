import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "");
if (!siteUrl || !/^https:\/\//.test(siteUrl)) {
  throw new Error("Set SITE_URL to your final HTTPS production domain before building, e.g. https://ssdhub.com");
}

const routes = [
  "/", "/about/", "/approach/",
  "/services/luxury-brand-strategy/",
  "/services/luxury-digital-marketing/",
  "/services/luxury-seo/",
  "/services/performance-marketing/",
  "/services/content-creative/",
  "/services/website-digital-experience/",
  "/services/crm-marketing-automation/",
  "/industries/luxury-real-estate-marketing/",
  "/industries/luxury-hospitality-marketing/"
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile("sitemap.xml", xml);
await writeFile("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`);
