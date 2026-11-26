import type { Metadata } from "next";
import Link from "next/link";
import { FAQ, LANGUAGES, PRICES } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { appNode, graph, websiteNode } from "@/lib/schema";
import { LANG_ALTERNATES } from "@/content/intl";
import { Faq, GetApp, Icon, JsonLd, Rail, Wave, faqLd } from "@/components/ui";
import { PhoneShot } from "@/components/devices";
import { Cycle, HeroTake, RenderPicker, ScrollStory, type StoryStep } from "@/components/motion";

// The page follows one arc: the evening editing eats (problem), one tap (relief), a finished
// video ready to post (pride). Every product line is checked against the app repo; the example
// take is labelled as one.

// The title leads with what people search ("teleprompter app for iPhone" is the top Google
// suggestion for "teleprompter app", 26 Nov 2026) and keeps the App Store name.
const DESCRIPTION = `A teleprompter app for iPhone and iPad that follows your voice. Then one tap cuts retakes, silences and ums, and adds captions, music and a title. ${PRICES.trialDays} days free.`;

export const metadata: Metadata = pageMeta({
  absoluteTitle: "Zen Teleprompter: Teleprompter App and Video Editor for iPhone",
  description: DESCRIPTION,
  path: "/",
  languages: LANG_ALTERNATES,
});

/** A line whose words light up in turn, the way the prompter turns spoken words gold. */
function Kara({ text, as: Tag = "h2", className = "" }: { text: string; as?: "h1" | "h2" | "p"; className?: string }) {
  return (
    <Tag className={`kara ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => <span key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>{w} </span>)}
    </Tag>
  );
}

const CHORES = [
  "Scrub the take for stumbles",
  "Cut every um and uh",
  "Trim the dead air",
  "Type the captions",
  "Find music that fits",
  "Design a title",
  "Pick a cover frame",
  "Write the post, three times",
];

const STEPS: StoryStep[] = [
  {
    key: "cut", tc: "00:00:31 · Cut", title: "Stumbles out.",
    body: "It reads the whole take, then cuts what you would have cut. Your last try of every line stays.",
    items: ["Retakes", "Silence at both ends, long pauses", "Um, uh and the rest"],
    screen: { kind: "img", src: "/shots/editor.webp", alt: "The editor: the video on top and the take as a line of words, 2:48 down to 2:05 after 9 fixes. Tap a word to cut it." },
  },
  {
    key: "sound", tc: "00:00:44 · Sound", title: "Sounds like you, on a good day.",
    body: "Your voice evened out, and music picked for the mood, sitting under it.",
    items: ["Uneven level, fixed", "Music under your voice", "Zooms on the lines that matter"],
    screen: { kind: "video", src: "/video/presenter-loop.mp4", alt: "The presenter's take, playing" },
  },
  {
    key: "finish", tc: "00:00:58 · Finish", title: "Looks finished.",
    body: "Karaoke captions, key phrases, a cover, an opening title, story moments and an ending card. Titles and pop-ups stay clear of your face. Each one has its own switch.",
    items: ["Karaoke captions", "Key phrases that pop as you say them", "A title in one of 12 themes"],
    screen: { kind: "render", src: "/renders/story-slate-number.jpg", alt: "A Slate story moment: a full-screen number card, drawn by the app" },
  },
  {
    key: "post", tc: "00:01:12 · Post", title: "Ready to post.",
    body: "The words for your post, written from what the video keeps, for each platform. Copy, share, done.",
    items: ["Reels", "TikTok", "YouTube"],
    screen: { kind: "img", src: "/shots/export.webp", alt: "The Export sheet: Ready, Save to Photos, Share to an app, and the words for your post for YouTube and Reels" },
  },
];

const WATCH = [
  { src: "/watch/watch-01-playing-device.webp", alt: "Apple Watch remote, playing a script at 1.2x", label: "Playing" },
  { src: "/watch/watch-02-paused-device.webp", alt: "Apple Watch remote, paused", label: "Paused" },
  { src: "/watch/watch-03-recording-device.webp", alt: "Apple Watch remote while a take records", label: "Recording" },
  { src: "/watch/watch-04-sections-device.webp", alt: "Apple Watch remote, jumping between sections", label: "Sections" },
];

const PROUD = [
  { src: "/renders/theme-09-wordByWord-title.jpg", alt: "Opening title, Word by word theme", label: "Opening title" },
  { src: "/renders/story-glow-keyword.jpg", alt: "A Glow story moment: a key word behind the presenter", label: "Story moment" },
  { src: "/renders/story-slate-list.jpg", alt: "A Slate story moment: a checked list", label: "Story moment" },
  { src: "/renders/theme-11-sticker-ending.jpg", alt: "Ending card, Sticker theme", label: "Ending card" },
];

export default function Home() {
  return (
    <div className="wrap">
      <JsonLd data={graph(websiteNode, appNode(DESCRIPTION))} />
      <JsonLd data={faqLd(FAQ)} />

      <section className="hero" aria-labelledby="hero-h">
        <div className="hero-copy">
          <h1 id="hero-h">
            <span className="tc y hero-kicker">Teleprompter app and video editor for iPhone</span>
            <span className="disp d1">Record once. <s>Edit all night.</s> One tap.</span>
          </h1>
          <p className="lede">
            Read your script right under the camera. Then Fix everything cuts the stumbles and the dead air, and finishes the video: captions, music, a title and the words for your post.
          </p>
          <div className="ctas">
            <GetApp />
            <Link className="ghost" href="/help/fix-everything">What it changes <Icon name="arrow-right" /></Link>
          </div>
          <p className="note">{PRICES.trialDays} days free, then {PRICES.yearly} a year or {PRICES.monthly} a month. iPhone and iPad.</p>
        </div>
        <HeroTake />
      </section>

      <section className="rail rv" aria-labelledby="evening-h">
        <div className="mark"><span className="tc y">00:00:12</span><span className="lbl">The evening</span></div>
        <div className="evening">
          <div className="head">
            <h2 className="disp d3" id="evening-h">The part nobody films.</h2>
            <p>Recording is the quick part. Then comes everything after it.</p>
          </div>
          <ol className="strike-list">
            {CHORES.map((c, i) => <li key={c} style={{ ["--i" as string]: i }}><span>{c}</span></li>)}
          </ol>
          <Kara text="One tap does all of it." className="disp d3 relief" />
        </div>
      </section>

      <section className="rail rv" aria-labelledby="fix-h">
        <div className="mark"><span className="tc y">00:00:31</span><span className="lbl">Fix everything</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head">
            <h2 className="disp d3" id="fix-h">One tap. Four jobs done.</h2>
            <p>Each change is a setting with its own switch. Anything you already set stays yours.</p>
          </div>
          <ScrollStory steps={STEPS} />
        </div>
      </section>

      <section className="rail rv" aria-labelledby="edit-h">
        <div className="mark"><span className="tc y">00:01:05</span><span className="lbl">The editor</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head">
            <h2 className="disp d3" id="edit-h">Your take, as words.</h2>
            <p>The video sits on top and the take runs under it as a line of words. Change anything Fix everything did, or do it yourself. On iPhone and iPad.</p>
          </div>
          <div className="devices">
            <div className="dev rv" style={{ ["--d" as string]: 0 }}><PhoneShot src="/shots/styles.webp" alt="Pick your style: the title on the take, styles Slate, Glow, Clapper and Outline, and colours" /><p className="cap">One style for title, key phrases and ending.</p></div>
            <div className="dev rv" style={{ ["--d" as string]: 1 }}><PhoneShot src="/shots/spelling.webp" alt="Fix spelling: a misheard name held on the track and typed right, with Fix everywhere in this take" /><p className="cap">Hold a word to fix its spelling.</p></div>
            <div className="dev rv" style={{ ["--d" as string]: 2 }}><PhoneShot src="/shots/cinema.webp" alt="The full-screen player showing the finished take with a key phrase and captions" /><p className="cap">Full screen, captions true to size.</p></div>
          </div>
        </div>
      </section>

      <Rail tc="00:01:20" label="Make it yours" title="Twelve looks. Your words." lead="Tap a theme. Every picture below was drawn by the app over a real take." id="looks">
        <RenderPicker />
      </Rail>

      <section className="rail rv" aria-labelledby="read-h">
        <div className="mark"><span className="tc y">00:01:44</span><span className="lbl">Teleprompter</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head">
            <h2 className="disp d3" id="read-h">Read without looking away.</h2>
            <p>The line you are reading sits just under the camera, so your eyes stay on the lens.</p>
          </div>
          <div className="devices">
            <div className="dev rv" style={{ ["--d" as string]: 0 }}><PhoneShot src="/shots/script.jpg" alt="A script open and ready to read, with Start teleprompter" /><p className="cap">Your script, ready to read.</p></div>
            <div className="dev rv" style={{ ["--d" as string]: 1 }}><PhoneShot src="/shots/prompter.webp" alt="The teleprompter mid-read with Follow my voice listening: the words already said turn gold" /><p className="cap">It scrolls as you speak.</p></div>
            <div className="dev rv" style={{ ["--d" as string]: 2 }}><Cycle device="watch" frames={WATCH} sizes="200px" /></div>
          </div>
          <div className="kv" style={{ marginTop: 32 }}>
            <div><b>Follow my voice</b><span>Glides when you speak, waits when you stop. On from the start, recognised on your iPhone.</span></div>
            <div><b>Speed</b><span>0.5x to 2x in quarter steps.</span></div>
            <div><b>Remotes</b><span>Apple Watch, and Bluetooth teleprompter remotes. Press twice to change chapter.</span></div>
            <div><b>Languages</b><span><b className="count" data-count={LANGUAGES.length}>{LANGUAGES.length}</b>, and it listens in your script&apos;s language.</span></div>
          </div>
          <Wave seed={21} cuts={[[18, 26], [52, 57]]} height={44} live />
        </div>
      </section>

      <section className="rail rv" aria-labelledby="write-h">
        <div className="mark"><span className="tc y">00:02:05</span><span className="lbl">Write</span></div>
        <div style={{ minWidth: 0 }}>
          <div className="head">
            <h2 className="disp d3" id="write-h">Start from a page, or from a line.</h2>
          </div>
          <div className="writes">
            <div className="rv"><PhoneShot src="/shots/import.jpg" alt="The Add script sheet: New script, Import text file, From a web page" /></div>
            <div className="rv write-copy" style={{ ["--d" as string]: 1 }}>
              <h3><Icon name="book-open" />Import</h3>
              <p className="muted">Text, RTF, PDF or Markdown, or the article from a web page.</p>
              <h3><Icon name="sparkle" />AI Script Studio</h3>
              <p className="muted">Say what you are writing, pick a length and a tone, and get a script fitted to your reading pace. Off until you agree to it.</p>
            </div>
            <div className="rv" style={{ ["--d" as string]: 2 }}><PhoneShot src="/shots/studio.jpg" alt="AI Script Studio with a brief, a length and a tone" /></div>
          </div>
        </div>
      </section>

      <section className="proud rv" aria-labelledby="proud-h">
        <div className="proud-copy">
          <span className="tc y">00:02:31 · Wrap</span>
          <Kara text="Your next take, finished tonight." as="h2" className="disp d2" />
          <p className="lede" id="proud-h">Captioned, titled, with music and the words for your post. All on your phone.</p>
          <div className="platforms"><span>Reels</span><span>TikTok</span><span>YouTube</span></div>
          <div className="ctas"><GetApp /></div>
        </div>
        <Cycle device="phone" frames={PROUD} contain interval={2400} sizes="(max-width: 600px) 60vw, 280px" />
      </section>

      <Rail tc="00:02:48" label="Pricing" title={`${PRICES.trialDays} days free.`} id="pricing">
        <div className="grid2">
          <div className="plan best rv"><span className="lbl">Yearly <span className="chip" style={{ marginLeft: 6 }}>Save {PRICES.yearlySaving}</span></span><div className="price">{PRICES.yearly}</div><p className="muted">a year after the trial</p></div>
          <div className="plan rv" style={{ ["--d" as string]: 1 }}><span className="lbl">Monthly</span><div className="price">{PRICES.monthly}</div><p className="muted">a month after the trial</p></div>
        </div>
        <div className="timeline rv">
          <div><b>Today</b><span>Everything unlocked</span></div>
          <div><b>Day 2</b><span>We remind you</span></div>
          <div><b>Day 3</b><span>Your plan starts</span></div>
        </div>
        <p style={{ marginTop: 12 }}><Link href="/pricing" style={{ color: "var(--fill)" }}>See what&apos;s included <Icon name="arrow-right" /></Link></p>
      </Rail>

      <Rail tc="00:03:00" label="FAQ" title="Questions." id="faq">
        <Faq items={FAQ} />
      </Rail>
    </div>
  );
}
