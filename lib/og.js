// Helpers shared by the generated Open Graph images (next/og).

// Loads Inter (the site font) as TTF from Google Fonts. Satori can't read woff2,
// and Google serves TTF when the request has no browser user agent.
/** @param {number} weight @param {string} text @returns {Promise<ArrayBuffer | null>} */
export async function loadInter(weight, text) {
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

/** @param {{ bold: ArrayBuffer | null, medium: ArrayBuffer | null }} fonts */
export function interFonts({ bold, medium }) {
  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700, style: "normal" },
    medium && { name: "Inter", data: medium, weight: 500, style: "normal" },
  ].filter(Boolean);
  return fonts.length ? fonts : undefined;
}

export const OG_BACKGROUND = {
  backgroundColor: "#0a0a0a",
  backgroundImage:
    "radial-gradient(circle at 18% 22%, rgba(37,99,235,0.28), transparent 45%), radial-gradient(circle at 85% 85%, rgba(147,51,234,0.25), transparent 45%)",
};
