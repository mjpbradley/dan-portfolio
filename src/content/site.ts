import { galleryImages } from "@/content/gallery-images";

export type { GalleryImage } from "@/content/gallery-images";

const fallbackSiteUrl = "http://localhost:3000";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
  return raw.replace(/\/$/, "");
}

export const site = {
  title: "Stay A While.",
  name: "Daniel Sherratt",
  jobTitle: "Creative Director",
  location: "London",
  description:
    "Daniel Sherratt is a Creative Director in London. Stay A While is his single-page visual portfolio — thirty-eight designed work pages in a click-through gallery.",
  email: "sherratt@gmail.com",
  spotifyUrl:
    "https://open.spotify.com/playlist/2DGAsscm9jqRcD2Rxe33jp?si=5b67bc99bc374827",
  url: resolveSiteUrl(),
  locale: "en-GB",
  updatedAt: "2026-09-04T00:00:00.000Z",
  gallery: galleryImages,
} as const;

export function siteHost(): string {
  return new URL(site.url).hostname;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized}`;
}

export function mailtoHref(): string {
  return `mailto:${site.email}`;
}
