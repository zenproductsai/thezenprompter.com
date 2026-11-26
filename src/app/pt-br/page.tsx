import type { Metadata } from "next";
import LocalHome from "@/components/LocalHome";
import { PT, LANG_ALTERNATES } from "@/content/intl";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({ absoluteTitle: PT.title, description: PT.description, path: PT.path, locale: "pt-BR", languages: LANG_ALTERNATES });

export default function Page() {
  return <LocalHome c={PT} />;
}
