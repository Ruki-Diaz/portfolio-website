import { SITE } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
