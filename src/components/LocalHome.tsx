import type { LocalHome as L } from "@/content/intl";
import { Faq, GetApp, Icon, JsonLd, faqLd } from "./ui";
import { PhoneShot } from "./devices";
import { appNode, graph } from "@/lib/schema";
import { SITE_URL } from "@/content/site";

/** A translated home page. The wrapper carries `lang`, so screen readers switch voice even though
 *  the shared nav and footer stay in English (Google ignores lang attributes for language
 *  detection; it reads the text and the hreflang links, which are set in the page metadata). */
export default function LocalHome({ c }: { c: L }) {
  return (
    <div className="wrap" lang={c.lang}>
      <JsonLd data={graph({ ...appNode(c.description), "@id": `${SITE_URL}${c.path}#app`, inLanguage: c.lang, url: `${SITE_URL}${c.path}` })} />
      <JsonLd data={faqLd(c.faq)} />

      <section className="hero" aria-labelledby="hero-h">
        <div className="hero-copy">
          <h1 id="hero-h">
            <span className="tc y hero-kicker">{c.kicker}</span>
            <span className="disp d1">{c.h1}</span>
          </h1>
          <p className="lede">{c.lede}</p>
          <div className="ctas"><GetApp label={c.cta} /></div>
          <p className="note">{c.note}</p>
        </div>
        <div className="devices" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div className="dev"><PhoneShot priority src="/shots/script.jpg" alt={c.alt.script} sizes="(max-width: 600px) 45vw, 240px" /></div>
          <div className="dev"><PhoneShot src="/shots/take-report.jpg" alt={c.alt.report} sizes="(max-width: 600px) 45vw, 240px" /></div>
        </div>
      </section>
      <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>{c.englishShots}</p>

      <section className="rail" aria-labelledby="read-h">
        <div className="mark"><span className="tc y">00:00:31</span><span className="lbl">Teleprompter</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head"><h2 className="disp d3" id="read-h">{c.read.h}</h2><p>{c.read.p}</p></div>
          <div className="kv">{c.read.points.map((p) => <div key={p.b}><b>{p.b}</b><span>{p.t}</span></div>)}</div>
        </div>
      </section>

      <section className="rail" aria-labelledby="fix-h">
        <div className="mark"><span className="tc y">00:01:04</span><span className="lbl">{c.fix.h.split(".")[1]?.trim() || c.fix.h}</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head"><h2 className="disp d3" id="fix-h">{c.fix.h}</h2><p>{c.fix.p}</p></div>
          <div className="cats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {c.fix.groups.map((g) => (
              <section key={g.h} aria-label={g.h}>
                <h3 style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="check" />{g.h}</h3>
                <ul className="checks" style={{ gridTemplateColumns: "1fr" }}>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="rail" aria-labelledby="write-h">
        <div className="mark"><span className="tc y">00:01:40</span><span className="lbl">Script Studio</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head"><h2 className="disp d3" id="write-h">{c.write.h}</h2><p>{c.write.p}</p></div>
          <div className="devices" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", maxWidth: 520 }}>
            <div className="dev"><PhoneShot src="/shots/modes.jpg" alt={c.alt.modes} sizes="(max-width: 600px) 45vw, 240px" /></div>
            <div className="dev"><PhoneShot src="/shots/studio.jpg" alt={c.alt.studio} sizes="(max-width: 600px) 45vw, 240px" /></div>
          </div>
        </div>
      </section>

      <section className="rail" aria-labelledby="plans-h">
        <div className="mark"><span className="tc y">00:02:10</span><span className="lbl">{c.plans.h}</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head"><h2 className="disp d3" id="plans-h">{c.plans.h}</h2><p>{c.plans.p}</p></div>
          <div className="timeline">{c.plans.steps.map((s) => <div key={s.b}><b>{s.b}</b><span>{s.t}</span></div>)}</div>
          <div className="ctas" style={{ marginTop: 20 }}><GetApp label={c.cta} /></div>
        </div>
      </section>

      <section className="rail" aria-labelledby="faq-h">
        <div className="mark"><span className="tc y">00:02:40</span><span className="lbl">FAQ</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head"><h2 className="disp d3" id="faq-h">FAQ</h2></div>
          <Faq items={c.faq} />
          <p className="muted" style={{ marginTop: 20 }}>{c.contact}</p>
        </div>
      </section>
    </div>
  );
}
