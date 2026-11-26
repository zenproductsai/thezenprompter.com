import type { Metadata } from "next";
import Link from "next/link";
import { HELP, HELP_CATEGORIES, helpHref, helpIn } from "@/content/help";
import { HelpSearch } from "@/components/client";
import { Crumbs, Icon } from "@/components/ui";
import type { IconName } from "@/components/icon-paths";

const DESC = "How to use Zen Teleprompter: the reading line, Follow my voice, selfie takes, Fix everything, captions, export, remotes, your plan and privacy.";

export const metadata: Metadata = {
  title: "Help centre",
  description: DESC,
  alternates: { canonical: "/help" },
  openGraph: { title: "Help centre · Zen Teleprompter: Video Editor", description: DESC, url: "/help" },
  twitter: { title: "Help centre · Zen Teleprompter: Video Editor", description: DESC },
};

export default function HelpPage() {
  const entries = HELP.map((a) => ({ href: helpHref(a), title: a.title, summary: a.summary, words: `${a.title} ${a.summary} ${a.answer}`.toLowerCase() }));
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "Help", href: "/help" }]} />
        <span className="tc y">Help centre · {HELP.length} articles</span>
        <h1 className="disp d2">Find the fix.</h1>
        <HelpSearch entries={entries} />
      </div>
      <div className="cats" style={{ marginTop: 40 }}>
        {HELP_CATEGORIES.map((c) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`}>
            <h2 id={`cat-${c.id}`}><Icon name={c.icon as IconName} />{c.name}</h2>
            <ul>{helpIn(c.id).map((a) => <li key={a.slug}><Link href={helpHref(a)}>{a.title}<Icon name="arrow-right" /></Link></li>)}</ul>
          </section>
        ))}
      </div>
      <div className="band">
        <div style={{ display: "grid", gap: 6 }}>
          <span className="lbl">Still stuck?</span>
          <h2 className="disp d3">Write to the Founder</h2>
          <p className="muted">Read by me. Answered within 24 hours.</p>
        </div>
        <Link className="key" href="/contact"><Icon name="envelope-simple" />Write</Link>
      </div>
    </div>
  );
}
