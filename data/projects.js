// Shared project data used by the homepage "Featured Projects" section,
// the individual /projects/[slug] pages and the sitemap.
//
// Projects with `indexable: true` and a `page` object get their own
// /projects/[slug] page, a sitemap entry and a homepage case study link.
// Copy in `page` reuses text already published on the site (project cards +
// Experience section). Leave a section out entirely rather than padding it.

export const projects = [
  {
    slug: "melbourne-pulse",
    indexable: true,
    title: "Melbourne Pulse – Live CBD Pedestrian & Parking Forecasting",
    description: "A live civic analytics platform showing how busy Melbourne's CBD is right now and forecasting the next 24 hours. It ingests City of Melbourne open data from 99 pedestrian counting stations and 6,300+ in-ground parking sensors via an hourly GitHub Actions pipeline with a Pytest validation gate, and stores the data in Neon serverless Postgres. A LightGBM model forecasts hourly foot traffic with no future leakage, beating the 8-week historical baseline by 10% on 132,696 unseen sensor-hours. Gemini Flash generates plain-English summaries. Runs entirely on free tiers ($0/month).",
    stats: [
      "10% more accurate than baseline",
      "132,696 test sensor-hours",
      "99 stations · 6,300+ sensors",
      "$0/month",
    ],
    tech: [
      "Python",
      "LightGBM",
      "Pandas",
      "GitHub Actions",
      "Pytest",
      "Neon Postgres",
      "Next.js",
      "Gemini API",
      "Vercel",
    ],
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
    demo: "https://melbourne-pulse-au.vercel.app/",
    github: "https://github.com/Ruki-Diaz/melbourne-pulse",
    report: "https://github.com/Ruki-Diaz/melbourne-pulse/blob/main/model/REPORT.md",
    page: {
      h1: "Melbourne CBD Pedestrian Foot Traffic Forecasting with LightGBM",
      seoTitle: "Melbourne Pulse: CBD Foot Traffic & Parking Forecasting",
      seoDescription: "Live Melbourne CBD pedestrian and parking analytics. A LightGBM model forecasts hourly foot traffic from 99 counting stations, beating baseline by 10%.",
      eyebrow: "Live ML project · City of Melbourne open data",
      schemaType: "SoftwareSourceCode",
      problem: [
        "A live civic analytics platform showing how busy Melbourne's CBD is right now and forecasting the next 24 hours.",
      ],
      data: [
        "Ingests City of Melbourne open data from 99 pedestrian counting stations and 6,300+ in-ground parking sensors.",
        "An hourly GitHub Actions pipeline with a Pytest validation gate stores the data in Neon serverless Postgres.",
      ],
      method: [
        "A LightGBM model forecasts hourly foot traffic with no future leakage.",
        "Gemini Flash generates plain-English summaries.",
        "Runs entirely on free tiers ($0/month).",
      ],
      results: [
        "The LightGBM model beats the 8-week historical baseline by 10% on 132,696 unseen sensor-hours.",
      ],
    },
  },
  {
    slug: "mop-data-science-team-lead",
    indexable: true,
    title: "MOP Data Science Team Lead – Use Case Quality & Publication",
    description: "Led the Data Science team for the Melbourne Open Playground (MOP) project, coordinating the review, standardisation, and publication-readiness of data science use cases across a repository of 200+ use cases. Established consistent Jupyter Notebook standards, conducted technical and GitHub reviews, mentored Data Scientists, managed use case progress, and collaborated with Quality Management and Web teams to improve the end-to-end publication workflow.",
    tech: ["Python", "Jupyter Notebook", "Pandas", "Git", "GitHub", "Data Analysis", "Data Visualisation", "Microsoft Planner"],
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
    github: "https://github.com/Chameleon-company/MOP-Code/tree/master/usecases/FINALISED",
    page: {
      h1: "Data Science Team Lead for Melbourne Open Playground Use Cases",
      seoTitle: "MOP Data Science Team Lead: Melbourne Open Playground",
      seoDescription: "Rukshan Dias led the Data Science team for the Melbourne Open Playground (MOP) project, reviewing and standardising a repository of 200+ use cases.",
      eyebrow: "Leadership · Chameleon, Smarter World Melbourne · Jul 2026 – Oct 2026",
      schemaType: "CreativeWork",
      problem: [
        "Led the Data Science team for the Melbourne Open Playground (MOP) project, coordinating the review, standardisation, and publication-readiness of data science use cases across a repository of 200+ use cases.",
      ],
      method: [
        "Established consistent Jupyter Notebook standards, developing the first reference implementation used to guide consistent delivery across future Data Science work.",
        "Built and implemented a centralised work allocation and tracking process, improving visibility of ownership, workload and delivery progress across the team.",
        "Led technical reviews across code, analytical notebooks, data visualisations and documentation, providing actionable feedback and driving quality improvements before release.",
        "Mentored team members on Git/GitHub, pull request workflows, code quality and technical troubleshooting, supporting issues through to resolution.",
        "Worked cross-functionally with Web Development and Quality Management teams to translate requirements, resolve technical dependencies and coordinate deliverables.",
        "Improved repository and delivery workflows by introducing clearer release structures and processes for managing reviewed and completed work.",
      ],
      results: [
        "Delivered hands-on Data Science solutions alongside leadership responsibilities, taking multiple analytics use cases from review through to production-ready project outputs.",
        "Ranked as the #1 repository contributor with 64 commits during the project period.",
      ],
    },
  },
  {
    slug: "invoice-management-system",
    indexable: true,
    title: "Invoice Management System",
    description: "Designed and developed a secure, data-driven web application during a software engineering internship to manage invoices, clients, and billing cycles. Translated business requirements into database schemas and technical specifications, successfully improving internal tracking and operational efficiency.",
    tech: ["Flask", "Supabase", "Python", "Tailwind CSS"],
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
    page: {
      h1: "Invoice Management System: A Flask and Supabase Web App for Invoices, Clients and Billing",
      seoTitle: "Invoice Management System (Flask, Supabase, Python)",
      seoDescription: "A secure, data-driven Flask and Supabase web application for managing invoices, clients and billing cycles, built during a software engineering internship.",
      eyebrow: "Web application · Software engineering internship",
      schemaType: "CreativeWork",
      problem: [
        "A secure, data-driven web application to manage invoices, clients, and billing cycles, designed and developed during a software engineering internship.",
      ],
      method: [
        "Translated business requirements into database schemas and technical specifications.",
      ],
      results: [
        "Improved internal tracking and operational efficiency.",
      ],
    },
  },
  {
    slug: "momentum-todo",
    indexable: true,
    title: "Momentum Todo",
    description: "A production-ready personal productivity platform designed to make daily planning simple, focused, and intentional. Momentum combines task management, project organisation, calendar planning, progress tracking, authentication, cloud persistence, and a polished responsive interface in one workspace.",
    tech: ["JavaScript", "HTML/CSS", "Clerk", "Neon PostgreSQL", "LocalStorage", "Vercel"],
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
    demo: "https://momentumtodo.vercel.app/",
    github: "https://github.com/Ruki-Diaz/momentum-todo",
    page: {
      h1: "Momentum Todo: A Personal Productivity App for Tasks, Projects and Calendar Planning",
      seoTitle: "Momentum Todo: Personal Productivity & Planning App",
      seoDescription: "Momentum Todo: a production-ready productivity platform with tasks, projects, calendar planning, progress tracking and cloud persistence in one workspace.",
      eyebrow: "Live web app · Personal productivity",
      schemaType: "SoftwareSourceCode",
      sectionTitles: { method: "Features" },
      problem: [
        "A production-ready personal productivity platform designed to make daily planning simple, focused, and intentional.",
      ],
      method: [
        "Task management",
        "Project organisation",
        "Calendar planning",
        "Progress tracking",
        "Authentication",
        "Cloud persistence",
        "A polished responsive interface, all in one workspace",
      ],
    },
  },
  {
    slug: "weather-impact-public-transport",
    hideCaseStudyImages: true,
    indexable: true,
    title: "Weather Impact on Public Transport",
    description: "Built an AI-assisted data science system that integrates Melbourne transport activity with BOM rainfall data. Developed data cleaning pipelines, performed EDA, and trained/fine-tuned ML models to predict congestion. Built a RAG-style LLM explanation layer to translate predictions into natural language insights.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "LLM Prompting", "RAG"],
    images: [
      {
        src: "/weather-actual-vs-predicted.png",
        alt: "Actual vs predicted public transport usage chart from the Melbourne weather impact model",
        width: 948,
        height: 675,
      },
      {
        src: "/weather-average-usage.png",
        alt: "Average Melbourne public transport usage compared across weather conditions",
        width: 960,
        height: 623,
      },
    ],
    github: "https://github.com/Chameleon-company/MOP-Code/tree/master/usecases/READY%20TO%20PUBLISH/Transport_and_Mobility/2026/T1/UC00216_Weather_Impact_on_Public_Transport_Usage",
    page: {
      h1: "How Rainfall Affects Melbourne Public Transport: Predicting Congestion with Machine Learning",
      seoTitle: "Weather Impact on Melbourne Public Transport (ML + BOM Data)",
      seoDescription: "Machine learning use case combining Melbourne public transport activity with BOM rainfall data to predict congestion, with an LLM layer explaining results.",
      eyebrow: "Data science use case · Melbourne Open Playground (MOP) · Mar 2026 – Jun 2026",
      schemaType: "SoftwareSourceCode",
      problem: [
        "A transport analytics use case for the Melbourne Open Playground (MOP) project, examining the impact of weather conditions on public transport activity.",
      ],
      data: [
        "Integrates Melbourne transport activity with BOM rainfall data.",
        "Built and maintained data pipelines to clean, integrate and transform transport, weather and event datasets.",
      ],
      method: [
        "Performed EDA and developed data visualisations to uncover patterns and actionable insights.",
        "Trained and fine-tuned ML models to predict congestion.",
        "Built a RAG-style LLM explanation layer to translate predictions into natural language insights.",
      ],
      results: [
        "Delivered the completed solution to MOP's READY TO PUBLISH repository for integration and future use.",
      ],
    },
  },
  {
    slug: "melbourne-housing-price-prediction",
    hideCaseStudyImages: true,
    indexable: true,
    title: "Melbourne Housing Price Prediction",
    description: "Developed an end-to-end machine learning project to analyse and predict residential property prices across Burwood, Doncaster, and Berwick in Melbourne. Built a dataset of 225 property records, performed data cleaning, exploratory data analysis and feature engineering, and compared Linear Regression, Ridge Regression, Random Forest, and Gradient Boosting models using 5-fold cross-validation. Evaluated model performance using MAE, RMSE and R², applied feature importance and SHAP analysis for model explainability, and deployed the trained prediction pipeline as an interactive Streamlit web application where users can enter property characteristics and receive an estimated sale price.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "SHAP", "Streamlit", "Joblib", "Jupyter Notebook"],
    images: [
      {
        src: "/melbourne-housing-streamlit.png",
        alt: "Streamlit app that estimates a Melbourne property's sale price from its characteristics",
        width: 560,
        height: 439,
      },
      {
        src: "/melbourne-housing-shap.png",
        alt: "SHAP feature importance plot explaining the Melbourne house price prediction model",
        width: 531,
        height: 586,
      },
      {
        src: "/melbourne-housing-eda.png",
        alt: "Exploratory data analysis of property prices in Burwood, Doncaster and Berwick",
        width: 500,
        height: 587,
      },
    ],
    pdf: "/melbourne-housing-price-prediction.pdf",
    page: {
      h1: "Melbourne House Price Prediction with Machine Learning: Burwood, Doncaster & Berwick",
      seoTitle: "Melbourne House Price Prediction with Machine Learning",
      seoDescription: "End-to-end ML project predicting house prices in Burwood, Doncaster and Berwick, Melbourne, with SHAP explainability and a Streamlit price estimator.",
      eyebrow: "Machine learning project · Melbourne property market",
      schemaType: "CreativeWork",
      problem: [
        "An end-to-end machine learning project to analyse and predict residential property prices across Burwood, Doncaster, and Berwick in Melbourne.",
      ],
      data: [
        "Built a dataset of 225 property records, then performed data cleaning, exploratory data analysis and feature engineering.",
      ],
      method: [
        "Compared Linear Regression, Ridge Regression, Random Forest, and Gradient Boosting models using 5-fold cross-validation.",
        "Evaluated model performance using MAE, RMSE and R².",
        "Applied feature importance and SHAP analysis for model explainability.",
      ],
      results: [
        "Deployed the trained prediction pipeline as an interactive Streamlit web application where users can enter property characteristics and receive an estimated sale price.",
      ],
    },
  },
  {
    indexable: false,
    title: "Wheelchair Navigation System (AI)",
    description: "Developed an AI-based navigation system to optimize wheelchair-accessible routes using graph modelling and the A* search algorithm. The system incorporates terrain and accessibility constraints to prioritize safer paths over shortest distance. Implemented enhanced heuristics and visualized routes using an interactive map, demonstrating real-world application of intelligent pathfinding.",
    tech: ["Python", "A*", "Graph Modelling", "AI", "Pathfinding"],
  },
  {
    indexable: false,
    title: "Wumpus World AI Planning (PDDL)",
    description: "Built an automated planning system using PDDL to model and solve the Wumpus World problem. Identified and fixed logical issues in the domain, introduced constraint-based reasoning including sensing, and simulated intelligent agent behaviour. Evaluated multiple planning solvers to compare performance, efficiency, and stability in decision-making.",
    tech: ["PDDL", "AI Planning", "Problem Solving", "Constraint Reasoning", "Intelligent Agents"],
  },
];

export const PAGE_SECTIONS = ["problem", "data", "method", "results"];

// Projects with their own /projects/[slug] page. Drives generateStaticParams,
// the sitemap and the homepage case study links so they can't drift.
export const projectPages = projects.filter((p) => p.indexable && p.slug && p.page);

export function getProjectBySlug(slug) {
  return projectPages.find((p) => p.slug === slug);
}

// Screenshots shown on a project's own page. `hideCaseStudyImages` hides them
// there (and from its OG image / JSON-LD) while the homepage keeps `images`.
export function getCaseStudyImages(project) {
  return project.hideCaseStudyImages ? [] : project.images ?? [];
}

export function hasProjectPage(slug) {
  return projectPages.some((p) => p.slug === slug);
}

// The next `count` project pages after this one (wrapping around), so every
// page gets a different set of related links.
export function getRelatedProjects(slug, count = 3) {
  const i = projectPages.findIndex((p) => p.slug === slug);
  return Array.from({ length: Math.min(count, projectPages.length - 1) }, (_, k) =>
    projectPages[(i + 1 + k) % projectPages.length]
  );
}
