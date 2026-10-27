"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, X } from "lucide-react";
import CaseStudy from "@/components/projects/CaseStudy";

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

// Rendered through a portal: section wrappers animate `transform`, which would
// otherwise trap a `position: fixed` dialog inside them.
export default function CaseStudyModal({ project, number, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lenis = useLenis();
  const titleId = `case-study-${project.slug}-title`;

  // Scroll lock: stop Lenis and the native page scroll while open.
  useEffect(() => {
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      lenis?.start();
    };
  }, [lenis]);

  // Move focus in, trap Tab inside, close on Escape, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-neutral-800 bg-neutral-900/95">
          <Link
            href={project.links.caseStudy}
            className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Open full page
            <ArrowUpRight aria-hidden="true" size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X aria-hidden="true" size={20} />
            <span className="sr-only">Close case study</span>
          </button>
        </div>

        <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-5 sm:px-8 py-8">
          <CaseStudy project={project} variant="modal" titleId={titleId} number={number} />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
