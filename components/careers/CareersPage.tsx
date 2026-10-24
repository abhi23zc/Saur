"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, ChevronDown, Clock3, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import JobCards from "./JobCards";
import TrainingCards from "./TrainingCards";
import ApplicationForm, { type OpportunitySelection } from "./ApplicationForm";
import { INTERNSHIP_ID, type JobListings } from "@/lib/careers/types";
import { site } from "@/data/site";
const shell = "mx-auto max-w-6xl px-5 sm:px-8";
export default function CareersPage({ jobs, available }: JobListings) {
  const [consultation, setConsultation] = useState(false);
  const [visible, setVisible] = useState(5);
  const [selection, setSelection] = useState<OpportunitySelection>(jobs.length ? { category: "job", opportunity: jobs[0].id } : { category: "internship", opportunity: INTERNSHIP_ID });
  return <div className="min-h-screen bg-[#f8f8f5] text-[#0b233a]">
    <Navbar onOpenConsultation={() => setConsultation(true)} />
    <main>
      <section className="relative overflow-hidden bg-[#0b233a] pb-14 pt-32 sm:pb-16 sm:pt-36">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/media/expertise-design-office.png')" }} aria-hidden="true" />
        <div className={`${shell} relative`}><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#FF8A00]">Careers &amp; Training at Saur</p><h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">Build your engineering<br className="hidden sm:block" /> career with <span className="text-[#FF8A00]">Saur.</span></h1><p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">Bring your experience. Develop your skills. Explore opportunities in engineering, practical training, and project-based learning.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#open-positions" className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#FF8A00] px-5 py-3 text-sm font-bold">Open positions<ArrowDown className="h-4 w-4" aria-hidden="true" /></a><a href="#training-internships" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white">Training &amp; internships<ArrowDown className="h-4 w-4" aria-hidden="true" /></a></div></div>
      </section>
      <section id="open-positions" className="scroll-mt-24 py-12 sm:py-16"><div className={shell}>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a45100]">Make your next move</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight">Open positions</h2></div><span className="text-xs text-slate-500">{available ? `${jobs.length} open ${jobs.length === 1 ? "position" : "positions"}` : "Hiring opportunities"}</span></div>
        {!available ? <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-6"><h3 className="font-bold">Job listings are temporarily unavailable.</h3><p className="mt-2 text-sm text-slate-600">Please check back shortly or follow our <a className="font-semibold text-[#0b233a] underline" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn hiring updates</a>.</p></div> : jobs.length === 0 ? <div className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold">No current openings</h3><p className="mt-2 text-sm text-slate-600">New roles will appear here when they become available.</p></div><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#9b5000]">Follow hiring updates<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div> : <JobCards jobs={jobs.slice(0, visible)} onApply={(job) => {
          setSelection({ category: "job", opportunity: job.id });
          requestAnimationFrame(() => {
            const section = document.getElementById("apply");
            section?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
            section?.scrollIntoView({ behavior: "instant", block: "start" });
          });
        }} />}
        {jobs.length > visible && <button onClick={() => setVisible(visible + 5)} className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-semibold">Show more positions<ChevronDown className="h-4 w-4" aria-hidden="true" /></button>}
      </div></section>
      <section id="training-internships" className="scroll-mt-24 border-y border-slate-200 bg-white py-12 sm:py-16"><div className={shell}>
        <span id="learning-paths" className="block scroll-mt-24" aria-hidden="true" />
        <div className="mb-8 grid gap-5 border-b border-slate-300 pb-7 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a45100]">Training &amp; internships</p><h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Choose an<br className="hidden sm:block" /> engineering path.</h2></div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">Explore six course areas across engineering fields and plant design software. Select a course to see the key topics and enquire about training.</p>
        </div>
        <TrainingCards />
        <div className="mt-5 grid gap-6 rounded-xl bg-[#0b233a] p-6 text-white sm:p-8 lg:grid-cols-[1.4fr_1fr]"><div><span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF8A00]"><GraduationCap className="h-4 w-4" aria-hidden="true" />For students &amp; early-career engineers</span><h3 className="mt-3 text-2xl font-bold">60-day engineering internship</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">Connect engineering fundamentals with practical EPC workflows through project-based learning. Apply to discuss the next available opportunity.</p><a href="#apply" onClick={() => setSelection({ category: "internship", opportunity: INTERNSHIP_ID })} className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#FF8A00] px-5 py-3 text-sm font-bold text-[#0b233a]">Apply for internship<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div><div className="grid grid-cols-2 gap-4 self-center">{[[Clock3, "60 days", "Programme duration"], [Clock3, "2 hours daily", "Learning schedule"], [BriefcaseBusiness, "Project-based", "Practical learning"], [GraduationCap, "Certificate", "On completion"]].map(([Icon, title, subtitle]) => { const Symbol = Icon as typeof Clock3; return <div key={String(title)} className="border-l border-white/20 pl-4"><Symbol className="mb-2 h-4 w-4 text-[#FF8A00]" aria-hidden="true" /><p className="text-sm font-bold">{String(title)}</p><p className="mt-1 text-[11px] text-slate-400">{String(subtitle)}</p></div>; })}</div></div>
      </div></section>
      <section id="apply" className="scroll-mt-24 py-12 sm:py-16"><div className={`${shell} grid items-start gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14`}><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a45100]">Start a conversation</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight">Take the next step.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600">Share your background and interests with our team. Select an open role or apply for the engineering internship.</p><p className="mt-4 text-xs leading-relaxed text-slate-500">Internship availability and next steps will be confirmed by our team. Training and placement assistance do not guarantee employment.</p><div className="mt-6 border-t border-slate-200 pt-5"><p className="text-xs text-slate-500">Questions about a course?</p><a href="#training-internships" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#9b5000]">Choose a course above<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div></div><ApplicationForm jobs={jobs} selection={selection} onSelect={setSelection} /></div></section>
    </main><Footer /><ConsultationModal isOpen={consultation} onClose={() => setConsultation(false)} />
  </div>;
}
