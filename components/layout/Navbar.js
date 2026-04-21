"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="text-2xl font-bold tracking-tighter text-white">
          RD<span className="text-blue-500">.</span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <Link key={link.name} href={link.href} className="relative group text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </div>

        {/* Right Social Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Ruki-Diaz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-white hover:bg-neutral-800 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <FaGithub className="text-lg" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rukshan-dias-a088921a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-white hover:bg-neutral-800 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <FaLinkedin className="text-lg" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
