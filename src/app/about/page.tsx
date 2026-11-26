import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import { FOUNDER, SITE_URL, SUPPORT_EMAIL } from "@/content/site";
import { Crumbs, Icon, JsonLd, Rail } from "@/components/ui";
import { SITE_ID, founderNode, graph } from "@/lib/schema";

// The author page every byline links to. Google's guidance for article authors is a url to a page
// about the person; ProfilePage is the type it reads for such a page. Facts here come from his own
// public site (thekgaurav.com, read 26 Nov 2026), and nothing about money or his employer.

const DESC = "Kumar Gaurav designs and builds Zen Teleprompter and the other Zen Products apps, and writes everything on this site.";

export const metadata: Metadata = pageMeta({ title: "About the founder, Kumar Gaurav", description: DESC, path: FOUNDER.page });

export default function About() {
  const ld = graph(
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}${FOUNDER.page}`,
      url: `${SITE_URL}${FOUNDER.page}`,
      name: `About ${FOUNDER.name}`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: { "@id": founderNode["@id"] },
      dateModified: "2026-11-26",
    },
    { ...founderNode, description: DESC },
  );
  return (
    <div className="wrap">
      <JsonLd data={ld} />
      <div className="phead">
        <Crumbs items={[{ name: "About", href: FOUNDER.page }]} />
        <span className="tc y">About the founder</span>
        <h1 className="disp d2">{FOUNDER.name}</h1>
        <p className="lede">I design and build Zen Teleprompter and the other Zen Products apps. I write the posts on this site, and I read every email that comes in.</p>
        {/* In the header, not a revealed rail: as a rail it was the largest text and its reveal
            animation held LCP at 2.7 s (Lighthouse, live, 26 Nov 2026). */}
        <p className="muted" style={{ maxWidth: "38em" }}>I have spent more than 15 years in product design and product leadership, building apps used by millions of people. I studied leadership at MIT Sloan and product management at ISB.</p>
      </div>
      <Rail tc="01" label="Method" title="How this site is written" id="method"
        lead="Posts and guides describe the app as it ships.">
        {/* Short lines rather than one long lead, so no revealed block outgrows the header
            text and becomes a late LCP (it did, 3.2 s, before this). */}
        <ul className="muted" style={{ display: "grid", gap: 8, paddingLeft: 18 }}>
          <li>Numbers come from the app&apos;s own measurements, or from the source named next to them.</li>
          <li>Comparisons use each rival&apos;s own App Store listing, dated when I checked it.</li>
        </ul>
      </Rail>
      <Rail tc="02" label="Elsewhere" title="Find me elsewhere" id="elsewhere">
        <div className="profiles">
          {FOUNDER.profiles.map((p) => (
            <a key={p.href} className="ghost" href={p.href} rel="me noopener" target="_blank">{p.label} <Icon name="arrow-up-right" /></a>
          ))}
        </div>
      </Rail>
      <Rail tc="03" label="Contact" title="Write to me" id="contact" lead={`Questions, problems or ideas about the app: ${SUPPORT_EMAIL}, answered within 24 hours.`}>
        <Link className="ghost" href="/contact">Write to the Founder <Icon name="arrow-right" /></Link>
      </Rail>
    </div>
  );
}
