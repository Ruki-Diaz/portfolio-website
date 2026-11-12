// Building blocks shared by the long-form case study bodies (Snake-NN,
// Wumpus World). Keeping them in one place means every case study has the same
// section headings, tables, callouts and closing CTA.

import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";

export const BLUE = "#60a5fa"; // blue-400
export const PURPLE = "#a855f7"; // purple-500
export const INDIGO = "#818cf8"; // indigo-400

export function Section({ id, index, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-sm text-blue-400">{String(index).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

export function Dot({ className = "mt-2.5" }) {
  return <span className={`${className} w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0`} />;
}

export function Bullets({ items, className = "space-y-4" }) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Dot />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Lead({ label, children }) {
  return (
    <>
      <strong className="font-semibold text-white">{label}:</strong> {children}
    </>
  );
}

export function Panel({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm ${className}`}>{children}</div>
  );
}

export function Mono({ children }) {
  return <span className="font-mono text-cyan-300">{children}</span>;
}

export function Code({ children }) {
  return <code className="font-mono text-base text-cyan-300">{children}</code>;
}

// Key/value or multi-column table. Key/value tables wrap; wide ones pass a
// `minWidth` and scroll sideways on narrow screens. The wrapper is focusable
// so keyboard users can scroll it too.
export function DataTable({ label, columns, rows, minWidth = "", wrapHeaders = false }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <table className={`w-full text-left text-[15px] ${minWidth}`}>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-950/40">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className={`px-4 sm:px-5 py-3 align-bottom text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 ${wrapHeaders ? "" : "whitespace-nowrap"}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([head, ...cells]) => (
            <tr key={head} className="border-t border-neutral-800/70 first:border-t-0 hover:bg-neutral-800/30 transition-colors">
              <th scope="row" className="px-4 sm:px-5 py-3.5 align-top font-medium text-neutral-100 sm:whitespace-nowrap">
                {head}
              </th>
              {cells.map((cell, i) => (
                <td key={i} className="px-4 sm:px-5 py-3.5 align-top text-neutral-300 leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "On this page" jump links at the top of a case study body.
export function OnThisPage({ sections }) {
  return (
    <nav aria-label="On this page">
      <ol className="flex flex-wrap gap-2">
        {sections.map(([id, label], i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-blue-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span className="font-mono text-xs text-blue-400">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Small "Stack" panel: three label/value pairs.
export function StackPanel({ items }) {
  return (
    <Panel className="p-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">Stack</h3>
      <dl className="grid sm:grid-cols-3 gap-5 text-base">
        {items.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-400 mb-1">{k}</dt>
            <dd className="text-neutral-200 leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

// Two-column grid of titled cards (constraints, actions).
export function CardGrid({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3 text-base">
      {items.map(([k, v]) => (
        <li
          key={typeof k === "string" ? k : k.key}
          className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-900/80 transition-colors duration-300"
        >
          <span className="flex items-center gap-2.5 font-semibold text-white mb-1.5">
            <Dot className="" />
            {k}
          </span>
          <span className="text-neutral-400 leading-relaxed">{v}</span>
        </li>
      ))}
    </ul>
  );
}

// Amber callout for limitations and caveats.
export function Callout({ id, title = "Limitations", intro, items }) {
  return (
    <aside aria-labelledby={id} className="p-6 rounded-2xl bg-amber-400/[0.04] border border-amber-400/20 text-base">
      <h3 id={id} className="flex items-center gap-2.5 font-semibold text-amber-200 mb-4">
        <TriangleAlert size={18} aria-hidden="true" className="text-amber-300" />
        {title}
      </h3>
      {intro && <p className="text-neutral-300 leading-relaxed mb-4">{intro}</p>}
      <ul className="space-y-3 text-neutral-300 leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-300/80 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Side-by-side panels with an icon heading and a bullet list
// ("What I learned" / "What's next").
export function ListPanels({ panels }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 text-base">
      {panels.map(({ heading, icon: Icon, items }) => (
        <Panel key={heading} className="p-6 hover:border-blue-500/30 transition-colors duration-300">
          <h3 className="flex items-center gap-2.5 font-semibold text-white text-lg mb-4">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 text-blue-400">
              <Icon size={15} aria-hidden="true" />
            </span>
            {heading}
          </h3>
          <Bullets items={items} className="space-y-3 text-neutral-300 leading-relaxed" />
        </Panel>
      ))}
    </div>
  );
}

// Gradient-bordered strip showing the live demo's hostname next to the links.
export function LiveDemoStrip({ href, links }) {
  if (!href) return null;
  const host = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="relative rounded-2xl p-px bg-gradient-to-br from-blue-500/50 via-neutral-800 to-purple-500/40">
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-[calc(1rem-1px)] bg-neutral-950/90 overflow-hidden">
        <span className="absolute -top-16 -left-10 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-1">Live demo</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-lg text-white hover:text-blue-300 transition-colors break-all"
          >
            {host}
          </a>
        </div>
        <div className="relative">{links}</div>
      </div>
    </div>
  );
}

// Chart wrapper: title, optional legend, and a keyboard-scrollable SVG region.
export function ChartPanel({ title, subtitle, legend, label, children, footer }) {
  return (
    <Panel className="p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 mb-4 px-1">
        <div>
          <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-neutral-400 leading-snug">{subtitle}</p>}
        </div>
        {legend}
      </div>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        {children}
      </div>
      {footer}
    </Panel>
  );
}

export function ClosingCta({ title, text, links }) {
  return (
    <div className="relative p-8 sm:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm overflow-hidden text-center">
      <span className="absolute -top-24 left-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <span className="absolute -bottom-24 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">{title}</h2>
        <p className="text-neutral-400 mb-8">{text}</p>
        <div className="flex flex-col items-center gap-5">
          <div className="flex justify-center">{links}</div>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to projects
          </Link>
        </div>
      </div>
    </div>
  );
}
