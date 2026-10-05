import { LANGS } from "@/i18n";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Both language versions of the home page, each pointing at the other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((lang) => [lang, `${SITE_URL}/${lang}`]));

  return LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: new Date(),
    alternates: { languages },
  }));
}
