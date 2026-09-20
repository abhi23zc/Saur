import { getAllAdminPosts, getDashboardViews } from "@/lib/blog/data";
import { requireAdmin } from "@/lib/auth/admin";
import AdminFrame from "@/components/admin/AdminFrame";
import PostsDashboard from "@/components/admin/PostsDashboard";
export default async function AdminDashboard() { const { user, client } = await requireAdmin(); await client.rpc("publish_due_posts"); const [posts, views] = await Promise.all([getAllAdminPosts(), getDashboardViews()]); return <AdminFrame email={user.email ?? "Administrator"}><PostsDashboard posts={posts} views={views} /></AdminFrame>; }
