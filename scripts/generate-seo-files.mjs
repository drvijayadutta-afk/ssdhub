import { readFile, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || "https://ssdluxury.vercel.app").replace(/\/$/, "");
if (!/^https:\/\//.test(siteUrl)) {
  throw new Error("SITE_URL must be an HTTPS production domain.");
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

for (const route of routes) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}index.html`;
  let html = await readFile(file, "utf8");
  const canonical = `<link rel="canonical" href="${siteUrl}${route}">`;
  html = html.replace(/<link rel="canonical" href="[^"]*">/g, "");
  html = html.replace("</head>", `  ${canonical}\n</head>`);
  await writeFile(file, html);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile("sitemap.xml", xml);
await writeFile("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Generated canonical tags, sitemap.xml and robots.txt for ${siteUrl}`);
