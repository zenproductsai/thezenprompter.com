import type { Metadata } from "next";
import Link from "next/link";
import { APPLE_EULA_URL, PRICES } from "@/content/site";
import { Crumbs, Faq, GetApp, Icon, JsonLd, Rail, faqLd } from "@/components/ui";

const TITLE = "Pricing";
const DESC = `Zen Teleprompter is ${PRICES.monthly} a month or ${PRICES.yearly} a year, with ${PRICES.trialDays} days free first. Everything is in both plans.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/pricing" },
  openGraph: { title: `${TITLE} · Zen Teleprompter: Video Editor`, description: DESC, url: "/pricing" },
  twitter: { title: `${TITLE} · Zen Teleprompter: Video Editor`, description: DESC },
};

const INCLUDED = [
  "Teleprompter and selfie prompter",
  "Follow my voice",
  "Fix everything",
  "Karaoke and Normal captions, .srt export",
  "12 title themes and story moments",
  "AI Script Studio",
  "Post words for Reels, TikTok and YouTube",
  "Apple Watch and Bluetooth remotes",
  "iCloud sync between your devices",
  "14 languages",
];

const PFAQ = [
  { q: "When am I charged?", a: "When the 3 free days end, unless you cancel before then. We remind you on day 2." },
  { q: "How do I cancel?", a: "Settings on your iPhone, your name, Subscriptions, Zen Teleprompter: Video Editor. Cancelling keeps everything working until the period you paid for ends." },
  { q: "Is there a free plan?", a: "No. The app is paid, with 3 days free to try everything. If your plan ends, your scripts stay readable and your videos can still be saved to Photos." },
  { q: "Is the price the same everywhere?", a: "Prices here are in US dollars. The App Store shows the price in your country before you confirm." },
  { q: "Can I get the trial again?", a: "Apple decides who can still have a trial. If you have used it, the app offers the plans without one." },
];

export default function Pricing() {
  return (
    <div className="wrap">
      <JsonLd data={faqLd(PFAQ)} />
      <div className="phead">
        <Crumbs items={[{ name: "Pricing", href: "/pricing" }]} />
        <span className="tc y">00:00:00 · Pricing</span>
        <h1 className="disp d2">{PRICES.trialDays} days free. Then one plan.</h1>
        <p className="lede">Everything is in both. Pick how often you pay.</p>
      </div>
      <div className="grid2" style={{ marginTop: 32 }}>
        <div className="plan best">
          <span className="lbl">Yearly <span className="chip" style={{ marginLeft: 6 }}>Save {PRICES.yearlySaving}</span></span>
          <div className="price">{PRICES.yearly}</div>
          <p className="muted">a year, about {PRICES.yearlyPerMonth} a month</p>
          <div style={{ marginTop: 12 }}><GetApp /></div>
        </div>
        <div className="plan">
          <span className="lbl">Monthly</span>
          <div className="price">{PRICES.monthly}</div>
          <p className="muted">a month</p>
          <div style={{ marginTop: 12 }}><GetApp /></div>
        </div>
      </div>
      <div className="timeline">
        <div><b>Today</b><span>Everything unlocked</span></div>
        <div><b>Day 2</b><span>We remind you</span></div>
        <div><b>Day 3</b><span>Your plan starts. Cancel before and pay nothing.</span></div>
      </div>

      <Rail tc="00:00:30" label="Included" title="Everything, on both plans." id="included">
        <ul className="checks">{INCLUDED.map((t) => <li key={t}><Icon name="check" />{t}</li>)}</ul>
      </Rail>
      <Rail tc="00:01:00" label="FAQ" title="Questions." id="faq">
        <Faq items={PFAQ} />
        <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>
          Payment is through your Apple account. <a href={APPLE_EULA_URL} style={{ textDecoration: "underline" }}>Apple&apos;s standard licence</a> applies. More in <Link href="/help/subscription" style={{ color: "var(--fill)" }}>Trial, restore and cancel</Link>.
        </p>
      </Rail>
    </div>
  );
}
