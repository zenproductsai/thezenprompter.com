import Image from "next/image";
import Link from "next/link";
import { PATHS, type IconName } from "./icon-paths";
import { APP_STORE_URL, SITE_URL } from "@/content/site";

export function Icon({ name, className = "ic" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** The App Store link, as the site's main call to action. */
export function GetApp({ label = "Start 3 free days", small = false }: { label?: string; small?: boolean }) {
  return (
    <a className={`key${small ? " sm" : ""}`} href={APP_STORE_URL} target="_blank" rel="noopener">
      <Icon name="download-simple" />
      {label}
    </a>
  );
}

/** A real screenshot from public/shots, cropped by its box. Never a redrawn app screen. */
export function Shot({ src, alt, ratio = "9 / 16", pos = "top", priority = false, sizes = "(max-width: 960px) 50vw, 300px", className = "" }: {
  src: string; alt: string; ratio?: string; pos?: string; priority?: boolean; sizes?: string; className?: string;
}) {
  return (
    <div className={`shot ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: pos }} />
    </div>
  );
}

/** A deterministic waveform. Yellow bands mark cuts, the way the app's take report marks them. */
export function Wave({ seed, cuts = [], height = 56, label, live = false }: { seed: number; cuts?: [number, number][]; height?: number; label?: string; live?: boolean }) {
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const n = 90, w = 1000 / n;
  const bars = Array.from({ length: n }, (_, k) => {
    const cut = cuts.some(([a, b]) => k >= a && k < b);
    const amp = cut ? 0.12 + rnd() * 0.1 : 0.25 + rnd() * 0.7;
    const bh = amp * height * 0.9;
    return <rect key={k} style={{ ["--i" as string]: k }} x={k * w + 1} y={(height - bh) / 2} width={w - 3} height={bh} rx={1} fill={cut ? "#85857d" : "#f4f4f1"} opacity={cut ? 0.45 : 0.85} />;
  });
  return (
    <svg className="wave" data-live={live ? "" : undefined} style={{ height }} viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {cuts.map(([a, b]) => (
        <g key={a}>
          <rect x={a * w} y={0} width={(b - a) * w} height={height} fill="#ffdd00" opacity={0.18} />
          <rect x={a * w} y={0} width={3} height={height} fill="#ffdd00" />
          <rect x={b * w - 3} y={0} width={3} height={height} fill="#ffdd00" />
        </g>
      ))}
      {bars}
    </svg>
  );
}

/** A section laid out like a point on the timeline: timecode and label on the left. */
export function Rail({ tc, label, title, lead, children, id }: { tc: string; label: string; title: string; lead?: string; children: React.ReactNode; id?: string }) {
  return (
    <section className="rail rv" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className="mark"><span className="tc y">{tc}</span><span className="lbl">{label}</span></div>
      <div style={{ minWidth: 0 }}>
        <div className="head">
          <h2 className="disp d3" id={id ? `${id}-h` : undefined}>{title}</h2>
          {lead && <p>{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export type Crumb = { name: string; href: string };

/** Visible breadcrumbs plus BreadcrumbList schema, from one list so they never disagree. */
export function Crumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}${c.href === "/" ? "" : c.href}` })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <nav className="crumbs" aria-label="Breadcrumb">
        {all.map((c, i) => (
          <span key={c.href} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            {i > 0 && <Icon name="caret-right" />}
            {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
          </span>
        ))}
      </nav>
    </>
  );
}

export function JsonLd({ data }: { data: object }) {
  // Escaping "<" keeps a "</script>" inside any string from ending the tag early.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}<Icon name="plus" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqLd(items: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}
