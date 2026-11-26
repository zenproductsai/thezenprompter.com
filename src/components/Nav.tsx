"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GetApp, Icon } from "./ui";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/help", label: "Help" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "What's new" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  // Close the phone menu after a link is followed, or it stays open over the next page.
  useEffect(() => { if (menu.current) menu.current.open = false; }, [path]);
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  return (
    <header className="top">
      <div className="wrap nav">
        <Link className="brand" href="/" aria-label="Zen Teleprompter: Video Editor, home">
          <Image src="/icon.png" alt="" width={32} height={32} priority />
          <span className="brand-name">Zen Teleprompter<span className="brand-sub"><span className="brand-colon">:</span> Video Editor</span></span>
        </Link>
        <nav className="links" aria-label="Main">
          {LINKS.map((l) => <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>)}
        </nav>
        <GetApp label="3 days free" small />
        <details className="menu" ref={menu}>
          <summary aria-label="Menu"><Icon name="list" /></summary>
          <nav className="panel" aria-label="Main">
            {LINKS.map((l) => <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>)}
            <GetApp label="3 days free" small />
          </nav>
        </details>
      </div>
    </header>
  );
}
