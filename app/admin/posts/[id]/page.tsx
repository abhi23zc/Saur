import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminPost, getAllAdminPosts, getMediaAssets } from "@/lib/blog/data";
import PostEditor from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/auth/admin";
import AdminFrame from "@/components/admin/AdminFrame";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, client } = await requireAdmin();
  const id = (await params).id;
  const [post, assets, allPosts, revisionsResult] = await Promise.all([
    getAdminPost(id),
    getMediaAssets(),
    getAllAdminPosts(),
    client
      .from("post_revisions")
      .select("id, created_at")
      .eq("post_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (!post) notFound();

  return (
    <AdminFrame email={user.email ?? "Administrator"}>
      {/* Top Header Controls (Webifyit Style) */}
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 pb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 hover:text-[#0b233a] transition-all shadow-2xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Posts</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span
            className={
              (post.status === "published"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : post.status === "scheduled"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-slate-100 text-slate-600 border-slate-200") +
              " rounded-lg border px-2.5 py-1 text-xs font-mono font-bold capitalize"
            }
          >
            {post.status}
          </span>
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 hover:text-[#0b233a] transition-all shadow-2xs"
          >
            <span>Back to Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Editor Component */}
      <PostEditor
        post={post}
        assets={assets}
        revisions={revisionsResult.data ?? []}
        allPosts={allPosts}
      />
    </AdminFrame>
  );
}
