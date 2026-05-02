export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitUrl) {
    return normalizeUrl(explicitUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return normalizeUrl(`https://${vercelUrl}`);
  }

  return "http://localhost:3000";
}

export function getAbsoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}
