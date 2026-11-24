"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, X } from "lucide-react";
import { FaExternalLinkAlt, FaFilePdf, FaGithub } from "react-icons/fa";
import GlassFolder from "@/components/ui/glass-folder-cards";
import { buildMoreProjectFolders } from "@/lib/moreProjectFolders";

// GlassFolder's design size, and the size it is drawn at on phones.
const DESKTOP_WIDTH = 340;
const PHONE_WIDTH = 300;
// The folder's box is 340 × 326 at full size (the stage plus room above it
// for the files to rise into), and scales with the width.
const ASPECT = "340 / 326";
const EASE = [0.16, 1, 0.3, 1];
// GlassFolder's file elements: one button (or link) per sheet, in file order.
const FILE_SELECTOR = '[role="listitem"] > button, [role="listitem"] > a';

const linkClass =
  "inline-flex items-center gap-2 rounded-sm text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** Case study, live demo, code and PDF links: only the ones the project has. */
function ProjectLinks({ file, className = "" }) {
  const { project, caseStudy } = file;
  if (!caseStudy && !project.demo && !project.github && !project.pdf) return null;
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {caseStudy && (
        <li>
          <Link href={caseStudy} className={`${linkClass} font-semibold group/link`}>
            Case Study
            <span className="sr-only">: {project.title}</span>
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </li>
      )}
      {project.demo && (
        <li>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
            Live Demo{NEW_TAB}
          </a>
        </li>
      )}
      {project.github && (
        <li>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <FaGithub aria-hidden="true" className="text-base" />
            View Code{NEW_TAB}
          </a>
        </li>
      )}
      {project.pdf && (
        <li>
          <a href={project.pdf} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <FaFilePdf aria-hidden="true" className="text-base" />
            View PDF Report{NEW_TAB}
          </a>
        </li>
      )}
    </ul>
  );
}

/**
 * Hands GlassFolder a pixel width. The wrapper's size is pure CSS (300 wide on
 * phones, 340 from md, never wider than its column, fixed aspect ratio), so
 * the page never moves when the measured width arrives after hydration.
 */
function FolderFrame({ frameRef, children }) {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(PHONE_WIDTH);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width);
      if (next > 0) setWidth(Math.min(DESKTOP_WIDTH, next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={(el) => {
        boxRef.current = el;
        frameRef(el);
      }}
      className="relative w-full max-w-[300px] md:max-w-[340px]"
      style={{ aspectRatio: ASPECT }}
    >
      {children(width)}
    </div>
  );
}

/** The expanded project: dark glass, under its folder. */
function DetailPanel({ file, folderLabel, onClose }) {
  const { project } = file;
  const headingId = useId();
  const headingRef = useRef(null);

  // Focus the heading when the panel opens and whenever it swaps project.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [file.key]);

  return (
    <section
      aria-labelledby={headingId}
      className="relative rounded-2xl border border-white/10 bg-neutral-950/80 p-6 sm:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >

      <motion.div
        key={file.key}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <p className="mb-2 pr-12 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">{folderLabel}</p>
        <h4
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className="pr-12 text-xl font-bold leading-snug text-white focus:outline-none"
        >
          {project.title}
        </h4>
        <p className="mt-4 leading-relaxed text-neutral-300">{project.description}</p>

        {project.tech?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <ProjectLinks file={file} className="mt-6 border-t border-white/10 pt-5" />
      </motion.div>

      {/* After the content in tab order; drawn top-right. */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <X size={18} aria-hidden="true" />
        <span className="sr-only">Close {project.title} details</span>
      </button>
    </section>
  );
}

/** Animates its height to fit its content, including when the content swaps. */
function AutoHeight({ reduce, onSettled, children }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      className="w-full overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={reduce ? { duration: 0 } : { height: { duration: 0.38, ease: EASE }, opacity: { duration: 0.25 } }}
      onAnimationComplete={(def) => {
        if (def && typeof def === "object" && def.height !== 0 && height > 0) onSettled?.();
      }}
    >
      <div ref={innerRef} className="pt-6">
        {children}
      </div>
    </motion.div>
  );
}

export default function MoreProjectFolders({ projects }) {
  const [folders] = useState(() => buildMoreProjectFolders(projects));
  const [openFolders, setOpenFolders] = useState({});
  const [active, setActive] = useState(null); // { folderId, index }
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const activeRef = useRef(active);
  const frames = useRef({});
  const panels = useRef({});
  const pointerDown = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // GlassFolder closes itself on any pointerdown outside it. While a project
  // is expanded the panel has its own close button, so presses on the panel,
  // or a touch to scroll the page, must not collapse it. The flag is up only
  // while a pointerdown is being dispatched.
  useEffect(() => {
    const down = () => (pointerDown.current = true);
    const done = () => (pointerDown.current = false);
    document.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerdown", done);
    return () => {
      document.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerdown", done);
    };
  }, []);

  const fileButton = (folderId, index) => frames.current[folderId]?.querySelectorAll(FILE_SELECTOR)[index] ?? null;

  // Sheets show a short name; screen readers get the full title. GlassFolder
  // has no per-file label prop, so the label is set on its file buttons here.
  // React never manages aria-label on them, so it survives re-renders.
  useEffect(() => {
    for (const folder of folders) {
      const buttons = frames.current[folder.id]?.querySelectorAll(FILE_SELECTOR) ?? [];
      folder.files.forEach((file, i) => {
        buttons[i]?.setAttribute("aria-label", file.meta ? `${file.project.title}, ${file.meta}` : file.project.title);
      });
    }
  }, [folders]);

  const closePanel = useCallback((returnFocus) => {
    const current = activeRef.current;
    if (!current) return;
    if (returnFocus) fileButton(current.folderId, current.index)?.focus();
    setActive(null);
  }, []);

  // Esc closes the expanded project and returns focus to its file. It runs
  // in the capture phase so the folder's own Esc (close the whole folder)
  // only fires on the next press.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      closePanel(true);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, closePanel]);

  const onOpenChange = (folderId) => (next) => {
    const expandedHere = activeRef.current?.folderId === folderId;
    if (!next && expandedHere && pointerDown.current) return;
    setOpenFolders((s) => ({ ...s, [folderId]: next }));
    if (!next && expandedHere) setActive(null);
  };

  const onFileSelect = (folderId) => (_file, index) => {
    setOpenFolders({ [folderId]: true });
    setActive({ folderId, index });
  };

  // Once the panel has opened, bring it into view if it landed off-screen.
  const reveal = (folderId) => {
    const el = panels.current[folderId];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = 96; // clear of the fixed header
    const bottom = window.innerHeight - (window.matchMedia("(min-width: 48rem)").matches ? 24 : 112);
    let delta = 0;
    if (rect.top < top) delta = rect.top - top;
    else if (rect.bottom > bottom) delta = Math.min(rect.bottom - bottom, rect.top - top);
    if (Math.abs(delta) < 4) return;
    if (lenis) lenis.scrollTo(window.scrollY + delta, { immediate: !!reduce, duration: 0.8 });
    else window.scrollBy({ top: delta, behavior: reduce ? "auto" : "smooth" });
  };

  if (folders.length === 0) return null;

  return (
    <div className="relative">
      <p className="mb-10 text-sm text-neutral-400">Open a folder, then choose a project to see its details.</p>

      <div className="grid grid-cols-1 items-start gap-x-8 gap-y-16 md:grid-cols-2">
        {folders.map((folder, i) => {
          const file = active?.folderId === folder.id ? folder.files[active.index] : null;
          return (
            <div key={folder.id} className="flex min-w-0 flex-col items-center">
              <FolderFrame frameRef={(el) => (frames.current[folder.id] = el)}>
                {(width) => (
                  <GlassFolder
                    label={folder.label}
                    tone="dark"
                    action="none"
                    art={folder.art}
                    seed={7 + i * 11}
                    files={folder.files.map(({ name, meta, art }) => ({ name, meta, art }))}
                    width={width}
                    appearDelay={i * 140}
                    open={!!openFolders[folder.id]}
                    onOpenChange={onOpenChange(folder.id)}
                    onFileSelect={onFileSelect(folder.id)}
                  />
                )}
              </FolderFrame>

              <div className="w-full" ref={(el) => (panels.current[folder.id] = el)}>
                <AnimatePresence initial={false}>
                  {file && (
                    <AutoHeight key="panel" reduce={reduce} onSettled={() => reveal(folder.id)}>
                      <DetailPanel file={file} folderLabel={folder.label} onClose={() => closePanel(true)} />
                    </AutoHeight>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Every project and link without opening a folder. Hidden until a link
          in it takes keyboard focus, then shown over the folders so nothing
          receives focus while invisible. */}
      <nav
        aria-label="All more projects"
        className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:inset-x-0 focus-within:top-0 focus-within:z-30 focus-within:rounded-2xl focus-within:border focus-within:border-white/10 focus-within:bg-neutral-950/95 focus-within:p-6 focus-within:backdrop-blur-xl"
      >
        <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">All more projects</h4>
        <ul className="space-y-5">
          {folders.flatMap((folder) =>
            folder.files.map((file) => (
              <li key={file.key}>
                <p className="font-semibold text-white">
                  {file.project.title}
                  <span className="text-neutral-400"> · {folder.label}</span>
                </p>
                <ProjectLinks file={file} className="mt-2" />
              </li>
            ))
          )}
        </ul>
      </nav>
    </div>
  );
}
