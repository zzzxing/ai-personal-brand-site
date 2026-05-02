import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const ONE_DAY_SECONDS = 60 * 60 * 24;

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    secret: process.env.ADMIN_SESSION_SECRET
  };
}

export function authIsConfigured() {
  const { username, password, secret } = getAdminCredentials();
  return Boolean(username && password && secret);
}

export function verifyPassword(username: string, password: string) {
  const credentials = getAdminCredentials();
  if (!credentials.username || !credentials.password) return false;

  return safeEqual(username, credentials.username) && safeEqual(password, credentials.password);
}

export function createSessionToken(username: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const expires = Math.floor(Date.now() / 1000) + ONE_DAY_SECONDS;
  const payload = Buffer.from(JSON.stringify({ username, expires })).toString("base64url");
  const signature = sign(payload, secret);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload, secret))) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      username?: string;
      expires?: number;
    };

    return Boolean(parsed.username && parsed.expires && parsed.expires > Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminRequest() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}
