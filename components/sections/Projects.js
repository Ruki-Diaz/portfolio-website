"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaFilePdf, FaExpand, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, hasProjectPage } from "@/data/projects";

function ProjectCarousel({ image, images, title }) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = images || (image ? [image] : []);
  if (list.length === 0) return null;

  const getImageData = (item, idx) => {
    if (typeof item === "string") {
      return { src: item, alt: `${title} screenshot ${idx + 1}` };
    }
    // Very wide screenshots are fitted rather than cropped to the card's frame.
    const isWide = item.width && item.height && item.width / item.height > 2.4;
    return { src: item.src, alt: item.alt || `${title} screenshot ${idx + 1}`, isWide };
  };

  const nextSlide = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrent((prev) => (prev + 1) % list.length);
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrent((prev) => (prev - 1 + list.length) % list.length);
  };

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="relative w-full h-52 sm:h-60 mb-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 group/carousel cursor-zoom-in"
      >
        <div className="relative w-full h-full">
          {list.map((item, idx) => {
            const { src, alt, isWide } = getImageData(item, idx);
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1152px) 448px, (min-width: 768px) calc(50vw - 112px), calc(100vw - 112px)"
                  className={isWide ? "object-contain" : "object-cover object-top"}
                />
              </div>
            );
          })}
        </div>

        {/* Subtle expand indicator badge on hover */}
        <div className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-neutral-950/70 text-white/80 border border-neutral-700/50 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none text-xs flex items-center gap-1">
          <FaExpand className="text-[10px]" />
        </div>

        {list.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-neutral-900/80 text-white border border-neutral-700/50 hover:bg-neutral-800 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-neutral-900/80 text-white border border-neutral-700/50 hover:bg-neutral-800 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </>
        )}

        {list.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {list.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrent(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === current ? "bg-blue-500 w-3" : "bg-neutral-500 hover:bg-neutral-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for high-res screenshot view */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4 px-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-semibold text-base sm:text-lg">{title}</h4>
                  {list.length > 1 && (
                    <span className="text-xs text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {current + 1} / {list.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  aria-label="Close image preview"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              <div className="relative w-full h-[50vh] sm:h-[65vh] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                <Image
                  src={getImageData(list[current], current).src}
                  alt={getImageData(list[current], current).alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1088px) 976px, 100vw"
                />

                {list.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-neutral-900/80 text-white border border-neutral-700 hover:bg-neutral-800 transition-all hover:scale-105"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-neutral-900/80 text-white border border-neutral-700 hover:bg-neutral-800 transition-all hover:scale-105"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </>
                )}
              </div>

              {list.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {list.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`h-2 rounded-full transition-all ${idx === current ? "bg-blue-500 w-6" : "bg-neutral-700 hover:bg-neutral-600 w-2"
                        }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
          <div className="h-px bg-neutral-800 flex-1 ml-4" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => {
            const caseStudy = hasProjectPage(project.slug) ? `/projects/${project.slug}` : null;
            return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
              className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 overflow-hidden hover:bg-neutral-800/80 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/15 group-hover:to-purple-500/15 transition-all duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <ProjectCarousel
                  image={project.image}
                  images={project.images}
                  title={project.title}
                />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {caseStudy ? (
                    <Link href={caseStudy} className="hover:text-blue-300 transition-colors">
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-neutral-400 mb-6 flex-grow">{project.description}</p>

                {project.stats && (
                  <div className="grid grid-cols-2 gap-2 mb-6 p-3 bg-neutral-950/70 rounded-xl border border-neutral-800/80">
                    {project.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="font-mono text-[11px] text-neutral-300">{stat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2.5 py-1 bg-neutral-950 text-blue-400 text-xs font-medium rounded-md border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(caseStudy || project.github || project.demo || project.pdf || project.report) && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-800/50 mt-auto">
                    {caseStudy && (
                      <Link
                        href={caseStudy}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                        aria-label={`Read the ${project.title} case study`}
                      >
                        <span>Case Study</span>
                        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors group/link"
                      >
                        <FaExternalLinkAlt className="text-xs transition-transform group-hover/link:-translate-y-0.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors group/link"
                      >
                        <FaGithub className="text-base transition-transform group-hover/link:-translate-y-0.5" />
                        <span>View Code</span>
                      </a>
                    )}
                    {project.report && (
                      <a
                        href={project.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors group/link"
                      >
                        <FaExternalLinkAlt className="text-xs transition-transform group-hover/link:-translate-y-0.5" />
                        <span>Model Report</span>
                      </a>
                    )}
                    {project.pdf && (
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors group/link"
                      >
                        <FaFilePdf className="text-base transition-transform group-hover/link:-translate-y-0.5" />
                        <span>View PDF Report</span>
                      </a>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Global GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/Ruki-Diaz"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaGithub className="relative z-10 text-xl" />
            <span className="relative z-10">View All Projects on GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
