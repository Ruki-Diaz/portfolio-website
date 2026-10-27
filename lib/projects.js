// Single source of truth for every project: the homepage "Featured Projects"
// and "More projects" cards, the case-study modal, the /projects/[slug] pages,
// their OG images and the sitemap all read from here so they can't drift.
//
// Copy reuses text already published on the site. Only real numbers go in
// `stats`; projects without one use `facts` (short chips taken from their own
// description) or neither.

/**
 * @typedef {{ value: string, label: string }} ProjectStat
 *
 * @typedef {{
 *   caseStudy?: string,
 *   demo?: string,
 *   code?: string,
 *   report?: string,
 * }} ProjectLinks
 *
 * @typedef {{ src: string, alt: string, width: number, height: number }} ProjectImage
 *
 * @typedef {{
 *   slug: string,
 *   order: number,
 *   featured: boolean,
 *   title: string,
 *   context: string,
 *   summary: string,
 *   tags: string[],
 *   problem: string,
 *   built: string,
 *   showed: string,
 *   stats?: ProjectStat[],
 *   moreStats?: ProjectStat[],
 *   facts?: string[],
 *   links: ProjectLinks,
 *   headline?: string,
 *   images?: ProjectImage[],
 *   seo: { title: string, description: string },
 *   schemaType: "SoftwareSourceCode" | "CreativeWork",
 * }} Project
 */

// Cards have room for three stats; anything extra goes in `moreStats`, which
// only the case study (modal and page) shows.
export const MAX_STATS = 3;

/** @type {Array<Omit<Project, "links"> & { links: Omit<ProjectLinks, "caseStudy"> }>} */
const PROJECTS = [
  {
    slug: "melbourne-pulse",
    order: 1,
    featured: true,
    title: "Melbourne Pulse",
    headline: "Melbourne CBD Pedestrian Foot Traffic Forecasting with LightGBM",
    context: "Live ML platform · City of Melbourne open data",
    summary: "A live platform showing how busy Melbourne's CBD is right now, with a LightGBM model forecasting the next 24 hours of foot traffic.",
    tags: ["Python", "LightGBM", "Pandas", "GitHub Actions", "Pytest", "Neon Postgres", "Next.js", "Gemini API", "Vercel"],
    problem:
      "There was no simple way to see how busy Melbourne's CBD is right now, or how busy it will be over the next 24 hours, from the city's raw open data.",
    built:
      "An hourly GitHub Actions pipeline with a Pytest validation gate loads data from 99 pedestrian counting stations and 6,300+ parking sensors into Neon Postgres. A leakage-free LightGBM model forecasts hourly foot traffic, and Gemini Flash writes plain-English summaries.",
    showed:
      "The model beats the 8-week historical baseline by 10% on 132,696 unseen sensor-hours, and the whole live platform runs on free tiers at $0/month.",
    stats: [
      { value: "10%", label: "more accurate than baseline" },
      { value: "132,696", label: "test sensor-hours" },
      { value: "$0/month", label: "to run, on free tiers" },
    ],
    moreStats: [{ value: "99 + 6,300+", label: "stations / sensors" }],
    links: {
      demo: "https://melbourne-pulse-au.vercel.app/",
      code: "https://github.com/Ruki-Diaz/melbourne-pulse",
      report: "https://github.com/Ruki-Diaz/melbourne-pulse/blob/main/model/REPORT.md",
    },
    images: [
      {
        src: "/pulse-home.png",
        alt: "Melbourne Pulse live pedestrian and parking analytics homepage hero with live stats",
        width: 2880,
        height: 1800,
      },
      {
        src: "/pulse-map.png",
        alt: "Melbourne Pulse live pedestrian map of Melbourne CBD",
        width: 2880,
        height: 1800,
      },
      {
        src: "/pulse-forecast.png",
        alt: "Melbourne Pulse Next 24 Hours LightGBM foot traffic forecast chart",
        width: 2880,
        height: 1800,
      },
    ],
    seo: {
      title: "Melbourne Pulse: CBD Foot Traffic & Parking Forecasting",
      description:
        "Live Melbourne CBD pedestrian and parking analytics. A LightGBM model forecasts hourly foot traffic from 99 counting stations, beating baseline by 10%.",
    },
    schemaType: "SoftwareSourceCode",
  },
  {
    slug: "mop-data-science-team-lead",
    order: 2,
    featured: true,
    title: "MOP Data Science Use Case Quality & Publication",
    headline: "Data Science Use Case Quality & Publication for Melbourne Open Playground",
    context: "Team lead · Chameleon, Smarter World Melbourne · Jul – Oct 2026",
    summary: "Leading the review, standardisation and publication-readiness of data science use cases across a repository of 200+.",
    tags: ["Python", "Jupyter Notebook", "Pandas", "Git", "GitHub", "Data Visualisation", "Microsoft Planner"],
    problem:
      "The Melbourne Open Playground (MOP) repository holds 200+ data science use cases, and each one needed review, standardisation and a clear path to publication.",
    built:
      "Consistent Jupyter Notebook standards, a technical and GitHub review process, and clearer release structures for reviewed and completed work, coordinated with the Quality Management and Web teams.",
    showed:
      "Multiple analytics use cases moved from review through to production-ready outputs, with an end-to-end publication workflow the wider team could follow.",
    stats: [
      { value: "200+", label: "use cases in the repository" },
      { value: "64", label: "commits, #1 contributor" },
      { value: "Team lead", label: "Data Science team" },
    ],
    links: {
      code: "https://github.com/Chameleon-company/MOP-Code/tree/master/usecases/FINALISED",
    },
    images: [
      {
        src: "/mop-heatmap.png",
        alt: "Heatmap visualisation from a Melbourne Open Playground data science use case reviewed by the MOP team",
        width: 1024,
        height: 619,
      },
      {
        src: "/mop-map.png",
        alt: "Map visualisation of Melbourne data from a published MOP data science use case",
        width: 1024,
        height: 702,
      },
      {
        src: "/mop-conclusion.png",
        alt: "Conclusion section of a standardised MOP Jupyter Notebook use case",
        width: 1024,
        height: 513,
      },
    ],
    seo: {
      title: "MOP Data Science Team Lead: Melbourne Open Playground",
      description:
        "Rukshan Dias led the Data Science team for the Melbourne Open Playground (MOP) project, reviewing and standardising a repository of 200+ use cases.",
    },
    schemaType: "CreativeWork",
  },
  {
    slug: "momentum-todo",
    order: 3,
    featured: true,
    title: "Momentum Todo",
    headline: "Momentum Todo: A Personal Productivity App for Tasks, Projects and Calendar Planning",
    context: "Live web app · Personal productivity",
    summary: "A production-ready productivity platform combining tasks, projects, calendar planning and progress tracking in one workspace.",
    tags: ["JavaScript", "HTML/CSS", "Clerk", "Neon PostgreSQL", "LocalStorage", "Vercel"],
    problem:
      "Daily planning tends to be split across separate task, project and calendar tools. Momentum is designed to make it simple, focused and intentional in one workspace.",
    built:
      "A production-ready platform combining task management, project organisation, calendar planning and progress tracking, with authentication, cloud persistence and a polished responsive interface.",
    showed:
      "A complete product, from sign-in to cloud-synced data, running live rather than stopping at a prototype.",
    facts: ["Live", "Auth with Clerk", "Cloud persistence (Neon Postgres)"],
    links: {
      demo: "https://momentumtodo.vercel.app/",
      code: "https://github.com/Ruki-Diaz/momentum-todo",
    },
    images: [
      {
        src: "/momentum-dashboard.png",
        alt: "Momentum Todo dashboard with today, overdue, completed and streak counters, task input, today's board and calendar",
        width: 2048,
        height: 1056,
      },
      {
        src: "/momentum-hero.png",
        alt: "Momentum Todo landing page: \"Your day, with intention.\" with a preview of the app",
        width: 2048,
        height: 1058,
      },
      {
        src: "/momentum-today.png",
        alt: "Momentum Todo Today view feature section: \"Start every day with clarity.\"",
        width: 2048,
        height: 1056,
      },
      {
        src: "/momentum-planning.png",
        alt: "Momentum Todo calendar and Upcoming planning feature section: \"A calm view of what lies ahead.\"",
        width: 2048,
        height: 1056,
      },
    ],
    seo: {
      title: "Momentum Todo: Personal Productivity & Planning App",
      description:
        "Momentum Todo: a production-ready productivity platform with tasks, projects, calendar planning, progress tracking and cloud persistence in one workspace.",
    },
    schemaType: "SoftwareSourceCode",
  },
  {
    slug: "invoice-management-system",
    order: 4,
    featured: true,
    title: "Invoice Management System",
    headline: "Invoice Management System: A Flask and Supabase Web App for Invoices, Clients and Billing",
    context: "Web application · Software engineering internship, Irys Group",
    summary: "A secure, data-driven Flask and Supabase web app for managing invoices, clients and billing cycles.",
    tags: ["Flask", "Supabase", "Python", "Tailwind CSS"],
    problem:
      "The business needed a secure way to manage invoices, clients and billing cycles, and better internal tracking.",
    built:
      "A secure, data-driven web application. I translated the business requirements into database schemas and technical specifications.",
    showed: "The system improved internal tracking and operational efficiency.",
    facts: ["Flask", "Supabase", "Secure, data-driven web app"],
    links: {},
    images: [
      {
        src: "/invoice-app-dashboard.png",
        alt: "Irys invoice system finance dashboard with sidebar navigation, summary cards and quick actions",
        width: 1431,
        height: 449,
      },
      {
        src: "/invoice-app-login.png",
        alt: "Irys invoice system sign-in screen",
        width: 1431,
        height: 650,
      },
      {
        src: "/invoice-app-transactions.png",
        alt: "Irys invoice system View Transactions screen with customer, invoice, date and salesperson filters and an invoice history table",
        width: 1450,
        height: 727,
      },
      {
        src: "/invoice-app-payment.png",
        alt: "Irys invoice system Record Customer Payment form with customer, date, amount, payment method and bank account fields",
        width: 1456,
        height: 730,
      },
      {
        src: "/invoice-app-reports.png",
        alt: "Irys invoice system Reports & Exports screen for customer statements, outstanding payments, system summary and Excel export",
        width: 1464,
        height: 733,
      },
    ],
    seo: {
      title: "Invoice Management System (Flask, Supabase, Python)",
      description:
        "A secure, data-driven Flask and Supabase web application for managing invoices, clients and billing cycles, built during a software engineering internship.",
    },
    schemaType: "CreativeWork",
  },
  {
    slug: "weather-impact-public-transport",
    order: 5,
    featured: false,
    title: "Weather Impact on Public Transport",
    headline: "How Rainfall Affects Melbourne Public Transport: Predicting Congestion with Machine Learning",
    context: "Data science use case · Melbourne Open Playground (MOP) · Mar – Jun 2026",
    summary: "Combines Melbourne transport activity with BOM rainfall data to predict congestion, with an LLM layer that explains the predictions.",
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "LLM Prompting", "RAG"],
    problem:
      "How much do weather conditions change public transport activity in Melbourne, and can congestion be predicted from them?",
    built:
      "Pipelines that clean and integrate Melbourne transport activity with BOM rainfall and event data, EDA and visualisations, and fine-tuned ML models that predict congestion. A RAG-style LLM layer turns the predictions into plain-language insights.",
    showed:
      "The completed solution, explanation layer included, was delivered to MOP's READY TO PUBLISH repository for integration and future use.",
    links: {
      code: "https://github.com/Chameleon-company/MOP-Code/tree/master/usecases/READY%20TO%20PUBLISH/Transport_and_Mobility/2026/T1/UC00216_Weather_Impact_on_Public_Transport_Usage",
    },
    seo: {
      title: "Weather Impact on Melbourne Public Transport (ML + BOM Data)",
      description:
        "Machine learning use case combining Melbourne public transport activity with BOM rainfall data to predict congestion, with an LLM layer explaining results.",
    },
    schemaType: "SoftwareSourceCode",
  },
  {
    slug: "melbourne-housing-price-prediction",
    order: 6,
    featured: false,
    title: "Melbourne Housing Price Prediction",
    headline: "Melbourne House Price Prediction with Machine Learning: Burwood, Doncaster & Berwick",
    context: "Machine learning project · Burwood, Doncaster & Berwick, Melbourne",
    summary: "Predicts Melbourne house prices from 225 property records, with SHAP explainability and a Streamlit app.",
    tags: ["Python", "Pandas", "Scikit-learn", "SHAP", "Streamlit", "Jupyter"],
    problem:
      "Estimating a residential sale price across Burwood, Doncaster and Berwick in Melbourne from a property's characteristics.",
    built:
      "A cleaned, feature-engineered dataset of 225 property records, with Linear, Ridge, Random Forest and Gradient Boosting models compared using 5-fold cross-validation, and the trained pipeline deployed as an interactive Streamlit app.",
    showed:
      "Models were evaluated on MAE, RMSE and R², and feature importance plus SHAP analysis explained which property characteristics drive the estimates.",
    // Add `demo` here once the Streamlit app has a public URL.
    links: {
      report: "/melbourne-housing-price-prediction.pdf",
    },
    seo: {
      title: "Melbourne House Price Prediction with Machine Learning",
      description:
        "End-to-end ML project predicting house prices in Burwood, Doncaster and Berwick, Melbourne, with SHAP explainability and a Streamlit price estimator.",
    },
    schemaType: "CreativeWork",
  },
  {
    slug: "wheelchair-navigation-system",
    order: 7,
    featured: false,
    title: "Wheelchair Navigation System (AI)",
    headline: "Wheelchair Navigation System: Accessible Route Planning with A* Search",
    context: "AI project · Graph modelling & pathfinding",
    summary: "Plans wheelchair-accessible routes with graph modelling and A* search, prioritising safer paths over the shortest distance.",
    tags: ["Python", "A*", "Graph Modelling", "AI", "Pathfinding"],
    problem:
      "The shortest route is not always a safe or accessible one for a wheelchair user, so routing has to weigh terrain and accessibility, not just distance.",
    built:
      "A graph model of the route network with terrain and accessibility constraints, searched with A* using enhanced heuristics, and routes visualised on an interactive map.",
    showed:
      "Prioritising safer paths over shortest distance demonstrated a real-world application of intelligent pathfinding.",
    links: {},
    seo: {
      title: "Wheelchair Navigation System: Accessible Routing with A*",
      description:
        "An AI navigation system that plans wheelchair-accessible routes with graph modelling and A* search, prioritising terrain and accessibility over distance.",
    },
    schemaType: "CreativeWork",
  },
  {
    slug: "wumpus-world-pddl",
    order: 8,
    featured: false,
    title: "Wumpus World AI Planning (PDDL)",
    headline: "Wumpus World AI Planning with PDDL",
    context: "AI planning project · Intelligent agents",
    summary: "Models and solves the Wumpus World in PDDL with sensing and constraint-based reasoning, comparing several planning solvers.",
    tags: ["PDDL", "AI Planning", "Constraint Reasoning", "Intelligent Agents"],
    problem:
      "Modelling the Wumpus World so an automated planner can reason about hazards and act like an intelligent agent.",
    built:
      "A PDDL planning system for the problem. I identified and fixed logical issues in the domain, introduced constraint-based reasoning including sensing, and simulated agent behaviour.",
    showed:
      "Running multiple planning solvers on the model compared their performance, efficiency and stability in decision-making.",
    links: {},
    seo: {
      title: "Wumpus World AI Planning with PDDL",
      description:
        "An automated planning system that models and solves the Wumpus World in PDDL, with sensing, constraint-based reasoning and a comparison of planning solvers.",
    },
    schemaType: "CreativeWork",
  },
];

/** @type {Project[]} */
export const projects = PROJECTS.map((project) => ({
  ...project,
  stats: project.stats?.slice(0, MAX_STATS),
  links: { caseStudy: `/projects/${project.slug}`, ...project.links },
})).sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

/** @param {string} slug */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

// "01".."04" for featured projects, so the card, modal and page agree.
/** @param {Project} project */
export function getProjectNumber(project) {
  const i = featuredProjects.indexOf(project);
  return i >= 0 ? String(i + 1).padStart(2, "0") : undefined;
}

// The next `count` projects after this one (wrapping around), so every page
// gets a different set of related links.
/** @param {string} slug */
export function getRelatedProjects(slug, count = 3) {
  const i = projects.findIndex((p) => p.slug === slug);
  return Array.from({ length: Math.min(count, projects.length - 1) }, (_, k) =>
    projects[(i + 1 + k) % projects.length]
  );
}
