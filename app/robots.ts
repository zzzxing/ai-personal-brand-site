import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/answers", "/services", "/use-cases", "/starter", "/llms.txt", "/llms-full.txt", "/sitemap.xml"],
        disallow: ["/admin", "/api", "/api/", "/admin/", "/*.env", "/*database*"]
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"],
        allow: ["/", "/answers", "/services", "/use-cases", "/starter", "/llms.txt", "/llms-full.txt", "/sitemap.xml"],
        disallow: ["/admin", "/api", "/api/", "/admin/", "/*.env", "/*database*"]
      }
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml")
  };
}
