// Shared heading for homepage sections so every section uses the same type
// scale and spacing.
export default function SectionHeading({ id, eyebrow, children }) {
  return (
    <div className="mb-12 md:mb-16">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {eyebrow}
        </p>
      )}
      <div className="flex items-center gap-6">
        <h2 id={id} className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          {children}
        </h2>
        <div aria-hidden="true" className="h-px bg-gradient-to-r from-neutral-700 to-transparent flex-1" />
      </div>
    </div>
  );
}
