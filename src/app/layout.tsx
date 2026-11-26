import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { ViewTransition } from "react";
import Nav from "@/components/Nav";
import { Observer } from "@/components/motion";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { APP_ID, APP_STORE_URL, LANGUAGES, PRICES, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/content/site";
import "./globals.css";
import "./motion.css";

// The app's own faces: Barlow Condensed capitals for arrival headings, Inter for everything read.
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--font-text", display: "swap" });

const DESCRIPTION =
  "A teleprompter that keeps your eyes on the lens, and Fix everything: one tap cuts retakes, silences and ums, then adds captions, music, a title and your post. For iPhone and iPad.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Zen Teleprompter: Video Editor · Teleprompter and one-tap editing for iPhone", template: "%s · Zen Teleprompter: Video Editor" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE_NAME, url: SITE_URL, title: SITE_NAME, description: DESCRIPTION, locale: "en_US" },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: DESCRIPTION },
  // Shows Apple's Smart App Banner in Safari on iPhone and iPad.
  other: { "apple-itunes-app": `app-id=${APP_ID}` },
};

export const viewport: Viewport = { themeColor: "#0b0b0b", colorScheme: "dark", viewportFit: "cover" };

const ORG = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "Zen Products", url: SITE_URL, logo: `${SITE_URL}/icon.png`, email: SUPPORT_EMAIL },
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en" },
    {
      // No aggregateRating on purpose: a rating is shown only once it is real and read from the App Store.
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      operatingSystem: "iOS 17 or later, iPadOS 17 or later",
      applicationCategory: "MultimediaApplication",
      url: SITE_URL,
      downloadUrl: APP_STORE_URL,
      installUrl: APP_STORE_URL,
      image: `${SITE_URL}/icon.png`,
      description: DESCRIPTION,
      inLanguage: [...LANGUAGES],
      publisher: { "@id": `${SITE_URL}/#org` },
      offers: [
        { "@type": "Offer", name: "Monthly", price: PRICES.monthly.slice(1), priceCurrency: "USD" },
        { "@type": "Offer", name: "Yearly", price: PRICES.yearly.slice(1), priceCurrency: "USD" },
      ],
    },
  ],
};

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
        <JsonLd data={ORG} />
        <Nav />
        <ViewTransition default="page"><main id="main">{children}</main></ViewTransition>
        <Observer />
        <Footer />
      </body>
    </html>
  );
}
