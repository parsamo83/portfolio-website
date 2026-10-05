import { DEFAULT_LANG, isLang, LANG_COOKIE, type Lang } from "@/i18n";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Every page lives under /en or /de. A path without a language, like `/`,
 * redirects to the language picked with the switch before, or else to the
 * first language in the browser's Accept-Language that the site has.
 */
function preferredLang(request: NextRequest): Lang {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(saved)) return saved;

  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, weight] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: weight ? Number(weight) : 1 };
    })
    .filter((entry) => entry.base && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  const match = ranked.find((entry) => isLang(entry.base));
  return match ? (match.base as Lang) : DEFAULT_LANG;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLang(pathname.split("/")[1])) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLang(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Only paths without a language run the proxy, so /en and /de pages come straight from
  // the CDN. Next's own assets and files (images, icon.svg, robots.txt) are skipped too.
  matcher: ["/((?!(?:en|de)(?:/|$)|_next|.*\\..*).*)"],
};
