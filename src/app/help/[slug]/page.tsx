import type { Metadata } from "next";
import { clip, pageMeta } from "@/lib/meta";
import { notFound } from "next/navigation";
import Blocks, { headingsOf } from "@/components/Blocks";
import DocPage from "@/components/DocPage";
import { HELP, HELP_CATEGORIES, findHelp, helpHref, helpIn } from "@/content/help";

export const dynamicParams = false;

export function generateStaticParams() {
  return HELP.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = findHelp((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: clip(a.answer), path: helpHref(a), type: "article", published: a.reviewed, modified: a.reviewed });
}

export default async function HelpArticle({ params }: { params: Promise<{ slug: string }> }) {
  const a = findHelp((await params).slug);
  if (!a) notFound();
  const cat = HELP_CATEGORIES.find((c) => c.id === a.category)!;
  const related = [...helpIn(a.category), ...HELP].filter((x, i, all) => x.slug !== a.slug && all.indexOf(x) === i).slice(0, 5).map((x) => ({ href: helpHref(x), label: x.title }));
  return (
    <DocPage crumbs={[{ name: "Help", href: "/help" }, { name: a.title, href: helpHref(a) }]} kicker={cat.name} h1={a.title} answer={a.answer}
      path={helpHref(a)} type="TechArticle" published={a.reviewed} modified={a.reviewed} description={a.answer}
      headings={headingsOf(a.blocks)} related={related} relatedTitle="Related help">
      <Blocks blocks={a.blocks} />
    </DocPage>
  );
}
