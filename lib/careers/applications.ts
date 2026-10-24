import { applicationSchema, type Application } from "./validation";
import { MAX_RESUME_BYTES, type Job } from "./types";
export type ApplicationDelivery = { application: Application; opportunityTitle: string; resume: Buffer };
type Dependencies = {
  getJob: (id: string) => Promise<Job | null>;
  send: (delivery: ApplicationDelivery) => Promise<void>;
};
export class ApplicationMailUnavailable extends Error {}
const MAX_BODY_BYTES = MAX_RESUME_BYTES + 64 * 1024;
const reply = (error: string, status: number) => Response.json({ error }, { status });

// Bound multipart data before parsing, including requests without Content-Length.
async function readForm(request: Request): Promise<FormData> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new Error("size"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData();
}
export function createApplicationHandler(deps: Dependencies) {
  return async function POST(request: Request) {
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return reply("Please submit the application form with a PDF resume.", 400);
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return reply("Please upload a PDF resume no larger than 3 MB.", 413);
    let form: FormData;
    try { form = await readForm(request); } catch (error) { return reply(error instanceof Error && error.message === "size" ? "Please upload a PDF resume no larger than 3 MB." : "We could not read your application. Please try again.", error instanceof Error && error.message === "size" ? 413 : 400); }
    if (form.get("website")) return Response.json({ ok: true });
    const raw = Object.fromEntries(["name", "email", "phone", "category", "opportunity", "discipline", "experience", "city", "message"].map((key) => [key, form.get(key) ?? ""]));
    const parsed = applicationSchema.safeParse({ ...raw, consent: form.get("consent") === "on" });
    if (!parsed.success) return reply("Please check your application: " + parsed.error.issues[0].path.join(" ") + ". " + parsed.error.issues[0].message, 400);
    const file = form.get("resume");
    if (!(file instanceof File) || !file.size) return reply("Please attach your PDF resume.", 400);
    if (file.size > MAX_RESUME_BYTES) return reply("Your resume must be no larger than 3 MB.", 413);
    if (!/\.pdf$/i.test(file.name) || file.type !== "application/pdf") return reply("Only PDF resumes are accepted.", 400);
    const resume = Buffer.from(await file.arrayBuffer());
    if (!resume.subarray(0, 5).equals(Buffer.from("%PDF-")) || !resume.subarray(-1024).includes(Buffer.from("%%EOF"))) return reply("The resume does not appear to be a valid PDF. Please export it as a PDF and try again.", 400);
    let opportunityTitle = "60-day engineering internship";
    if (parsed.data.category === "job") {
      try {
        const job = await deps.getJob(parsed.data.opportunity);
        if (!job || job.status !== "published") return reply("This role is no longer accepting applications. Please choose another opening.", 409);
        opportunityTitle = job.title;
      } catch { return reply("We cannot verify this opening right now. Please try again shortly.", 503); }
    }
    try {
      await deps.send({ application: parsed.data, opportunityTitle, resume });
      return Response.json({ ok: true });
    } catch (error) {
      if (error instanceof ApplicationMailUnavailable) return reply("Applications are temporarily unavailable. Please email your resume to contact@saurengineering.in.", 503);
      return reply("Your application could not be sent. Your details are still here; please try again or email contact@saurengineering.in.", 502);
    }
  };
}
