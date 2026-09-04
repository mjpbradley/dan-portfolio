import { apiCatalogDocument } from "@/lib/agent-surfaces";
import { jsonResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(
    apiCatalogDocument(),
    'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  );
}

