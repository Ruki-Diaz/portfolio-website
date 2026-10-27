import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";

// External links only; the Case Study link is rendered by the card itself
// because it opens the modal.
export function getProjectLinks(project) {
  const { demo, code, report } = project.links;
  const isPdf = report?.endsWith(".pdf");
  return [
    demo && { href: demo, label: "Live Demo", icon: FaExternalLinkAlt },
    code && { href: code, label: "View Code", icon: FaGithub },
    report && { href: report, label: isPdf ? "PDF Report" : "Model Report", icon: isPdf ? FaFilePdf : FaExternalLinkAlt },
  ].filter(Boolean);
}

// variant "inline": compact text links for cards. variant "buttons": pill buttons
// for the case study, with the first link as the primary action.
export default function ProjectLinks({ project, variant = "inline" }) {
  const links = getProjectLinks(project);
  if (links.length === 0) return null;

  if (variant === "inline") {
    return links.map(({ href, label, icon: Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-2 rounded-md text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors"
      >
        <Icon aria-hidden="true" className="text-xs transition-transform group-hover/link:-translate-y-0.5" />
        <span>{label}</span>
        <span className="sr-only">for {project.title} (opens in a new tab)</span>
      </a>
    ));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map(({ href, label, icon: Icon }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            i === 0
              ? "group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]"
              : "group inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900/80 text-white text-sm font-medium rounded-full border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 transition-all"
          }
        >
          {i === 0 && (
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <Icon aria-hidden="true" className={`relative z-10 text-xs ${i === 0 ? "" : "text-neutral-400 group-hover:text-white transition-colors"}`} />
          <span className="relative z-10">{label}</span>
          <ArrowUpRight aria-hidden="true" size={14} className="relative z-10 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
