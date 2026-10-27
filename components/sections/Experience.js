"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const workData = [
  {
    title: "Data Science Team Lead",
    organization: "Chameleon - Smarter World Melbourne",
    date: "Jul 2026 – Oct 2026",
    description: [
      "Led Data Science delivery, building a centralised work allocation and tracking process that made ownership, workload and progress visible across the team.",
      "Built the first reference implementation of the team's technical standards, used to guide consistent delivery across future Data Science work.",
      "Led technical reviews across code, analytical notebooks, data visualisations and documentation, driving quality improvements before release.",
      "Mentored team members on Git/GitHub, pull request workflows, code quality and technical troubleshooting.",
      "Ranked as the #1 repository contributor with 64 commits while leading the team.",
    ],
    tech: ["Python", "Jupyter", "Pandas", "Data Visualisation", "Git", "GitHub", "Microsoft Planner", "Excel"],
  },
  {
    title: "Data Scientist / Data Science Project Contributor",
    organization: "Chameleon - Smarter World",
    date: "Mar 2026 – Jun 2026",
    description: [
      "Owned a transport analytics use case for the Melbourne Open Playground (MOP) project, examining how weather conditions affect public transport activity.",
      "Built and maintained data pipelines to clean, integrate and transform transport, weather and event datasets.",
      "Conducted exploratory analysis and data visualisation to uncover patterns and actionable insights.",
      "Managed development through Git/GitHub reviews and delivered the solution to MOP's READY TO PUBLISH repository.",
    ],
    tech: ["Python", "Pandas", "Data Science", "Data Pipelines", "Data Visualisation", "Git", "GitHub"],
  },
  {
    title: "Software Developer Intern (Data & AI)",
    organization: "Irys Group",
    date: "Mar 2026 – May 2026",
    description: [
      "Designed and developed web-based, data-driven solutions to improve internal inventory tracking and operational efficiency.",
      "Translated business requirements into technical specifications.",
      "Contributed to software development initiatives involving data and AI-focused problem solving.",
    ],
    tech: ["Python", "Data Science", "AI", "Web Development"],
  },
  {
    title: "IT Support & Inventory Specialist",
    organization: "Irys Middle East LLC",
    date: "Sep 2023 – Feb 2025",
    description: [
      "Resolved 50+ technical issues monthly and configured systems across 100+ endpoints.",
      "Delivered training sessions for 20+ staff.",
      "Improved system performance by 30%.",
    ],
    tech: ["IT Support", "Systems Administration", "Inventory Management"],
  },
  {
    title: "Web Developer Intern",
    organization: "RCA Technology",
    date: "Feb 2023 – Aug 2023",
    description: [
      "Developed web features and improved performance by 20%.",
      "Worked in a team to deliver projects on time.",
    ],
    tech: ["Web Development", "Frontend", "JavaScript"],
  },
];

// Shown as a single line under the main timeline.
const otherExperience = [
  {
    title: "Fresh Convenience Sorting Team Member (Part-time)",
    organization: "Woolworths Group, Melbourne",
    date: "Jun 2025 – Present",
  },
];

const educationData = [
  {
    title: "Bachelor of Computer Science (Data Science Major)",
    organization: "Deakin University",
    date: "Jul 2024 – Feb 2027",
    highlights: ["Distinction average"],
    description: "Pursuing a Bachelor of Computer Science with a major in Data Science, focusing on software engineering, artificial intelligence, and modern data-driven application development.",
    tech: ["Data Science", "Software Engineering", "Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "Diploma in Information Technology",
    organization: "ANC Education, Colombo, Sri Lanka",
    date: "Sep 2022 – Sep 2023",
    highlights: ["Program score 83 / 100"],
    description: "Completed a diploma covering programming, databases, software development, web design and computer architecture, with High Distinction in 8 of 10 courses.",
    tech: ["Information Technology", "Databases", "Software Development", "Computer Networks"],
  },
];

const THEMES = {
  work: {
    icon: Briefcase,
    text: "text-emerald-400",
    node: "group-hover:border-emerald-400 group-hover:shadow-[0_0_14px_rgba(52,211,153,0.6)]",
    card: "group-hover:border-emerald-500/30",
    tag: "text-emerald-400 group-hover:border-emerald-500/30",
    bullet: "from-emerald-400 to-teal-500",
  },
  education: {
    icon: GraduationCap,
    text: "text-blue-400",
    node: "group-hover:border-blue-400 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.6)]",
    card: "group-hover:border-blue-500/30",
    tag: "text-blue-400 group-hover:border-blue-500/30",
    bullet: "from-blue-400 to-purple-500",
  },
};

function TimelineItem({ item, index, type }) {
  const theme = THEMES[type];

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative pl-8 sm:pl-12"
    >
      {/* Timeline node, centred on the line */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-8 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-neutral-700 transition-all duration-300 ${theme.node}`}
      />

      <div className={`relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-900/70 group-hover:-translate-y-0.5 ${theme.card}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">{item.title}</h4>
            <p className={`mt-1 font-medium ${theme.text}`}>{item.organization}</p>
          </div>
          <p className="shrink-0 self-start text-sm font-medium px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 whitespace-nowrap">
            {item.date}
          </p>
        </div>

        {item.highlights && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="px-3 py-1 rounded-full text-sm font-medium text-blue-200 bg-blue-500/10 border border-blue-500/25"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {Array.isArray(item.description) ? (
          <ul className="mt-5 space-y-2.5 text-neutral-300 leading-relaxed">
            {item.description.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden="true" className={`mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br shrink-0 ${theme.bullet}`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-neutral-300 leading-relaxed">{item.description}</p>
        )}

        {item.tech && (
          <ul className="flex flex-wrap gap-2 mt-6" aria-label="Tools used">
            {item.tech.map((tech) => (
              <li
                key={tech}
                className={`px-2.5 py-1 bg-neutral-950 text-xs font-medium rounded-md border border-neutral-800 transition-colors duration-300 ${theme.tag}`}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

function Timeline({ title, type, items }) {
  const Icon = THEMES[type].icon;

  return (
    <div>
      <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800">
          <Icon aria-hidden="true" size={18} className={THEMES[type].text} />
        </span>
        {title}
      </h3>
      <ol className="relative ml-2 sm:ml-3 border-l border-neutral-800 space-y-8">
        {items.map((item, index) => (
          <TimelineItem key={`${item.organization}-${item.title}`} item={item} index={index} type={type} />
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Experience & Education</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <div className="flex flex-col gap-20">
          <div>
            <Timeline title="Professional Experience" type="work" items={workData} />

            <div className="mt-8 ml-2 sm:ml-3 pl-8 sm:pl-12">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">Other experience</h4>
              <ul className="space-y-2">
                {otherExperience.map((item) => (
                  <li key={item.title} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-neutral-400">
                    <span className="font-medium text-neutral-200">{item.title}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{item.organization}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Timeline title="Academic Background" type="education" items={educationData} />
        </div>
      </motion.div>
    </section>
  );
}
