"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import GlassFolder from "@/components/ui/glass-folder-cards";
import { projectFolders } from "@/lib/projectFolders";

// Folder and file art in the site's one hue (docs/design-system.md §2): the
// hero palette's blues on the page ground. Dark enough that the white file
// names on the art stay readable.
const FOLDER_ART = {
  style: "streak",
  colors: ["#07090F", "#1B2A6B", "#2F4CFF", "#6F8CFF", "#E8EDFF", "#6F8CFF", "#1B2A6B"],
  scale: 0.7,
  warp: 1.5,
  angle: -0.45,
  gloss: 0.22,
  veins: 0,
};

const FILE_ART = {
  style: "marble",
  colors: ["#05070D", "#0B1226", "#1B2A6B", "#2F4CFF", "#6F8CFF", "#1B2A6B", "#07090F"],
  scale: 0.7,
  warp: 3.2,
  angle: -0.5,
  gloss: 0.4,
  veins: 0.35,
};

const FOLDER_SEEDS = [3, 7, 11];
const MAX_WIDTH = 340;
// Below the sm breakpoint (phones) folders stay at 300px, so an open fan of
// files never reaches the screen edge.
const MOBILE_WIDTH = 300;
const MIN_WIDTH = 240;

// GlassFolder takes a fixed pixel width, so each grid cell measures itself
// and hands the folder its own width (capped at the component's design size).
// 300 is the server-rendered width: it fits a 390px phone with 24px gutters.
function FolderCell({ children }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cell = el.clientWidth;
      const cap = window.matchMedia("(min-width: 40rem)").matches ? MAX_WIDTH : MOBILE_WIDTH;
      const next = Math.round(Math.max(MIN_WIDTH, Math.min(cap, cell)));
      setWidth((w) => (w === next ? w : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className="flex w-full max-w-[340px] justify-center">
      {children(width)}
    </li>
  );
}

// A sheet with no link (a project with no demo, code or page) takes the
// reader to that project's row in the list instead of doing nothing.
function goToRow(anchor) {
  const row = document.getElementById(anchor);
  if (!row) return;
  row.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  row.focus({ preventScroll: true });
}

function ExternalLink({ href, children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
      className="text-accent underline-offset-4 hover:underline rounded-sm"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function ProjectRow({ item }) {
  const { project, name, meta, links, anchor } = item;
  return (
    <li id={anchor} tabIndex={-1} className="scroll-mt-28 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 outline-none focus-visible:border-white/[0.14]">
      <h5 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-50 text-balance">
        {links.caseStudy ? (
          <Link href={links.caseStudy} className="rounded-sm underline-offset-4 hover:underline">
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h5>
      <p className="mt-1 text-sm text-zinc-400">{meta}</p>
      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-zinc-300 line-clamp-3">{project.description}</p>
      {(links.caseStudy || links.demo || links.code || links.pdf || links.report) && (
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {links.caseStudy && (
            <Link href={links.caseStudy} className="text-accent underline-offset-4 hover:underline rounded-sm" aria-label={`Case study: ${name}`}>
              Case study
            </Link>
          )}
          {links.demo && <ExternalLink href={links.demo} label={`Live demo: ${name}`}>Live demo</ExternalLink>}
          {links.code && <ExternalLink href={links.code} label={`Code: ${name}`}>Code</ExternalLink>}
          {links.report && <ExternalLink href={links.report} label={`Model report: ${name}`}>Model report</ExternalLink>}
          {links.pdf && <ExternalLink href={links.pdf} label={`PDF report: ${name}`}>PDF report</ExternalLink>}
        </p>
      )}
    </li>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
      <div className="flex items-center gap-4 mb-4">
        <h2 id="projects-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
          Projects
        </h2>
        <div className="h-px bg-white/[0.08] flex-1 ml-4" />
      </div>
      <p className="max-w-2xl text-base sm:text-lg text-zinc-400 text-pretty">
        Grouped by theme. Open a folder to see what&apos;s inside, or browse the full list below.
      </p>

      <ul className="folder-grid mt-24 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-end justify-items-center gap-x-10 gap-y-20">
        {projectFolders.map((group, i) => (
          <FolderCell key={group.id}>
            {(width) => (
              <GlassFolder
                label={group.label}
                meta={`${group.items.length} ${group.items.length === 1 ? "project" : "projects"}`}
                tone="dark"
                art={FOLDER_ART}
                seed={FOLDER_SEEDS[i % FOLDER_SEEDS.length]}
                action="none"
                width={width}
                appearDelay={i * 140}
                files={group.items.map((item) => ({
                  name: item.name,
                  meta: item.meta,
                  href: item.href,
                  art: item.art ? FILE_ART : undefined,
                }))}
                onFileSelect={(file, index) => {
                  if (!file.href) goToRow(group.items[index].anchor);
                }}
              />
            )}
          </FolderCell>
        ))}
      </ul>

      <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
        Hover to lean · Click to open
      </p>

      <div className="mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-50">All projects</h3>
          <div className="h-px bg-white/[0.08] flex-1 ml-4" />
        </div>
        <div className="flex flex-col gap-12">
          {projectFolders.map((group) => (
            <div key={group.id}>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">{group.label}</h4>
              <ul className="grid md:grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <ProjectRow key={item.anchor} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/Ruki-Diaz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="All projects on GitHub (opens in a new tab)"
          className="inline-flex h-12 items-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 font-semibold text-zinc-50 transition-colors duration-150 hover:bg-white/[0.07] hover:border-white/25"
        >
          <FaGithub aria-hidden="true" className="text-lg" />
          All projects on GitHub
        </a>
      </div>
    </section>
  );
}
