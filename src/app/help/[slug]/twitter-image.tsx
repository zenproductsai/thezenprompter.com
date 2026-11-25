import { HELP, findHelp } from "@/content/help";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter help";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return HELP.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = findHelp((await params).slug);
  return renderOg("Help", a?.title ?? "Help centre");
}
