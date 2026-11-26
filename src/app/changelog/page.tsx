import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { RELEASES } from "@/content/changelog";
import { fmtDate } from "@/content/site";
import { Crumbs, Icon } from "@/components/ui";

const DESC = "Every Zen Teleprompter release, newest first: what changed in the teleprompter, Fix everything, captions, languages and the Apple Watch app.";

export const metadata: Metadata = pageMeta({ title: "What's new: every release", description: DESC, path: "/changelog" });

export default function Changelog() {
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "What's new", href: "/changelog" }]} />
        <span className="tc y">Changelog · {RELEASES.length} releases</span>
        <h1 className="disp d2">What&apos;s new</h1>
      </div>
      <div style={{ marginTop: 24 }}>
        {RELEASES.map((r, i) => (
          <section key={r.version} className={`ver${i < 2 ? " new" : ""}`} aria-labelledby={`v-${r.version}`}>
            <div className="v">
              <b id={`v-${r.version}`}>{r.version}</b>
              <span className="tc">{fmtDate(r.date)}</span>
              {r.status && <span className="chip" style={{ justifySelf: "start" }}>{r.status}</span>}
            </div>
            <ul>{r.notes.map((n) => <li key={n}><Icon name="check" />{n}</li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}
