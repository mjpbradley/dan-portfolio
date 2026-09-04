import { absoluteUrl, site, siteHost } from "@/content/site";

function catalogIdentifier(namespace: string, name: string): string {
  return `urn:air:${siteHost()}:${namespace}:${name}`;
}

export function portfolioDocument(): Record<string, unknown> {
  return {
    name: site.name,
    jobTitle: site.jobTitle,
    location: site.location,
    title: site.title,
    description: site.description,
    email: site.email,
    url: site.url,
    locale: site.locale,
    updatedAt: site.updatedAt,
    music: site.spotifyUrl,
    gallery: site.gallery.map((image, index) => ({
      position: index + 1,
      alt: image.alt,
      src: absoluteUrl(image.src),
      width: image.width,
      height: image.height,
    })),
  };
}

export function openApiDocument(): Record<string, unknown> {
  return {
    openapi: "3.1.0",
    info: {
      title: `${site.name} portfolio API`,
      version: "1.0.0",
      description:
        "Read-only identity, contact, and gallery data for the Stay A While portfolio.",
      contact: {
        name: site.name,
        email: site.email,
        url: site.url,
      },
    },
    servers: [{ url: site.url }],
    paths: {
      "/api/portfolio.json": {
        get: {
          operationId: "getPortfolio",
          summary: "Return identity, contact, and the gallery list",
          description:
            "The machine-readable equivalent of the homepage markdown mirror.",
          responses: {
            "200": {
              description: "Portfolio document",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Portfolio" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Portfolio: {
          type: "object",
          additionalProperties: false,
          required: [
            "name",
            "jobTitle",
            "location",
            "title",
            "description",
            "email",
            "url",
            "gallery",
          ],
          properties: {
            name: { type: "string" },
            jobTitle: { type: "string" },
            location: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            email: { type: "string", format: "email" },
            url: { type: "string", format: "uri" },
            locale: { type: "string" },
            updatedAt: { type: "string", format: "date-time" },
            music: { type: "string", format: "uri" },
            gallery: {
              type: "array",
              items: { $ref: "#/components/schemas/GalleryPage" },
            },
          },
        },
        GalleryPage: {
          type: "object",
          additionalProperties: false,
          required: ["position", "alt", "src", "width", "height"],
          properties: {
            position: { type: "integer", minimum: 1 },
            alt: { type: "string" },
            src: { type: "string", format: "uri" },
            width: { type: "integer" },
            height: { type: "integer" },
          },
        },
      },
    },
  };
}

export function apiCatalogDocument(): Record<string, unknown> {
  return {
    linkset: [
      {
        anchor: absoluteUrl("/api/portfolio.json"),
        "service-desc": [
          {
            href: absoluteUrl("/openapi.json"),
            type: "application/vnd.oai.openapi+json;version=3.1",
          },
        ],
        "service-doc": [
          {
            href: absoluteUrl("/agents.md"),
            type: "text/markdown",
          },
        ],
      },
    ],
  };
}

export function aiCatalogDocument(): Record<string, unknown> {
  return {
    specVersion: "1.0",
    host: {
      displayName: site.name,
      identifier: `did:web:${siteHost()}`,
      documentationUrl: absoluteUrl("/agents.md"),
    },
    entries: [
      {
        identifier: catalogIdentifier("api", "portfolio"),
        displayName: `${site.name} portfolio API`,
        type: "application/vnd.oai.openapi+json;version=3.1",
        url: absoluteUrl("/openapi.json"),
        description:
          "Read-only OpenAPI description for identity, contact, and gallery data.",
        tags: ["portfolio", "openapi"],
        capabilities: ["getPortfolio"],
        representativeQueries: [
          "Who is Daniel Sherratt?",
          "How do I contact a Creative Director in London?",
          "Get the Stay A While portfolio as structured data",
        ],
        version: "1.0.0",
        updatedAt: site.updatedAt,
      },
      {
        identifier: catalogIdentifier("skill", "agents"),
        displayName: `${site.name} agent notes`,
        type: "text/markdown",
        url: absoluteUrl("/agents.md"),
        description:
          "Instructions for citing, contacting, and loading this portfolio in an agent session.",
        tags: ["agents", "citation"],
        representativeQueries: [
          "How should an AI agent cite Daniel Sherratt?",
          "Where is the markdown version of this portfolio?",
        ],
        version: "1.0.0",
        updatedAt: site.updatedAt,
      },
    ],
  };
}

export function agentsJsonDocument(): Record<string, unknown> {
  return {
    agentsJson: "0.1.0",
    info: {
      title: `${site.name} portfolio`,
      version: "1.0.0",
      description: site.description,
    },
    sources: [
      {
        id: "portfolio",
        path: "/openapi.json",
      },
    ],
    flows: [
      {
        id: "read-portfolio",
        title: "Read the portfolio",
        description:
          "Fetch identity, contact details, and the numbered gallery list.",
        steps: [
          {
            id: "get-portfolio",
            kind: "api",
            source: "portfolio",
            operationId: "getPortfolio",
          },
        ],
      },
    ],
  };
}
