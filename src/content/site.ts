// One source for facts that appear on several pages, so a price or a link changes in one place.
// Every product fact here was checked against the app repo (zen-teleprompter: CHANGELOG.md 1.5.4,
// CLAUDE.md, the en Localizable.strings) on 26 Nov 2026.

export const SITE_URL = "https://thezenprompter.com";
export const SITE_NAME = "Zen Teleprompter";
export const APP_ID = "6761758929";
// The full listing URL from Apple's lookup API (26 Nov 2026). On zenpasswords.com the short form
// (apps.apple.com/app/id…) showed "An Error Occurred" in Chrome, so the full one is used here too.
export const APP_STORE_URL = `https://apps.apple.com/us/app/zen-teleprompter-video-editor/id${APP_ID}`;
export const SUPPORT_EMAIL = "hello@zenproducts.ai";
// Legal text lives on zenproducts.ai (the URLs the App Store listing points at); this site does not
// carry its own copy, so there is one version to keep correct.
export const PRIVACY_URL = "https://www.zenproducts.ai/apps/zen-teleprompter/privacy";
export const TERMS_URL = "https://www.zenproducts.ai/apps/zen-teleprompter/terms";
export const APPLE_EULA_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

// Prices from the app's StoreKit configuration (ZenPurchases.storekit), USD. Apple shows the local price.
export const PRICES = {
  monthly: "$7.99",
  yearly: "$49.99",
  // 49.99 / (7.99 x 12) = 0.521, so the yearly plan saves 48% against twelve months.
  yearlySaving: "48%",
  yearlyPerMonth: "$4.17",
  trialDays: 3,
} as const;

// The fourteen app languages (App Store lookup, languageCodesISO2A, 26 Nov 2026).
export const LANGUAGES = [
  "English", "Spanish", "Portuguese (Brazil)", "Arabic", "Czech", "Hungarian", "Indonesian",
  "Malay", "Romanian", "Russian", "Thai", "Turkish", "Ukrainian", "Vietnamese",
] as const;

// The twelve title themes, as the app names them (title_theme_* strings).
export const THEMES = [
  "Glass", "Slate", "Clapper", "Outline", "Highlighter", "Lower third",
  "Stack", "Frosted", "Word by word", "Serif", "Sticker", "Typewriter",
] as const;

// Fix everything, grouped the way the app's take report groups it: Cut, Sound, Finish.
export const FIX = {
  cut: [
    { t: "Retakes", d: "Lines you said twice. Your last try stays." },
    { t: "Silences", d: "Dead air at the start, the end and in long pauses." },
    { t: "Filler words", d: "Um, uh and the rest." },
  ],
  sound: [
    { t: "Uneven level", d: "Your voice evened out." },
    { t: "Music", d: "Picked for the mood, under your voice." },
  ],
  finish: [
    { t: "Karaoke captions", d: "Each word lights up as you say it." },
    { t: "A cover", d: "The best frame of the take." },
    { t: "An opening title", d: "In one of 12 themes." },
    { t: "Zooms", d: "On the lines that matter." },
    { t: "Story moments", d: "Number cards and key words behind you." },
    { t: "An ending card", d: "To close the video." },
  ],
  write: [
    { t: "Reels", d: "Post words" },
    { t: "TikTok", d: "Post words" },
    { t: "YouTube", d: "Post words" },
  ],
} as const;

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Can people tell I'm reading?",
    a: "The script sits on a reading line just under the camera, so your eyes stay close to the lens while you read.",
  },
  {
    q: "What does Fix everything change?",
    a: "It cuts retakes, silences and filler words, evens out your voice, then adds captions, music, a cover, a title, zooms, story moments and an ending card, and writes your post. Each change has its own switch, and anything you already set stays as you set it.",
  },
  {
    q: "Does it follow my voice?",
    a: "Yes. Turn on Follow my voice and the script moves when you speak and waits when you stop. Speech is recognised on your iPhone.",
  },
  {
    q: "Do I need a teleprompter rig?",
    a: "No. Use the front camera with your script on top, or the Teleprompter mode, mirrored for teleprompter glass.",
  },
  {
    q: "How does the free trial work?",
    a: "You get 3 days with everything unlocked. We remind you on day 2. Cancel in your Apple account before the trial ends and you pay nothing.",
  },
  {
    q: "What does it run on?",
    a: "iPhone and iPad with iOS 17 or later, and Apple Watch as a remote. The app is in 14 languages.",
  },
];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
/** House date style: "26 NOV 2026". Spelled out by hand so September never reads "SEPT". */
export const fmtDate = (d: string) => {
  const [y, m, day] = d.slice(0, 10).split("-");
  return `${Number(day)} ${MONTHS[Number(m) - 1]} ${y}`;
};
