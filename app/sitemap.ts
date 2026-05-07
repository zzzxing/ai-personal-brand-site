import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ai-personal-brand-site.vercel.app";
  const lastModified = new Date("2026-05-07");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1
    },
    {
      url: `${baseUrl}/#services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/#faq`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }
  ];
}
