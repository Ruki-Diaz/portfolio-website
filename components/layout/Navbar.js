"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Order matches the homepage sections.
const NAV_LINKS = [
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Education", href: "/#education" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>

      <nav aria-label="Main" className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="rounded-md text-2xl font-bold tracking-tighter text-white">
          RD<span className="text-blue-500">.</span>
          <span className="sr-only"> Rukshan Dias, home</span>
        </Link>

        {/* Center Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="relative group rounded-sm text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Social Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/Ruki-Diaz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-white hover:bg-neutral-800 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <FaGithub aria-hidden="true" className="text-lg" />
            <span className="sr-only sm:not-sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rukshan-dias-a088921a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-white hover:bg-neutral-800 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <FaLinkedin aria-hidden="true" className="text-lg" />
            <span className="sr-only sm:not-sr-only">LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors"
          >
            {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-neutral-800 px-6"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="border-b border-neutral-900 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
