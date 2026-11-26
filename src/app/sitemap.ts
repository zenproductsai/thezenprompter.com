import type { MetadataRoute } from "next";
import { HELP, helpHref } from "@/content/help";
import { POSTS, postHref } from "@/content/posts";
import { GUIDES, guideHref } from "@/content/guides";
import { latestReleaseDate } from "@/content/changelog";
import { SITE_URL } from "@/content/site";

// Built from the same lists as the pages, so every published page is listed and nothing else.
// Only <lastmod> is written: Google "ignores <priority> and <changefreq>" and uses lastmod "if it's
// consistently and verifiably accurate" (Search Central, Build a sitemap, read 26 Nov 2026). So each
// date is when that page's facts last changed, never the build time.
const SITE_DATE = "2026-11-26";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, lastModified = SITE_DATE) => ({ url: `${SITE_URL}${path}`, lastModified });
  return [
    at(""),
    at("/pt-br"),
    at("/es"),
    at("/features"),
    ...GUIDES.filter((g) => g.kind === "features").map((g) => at(guideHref(g), g.reviewed)),
    at("/compare"),
    ...GUIDES.filter((g) => g.kind === "compare").map((g) => at(guideHref(g), g.reviewed)),
    at("/pricing"),
    at("/help"),
    ...HELP.map((a) => at(helpHref(a), a.reviewed)),
    at("/blog"),
    ...POSTS.map((p) => at(postHref(p), p.modified)),
    at("/changelog", latestReleaseDate()),
    at("/contact"),
    at("/about"),
  ];
}
