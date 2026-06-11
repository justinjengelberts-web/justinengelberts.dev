import type { MetadataRoute } from "next";

const projectSlugs = [
  "refundely",
  "adhoc-platform",
  "webmodern-platform",
  "contenttool",
  "leadhub",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://justinengelberts.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectSlugs.map((slug) => ({
      url: `https://justinengelberts.dev/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
