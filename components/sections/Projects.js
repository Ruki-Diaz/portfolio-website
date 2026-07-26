"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

function ProjectCarousel({ image, images, title }) {
  const [current, setCurrent] = useState(0);

  const list = images || (image ? [image] : []);
  if (list.length === 0) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % list.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <div className="relative w-full h-52 sm:h-60 mb-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 group/carousel">
      <div className="relative w-full h-full">
        {list.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`${title} screenshot ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
              priority={idx === 0}
            />
          </div>
        ))}
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
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === current ? "bg-blue-500 w-3" : "bg-neutral-500 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


const projectsData = [
  {
    title: "Invoice Management System",
    description: "Designed and developed a secure, data-driven web application during a software engineering internship to manage invoices, clients, and billing cycles. Translated business requirements into database schemas and technical specifications, successfully improving internal tracking and operational efficiency.",
    tech: ["Flask", "Supabase", "Python", "Tailwind CSS"],
    images: ["/invoice-dashboard.png", "/invoice-transactions.png", "/invoice-reports.png"],
  },
  {
    title: "Weather Impact on Public Transport",
    description: "Built an AI-assisted data science system that integrates Melbourne transport activity with BOM rainfall data. Developed data cleaning pipelines, performed EDA, and trained/fine-tuned ML models to predict congestion. Built a RAG-style LLM explanation layer to translate predictions into natural language insights.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "LLM Prompting", "RAG"],
  },
  {
    title: "Momentum Todo",
    description: "Momentum Todo is a simple and polished task management web app built with HTML, CSS, and JavaScript. It lets users add tasks, set priorities and due dates, mark tasks complete, filter and search through tasks, and keeps everything saved in the browser with localStorage.",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
  },
  {
    title: "Wheelchair Navigation System (AI)",
    description: "Developed an AI-based navigation system to optimize wheelchair-accessible routes using graph modelling and the A* search algorithm. The system incorporates terrain and accessibility constraints to prioritize safer paths over shortest distance. Implemented enhanced heuristics and visualized routes using an interactive map, demonstrating real-world application of intelligent pathfinding.",
    tech: ["Python", "A*", "Graph Modelling", "AI", "Pathfinding"],
  },
  {
    title: "Wumpus World AI Planning (PDDL)",
    description: "Built an automated planning system using PDDL to model and solve the Wumpus World problem. Identified and fixed logical issues in the domain, introduced constraint-based reasoning including sensing, and simulated intelligent agent behaviour. Evaluated multiple planning solvers to compare performance, efficiency, and stability in decision-making.",
    tech: ["PDDL", "AI Planning", "Problem Solving", "Constraint Reasoning", "Intelligent Agents"],
  },
];

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
          {projectsData.map((project, index) => (
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
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-neutral-400 mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2.5 py-1 bg-neutral-950 text-blue-400 text-xs font-medium rounded-md border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
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
