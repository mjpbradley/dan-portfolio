import type { NextConfig } from "next";
import { discoveryLinkHeader } from "./src/lib/discovery-links";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

function linkHeader(canonicalUrl: string): string {
  return `${discoveryLinkHeader}, <${canonicalUrl}>; rel="canonical"`;
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: discoveryLinkHeader,
          },
        ],
      },
      {
        source: "/",
        headers: [
          { key: "Vary", value: "Accept" },
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/`),
          },
        ],
      },
      {
        source: "/index.md",
        headers: [
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/`),
          },
        ],
      },
      {
        source: "/agents.md",
        headers: [
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/`),
          },
        ],
      },
      {
        source: "/AGENTS.md",
        headers: [
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/`),
          },
        ],
      },
      {
        source: "/sitemap.md",
        headers: [
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/sitemap.md`),
          },
        ],
      },
      {
        source: "/glossary.md",
        headers: [
          {
            key: "Link",
            value: linkHeader(`${siteUrl}/glossary.md`),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/AGENTS.md", destination: "/agents.md" },
      { source: "/index.html.md", destination: "/index.md" },
      { source: "/.well-known/llms.txt", destination: "/llms.txt" },
      { source: "/.well-known/llms-full.txt", destination: "/llms-full.txt" },
      { source: "/.well-known/sitemap.md", destination: "/sitemap.md" },
      { source: "/.well-known/agents.md", destination: "/agents.md" },
      {
        source: "/.well-known/ai-catalog.json",
        destination: "/ai-catalog.json",
      },
      { source: "/.well-known/ard.json", destination: "/ai-catalog.json" },
      {
        source: "/.well-known/api-catalog",
        destination: "/well-known/api-catalog",
      },
    ];
  },
};

export default nextConfig;
