import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { projects, getProjectBySlug } from "@/lib/projects";
import { loadInter, interFonts, OG_BACKGROUND } from "@/lib/og";

export const alt = "Project case study by Rukshan Dias, Data Scientist & Software Engineer in Melbourne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const stats = project?.stats ?? [];
  const facts = stats.length ? [] : project?.facts ?? [];
  const title = project?.title ?? "Rukshan Dias";
  const context = project?.context ?? "";
  const footer = `Rukshan Dias · ${new URL(SITE).host}`;

  const [bold, medium] = await Promise.all([
    loadInter(700, title + stats.map((s) => s.value).join("")),
    loadInter(500, context + footer + "Case study" + stats.map((s) => s.label).join("") + facts.join("")),
  ]);

  const chip = {
    display: "flex",
    flexDirection: "column",
    marginRight: 20,
    padding: "20px 28px",
    borderRadius: 20,
    border: "1px solid #262626",
    backgroundColor: "rgba(10,10,10,0.7)",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          ...OG_BACKGROUND,
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 500, color: "#93c5fd" }}>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 6,
                borderRadius: 3,
                marginRight: 20,
                backgroundImage: "linear-gradient(90deg, #60a5fa, #a855f7)",
              }}
            />
            Case study
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: title.length > 28 ? 64 : 84, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 28, fontWeight: 500, color: "#a3a3a3" }}>{context}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {stats.length > 0 && (
            <div style={{ display: "flex", marginBottom: 40 }}>
              {stats.map((stat) => (
                <div key={stat.label} style={chip}>
                  <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#c4b5fd" }}>{stat.value}</div>
                  <div style={{ display: "flex", marginTop: 6, fontSize: 22, fontWeight: 500, color: "#a3a3a3" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          {facts.length > 0 && (
            <div style={{ display: "flex", marginBottom: 40 }}>
              {facts.map((fact) => (
                <div key={fact} style={{ ...chip, padding: "14px 24px", borderRadius: 999, fontSize: 26, fontWeight: 500, color: "#e5e5e5" }}>
                  {fact}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "#737373" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...size, fonts: interFonts({ bold, medium }) }
  );
}
