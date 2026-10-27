// Headline numbers for a project, rendered as a description list so screen
// readers pair each value with its label. Values never break mid-word; a chip
// that doesn't fit wraps onto its own row instead.
export default function StatChips({ stats, size = "md" }) {
  if (!stats?.length) return null;
  const large = size === "lg";

  return (
    <dl className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-[1_1_auto] flex-col-reverse justify-end rounded-xl bg-neutral-950/70 border border-neutral-800 transition-colors duration-300 hover:border-blue-500/30 ${large ? "min-w-[9rem] p-5" : "min-w-[7.5rem] p-4"}`}
        >
          <dt className="mt-1.5 text-xs leading-snug text-neutral-400">{stat.label}</dt>
          <dd
            className={`whitespace-nowrap font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Short factual chips for projects without a headline number.
export function FactChips({ facts }) {
  if (!facts?.length) return null;

  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Key facts">
      {facts.map((fact) => (
        <li
          key={fact}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-950/70 border border-neutral-800 text-sm font-medium text-neutral-200 transition-colors duration-300 hover:border-blue-500/30"
        >
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
          {fact}
        </li>
      ))}
    </ul>
  );
}
