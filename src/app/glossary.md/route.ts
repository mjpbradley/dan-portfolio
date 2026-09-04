import { renderGlossaryMarkdown } from "@/lib/discovery";
import { markdownResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(renderGlossaryMarkdown(), "/glossary.md");
}

