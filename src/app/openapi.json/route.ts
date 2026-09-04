import { openApiDocument } from "@/lib/agent-surfaces";
import { jsonResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(
    openApiDocument(),
    "application/vnd.oai.openapi+json;version=3.1",
  );
}

