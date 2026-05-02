import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ["/", 1],
    ["/en", 0.55],
    ["/about", 0.85],
    ["/contact", 0.8],
    ["/privacy", 0.45],
    ["/terms", 0.45],
    ["/llms.txt", 0.7]
  ].map(([path, priority]) => ({
    url: getAbsoluteUrl(path as string),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: priority as number
  }));
}
