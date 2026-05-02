import { isAdminRequest } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  if (!(await isAdminRequest())) {
    return Response.json({ ok: false, message: "未登录。" }, { status: 401 });
  }

  return Response.json({
    ok: true,
    databaseConfigured: hasDatabase(),
    content: await getSiteContent()
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) {
    return Response.json({ ok: false, message: "未登录。" }, { status: 401 });
  }

  if (!hasDatabase()) {
    return Response.json(
      { ok: false, message: "DATABASE_URL 未配置，当前只能读取默认种子数据，无法持久保存。" },
      { status: 503 }
    );
  }

  const content = (await request.json()) as SiteContent;
  const saved = await saveSiteContent(content);

  return Response.json({ ok: true, content: saved });
}
