"use client";

import { motion } from "framer-motion";

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

        <div className="grid md:grid-cols-2 gap-12 text-neutral-300 text-lg leading-relaxed">
          <div className="space-y-6">
            <p>
              I am a Computer Science undergraduate at Deakin University, majoring in Data Science, with a strong passion for building real-world applications.
            </p>
            <p>
              I specialize in developing data-driven systems, web applications, and scalable solutions that solve practical problems. My experience spans software development, data analysis, and backend engineering, where I enjoy translating business needs into efficient technical solutions.
            </p>
            <p>
              I am highly motivated to grow into a software engineer and data scientist, with long-term ambitions of building impactful tech products and businesses.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Core Interests</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <span className="text-white font-medium">Software Engineering</span>
                  <p className="text-sm text-neutral-400 mt-1">Building scalable and maintainable applications using modern frameworks.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <span className="text-white font-medium">Artificial Intelligence & Data</span>
                  <p className="text-sm text-neutral-400 mt-1">Applying machine learning models and data analytics to solve real problems.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <div>
                  <span className="text-white font-medium">Tech Entrepreneurship</span>
                  <p className="text-sm text-neutral-400 mt-1">Turning innovative ideas into viable startups and tech products.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
