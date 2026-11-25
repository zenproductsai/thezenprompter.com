import type { MetadataRoute } from "next";
import { HELP, helpHref } from "@/content/help";
import { POSTS, postHref } from "@/content/posts";
import { latestReleaseDate } from "@/content/changelog";
import { SITE_URL } from "@/content/site";

// Built from the same lists as the pages, so every published page is listed and nothing else.
// Dates are when each page's facts were last checked, not the build time.
const SITE_DATE = "2026-11-26";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, priority: number, lastModified = SITE_DATE) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "monthly" as const, priority });
  return [
    at("", 1),
    at("/pricing", 0.8),
    at("/help", 0.7),
    ...HELP.map((a) => at(helpHref(a), 0.6, a.reviewed)),
    at("/blog", 0.6),
    ...POSTS.map((p) => at(postHref(p), 0.6, p.modified)),
    at("/changelog", 0.5, latestReleaseDate()),
    at("/contact", 0.4),
  ];
}
