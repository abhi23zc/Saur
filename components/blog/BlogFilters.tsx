import Link from "next/link";
import { Search } from "lucide-react";

export function blogHref({ category = "", query = "", page = 1 }: { category?: string; query?: string; page?: number } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  return `/blog${params.size ? `?${params}` : ""}`;
}

export default function BlogFilters({ categories, category, query }: { categories: string[]; category: string; query: string }) {
  return <div className="journal-filters" id="articles">
    <nav className="journal-topics" aria-label="Article topics">
      {["", ...categories].map((name) => <Link key={name} href={blogHref({ category: name, query })} className={category === name ? "is-active" : ""} aria-current={category === name ? "page" : undefined}>{name || "All insights"}</Link>)}
    </nav>
    <form action="/blog" className="journal-search" role="search">
      {category && <input type="hidden" name="category" value={category} />}
      <label htmlFor="article-search" className="sr-only">Search engineering articles</label>
      <input id="article-search" type="search" name="q" defaultValue={query} placeholder="Search insights…" maxLength={160} />
      <button type="submit" aria-label="Search articles"><Search size={18} aria-hidden="true" /></button>
    </form>
  </div>;
}
