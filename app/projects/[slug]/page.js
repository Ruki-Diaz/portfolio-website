import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import CaseStudy from "@/components/projects/CaseStudy";
import { projects, getProjectBySlug, getProjectNumber, getRelatedProjects } from "@/lib/projects";
import { SITE, PERSON_ID, toJsonLd } from "@/lib/site";

// Only the slugs returned by generateStaticParams exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// The share image comes from the colocated opengraph-image.js / twitter-image.js.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const { title, description } = project.seo;
  const path = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      siteName: "Rukshan Dias",
      locale: "en_AU",
      url: path,
      title: `${title} | Rukshan Dias`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Rukshan Dias`,
      description,
    },
  };
}

function buildJsonLd(project) {
  const url = `${SITE}/projects/${project.slug}`;
  const work = {
    "@type": project.schemaType,
    "@id": `${url}#project`,
    name: project.title,
    headline: project.headline ?? project.title,
    description: project.seo.description,
    url,
    keywords: project.tags.join(", "),
    inLanguage: "en-AU",
    author: { "@type": "Person", "@id": PERSON_ID, name: "Rukshan Dias", url: SITE },
  };

  if (project.images?.length) work.image = project.images.map((img) => `${SITE}${img.src}`);

  if (project.schemaType === "SoftwareSourceCode") {
    if (project.links.code) work.codeRepository = project.links.code;
    if (project.tags.includes("Python")) work.programmingLanguage = "Python";
  }

  const sameAs = [project.links.demo, project.links.report].filter((href) => href?.startsWith("http"));
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

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(buildJsonLd(project)) }} />
      <CustomCursor />
      <AnimatedGridBackground />

      <main id="main" className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <div className="relative pt-28 sm:pt-36 pb-24 px-6 sm:px-12 overflow-hidden">
          <div aria-hidden="true" className="absolute top-10 left-1/4 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div aria-hidden="true" className="absolute top-32 right-1/4 w-[360px] h-[360px] bg-purple-600/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="motion-safe:animate-fade-up mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                <li>
                  <Link href="/" className="group inline-flex items-center gap-2 rounded-sm text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft aria-hidden="true" size={16} className="transition-transform group-hover:-translate-x-0.5" />
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-700">/</li>
                <li>
                  <Link href="/#projects" className="rounded-sm text-neutral-400 hover:text-white transition-colors">Projects</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-700">/</li>
                <li className="text-neutral-400 truncate max-w-[14rem] sm:max-w-none" aria-current="page">{project.title}</li>
              </ol>
            </nav>

            <div className="motion-safe:animate-fade-up [animation-delay:100ms]">
              <CaseStudy project={project} variant="page" number={getProjectNumber(project)} />
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="px-6 sm:px-12 pt-20 pb-16 border-t border-neutral-800">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-6 mb-10">
                <h2 id="related-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-white">Related projects</h2>
                <div aria-hidden="true" className="h-px bg-gradient-to-r from-neutral-700 to-transparent flex-1" />
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.links.caseStudy}
                      className="group relative flex flex-col gap-3 h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 overflow-hidden hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
                    >
                      <span className="text-lg font-bold text-white leading-snug">{item.title}</span>
                      <span className="text-sm text-neutral-400 leading-relaxed">{item.summary}</span>
                      <span className="mt-auto pt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        Read case study
                        <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <div className="px-6 sm:px-12 pb-24 flex justify-center">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 px-8 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-medium rounded-full border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all"
          >
            <ArrowLeft aria-hidden="true" size={18} className="text-neutral-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            Back to all projects
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
