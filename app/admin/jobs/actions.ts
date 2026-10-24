"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { jobSchema } from "@/lib/careers/validation";
import type { Job } from "@/lib/careers/types";
export type JobSaveResult = { job?: Job; error?: string };
export async function saveJob(form: FormData): Promise<JobSaveResult> {
  const { client } = await requireAdmin();
  const parsed = jobSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: `${parsed.error.issues[0].path.join(" ")}: ${parsed.error.issues[0].message}` };
  const id = form.get("id");
  const version = form.get("updated_at");
  if (id && (!z.string().uuid().safeParse(id).success || typeof version !== "string" || Number.isNaN(Date.parse(version)))) return { error: "This job reference is invalid. Reload the page and try again." };
  try {
    const result = id
      ? await client.from("jobs").update(parsed.data).eq("id", id).eq("updated_at", version).select("*").maybeSingle()
      : await client.from("jobs").insert(parsed.data).select("*").single();
    if (result.error) return { error: "The opening could not be saved. Please try again. Check that the careers migration has been applied if this persists." };
    if (!result.data) return { error: "This opening changed in another session. Reload the page before editing it again." };
    revalidatePath("/careers"); revalidatePath("/admin/jobs");
    return { job: result.data as Job };
  } catch { return { error: "The job service is unavailable. Your edits are still here; please try again." }; }
}
