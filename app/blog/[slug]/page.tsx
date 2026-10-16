import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleView from "@/components/blog/ArticleView";
import { ReadingProgress, ViewReporter } from "@/components/blog/ArticleEnhancements";
import BlogCard from "@/components/blog/BlogCard";
import JournalConsultation from "@/components/blog/JournalConsultation";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog/data";
import { plainText } from "@/lib/blog/presentation";
import type { BlogPost } from "@/lib/blog/types";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saurengineering.in";
const absolute = (path: string) => new URL(path, siteUrl).href;
const canonical = (post: BlogPost) => post.seoCanonicalUrl || absolute(`/blog/${post.slug}`);
const socialImage = (post: BlogPost) => post.seoOgImage || post.coverImage || "/media/page-services-hero.png";
const json = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return { title, description, authors: [{ name: post.authorName }], alternates: { canonical: canonical(post) },
    robots: post.seoNoIndex ? { index: false, follow: true } : undefined,
    openGraph: { title: post.seoOgTitle || title, description: post.seoOgDescription || description, url: canonical(post), type: "article", publishedTime: post.publishedAt || undefined, modifiedTime: post.updatedAt, authors: [post.authorName], tags: post.tags, siteName: "Saur Engineering & Consultancy", images: [{ url: socialImage(post), alt: post.title }] },
    twitter: { card: "summary_large_image", title: post.seoTwitterTitle || post.seoOgTitle || title, description: post.seoTwitterDescription || post.seoOgDescription || description, images: [post.seoTwitterImage || socialImage(post)] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const posts = await getPublishedPosts();
  const related = [...posts.filter((item) => item.id !== post.id && post.relatedPostIds.includes(item.id)), ...posts.filter((item) => item.id !== post.id && !post.relatedPostIds.includes(item.id) && item.categories.some((category) => post.categories.includes(category)))].slice(0, 2);
  const teamAuthor = /team|saur engineering/i.test(post.authorName);
  const structuredData = [
    { "@context": "https://schema.org", "@type": post.seoSchemaType, headline: post.title, description: post.seoDescription || post.excerpt, image: [absolute(socialImage(post))], author: { "@type": teamAuthor ? "Organization" : "Person", name: post.authorName, ...(teamAuthor ? { url: absolute("/company") } : {}), ...(!teamAuthor && post.authorRole ? { jobTitle: post.authorRole } : {}) }, publisher: { "@type": "Organization", name: "Saur Engineering & Consultancy", url: siteUrl }, datePublished: post.publishedAt, dateModified: post.updatedAt, mainEntityOfPage: { "@type": "WebPage", "@id": canonical(post) }, articleSection: post.categories.join(", "), wordCount: plainText(post.content).split(/\s+/).filter(Boolean).length, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absolute("/") }, { "@type": "ListItem", position: 2, name: "Blog", item: absolute("/blog") }, { "@type": "ListItem", position: 3, name: post.title, item: absolute(`/blog/${post.slug}`) }] },
  ];
  return <main className="journal journal-article" id="main-content">
    <ReadingProgress /><ViewReporter id={post.id} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(structuredData) }} />
    <div className="journal-shell">
      <nav className="journal-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><Link href="/blog">Blog</Link></li><li aria-current="page">{post.categories[0] || "Article"}</li></ol></nav>
      <ArticleView post={post} />
      {related.length > 0 && <section className="journal-related" aria-labelledby="related-title"><div className="journal-section-heading"><h2 id="related-title">Related reading</h2><Link href="/blog" className="journal-text-link">All insights ↗</Link></div><div className="journal-grid">{related.map((item) => <BlogCard key={item.id} post={item} />)}</div></section>}
      <JournalConsultation />
    </div>
  </main>;
}
