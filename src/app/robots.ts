import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

// Everything may be crawled. The legal page keeps itself out of search results
// with its own noindex tag, which crawlers can only read if they may fetch it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
