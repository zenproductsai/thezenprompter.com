import type { Metadata } from "next";
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
  return {
    title: a.title,
    description: a.answer,
    alternates: { canonical: helpHref(a) },
    openGraph: { type: "article", title: `${a.title} · Zen Teleprompter`, description: a.answer, url: helpHref(a), modifiedTime: a.reviewed },
    twitter: { title: `${a.title} · Zen Teleprompter`, description: a.answer },
  };
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
