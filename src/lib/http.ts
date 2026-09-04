import { absoluteUrl } from "@/content/site";
import { discoveryLinkHeader } from "@/lib/discovery-links";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Accept, Content-Type",
} as const;

function linkHeader(canonicalPath?: string): string {
  if (!canonicalPath) {
    return discoveryLinkHeader;
  }

  return `${discoveryLinkHeader}, <${absoluteUrl(canonicalPath)}>; rel="canonical"`;
}

export function markdownResponse(
  body: string,
  canonicalPath = "/",
): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
      Link: linkHeader(canonicalPath),
      ...corsHeaders,
    },
  });
}

export function plainTextResponse(body: string, canonicalPath?: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
      Link: linkHeader(canonicalPath),
      ...corsHeaders,
    },
  });
}

export function jsonResponse(
  data: unknown,
  contentType = "application/json; charset=utf-8",
): Response {
  return new Response(`${JSON.stringify(data, null, 2)}\n`, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      Link: discoveryLinkHeader,
      ...corsHeaders,
    },
  });
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Link: discoveryLinkHeader,
      ...corsHeaders,
    },
  });
}
