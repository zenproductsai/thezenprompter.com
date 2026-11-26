import { findGuide, guidesOf } from "@/content/guides";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return guidesOf("compare").map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = findGuide("compare", (await params).slug);
  return renderOg("Compare", g?.h1 ?? "Compare");
}
