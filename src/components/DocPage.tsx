import Link from "next/link";
import { APP_STORE_URL, FOUNDER, SITE_URL, fmtDate } from "@/content/site";
import { Crumbs, Icon, JsonLd, type Crumb } from "./ui";
import { APP_ID_REF, ORG_ID, SITE_ID, founderNode } from "@/lib/schema";

/** The frame help articles and blog posts share: breadcrumbs, title, the direct answer, an
 *  on-this-page list, the body and a side column. Article schema is built here so no page forgets it. */
export default function DocPage({ crumbs, kicker, h1, answer, path, type, published, modified, description, headings, related, relatedTitle, byFounder = false, children }: {
  crumbs: Crumb[]; kicker: string; h1: string; answer?: string; path: string; type: "BlogPosting" | "TechArticle" | "Article";
  published: string; modified: string; description: string; headings: { id: string; text: string }[];
  related: { href: string; label: string }[]; relatedTitle: string;
  /** Posts, feature and comparison pages are written by the founder and say so; help articles
   *  stay with the company, since they document the app rather than argue a view. */
  byFounder?: boolean;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": type,
    headline: h1,
    description,
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": APP_ID_REF },
    // Named in full, not only by @id: Google reads each JSON-LD block on its own.
    author: byFounder ? founderNode : { "@type": "Organization", "@id": ORG_ID, name: "Zen Products", url: "https://www.zenproducts.ai/" },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: "Zen Products", logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
  };
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <div className="phead">
        <Crumbs items={crumbs} />
        <span className="tc y">{kicker} · {fmtDate(modified)}</span>
        <h1 className="disp d2">{h1}</h1>
        {byFounder && <p className="byline">By <Link href={FOUNDER.page} rel="author">{FOUNDER.name}</Link>, founder of Zen Products</p>}
      </div>
      <div className="doc">
        <nav className="toc" aria-label="On this page">
          {headings.length > 0 && <span className="lbl">On this page</span>}
          {headings.map((h, i) => <a key={h.id} href={`#${h.id}`}><span className="tc y">{String(i + 1).padStart(2, "0")}</span>{h.text}</a>)}
        </nav>
        <article className="prose">
          {answer && <p className="answer">{answer}</p>}
          {children}
          <div className="helpful">
            <span>{type === "TechArticle" ? "Still stuck?" : "Questions about the app?"}</span>
            <Link href="/contact" style={{ color: "var(--fill)", fontWeight: 600 }}>Write to the Founder <Icon name="arrow-right" /></Link>
          </div>
        </article>
        <aside className="side">
          {related.length > 0 && (
            <div className="box">
              <span className="lbl">{relatedTitle}</span>
              <ul>{related.map((r) => <li key={r.href}><Link href={r.href}>{r.label}</Link></li>)}</ul>
            </div>
          )}
          <div className="box">
            <b>Zen Teleprompter: Video Editor</b>
            <p className="muted">Read under the lens. One tap finishes the take. 3 days free.</p>
            <a className="key sm" style={{ justifySelf: "start" }} href={APP_STORE_URL} target="_blank" rel="noopener"><Icon name="download-simple" />Get the app</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
