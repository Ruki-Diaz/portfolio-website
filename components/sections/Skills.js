"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Server, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const skillsData = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    category: "Data & ML",
    icon: BrainCircuit,
    skills: ["Pandas", "Scikit-learn", "LightGBM", "SHAP", "TensorFlow", "PyTorch"],
  },
  {
    category: "Web & Backend",
    icon: Server,
    skills: ["Next.js", "React", "Flask", "FastAPI", "Postgres"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub Actions", "Power BI", "Tableau", "Excel"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 py-24 px-6 sm:px-12 max-w-6xl mx-auto w-full border-t border-neutral-800">
      <SectionHeading id="skills-heading" eyebrow="Toolkit">Skills</SectionHeading>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skillsData.map(({ category, icon: Icon, skills }) => (
          <motion.li
            key={category}
            variants={itemVariants}
            className="group flex flex-col gap-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-neutral-900/80"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-blue-500/40 group-hover:shadow-[0_0_18px_rgba(96,165,250,0.35)] transition-all duration-300">
                <Icon aria-hidden="true" size={18} className="text-blue-400" />
              </span>
              <h3 className="text-lg font-semibold text-white">{category}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
