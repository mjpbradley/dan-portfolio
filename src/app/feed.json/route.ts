import { feedDocument } from "@/lib/discovery";
import { jsonResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(feedDocument(), "application/feed+json; charset=utf-8");
}

