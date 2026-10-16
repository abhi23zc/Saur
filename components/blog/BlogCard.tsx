import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { articleUrl, formatDate, readingTime } from "@/lib/blog/presentation";

export default function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const Heading = featured ? "h2" : "h3";
  return (
    <article className={featured ? "journal-feature" : "journal-card"}>
      <Link href={articleUrl(post)} className="journal-image" tabIndex={-1} aria-hidden="true">
        {post.coverImage ? <Image src={post.coverImage} alt={post.coverAlt || ""} fill priority={featured} sizes={featured ? "(max-width: 760px) 100vw, 60vw" : "(max-width: 760px) 100vw, 50vw"} className="object-cover" /> : <span className="journal-image-fallback">SAUR <span>Engineering perspectives</span></span>}
      </Link>
      <div className="journal-card-copy">
        <p className="journal-eyebrow">{post.categories[0] || "Engineering insights"}</p>
        <Heading><Link href={articleUrl(post)}>{post.title}</Link></Heading>
        <p className="journal-excerpt">{post.excerpt}</p>
        <div className="journal-meta"><span>{post.authorName || "Saur Engineering Team"}</span>{post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}<span>{readingTime(post.content)} min read</span></div>
        <Link href={articleUrl(post)} className="journal-text-link" aria-label={`Read article: ${post.title}`}>Read article <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
