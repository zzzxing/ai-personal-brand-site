import { SiteHome } from "@/components/site-home";
import { defaultContent } from "@/lib/default-content";
import type { SiteContent } from "@/lib/types";

const englishPlaceholder: SiteContent = {
  ...defaultContent,
  locale: "en",
  name: defaultContent.name,
  tagline: "AI Application Developer | Websites, agents, and automation for real problems",
  heroTitle: "English content is reserved for the next iteration",
  heroSubtitle:
    "The first release focuses on the Chinese version. The code structure already includes a bilingual route and can be expanded from the admin panel later.",
  seo: {
    title: "AI Application Developer | Portfolio Website",
    description: "A bilingual-ready personal brand website for AI apps, websites, agents, and automation tools.",
    keywords: ["AI developer", "AI customer service", "automation", "Next.js", "Vercel"]
  }
};

export const metadata = {
  title: englishPlaceholder.seo.title,
  description: englishPlaceholder.seo.description
};

export default function EnglishPage() {
  return <SiteHome content={englishPlaceholder} />;
}
