import Image from "next/image";
import Link from "next/link";
import RichText from "./RichText";
import { ArticleToc, ShareControls } from "./ArticleEnhancements";
import { articleHeadings, formatDate, readingTime } from "@/lib/blog/presentation";
import type { BlogPost } from "@/lib/blog/types";

// Shared by the public page, saved preview and unsaved editor preview.
export default function ArticleView({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const toc = articleHeadings(post.content).filter((heading) => heading.level <= 3);
  const teamAuthor = /team|saur engineering/i.test(post.authorName);
  return (
      <article>
        <header className="journal-article-header">
          <p className="journal-eyebrow">{post.categories.join(" / ") || "Engineering insights"}</p>
          <h1>{post.title}</h1><p className="journal-standfirst">{post.excerpt}</p>
          <div className="journal-byline"><div><span className="journal-avatar" aria-hidden="true">{post.authorName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("") || "SE"}</span><div><p>{post.authorName || "Saur Engineering Team"}</p><div className="journal-meta">{post.publishedAt && <span>Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>}{post.publishedAt && post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt?.slice(0, 10) && <span>Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}<span>{readingTime(post.content)} min read</span></div></div></div>{!preview && <ShareControls title={post.title} />}</div>
        </header>
        {post.coverImage && <figure className="journal-cover"><Image src={post.coverImage} alt={post.coverAlt || post.title} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" /></figure>}{post.coverImage && post.coverCaption && <p className="journal-cover-caption">{post.coverCaption}</p>}
        <div className="journal-reading-layout"><ArticleToc headings={toc} /><div className="journal-prose-column"><RichText content={post.content} />
          {post.techTakeaways.length > 0 && <section className="journal-takeaways" aria-labelledby="takeaways-title"><h2 id="takeaways-title">Key technical takeaways</h2><ul>{post.techTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></section>}
          {post.tags.length > 0 && <div className="journal-tags"><span>Topics</span>{post.tags.map((tag) => <Link key={tag} href={`/blog?q=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>}
          <section className="journal-author" aria-label="About the author"><p className="journal-eyebrow">Written by</p><h2>{post.authorName || "Saur Engineering Team"}</h2><p>{post.authorRole || "Engineering perspectives from Saur Engineering & Consultancy."}</p>{teamAuthor && <Link href="/company" className="journal-text-link">About our team ↗</Link>}</section>
        </div></div>
      </article>
  );
}
