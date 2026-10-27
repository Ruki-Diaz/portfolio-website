"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { featuredProjects, moreProjects, getProjectNumber } from "@/lib/projects";
import { CASE_STUDY_BLOCKS, TagList } from "@/components/projects/CaseStudy";
import CaseStudyModal from "@/components/projects/CaseStudyModal";
import ProjectLinks from "@/components/projects/ProjectLinks";
import StatChips, { FactChips } from "@/components/projects/StatChips";
import SectionHeading from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// A real link to the project's page (crawlable, works with cmd/ctrl-click and
// without JS); a plain click opens the case study modal instead.
function CaseStudyLink({ project, onOpen, className, children }) {
  const handleClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onOpen();
  };

  return (
    <a href={project.links.caseStudy} onClick={handleClick} aria-haspopup="dialog" className={className}>
      {children}
    </a>
  );
}

function FeaturedCard({ project, number, onOpen }) {
  return (
    <motion.li
      variants={cardVariants}
      className="group relative flex flex-col h-full bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.12)] focus-within:border-blue-500/30"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors duration-500 pointer-events-none" />

      <div className="relative flex flex-col gap-6 h-full">
        <header className="flex flex-col gap-3">
          <span className="font-mono text-sm text-blue-400">{number}</span>
          <h3 className="text-2xl sm:text-[1.7rem] font-bold leading-tight text-white">
            <CaseStudyLink project={project} onOpen={onOpen} className="rounded-md hover:text-blue-200 transition-colors">
              {project.title}
            </CaseStudyLink>
          </h3>
          <p className="text-sm text-neutral-400">{project.context}</p>
        </header>

        <TagList tags={project.tags} />

        <dl className="flex flex-col gap-4">
          {CASE_STUDY_BLOCKS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">{label}</dt>
              <dd className="text-neutral-300 leading-relaxed">{project[key]}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-col gap-6">
          {project.stats?.length ? <StatChips stats={project.stats} /> : <FactChips facts={project.facts} />}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 border-t border-neutral-800/70">
            <CaseStudyLink
              project={project}
              onOpen={onOpen}
              className="group/cs inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm font-semibold text-blue-300 hover:bg-blue-500/20 hover:text-white transition-colors"
            >
              Case Study
              <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover/cs:translate-x-0.5" />
              <span className="sr-only">: {project.title}</span>
            </CaseStudyLink>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function CompactCard({ project, onOpen }) {
  return (
    <li className="group relative flex flex-col gap-4 h-full bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-neutral-700 focus-within:border-blue-500/30">
      <h4 className="text-lg font-bold text-white leading-snug">{project.title}</h4>
      <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">{project.summary}</p>
      <TagList tags={project.tags} className="mt-auto" />
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-neutral-800/70">
        <CaseStudyLink
          project={project}
          onOpen={onOpen}
          className="group/cs inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          Case Study
          <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover/cs:translate-x-0.5" />
          <span className="sr-only">: {project.title}</span>
        </CaseStudyLink>
        <ProjectLinks project={project} />
      </div>
    </li>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 py-24 px-6 sm:px-12 max-w-6xl mx-auto w-full border-t border-neutral-800">
      <SectionHeading id="projects-heading" eyebrow="Selected work">Featured Projects</SectionHeading>

      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={listVariants}
        className="grid lg:grid-cols-2 gap-6 lg:gap-8"
      >
        {featuredProjects.map((project) => {
          const number = getProjectNumber(project);
          return (
            <FeaturedCard
              key={project.slug}
              project={project}
              number={number}
              onOpen={() => setOpen({ project, number })}
            />
          );
        })}
      </motion.ol>

      {moreProjects.length > 0 && (
        <div className="mt-16">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            aria-controls="more-projects"
            className="group flex w-full items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-left hover:border-neutral-700 hover:bg-neutral-900/70 transition-colors"
          >
            <span className="flex items-baseline gap-3">
              <span className="text-lg font-semibold text-white">More projects</span>
              <span className="text-sm text-neutral-400">{moreProjects.length} more</span>
            </span>
            <ChevronDown
              aria-hidden="true"
              size={20}
              className={`text-neutral-400 group-hover:text-white transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.div
                id="more-projects"
                key="more-projects"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="grid sm:grid-cols-2 gap-6 pt-6">
                  {moreProjects.map((project) => (
                    <CompactCard key={project.slug} project={project} onOpen={() => setOpen({ project })} />
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/Ruki-Diaz"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.03] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          <FaGithub aria-hidden="true" className="relative z-10 text-xl" />
          <span className="relative z-10">View All Projects on GitHub</span>
        </a>
      </div>

      <AnimatePresence>
        {open && <CaseStudyModal key={open.project.slug} project={open.project} number={open.number} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
