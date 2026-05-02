import { defaultContent } from "@/lib/default-content";
import { ensureContentTable, getSql, hasDatabase } from "@/lib/db";
import type { SiteContent } from "@/lib/types";

const CONTENT_ID = "home.zh";

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasDatabase()) {
    return defaultContent;
  }

  try {
    const sql = getSql();
    if (!sql) return defaultContent;

    await ensureContentTable();
    const rows = (await sql`
      select data
      from site_content
      where id = ${CONTENT_ID}
      limit 1
    `) as { data: SiteContent }[];

    if (!rows[0]?.data) {
      return defaultContent;
    }

    return normalizeContent(rows[0].data);
  } catch (error) {
    console.error("Failed to load site content, falling back to defaults", error);
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureContentTable();
  const nextContent = normalizeContent({
    ...content,
    locale: "zh",
    updatedAt: new Date().toISOString()
  });

  await sql`
    insert into site_content (id, data, updated_at)
    values (${CONTENT_ID}, ${JSON.stringify(nextContent)}::jsonb, now())
    on conflict (id)
    do update set data = excluded.data, updated_at = now()
  `;

  return nextContent;
}

function normalizeContent(content: Partial<SiteContent>): SiteContent {
  if (content.contentVersion !== defaultContent.contentVersion) {
    return {
      ...defaultContent,
      contact: {
        ...defaultContent.contact,
        ...content.contact
      }
    };
  }

  return {
    ...defaultContent,
    ...content,
    contact: {
      ...defaultContent.contact,
      ...content.contact
    },
    about: {
      ...defaultContent.about,
      ...content.about,
      paragraphs: content.about?.paragraphs?.length
        ? content.about.paragraphs
        : defaultContent.about.paragraphs
    },
    seo: {
      ...defaultContent.seo,
      ...content.seo,
      keywords: content.seo?.keywords?.length ? content.seo.keywords : defaultContent.seo.keywords
    },
    services: content.services?.length ? content.services : defaultContent.services,
    audiences: content.audiences?.length ? content.audiences : defaultContent.audiences,
    projects: content.projects?.length ? content.projects : defaultContent.projects,
    process: content.process?.length ? content.process : defaultContent.process,
    skills: content.skills?.length ? content.skills : defaultContent.skills,
    faqs: content.faqs?.length ? content.faqs : defaultContent.faqs,
    heroHighlights: content.heroHighlights?.length
      ? content.heroHighlights
      : defaultContent.heroHighlights
  };
}
