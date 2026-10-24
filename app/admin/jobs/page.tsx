import AdminFrame from "@/components/admin/AdminFrame";
import JobsDashboard from "@/components/admin/JobsDashboard";
import { requireAdmin } from "@/lib/auth/admin";
import type { Job } from "@/lib/careers/types";
export default async function JobsAdmin() {
  const { client, user } = await requireAdmin();
  const { data, error } = await client.from("jobs").select("*").order("created_at", { ascending: false });
  return <AdminFrame email={user.email ?? "Administrator"}><JobsDashboard initialJobs={(data || []) as Job[]} available={!error} /></AdminFrame>;
}
