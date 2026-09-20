import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PostEditor from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllAdminPosts, getMediaAssets } from "@/lib/blog/data";
import AdminFrame from "@/components/admin/AdminFrame";

export default async function NewPostPage() {
  const { user } = await requireAdmin();
  const [assets, posts] = await Promise.all([getMediaAssets(), getAllAdminPosts()]);

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

        <a
          href="/blog"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 hover:text-[#0b233a] transition-all shadow-2xs"
        >
          <span>Back to Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Editor Component */}
      <PostEditor assets={assets} allPosts={posts} />
    </AdminFrame>
  );
}
