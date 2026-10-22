import { ImageResponse } from "next/og";
import { SITE, DEFAULT_OG_IMAGE } from "@/lib/site";

export const alt = DEFAULT_OG_IMAGE.alt;
export const size = { width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height };
export const contentType = "image/png";

// Loads Inter (the site font) as TTF from Google Fonts. Satori can't read woff2,
// and Google serves TTF when the request has no browser user agent.
async function loadInter(weight, text) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const name = "Rukshan Dias.";
  const subtitle = "Data Scientist & Software Engineer · Melbourne";
  const domain = new URL(SITE).host;

  const [bold, medium] = await Promise.all([
    loadInter(700, name),
    loadInter(500, subtitle + domain),
  ]);

  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700, style: "normal" },
    medium && { name: "Inter", data: medium, weight: 500, style: "normal" },
  ].filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(37,99,235,0.28), transparent 45%), radial-gradient(circle at 85% 85%, rgba(147,51,234,0.25), transparent 45%)",
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            borderRadius: 3,
            marginBottom: 40,
            backgroundImage: "linear-gradient(90deg, #60a5fa, #a855f7)",
          }}
        />

        <div style={{ display: "flex", fontSize: 128, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
          <span>Rukshan&nbsp;</span>
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #60a5fa, #a855f7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Dias.
          </span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 44, fontWeight: 500, color: "#d4d4d4" }}>
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 64,
            fontSize: 26,
            fontWeight: 500,
            color: "#737373",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 5,
              marginRight: 14,
              backgroundColor: "#60a5fa",
            }}
          />
          {domain}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
