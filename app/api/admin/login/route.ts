import { authIsConfigured, createSessionToken, getSessionCookieName, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  if (!authIsConfigured()) {
    return Response.json(
      { ok: false, message: "管理员环境变量未配置，请先设置 ADMIN_USERNAME、ADMIN_PASSWORD、ADMIN_SESSION_SECRET。" },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { username?: string; password?: string };
  if (!body.username || !body.password || !verifyPassword(body.username, body.password)) {
    return Response.json({ ok: false, message: "账号或密码不正确。" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${getSessionCookieName()}=${createSessionToken(body.username)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  );

  return response;
}
