import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function prefersMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  const types = accept.split(",").map((part) => {
    const mediaType = part.split(";")[0];
    return mediaType?.trim().toLowerCase() ?? "";
  });

  const markdownIndex = types.indexOf("text/markdown");
  if (markdownIndex === -1) {
    return false;
  }

  const htmlIndex = types.indexOf("text/html");
  if (htmlIndex === -1) {
    return true;
  }

  return markdownIndex < htmlIndex;
}

export function proxy(request: NextRequest) {
  if (!prefersMarkdown(request)) {
    const response = NextResponse.next();
    response.headers.append("Vary", "Accept");
    return response;
  }

  const markdownUrl = request.nextUrl.clone();
  markdownUrl.pathname = "/index.md";
  const response = NextResponse.rewrite(markdownUrl);
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: "/",
};
