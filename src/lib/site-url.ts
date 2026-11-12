/** Safe site origin for metadata/sitemap. Tolerates an empty, malformed or protocol-less NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try { return new URL(withProtocol).origin; } catch { /* fall through */ }
  }
  return "http://localhost:3000";
}
