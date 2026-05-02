import type { Metadata } from "next";
import { SiteHome } from "@/components/site-home";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: siteUrl,
      languages: {
        "zh-CN": siteUrl,
        en: `${siteUrl}/en`
      }
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: siteUrl,
      type: "website",
      locale: "zh_CN"
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description
    }
  };
}

export default async function HomePage() {
  const content = await getSiteContent();

  return <SiteHome content={content} />;
}
