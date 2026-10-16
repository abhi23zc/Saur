import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogFilters, { blogHref } from "@/components/blog/BlogFilters";
import BlogCard from "@/components/blog/BlogCard";
import JournalConsultation from "@/components/blog/JournalConsultation";
import { getBlogIndex } from "@/lib/blog/data";

type Props = { searchParams: Promise<{ q?: string | string[]; category?: string | string[]; page?: string | string[] }> };
const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) || "";
const title = "Engineering Insights & Journal | Saur Engineering";
const description = "Practical perspectives on FEED, detailed engineering, piping design and project delivery from Saur Engineering & Consultancy.";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);
  const filtered = Boolean(first(params.q) || first(params.category));
  return { title: page > 1 ? `Engineering Insights — Page ${page} | Saur Engineering` : title, description,
    alternates: { canonical: blogHref({ page }), types: { "application/rss+xml": "/api/rss.xml" } },
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: { title, description, type: "website", url: "/blog", siteName: "Saur Engineering & Consultancy", images: [{ url: "/media/page-services-hero.png", alt: "Saur Engineering industrial project insights" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/media/page-services-hero.png"] },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = first(params.q).trim().slice(0, 160);
  const category = first(params.category).slice(0, 160);
  const requestedPage = Math.max(1, Number.parseInt(first(params.page), 10) || 1);
  if (!Number.isSafeInteger(requestedPage) || requestedPage > 1000000) notFound();
  const pageSize = 6;
  const { posts: visible, count, categories } = await getBlogIndex(query, category, requestedPage, pageSize);
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  if (requestedPage > totalPages) notFound();
  const page = requestedPage;
  const featured = !query && !category && page === 1 ? visible[0] : undefined;
  const articles = featured ? visible.slice(1) : visible;
  return <main className="journal journal-listing" id="main-content">
    <div className="journal-shell">
      <header className="journal-intro"><p className="journal-eyebrow">Insights from practice</p><h1>Engineering insights.<br />Practical perspectives.</h1><p>Ideas and expertise for safer, smarter project delivery.</p></header>
      {featured && <BlogCard post={featured} featured />}
      <BlogFilters categories={categories} category={category} query={query} />
      <section className="journal-feed" aria-labelledby="insights-heading">
        <div className="journal-section-heading"><h2 id="insights-heading">{query ? `Results for “${query}”` : category || (page > 1 ? "Engineering insights" : "Latest insights")}</h2>{(query || category) && <Link href="/blog" className="journal-reset">Clear filters</Link>}</div>
        {articles.length ? <div className="journal-grid">{articles.map((post) => <BlogCard key={post.id} post={post} />)}</div> : !featured && <div className="journal-empty"><h3>{page > totalPages ? "This page has no articles yet." : "No articles found."}</h3><p>Try another topic or search term to find an engineering perspective.</p><Link href="/blog" className="journal-text-link">Explore all insights <ArrowRight size={16} /></Link></div>}
        {totalPages > 1 && <nav className="journal-pagination" aria-label="Article pages">
          {page > 1 && <Link href={blogHref({ category, query, page: Math.min(page - 1, totalPages) })} aria-label="Previous page"><ArrowLeft size={17} /></Link>}
          {Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1).map((n, i, pages) => <span key={n}>{i > 0 && n - pages[i - 1] > 1 && <span className="journal-pagination-gap">…</span>}<Link href={blogHref({ category, query, page: n })} aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined}>{n}</Link></span>)}
          {page < totalPages && <Link href={blogHref({ category, query, page: page + 1 })} aria-label="Next page"><ArrowRight size={17} /></Link>}
        </nav>}
      </section>
      <JournalConsultation />
    </div>
  </main>;
}
