import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin"
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: "/admin"
      }
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml")
  };
}
