// Turns the homepage "More Projects" (every project in data/projects.js
// without `featured`) into the glass folders under the featured cards.
// Nothing here is new content: titles, descriptions, tech and links all come
// from the shared project data. `meta` is a short stack line picked from each
// project's own tech list, short enough to fit on a folder sheet.
//
// A folder shows at most four files (MAX_VISIBLE in glass-folder-cards), so
// with more than four projects they are split into themed folders, and any
// folder that would still hold more than four is split again.

import { hasProjectPage } from "@/data/projects";

export const MAX_FILES = 4;

// File art: one hue of deep blue, kept dark at the top of the sheet so the
// white file name and its meta line clear WCAG AA against every pixel.
// (Checked against the real sheet names, which seed each sheet's art.)
const FILE_ART = [
  {
    style: "marble",
    colors: ["#020409", "#060d22", "#10204f", "#050a18", "#1c3178", "#3450ad"],
    scale: 0.6,
    warp: 3.2,
    angle: -0.5,
    gloss: 0.2,
    veins: 0.45,
  },
  {
    style: "streak",
    colors: ["#04060f", "#0a1533", "#1a3070", "#080d1d", "#27409a", "#3e5ac0"],
    scale: 0.7,
    warp: 1.5,
    angle: -0.6,
    gloss: 0.1,
    veins: 0,
  },
  {
    style: "marble",
    colors: ["#03050b", "#081026", "#14245a", "#070c1c", "#1f3580", "#3a55b6"],
    scale: 0.65,
    warp: 3.6,
    angle: 1.9,
    gloss: 0.2,
    veins: 0.5,
  },
];

// Back-panel art: the same blue, a little brighter, since no text sits on it.
const FOLDER_ART = [
  {
    style: "marble",
    colors: ["#04060d", "#0a1330", "#1b2f6e", "#0b1229", "#2c47a3", "#5a74d9", "#8ea4ff"],
    scale: 0.7,
    warp: 3.2,
    angle: -0.5,
    gloss: 0.3,
    veins: 0.4,
  },
  {
    style: "streak",
    colors: ["#050812", "#0d1a3d", "#24408f", "#0a1022", "#3a58bf", "#6c86e6"],
    scale: 0.7,
    warp: 1.5,
    angle: 0.35,
    gloss: 0.2,
    veins: 0,
  },
];

// Themes, used only when there are more than four projects. Projects are
// matched by slug (or title for projects without a page). Within a theme the
// last entry sits at the front of the stack, nearest the glass.
const THEMES = [
  {
    id: "ai-agents",
    label: "AI Agents & Search",
    entries: [
      { key: "Wheelchair Navigation System (AI)", meta: "Python · A*" },
      { key: "wumpus-world", meta: "PDDL · A*" },
      { key: "snake-nn", meta: "Python · NumPy" },
      { key: "neurodrive", meta: "JS · Three.js" },
    ],
  },
  {
    id: "data-science",
    label: "Data Science & ML",
    entries: [
      { key: "melbourne-housing-price-prediction", meta: "Python · SHAP" },
      { key: "weather-impact-public-transport", meta: "Python · RAG" },
    ],
  },
];

const keyOf = (project) => project.slug ?? project.title;

/** The sheet name: `shortTitle` from the data, else the title up to its first ": " or " – ". */
export const shortTitleOf = (project) => project.shortTitle ?? project.title.split(/: | – /)[0];

/** Two items from the project's own tech list, for projects not in THEMES. */
const fallbackMeta = (project) => (project.tech ?? []).slice(0, 2).join(" · ");

function toFile(project, meta, index) {
  return {
    key: keyOf(project),
    // Short on the sheet; the full title is the file's accessible name (set
    // by MoreProjectFolders) and the heading of the expanded panel.
    name: shortTitleOf(project),
    meta,
    art: FILE_ART[index % FILE_ART.length],
    project,
    caseStudy: project.slug && hasProjectPage(project.slug) ? `/projects/${project.slug}` : undefined,
  };
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/**
 * @param {Array<object>} otherProjects the non-featured projects, in data order
 * @returns {Array<{ id: string, label: string, art: object, files: Array<object> }>}
 */
export function buildMoreProjectFolders(otherProjects) {
  if (otherProjects.length === 0) return [];

  // Few enough for one folder: keep the data order, newest at the front.
  if (otherProjects.length <= MAX_FILES) {
    const files = [...otherProjects].reverse().map((p, i) => toFile(p, fallbackMeta(p), i));
    return [{ id: "more-projects", label: "More Projects", art: FOLDER_ART[0], files }];
  }

  const byKey = new Map(otherProjects.map((p) => [keyOf(p), p]));
  const placed = new Set();
  const groups = [];

  for (const theme of THEMES) {
    const projects = theme.entries
      .filter(({ key }) => byKey.has(key))
      .map(({ key, meta }) => {
        placed.add(key);
        return { project: byKey.get(key), meta };
      });
    if (projects.length) groups.push({ id: theme.id, label: theme.label, projects });
  }

  // A project added to the data later still gets a folder rather than vanishing.
  const rest = otherProjects.filter((p) => !placed.has(keyOf(p)));
  if (rest.length) {
    groups.push({ id: "other", label: "Other Projects", projects: rest.map((p) => ({ project: p, meta: fallbackMeta(p) })) });
  }

  return groups.flatMap((group) => {
    const parts = chunk(group.projects, MAX_FILES);
    return parts.map((part, n) => ({
      id: parts.length > 1 ? `${group.id}-${n + 1}` : group.id,
      label: parts.length > 1 ? `${group.label} ${n + 1}` : group.label,
      files: part.map(({ project, meta }, i) => toFile(project, meta, i)),
    }));
  }).map((folder, i) => ({ ...folder, art: FOLDER_ART[i % FOLDER_ART.length] }));
}
