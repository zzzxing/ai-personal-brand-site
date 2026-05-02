export type Locale = "zh" | "en";

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
}

export interface ProcessItem {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  wechat: string;
  note: string;
}

export interface SeoInfo {
  title: string;
  description: string;
  keywords: string[];
}

export interface SiteContent {
  locale: Locale;
  contentVersion?: string;
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  heroHighlights: string[];
  services: ServiceItem[];
  audiences: AudienceItem[];
  projects: ProjectItem[];
  process: ProcessItem[];
  skills: string[];
  faqs: FaqItem[];
  contact: ContactInfo;
  seo: SeoInfo;
  updatedAt?: string;
}
