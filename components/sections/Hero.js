"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagneticEffect from "@/components/ui/MagneticEffect";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 px-6 sm:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-neutral-950 -z-20" />
      


      {/* Blurred Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse mix-blend-screen pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse mix-blend-screen pointer-events-none" style={{ animationDuration: '6s' }} />

      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16 z-10">
        
        {/* Left/Bottom: Text Content */}
        <motion.div 
          className="flex-1 flex flex-col items-start text-left z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          
          {/* Top Label */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-neutral-700 transition-all duration-300 cursor-default"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-neutral-300 text-sm font-medium">Open to opportunities & collaborations</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4"
          >
            Rukshan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dias.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-2xl sm:text-4xl font-semibold text-neutral-300 mb-6"
          >
            Aspiring Software Engineer <span className="text-neutral-600 font-light">|</span> Data Scientist
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-lg sm:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed"
          >
            I build data-driven applications, scalable systems, and modern web solutions. Passionate about turning ideas into real-world products using software development, data science, and clean architecture.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary Button */}
            <MagneticEffect>
              <Link
                href="#projects"
                className="group relative flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">View Projects</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticEffect>
            
            {/* Secondary Button */}
            <MagneticEffect>
              <Link
                href="#contact"
                className="flex items-center gap-2 px-8 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-medium rounded-full border border-neutral-700 hover:bg-neutral-800 transition-all hover:border-neutral-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <Mail size={18} className="text-neutral-400 group-hover:text-white transition-colors" />
                Contact Me
              </Link>
            </MagneticEffect>

            {/* Icon Button */}
            <MagneticEffect>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-neutral-900/80 backdrop-blur-md text-neutral-300 rounded-full border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-all hover:border-neutral-500 group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                aria-label="Download CV"
              >
                <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticEffect>
          </motion.div>
        </motion.div>

        {/* Right/Top: Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 relative"
        >
          {/* Animated floating effect container */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="relative"
          >
            {/* Floating Particles */}
            <motion.div 
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -top-10 -left-10 w-8 h-8 rounded-full border border-blue-500/30 bg-blue-500/10 blur-[1px]"
            />
            <motion.div 
              animate={{ y: [20, -20, 20], x: [10, -10, 10], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear", delay: 1 }}
              className="absolute -bottom-8 -right-12 w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/10 blur-[2px]"
            />
            <motion.div 
              animate={{ y: [-15, 15, -15], scale: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -right-8 w-4 h-4 rounded-full bg-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
            />

            {/* Outer Glowing Ring */}
            <div className="absolute inset-[-10px] sm:inset-[-20px] rounded-[2.5rem] bg-gradient-to-tr from-blue-500/40 to-purple-500/40 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
            
            {/* Decorative Gradient Border */}
            <div className="absolute inset-[-2px] sm:inset-[-4px] rounded-[2rem] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-80" />
            
            {/* Image Container */}
            <div className="relative w-64 h-80 sm:w-80 sm:h-[400px] md:w-96 md:h-[480px] rounded-3xl overflow-hidden border-4 border-neutral-950 bg-neutral-900 shadow-2xl z-10">
              <Image 
                src="/profilepic.jpg" 
                alt="Rukshan Dias" 
                fill 
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
