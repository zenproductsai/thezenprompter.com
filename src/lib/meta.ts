import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/content/site";

// Next.js merges metadata shallowly: a page that sets `openGraph` or `twitter` replaces the root
// object whole. Before this helper every inner page lost og:site_name, og:locale and the large
// Twitter card (live audit, 26 Nov 2026: twitter:card was "summary" on all 23 inner pages).
// Every page builds its metadata here, so no page can drop them again.

export type Locale = "en" | "pt-BR" | "es";
const OG_LOCALE: Record<Locale, string> = { en: "en_US", "pt-BR": "pt_BR", es: "es_MX" };

export function pageMeta({ title, absoluteTitle, description, path, type = "website", published, modified, locale = "en", languages }: {
  /** Goes through the root template ("%s · Zen Teleprompter"). */
  title?: string;
  /** Used as is, for pages whose title already names the app. */
  absoluteTitle?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
  locale?: Locale;
  /** hreflang alternates, including this page itself. */
  languages?: Record<string, string>;
}): Metadata {
  // A title that already names the app is used as is, so it never reads "... Zen Teleprompter · Zen Teleprompter".
  if (!absoluteTitle && title?.includes("Zen Teleprompter")) absoluteTitle = title;
  // Past about 70 characters the brand suffix would be cut off in results anyway, so long,
  // query-shaped titles stand alone and keep their words visible.
  if (!absoluteTitle && title && title.length + 19 > 70) absoluteTitle = title;
  const shown = absoluteTitle ?? `${title} · Zen Teleprompter`;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      url,
      title: shown,
      description,
      ...(type === "article" && published ? { publishedTime: published, modifiedTime: modified ?? published } : {}),
    },
    twitter: { card: "summary_large_image", title: shown, description },
  };
}

/** Cuts a description at a sentence end so it reads whole in a search result (Google truncates by
 *  width, not a fixed count, so this aims at about 160 characters rather than a hard limit). */
export function clip(text: string, max = 165) {
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  return (out.trim() || text.slice(0, max - 1).trimEnd() + "…");
}
