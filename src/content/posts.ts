import type { Block } from "./help";

// Blog posts. Practical, for people who film alone. No statistics unless measured or sourced:
// the eye-line table is the app repo's own measurement (CLAUDE.md, "The reading line is the
// eye-line"), from Apple's published iPhone 17 Pro screen size. A comparison with BIGVU was left
// out on purpose: it would need every fact checked against their current site first.

export type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  published: string;
  modified: string;
  minutes: number;
  shot: string;
  blocks: (Block | { type: "table"; head: string[]; rows: string[][]; mark?: number })[];
};

export const POSTS: Post[] = [
  {
    slug: "read-a-script-without-looking-like-it",
    title: "How to read a script without looking like it",
    description: "Why your eyes give you away, how far below the lens is too far, and five habits that make a read sound like you mean it.",
    tag: "Craft",
    published: "2026-11-26",
    modified: "2026-11-26",
    minutes: 5,
    shot: "/shots/script.jpg",
    blocks: [
      { type: "p", parts: ["People read faces before they hear words. When your eyes drop to find the next line, the viewer sees it, even if they can't say what felt off. Two things fix it: where the words sit, and how they are written."] },
      { type: "h2", id: "distance", text: "Put the words next to the lens" },
      { type: "p", parts: ["The further the line you're reading sits below the camera, the further your eyes turn away from it. On an iPhone 17 Pro, with the phone at arm's length, the difference is large:"] },
      { type: "table", head: ["Where the line sits", "Below the lens", "At 30 cm", "At 45 cm", "At 60 cm"], rows: [
        ["Centre of the screen", "67.5 mm", "12.7°", "8.5°", "6.4°"],
        ["A third of the way down", "38.5 mm", "7.3°", "4.9°", "3.7°"],
        ["Zen Teleprompter's reading line", "8.9 mm", "1.7°", "1.1°", "0.8°"],
      ], mark: 2 },
      { type: "p", parts: ["Distances measured from the iPhone 17 Pro's 2622 pixel, 460 ppi screen. The angle is how far your eyes turn from the lens."] },
      { type: "p", parts: ["Holding the phone further away helps too: every row gets smaller with distance. The cost of a high line is that you see less of what you have already said, which is fine. You need what is coming."] },
      { type: "h2", id: "write", text: "Write for the ear" },
      { type: "list", items: [
        "Short sentences. One idea each. A long sentence on a prompter makes you hunt for the end of it.",
        "Contractions. \"It's\" and \"you'll\" sound like speech; \"it is\" sounds like reading.",
        "Mark your breaths. {BEAT} or {PAUSE 2} in a script tells you where to stop, and the prompter never shows them as words to say.",
        "Stage directions in braces. {smile} or {hold up the box} stay visible and dimmed, and voice follow skips them.",
      ] },
      { type: "h2", id: "pace", text: "Let the script wait for you" },
      { type: "p", parts: ["A script that scrolls at a fixed speed makes you race it. Follow my voice moves the script only when you speak, so a pause is a pause, not a scramble to catch up."] },
      { type: "h2", id: "once", text: "Read it once out loud first" },
      { type: "p", parts: ["Before the first take, read the script aloud once without recording. You will find the sentence you can't say, and it is cheaper to fix it in the script than in the edit."] },
    ],
  },
  {
    slug: "cut-retakes-and-dead-air",
    title: "Cut retakes and dead air without an evening of editing",
    description: "Record so the edit is easy, then let the cuts happen in one pass and check them before you post.",
    tag: "Editing",
    published: "2026-11-26",
    modified: "2026-11-26",
    minutes: 4,
    shot: "/shots/take-report.jpg",
    blocks: [
      { type: "p", parts: ["The slow part of a talking-head video is rarely the recording. It is scrubbing through it afterwards to find the stumbles, the false starts and the gap while you remembered the next line."] },
      { type: "h2", id: "record", text: "Record so the cut is obvious" },
      { type: "list", items: [
        "When you stumble, don't stop. Pause, then say the whole sentence again from its start.",
        "Keep the pause. A clear gap before the retry is what makes the join clean.",
        "Don't apologise on camera. \"Sorry, again\" is one more thing to cut.",
      ] },
      { type: "h2", id: "how", text: "How the cuts are found" },
      { type: "p", parts: ["With a script, Fix everything follows your words through it. When you jump back to a line you already said, the earlier try goes and the last one stays. A repeat that is written in the script, like \"We will win. We will win.\", is never cut. Without a script, the AI reads the transcript and names the false starts, after you agree to it."] },
      { type: "p", parts: ["Silence at both ends goes, and so do long pauses. Filler words like um and uh are found by a rule first and only cut when the on-device model agrees."] },
      { type: "h2", id: "check", text: "Check before you post" },
      { type: "p", parts: ["The take report shows the waveform with every cut and pause marked, what it found, and the old and new length. If a pause was on purpose, turn that cut off. Everything else stays."] },
      { type: "shot", src: "/shots/take-report.jpg", alt: "The take report showing cuts, pauses and the length going from 1:27 to 1:23", caption: "The take report on a sample take: 1:27 to 1:23." },
    ],
  },
  {
    slug: "captions-that-keep-viewers",
    title: "Captions that keep people watching",
    description: "Karaoke or plain, burned in or as a file, and the mistakes that make captions harder to read than no captions.",
    tag: "Captions",
    published: "2026-11-26",
    modified: "2026-11-26",
    minutes: 4,
    shot: "/shots/player.jpg",
    blocks: [
      { type: "p", parts: ["Captions let a video work with the sound off, and they help anyone who would rather read along. They also cover part of your picture, so they need to earn the space."] },
      { type: "h2", id: "style", text: "Karaoke or Normal" },
      { type: "p", parts: ["Karaoke lights up each word as you say it, which pulls the eye along with your voice. Normal shows the line plainly. Karaoke suits short vertical videos; Normal suits longer, calmer ones."] },
      { type: "h2", id: "rules", text: "Four rules" },
      { type: "list", items: [
        "Short lines. Two lines at most on screen.",
        "Keep them clear of the app's buttons. Reels, TikTok and Shorts draw their own controls over the bottom and the right of the frame.",
        "Check names and numbers. Speech recognition can mishear a name it has never seen.",
        "Captions should match the cut. If a word was removed from the video, it should not be on screen.",
      ] },
      { type: "h2", id: "burn", text: "Burned in, or a file" },
      { type: "p", parts: ["Burned-in captions are part of the picture and show everywhere. An .srt file is a separate track, for platforms that take a caption file and let viewers switch it off."] },
    ],
  },
  {
    slug: "write-an-opening-line",
    title: "Write an opening line that earns the next one",
    description: "The first sentence decides whether anyone hears the second. How to write it, and how to check it before you record.",
    tag: "Writing",
    published: "2026-11-26",
    modified: "2026-11-26",
    minutes: 4,
    shot: "/shots/studio.jpg",
    blocks: [
      { type: "p", parts: ["Most scripts start with a warm-up: hello, a name, what the video is about. The viewer has not decided to stay yet, and the warm-up gives them nothing to stay for."] },
      { type: "h2", id: "start", text: "Start where the value is" },
      { type: "list", items: [
        "Lead with the result. \"This is how I film a week of videos in one afternoon.\"",
        "Or the problem, in the viewer's words. \"You know the script. You still look like you're reading it.\"",
        "Or the surprising part. Save the context for line two.",
      ] },
      { type: "h2", id: "test", text: "Test it" },
      { type: "p", parts: ["Read only the first line out loud. If it would make sense as the whole video's title, it is doing its job. If it only makes sense after the second line, swap them."] },
      { type: "h2", id: "title", text: "Put it on screen too" },
      { type: "p", parts: ["An opening title says the promise in words while you say it in voice. Fix everything writes one from your take, in one of 12 themes, along with a tip for a stronger start."] },
      { type: "h2", id: "script", text: "Let the first draft be fast" },
      { type: "p", parts: ["AI Script Studio drafts a script to your length, tone and reading pace from a one-line brief. Rewrite the first line yourself. It is the one line that should sound most like you."] },
    ],
  },
];

export const postHref = (p: { slug: string }) => `/blog/${p.slug}`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
