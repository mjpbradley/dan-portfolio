import { renderFeedXml } from "@/lib/discovery";
import { xmlResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderFeedXml());
}

