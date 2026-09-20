import "server-only";

import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/login?reason=not-configured");
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await client.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") redirect("/admin/login?reason=unauthorized");
  return { client, user, profile };
}
