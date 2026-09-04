import { renderRobotsTxt } from "@/lib/discovery";
import { plainTextResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return plainTextResponse(renderRobotsTxt());
}

