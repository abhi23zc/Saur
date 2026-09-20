"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { 
  Eye, 
  FilePenLine, 
  Plus, 
  Search, 
  Trash2, 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  TrendingUp, 
  ExternalLink, 
  Copy, 
  Filter, 
  Sparkles,
  Layers,
  ArrowRight,
  Globe
} from "lucide-react";
import { bulkPostAction, duplicatePost } from "@/app/admin/actions";
import type { BlogPost, PostStatus } from "@/lib/blog/types";

const statusConfig: Record<PostStatus, { label: string; badge: string; dot: string }> = {
  published: {
    label: "Published",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  scheduled: {
    label: "Scheduled",
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  draft: {
    label: "Draft",
    badge: "bg-slate-100 text-slate-700 border border-slate-200",
    dot: "bg-slate-400",
  },
};

export default function PostsDashboard({ posts, views }: { posts: BlogPost[]; views: number }) {
  const [tab, setTab] = useState<"all" | PostStatus>("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.categories?.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [posts]);

  const counts = useMemo(() => ({
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
  }), [posts]);

  const filtered = useMemo(() => {
    return posts
      .filter((post) => {
        if (tab !== "all" && post.status !== tab) return false;
        if (category !== "all" && !post.categories?.includes(category)) return false;
        if (search.trim() !== "") {
          const q = search.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchSlug = post.slug.toLowerCase().includes(q);
          const matchExcerpt = post.excerpt?.toLowerCase().includes(q) ?? false;
          const matchCat = post.categories?.some((c) => c.toLowerCase().includes(q)) ?? false;
          if (!matchTitle && !matchSlug && !matchExcerpt && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [posts, tab, category, search]);

  function duplicate(id: string) {
    startTransition(async () => {
      await duplicatePost(id);
    });
  }

  function runBulkAction(action: "publish" | "unpublish" | "delete") {
    if (!selected.length) return;
    if (action === "delete" && !window.confirm(`Are you sure you want to permanently delete ${selected.length} selected article(s)?`)) {
      return;
    }
    startTransition(async () => {
      await bulkPostAction(selected, action);
      setSelected([]);
    });
  }

  return (
    <div className="space-y-8">
      
      {/* 1. Dashboard Executive Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
            <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
              EDITORIAL WORKSPACE
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b233a] tracking-tight">
            Engineering Insights Hub
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal max-w-2xl leading-relaxed">
            Create, schedule, review, and publish technical FEED, detailed engineering, and EPC industry articles.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition-all min-h-[44px] shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* 2. Key Telemetry Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        {/* Published */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Published Articles
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-display text-3xl font-extrabold text-[#0b233a]">
              {counts.published}
            </div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Live on Public Hub</span>
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Drafts in Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-display text-3xl font-extrabold text-[#0b233a]">
              {counts.draft}
            </div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-slate-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Pending Review &amp; Edits</span>
            </div>
          </div>
        </div>

        {/* Scheduled */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Scheduled Releases
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-display text-3xl font-extrabold text-[#0b233a]">
              {counts.scheduled}
            </div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-blue-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Queued for Publication</span>
            </div>
          </div>
        </div>

        {/* 30-Day Views */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              30-Day Readership
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF8A00] flex items-center justify-center border border-orange-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-display text-3xl font-extrabold text-[#FF8A00]">
              {views.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-slate-500 font-semibold">
              <Globe className="w-3 h-3 text-[#FF8A00]" />
              <span>Verified Audience Impressions</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Interactive Articles Table & Control Console */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        
        {/* Control Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
            {(
              [
                { id: "all", label: "All Posts", count: counts.all },
                { id: "published", label: "Published", count: counts.published },
                { id: "draft", label: "Drafts", count: counts.draft },
                { id: "scheduled", label: "Scheduled", count: counts.scheduled },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setSelected([]);
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer border min-h-[38px] active:scale-[0.98] ${
                  tab === item.id
                    ? "bg-[#0b233a] text-white border-[#0b233a]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{item.label}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${
                  tab === item.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles & tags..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#0b233a] min-h-[38px]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-[#0b233a] min-h-[38px] cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Bulk Action Sticky Bar (When rows selected) */}
        {selected.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-200 bg-orange-50/90 px-5 py-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#0b233a] bg-white px-2 py-0.5 rounded border border-orange-200">
                {selected.length}
              </span>
              <span className="font-bold text-[#0b233a]">
                article(s) selected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={isPending}
                onClick={() => runBulkAction("publish")}
                className="rounded-lg bg-[#0b233a] hover:bg-[#163654] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Publish Now
              </button>
              <button
                disabled={isPending}
                onClick={() => runBulkAction("unpublish")}
                className="rounded-lg bg-white hover:bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 border border-slate-300 transition-colors cursor-pointer"
              >
                Revert to Draft
              </button>
              <button
                disabled={isPending}
                onClick={() => runBulkAction("delete")}
                className="inline-flex items-center gap-1 rounded-lg bg-red-600 hover:bg-red-700 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Articles Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="w-12 p-4 text-center">
                  <input
                    aria-label="Select all displayed posts"
                    checked={filtered.length > 0 && selected.length === filtered.length}
                    onChange={(e) => setSelected(e.target.checked ? filtered.map((post) => post.id) : [])}
                    type="checkbox"
                    className="rounded border-slate-300 text-[#FF8A00] focus:ring-[#FF8A00] cursor-pointer"
                  />
                </th>
                <th className="p-4">Article &amp; Route</th>
                <th className="p-4">Category &amp; Topics</th>
                <th className="p-4">Publish Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Quick Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => {
                const status = statusConfig[post.status] || statusConfig.draft;
                return (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Checkbox */}
                    <td className="p-4 text-center">
                      <input
                        aria-label={`Select ${post.title}`}
                        type="checkbox"
                        checked={selected.includes(post.id)}
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? [...selected, post.id]
                              : selected.filter((id) => id !== post.id)
                          )
                        }
                        className="rounded border-slate-300 text-[#FF8A00] focus:ring-[#FF8A00] cursor-pointer"
                      />
                    </td>

                    {/* Article Info & Thumbnail */}
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt=""
                            width={64}
                            height={44}
                            className="h-11 w-16 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="h-11 w-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 max-w-sm">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="font-display text-sm font-bold text-[#0b233a] hover:text-[#FF8A00] transition-colors line-clamp-1"
                            title={post.title}
                          >
                            {post.title}
                          </Link>
                          <p className="mt-0.5 text-xs font-mono text-slate-500 truncate">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Categories & Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.categories && post.categories.length > 0 ? (
                          post.categories.map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200"
                            >
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">General</span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${status.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          <span>{status.label}</span>
                        </span>
                        {post.scheduledFor && (
                          <p className="font-mono text-[10px] text-blue-600">
                            {new Date(post.scheduledFor).toLocaleDateString()} at{" "}
                            {new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Updated Date */}
                    <td className="p-4 text-xs font-mono text-slate-600">
                      <div>{new Date(post.updatedAt).toLocaleDateString()}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(post.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Quick Actions */}
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0b233a] hover:text-white text-[#0b233a] font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-slate-200"
                        >
                          <FilePenLine className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </Link>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => duplicate(post.id)}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-slate-200 disabled:opacity-60"
                          title="Duplicate as draft"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </button>

                        <a
                          href={post.status === "published" ? `/blog/${post.slug}` : `/admin/posts/${post.id}/preview`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#FF8A00] hover:text-white text-[#FF8A00] font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-orange-200"
                          title={post.status === "published" ? "View published article" : "Open private preview"}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>{post.status === "published" ? "View" : "Preview"}</span>
                        </a>
                      </div>
                    </td>

                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-display text-base font-bold text-[#0b233a] mb-1">
                      No Articles Found
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                      No articles match your current status tab or search query.
                    </p>
                    {(search || category !== "all" || tab !== "all") && (
                      <button
                        onClick={() => {
                          setSearch("");
                          setCategory("all");
                          setTab("all");
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0b233a] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

