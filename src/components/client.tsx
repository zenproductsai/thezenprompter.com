"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "./ui";

/** Shows the address as selectable text with a Copy button. Nothing is sent anywhere. */
export function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <span className="mail">{email}</span>
      <button type="button" className="copy" onClick={() => {
        navigator.clipboard?.writeText(email).then(() => { setDone(true); setTimeout(() => setDone(false), 2000); }, () => {});
      }}>
        <Icon name={done ? "check" : "copy"} />
        <span aria-live="polite">{done ? "Copied" : "Copy address"}</span>
      </button>
    </div>
  );
}

export type HelpEntry = { href: string; title: string; summary: string; words: string };

/** Filters the help articles as you type. Everything is already on the page, so nothing is sent. */
export function HelpSearch({ entries }: { entries: HelpEntry[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return entries.filter((e) => terms.every((t) => e.words.includes(t))).slice(0, 6);
  }, [q, entries]);
  return (
    <div className="search">
      <label>
        <Icon name="magnifying-glass" />
        <span className="sr-only">Search help</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search help, for example captions" autoComplete="off" />
      </label>
      {q.trim() && (
        <ul className="hits" aria-live="polite">
          {hits.length ? hits.map((h) => (
            <li key={h.href}><Link href={h.href}><b>{h.title}</b><span>{h.summary}</span></Link></li>
          )) : <li className="none">No article matches. Try another word, or <Link href="/contact" style={{ color: "var(--fill)" }}>write to the Founder</Link>.</li>}
        </ul>
      )}
    </div>
  );
}
