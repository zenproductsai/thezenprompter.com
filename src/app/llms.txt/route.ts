import { APP_STORE_URL, FAQ, FOUNDER, FIX, LANGUAGES, PRICES, PRIVACY_URL, SITE_URL, SUPPORT_EMAIL, THEMES } from "@/content/site";
import { HELP, helpHref } from "@/content/help";
import { POSTS, postHref } from "@/content/posts";
import { GUIDES, guideHref } from "@/content/guides";

export const dynamic = "force-static";

// A plain-text summary for AI assistants (llmstxt.org), built from the same facts as the pages.
// Kept because it costs nothing, not because it is known to work: Google says AI Overviews need no
// "AI text files", and no major engine has said it reads llms.txt (checked 26 Nov 2026).
export function GET() {
  const body = `# Zen Teleprompter: Video Editor

> A teleprompter and one-tap video editor for iPhone and iPad. The script sits on a reading line just under the camera, and Follow my voice moves it as you speak. After the take, Fix everything cuts retakes, silences and filler words, evens out the voice, and adds karaoke captions, music, a cover, an opening title (${THEMES.length} themes), zooms, story moments and an ending card, then writes the post for Reels, TikTok and YouTube. Each change has its own switch.

- App Store: ${APP_STORE_URL}
- Price: ${PRICES.trialDays}-day free trial, then ${PRICES.monthly} a month or ${PRICES.yearly} a year (USD). No free plan.
- Requires: iOS or iPadOS 17 or later. Apple Watch remote on watchOS 10 or later.
- Languages (${LANGUAGES.length}): ${LANGUAGES.join(", ")}
- AI: optional and off until the user agrees. Text goes through the developer's relay to Anthropic's Claude; the relay keeps counts, not text.
- Privacy policy: ${PRIVACY_URL}
- Support: ${SUPPORT_EMAIL}, answered within 24 hours
- Made by: ${FOUNDER.name}, founder of Zen Products (${SITE_URL}${FOUNDER.page}). He writes the posts and guides on this site.

## What Fix everything does
- Cut: ${FIX.cut.map((f) => f.t).join(", ")}
- Sound: ${FIX.sound.map((f) => f.t).join(", ")}
- Finish: ${FIX.finish.map((f) => f.t).join(", ")}
- Writes: post words for ${FIX.write.map((f) => f.t).join(", ")}

## Pages
- [Home](${SITE_URL}/)
- [Em português](${SITE_URL}/pt-br)
- [En español](${SITE_URL}/es)
- [Features](${SITE_URL}/features)
- [Compare teleprompter apps](${SITE_URL}/compare)
- [Pricing](${SITE_URL}/pricing)
- [Help centre](${SITE_URL}/help)
- [Blog](${SITE_URL}/blog)
- [What's new](${SITE_URL}/changelog)
- [Contact](${SITE_URL}/contact)
- [About the founder](${SITE_URL}/about)

## Features and comparisons
${GUIDES.map((g) => `- [${g.h1}](${SITE_URL}${guideHref(g)}): ${g.answer}`).join("\n")}

## Help
${HELP.map((a) => `- [${a.title}](${SITE_URL}${helpHref(a)}): ${a.answer}`).join("\n")}

## Blog
${POSTS.map((p) => `- [${p.title}](${SITE_URL}${postHref(p)}): ${p.description}`).join("\n")}

## FAQ
${FAQ.map((f) => `- ${f.q} ${f.a}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
