import type { Metadata } from "next";
import LocalHome from "@/components/LocalHome";
import { ES, LANG_ALTERNATES } from "@/content/intl";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({ absoluteTitle: ES.title, description: ES.description, path: ES.path, locale: "es", languages: LANG_ALTERNATES });

export default function Page() {
  return <LocalHome c={ES} />;
}
