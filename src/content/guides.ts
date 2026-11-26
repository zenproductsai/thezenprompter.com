import type { Block } from "./help";
import type { Post } from "./posts";
import { PRICES, THEMES } from "./site";

// Feature pages and comparison pages. Each answers one search people actually make: the queries
// were read from Google autocomplete (US) on 26 Nov 2026, for example "teleprompter app that follows
// voice", "teleprompter with voice tracking", "auto captions app ios", "how to remove filler
// words", "teleprompter apple watch", "teleprompter remote bluetooth", "selfie teleprompter app",
// "teleprompter app for iphone while recording", "best teleprompter app for iphone",
// "bigvu alternatives", "teleprompter vs bigvu", "prompt smart pro alternative".
//
// Facts about Zen Teleprompter come from the help articles (checked against the app repo).
// Facts about other apps come ONLY from each app's own App Store listing, read through Apple's
// lookup API on 26 Nov 2026 (description, price, rating count, supported devices). Re-read them
// before changing a row: listings change, and a wrong claim about a rival is worse than none.

export type GuideKind = "features" | "compare";

export type Guide = {
  kind: GuideKind;
  slug: string;
  /** The headline on the page. */
  h1: string;
  /** The <title>, written to the search wording. The template adds " · Zen Teleprompter". */
  title: string;
  description: string;
  kicker: string;
  /** The direct answer under the headline: the passage search and AI answers quote. */
  answer: string;
  blocks: Post["blocks"];
  /** Help articles and other guides worth reading next. */
  related: { href: string; label: string }[];
  published: string;
  reviewed: string;
};

const D = "2026-11-26";
const LISTINGS = "From each app's App Store listing, read on 26 Nov 2026. Listings change; check the App Store before you decide.";

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------- features
  {
    kind: "features",
    slug: "teleprompter-that-follows-your-voice",
    h1: "A teleprompter that follows your voice",
    title: "Teleprompter app that follows your voice, for iPhone",
    description: "Follow my voice scrolls your script as you speak and waits when you pause. Recognised on your iPhone, in your script's language. How it works and when it loses you.",
    kicker: "Feature · Follow my voice",
    answer: "Zen Teleprompter's Follow my voice moves the script only while you speak and holds it when you stop, so you never race a fixed scroll speed. Speech is recognised on your iPhone, in your script's language, and the audio is not sent anywhere.",
    blocks: [
      { type: "h2", id: "why", text: "Why a fixed speed fails" },
      { type: "p", parts: ["A prompter that scrolls at one speed is fine until you slow down for the line that matters, or take a breath before the next point. Then you are either chasing the text or waiting for it, and both show on camera. Voice scrolling turns the prompter into a reader that keeps your place instead of setting your pace."] },
      { type: "h2", id: "how", text: "How Follow my voice works" },
      { type: "steps", items: [
        { title: "Turn it on", body: "Tap the gear on the prompter stage, then turn on Follow my voice. Allow speech recognition when iOS asks." },
        { title: "Read", body: "The script scrolls to the line you just said, then stops. Words you have said turn gold, and the one you are on is bold." },
        { title: "Pause when you like", body: "Nothing moves while you are quiet. Start again and it picks up from your last line." },
      ] },
      { type: "list", items: [
        "It listens in your script's language, not your phone's, in any language your iPhone can recognise on the device.",
        "It knows the names and numbers in your script, and numbers work as digits or words.",
        "Notes in curly braces, like {smile}, are skipped, so a stage direction never stalls it.",
        "Prefer a steady scroll? Set the speed from 0.5x to 2x in quarter steps instead.",
      ] },
      { type: "shot", src: "/shots/selfie.webp", alt: "The selfie prompter during a take: the script on top, the line being read just under the camera, Follow my voice listening", caption: "The line you read sits just under the camera." },
      { type: "h2", id: "private", text: "Private by design" },
      { type: "p", parts: ["Recognition runs on the iPhone itself. The audio of your take is not uploaded to follow your place. Where your iPhone cannot recognise a language on the device, the feature does not run, rather than sending the audio away."] },
      { type: "h2", id: "after", text: "After the take" },
      { type: "p", parts: ["Because the app knows your script, it can also tell a retake from a line you meant to repeat. ", { text: "Fix everything", href: "/help/fix-everything" }, " uses that to cut your earlier tries and keep the last one."] },
    ],
    related: [
      { href: "/help/follow-my-voice", label: "Help: let the script follow your voice" },
      { href: "/help/script-marks", label: "Help: mark pauses and notes" },
      { href: "/features/selfie-teleprompter", label: "Selfie teleprompter for iPhone" },
      { href: "/compare/promptsmart-alternative", label: "A PromptSmart Pro alternative" },
    ],
    published: D,
    reviewed: "2026-11-27",
  },
  {
    kind: "features",
    slug: "selfie-teleprompter",
    h1: "Read your script while you record on iPhone",
    title: "Selfie teleprompter app: read while you record on iPhone",
    description: "Record with the front camera and your script on top, the reading line just under the lens. No rig, no second device. Or mirror the text for teleprompter glass.",
    kicker: "Feature · Selfie prompter",
    answer: "Choose Selfie-style prompter, tap Record, and read: the script sits on top of the front camera's picture, with the line you are reading just under the lens. No rig and no second device. For a teleprompter rig, Teleprompter mode mirrors the text for the glass.",
    blocks: [
      { type: "h2", id: "eyes", text: "Where the words sit matters" },
      { type: "p", parts: ["The further the line you are reading sits below the camera, the further your eyes turn away from it. On an iPhone 17 Pro at arm's length (45 cm), a line in the centre of the screen turns your eyes 8.5° from the lens. Zen Teleprompter's reading line turns them 1.1°. ", { text: "The full measurements", href: "/blog/read-a-script-without-looking-like-it" }, "."] },
      { type: "shot", src: "/shots/selfie.webp", alt: "The selfie prompter during a take: the script on top of the front camera's picture, the line being read just under the lens", caption: "The line you read sits just under the lens." },
      { type: "h2", id: "record", text: "Recording a take" },
      { type: "steps", items: [
        { title: "Open a script", body: "Write one, import Text, RTF, PDF or Markdown, pull the article from a web page, or draft one with AI Script Studio." },
        { title: "Tap Start teleprompter, then Selfie-style prompter", body: "Check the warning if the room is too dark, and set the ring light: the screen's edges add soft fill light." },
        { title: "Tap Record", body: "A 3 second countdown runs. Three seconds in, the controls clear away and leave Discard and Stop." },
      ] },
      { type: "list", items: [
        "720p, 1080p or 4K at 30 or 60 fps, where your camera supports it.",
        "Flip to the back camera before a take.",
        "Follow my voice scrolls as you speak, or set a fixed speed.",
        "If your iPhone gets too hot, recording stops and the take is saved.",
      ] },
      { type: "h2", id: "glass", text: "With teleprompter glass" },
      { type: "p", parts: ["Teleprompter mode opens mirrored, so the words read the right way round in the glass. One switch turns mirroring off. A Bluetooth remote or your Apple Watch drives it from in front of the camera."] },
      { type: "h2", id: "then", text: "Then one tap" },
      { type: "p", parts: ["When you stop, the take is ready to edit. ", { text: "Fix everything", href: "/features/remove-filler-words-and-silences" }, " cuts the retakes, silences and filler words, and adds captions, music and a title."] },
    ],
    related: [
      { href: "/help/selfie-take", label: "Help: record a selfie take" },
      { href: "/help/teleprompter", label: "Help: use the teleprompter" },
      { href: "/blog/how-to-use-a-teleprompter-on-iphone", label: "How to use a teleprompter on your iPhone" },
      { href: "/features/teleprompter-remote-apple-watch", label: "Teleprompter remote: Apple Watch and Bluetooth" },
    ],
    published: D,
    reviewed: "2026-11-27",
  },
  {
    kind: "features",
    slug: "remove-filler-words-and-silences",
    h1: "Remove filler words, retakes and silences in one tap",
    title: "Remove filler words, retakes and silences from a video on iPhone",
    description: "Fix everything finds your ums, false starts and dead air, shows each step as it works, and removes them in one tap. Each cut has its own switch.",
    kicker: "Feature · Fix everything",
    answer: "Open a take and tap Fix everything. It reads the whole take, finds every retake, silence and filler word, and cuts them in one pass. Your last try of each line stays. Every cut can be turned off before you export.",
    blocks: [
      { type: "h2", id: "what", text: "What it cuts" },
      { type: "list", items: [
        "Retakes. With a script, it follows your words through it: jump back to a line you already said and the earlier try goes. A repeat written in the script is never cut.",
        "Silences. Dead air at the start and the end, and long pauses in the middle.",
        "Filler words. Um, uh and the rest are found by a rule first and cut only when the on-device model agrees.",
      ] },
      { type: "shot", src: "/shots/shelves.webp", alt: "Making it studio-ready: Cut, Sound and Look ticked off, Story under way, Share next", caption: "Fix everything at work, one shelf at a time." },
      { type: "h2", id: "check", text: "Check every cut first" },
      { type: "p", parts: ["Review shows the new length and every fix, grouped Cut, Sound and Finish, each with its own switch. If a pause was on purpose, turn that cut off. The rest stay. In the editor, your take is a line of words: tap one to cut it."] },
      { type: "shot", src: "/shots/editor.webp", alt: "The editor after Fix everything: 2:48 down to 2:05 with 9 fixes, the take as a line of words under the video", caption: "After Fix everything: 2:48 to 2:05, 9 fixes." },
      { type: "h2", id: "more", text: "And the rest of the edit" },
      { type: "p", parts: [`The same tap evens out your voice, adds music under it, karaoke captions, a cover, an opening title in one of ${THEMES.length} themes, zooms on the lines that matter, story moments and an ending card, then writes your post for Reels, TikTok and YouTube. Anything you already set stays as you set it.`] },
      { type: "h2", id: "imported", text: "Videos you filmed elsewhere" },
      { type: "p", parts: ["Tap Edit a video on Home and pick a video from Photos or Files. It is transcribed, so captions and Fix everything work on it too. Without a script, retakes are found by the AI after you agree to it, and silences and filler words are found the same way as always."] },
      { type: "h2", id: "tips", text: "Record so the cut is clean" },
      { type: "list", items: [
        "When you stumble, pause, then say the whole sentence again from its start.",
        "Keep that pause. A clear gap before the retry makes the join invisible.",
        "Skip the \"sorry, again\". It is one more thing to cut.",
      ] },
    ],
    related: [
      { href: "/help/fix-everything", label: "Help: what Fix everything changes" },
      { href: "/blog/cut-retakes-and-dead-air", label: "Cut retakes and dead air without an evening of editing" },
      { href: "/help/import-video", label: "Help: import a video" },
      { href: "/features/auto-captions", label: "Auto captions on iPhone" },
    ],
    published: D,
    reviewed: "2026-11-27",
  },
  {
    kind: "features",
    slug: "auto-captions",
    h1: "Auto captions on iPhone, karaoke or plain",
    title: "Auto captions app for iPhone: karaoke or plain, burned in or .srt",
    description: "Captions from what you said, or from your script. Karaoke lights up each word as you say it. Burn them in, or export an .srt file. They skip words you cut.",
    kicker: "Feature · Captions",
    answer: "Zen Teleprompter writes captions from what you said, or from your script, in two styles: Karaoke, where each word lights up as you say it, and Normal. Burn them into the video or export an .srt file. Captions skip words that were cut and stay in sync.",
    blocks: [
      { type: "h2", id: "styles", text: "Karaoke or Normal" },
      { type: "p", parts: ["Karaoke is the default for new takes. It pulls the eye along with your voice, which suits short vertical videos. Normal shows the line plainly, for longer and calmer ones."] },
      { type: "shot", src: "/shots/cinema.webp", alt: "The full-screen player: a finished take with a key phrase and captions", caption: "The full-screen player shows captions at the size they export." },
      { type: "h2", id: "accurate", text: "Why they come out right" },
      { type: "list", items: [
        "Captions can come from your script instead of from what you said, so names come out spelled the way you wrote them.",
        "Your script's spelling and your own name are used where the speech matches them. Press and hold a misheard word on the track to fix it, once or everywhere in the take.",
        "Cut a word from the video and it leaves the captions too.",
        "They stay in sync at any playback speed.",
        "Imported videos get captions from what you said.",
      ] },
      { type: "h2", id: "file", text: "Burned in, or a file" },
      { type: "p", parts: ["Burned-in captions are part of the picture and show everywhere, which is what Reels, TikTok and Shorts need. An .srt file is a separate track, for YouTube and other platforms that take a caption file and let viewers turn it off."] },
      { type: "h2", id: "rest", text: "Captions are one switch of many" },
      { type: "p", parts: [{ text: "Fix everything", href: "/features/remove-filler-words-and-silences" }, " adds captions along with the cuts, music, a title and the words for your post. Turn any of them off on its own."] },
    ],
    related: [
      { href: "/help/captions", label: "Help: add captions" },
      { href: "/blog/captions-that-keep-viewers", label: "Captions that keep people watching" },
      { href: "/help/titles-and-story-moments", label: "Help: title themes and story moments" },
      { href: "/help/export-and-post", label: "Help: export and copy your post words" },
    ],
    published: D,
    reviewed: "2026-11-27",
  },
  {
    kind: "features",
    slug: "teleprompter-remote-apple-watch",
    h1: "Teleprompter remote: Apple Watch and Bluetooth",
    title: "Teleprompter remote for iPhone: Apple Watch and Bluetooth",
    description: "Play, pause and jump between sections from your Apple Watch, and see when a take is recording. Or pair a Bluetooth teleprompter remote and set each button.",
    kicker: "Feature · Remotes",
    answer: "Open Zen Teleprompter on your Apple Watch to play, pause, change speed and jump between sections, and to see when a take is recording. For a Bluetooth teleprompter remote, pair it, then open Settings, Remote to test it and choose what each button does.",
    blocks: [
      { type: "shot", src: "/shots/watch.jpg", alt: "The Apple Watch remote playing a script", caption: "The Watch remote: playing, paused, recording, sections." },
      { type: "h2", id: "watch", text: "Apple Watch" },
      { type: "list", items: [
        "Comes with the iPhone app. Needs watchOS 10 or later.",
        "Play and pause, change speed, jump between sections.",
        "Shows when a take is recording, so you know from across the room.",
        "Controls whichever prompter is open on the iPhone.",
      ] },
      { type: "h2", id: "bluetooth", text: "Bluetooth remotes" },
      { type: "list", items: [
        "Bluetooth teleprompter remotes, including NEEWER's, connect from Settings, Remote.",
        "A live tester shows each press, and Change sets what a button does.",
        "Press up or down twice to change chapter.",
      ] },
      { type: "h2", id: "why", text: "Why a remote helps" },
      { type: "p", parts: ["Reaching for the phone between lines puts a jump in every take. With the remote in your hand, or on your wrist, you start, pause and skip back without leaving the frame. Or skip the remote entirely: ", { text: "Follow my voice", href: "/features/teleprompter-that-follows-your-voice" }, " moves the script when you speak."] },
    ],
    related: [
      { href: "/help/remotes", label: "Help: use Apple Watch or a Bluetooth remote" },
      { href: "/features/selfie-teleprompter", label: "Selfie teleprompter for iPhone" },
      { href: "/help/teleprompter", label: "Help: use the teleprompter" },
    ],
    published: D,
    reviewed: D,
  },

  // ---------------------------------------------------------------- comparisons
  {
    kind: "compare",
    slug: "best-teleprompter-apps-iphone",
    h1: "The best teleprompter apps for iPhone, compared",
    title: "Best teleprompter apps for iPhone in 2026, compared",
    description: "Zen Teleprompter, BIGVU, PromptSmart Pro, Teleprompter, Teleprompter.com and Teleprompter for Video compared: voice scrolling, captions, editing and price.",
    kicker: "Compare · Teleprompter apps",
    answer: "Pick by what happens after you read. For reading alone, a dedicated prompter like PromptSmart Pro or Teleprompter (by Teleprompter Apps) is enough. If you also need the video edited, captioned and ready to post, choose an app that edits too: BIGVU, Teleprompter for Video, or Zen Teleprompter, which is the one built to cut retakes, silences and filler words for you in one tap.",
    blocks: [
      { type: "p", parts: ["We make Zen Teleprompter, so read this knowing that. Every fact about another app below comes from that app's own App Store listing, read on 26 Nov 2026, and says only what the listing says. Where a listing does not mention a feature, the table says \"Not listed\", which is not the same as \"does not have\"."] },
      { type: "h2", id: "table", text: "At a glance" },
      { type: "table", head: ["App", "Voice scrolling", "Captions", "Edits the video", "Apple Watch", "Price on the listing"], rows: [
        ["Zen Teleprompter: Video Editor", "Yes, Follow my voice", "Karaoke or Normal, .srt", "Cuts retakes, silences and filler words in one tap; music, titles", "Yes", `${PRICES.trialDays} days free, then ${PRICES.monthly}/month or ${PRICES.yearly}/year`],
        ["BIGVU Teleprompter Captions AI", "Not listed", "Automatic captions, themes", "Captions, green screen, music beds, web Composer", "Not listed", "Free; premium features need a subscription"],
        ["PromptSmart Pro", "Yes, VoiceTrack", "Not listed", "Not listed", "Not listed", "$29.99, plus optional Extended at $1.99/month or $19.99/year"],
        ["Teleprompter (Teleprompter Apps Ltd)", "Not listed", ".srt captions", "Not listed", "Yes", "Free; Pro upgrade one-time or subscription"],
        ["Teleprompter.com", "Yes, VoiceGlide", "Subtitles from your script", "Trim, intros and outros, backgrounds", "Yes", "Pro from $89.99/year, 7-day free trial"],
        ["Teleprompter for Video", "Yes, voice-assisted", "Automatic captions, .srt", "Logo, resize, green screen, music", "Yes", "Free up to 750 characters a script; Pro purchases"],
      ], mark: 0 },
      { type: "p", parts: [LISTINGS] },
      { type: "h2", id: "zen", text: "Zen Teleprompter: Video Editor" },
      { type: "p", parts: ["Best for people who film themselves and post the same day. The reading line sits just under the camera, Follow my voice keeps your place, and Fix everything does the edit: it cuts retakes, silences and filler words, evens out your voice, and adds karaoke captions, music, a cover, an opening title, story moments and the words for your post. No other listing here describes cutting filler words or silences automatically."] },
      { type: "p", parts: ["Not for you if you need Android, a Mac app, a free plan or green-screen replacement: it is iPhone and iPad only, paid after the trial, and has no green screen. It is also new, with no App Store ratings yet."] },
      { type: "h2", id: "bigvu", text: "BIGVU" },
      { type: "p", parts: ["A teleprompter plus a composition tool: automatic captions with themes in your brand's logo and colours, green-screen replacement, music beds, an \"AI eye contact fix\", and a web Composer with a cloud library. Its listing reports more than 12 million users and it has about 36,700 ratings. Good if you want branded templates and to finish on the web. ", { text: "BIGVU compared with Zen Teleprompter", href: "/compare/bigvu-alternative" }, "."] },
      { type: "h2", id: "promptsmart", text: "PromptSmart Pro" },
      { type: "p", parts: ["The original voice-tracking prompter: its patented VoiceTrack starts and stops at your pace and holds your place if you go off script. It mirrors for glass, has a selfie mode that records HD video, and imports DOCX, PDF, RTF, TXT and Google Docs. You pay once, with remote control and file sync in an optional subscription. Good for speakers who need a prompter, not an editor. ", { text: "PromptSmart Pro compared with Zen Teleprompter", href: "/compare/promptsmart-alternative" }, "."] },
      { type: "h2", id: "teleprompter-apps", text: "Teleprompter, by Teleprompter Apps" },
      { type: "p", parts: ["The app simply called Teleprompter, with about 35,200 ratings, second only to BIGVU among these. A deep free prompter: unlimited scripts, cue points, timed scrolling, recording, external displays, and Pro features such as mirroring and web or Bluetooth remote control. Good for studios and rigs."] },
      { type: "h2", id: "telepromptercom", text: "Teleprompter.com" },
      { type: "p", parts: ["Voice scrolling (VoiceGlide), subtitles from your script, AI rephrasing, trimming, background replacement and an iPhone Duo mode, on iPhone, iPad and Mac with one subscription. Good if you also prompt on a Mac."] },
      { type: "h2", id: "tfv", text: "Teleprompter for Video" },
      { type: "p", parts: ["Records while you read, with voice-assisted scrolling, automatic captions or an .srt file, green screen, music and remotes including Apple Watch. A floating mode puts the script over other apps for live streams. Free for short scripts, which makes it a good first prompter."] },
      { type: "h2", id: "choose", text: "How to choose" },
      { type: "list", items: [
        "You only need to read: PromptSmart Pro or Teleprompter.",
        "You want branded templates and a web editor: BIGVU.",
        "You prompt on a Mac too: Teleprompter.com.",
        "You want to read, record and have the edit done for you on your phone: Zen Teleprompter.",
      ] },
    ],
    related: [
      { href: "/compare/bigvu-alternative", label: "A BIGVU alternative" },
      { href: "/compare/promptsmart-alternative", label: "A PromptSmart Pro alternative" },
      { href: "/features/teleprompter-that-follows-your-voice", label: "A teleprompter that follows your voice" },
      { href: "/pricing", label: "Zen Teleprompter pricing" },
    ],
    published: D,
    reviewed: D,
  },
  {
    kind: "compare",
    slug: "bigvu-alternative",
    h1: "A BIGVU alternative that edits the take for you",
    title: "BIGVU alternative: Zen Teleprompter vs BIGVU",
    description: "Both pair a teleprompter with captions. Zen Teleprompter cuts retakes, silences and filler words in one tap; BIGVU has brand themes, green screen and a web editor.",
    kicker: "Compare · BIGVU",
    answer: "Both apps put a teleprompter next to auto captions. Choose BIGVU for branded themes, green-screen replacement and a web editor with cloud storage. Choose Zen Teleprompter if the slow part for you is the edit: one tap cuts retakes, silences and filler words, then adds captions, music, a title and your post words, on your iPhone.",
    blocks: [
      { type: "p", parts: ["We make Zen Teleprompter. Everything about BIGVU here is from its App Store listing (BIGVU Teleprompter Captions AI, version 2.92.0), read on 26 Nov 2026."] },
      { type: "h2", id: "table", text: "Side by side" },
      { type: "table", head: ["", "Zen Teleprompter", "BIGVU"], rows: [
        ["Teleprompter while recording", "Yes, reading line just under the lens", "Yes"],
        ["Voice scrolling", "Follow my voice, on the device", "Not listed"],
        ["Cuts retakes, silences, filler words", "Yes, in one tap, each with a switch", "Not listed"],
        ["Captions", "Karaoke or Normal, burned in or .srt", "Automatic captions with themes"],
        ["Titles and branding", `Opening title and ending card in ${THEMES.length} themes`, "Themes with your logo and colours"],
        ["Green screen", "No", "Yes, chroma key"],
        ["Music", "Picked for the mood, under your voice", "Commercial-free music beds"],
        ["Post words", "For Reels, TikTok and YouTube", "Posts to YouTube, Facebook, Instagram, Twitter"],
        ["Where you edit", "On your iPhone or iPad", "In the app and BIGVU Composer on the web"],
        ["Apple Watch remote", "Yes", "Not listed"],
        ["Price", `${PRICES.trialDays} days free, then ${PRICES.monthly}/month or ${PRICES.yearly}/year`, "Free download; premium features need a subscription"],
        ["App Store ratings", "New, none yet", "About 36,700, average 4.7"],
      ] },
      { type: "p", parts: [LISTINGS] },
      { type: "h2", id: "why", text: "Why people look for a BIGVU alternative" },
      { type: "p", parts: ["Usually because recording was never the slow part. A teleprompter and captions get you a clean read, but the stumbles, the false starts and the dead air are still in the take. Zen Teleprompter's Fix everything is built for that hour: it reads the take against your script, keeps your last try of every line, and drops the gaps and the ums before it adds anything."] },
      { type: "h2", id: "zen-for", text: "Zen Teleprompter is better for" },
      { type: "list", items: [
        "Talking-head videos you want posted tonight, edited on the phone you filmed them on.",
        "Keeping scripts and recordings on your device. AI features are off until you agree.",
        "Reading naturally: the script follows your voice, and the line sits next to the lens.",
      ] },
      { type: "h2", id: "bigvu-for", text: "BIGVU is better for" },
      { type: "list", items: [
        "Brand kits: themes in your logo and colours.",
        "Green-screen backgrounds.",
        "Finishing on a computer, with BIGVU Composer and a cloud library.",
        "Android: BIGVU's listing says it runs on other mobile devices and the web. Zen Teleprompter is iPhone and iPad only.",
      ] },
      { type: "h2", id: "switch", text: "Switching" },
      { type: "p", parts: ["Bring your scripts as text, RTF, PDF or Markdown, or paste them in. Videos you already recorded come in through Edit a video, and Fix everything works on them too. Try it for ", `${PRICES.trialDays} days`, " before you pay."] },
    ],
    related: [
      { href: "/compare/best-teleprompter-apps-iphone", label: "The best teleprompter apps for iPhone" },
      { href: "/features/remove-filler-words-and-silences", label: "Remove filler words and silences" },
      { href: "/features/auto-captions", label: "Auto captions on iPhone" },
      { href: "/pricing", label: "Zen Teleprompter pricing" },
    ],
    published: D,
    reviewed: D,
  },
  {
    kind: "compare",
    slug: "promptsmart-alternative",
    h1: "A PromptSmart Pro alternative that also edits",
    title: "PromptSmart Pro alternative: Zen Teleprompter vs PromptSmart",
    description: "Both scroll your script with your voice. PromptSmart Pro is a prompter you buy once; Zen Teleprompter also cuts, captions and finishes the take in one tap.",
    kicker: "Compare · PromptSmart Pro",
    answer: "Both apps scroll the script with your voice. PromptSmart Pro is a dedicated prompter you buy once, with remote control and file sync in an optional subscription. Zen Teleprompter is a subscription that also edits the take: one tap cuts retakes, silences and filler words, then adds captions, music and a title.",
    blocks: [
      { type: "p", parts: ["We make Zen Teleprompter. Everything about PromptSmart Pro here is from its App Store listing (PromptSmart Pro - Teleprompter, version 4.1.3), read on 26 Nov 2026."] },
      { type: "h2", id: "table", text: "Side by side" },
      { type: "table", head: ["", "Zen Teleprompter", "PromptSmart Pro"], rows: [
        ["Voice scrolling", "Follow my voice, recognised on the device", "VoiceTrack, patented"],
        ["Mirroring for glass", "Yes", "Yes"],
        ["Selfie recording", "Yes, reading line just under the lens", "Yes, HD video"],
        ["Script import", "Text, RTF, PDF, Markdown, a web page", "DOCX, PDF, RTF, TXT, Google Docs, cloud drives"],
        ["Edits the video", "Cuts retakes, silences, filler words in one tap", "Not listed"],
        ["Captions", "Karaoke or Normal, burned in or .srt", "Not listed"],
        ["AI script writing", "AI Script Studio, off until you agree", "Not listed"],
        ["Remotes", "Apple Watch and Bluetooth, included", "Remote Control in the optional Extended subscription"],
        ["Price", `${PRICES.trialDays} days free, then ${PRICES.monthly}/month or ${PRICES.yearly}/year`, "$29.99, plus optional Extended at $1.99/month or $19.99/year"],
        ["App Store ratings", "New, none yet", "About 12,100, average 4.6"],
      ] },
      { type: "p", parts: [LISTINGS] },
      { type: "h2", id: "pick-promptsmart", text: "Keep PromptSmart Pro if" },
      { type: "list", items: [
        "You read live, on stage or in a studio, and never edit what you film.",
        "You want to pay once.",
        "Your scripts live in Word or Google Docs.",
      ] },
      { type: "h2", id: "pick-zen", text: "Choose Zen Teleprompter if" },
      { type: "list", items: [
        "You record yourself for Reels, TikTok or YouTube and the edit is the slow part.",
        "You want captions, music, a title and your post words done in the same app.",
        "You want an Apple Watch remote without an extra subscription.",
      ] },
      { type: "h2", id: "voice", text: "On voice scrolling" },
      { type: "p", parts: ["Both apps move with your voice and wait when you stop. Zen Teleprompter listens in your script's language, recognises the names and numbers your script contains, and skips notes in curly braces. Recognition runs on your iPhone. ", { text: "How Follow my voice works", href: "/features/teleprompter-that-follows-your-voice" }, "."] },
    ],
    related: [
      { href: "/compare/best-teleprompter-apps-iphone", label: "The best teleprompter apps for iPhone" },
      { href: "/features/teleprompter-that-follows-your-voice", label: "A teleprompter that follows your voice" },
      { href: "/compare/bigvu-alternative", label: "A BIGVU alternative" },
      { href: "/pricing", label: "Zen Teleprompter pricing" },
    ],
    published: D,
    reviewed: D,
  },
];

export const guideHref = (g: { kind: GuideKind; slug: string }) => `/${g.kind}/${g.slug}`;
export const guidesOf = (kind: GuideKind) => GUIDES.filter((g) => g.kind === kind);
export const findGuide = (kind: GuideKind, slug: string) => GUIDES.find((g) => g.kind === kind && g.slug === slug);
export type { Block };
