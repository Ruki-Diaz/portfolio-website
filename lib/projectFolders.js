// Groups the projects in data/projects.js into the three homepage folders.
// Nothing here is new content: titles, links and stacks all come from the
// shared project data. `meta` is two items picked from each project's own
// tech list (or its role), short enough to fit on a folder sheet.
//
// A folder shows at most four files (MAX_VISIBLE in glass-folder-cards), so
// each group must stay at four or fewer or a project becomes unreachable.

import { projects, hasProjectPage } from "@/data/projects";

/**
 * @typedef {{ key: string, meta: string, art?: boolean }} FolderEntry
 * @typedef {{ id: string, label: string, entries: FolderEntry[] }} FolderGroup
 */

/** @type {FolderGroup[]} */
const GROUPS = [
  {
    id: "data-science",
    label: "Data Science & ML",
    // Back to front: the last entry sits at the front of the stack.
    entries: [
      { key: "mop-data-science-team-lead", meta: "Team lead · Jupyter" },
      { key: "melbourne-housing-price-prediction", meta: "Scikit-learn · SHAP" },
      { key: "weather-impact-public-transport", meta: "Scikit-learn · RAG" },
      { key: "melbourne-pulse", meta: "LightGBM · Next.js", art: true },
    ],
  },
  {
    id: "full-stack",
    label: "Full-Stack",
    entries: [
      { key: "invoice-management-system", meta: "Flask · Supabase" },
      { key: "momentum-todo", meta: "JavaScript · Neon", art: true },
    ],
  },
  {
    id: "ai-planning",
    label: "AI & Planning",
    entries: [
      { key: "Wheelchair Navigation System (AI)", meta: "Python · A*" },
      { key: "wumpus-world", meta: "PDDL · A*", art: true },
      { key: "snake-nn", meta: "Python · NumPy", art: true },
      { key: "neurodrive", meta: "Neuroevolution · A*", art: true },
    ],
  },
];

/** "Melbourne Pulse – Live CBD…" → "Melbourne Pulse"; "NeuroDrive: Self-Driving…" → "NeuroDrive". */
export function shortTitle(title) {
  return title.split(/ – |: /)[0];
}

/** Stable id for a project's row in the plain list under the folders. */
export function listAnchor(project) {
  return "project-" + (project.slug ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
}

function find(key) {
  const project = projects.find((p) => p.slug === key || p.title === key);
  if (!project) throw new Error(`No project data for "${key}"`);
  return project;
}

/** Where a folder sheet links: the live demo first, then code, report or case study. */
function primaryHref(project) {
  if (project.demo) return project.demo;
  if (project.github) return project.github;
  if (project.pdf) return project.pdf;
  if (project.slug && hasProjectPage(project.slug)) return `/projects/${project.slug}`;
  return undefined;
}

export const projectFolders = GROUPS.map((group) => {
  if (group.entries.length > 4) throw new Error(`Folder "${group.label}" holds more than 4 projects`);
  const items = group.entries.map(({ key, meta, art }) => {
    const project = find(key);
    const caseStudy = project.slug && hasProjectPage(project.slug) ? `/projects/${project.slug}` : undefined;
    return {
      project,
      name: shortTitle(project.title),
      meta,
      art: !!art,
      href: primaryHref(project),
      anchor: listAnchor(project),
      links: {
        caseStudy,
        demo: project.demo,
        code: project.github,
        pdf: project.pdf,
        report: project.report,
      },
    };
  });
  return { id: group.id, label: group.label, items };
});

// Every project on the site must land in exactly one folder.
const placed = projectFolders.flatMap((g) => g.items.map((i) => i.project));
if (placed.length !== projects.length || new Set(placed).size !== projects.length) {
  throw new Error("projectFolders must place every project exactly once");
}
