import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { jsonLdGraph } from "@/lib/discovery";
import { basier, gloock } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Daniel Sherratt",
    "Creative Director",
    "London",
    "portfolio",
    "Stay A While",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
      "text/plain": "/llms.txt",
      "application/feed+json": "/feed.json",
      "application/rss+xml": "/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${gloock.variable} ${basier.variable} h-full antialiased`}
    >
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="alternate" type="text/markdown" href="/index.md" />
        <link rel="alternate" type="application/feed+json" href="/feed.json" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="service-desc" href="/openapi.json" />
        <link rel="service-doc" href="/agents.md" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link rel="ard" href="/.well-known/ard.json" />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <JsonLd data={jsonLdGraph()} />
        {children}
      </body>
    </html>
  );
}
