import type { Metadata } from "next";
import { SiteHome } from "@/components/site-home";
import { getSiteContent } from "@/lib/content";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const siteUrl = getSiteUrl();

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: getAbsoluteUrl("/"),
      languages: {
        "zh-CN": getAbsoluteUrl("/"),
        en: getAbsoluteUrl("/en")
      }
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: siteUrl,
      type: "website",
      locale: "zh_CN",
      images: [
        {
          url: "/ai-brand-hero.png",
          width: 960,
          height: 720,
          alt: "AI应用开发者个人官网封面图"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/ai-brand-hero.png"]
    }
  };
}

export default async function HomePage() {
  const content = await getSiteContent();

  return <SiteHome content={content} />;
}
