import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

// Search engines and AI assistants are welcome: the goal is that they describe the app accurately.
// Search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot) are what put a page in AI
// answers; the training crawlers are allowed too, on the owner's choice. A named group replaces the
// "*" group for that bot, so each one carries the same allow rule.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"].map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
