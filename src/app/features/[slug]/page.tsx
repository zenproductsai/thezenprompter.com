import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocks, { headingsOf } from "@/components/Blocks";
import DocPage from "@/components/DocPage";
import { findGuide, guideHref, guidesOf } from "@/content/guides";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return guidesOf("features").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = findGuide("features", (await params).slug);
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.description, path: guideHref(g), type: "article", published: g.published, modified: g.reviewed });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = findGuide("features", (await params).slug);
  if (!g) notFound();
  return (
    <DocPage crumbs={[{ name: "Features", href: "/features" }, { name: g.h1, href: guideHref(g) }]} kicker={g.kicker} h1={g.h1} answer={g.answer}
      path={guideHref(g)} type="Article" published={g.published} modified={g.reviewed} description={g.description}
      headings={headingsOf(g.blocks)} related={g.related} relatedTitle="Read next">
      <Blocks blocks={g.blocks} />
    </DocPage>
  );
}
