import { SiteHome } from "@/components/site-home";
import { defaultContent } from "@/lib/default-content";
import { getAbsoluteUrl } from "@/lib/site-url";
import type { SiteContent } from "@/lib/types";

const englishPlaceholder: SiteContent = {
  ...defaultContent,
  locale: "en",
  name: defaultContent.name,
  tagline: "Zhiye AI Lab | Turn AI ideas into accessible web applications",
  heroTitle: "Zhiye AI Lab | Turn AI ideas into accessible web applications",
  heroSubtitle:
    "The Chinese homepage is the primary version. This route is reserved for a future English version of the Zhiye AI Lab service page and AI application showroom.",
  seo: {
    title: "Zhiye AI Lab | AI Customer Service and Web Application Showroom",
    description: "A bilingual-ready AI application showroom for AI customer service, FAQ pages, project pages, small-business landing pages, and automation prototypes.",
    keywords: ["Zhiye AI Lab", "AI customer service", "DeepSeek", "Dify", "Coze", "Vercel"]
  }
};

export const metadata = {
  title: englishPlaceholder.seo.title,
  description: englishPlaceholder.seo.description,
  alternates: {
    canonical: getAbsoluteUrl("/en")
  }
};

export default function EnglishPage() {
  return <SiteHome content={englishPlaceholder} />;
}
