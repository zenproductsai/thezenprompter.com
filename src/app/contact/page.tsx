import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/content/site";
import { CopyEmail } from "@/components/client";
import { Crumbs, Icon, Rail } from "@/components/ui";

const DESC = "Questions, problems or ideas go straight to the person who builds Zen Teleprompter. Answered within 24 hours.";

export const metadata: Metadata = pageMeta({ title: "Contact: write to the founder", description: DESC, path: "/contact" });

export default function Contact() {
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "Contact", href: "/contact" }]} />
        <span className="tc y">Support</span>
        <h1 className="disp d2">Write to the Founder</h1>
        <p className="lede">Read by me. Answered within 24 hours.</p>
      </div>
      <div className="track" style={{ marginTop: 32 }}>
        <div><span className="tc y">00:00</span><h2 className="disp" style={{ fontSize: 30 }}>You write</h2><p className="muted">By email, or from the app.</p></div>
        <div><span className="tc y">Within 24 h</span><h2 className="disp" style={{ fontSize: 30 }}>I read it</h2><p className="muted">The founder, not a queue.</p></div>
        <div><span className="tc y">Reply</span><h2 className="disp" style={{ fontSize: 30 }}>You hear back</h2><p className="muted">With a fix, an answer or a date.</p></div>
      </div>
      <Rail tc="01" label="Email" title="Email" id="email">
        <CopyEmail email={SUPPORT_EMAIL} />
      </Rail>
      <Rail tc="02" label="In the app" title="From the app" id="app" lead="Settings, Help and about, Write to the Founder. It adds the app version, your device and its language, so I can see what you see.">
        <></>
      </Rail>
      <Rail tc="03" label="Help" title="Answers first?" id="help">
        <Link className="ghost" href="/help">Search the help centre <Icon name="arrow-right" /></Link>
      </Rail>
    </div>
  );
}
