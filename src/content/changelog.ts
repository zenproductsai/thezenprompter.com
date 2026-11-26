// Every release, newest first, from the "Store notes" and summary lines of the app repo's
// CHANGELOG.md (read 27 Nov 2026). Dates are the day the version was created in App Store Connect.
// Internal-only lines (test subscriptions, maintenance on counting) are left out. Add the new
// version here whenever the app's CHANGELOG gets one.

export type Release = { version: string; date: string; status?: string; notes: string[] };

export const RELEASES: Release[] = [
  {
    version: "1.5.5",
    date: "2026-11-27",
    // Submitted to App Review on 27 Nov 2026. Remove this status once 1.5.5 is on the App Store.
    // The 30% first-period offer is left out on purpose: it is shown only to eligible people in the
    // app, and the site states no prices.
    status: "In App Review",
    notes: [
      "A new editor: your video on top, and your take as a line of words, story moments and sound. Tap a word to cut it.",
      "Fix everything shows each step on one screen as it finishes: Cut, Sound, Look, Story and Share.",
      "Key phrases pop up word by word as you say them, glowing in your style's colour.",
      "Press and hold a word to fix its spelling. Your name and your script's words are spelled right.",
      "A full-screen player, with captions the same size as in your video.",
      "Titles and pop-ups stay clear of your face.",
      "Follow my voice scrolls more smoothly, and is on from the start.",
      "Start shows both setups as pictures. Export shows the time left, and you can copy your post's words while it works.",
      "On iPad, the editor sits in a centred column and the full-screen player fits the screen.",
      "A softer zoom sound, and fixes for crashes on long takes.",
    ],
  },
  {
    version: "1.5.4",
    date: "2026-11-26",
    notes: [
      "Fix everything now finishes your video: music, a cover, captions and the words for your post.",
      "Zooms land on the lines that matter.",
      "An opening title and an ending in twelve themes the AI picks for your video.",
      "Story moments: your numbers, key lines and calls to action, shown in Slate or Glow.",
      "Karaoke captions by default.",
      "A warning before you record when the room is too dark.",
    ],
  },
  {
    version: "1.5.3",
    date: "2026-11-25",
    notes: [
      "Clear export with progress and Save to Photos.",
      "Every purchase problem explained, with a retry.",
      "Follow my voice listens in your script's language and scrolls to your last line.",
      "Eleven new languages, fourteen in all.",
      "Selections easier to see. Redo, captions and Learn fixes.",
    ],
  },
  {
    version: "1.5.1",
    date: "2026-11-21",
    notes: [
      "Learn tips show the mistake and the fix.",
      "Imported videos get captions from what you said.",
      "Zen AI writes post words on iPhones without on-device AI.",
      "Spanish labels. Subscribers recognised at launch.",
    ],
  },
  {
    version: "1.5.0",
    date: "2026-11-18",
    notes: [
      "Try everything free for 3 days.",
      "A new recording screen with your words under the camera.",
      "Import videos from Photos.",
      "Editor notes. Smoother scrolling.",
    ],
  },
  { version: "1.4.3", date: "2026-11-14", notes: ["Brazilian Portuguese.", "Auto zoom.", "Post words for each platform.", "The Apple Watch remote."] },
  { version: "1.4.2", date: "2026-11-13", notes: ["Faster search, library and editor.", "Recording stops and saves the take if the phone gets too hot."] },
  { version: "1.4.1", date: "2026-11-09", notes: ["Double-tap to change chapters while the prompter runs, or press twice on a Bluetooth remote.", "Themed panels."] },
  { version: "1.4", date: "2026-10-27", notes: ["The Slate: a new film-set look and icon.", "Standard and Mirrored merged into one Teleprompter mode."] },
  { version: "1.3.4", date: "2026-10-21", notes: ["Bluetooth teleprompter remotes.", "Settings redesign.", "Script marks: {notes} never read aloud, and timing cues."] },
  { version: "1.3.3", date: "2026-10-07", notes: ["New scripts open reliably after saving from Home or the library."] },
  { version: "1.3.2", date: "2026-10-06", notes: ["Subscription fixes."] },
  { version: "1.3.1", date: "2026-09-24", notes: ["Write to the Founder from Settings."] },
  { version: "1.3", date: "2026-09-21", notes: ["Glass prompter panel.", "One reading line everything agrees on.", "Honest reading speeds, 0.5x to 2x."] },
  { version: "1.2", date: "2026-09-17", notes: ["New Home and onboarding.", "iCloud sync across devices.", "One import flow."] },
  { version: "1.1", date: "2026-07-16", notes: ["Tabbed prompter settings.", "Recording Studio: music under your voice, jump cuts, auto-trim, captions and script overlay."] },
  { version: "1.0", date: "2026-04-07", notes: ["First release."] },
];

export const latestReleaseDate = () => RELEASES[0].date;
