"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedGridBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-neutral-950">
      {/* Animated Subtle Grid */}
      <motion.div 
        className="absolute inset-[-100%] opacity-[0.04]"
        animate={shouldReduceMotion ? {} : {
          y: [0, -50],
          x: [0, -50]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Large Glowing Orbs for Depth */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-purple-900/20 blur-[150px] mix-blend-screen"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Overlay gradient to fade out bottom edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />
    </div>
  );
}
