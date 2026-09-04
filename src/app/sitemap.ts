import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updatedAt);
  const agentPages = [
    "/",
    "/index.md",
    "/glossary.md",
    "/agents.md",
    "/sitemap.md",
    "/llms.txt",
    "/llms-full.txt",
    "/feed.json",
    "/feed.xml",
    "/api/portfolio.json",
    "/openapi.json",
    "/agents.json",
    "/ai-catalog.json",
  ];

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: site.gallery.map((image) => absoluteUrl(image.src)),
    },
    ...agentPages.slice(1).map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
