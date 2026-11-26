import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PRIVACY_URL, SUPPORT_EMAIL, TERMS_URL } from "@/content/site";
import { GUIDES, guideHref } from "@/content/guides";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="cols">
          <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
            <Link className="brand" href="/"><Image src="/icon.png" alt="" width={32} height={32} /><span className="brand-name">Zen Teleprompter<span className="brand-sub"><span className="brand-colon">:</span> Video Editor</span></span></Link>
            <p className="muted" style={{ maxWidth: "28em" }}>Read it under the lens. Record it. One tap finishes it. For iPhone and iPad, with Apple Watch as a remote.</p>
          </div>
          <div>
            <h2>Product</h2>
            <ul>
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/changelog">What&apos;s new</Link></li>
              <li><a href={APP_STORE_URL} target="_blank" rel="noopener">App Store</a></li>
            </ul>
          </div>
          <div>
            <h2>Help</h2>
            <ul>
              <li><Link href="/help">Help centre</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Write to the Founder</Link></li>
              <li><Link href="/about">About the founder</Link></li>
            </ul>
          </div>
          <div>
            <h2>Features</h2>
            <ul>{GUIDES.filter((g) => g.kind === "features").map((g) => <li key={g.slug}><Link href={guideHref(g)}>{g.h1}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Compare</h2>
            <ul>
              {GUIDES.filter((g) => g.kind === "compare").map((g) => <li key={g.slug}><Link href={guideHref(g)}>{g.h1}</Link></li>)}
              <li><Link href="/compare">All comparisons</Link></li>
            </ul>
          </div>
          <div>
            <h2>Zen Products</h2>
            <ul>
              <li><a href={PRIVACY_URL}>Privacy</a></li>
              <li><a href={TERMS_URL}>Terms</a></li>
              <li><Link href="/contact">{SUPPORT_EMAIL}</Link></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Zen Products</span>
          <span>iPhone and iPad · iOS 17 or later · 14 languages</span>
          {/* Plain links to the translated pages, so they are found by crawling as well as by hreflang. */}
          <span><Link href="/pt-br" hrefLang="pt-BR" lang="pt-BR">Português</Link> · <Link href="/es" hrefLang="es" lang="es">Español</Link></span>
        </div>
      </div>
    </footer>
  );
}
