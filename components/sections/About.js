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

        <p className="max-w-3xl text-lg sm:text-xl text-neutral-300 leading-relaxed">
          I&apos;m a Computer Science student at Deakin University, majoring in Data Science. I build data products on
          Melbourne&apos;s own open data, from CBD foot traffic to public transport and housing. I&apos;m focused on
          growing as a software engineer and data scientist.
        </p>
      </motion.div>
    </section>
  );
}
