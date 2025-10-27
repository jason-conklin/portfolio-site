import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { routesMeta } from "../src/app/routes-meta.ts";
import { site } from "../src/data/profile.ts";

async function main() {
  const distDir = path.resolve("dist");
  await mkdir(distDir, { recursive: true });

  const baseUrl = (site.baseUrl ?? "").replace(/\/$/, "");
  const now = new Date().toISOString();

  const sitemapEntries = routesMeta
    .filter((route) => route.includeInSitemap !== false)
    .map((route) => {
      const url = baseUrl
        ? `${baseUrl}${route.path === "/" ? "" : route.path}`
        : route.path;

      return `<url><loc>${url}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`;

  await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf-8");

  const robotsLines = [
    "User-agent: *",
    "Allow: /",
  ];
  if (baseUrl) {
    robotsLines.push(`Sitemap: ${baseUrl}/sitemap.xml`);
  }

  await writeFile(path.join(distDir, "robots.txt"), robotsLines.join("\n"), "utf-8");
}

main().catch((error) => {
  console.error("[sitemap] Failed to generate sitemap and robots.txt", error);
  process.exit(1);
});
