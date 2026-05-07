export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitUrl) {
    return normalizeUrl(explicitUrl);
  }

  return "https://ai-personal-brand-site.vercel.app";
}

export function getAbsoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}
