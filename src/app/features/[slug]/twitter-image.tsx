import { findGuide, guidesOf } from "@/content/guides";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return guidesOf("features").map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = findGuide("features", (await params).slug);
  return renderOg("Features", g?.h1 ?? "Features");
}
