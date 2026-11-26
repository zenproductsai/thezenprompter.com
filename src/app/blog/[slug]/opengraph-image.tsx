import { POSTS, findPost } from "@/content/posts";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Zen Teleprompter: Video Editor blog";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = findPost((await params).slug);
  return renderOg("Blog", p?.title ?? "The cutting room");
}
