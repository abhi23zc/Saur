import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Rss, Sparkles } from "lucide-react";
import BlogFilters from "@/components/blog/BlogFilters";
import { getPublishedPosts } from "@/lib/blog/data";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights | Saur Engineering & Consultancy",
  description:
    "Practical engineering insights on FEED, detailed engineering, ASME/API compliance, offshore infrastructure, and project execution from Saur Engineering.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* ═══════════════════════════════════════════════════════════════
         1. CLEAN EDITORIAL PUBLICATION HEADER
         ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200/90 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            {/* Title & Tagline */}
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-orange-50 border border-orange-200/80 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#e67c00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                <span>Saur Engineering Journal</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0b233a] leading-tight">
                Insights &amp; Technical Perspectives
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Practical guides, FEED methodologies, ASME/API compliance, piping stress analysis, and multidisciplinary delivery insights.
              </p>
            </div>

            {/* Quick Editorial Meta Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 flex items-center gap-4 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-[#0b233a]">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>{posts.length} Analyses</span>
                </div>
                <span className="text-slate-300">|</span>
                <Link
                  href="/api/rss.xml"
                  target="_blank"
                  className="flex items-center gap-1 hover:text-[#e67c00] transition-colors"
                  title="Subscribe via RSS"
                >
                  <Rss className="w-3.5 h-3.5 text-amber-500" />
                  <span>RSS</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         2. MAIN BLOG FEED (Category Tabs, Featured Post, Article Grid)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        
        {/* Interactive Category Tabs, Search, Featured Story & Articles Grid */}
        <BlogFilters posts={posts} />

        {/* ═══════════════════════════════════════════════════════════════
           3. TECHNICAL CONSULTATION CALLOUT BANNER
           ═══════════════════════════════════════════════════════════════ */}
        <section className="rounded-3xl bg-[#0b233a] border border-[#163654] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
              Engineering Advisory &amp; Review
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Have an upcoming energy, offshore, or industrial facility project?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect directly with Saur&apos;s senior multidisciplinary engineering team for FEED verification, stress analysis, 3D piping design, or EPC project delivery advisory.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF8A00] hover:bg-[#e67c00] active:scale-[0.98] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md transition-all"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
