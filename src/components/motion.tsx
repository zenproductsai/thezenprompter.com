"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Phone } from "./devices";
import { Icon } from "./ui";

/* Motion values follow the references measured on 16 Sep 2026: short, decisive, ease-out
   (cubic-bezier(.23,1,.32,1), 200 to 450 ms). Long 600 ms+ reveals read as a template. */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One observer for the whole site. It adds `.in` to `.rv` (reveal), `.kara` (karaoke line),
 * `.strike-list` and `[data-count]` (count-up) when they come into view, and toggles `.on` on
 * `[data-live]` (looping waveforms) so nothing animates off screen. Content is visible without
 * JavaScript: the hidden starting states only apply under `html.js`.
 */
export function Observer() {
  const path = usePathname();
  useEffect(() => {
    const rm = reduced();
    const once = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        once.unobserve(el);
        const to = el.dataset.count;
        if (to && !rm) countUp(el, Number(to));
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    const live = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).classList.toggle("on", e.isIntersecting && !rm);
    });
    document.querySelectorAll(".rv, .kara, .strike-list, [data-count]").forEach((el) => once.observe(el));
    document.querySelectorAll("[data-live]").forEach((el) => live.observe(el));
    return () => { once.disconnect(); live.disconnect(); };
  }, [path]);
  return null;
}

function countUp(el: HTMLElement, to: number) {
  const start = performance.now(), dur = 700;
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / dur);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ------------------------------------------------------------------ hero */

const TAKE: { t: string; parts: (string | { cut: string; lead?: boolean })[]; collapse?: boolean }[] = [
  { t: "00:00.0", parts: ["A dollar invested today is worth more", { cut: "um,", lead: true }, " than a dollar next year."] },
  { t: "00:04.6", parts: [{ cut: "Long pause" }], collapse: true },
  { t: "00:06.4", parts: [{ cut: "Keep costs below." }, " ", { cut: "Keep costs slow." }], collapse: true },
  { t: "00:09.1", parts: ["Keep costs low."] },
  { t: "00:10.7", parts: ["And let the", { cut: "uh,", lead: true }, " time do the work."] },
];
const DONE = ["Captions", "Music", "Cover", "Title", "Post words"];

/**
 * The product story in five seconds: the example take plays line by line, each stumble is struck
 * as the playhead reaches it, Fix everything presses itself, the cuts collapse, the length rolls
 * from 1:27 to 1:23 (what the app's take report measured on this take) and the phone shows the
 * finished video. The server renders the readable starting state; reduced motion jumps to the end.
 */
export function HeroTake() {
  const [step, setStep] = useState(-1); // -1 idle, 0..4 rows, 5 press, 6 collapse, 7 done
  const [len, setLen] = useState(87);
  const timers = useRef<number[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const play = useCallback(() => {
    clear();
    if (reduced()) { setStep(8); setLen(83); return; }
    setStep(-1); setLen(87);
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    [0, 1, 2, 3, 4].forEach((i) => at(350 + i * 430, () => setStep(i)));
    at(2600, () => setStep(5));
    at(2950, () => setStep(6));
    [86, 85, 84, 83].forEach((v, i) => at(3050 + i * 140, () => setLen(v)));
    at(3500, () => setStep(7));
  }, []);

  useEffect(() => { play(); return clear; }, [play]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const struck = (row: number) => step >= row;
  const collapsed = step >= 6 && step !== 8;
  const done = step >= 7;
  return (
    <div className={`hero-take s${step}${collapsed ? " collapsed" : ""}${done ? " done" : ""}`}>
      <div className="take" role="figure" aria-label="An example take: retakes, filler words and a long pause are cut">
        <div className="th"><span className="lbl">Example take</span><span className="lbl">{done ? "After" : "Before"}</span></div>
        {TAKE.map((r, i) => (
          <div key={r.t} className={`tl${step === i ? " now" : ""}${r.collapse ? " col" : ""}`}>
            <span className="tc">{r.t}</span>
            <span>{r.parts.map((p, k) => typeof p === "string" ? <span key={k}>{p}</span> : <del key={k} className={`${struck(i) ? "x" : ""}${p.lead ? " lead" : ""}`}>{p.cut}</del>)}</span>
          </div>
        ))}
        <div className="tf">
          <span className="tc">{done ? "5 cuts. Your words kept." : "Stumbles, ums, dead air"}</span>
          <button type="button" className={`key sm fixkey${step === 5 ? " pressed" : ""}`} onClick={play} aria-label={done ? "Play the example again" : "Fix everything"}>
            <Icon name={done ? "arrow-left" : "sparkle"} />{done ? "Replay" : "Fix everything"}
          </button>
        </div>
      </div>
      <div className="hero-phone">
        <Phone label={done ? "The finished take: the presenter with a Slate opening title, drawn by the app" : "The app's take report for this take"}>
          <Image src="/shots/take-report.jpg" alt="" fill sizes="(max-width: 600px) 56vw, 250px" className="fill layer before" />
          <Image src="/renders/theme-02-slate-title.jpg" alt="" fill sizes="(max-width: 600px) 56vw, 250px" className="fill contain layer after" />
        </Phone>
        <div className="len">
          <span className="lbl">Length</span>
          <b className="num" aria-live="off">{fmt(len)}</b>
          {done && <span className="was">was 1:27</span>}
        </div>
        <ul className="ticks" aria-label="Added by Fix everything">
          {DONE.map((d, i) => <li key={d} style={{ transitionDelay: `${i * 90}ms` }}><Icon name="check" />{d}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- cyclers */

type Frame = { src: string; alt: string; label?: string };

/** Crossfades through real screens. Auto-advances only while on screen and without reduced motion;
 *  the dots and a tap on the device step through by hand. */
export function Cycle({ frames, device, interval = 2600, sizes = "240px", contain = false, priority = false }: {
  frames: Frame[]; device: "phone" | "watch"; interval?: number; sizes?: string; contain?: boolean;
  /** Load the first frame eagerly when the device is above the fold (it is then the page's LCP). */
  priority?: boolean;
}) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    if (box.current) io.observe(box.current);
    if (reduced()) setAuto(false);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => { if (visible.current) setI((x) => (x + 1) % frames.length); }, interval);
    return () => clearInterval(t);
  }, [auto, frames.length, interval]);
  const go = (k: number) => { setAuto(false); setI(k); };
  const layers = frames.map((f, k) => (
    <Image key={f.src} src={f.src} alt={k === i ? f.alt : ""} aria-hidden={k !== i} fill sizes={sizes} priority={priority && k === 0} className={`fill layer${contain ? " contain" : ""}${k === i ? " on" : ""}`} />
  ));
  return (
    <div className="cycle" ref={box}>
      <button type="button" className="cycle-hit" onClick={() => go((i + 1) % frames.length)} aria-label={`Show the next screen: ${frames[(i + 1) % frames.length].label ?? ""}`}>
        {device === "phone" ? <Phone>{layers}</Phone> : <div className="watch-real">{layers}</div>}
      </button>
      <div className="dots" role="group" aria-label="Screens">
        {frames.map((f, k) => (
          <button key={f.src} type="button" aria-label={f.label ?? `Screen ${k + 1}`} aria-pressed={k === i} onClick={() => go(k)}><span /></button>
        ))}
      </div>
      {frames[i].label && <p className="cap" aria-live="polite">{frames[i].label}</p>}
    </div>
  );
}

/* -------------------------------------------------------- render picker */

const THEMES: [string, string][] = [
  ["01-glass", "Glass"], ["02-slate", "Slate"], ["03-clapper", "Clapper"], ["04-outline", "Outline"],
  ["05-highlighter", "Highlighter"], ["06-lowerThird", "Lower third"], ["07-stack", "Stack"], ["08-frosted", "Frosted"],
  ["09-wordByWord", "Word by word"], ["10-serif", "Serif"], ["11-sticker", "Sticker"], ["12-typewriter", "Typewriter"],
];
const MOMENTS: [string, string][] = [["number", "Number"], ["phrase", "Key line"], ["list", "List"], ["data", "Chart"], ["keyword", "Key word"], ["cta", "Call to action"]];

/** Every picture here was drawn by the app's own export renderer over the presenter's take. */
export function RenderPicker() {
  const [mode, setMode] = useState<"themes" | "moments">("themes");
  const [theme, setTheme] = useState("02-slate");
  const [part, setPart] = useState<"title" | "ending">("title");
  const [style, setStyle] = useState<"slate" | "glow">("slate");
  const [moment, setMoment] = useState("number");
  const src = mode === "themes" ? `/renders/theme-${theme}-${part}.jpg` : `/renders/story-${style}-${moment}.jpg`;
  const name = mode === "themes" ? `${THEMES.find((t) => t[0] === theme)![1]} ${part === "title" ? "opening title" : "ending card"}` : `${style === "slate" ? "Slate" : "Glow"} story moment: ${MOMENTS.find((m) => m[0] === moment)![1].toLowerCase()}`;
  // Keep the last picture under the new one so the change is a crossfade, never a blank frame.
  const [shown, setShown] = useState([src]);
  useEffect(() => { setShown((s) => (s[s.length - 1] === src ? s : [...s.slice(-1), src])); }, [src]);
  return (
    <div className="picker">
      <div className="picker-phone">
        <Phone label={`${name}, drawn by the app`}>
          {shown.map((s, k) => <Image key={s} src={s} alt="" fill sizes="(max-width: 600px) 64vw, 300px" className={`fill contain fade${k === shown.length - 1 ? " top" : ""}`} />)}
        </Phone>
        <p className="cap" aria-live="polite">{name}</p>
      </div>
      <div className="picker-ui">
        <div className="seg" role="tablist" aria-label="Show">
          <button type="button" role="tab" aria-selected={mode === "themes"} onClick={() => setMode("themes")}>Title themes <b>12</b></button>
          <button type="button" role="tab" aria-selected={mode === "moments"} onClick={() => setMode("moments")}>Story moments</button>
        </div>
        {mode === "themes" ? (
          <>
            <p className="muted">An opening title and an ending card. The AI picks a theme for the video; you can change it.</p>
            <div className="chips" role="group" aria-label="Theme">
              {THEMES.map(([id, label]) => <button key={id} type="button" className="chipbtn" aria-pressed={theme === id} onClick={() => setTheme(id)}>{label}</button>)}
            </div>
            <div className="seg small" role="group" aria-label="Part">
              <button type="button" aria-pressed={part === "title"} onClick={() => setPart("title")}>Opening title</button>
              <button type="button" aria-pressed={part === "ending"} onClick={() => setPart("ending")}>Ending card</button>
            </div>
          </>
        ) : (
          <>
            <p className="muted">Your numbers, key lines and calls to action, on screen as you say them. Only words you actually said.</p>
            <div className="seg small" role="group" aria-label="Style">
              <button type="button" aria-pressed={style === "slate"} onClick={() => setStyle("slate")}>Slate</button>
              <button type="button" aria-pressed={style === "glow"} onClick={() => setStyle("glow")}>Glow</button>
            </div>
            <div className="chips" role="group" aria-label="Moment">
              {MOMENTS.map(([id, label]) => <button key={id} type="button" className="chipbtn" aria-pressed={moment === id} onClick={() => setMoment(id)}>{label}</button>)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- scroll story */

export type StoryStep = { key: string; tc: string; title: string; body: string; items: string[]; screen: { kind: "img" | "render" | "video"; src: string; alt: string } };

function Screen({ s, active }: { s: StoryStep["screen"]; active: boolean }) {
  if (s.kind === "video") return <LazyVideo src={s.src} poster="/video/presenter-poster.jpg" label={s.alt} active={active} />;
  return <Image src={s.src} alt={active ? s.alt : ""} fill sizes="(max-width: 960px) 56vw, 300px" className={`fill${s.kind === "render" ? " contain" : ""}`} />;
}

/** Desktop: the phone stays pinned while the steps scroll past and its screen follows them.
 *  Phones: each step carries its own phone, in order, with no pinning or scroll capture. */
export function ScrollStory({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="story">
      <div className="story-pin" aria-hidden="true">
        <Phone>
          {steps.map((s, i) => <div key={s.key} className={`layer${i === active ? " on" : ""}`}><Screen s={s.screen} active={i === active} /></div>)}
        </Phone>
        <div className="story-dots">{steps.map((s, i) => <span key={s.key} className={i === active ? "on" : ""} />)}</div>
      </div>
      <ol className="story-steps">
        {steps.map((s, i) => (
          <li key={s.key} data-i={i} ref={(el) => { refs.current[i] = el; }} className={i === active ? "on" : ""}>
            <span className="tc y">{s.tc}</span>
            <h3 className="disp">{s.title}</h3>
            <p>{s.body}</p>
            <ul>{s.items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}</ul>
            <div className="story-inline"><Phone><Screen s={s.screen} active /></Phone></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Muted, looping, never loaded until near the screen, never autoplayed under reduced motion. */
export function LazyVideo({ src, poster, label, active = true }: { src: string; poster: string; label: string; active?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [rm, setRm] = useState(false);
  useEffect(() => { setRm(reduced()); }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced()) return;
    const io = new IntersectionObserver(([e]) => {
      // The poster is set here too, not in the markup: a poster attribute downloads at page load
      // even with preload="none", and it held back the headline's paint on a slow phone.
      if (e.isIntersecting && active) { if (!v.poster) v.poster = poster; if (!v.src) v.src = src; v.play().catch(() => {}); } else v.pause();
    }, { rootMargin: "200px" });
    io.observe(v);
    return () => io.disconnect();
  }, [src, poster, active]);
  // Under reduced motion it never plays, so the poster is shown from the start.
  return <video ref={ref} className="fill" poster={rm ? poster : undefined} muted loop playsInline preload="none" aria-label={label} />;
}
