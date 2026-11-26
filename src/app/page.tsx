import Link from "next/link";
import { FAQ, FIX, PRICES, THEMES } from "@/content/site";
import { Faq, GetApp, Icon, JsonLd, Rail, Shot, Wave, faqLd } from "@/components/ui";

// An illustrative take, labelled as one. The stumble is a real one from a take filmed with the app
// ("Keep costs low." said three times, heard as below, slow, low); the other lines are examples.
const TAKE: [string, React.ReactNode][] = [
  ["00:00.0", <>A dollar invested today is worth more <del>um,</del> than a dollar next year.</>],
  ["00:04.6", <span className="gap" key="g">Long pause</span>],
  ["00:06.4", <><del>Keep costs below.</del> <del>Keep costs slow.</del></>],
  ["00:09.1", <>Keep costs low.</>],
  ["00:10.7", <>And let the <del>uh,</del> time do the work.</>],
];

export default function Home() {
  return (
    <div className="wrap">
      <JsonLd data={faqLd(FAQ)} />
      <section className="hero" aria-labelledby="hero-h">
        <div>
          <span className="tc y">00:00:00</span>
          <h1 className="disp d1" id="hero-h" style={{ marginTop: 12 }}>
            Record once. <s>Edit all night.</s> One tap.
          </h1>
          <p className="lede">
            Read your script right under the camera. Then Fix everything cuts the retakes, silences and ums, and adds captions, music, a title and the words for your post.
          </p>
          <div className="ctas">
            <GetApp />
            <Link className="ghost" href="/help/fix-everything">What it changes <Icon name="arrow-right" /></Link>
          </div>
          <p className="note">{PRICES.trialDays} days free, then {PRICES.yearly} a year or {PRICES.monthly} a month. iPhone and iPad.</p>
        </div>
        <div>
          <div className="take" role="figure" aria-label="An example take with the retakes, filler words and a long pause struck out">
            <div className="th"><span className="lbl">Example take</span><span className="lbl">Before</span></div>
            {TAKE.map(([t, x]) => <div className="tl" key={t}><span className="tc">{t}</span><span>{x}</span></div>)}
            <div className="tf"><span className="tc">5 cuts in this example</span><span className="key sm" aria-hidden="true"><Icon name="sparkle" />Fix everything</span></div>
          </div>
          <div className="pair">
            <Shot className="phone" src="/shots/take-report.jpg" alt="The app's take report: cuts, pauses and key moments on the waveform, and the take going from 1:27 to 1:23" ratio="900 / 1956" priority sizes="(max-width: 600px) 70vw, 240px" />
            <div className="bin">
              <span className="lbl">In the app</span>
              <p style={{ fontSize: 15 }}>The take report shows what it found and the new length before anything changes.</p>
              <ul>
                <li><b>Cut</b><span>Silence at the ends, long pauses</span></li>
                <li><b>Sound</b><span>Uneven level</span></li>
                <li><b>Finish</b><span>Look, captions, ending</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Rail tc="00:00:12" label="The take" title="Three steps, one phone." id="steps">
        <div className="track">
          <div><span className="tc">01 · Write</span><h3 className="disp">Script</h3><p className="muted">Write it, import a file or a web page, or ask AI Script Studio for a draft.</p><Wave seed={3} height={28} /></div>
          <div><span className="tc">02 · Read</span><h3 className="disp">Record</h3><p className="muted">The line you read sits under the lens. Follow my voice keeps up with you.</p><Wave seed={7} cuts={[[20, 30], [60, 66]]} height={28} /></div>
          <div><span className="tc">03 · Finish</span><h3 className="disp">One tap</h3><p className="muted">Fix everything. Copy the post words. Share.</p><Wave seed={7} height={28} /></div>
        </div>
      </Rail>

      <Rail tc="00:00:31" label="Fix everything" title="What one tap does." lead="Each change is a setting with its own switch. Anything you already set stays yours." id="fix">
        <div className="bins">
          <div className="bin"><h3><Icon name="scissors" />Cut</h3><ul>{FIX.cut.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}</ul><Wave seed={11} cuts={[[12, 20], [44, 52], [70, 74]]} height={40} /></div>
          <div className="bin"><h3><Icon name="waveform" />Sound</h3><ul>{FIX.sound.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}</ul></div>
          <div className="bin"><h3><Icon name="sparkle" />Finish</h3><ul>{FIX.finish.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}</ul></div>
          <div className="bin"><h3><Icon name="list-checks" />Writes</h3><ul>{FIX.write.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}</ul>
            <span className="lbl" style={{ marginTop: 6 }}>Title themes · 12</span>
            <div className="themes">{THEMES.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        </div>
      </Rail>

      <Rail tc="00:00:58" label="Teleprompter" title="Read without looking away." id="read">
        <div className="split">
          <div>
            <Shot className="phone" src="/shots/script.jpg" alt="A script open and ready to read, with Start teleprompter" ratio="900 / 1956" sizes="(max-width: 960px) 50vw, 300px" />
            <p className="cap">Your script, ready to read.</p>
          </div>
          <div className="kv">
            <div><b>Reading line</b><span>Just under the camera, so your eyes stay on the lens.</span></div>
            <div><b>Follow my voice</b><span>Moves when you speak, waits when you stop. Recognised on your iPhone.</span></div>
            <div><b>Two setups</b><span>The front camera with your script on top, or mirrored for teleprompter glass.</span></div>
            <div><b>Speed</b><span>0.5x to 2x in quarter steps.</span></div>
            <div><b>Remotes</b><span>Apple Watch and Bluetooth teleprompter remotes. Press twice to change chapter.</span></div>
            <div><b>Languages</b><span>14. Follow my voice listens in your script's language.</span></div>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <Shot className="phone" src="/shots/modes.jpg" alt="Choosing the setup: teleprompter mirrored for glass, or the front camera with the script on top" ratio="900 / 1956" sizes="220px" />
              <p className="cap">Two setups, one tap.</p>
            </div>
            <div>
              <Shot src="/shots/watch.jpg" alt="The Apple Watch remote" ratio="416 / 496" sizes="220px" />
              <p className="cap">The Watch remote.</p>
            </div>
          </div>
        </div>
      </Rail>

      <Rail tc="00:01:12" label="Write" title="Start from a page, or from a line." id="write">
        <div className="grid2" style={{ alignItems: "start" }}>
          <div className="bin">
            <h3><Icon name="book-open" />Import</h3>
            <p className="muted">Text, RTF, PDF or Markdown, or the article text from a web page. Notes in curly braces are dimmed and never read aloud.</p>
            <Shot src="/shots/import.jpg" alt="The Add script sheet: New script, Import text file, From a web page" ratio="4 / 3" pos="50% 100%" sizes="(max-width: 600px) 100vw, 560px" />
          </div>
          <div className="bin">
            <h3><Icon name="sparkle" />AI Script Studio</h3>
            <p className="muted">Say what you are writing, pick a length and a tone, and get a script fitted to your reading pace. Off until you agree to it.</p>
            <Shot src="/shots/studio.jpg" alt="AI Script Studio with a brief, length and tone" ratio="4 / 3" pos="50% 30%" sizes="(max-width: 600px) 100vw, 560px" />
          </div>
        </div>
      </Rail>

      <Rail tc="00:01:20" label="Pricing" title={`${PRICES.trialDays} days free.`} id="pricing">
        <div className="grid2">
          <div className="plan best"><span className="lbl">Yearly <span className="chip" style={{ marginLeft: 6 }}>Save {PRICES.yearlySaving}</span></span><div className="price">{PRICES.yearly}</div><p className="muted">a year after the trial</p></div>
          <div className="plan"><span className="lbl">Monthly</span><div className="price">{PRICES.monthly}</div><p className="muted">a month after the trial</p></div>
        </div>
        <div className="timeline">
          <div><b>Today</b><span>Everything unlocked</span></div>
          <div><b>Day 2</b><span>We remind you</span></div>
          <div><b>Day 3</b><span>Your plan starts</span></div>
        </div>
        <p style={{ marginTop: 20 }}><Link href="/pricing" style={{ color: "var(--fill)" }}>See what's included <Icon name="arrow-right" /></Link></p>
      </Rail>

      <Rail tc="00:01:27" label="FAQ" title="Questions." id="faq">
        <Faq items={FAQ} />
      </Rail>

      <div className="band">
        <h2 className="disp d3">Your next take, finished tonight.</h2>
        <GetApp />
      </div>
    </div>
  );
}
