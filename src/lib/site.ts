/**
 * The site's public address, for the absolute links that link previews, the
 * sitemap and robots.txt need. LinkedIn can only show the preview image if
 * its URL is absolute and public, so this must never be localhost on Vercel.
 *
 * 1. NEXT_PUBLIC_SITE_URL, if set (for example once a custom domain exists).
 * 2. Vercel's own production address, which Vercel sets on every build.
 * 3. localhost, for local development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
