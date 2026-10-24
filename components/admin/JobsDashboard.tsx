"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, Loader2 } from "lucide-react";
import { saveJob } from "@/app/admin/jobs/actions";
import { disciplines, type Job } from "@/lib/careers/types";
const input = "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#b85e00] focus:ring-2 focus:ring-orange-100";
export default function JobsDashboard({ initialJobs, available }: { initialJobs: Job[]; available: boolean }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const current = jobs.find((job) => job.id === selected);
  return <div><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#a45100]">Recruitment</p><h1 className="mt-1 text-3xl font-extrabold text-[#0b233a]">Job openings</h1><p className="mt-2 text-sm text-slate-500">Publish real vacancies and close them when applications end.</p></div><Link href="/careers" target="_blank" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0b233a]">View careers page<ArrowUpRight className="h-4 w-4" /></Link></div>
    {notice && <p role="status" className="mb-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
    {!available && <p role="alert" className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">Job management is unavailable. Apply the careers database migration and reload this page.</p>}
    <div className="grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]"><aside className="rounded-xl border border-slate-200 bg-white p-4"><button onClick={() => setSelected(null)} className="mb-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b233a] px-4 text-sm font-bold text-white"><Plus className="h-4 w-4" />New opening</button><div className="space-y-2">{!jobs.length && <p className="p-3 text-sm text-slate-500">No vacancies created yet. New openings start here.</p>}{jobs.map((job) => <button key={job.id} onClick={() => setSelected(job.id)} aria-pressed={selected === job.id} className={`w-full rounded-lg border p-4 text-left transition ${selected === job.id ? "border-[#d98a16] bg-orange-50" : "border-slate-200 hover:bg-slate-50"}`}><span className="block text-sm font-bold">{job.title}</span><span className="mt-1 block text-xs text-slate-500">{job.location} · {job.experience}</span><span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${job.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{job.status === "published" ? "Open" : job.status}</span></button>)}</div></aside>
    <JobEditor key={current ? `${current.id}-${current.updated_at}` : "new"} job={current} disabled={!available} onSaved={(job) => { setJobs((all) => [job, ...all.filter((item) => item.id !== job.id)]); setSelected(job.id); setNotice(job.status === "published" ? "Opening published. It is now visible on Careers." : job.status === "closed" ? "Vacancy closed. It is no longer visible on Careers." : "Draft saved. It is not publicly visible."); }} />
    </div>
  </div>;
}
function JobEditor({ job, disabled, onSaved }: { job?: Job; disabled: boolean; onSaved: (job: Job) => void }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError("");
    const form = new FormData(event.currentTarget, (event.nativeEvent as SubmitEvent).submitter);
    try {
      const result = await saveJob(form);
      if (result.error || !result.job) { setError(result.error || "Unable to save this opening."); return; }
      onSaved(result.job);
    } catch { setError("Unable to save. Your edits are still here; please try again."); }
    finally { setSaving(false); }
  }
  return <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7"><h2 className="mb-1 text-xl font-bold text-[#0b233a]">{job ? "Edit opening" : "Create an opening"}</h2><p className="mb-6 text-xs text-slate-500">All fields are required. Enter responsibilities and qualifications one item per line. Published edits appear immediately.</p>
    {job && <><input type="hidden" name="id" value={job.id} /><input type="hidden" name="updated_at" value={job.updated_at} /></>}
    <fieldset disabled={saving || disabled} className="space-y-5 disabled:opacity-60">
      <label className="block text-xs font-semibold">Job title<input name="title" required minLength={3} maxLength={160} defaultValue={job?.title} className={input} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold">Engineering field<input name="discipline" list="job-disciplines" required minLength={2} maxLength={100} defaultValue={job?.discipline} className={input} /><datalist id="job-disciplines">{disciplines.map((value) => <option key={value} value={value} />)}</datalist></label>
        <label className="text-xs font-semibold">Location<input name="location" required minLength={2} maxLength={160} defaultValue={job?.location} className={input} placeholder="e.g. Navi Mumbai" /></label>
        <label className="text-xs font-semibold">Experience<input name="experience" required maxLength={100} defaultValue={job?.experience} className={input} placeholder="e.g. 3–5 years" /></label>
        <label className="text-xs font-semibold">Employment type<input name="employment_type" required minLength={2} maxLength={80} defaultValue={job?.employment_type} className={input} placeholder="e.g. Full-time" /></label>
      </div>
      <label className="block text-xs font-semibold">Short summary<textarea name="summary" required minLength={10} maxLength={1000} rows={3} defaultValue={job?.summary} className={input} /></label>
      <label className="block text-xs font-semibold">Responsibilities<textarea name="responsibilities" required minLength={10} maxLength={8000} rows={5} defaultValue={job?.responsibilities} className={input} /></label>
      <label className="block text-xs font-semibold">Qualifications<textarea name="qualifications" required minLength={10} maxLength={8000} rows={5} defaultValue={job?.qualifications} className={input} /></label>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="flex flex-wrap gap-3"><button name="status" value="draft" className="min-h-11 rounded-lg border border-slate-300 px-4 text-xs font-bold">Save as draft</button><button name="status" value="published" className="flex min-h-11 items-center gap-2 rounded-lg bg-[#FF8A00] px-4 text-xs font-bold text-[#0b233a]">{saving && <Loader2 className="h-4 w-4 animate-spin" />}{job?.status === "published" ? "Save published opening" : job?.status === "closed" ? "Reopen vacancy" : "Publish opening"}</button>{job?.status === "published" && <button name="status" value="closed" className="min-h-11 rounded-lg border border-red-200 px-4 text-xs font-bold text-red-700">Close vacancy</button>}</div>
    </fieldset>
  </form>;
}
