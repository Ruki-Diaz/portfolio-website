"use client";

import { motion } from "framer-motion";
import { ChartLine, Code2, Rocket } from "lucide-react";

// Phrases in the copy below are wrapped in <Em> for a subtle emphasis.
function Em({ children }) {
  return <span className="font-medium text-neutral-100">{children}</span>;
}

const interests = [
  {
    title: "Data Science",
    description: "Turning messy real-world data into forecasts and insights people can act on.",
    icon: ChartLine,
    accent: "text-blue-400 group-hover:border-blue-500/40 group-hover:shadow-[0_0_18px_rgba(96,165,250,0.3)]",
  },
  {
    title: "Software Engineering",
    description: "Building reliable, maintainable full-stack products, from pipelines to polished UIs.",
    icon: Code2,
    accent: "text-emerald-400 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_18px_rgba(52,211,153,0.3)]",
  },
  {
    title: "Tech Entrepreneurship",
    description: "Spotting gaps, testing ideas fast and building first versions of products and businesses.",
    icon: Rocket,
    accent: "text-purple-400 group-hover:border-purple-500/40 group-hover:shadow-[0_0_18px_rgba(192,132,252,0.3)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <div className="max-w-[65ch] space-y-6 text-base sm:text-lg text-neutral-400 leading-relaxed sm:leading-8">
          <p>
            I&apos;m a final-year Computer Science student at Deakin, majoring in Data Science, and I like work that
            ends in something people can actually use. That&apos;s why I build <Em>end to end</Em>: from cleaning messy
            open data and training forecasting models to shipping the web app on top of it.
          </p>
          <p>
            Most of my projects start with a real Melbourne question, like how busy the CBD will be tomorrow or how rain
            changes transport demand, and finish as a <Em>live product running on free tiers</Em>. At Chameleon I also
            led a data science team, setting review standards and mentoring teammates while staying the #1 contributor
            in the repository.
          </p>
          <p>
            I&apos;m looking for graduate and early-career roles in data science and software engineering, where I can
            own problems from data to deployment. Outside of that, I&apos;m drawn to{" "}
            <Em>startups and entrepreneurship</Em>: I enjoy spotting a gap, testing it quickly and building the first
            version myself. Long term, I want to build products and businesses of my own.
          </p>
        </div>

        <h3 className="mt-16 mb-6 text-xl font-semibold text-white">Core Interests</h3>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {interests.map(({ title, description, icon: Icon, accent }) => (
            <motion.li
              key={title}
              variants={itemVariants}
              className="group flex flex-col gap-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:-translate-y-1 hover:bg-neutral-800/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-neutral-950 border border-neutral-800 transition-all duration-300 ${accent}`}
              >
                <Icon aria-hidden="true" size={18} />
              </span>
              <div>
                <h4 className="text-white font-semibold text-lg">{title}</h4>
                <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">{description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
