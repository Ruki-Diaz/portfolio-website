import { SITE } from "@/lib/site";
import { projectPages } from "@/data/projects";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages.map((project) => ({
      url: `${SITE}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
