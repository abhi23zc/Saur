import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminPost } from "@/lib/blog/data";
import ArticleView from "@/components/blog/ArticleView";
import "@/app/blog/journal.css";
export default async function AdminPostPreview({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const post = await getAdminPost((await params).id);
  if (!post || post.deletedAt) notFound();
  return <><div className="cms-preview-bar"><span>Private draft preview</span><Link href={`/admin/posts/${post.id}`}>Back to editor</Link></div><main className="journal journal-preview"><div className="journal-shell"><ArticleView post={post} preview /></div></main></>;
}
