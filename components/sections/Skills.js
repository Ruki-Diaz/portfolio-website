"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Server, Sparkles, Wrench } from "lucide-react";

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
    skills: ["Next.js", "React", "Flask", "FastAPI", "PostgreSQL"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub Actions", "Power BI", "Tableau", "Excel"],
  },
  {
    category: "AI-Assisted Development",
    icon: Sparkles,
    skills: ["Claude", "Claude Code", "Antigravity", "Codex", "Framer"],
    // Spans the remaining two columns so the grid stays balanced.
    wide: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map(({ category, icon: Icon, skills, wide }) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className={`group flex flex-col gap-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:-translate-y-1 hover:bg-neutral-800/50 hover:border-blue-500/30 transition-all duration-300 ${
                wide ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-blue-500/40 group-hover:shadow-[0_0_18px_rgba(96,165,250,0.3)] transition-all duration-300">
                  <Icon aria-hidden="true" size={18} className="text-blue-400" />
                </span>
                <h3 className="text-white font-semibold text-lg whitespace-nowrap">{category}</h3>
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
