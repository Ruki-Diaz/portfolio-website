"use client";

import { motion } from "framer-motion";

// A plain wrapper (not a <section>): the sections it wraps carry their own
// landmarks and headings.
export default function SectionReveal({ children, className }) {
  return (
    <motion.div
      className={`w-full ${className ?? ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
