import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import { projectPages, getProjectBySlug, getRelatedProjects, PAGE_SECTIONS } from "@/data/projects";
import { SITE, PERSON_ID, toJsonLd } from "@/lib/site";

const SECTION_TITLES = { problem: "Problem", data: "Data", method: "Method", results: "Results" };

// Only the slugs returned by generateStaticParams exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const { seoTitle, seoDescription } = project.page;
  const path = `/projects/${project.slug}`;
  const ogImage = project.images?.[0];

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      siteName: "Rukshan Dias",
      locale: "en_AU",
      url: path,
      title: `${seoTitle} | Rukshan Dias`,
      description: seoDescription,
      images: ogImage
        ? [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }]
        : ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} | Rukshan Dias`,
      description: seoDescription,
      images: [ogImage ? ogImage.src : "/opengraph-image"],
    },
  };
}

function buildJsonLd(project) {
  const url = `${SITE}/projects/${project.slug}`;
  const work = {
    "@type": project.page.schemaType,
    "@id": `${url}#project`,
    name: project.title,
    headline: project.page.h1,
    description: project.page.seoDescription,
    url,
    image: project.images?.map((img) => `${SITE}${img.src}`),
    keywords: project.tech.join(", "),
    inLanguage: "en-AU",
    author: { "@type": "Person", "@id": PERSON_ID, name: "Rukshan Dias", url: SITE },
  };

  if (project.page.schemaType === "SoftwareSourceCode") {
    if (project.github) work.codeRepository = project.github;
    if (project.tech.includes("Python")) work.programmingLanguage = "Python";
  }

  const sameAs = [project.demo, project.report].filter(Boolean);
  if (sameAs.length) work.sameAs = sameAs;

  return {
    "@context": "https://schema.org",
    "@graph": [
      work,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/#projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

function getProjectLinks(project) {
  return [
    project.demo && { href: project.demo, label: "Live Demo", icon: FaExternalLinkAlt, primary: true },
    project.github && { href: project.github, label: "View Code", icon: FaGithub },
    project.report && { href: project.report, label: "Model Report", icon: FaExternalLinkAlt },
    project.pdf && { href: project.pdf, label: "PDF Report", icon: FaFilePdf },
  ].filter(Boolean);
}

function ProjectLinks({ project, layout = "row" }) {
  const links = getProjectLinks(project);

  if (links.length === 0) return null;

  if (layout === "list") {
    return (
      <ul className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-sm font-medium text-neutral-300 hover:text-white hover:border-blue-500/40 hover:bg-neutral-900 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Icon className="text-neutral-500 group-hover:text-blue-400 transition-colors" />
                {label}
              </span>
              <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map(({ href, label, icon: Icon, primary }, i) =>
        primary || (!project.demo && i === 0) ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className="relative z-10 text-sm" />
            <span className="relative z-10">{label}</span>
          </a>
        ) : (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-neutral-900/80 backdrop-blur-md text-white font-medium rounded-full border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all"
          >
            <Icon className="text-sm text-neutral-400 group-hover:text-white transition-colors" />
            <span>{label}</span>
          </a>
        )
      )}
    </div>
  );
}

function Section({ index, title, items }) {
  const isList = items.length > 1;

  return (
    <section className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-sm text-blue-400">{String(index).padStart(2, "0")}</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {isList && items.every((item) => item.length <= 60) ? (
        // Short items (e.g. a feature list) read better as a compact grid than a tall list.
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-200 hover:border-blue-500/30 hover:bg-neutral-900/80 transition-colors duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : isList ? (
        <ul className="space-y-4 text-neutral-300 text-lg leading-relaxed">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral-300 text-lg leading-relaxed">{items[0]}</p>
      )}
    </section>
  );
}

function Screenshot({ image, sizes, className = "", eager = false, frameRatio }) {
  // Small source images get padding so they are not stretched past their native size;
  // everything else displays at its real aspect ratio, uncropped.
  const isSmall = image.width < 1200;
  return (
    <figure className={`group ${className}`}>
      <div className="relative rounded-2xl p-px bg-gradient-to-br from-neutral-700/60 via-neutral-800 to-neutral-800 group-hover:from-blue-500/50 group-hover:to-purple-500/40 transition-colors duration-500">
        <div
          className={`relative rounded-[calc(1rem-1px)] overflow-hidden bg-neutral-950 ${isSmall ? "aspect-[16/10] p-4 sm:p-6" : ""}`}
          style={isSmall ? undefined : { aspectRatio: frameRatio ?? `${image.width} / ${image.height}` }}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
              className={`${isSmall || frameRatio ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">{image.alt}</figcaption>
    </figure>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { page } = project;
  const [leadImage, ...galleryImages] = project.images ?? [];
  const related = getRelatedProjects(project.slug);
  const sections = PAGE_SECTIONS.filter((key) => page[key]?.length);
  const hasTech = project.tech?.length > 0;
  const hasLinks = getProjectLinks(project).length > 0;
  const hasSidebar = hasTech || hasLinks;
  // Gallery frames share the shape of the tallest screenshot so rows line up;
  // other screenshots are fitted inside it, never cropped.
  const tallest = galleryImages.reduce(
    (best, img) => (img.width && (!best || img.height / img.width > best.height / best.width) ? img : best),
    null
  );
  const galleryFrameRatio = tallest ? `${tallest.width} / ${tallest.height}` : undefined;
  // Odd counts use three columns so no screenshot is left alone on a row.
  const galleryLayout =
    galleryImages.length === 1
      ? { grid: "max-w-3xl mx-auto", sizes: "(min-width: 816px) 768px, 100vw" }
      : galleryImages.length % 2 === 1
        ? { grid: "md:grid-cols-3", sizes: "(min-width: 1200px) 365px, (min-width: 768px) 33vw, 100vw" }
        : { grid: "md:grid-cols-2", sizes: "(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw" };
  const relatedGrid =
    related.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : related.length === 2 ? "sm:grid-cols-2" : "max-w-md";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(buildJsonLd(project)) }} />
      <CustomCursor />
      <AnimatedGridBackground />

      <main className="relative z-10 flex flex-col min-h-screen bg-transparent">
        {/* Header */}
        <header className="relative pt-32 sm:pt-40 pb-12 px-6 sm:px-12 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute top-32 right-1/4 w-[360px] h-[360px] bg-purple-600/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="motion-safe:animate-fade-up mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                <li>
                  <Link href="/" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-700">/</li>
                <li>
                  <Link href="/#projects" className="text-neutral-400 hover:text-white transition-colors">Projects</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-700">/</li>
                <li className="text-neutral-500 truncate max-w-[16rem] sm:max-w-none" aria-current="page">{project.title}</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <p className="motion-safe:animate-fade-up [animation-delay:80ms] inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm text-sm font-medium text-neutral-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                {page.eyebrow}
              </p>

              <h1 className="motion-safe:animate-fade-up [animation-delay:160ms] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
                {page.h1}
              </h1>

              <p className="motion-safe:animate-fade-up [animation-delay:240ms] text-lg sm:text-xl font-semibold leading-relaxed mb-10 max-w-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {project.title}
              </p>

              <div className="motion-safe:animate-fade-up [animation-delay:320ms]">
                <ProjectLinks project={project} />
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        {project.stats && (
          <div className="px-6 sm:px-12 pb-12">
            <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {project.stats.map((stat) => (
                <div
                  key={stat}
                  className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-cyan-400/30 transition-colors duration-300"
                >
                  <dt className="sr-only">Key result</dt>
                  <dd className="flex items-start gap-2 font-mono text-sm sm:text-base text-neutral-200">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Lead screenshot */}
        {leadImage && (
          <div className="px-6 sm:px-12 pb-20">
            <Screenshot
              image={leadImage}
              eager
              sizes="(min-width: 1200px) 1152px, calc(100vw - 48px)"
              className="max-w-6xl mx-auto"
            />
          </div>
        )}

        {/* Body */}
        {(sections.length > 0 || hasSidebar) && (
          <div className="px-6 sm:px-12 pb-24 border-t border-neutral-800/80">
            <div
              className={`max-w-6xl mx-auto pt-16 sm:pt-20 grid gap-16 lg:gap-20 ${
                sections.length > 0 && hasSidebar ? "lg:grid-cols-[minmax(0,1fr)_320px]" : ""
              }`}
            >
              {sections.length > 0 && (
                <article className={`space-y-16 ${hasSidebar ? "" : "max-w-3xl"}`}>
                  {sections.map((key, i) => (
                    <Section key={key} index={i + 1} title={page.sectionTitles?.[key] ?? SECTION_TITLES[key]} items={page[key]} />
                  ))}
                </article>
              )}

              {hasSidebar && (
                <aside
                  className={
                    sections.length > 0
                      ? "space-y-6 lg:sticky lg:top-28 self-start"
                      : "grid gap-6 md:grid-cols-2 items-start"
                  }
                >
                  {hasTech && (
                    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">Tech stack</h2>
                      <ul className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <li
                            key={tech}
                            className="px-2.5 py-1 bg-neutral-950 text-blue-400 text-xs font-medium rounded-md border border-neutral-800"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hasLinks && (
                    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">Links</h2>
                      <ProjectLinks project={project} layout="list" />
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <section className="px-6 sm:px-12 pb-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Screenshots</h2>
                <div className="h-px bg-neutral-800 flex-1 ml-4" />
              </div>
              <div className={`grid gap-8 items-start ${galleryLayout.grid}`}>
                {galleryImages.map((image) => (
                  <Screenshot key={image.src} image={image} sizes={galleryLayout.sizes} frameRatio={galleryFrameRatio} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related projects */}
        {related.length > 0 && (
          <section className="px-6 sm:px-12 pt-24 pb-16 border-t border-neutral-800">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Related projects</h2>
                <div className="h-px bg-neutral-800 flex-1 ml-4" />
              </div>
              <ul className={`grid gap-6 ${relatedGrid}`}>
                {related.map((item) => {
                  const thumb = item.images?.[0];
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/projects/${item.slug}`}
                        className="group relative flex flex-col h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 overflow-hidden hover:-translate-y-1 hover:bg-neutral-800/80 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
                      >
                        <span className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                        {thumb && (
                          <span className="relative block aspect-[16/10] mb-5 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                            <Image
                              src={thumb.src}
                              alt={thumb.alt}
                              fill
                              sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </span>
                        )}
                        <span className="relative text-lg font-bold text-white leading-snug mb-4">{item.title}</span>
                        <span className="relative mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                          Read case study
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>
          </section>
        )}

        <div className={`px-6 sm:px-12 pb-24 flex justify-center ${related.length > 0 ? "" : "pt-12 border-t border-neutral-800"}`}>
          <Link
            href="/#projects"
            className="group flex items-center gap-2 px-8 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-medium rounded-full border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all"
          >
            <ArrowLeft size={18} className="text-neutral-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            Back to all projects
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
