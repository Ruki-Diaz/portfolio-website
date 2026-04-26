"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";


const projectsData = [
  {
    title: "Invoice Management System",
    description: "A comprehensive web application to manage invoices, clients, and billing cycles securely.",
    tech: ["Flask", "Supabase", "Python", "Tailwind CSS"],
  },
  {
    title: "Data Analysis Project",
    description: "An exploratory data analysis tool built to extract insights from large datasets using modern data science libraries.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
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
