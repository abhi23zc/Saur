import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Shield } from "lucide-react";
import RichText, { headingId } from "@/components/blog/RichText";
import { ArticleToc, ReadingProgress, ShareControls, ViewReporter } from "@/components/blog/ArticleEnhancements";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedPost, getPublishedPosts, plainText, readingTime } from "@/lib/blog/data";
import type { BlogPost, RichTextNode } from "@/lib/blog/types";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saurengineering.in";

const nodeText = (node: RichTextNode): string =>
  node.text ?? node.content?.map(nodeText).join("") ?? "";

function headings(node: RichTextNode): { id: string; text: string; level: number }[] {
  const own =
    node.type === "heading"
      ? [{ id: headingId(nodeText(node)), text: nodeText(node), level: Number(node.attrs?.level ?? 2) }]
      : [];
  return [...own, ...(node.content?.flatMap(headings) ?? [])];
}

function socialImage(post: BlogPost) {
  return post.seoOgImage || post.seoTwitterImage || post.coverImage || undefined;
}

function canonical(post: BlogPost) {
  return post.seoCanonicalUrl || siteUrl + "/blog/" + post.slug;
}

function relatedFor(post: BlogPost, posts: BlogPost[]) {
  const byId = post.relatedPostIds
    .map((id) => posts.find((item) => item.id === id))
    .filter(Boolean) as BlogPost[];
  const fallback = posts.filter(
    (item) =>
      item.id !== post.id &&
      item.categories.some((category) => post.categories.includes(category)) &&
      !byId.some((related) => related.id === item.id)
  );
  return [...byId, ...fallback].slice(0, 3);
}

function authorInitials(name?: string): string {
  if (!name) return "SE";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  const url = canonical(post);
  const image = socialImage(post);
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogTitle = post.seoOgTitle || title;
  const ogDescription = post.seoOgDescription || description;
  const twitterTitle = post.seoTwitterTitle || ogTitle;
  const twitterDescription = post.seoTwitterDescription || ogDescription;
  return {
    title,
    description,
    keywords: [post.seoFocusKeyword, ...post.tags].filter(Boolean) as string[],
    authors: [{ name: post.authorName }],
    alternates: { canonical: url },
    robots: post.seoNoIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      tags: post.tags,
      siteName: "Saur Engineering & Consultancy",
      images: image ? [{ url: image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: post.seoTwitterImage ? [post.seoTwitterImage] : image ? [image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const posts = await getPublishedPosts();
  const related = relatedFor(post, posts);
  const date =
    post.publishedAt &&
    new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(post.publishedAt));
  const toc = headings(post.content).filter((item) => item.level <= 3);
  const readMin = readingTime(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": post.seoSchemaType,
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: socialImage(post) ? [socialImage(post)] : undefined,
    author: {
      "@type": "Person",
      name: post.authorName,
      jobTitle: post.authorRole || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Saur Engineering & Consultancy",
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical(post) },
    keywords: post.tags.join(", "),
    articleSection: post.categories.join(", "),
    wordCount: plainText(post.content).split(/\s+/).filter(Boolean).length,
    inLanguage: "en-US",
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-20">
      <ReadingProgress />
      <ViewReporter id={post.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════════════
         1. CLEAN EDITORIAL ARTICLE HEADER
         ═══════════════════════════════════════════════════════════════ */}
      <header className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-[#e67c00] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Engineering Blog</span>
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 pt-1">
            {post.categories.map((category) => (
              <span
                key={category}
                className="rounded-md bg-orange-50 border border-orange-200/80 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#e67c00]"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Article Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b233a] leading-tight">
            {post.title}
          </h1>

          {/* Excerpt / Subtitle */}
          <p className="text-lg sm:text-xl leading-relaxed text-slate-600">
            {post.excerpt}
          </p>

          {/* Author Byline & Social Share Controls */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#0b233a] text-white flex items-center justify-center font-mono text-sm font-bold shrink-0 shadow-xs">
                {authorInitials(post.authorName)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {post.authorName || "Saur Engineering Team"}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  {date && <span>{date}</span>}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{readMin} min read</span>
                  </span>
                </div>
              </div>
            </div>

            <ShareControls title={post.title} />
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
         2. HERO COVER IMAGE
         ═══════════════════════════════════════════════════════════════ */}
      {post.coverImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100">
            <Image
              src={post.coverImage}
              alt={`${post.title} cover`}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
         3. ARTICLE READING BODY (2-Column with Table of Contents)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-12 items-start">
        
        {/* Sticky Table of Contents (Desktop) */}
        <ArticleToc headings={toc} />

        {/* Main Article Prose Content */}
        <article className="w-full max-w-3xl mx-auto space-y-12">
          
          {/* Article Markdown / RichText Content */}
          <div className="prose-container">
            <RichText content={post.content} />
          </div>

          {/* Key Technical Takeaways Callout */}
          {post.techTakeaways.length > 0 && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#e67c00]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a]">
                  Key Technical Takeaways
                </h3>
              </div>
              <ul className="space-y-3">
                {post.techTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-3 text-sm leading-relaxed text-slate-800 font-medium">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tags Ribbon */}
          {post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase">Topic Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#0b233a] text-white flex items-center justify-center font-display font-extrabold text-xl shrink-0 shadow-sm">
              {authorInitials(post.authorName)}
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#e67c00] font-bold">
                Written by
              </span>
              <h4 className="font-display text-lg font-extrabold text-[#0b233a]">
                {post.authorName || "Saur Engineering Team"}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.authorRole || "Multidisciplinary Engineering & Project Execution Division at Saur Engineering & Consultancy."}
              </p>
            </div>
          </div>

          {/* Engineering Advisory / Consultation Card */}
          <div className="rounded-3xl bg-[#0b233a] border border-[#163654] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl space-y-4">
            <div className="relative space-y-3 max-w-xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                Engineering Advisory &amp; Consulting
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Need engineering support for your upcoming project?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with Saur&apos;s senior multidisciplinary engineering team for FEED verification, stress analysis, 3D piping design, or EPC project delivery advisory.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF8A00] hover:bg-[#e67c00] active:scale-[0.98] px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md transition-all"
                >
                  <span>Request Technical Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </article>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
         4. RELATED ENGINEERING INSIGHTS GRID
         ═══════════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/70 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#e67c00]">
                Continue Reading
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0b233a]">
                Related Engineering Insights
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
