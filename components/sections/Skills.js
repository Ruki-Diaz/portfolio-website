"use client";

import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Programming",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "C#", "Java", "C++"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS"],
  },
  {
    category: "Backend",
    skills: ["Flask", "FastAPI", "ASP.NET Core", "REST APIs", "GraphQL"],
  },
  {
    category: "Data / AI",
    skills: ["Data Analysis", "Data Cleaning", "EDA", "Feature Engineering", "Machine Learning", "Scikit-learn", "TensorFlow", "PyTorch", "Statistical Analysis"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQL Server", "SQLite"],
  },
  {
    category: "Tools",
    skills: ["Git", "Power BI", "Tableau", "Excel", "Jenkins", "GitHub Actions", "CI/CD", "Bash", "PowerShell"],
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
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
          <h2 className="text-3xl md:text-4xl font-bold text-white">Skills & Technologies</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {skillsData.map((group, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-800/50 hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-white font-semibold mb-4 text-lg">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
