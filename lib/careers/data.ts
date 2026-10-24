import "server-only";
import { createPublicClient } from "@/lib/supabase/server";
import type { Job, JobListings } from "./types";
export async function getPublicJobs(): Promise<JobListings> {
  try {
    const { data, error } = await createPublicClient().from("jobs").select("*").eq("status", "published").order("created_at", { ascending: false });
    if (error) return { jobs: [], available: false };
    return { jobs: (data || []) as Job[], available: true };
  } catch { return { jobs: [], available: false }; }
}
export async function getPublishedJob(id: string): Promise<Job | null> {
  const { data, error } = await createPublicClient().from("jobs").select("*").eq("id", id).eq("status", "published").maybeSingle();
  if (error) throw new Error("Vacancy verification is temporarily unavailable.");
  return data as Job | null;
}
