import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ["/", 1],
    ["/answers", 0.9],
    ["/recommend", 0.9],
    ["/services", 0.9],
    ["/starter", 0.85],
    ["/en", 0.55],
    ["/llms.txt", 0.75],
    ["/llms-full.txt", 0.75]
  ].map(([path, priority]) => ({
    url: getAbsoluteUrl(path as string),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: priority as number
  }));
}
