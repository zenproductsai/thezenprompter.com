import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, guidesOf } from "@/content/guides";
import { Crumbs, Icon } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

const DESC = "Zen Teleprompter next to BIGVU, PromptSmart Pro, Teleprompter, Teleprompter.com and Teleprompter for Video, from each app's own App Store listing.";

export const metadata: Metadata = pageMeta({ title: "Compare teleprompter apps for iPhone", description: DESC, path: "/compare" });

export default function Hub() {
  const items = guidesOf("compare");
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "Compare", href: "/compare" }]} />
        <span className="tc y">Compare · {items.length} pages</span>
        <h1 className="disp d2">Side by side.</h1>
        <p className="lede">We make Zen Teleprompter. Every fact about another app comes from its own App Store listing, with the date we read it.</p>
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
