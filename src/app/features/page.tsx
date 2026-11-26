import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, guidesOf } from "@/content/guides";
import { Crumbs, Icon } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

const DESC = "What Zen Teleprompter does: a teleprompter that follows your voice, selfie recording, one-tap cuts of filler words and silences, auto captions and remotes.";

export const metadata: Metadata = pageMeta({ title: "Features: teleprompter, captions and one-tap edits", description: DESC, path: "/features" });

export default function Hub() {
  const items = guidesOf("features");
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "Features", href: "/features" }]} />
        <span className="tc y">Features · {items.length} pages</span>
        <h1 className="disp d2">One job at a time.</h1>
        <p className="lede">Each page covers one thing the app does, how it works and where it stops.</p>
      </div>
      <div className="clips" style={{ marginTop: 36 }}>
        {items.map((g) => (
          <Link key={g.slug} className="clip" href={guideHref(g)} style={{ gridTemplateColumns: "1fr" }}>
            <div className="ci">
              <span className="tc y">{g.kicker}</span>
              <h2>{g.h1}</h2>
              <p className="muted" style={{ fontSize: 15 }}>{g.description}</p>
              <span style={{ color: "var(--fill)", fontWeight: 600 }}>Read <Icon name="arrow-right" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
