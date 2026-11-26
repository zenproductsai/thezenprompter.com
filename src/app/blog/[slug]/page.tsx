import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { notFound } from "next/navigation";
import Blocks, { headingsOf } from "@/components/Blocks";
import DocPage from "@/components/DocPage";
import { POSTS, findPost, postHref } from "@/content/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.seoTitle ?? p.title, description: p.description, path: postHref(p), type: "article", published: p.published, modified: p.modified });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = findPost((await params).slug);
  if (!p) notFound();
  const related = POSTS.filter((x) => x.slug !== p.slug).map((x) => ({ href: postHref(x), label: x.title }));
  return (
    <DocPage byFounder crumbs={[{ name: "Blog", href: "/blog" }, { name: p.title, href: postHref(p) }]} kicker={`${p.tag} · ${p.minutes} min`} h1={p.title}
      path={postHref(p)} type="BlogPosting" published={p.published} modified={p.modified} description={p.description}
      headings={headingsOf(p.blocks)} related={related} relatedTitle="More posts">
      <Blocks blocks={p.blocks} />
    </DocPage>
  );
}
