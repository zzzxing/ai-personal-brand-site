import { SiteHome } from "@/components/site-home";
import { defaultContent } from "@/lib/default-content";
import { getAbsoluteUrl } from "@/lib/site-url";
import type { SiteContent } from "@/lib/types";

const englishPlaceholder: SiteContent = {
  ...defaultContent,
  locale: "en",
  name: defaultContent.name,
  tagline: "Zing AI Lab | AI application showroom for individuals and small businesses",
  heroTitle: "Zing AI Lab | AI customer service, agent prototypes, and small-business AI applications",
  heroSubtitle:
    "The Chinese homepage is the primary version. This route is reserved for a future English version of the Zing AI Lab AI application showroom.",
  seo: {
    title: "Zing AI Lab | AI Application Showroom",
    description: "A bilingual-ready AI application showroom for AI customer service, agent prototypes, small-business landing pages, and automation tools.",
    keywords: ["Zing AI Lab", "AI customer service", "DeepSeek", "Dify", "Coze", "Vercel"]
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
