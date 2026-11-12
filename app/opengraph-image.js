import { ImageResponse } from "next/og";
import { SITE, DEFAULT_OG_IMAGE } from "@/lib/site";

// Site-wide link preview (Open Graph / Twitter), generated at build time so it
// stays in sync with the site's theme. No headshot: LinkedIn and others show
// this card instead of picking the largest <img> on the page.

export const alt = DEFAULT_OG_IMAGE.alt;
export const size = { width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height };
export const contentType = "image/png";

const NAME = "Rukshan Dias";
const SUBTITLE = "Software Engineer & Data Scientist";
const TAGLINE = "Live ML projects, open-data analytics and full-stack apps.";
const CHIPS = ["Next.js", "React", "Python", "ML"];
const LOCATION = "Melbourne, Australia";

const BLUE = "#60a5fa"; // blue-400, the site's accent
const PURPLE = "#a855f7"; // purple-500
const ACCENT = `linear-gradient(90deg, ${BLUE}, ${PURPLE})`;

// Loads Inter (the site font) as TTF from Google Fonts, subset to the text used.
// Satori can't read woff2, and Google serves TTF when the request has no browser
// user agent. Falls back to the default font if the fetch fails.
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
  const domain = new URL(SITE).host;

  const [bold, medium, regular] = await Promise.all([
    loadInter(700, `RD.${NAME}`),
    loadInter(500, SUBTITLE + CHIPS.join("") + LOCATION),
    loadInter(400, TAGLINE + domain),
  ]);

  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700, style: "normal" },
    medium && { name: "Inter", data: medium, weight: 500, style: "normal" },
    regular && { name: "Inter", data: regular, weight: 400, style: "normal" },
  ].filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0a0a",
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      >
        {/* Faint grid, echoing the site's animated grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Blue and purple glows, as behind the site's hero */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(37,99,235,0.34), transparent 42%), radial-gradient(circle at 92% 96%, rgba(147,51,234,0.32), transparent 46%), linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.85) 100%)",
          }}
        />

        {/* Accent hairline along the top edge */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, display: "flex", backgroundImage: ACCENT }} />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "64px 80px 60px",
          }}
        >
          {/* Top row: logo mark and location */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em" }}>
              <span>RD</span>
              <span style={{ color: BLUE }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(23,23,23,0.7)",
                fontSize: 22,
                fontWeight: 500,
                color: "#d4d4d4",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginRight: 12,
                  backgroundColor: BLUE,
                  boxShadow: `0 0 12px ${BLUE}`,
                }}
              />
              {LOCATION}
            </div>
          </div>

          {/* Name, subtitle, tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1 }}>
              <span>Rukshan&nbsp;</span>
              <span style={{ backgroundImage: ACCENT, backgroundClip: "text", color: "transparent" }}>Dias</span>
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 44, fontWeight: 500, letterSpacing: "-0.02em", color: "#e5e5e5" }}>
              {SUBTITLE}
            </div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 28, fontWeight: 400, color: "#a3a3a3" }}>{TAGLINE}</div>
          </div>

          {/* Bottom row: tech chips and domain */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              {CHIPS.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 14,
                    padding: "10px 22px",
                    borderRadius: 12,
                    border: "1px solid rgba(96,165,250,0.28)",
                    backgroundColor: "rgba(10,10,10,0.75)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: BLUE,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 400, color: "#737373" }}>{domain}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
