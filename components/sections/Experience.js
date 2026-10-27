"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const workData = [
  {
    title: "Data Science Team Lead",
    organization: "Chameleon - Smarter World Melbourne",
    date: "Jul 2026 – Oct 2026",
    description: [
      "Led Data Science delivery, building a centralised work allocation and tracking process that made ownership, workload and progress visible across the team.",
      "Built the first reference implementation of the team's technical standards, used to guide consistent delivery across future Data Science work.",
      "Led technical reviews across code, analytical notebooks, data visualisations and documentation, driving quality improvements before release.",
      "Mentored team members on Git/GitHub, pull request workflows, code quality and troubleshooting.",
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
      "Built pipelines to clean, integrate and transform transport, weather and event datasets, then used EDA and visualisation to surface actionable patterns.",
      "Delivered the reviewed solution through Git/GitHub to MOP's READY TO PUBLISH repository.",
    ],
    tech: ["Python", "Pandas", "Data Pipelines", "Data Visualisation", "Git", "GitHub"],
  },
  {
    title: "Software Developer Intern (Data & AI)",
    organization: "Irys Group",
    date: "Mar 2026 – May 2026",
    description: [
      "Designed and developed web-based, data-driven solutions to improve internal inventory tracking and operational efficiency.",
      "Translated business requirements into technical specifications.",
      "Contributed to software initiatives involving data and AI-focused problem solving.",
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

const otherExperience = [
  {
    title: "Fresh Convenience Sorting Team Member (part-time)",
    organization: "Woolworths Group, Melbourne",
    date: "Jun 2025 – Present",
  },
];

// Shared vertical timeline entry used by Experience and Education.
export function TimelineItem({ item, index, children }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative pl-8 sm:pl-12"
    >
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-8 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-neutral-700 group-hover:border-blue-400 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.7)] transition-all duration-300"
      />

      <div className="relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 group-hover:border-neutral-700 group-hover:bg-neutral-900/70 group-hover:-translate-y-0.5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
          <div>
            <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
            <p className="mt-1 font-medium text-blue-400">{item.organization}</p>
          </div>
          <p className="shrink-0 self-start text-sm font-medium px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 whitespace-nowrap">
            {item.date}
          </p>
        </div>

        {children}

        {item.tech && (
          <ul className="flex flex-wrap gap-2 mt-6" aria-label="Tools used">
            {item.tech.map((tech) => (
              <li
                key={tech}
                className="px-2.5 py-1 bg-neutral-950 text-blue-400 text-xs font-medium rounded-md border border-neutral-800 group-hover:border-blue-500/20 transition-colors"
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

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 py-24 px-6 sm:px-12 max-w-6xl mx-auto w-full border-t border-neutral-800">
      <SectionHeading id="experience-heading" eyebrow="Where I've worked">Experience</SectionHeading>

      <ol className="relative max-w-4xl ml-2 sm:ml-3 border-l border-neutral-800 space-y-8">
        {workData.map((item, index) => (
          <TimelineItem key={`${item.organization}-${item.title}`} item={item} index={index}>
            <ul className="mt-5 space-y-2.5 text-neutral-300 leading-relaxed">
              {item.description.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </ol>

      <div className="max-w-4xl mt-10 ml-2 sm:ml-3 pl-8 sm:pl-12">
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">Other experience</h3>
        <ul className="space-y-2">
          {otherExperience.map((item) => (
            <li key={item.title} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-neutral-400">
              <span className="font-medium text-neutral-200">{item.title}</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>{item.organization}</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
