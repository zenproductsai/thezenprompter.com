import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { ViewTransition } from "react";
import Nav from "@/components/Nav";
import { Observer } from "@/components/motion";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { APP_ID, SITE_NAME, SITE_URL } from "@/content/site";
import { graph, orgNode } from "@/lib/schema";
import "./globals.css";
import "./motion.css";

// The app's own faces: Barlow Condensed capitals for arrival headings, Inter for everything read.
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--font-text", display: "swap" });

// Defaults every page inherits. Each page sets its own title, description, canonical and social
// tags through pageMeta (src/lib/meta.ts), because Next.js replaces nested objects rather than merging.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s · Zen Teleprompter" },
  applicationName: SITE_NAME,
  // Large image previews in Search and Discover (Google's robots meta doc: without it the default,
  // smaller preview is used).
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  // Shows Apple's Smart App Banner in Safari on iPhone and iPad.
  other: { "apple-itunes-app": `app-id=${APP_ID}` },
};

export const viewport: Viewport = { themeColor: "#0b0b0b", colorScheme: "dark", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that JavaScript runs before first paint. Only then do reveal and strike animations
            start from a hidden or unstruck state, so the page reads in full without scripts. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <JsonLd data={graph(orgNode)} />
        <Nav />
        <ViewTransition default="page"><main id="main">{children}</main></ViewTransition>
        <Observer />
        <Footer />
      </body>
    </html>
  );
}
