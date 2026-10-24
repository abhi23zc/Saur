"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import {
  sendTrainingEnquiry,
  trainingEnquiryError,
  type TrainingEnquiry,
  type TrainingProgramme,
} from "@/lib/careers/training";

const emptyForm: TrainingEnquiry = {
  name: "", email: "", organization: "", phone: "", message: "", website: "",
};
const inputClass = "mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#0b233a] outline-none focus:border-[#b85e00] focus:ring-2 focus:ring-orange-100";

export default function CourseDialog({ course, onClose }: {
  course: TrainingProgramme;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const success = useRef<HTMLHeadingElement>(null);
  const [view, setView] = useState<"details" | "enquiry">("details");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    title.current?.focus();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  const enquirySent = status === "success";
  useEffect(() => {
    if (enquirySent) success.current?.focus();
    else if (view === "enquiry") firstField.current?.focus();
    else title.current?.focus();
  }, [view, enquirySent]);

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    )).filter((control) => control.tabIndex >= 0 && control.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;
    if (!first || !last) { event.preventDefault(); title.current?.focus(); return; }
    if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (active === last || !controls.includes(active as HTMLElement))) {
      event.preventDefault(); first.focus();
    }
  }

  function update(key: keyof TrainingEnquiry, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = trainingEnquiryError(form);
    if (validation) { setError(validation); return; }
    setStatus("sending"); setError("");
    try {
      await sendTrainingEnquiry(course, form);
      setStatus("success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your enquiry could not be sent. Please try again.");
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="course-dialog-title"
      aria-describedby="course-dialog-description"
      onKeyDown={containFocus}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto border border-slate-200 bg-white p-0 text-[#0b233a] shadow-2xl backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 sm:p-7">
        <button type="button" onClick={onClose} aria-label="Close course details" className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#b85e00]">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="mb-3 pr-10 text-[10px] font-bold uppercase tracking-[.18em] text-[#9b5000]">Training programme {course.number}</p>
        <h2 ref={title} id="course-dialog-title" tabIndex={-1} className="pr-5 text-2xl font-extrabold leading-tight outline-none">
          {course.title}
        </h2>
        <p id="course-dialog-description" className="mt-3 text-sm leading-relaxed text-slate-600">{course.description}</p>

        {status === "success" ? (
          <div role="status" className="mt-6 border-t border-slate-200 pt-6">
            <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
            <h3 ref={success} tabIndex={-1} className="mt-3 text-lg font-bold outline-none">Your course enquiry has been sent.</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Our team will contact you about {course.title} and confirm the available options.</p>
            <button type="button" onClick={onClose} className="mt-5 min-h-11 bg-[#0b233a] px-5 text-sm font-bold text-white">Done</button>
          </div>
        ) : view === "details" ? (
          <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="text-sm font-bold">What you will learn</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-600">
              {course.topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
            <button type="button" onClick={() => setView("enquiry")} className="mt-7 inline-flex min-h-11 items-center gap-3 bg-[#FF8A00] px-5 py-3 text-sm font-bold text-[#0b233a] hover:bg-[#ed8000]">
              Enquire about this course <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 border-t border-slate-200 pt-5" aria-label="Course enquiry">
            <button type="button" onClick={() => setView("details")} disabled={status === "sending"} className="mb-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#9b5000]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to course details
            </button>
            <fieldset disabled={status === "sending"} className="space-y-4 disabled:opacity-70">
              <legend className="mb-4 text-lg font-bold">Enquire about this course</legend>
              <label className="block text-xs font-semibold">Selected course<input value={course.title} readOnly className={`${inputClass} bg-slate-50`} /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold">Full name *<input ref={firstField} name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} /></label>
                <label className="text-xs font-semibold">Email *<input name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></label>
                <label className="text-xs font-semibold">College / organization *<input name="organization" autoComplete="organization" required maxLength={160} value={form.organization} onChange={(e) => update("organization", e.target.value)} className={inputClass} /></label>
                <label className="text-xs font-semibold">Phone <span className="font-normal text-slate-500">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></label>
              </div>
              <label className="block text-xs font-semibold">Message *<textarea name="message" required minLength={10} maxLength={2000} rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your background and what you want to learn." className={inputClass} /></label>
              <div hidden aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              <p className="text-xs leading-relaxed text-slate-500">No resume is needed for a course enquiry. We use your details to respond, as explained in our <Link href="/privacy" className="font-semibold text-[#0b233a] underline">privacy notice</Link>.</p>
              {error && <p role="alert" className="bg-red-50 p-3 text-sm text-red-800">{error}</p>}
              <button type="submit" className="flex min-h-11 w-full items-center justify-center gap-2 bg-[#FF8A00] px-5 py-3 text-sm font-bold text-[#0b233a] hover:bg-[#ed8000] disabled:cursor-wait">
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending enquiry…</> : <>Send course enquiry<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
              </button>
            </fieldset>
          </form>
        )}
      </div>
    </dialog>
  );
}
