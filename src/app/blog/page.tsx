import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, postHref } from "@/content/posts";
import { fmtDate } from "@/content/site";
import { Crumbs, Shot } from "@/components/ui";

const DESC = "Practical notes for people who film alone: reading a script on camera, cutting retakes, captions and opening lines.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESC,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog · Zen Teleprompter", description: DESC, url: "/blog" },
  twitter: { title: "Blog · Zen Teleprompter", description: DESC },
};

export default function Blog() {
  return (
    <div className="wrap">
      <div className="phead">
        <Crumbs items={[{ name: "Blog", href: "/blog" }]} />
        <span className="tc y">Blog · {POSTS.length} posts</span>
        <h1 className="disp d2">The cutting room.</h1>
        <p className="lede">Notes on reading, recording and finishing a video on your own.</p>
      </div>
      <div className="clips" style={{ marginTop: 36 }}>
        {POSTS.map((p) => (
          <Link key={p.slug} className="clip" href={postHref(p)}>
            <Shot src={p.shot} alt="" sizes="150px" />
            <div className="ci">
              <span className="tc y">{p.tag} · {fmtDate(p.published)} · {p.minutes} min</span>
              <h2>{p.title}</h2>
              <p className="muted" style={{ fontSize: 15 }}>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
