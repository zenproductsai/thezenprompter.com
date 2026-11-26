import { APP_STORE_URL, FOUNDER, LANGUAGES, PRICES, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/content/site";

// Structured data as one graph with stable @ids, so pages reference the same Organization and app
// instead of repeating anonymous copies (the 26 Nov audit found three unnamed Organization nodes
// per article). Rules followed, read from Google's docs on 26 Nov 2026:
// - Organization has no required fields; logo, url, sameAs and contact are recommended.
// - WebSite name and alternateName set the site name, and belong on the home page only.
// - The software-app rich result needs aggregateRating or review. The app has no ratings yet, so
//   none is claimed: the markup still names the app, its price and platform for search and AI.

export const ORG_ID = `${SITE_URL}/#org`;
export const SITE_ID = `${SITE_URL}/#site`;
export const APP_ID_REF = `${SITE_URL}/#app`;
export const FOUNDER_ID = `${SITE_URL}${FOUNDER.page}#founder`;

// The person behind the posts. Articles name him as author (Google's article guidance: author
// with a url to a page about them, and sameAs to profiles that identify them). Built once so the
// /about page and every article describe the same Person with the same @id.
export const founderNode = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER.name,
  url: `${SITE_URL}${FOUNDER.page}`,
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", "@id": ORG_ID, name: "Zen Products" },
  sameAs: FOUNDER.profiles.map((p) => p.href),
};

// Zen Products' own profiles. Each was opened on 26 Nov 2026 (YouTube, Instagram and zenproducts.ai
// returned the brand's page; LinkedIn and Product Hunt sit behind a bot wall, so they were checked
// against the verified account list in memory, project_zenproducts_accounts, 17 Sep 2026).
const SAME_AS = [
  "https://www.zenproducts.ai/",
  "https://www.youtube.com/channel/UCpQp2jQlHBOltxa5_E4zdug",
  "https://www.instagram.com/zenproducts.ai/",
  "https://www.linkedin.com/company/zen-products",
  "https://www.producthunt.com/@zenproducts",
];

export const orgNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Zen Products",
  url: "https://www.zenproducts.ai/",
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 256, height: 256 },
  email: SUPPORT_EMAIL,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SUPPORT_EMAIL, availableLanguage: ["English", "Spanish", "Portuguese"] },
  sameAs: SAME_AS,
  founder: { "@type": "Person", "@id": FOUNDER_ID, name: FOUNDER.name },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE_NAME,
  alternateName: ["Zen Teleprompter", "thezenprompter.com"],
  url: `${SITE_URL}/`,
  publisher: { "@id": ORG_ID },
  inLanguage: ["en", "pt-BR", "es"],
};

export function appNode(description: string) {
  return {
    "@type": "MobileApplication",
    "@id": APP_ID_REF,
    name: SITE_NAME,
    alternateName: "Zen Teleprompter",
    operatingSystem: "iOS 17.0, iPadOS 17.0, watchOS 10.0",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Teleprompter and video editor",
    url: `${SITE_URL}/`,
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    sameAs: [APP_STORE_URL],
    image: `${SITE_URL}/icon.png`,
    screenshot: ["/shots/script.jpg", "/shots/prompter.webp", "/shots/editor.webp", "/shots/shelves.webp", "/shots/studio.jpg"].map((s) => `${SITE_URL}${s}`),
    description,
    featureList: [
      "Teleprompter with the reading line just under the camera",
      "Follow my voice: the script scrolls as you speak",
      "Fix everything: cuts retakes, silences and filler words in one tap",
      "Karaoke captions and .srt export",
      "Music, a cover, an opening title in 12 themes and an ending card",
      "AI Script Studio",
      "Post words for Reels, TikTok and YouTube",
      "Apple Watch and Bluetooth remotes",
    ],
    inLanguage: [...LANGUAGES],
    publisher: { "@id": ORG_ID },
    offers: [
      { "@type": "Offer", name: "Monthly", price: PRICES.monthly.slice(1), priceCurrency: "USD", url: APP_STORE_URL, category: "subscription" },
      { "@type": "Offer", name: "Yearly", price: PRICES.yearly.slice(1), priceCurrency: "USD", url: APP_STORE_URL, category: "subscription" },
    ],
  };
}

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
