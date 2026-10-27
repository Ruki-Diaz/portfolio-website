// Content for the four "Featured Projects" cards on the homepage, in display
// order. Text is rewritten from each project's existing description; numbers
// are only ones already published on the site.
//
// Images and tags are read from data/projects.js (by slug) so the cards keep
// exactly the same screenshots and tag chips as that shared project data.

import { projects } from "@/data/projects";

/**
 * @typedef {{ value: string, label?: string }} FeaturedStat
 *
 * @typedef {{ demo?: string, code?: string, report?: string }} FeaturedLinks
 *
 * @typedef {{ src: string, alt: string, width: number, height: number }} FeaturedImage
 *
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   context: string,
 *   tags: string[],
 *   problem: string,
 *   built: string,
 *   showed: string,
 *   stats: FeaturedStat[],
 *   links: FeaturedLinks,
 *   images: FeaturedImage[],
 * }} FeaturedProject
 */

/** @param {string} slug */
function fromProjectData(slug) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`No project data for "${slug}"`);
  return { tags: project.tech, images: project.images ?? [] };
}

/** @type {FeaturedProject[]} */
export const featuredProjects = [
  {
    slug: "melbourne-pulse",
    title: "Melbourne Pulse – Live CBD Pedestrian & Parking Forecasting",
    context: "Personal project, live platform",
    ...fromProjectData("melbourne-pulse"),
    problem:
      "Melbourne has no simple live view of how busy the CBD is right now, or how busy it will be over the next 24 hours.",
    built:
      "An hourly GitHub Actions pipeline with a Pytest validation gate that ingests City of Melbourne open data into Neon Postgres, a LightGBM 24-hour forecast with no future leakage, and Gemini Flash plain-English summaries.",
    showed:
      "The forecast beat the 8-week historical baseline by 10% on 132,696 unseen sensor-hours, with the whole platform running on free tiers.",
    stats: [
      { value: "10%", label: "more accurate than baseline" },
      { value: "132,696", label: "test sensor-hours" },
      { value: "99 + 6,300+", label: "stations and sensors" },
      { value: "$0/month", label: "running cost" },
    ],
    links: {
      demo: "https://melbourne-pulse-au.vercel.app/",
      code: "https://github.com/Ruki-Diaz/melbourne-pulse",
      report: "https://github.com/Ruki-Diaz/melbourne-pulse/blob/main/model/REPORT.md",
    },
  },
  {
    slug: "mop-data-science-team-lead",
    title: "MOP Use Case Quality & Publication",
    context: "Team Lead, Melbourne Open Playground (Chameleon)",
    ...fromProjectData("mop-data-science-team-lead"),
    problem:
      "Data science use cases across a 200+ use case repository needed consistent quality before they could be published.",
    built:
      "Jupyter Notebook standards, technical and GitHub reviews, progress tracking, and a smoother publication workflow with the Quality Management and Web teams, while mentoring Data Scientists.",
    showed: "Use cases reached a publication-ready standard through a repeatable review process.",
    stats: [
      { value: "200+", label: "use cases in the repository" },
      { value: "64", label: "commits, #1 contributor" },
      { value: "Team lead" },
    ],
    links: {
      code: "https://github.com/Chameleon-company/MOP-Code/tree/master/usecases/FINALISED",
    },
  },
  {
    slug: "momentum-todo",
    title: "Momentum Todo",
    context: "Personal project, live app",
    ...fromProjectData("momentum-todo"),
    problem: "Daily planning tools tend to be either too cluttered or too basic.",
    built:
      "A production-ready productivity platform with task management, project organisation, calendar planning, progress tracking, authentication, cloud persistence and a responsive UI.",
    showed: "A complete full-stack product, deployed and live on Vercel.",
    stats: [{ value: "Live" }, { value: "Clerk auth" }, { value: "Neon Postgres" }],
    links: {
      demo: "https://momentumtodo.vercel.app/",
      code: "https://github.com/Ruki-Diaz/momentum-todo",
    },
  },
  {
    slug: "invoice-management-system",
    title: "Invoice Management System",
    context: "Internal tool, built during my Irys software engineering internship",
    ...fromProjectData("invoice-management-system"),
    problem: "Invoices, clients and billing cycles were hard to track internally.",
    built:
      "A secure, data-driven web app, translating the business requirements into database schemas and technical specifications.",
    showed: "Improved internal tracking and operational efficiency.",
    stats: [{ value: "Flask" }, { value: "Supabase" }, { value: "Secure web app" }],
    links: {},
  },
];

export const CARD_BLOCKS = [
  { key: "problem", label: "The problem" },
  { key: "built", label: "What I built" },
  { key: "showed", label: "What it showed" },
];
