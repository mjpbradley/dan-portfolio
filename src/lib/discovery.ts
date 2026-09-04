import { absoluteUrl, site } from "@/content/site";

const markdownSitemapFooter = `## Sitemap

See the full [sitemap](${absoluteUrl("/sitemap.md")}) for every agent-readable page.
`;

function yamlFrontmatter(fields: Record<string, string>): string {
  const lines = Object.entries(fields).map(([key, value]) => {
    const escaped = value.replaceAll('"', '\\"');
    return `${key}: "${escaped}"`;
  });

  return `---\n${lines.join("\n")}\n---\n`;
}

function galleryMarkdownList(separator: "numbered" | "linked"): string {
  return site.gallery
    .map((image, index) => {
      const href = absoluteUrl(image.src);
      if (separator === "numbered") {
        return `${index + 1}. ${image.alt} — ${href}`;
      }
      return `- [${image.alt}](${href})`;
    })
    .join("\n");
}

export function renderLlmsTxt(): string {
  return `# ${site.name}
> ${site.jobTitle} in ${site.location}. Portfolio titled ${site.title}

This is a single-page visual portfolio. The work lives in a ${site.gallery.length}-page image gallery. Click the page or use the right arrow key to advance; the left arrow works after the first move. Pages loop. Fetch markdown mirrors instead of scraping the HTML gallery.

Preferred retrieval: \`Accept: text/markdown\` on the homepage, or the explicit \`/index.md\` URL.

## Pages
- [Home](${absoluteUrl("/index.md")}): Identity, contact, and the full gallery list
- [Glossary](${absoluteUrl("/glossary.md")}): Terms used on this site
- [Agent notes](${absoluteUrl("/agents.md")}): How to cite, contact, and load this portfolio
- [Sitemap](${absoluteUrl("/sitemap.md")}): Every agent-readable URL

## Optional
- [Full text](${absoluteUrl("/llms-full.txt")}): Complete site copy and numbered gallery list
- [JSON Feed](${absoluteUrl("/feed.json")}): Machine-readable gallery feed
- [RSS](${absoluteUrl("/feed.xml")}): RSS 2.0 gallery feed
- [Portfolio API](${absoluteUrl("/api/portfolio.json")}): Identity and gallery as JSON
- [OpenAPI](${absoluteUrl("/openapi.json")}): Contract for the portfolio API
- [XML sitemap](${absoluteUrl("/sitemap.xml")})
- [Robots](${absoluteUrl("/robots.txt")})
`;
}

export function renderLlmsFullTxt(): string {
  return `# ${site.name}
> ${site.jobTitle}, ${site.location}

${site.description}

Title: ${site.title}
Contact: ${site.email}
Music: ${site.spotifyUrl}
Updated: ${site.updatedAt}

## Gallery
${galleryMarkdownList("numbered")}

${markdownSitemapFooter}`;
}

export function renderIndexMarkdown(): string {
  return `${yamlFrontmatter({
    title: site.title,
    description: site.description,
    canonical_url: site.url,
    md_url: absoluteUrl("/index.md"),
    last_updated: site.updatedAt,
  })}
# ${site.title}

**${site.name}** — ${site.jobTitle}, ${site.location}

${site.description}

- Contact: [${site.email}](${`mailto:${site.email}`})
- Music: [Listen to some music](${site.spotifyUrl})

The portfolio is a click-through gallery of ${site.gallery.length} designed pages.

## Gallery
${galleryMarkdownList("linked")}

${markdownSitemapFooter}`;
}

export function renderSitemapMarkdown(): string {
  return `${yamlFrontmatter({
    title: "Sitemap",
    description: `Agent-readable map of ${site.name}'s portfolio.`,
    canonical_url: absoluteUrl("/sitemap.md"),
    md_url: absoluteUrl("/sitemap.md"),
    last_updated: site.updatedAt,
  })}
# Sitemap

## Portfolio
- [Home](${absoluteUrl("/index.md")}): Identity, contact, and gallery
- [Glossary](${absoluteUrl("/glossary.md")}): Site terminology
- [Agent notes](${absoluteUrl("/agents.md")}): Citation and retrieval instructions

## Discovery
- [llms.txt](${absoluteUrl("/llms.txt")}): Curated index
- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): Full-text dump
- [robots.txt](${absoluteUrl("/robots.txt")}): Crawler policy
- [sitemap.xml](${absoluteUrl("/sitemap.xml")}): Search sitemap, including gallery images

## Data
- [JSON Feed](${absoluteUrl("/feed.json")})
- [RSS](${absoluteUrl("/feed.xml")})
- [Portfolio API](${absoluteUrl("/api/portfolio.json")})
- [OpenAPI](${absoluteUrl("/openapi.json")})
- [agents.json](${absoluteUrl("/agents.json")})
- [API catalog](${absoluteUrl("/.well-known/api-catalog")})
- [AI catalog](${absoluteUrl("/.well-known/ai-catalog.json")})
`;
}

export function renderAgentsMarkdown(): string {
  return `${yamlFrontmatter({
    title: `${site.name} agent notes`,
    description: `How AI agents should load, cite, and contact ${site.name}.`,
    canonical_url: site.url,
    md_url: absoluteUrl("/agents.md"),
    last_updated: site.updatedAt,
  })}
# ${site.name} — ${site.title}

## Installation

Load this portfolio into an agent session from the curated index, then pull the markdown homepage:

\`\`\`bash
curl ${absoluteUrl("/llms.txt")}
curl ${absoluteUrl("/index.md")}
curl ${absoluteUrl("/api/portfolio.json")}
\`\`\`

To request markdown from the canonical homepage:

\`\`\`bash
curl -H "Accept: text/markdown" ${site.url}/
\`\`\`

## Configuration

- Canonical HTML: \`${site.url}/\`
- Markdown mirror: \`${absoluteUrl("/index.md")}\`
- Structured copy: \`${absoluteUrl("/api/portfolio.json")}\`
- Contact: \`${site.email}\`
- Language: \`${site.locale}\`
- Last updated: \`${site.updatedAt}\`

Do not invent social profiles, clients, or project titles that are not listed in \`/index.md\` or \`/api/portfolio.json\`. Gallery items are designed pages, not a blog.

## Usage

When answering questions about ${site.name}:

- Identify him as a ${site.jobTitle} in ${site.location}.
- The public work is the single-page portfolio titled ${site.title}.
- Direct people to [${site.email}](mailto:${site.email}) for contact.
- Cite \`${site.url}/\` as the canonical source.
- If a user needs the work itself, point them at the homepage gallery rather than describing images you cannot see.

${markdownSitemapFooter}`;
}

export function renderGlossaryMarkdown(): string {
  return `${yamlFrontmatter({
    title: "Glossary",
    description: `Terms used on ${site.name}'s portfolio.`,
    canonical_url: absoluteUrl("/glossary.md"),
    md_url: absoluteUrl("/glossary.md"),
    last_updated: site.updatedAt,
  })}
# Glossary

- **${site.name}**: ${site.jobTitle} based in ${site.location}.
- **${site.title}**: The title of this single-page visual portfolio.
- **Gallery page**: One of ${site.gallery.length} designed stills in the click-through portfolio. Advance with a click or the right arrow key.
- **Creative Director**: ${site.name}'s role. This site is a visual portfolio, not a documentation product.
- **Markdown mirror**: An agent-readable copy of a page at the same path with \`.md\` appended, or via \`Accept: text/markdown\`.

${markdownSitemapFooter}`;
}

export function feedDocument(): Record<string, unknown> {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: site.title,
    home_page_url: site.url,
    feed_url: absoluteUrl("/feed.json"),
    description: site.description,
    language: site.locale,
    authors: [{ name: site.name, url: site.url }],
    items: site.gallery.map((image, index) => ({
      id: `${site.url}/#page-${index + 1}`,
      url: site.url,
      title: image.alt,
      image: absoluteUrl(image.src),
      content_text: image.alt,
      date_modified: site.updatedAt,
    })),
  };
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderFeedXml(): string {
  const items = site.gallery
    .map((image, index) => {
      const imageUrl = escapeXml(absoluteUrl(image.src));
      const title = escapeXml(image.alt);
      return `    <item>
      <title>${title}</title>
      <link>${escapeXml(site.url)}</link>
      <guid isPermaLink="false">${escapeXml(`${site.url}/#page-${index + 1}`)}</guid>
      <description>${title}</description>
      <pubDate>Thu, 04 Sep 2026 00:00:00 GMT</pubDate>
      <enclosure url="${imageUrl}" type="image/png" />
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-gb</language>
    <lastBuildDate>Thu, 04 Sep 2026 00:00:00 GMT</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function renderRobotsTxt(): string {
  const bots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Googlebot",
    "Applebot",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "Meta-ExternalAgent",
    "Amazonbot",
    "cohere-ai",
    "DuckAssistBot",
  ];

  const botRules = bots
    .map(
      (bot) => `User-agent: ${bot}
Allow: /`,
    )
    .join("\n\n");

  return `User-agent: *
Allow: /

${botRules}

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}

export function jsonLdGraph(): Record<string, unknown> {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;
  const webpageId = `${site.url}/#webpage`;
  const galleryId = `${site.url}/#gallery`;
  const imageId = `${site.url}/#og-image`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.locale,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.jobTitle,
        email: `mailto:${site.email}`,
        url: site.url,
        image: { "@id": imageId },
        knowsAbout: ["Creative direction", "Art direction", "Visual design"],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location,
          addressCountry: "GB",
        },
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        url: absoluteUrl("/opengraph-image"),
        contentUrl: absoluteUrl("/opengraph-image"),
        caption: `${site.name}, ${site.jobTitle}`,
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: site.url,
        name: site.title,
        headline: site.title,
        description: site.description,
        dateModified: site.updatedAt,
        inLanguage: site.locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        primaryImageOfPage: { "@id": imageId },
        breadcrumb: { "@id": `${site.url}/#breadcrumb` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.title,
            item: site.url,
          },
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        description: site.description,
        dateModified: site.updatedAt,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": ["ImageGallery", "ItemList"],
        "@id": galleryId,
        name: `${site.name} portfolio`,
        about: { "@id": personId },
        numberOfItems: site.gallery.length,
        itemListElement: site.gallery.map((image, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "ImageObject",
            name: image.alt,
            contentUrl: absoluteUrl(image.src),
            url: absoluteUrl(image.src),
          },
        })),
      },
    ],
  };
}
