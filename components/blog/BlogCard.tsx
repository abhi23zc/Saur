import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import type { BlogPost, RichTextNode } from "@/lib/blog/types";

function textFromNode(node: RichTextNode): string {
  return node.text ?? node.content?.map(textFromNode).join(" ") ?? "";
}

function readingTime(content: BlogPost["content"]) {
  const words = textFromNode(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function authorInitials(name?: string): string {
  if (!name) return "SE";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const date = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : "Draft";

  const readMin = readingTime(post.content);

  // ═══════════════════════════════════════════════════════════════
  // FEATURED / LEAD STORY (Large Magazine Layout)
  // ═══════════════════════════════════════════════════════════════
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Cover Image */}
          <Link
            href={`/blog/${post.slug}`}
            className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-slate-900 block"
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#071726] via-[#0b233a] to-[#163654] flex items-center justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Saur Engineering Insight
                </span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b233a]/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8A00] shadow-sm border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                Featured Story
              </span>
            </div>
          </Link>

          {/* Content Body */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Date Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="rounded-md bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#e67c00]"
                  >
                    {category}
                  </span>
                ))}
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono text-xs">{date}</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{readMin} min read</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b233a] group-hover:text-[#FF8A00] transition-colors leading-tight">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#0b233a] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs">
                  {authorInitials(post.authorName)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {post.authorName || "Saur Engineering Team"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {post.authorRole || "Engineering Division"}
                  </p>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b233a] group-hover:bg-[#FF8A00] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // STANDARD BLOG POST CARD (Clean Editorial Grid)
  // ═══════════════════════════════════════════════════════════════
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:border-slate-300 hover:shadow-lg transition-all duration-300">
      {/* Cover Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 block shrink-0"
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b233a] to-[#1d4b69] flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
              Saur Engineering
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category & Date Metadata */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {post.categories.slice(0, 1).map((category) => (
                <span
                  key={category}
                  className="rounded-md bg-orange-50 border border-orange-200/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#e67c00]"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <span>{date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{readMin}m</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#0b233a] group-hover:text-[#FF8A00] transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
              {authorInitials(post.authorName)}
            </div>
            <span className="truncate text-slate-600 font-medium text-xs">
              {post.authorName || "Saur Engineering"}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#0b233a] group-hover:text-[#FF8A00] uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
