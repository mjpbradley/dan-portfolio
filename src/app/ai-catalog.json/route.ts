import { aiCatalogDocument } from "@/lib/agent-surfaces";
import { jsonResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(aiCatalogDocument());
}

