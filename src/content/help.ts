import { PRIVACY_URL } from "./site";

// Help centre. One task per article, for someone who has the app and wants to do something now.
// Every claim traces to the app repo (CHANGELOG.md, CLAUDE.md, en Localizable.strings) or a current
// screenshot from the release capture of 26 Nov 2026. Re-check and bump `reviewed` when the app changes.

export type Inline = string | { text: string; href: string };
export type Block =
  | { type: "p"; parts: Inline[] }
  | { type: "h2"; id: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "note"; title: string; body: string }
  /** A real screenshot from public/shots. Never a mock-up. */
  | { type: "shot"; src: string; alt: string; caption: string };

export type HelpCategory = "start" | "read" | "record" | "edit" | "remotes" | "account";

export type HelpArticle = {
  slug: string;
  category: HelpCategory;
  title: string;
  summary: string;
  /** The direct answer under the title. Answers the title on its own. */
  answer: string;
  blocks: Block[];
  reviewed: string;
};

export const HELP_CATEGORIES: { id: HelpCategory; name: string; icon: string }[] = [
  { id: "start", name: "Get started", icon: "device-mobile" },
  { id: "read", name: "Read", icon: "eye" },
  { id: "record", name: "Record", icon: "film-slate" },
  { id: "edit", name: "Fix and finish", icon: "sparkle" },
  { id: "remotes", name: "Remotes", icon: "watch" },
  { id: "account", name: "Plan, privacy, languages", icon: "lock-key" },
];

const R = "2026-11-26";

export const HELP: HelpArticle[] = [
  {
    slug: "first-take",
    category: "start",
    title: "Get started and record your first take",
    summary: "Write or import a script, open the prompter and record.",
    answer:
      "Open a script and tap Start teleprompter. Pick Teleprompter for glass or Selfie-style prompter for the front camera, then record. When the take is done, open it and tap Fix everything.",
    blocks: [
      { type: "h2", id: "script", text: "Get a script in" },
      {
        type: "list",
        items: [
          "Write one: Scripts, then + and New script. Start from a blank page or a template.",
          "Import one: Import text file takes Text, RTF, PDF or Markdown. From a web page pulls the article text from a link.",
          "Ask for one: Write with AI opens AI Script Studio, which writes to your length, tone and reading pace.",
        ],
      },
      { type: "shot", src: "/shots/import.jpg", alt: "The Add script sheet with New script, Import text file and From a web page", caption: "Scripts, then +." },
      { type: "h2", id: "read", text: "Read it to camera" },
      {
        type: "steps",
        items: [
          { title: "Open the script", body: "Tap it in Scripts or Recent scripts on Home." },
          { title: "Tap Start teleprompter", body: "Choose Teleprompter (mirrored for teleprompter glass) or Selfie-style prompter (front camera, script on top)." },
          { title: "Record", body: "Tap Record. A 3 second countdown runs, then the take starts." },
        ],
      },
      { type: "h2", id: "finish", text: "Finish it" },
      {
        type: "p",
        parts: ["Your take is saved in Recordings and under the script. Open it and tap Fix everything. ", { text: "What Fix everything changes", href: "/help/fix-everything" }, "."],
      },
    ],
    reviewed: R,
  },
  {
    slug: "teleprompter",
    category: "read",
    title: "Use the teleprompter",
    summary: "The reading line, speed, mirroring and text.",
    answer:
      "The line you are reading sits just under the camera, so your eyes stay close to the lens. Set the speed with minus and plus on the stage, from 0.5x to 2x in quarter steps, or turn on Follow my voice and let it move with you.",
    blocks: [
      { type: "shot", src: "/shots/selfie.webp", alt: "The selfie prompter during a take: the script on top, the line being read just under the camera, Follow my voice listening", caption: "The script starts right under the camera." },
      { type: "h2", id: "speed", text: "Speed" },
      { type: "p", parts: ["Tap minus or plus on the stage. 1x is the reading pace you set, and the range is 0.5x to 2x in quarter steps. Scrolling eases in over the first 3 seconds."] },
      { type: "h2", id: "mirror", text: "Teleprompter glass" },
      { type: "p", parts: ["Teleprompter mode opens mirrored, so the text reads correctly in the glass. One switch turns mirroring off if you read straight from the screen."] },
      { type: "shot", src: "/shots/prompter.webp", alt: "Teleprompter mode mid-read, flip off, with Follow my voice listening and the words already said in gold", caption: "Teleprompter mode with the flip off, reading straight from the screen." },
      { type: "h2", id: "text", text: "Text" },
      { type: "list", items: ["Typeface: Inter, Literata or Lexend Deca.", "Alignment: centre, left or right. Right suits Arabic, Urdu and Hebrew scripts.", "Size and line height.", "Words you have said turn gold; the one you are on is bold."] },
      { type: "h2", id: "chapters", text: "Jump between chapters" },
      { type: "p", parts: ["Double-tap the top half of the stage for the previous chapter and the bottom half for the next. On a remote, press up or down twice."] },
    ],
    reviewed: "2026-11-27",
  },
  {
    slug: "follow-my-voice",
    category: "read",
    title: "Let the script follow your voice",
    summary: "Speak and it moves. Stop and it waits.",
    answer:
      "Turn on Follow my voice in the prompter's settings. The script moves only when you speak and holds when you pause. Speech is recognised on your iPhone, and the audio is not sent anywhere.",
    blocks: [
      { type: "steps", items: [
        { title: "Open the prompter settings", body: "Tap the gear on the stage." },
        { title: "Turn on Follow my voice", body: "Allow speech recognition when iOS asks. It is needed to hear where you are." },
        { title: "Start reading", body: "The script scrolls to your last line, then stops." },
      ] },
      { type: "h2", id: "language", text: "Languages" },
      { type: "p", parts: ["It listens in your script's language, not your phone's. Where your iPhone cannot recognise a language on the device, the feature does not run."] },
      { type: "h2", id: "tips", text: "When it loses you" },
      { type: "list", items: ["Read the words as written. Numbers work as digits or words.", "Notes in curly braces are skipped, so stage directions never stall it."] },
      { type: "p", parts: [{ text: "Mark pauses and notes in a script", href: "/help/script-marks" }] },
    ],
    reviewed: R,
  },
  {
    slug: "script-marks",
    category: "read",
    title: "Mark pauses and notes in a script",
    summary: "Curly braces for anything you do but don't say.",
    answer:
      "Put anything you do but don't say in curly braces, like {smile} or {hold up the box}. The prompter dims it and Follow my voice skips it. Timing cues such as {PAUSE 2} or {BEAT} work the same way.",
    blocks: [
      { type: "h2", id: "cues", text: "The cues" },
      { type: "list", items: ["{note}: dimmed, never said.", "{PAUSE 2}: a pause of two seconds.", "{BEAT}: a short beat.", "{SLOW}, {FAST} and {NORMAL}: change pace from that point.", "[blank]: tinted, and read out."] },
      { type: "p", parts: ["Everything else, parentheses included, is speech. The { } button in the editor's toolbar opens the marks guide."] },
    ],
    reviewed: R,
  },
  {
    slug: "selfie-take",
    category: "record",
    title: "Record a selfie take",
    summary: "Front camera, script under the lens, one button.",
    answer:
      "Choose Selfie-style prompter, then tap Record. Your script starts right under the camera. Three seconds into a take the controls clear away, leaving Discard and Stop; tap the screen to bring them back.",
    blocks: [
      { type: "shot", src: "/shots/selfie-pace.jpg", alt: "Selfie prompter settings with the Record tab and ring light options", caption: "Settings: Record, Text, Reading." },
      { type: "h2", id: "before", text: "Before you record" },
      { type: "list", items: ["A warning shows when the room is too dark.", "Ring light: the screen edges add fill light. Off, Soft, Medium or Max.", "Flip between front and back camera before a take."] },
      { type: "h2", id: "during", text: "During a take" },
      { type: "list", items: ["A 3 second countdown, then recording starts.", "Discard throws the take away. Stop keeps it.", "If your iPhone gets too hot, recording stops and the take is saved."] },
      { type: "h2", id: "quality", text: "Quality" },
      { type: "p", parts: ["Settings, Recording quality: 720p, 1080p or 4K, at 30 or 60 fps, where your camera supports it. 1080p at 30 fps is the default."] },
      { type: "p", parts: ["Every take gets a number that never changes, even if you delete others."] },
    ],
    reviewed: R,
  },
  {
    slug: "import-video",
    category: "record",
    title: "Import a video from Photos or Files",
    summary: "Bring in a video you filmed elsewhere and edit it.",
    answer:
      "Tap Edit a video on Home, or Import in Recordings, and pick a video from Photos or Files. It opens straight in the editor and is transcribed, so captions and Fix everything work on it too.",
    blocks: [
      { type: "steps", items: [
        { title: "Tap Edit a video or Import", body: "Home has Edit a video. Recordings has Import." },
        { title: "Pick the video", body: "From Photos, or from Files, including iCloud Drive and other apps. The app needs no access to your whole photo library." },
        { title: "Edit", body: "It opens in the editor. The app names it from its first sentence." },
      ] },
      { type: "note", title: "No script", body: "An imported video has no script, so retakes are found by the AI, after you agree to it, and post words are written from the transcript." },
    ],
    reviewed: R,
  },
  {
    slug: "fix-everything",
    category: "edit",
    title: "What Fix everything changes",
    summary: "Every cut and every addition, and how to undo one.",
    answer:
      "Fix everything reads the whole take, works through five shelves on one screen (Cut, Sound, Look, Story and Share), and cuts retakes, silences and filler words, evens out your voice and finishes the video with captions, music, a cover, a title, zooms, story moments and an ending card. Each change has its own switch.",
    blocks: [
      { type: "shot", src: "/shots/shelves.webp", alt: "Making it studio-ready: Cut, Sound and Look ticked off, Story under way, Share next", caption: "Each shelf ticks off with what it found." },
      { type: "h2", id: "cut", text: "Cut" },
      { type: "list", items: ["Retakes. With a script, it follows your words through the script and keeps your last try. Without one, it asks the AI.", "Silences at both ends and long pauses.", "Filler words like um and uh."] },
      { type: "h2", id: "sound", text: "Sound" },
      { type: "list", items: ["Uneven level, evened out.", "Music picked for the mood, under your voice."] },
      { type: "h2", id: "finish", text: "Finish" },
      { type: "list", items: ["Karaoke captions.", "A cover from the best frame.", "An opening title and an ending card, in one of 12 themes.", "Zooms on the lines that matter, with a soft sound.", "Key phrases that pop up word by word as you say them.", "Story moments: number cards, key lines and calls to action.", "Titles and pop-ups placed clear of your face.", "The words for your post, for Reels, TikTok and YouTube."] },
      { type: "h2", id: "kept", text: "What it leaves alone" },
      { type: "p", parts: ["A setting you already changed stays yours. Review shows the old and new length and lists every fix."] },
      { type: "h2", id: "undo", text: "Turn one change off" },
      { type: "p", parts: ["Review groups the fixes as Cut, Sound and Finish, each with its own switch. Turn one off and the rest stay. The editor's tools sit under the video: Captions, Style, Look, Audio and More, and in the take itself you tap a word to cut it."] },
      { type: "shot", src: "/shots/editor.webp", alt: "The editor after Fix everything: 2:48 down to 2:05 with 9 fixes, the take as a line of words, tools Captions, Style, Look, Audio and More", caption: "After Fix everything: tap Review to see each fix." },
    ],
    reviewed: "2026-11-27",
  },
  {
    slug: "captions",
    category: "edit",
    title: "Add captions",
    summary: "Normal or Karaoke, burned in or as a file.",
    answer:
      "Open a take, go to Captions and pick a style: Karaoke, where each word lights up as you say it, or Normal. Burn them into the video, or export an .srt file.",
    blocks: [
      { type: "list", items: ["Captions come from what you said, or from your script.", "Karaoke is the default for new takes.", "Captions skip words that were cut, and stay in sync at any playback speed.", "Imported videos get captions from what you said.", "The full-screen player shows them at the size they export."] },
      { type: "h2", id: "spelling", text: "Fix a misheard word" },
      { type: "p", parts: ["Your script's spelling and your own name are used wherever the speech matches them. For anything else, press and hold the word on the track, type it right, and choose whether to fix it once or everywhere in the take. Captions, key phrases, titles and your post all change with it."] },
      { type: "shot", src: "/shots/spelling.webp", alt: "Fix spelling: a misheard name held on the track and typed right, with Fix everywhere in this take", caption: "Press and hold a word, then type it right." },
    ],
    reviewed: "2026-11-27",
  },
  {
    slug: "titles-and-story-moments",
    category: "edit",
    title: "Title themes and story moments",
    summary: "Twelve themes, and Slate or Glow moments.",
    answer:
      "The opening title and ending card come in 12 themes. The AI picks one to suit the video and you can change it under Captions, Theme. Story moments show your numbers, key lines and calls to action on screen, in Slate or Glow.",
    blocks: [
      { type: "h2", id: "themes", text: "The 12 themes" },
      { type: "list", items: ["Glass, Slate, Clapper, Outline", "Highlighter, Lower third, Stack, Frosted", "Word by word, Serif, Sticker, Typewriter"] },
      { type: "h2", id: "moments", text: "Story moments" },
      { type: "p", parts: ["The Story row in Captions has Off, Slate, Glow and Find moments. Moments include full-screen number and chart cards, marked phrases, lists, a button for a call to action, and a key word placed behind you."] },
      { type: "note", title: "Only what you said", body: "A moment is kept only if it matches words in the take. Figures you did not say are never added." },
    ],
    reviewed: R,
  },
  {
    slug: "export-and-post",
    category: "edit",
    title: "Export and copy your post words",
    summary: "Pick a shape, save to Photos, copy the post.",
    answer:
      "Open Export, pick a shape and tap Export video. It shows its progress and saves to Photos. The export sheet also shows the post words for Reels, TikTok and YouTube, each with Copy.",
    blocks: [
      { type: "h2", id: "shape", text: "Shapes" },
      { type: "list", items: ["Vertical: Reels, TikTok, Shorts.", "Wide: YouTube, courses.", "Square: Feed, LinkedIn.", "Original: as you recorded it."] },
      { type: "h2", id: "post", text: "Post words" },
      { type: "p", parts: ["They are written from the words the finished video keeps. On iPhones without on-device AI, Write with Zen AI writes them through our server, after you agree."] },
    ],
    reviewed: R,
  },
  {
    slug: "remotes",
    category: "remotes",
    title: "Use Apple Watch or a Bluetooth remote",
    summary: "Play, pause and change chapter from across the room.",
    answer:
      "Open the app on your Apple Watch to play, pause and jump between sections, and to see when a take is recording. For a Bluetooth remote, pair it, then open Settings, Remote to test it and set what each button does.",
    blocks: [
      { type: "shot", src: "/shots/watch.jpg", alt: "The Apple Watch remote playing a script", caption: "The Watch remote." },
      { type: "h2", id: "watch", text: "Apple Watch" },
      { type: "p", parts: ["The Watch app comes with the iPhone app and needs watchOS 10 or later. It controls whichever prompter is open."] },
      { type: "h2", id: "bluetooth", text: "Bluetooth remotes" },
      { type: "list", items: ["Bluetooth teleprompter remotes, including NEEWER's, connect from Settings, Remote.", "Settings, Remote shows the status and a live tester. Tap Change to set what a button does.", "Press up or down twice to change chapter."] },
    ],
    reviewed: R,
  },
  {
    slug: "subscription",
    category: "account",
    title: "Trial, restore and cancel",
    summary: "How the 3 days work, and managing your plan.",
    answer:
      "Zen Teleprompter is a subscription with a 3-day free trial: $7.99 a month or $49.99 a year after it. We remind you on day 2. Cancel any time in your Apple account; restore a purchase from the plans screen.",
    blocks: [
      { type: "h2", id: "trial", text: "The trial" },
      { type: "list", items: ["Today: everything unlocked.", "Day 2: a reminder.", "Day 3: your plan starts, unless you cancelled."] },
      { type: "p", parts: ["Apple decides who can still have a trial. If you have used it before, the app offers the plans without one."] },
      { type: "h2", id: "cancel", text: "Cancel or change plan" },
      { type: "p", parts: ["Settings on your iPhone, your name, Subscriptions, Zen Teleprompter. Or in the app: Settings, Plans and subscription."] },
      { type: "h2", id: "restore", text: "Restore" },
      { type: "p", parts: ["Tap Restore on the plans screen. Purchases follow the Apple account used for the App Store, not iCloud."] },
      { type: "h2", id: "lapsed", text: "If your plan ends" },
      { type: "p", parts: ["My library stays open: read and copy your scripts, and save your videos to Photos."] },
    ],
    reviewed: R,
  },
  {
    slug: "privacy-and-ai",
    category: "account",
    title: "Privacy and the AI features",
    summary: "What stays on your iPhone and what leaves it.",
    answer:
      "Your scripts and recordings stay on your device, with optional iCloud sync to your own private iCloud. The AI features are off until you agree. When you use them, text goes through our server to Anthropic's Claude and back. Our server keeps counts only, never the text.",
    blocks: [
      { type: "h2", id: "device", text: "On your device" },
      { type: "list", items: ["Scripts, stored on the device. iCloud sync, if on, uses your private iCloud.", "Recordings, until you export or save them.", "Speech recognition for Follow my voice and transcripts."] },
      { type: "h2", id: "leaves", text: "What leaves, and when" },
      { type: "p", parts: ["Only after you agree, and only for the feature you use:"] },
      { type: "list", items: ["AI Script Studio: your brief, or the script you ask to rework, with the length, tone and pace you chose.", "Fix everything: the transcript of the take, to find retakes without a script, pick the key lines, the title and story moments.", "Post words, when your iPhone has no on-device AI."] },
      { type: "p", parts: ["It goes to Zen Services, our server, which passes it to Anthropic's Claude and returns the result. Anthropic states it does not train on data sent through its API."] },
      { type: "h2", id: "kept", text: "What our server keeps" },
      { type: "p", parts: ["None of your text. It records an anonymous per-install number, how many times you used the feature this month, and the size and cost of the request."] },
      { type: "h2", id: "off", text: "Turn it off" },
      { type: "p", parts: ["Settings, Privacy. Anonymous usage counts can be switched off there too. ", { text: "Full privacy policy", href: PRIVACY_URL }, "."] },
    ],
    reviewed: R,
  },
  {
    slug: "languages",
    category: "account",
    title: "Languages",
    summary: "The 14 languages, and reading in others.",
    answer:
      "The app is in 14 languages: English, Spanish, Portuguese (Brazil), Arabic, Czech, Hungarian, Indonesian, Malay, Romanian, Russian, Thai, Turkish, Ukrainian and Vietnamese. It follows your iPhone's language.",
    blocks: [
      { type: "list", items: ["The app, the Watch app and the permission prompts are all translated.", "Follow my voice listens in your script's language, wherever your iPhone can recognise it on the device.", "Right alignment suits Arabic, Urdu and Hebrew scripts."] },
    ],
    reviewed: R,
  },
];

export const helpHref = (a: { slug: string }) => `/help/${a.slug}`;
export const findHelp = (slug: string) => HELP.find((a) => a.slug === slug);
export const helpIn = (c: HelpCategory) => HELP.filter((a) => a.category === c);
