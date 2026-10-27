import Image from "next/image";
import ProjectLinks from "@/components/projects/ProjectLinks";
import StatChips, { FactChips } from "@/components/projects/StatChips";

export const CASE_STUDY_BLOCKS = [
  { key: "problem", label: "The problem" },
  { key: "built", label: "What I built" },
  { key: "showed", label: "What it showed" },
];

export function TagList({ tags, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Tools and technologies">
      {tags.map((tag) => (
        <li
          key={tag}
          className="px-2.5 py-1 bg-neutral-950 text-blue-400 text-xs font-medium rounded-md border border-neutral-800"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Screenshot({ image, sizes, eager }) {
  // Small or very wide screenshots are fitted inside a 16:10 frame rather than
  // stretched or cropped.
  const fitted = image.width < 1200 || image.width / image.height > 2.4;
  return (
    <figure className="group">
      <div className="relative rounded-2xl p-px bg-gradient-to-br from-neutral-700/60 via-neutral-800 to-neutral-800 group-hover:from-blue-500/50 group-hover:to-purple-500/40 transition-colors duration-500">
        <div
          className={`relative rounded-[calc(1rem-1px)] overflow-hidden bg-neutral-950 ${fitted ? "aspect-[16/10]" : ""}`}
          style={fitted ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            className={`${fitted ? "object-contain p-3 sm:p-4" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
          />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-neutral-400 leading-relaxed">{image.alt}</figcaption>
    </figure>
  );
}

// The full case study, shared by the homepage modal and /projects/[slug].
// `variant="page"` renders the SEO headline as the <h1>; the modal uses the
// short title as an <h2> labelled by `titleId`.
export default function CaseStudy({ project, variant = "page", titleId, number }) {
  const isPage = variant === "page";
  const Heading = isPage ? "h1" : "h2";
  const BlockHeading = isPage ? "h2" : "h3";
  const images = project.images ?? [];
  const stats = [...(project.stats ?? []), ...(project.moreStats ?? [])];

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-6">
        <p className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-xs sm:text-sm font-medium text-neutral-300">
          <span aria-hidden="true" className="w-1.5 h-1.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          {number && <span className="font-mono text-blue-400">{number}</span>}
          {project.context}
        </p>

        <div className="flex flex-col gap-3">
          <Heading
            id={titleId}
            className={`font-bold tracking-tight text-white text-balance ${isPage ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" : "text-2xl sm:text-3xl leading-tight"}`}
          >
            {isPage ? project.headline ?? project.title : project.title}
          </Heading>
          {isPage && project.headline && (
            <p className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {project.title}
            </p>
          )}
        </div>

        <TagList tags={project.tags} />
        <ProjectLinks project={project} variant="buttons" />
      </header>

      {stats.length > 0 ? <StatChips stats={stats} size="lg" /> : <FactChips facts={project.facts} />}

      <div className="flex flex-col divide-y divide-neutral-800/80 border-y border-neutral-800/80">
        {CASE_STUDY_BLOCKS.map(({ key, label }, i) => (
          <section key={key} className="grid gap-2 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
            <BlockHeading className="flex items-baseline gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">
              <span aria-hidden="true" className="font-mono text-blue-400">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </BlockHeading>
            <p className={`text-neutral-200 leading-relaxed ${isPage ? "text-lg" : "text-base sm:text-lg"}`}>{project[key]}</p>
          </section>
        ))}
      </div>

      {images.length > 0 && (
        <section aria-label="Screenshots" className="flex flex-col gap-6">
          <BlockHeading className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">Screenshots</BlockHeading>
          <div className={`grid gap-8 ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
            {images.map((image, i) => (
              <Screenshot
                key={image.src}
                image={image}
                eager={isPage && i === 0}
                sizes={images.length > 1 ? "(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1200px) 1152px, 100vw"}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
