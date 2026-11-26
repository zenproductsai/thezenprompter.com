import Link from "next/link";
import type { Block, Inline } from "@/content/help";
import type { Post } from "@/content/posts";
import { PhoneShot } from "./devices";
import { Cycle } from "./motion";

function Parts({ parts }: { parts: Inline[] }) {
  return <>{parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p.href.startsWith("/") ? <Link key={i} href={p.href}>{p.text}</Link> : <a key={i} href={p.href}>{p.text}</a>))}</>;
}

/** Renders article content. Screenshots are real files from public/shots. */
export default function Blocks({ blocks }: { blocks: Post["blocks"] | Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p": return <p key={i}><Parts parts={b.parts} /></p>;
          case "h2": return <h2 key={i} id={b.id}>{b.text}</h2>;
          case "list": return <ul key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
          case "steps": return <ol key={i} className="steps">{b.items.map((s) => <li key={s.title}><b>{s.title}</b><span>{s.body}</span></li>)}</ol>;
          case "note": return <div key={i} className="note"><b>{b.title}. </b>{b.body}</div>;
          case "shot": return (
            <figure key={i}>
              {b.src === "/shots/watch.jpg"
                ? <Cycle device="watch" sizes="220px" frames={[
                    { src: "/watch/watch-01-playing-device.webp", alt: "Apple Watch remote, playing", label: "Playing" },
                    { src: "/watch/watch-02-paused-device.webp", alt: "Apple Watch remote, paused", label: "Paused" },
                    { src: "/watch/watch-03-recording-device.webp", alt: "Apple Watch remote while a take records", label: "Recording" },
                    { src: "/watch/watch-04-sections-device.webp", alt: "Apple Watch remote, sections", label: "Sections" },
                  ]} />
                : <PhoneShot src={b.src} alt={b.alt} sizes="260px" />}
              <figcaption className="cap">{b.caption}</figcaption>
            </figure>
          );
          case "table": return (
            <div key={i} className="tbl"><table>
              <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r, k) => <tr key={k} className={k === b.mark ? "mark" : undefined}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
            </table></div>
          );
        }
      })}
    </>
  );
}

export const headingsOf = (blocks: { type: string; id?: string; text?: string }[]) =>
  blocks.filter((b) => b.type === "h2").map((b) => ({ id: b.id!, text: b.text! }));
