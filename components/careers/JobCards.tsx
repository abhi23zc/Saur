"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, BriefcaseBusiness, Clock3, MapPin, X } from "lucide-react";
import type { Job } from "@/lib/careers/types";

function JobFacts({ job }: { job: Job }) {
  return <span className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{job.location}</span>
    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{job.experience}</span>
    <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-3.5 w-3.5" aria-hidden="true" />{job.employment_type}</span>
  </span>;
}

function JobDetails({ job, onClose, onApply }: { job: Job; onClose: () => void; onApply: (job: Job) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    title.current?.focus();
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
    const first = controls[0], last = controls[controls.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && (active === last || !controls.includes(active as HTMLElement))) {
      event.preventDefault(); first?.focus();
    }
  }

  return <dialog ref={dialog} aria-labelledby="job-dialog-title" onKeyDown={containFocus}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-[#0b233a] shadow-xl backdrop:bg-slate-950/60">
    <div className="relative border-b border-slate-200 bg-slate-50 p-6 sm:p-8">
      <button type="button" onClick={onClose} aria-label="Close job details" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-lg hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-[#a45100]"><X className="h-5 w-5" aria-hidden="true" /></button>
      <p className="pr-10 text-[10px] font-bold uppercase tracking-[.12em] text-[#a45100]">{job.discipline}</p>
      <h2 ref={title} tabIndex={-1} id="job-dialog-title" className="mb-5 mt-3 pr-7 text-2xl font-extrabold leading-tight outline-none">{job.title}</h2>
      <JobFacts job={job} />
    </div>
    <div className="space-y-7 p-6 sm:p-8">
      <div><h3 className="mb-3 text-sm font-bold">About the role</h3><p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{job.summary}</p></div>
      {[["Responsibilities", job.responsibilities], ["Qualifications", job.qualifications]].map(([label, content]) => <div key={label}>
        <h3 className="mb-3 text-sm font-bold">{label}</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">{content.split("\n").filter(line => line.trim()).map((line, index) => <li key={index}>{line.replace(/^\s*[-•]\s*/, "")}</li>)}</ul>
      </div>)}
    </div>
    <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:px-8">
      <span className="text-xs text-slate-600">Ready to take the next step?</span>
      <button type="button" onClick={() => { onClose(); onApply(job); }} className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#0b233a] px-5 py-3 text-sm font-bold text-white hover:bg-[#173b58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a45100]">Apply for this role<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
    </div>
  </dialog>;
}

export default function JobCards({ jobs, onApply }: { jobs: Job[]; onApply: (job: Job) => void }) {
  const [selected, setSelected] = useState<Job | null>(null);
  return <>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map(job => <article key={job.id} className="h-full">
        <button type="button" onClick={() => setSelected(job)} aria-haspopup="dialog" aria-label={`View ${job.title} details`}
          className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-6 text-left transition-colors hover:border-[#d59b58] hover:bg-[#fffdf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a45100]">
          <span className="mb-5 flex w-full items-start justify-between gap-4"><span className="text-[10px] font-bold uppercase leading-relaxed tracking-wider text-[#a45100]">{job.discipline}</span><BriefcaseBusiness className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" /></span>
          <span className="mb-4 block text-xl font-bold leading-snug">{job.title}</span>
          <JobFacts job={job} />
          <span className="mb-6 mt-5 line-clamp-2 text-sm leading-relaxed text-slate-600">{job.summary}</span>
          <span className="mt-auto flex w-full items-center justify-between border-t border-slate-200 pt-4 text-xs font-bold">View role details<span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff2df] text-[#9b5000] group-hover:bg-[#ffe5bf]"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span></span>
        </button>
      </article>)}
    </div>
    {selected && <JobDetails job={selected} onClose={() => setSelected(null)} onApply={onApply} />}
  </>;
}
