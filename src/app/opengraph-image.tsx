import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f2ee",
          color: "#111111",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: "0.02em" }}>{site.name}</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            letterSpacing: "0.06em",
          }}
        >
          {`${site.jobTitle.toUpperCase()} · ${site.location.toUpperCase()}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
