import AdminFrame from "@/components/admin/AdminFrame";
import MediaLibrary from "@/components/admin/MediaLibrary";
import { requireAdmin } from "@/lib/auth/admin";
import { getMediaAssets } from "@/lib/blog/data";
export default async function MediaPage() {
  const { user } = await requireAdmin();
  const assets = await getMediaAssets();
  return <AdminFrame email={user.email || "Administrator"}><div className="cms-media-page"><p className="cms-eyebrow">Editorial workspace</p><h1>Image library</h1><p>Upload, describe and reuse images across your articles.</p><section className="cms-card"><MediaLibrary assets={assets} /></section></div></AdminFrame>;
}
