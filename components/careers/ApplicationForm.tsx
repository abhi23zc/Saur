"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Loader2, Upload } from "lucide-react";
import { applicationSchema } from "@/lib/careers/validation";
import { disciplines, INTERNSHIP_ID, MAX_RESUME_BYTES, type Job } from "@/lib/careers/types";
export type OpportunitySelection = { category: "job" | "internship"; opportunity: string };
const control = "mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#0b233a] outline-none transition focus:border-[#b85e00] focus:ring-2 focus:ring-[#FF8A00]/20";
export default function ApplicationForm({ jobs, selection, onSelect }: { jobs: Job[]; selection: OpportunitySelection; onSelect: (selection: OpportunitySelection) => void }) {
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form);
    const parsed = applicationSchema.safeParse({ ...values, consent: form.get("consent") === "on" });
    if (!parsed.success) { setError(`${parsed.error.issues[0].path.join(" ")}: ${parsed.error.issues[0].message}`); return; }
    const file = form.get("resume");
    if (!(file instanceof File) || !file.size) { setError("Please attach your PDF resume."); return; }
    if (file.size > MAX_RESUME_BYTES) { setError("Your PDF resume must be no larger than 3 MB."); return; }
    if (file.type !== "application/pdf" || !/\.pdf$/i.test(file.name)) { setError("Please upload your resume as a PDF."); return; }
    setStatus("sending");
    try {
      const signature = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
      const ending = new TextDecoder().decode(await file.slice(Math.max(0, file.size - 1024)).arrayBuffer());
      if (signature !== "%PDF-" || !ending.includes("%%EOF")) throw new Error("This file does not appear to be a valid PDF. Please export your resume as a PDF and try again.");
      const response = await fetch("/api/applications", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok || !body.ok) throw new Error(body.error || "We could not send your application. Please try again.");
      setStatus("success"); ref.current?.reset();
    } catch (reason) { setStatus("error"); setError(reason instanceof Error ? reason.message : "Unable to send your application. Please try again."); }
  }
  if (status === "success") return <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8"><CheckCircle2 className="mb-4 h-8 w-8 text-emerald-700" /><h3 className="text-xl font-bold text-[#0b233a]">Your application has been sent.</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">Thank you for your interest in Saur. Our team has received your details and resume and will contact you if there is a suitable next step.</p><button className="mt-6 min-h-11 font-semibold text-[#9b5000] underline" onClick={() => setStatus("idle")}>Send another application</button></div>;
  return <form ref={ref} onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-label="Career application">
    <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-70">
      <legend className="mb-5 text-xl font-bold text-[#0b233a]">Tell us about yourself</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold">Full name *<input name="name" autoComplete="name" required minLength={2} maxLength={120} className={control} /></label>
        <label className="text-xs font-semibold">Email *<input name="email" type="email" autoComplete="email" required maxLength={254} className={control} /></label>
        <label className="text-xs font-semibold">Phone *<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={control} /></label>
        <label className="text-xs font-semibold">Current city <span className="font-normal text-slate-500">(optional)</span><input name="city" autoComplete="address-level2" maxLength={160} className={control} /></label>
        <label className="text-xs font-semibold">Application category *<select name="category" value={selection.category} onChange={(e) => onSelect(e.target.value === "job" ? { category: "job", opportunity: jobs[0]?.id || "" } : { category: "internship", opportunity: INTERNSHIP_ID })} className={control}><option value="job" disabled={!jobs.length}>Employment</option><option value="internship">Internship</option></select></label>
        <label className="text-xs font-semibold">Opportunity *<select name="opportunity" value={selection.opportunity} onChange={(e) => onSelect({ ...selection, opportunity: e.target.value })} required className={control}>{selection.category === "job" ? <><option value="" disabled>Select an open position</option>{jobs.map((job) => <option key={job.id} value={job.id}>{job.title} — {job.location}</option>)}</> : <option value={INTERNSHIP_ID}>60-day engineering internship</option>}</select></label>
        <label className="text-xs font-semibold">Engineering field *<select name="discipline" required defaultValue="" className={control}><option value="" disabled>Select your engineering field</option>{disciplines.map((discipline) => <option key={discipline}>{discipline}</option>)}</select></label>
        <label className="text-xs font-semibold">Experience *<input name="experience" required maxLength={100} placeholder="e.g. Final-year student or 3 years" className={control} /></label>
      </div>
      <label className="block text-xs font-semibold">Message <span className="font-normal text-slate-500">(optional)</span><textarea name="message" rows={3} maxLength={2000} className={control} placeholder="Tell us about your interests or relevant experience." /></label>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><label htmlFor="career-resume" className="flex items-center gap-2 text-sm font-semibold"><Upload aria-hidden="true" className="h-4 w-4 text-[#b85e00]" />Attach your resume *</label><p id="resume-help" className="mt-1 text-xs text-slate-500">PDF only · Maximum 3 MB</p><input id="career-resume" name="resume" type="file" accept=".pdf,application/pdf" required aria-describedby="resume-help" className="mt-3 block w-full text-xs file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#0b233a] file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white" /></div>
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600"><input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#0b233a]" /><span>I agree to share my details and resume with Saur for recruitment and internship consideration, as described in the <Link href="/privacy" className="font-semibold text-[#0b233a] underline">privacy notice</Link>. *</span></label>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#FF8A00] px-5 py-3 text-sm font-bold text-[#0b233a] transition hover:bg-[#ed8000] disabled:cursor-wait">{status === "sending" ? <><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />Sending application…</> : <>Send application<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></>}</button>
    </fieldset>
  </form>;
}
