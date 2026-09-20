"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpDown, CheckCircle2, Mail, RotateCcw, Search, Sparkles, X } from "lucide-react";
import BlogCard from "./BlogCard";
import type { BlogPost, RichTextNode } from "@/lib/blog/types";

function textFromNode(node: RichTextNode): string {
  return node.text ?? node.content?.map(textFromNode).join(" ") ?? "";
}

function readingTime(content: BlogPost["content"]) {
  const words = textFromNode(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default function BlogFilters({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "quickest" | "longest">("newest");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Extract unique categories and calculate counts
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach((p) => {
      p.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    const list = ["All", ...Object.keys(counts).filter((k) => k !== "All")];
    return { counts, list };
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const searchContent = `${post.title} ${post.excerpt} ${post.categories.join(" ")} ${post.tags.join(" ")} ${post.authorName}`.toLowerCase();
      const matchesQuery = query.trim() === "" || searchContent.includes(query.toLowerCase().trim());
      const matchesCategory = selectedCategory === "All" || post.categories.includes(selectedCategory);
      return matchesQuery && matchesCategory;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
      }
      if (sortBy === "quickest") {
        return readingTime(a.content) - readingTime(b.content);
      }
      if (sortBy === "longest") {
        return readingTime(b.content) - readingTime(a.content);
      }
      return 0;
    });

    return result;
  }, [posts, query, selectedCategory, sortBy]);

  function resetFilters() {
    setQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
  }

  const isDefaultView = query === "" && selectedCategory === "All" && sortBy === "newest";
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = isDefaultView && filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Category Tab Strip & Search Filter Bar */}
      <div className="border-b border-slate-200/90 pb-4 space-y-4">
        {/* Top: Category Tabs & Search/Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Scrollable Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categoryStats.list.map((item) => {
              const isSelected = selectedCategory === item;
              const count = categoryStats.counts[item] || 0;
              return (
                <button
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={
                    (isSelected
                      ? "bg-[#0b233a] text-white shadow-xs font-bold"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80 font-medium") +
                    " rounded-full px-4 py-2 text-xs font-mono transition-all shrink-0 cursor-pointer flex items-center gap-2"
                  }
                >
                  <span>{item}</span>
                  <span
                    className={
                      (isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500") +
                      " rounded-full px-1.5 py-0.2 text-[10px] font-bold font-mono"
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-8 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b233a] focus:ring-1 focus:ring-[#0b233a] transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-medium text-slate-700 outline-none focus:border-[#0b233a] cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="quickest">Quick Reads (&lt;5 min)</option>
                <option value="longest">In-Depth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pill Summary */}
        {!isDefaultView && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono">
            <span>
              Showing {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"}
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {query && ` for "${query}"`}
            </span>
            <button
              onClick={resetFilters}
              className="text-[#e67c00] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          </div>
        )}
      </div>

      {/* Featured Post (Displayed when default view is active) */}
      {featuredPost && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
              Featured Story
            </span>
          </div>
          <BlogCard post={featuredPost} featured />
        </section>
      )}

      {/* Articles Feed Section */}
      <section className="space-y-6">
        {featuredPost && standardPosts.length > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0b233a]">
              Latest Engineering Articles
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {standardPosts.length} article{standardPosts.length === 1 ? "" : "s"}
            </span>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#0b233a]">No articles found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any articles matching &ldquo;{query || selectedCategory}&rdquo;. Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b233a] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#163654] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {standardPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Engineering Newsletter / Technical Briefing Callout */}
      <section className="rounded-3xl bg-gradient-to-br from-[#0b233a] to-[#12314e] border border-white/10 p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-mono font-bold text-[#FF8A00]">
            <Mail className="w-3.5 h-3.5" />
            <span>Saur Engineering Digest</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Stay ahead with monthly engineering insights.
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get practical perspectives on FEED, ASME &amp; API code compliance, piping stress analysis, and industrial project delivery directly to your inbox.
          </p>

          {newsletterSubscribed ? (
            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! You have subscribed to Saur Engineering Digest.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder:text-slate-400 outline-none focus:border-[#FF8A00] focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#FF8A00] hover:bg-[#e67c00] active:scale-[0.98] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
