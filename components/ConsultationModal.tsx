"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useModalDismiss } from "@/lib/useModalDismiss";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "FEED & Detail Engineering",
  "Process Engineering",
  "Piping & Mechanical",
  "Electrical Engineering",
  "Instrumentation Engineering",
  "Telecommunication Engineering",
  "3D Modelling",
  "Pipeline Engineering",
  "Civil & Structural Engineering",
  "Yard Fabrication Support",
  "Flow Assurance",
  "Subsea Engineering",
  "Manpower & Workforce Solutions",
  "IT Domain / SME Support",
  "Training & Development",
  "Not sure - help me choose",
];

const projectScales = ["Single package", "Multi-discipline project", "Long-term programme", "Not sure yet"];

const initialForm = {
  name: "",
  email: "",
  org: "",
  phone: "",
  discipline: "",
  projectScale: "",
  details: "",
  website: "",
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [refId, setRefId] = useState("");

  useModalDismiss(isOpen, onClose);

  if (!isOpen) return null;

  const update = (field: keyof typeof initialForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const message = [
        formData.projectScale ? "Project scale: " + formData.projectScale : "Project scale: Not specified",
        formData.details,
      ].join("\n\n");
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name: formData.name,
          email: formData.email,
          organization: formData.org,
          phone: formData.phone,
          selection: formData.discipline,
          message,
          website: formData.website,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "We could not send your consultation request.");
      setRefId("SAUR-" + Math.floor(100000 + Math.random() * 900000));
      setStatus("success");
      setFormData(initialForm);
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "We could not send your consultation request.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError("");
    setFormData(initialForm);
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in">
      <div onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="consultation-title" className="modal-surface relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#c3c5d9]/40 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8">
        <button onClick={onClose} aria-label="Close consultation modal" className="absolute right-4 top-4 rounded-full p-2 text-[#737687] transition-colors hover:bg-[#eeeeec] hover:text-[#1a1c1b] sm:right-6 sm:top-6">
          <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
        </button>

        {status === "success" ? (
          <div className="space-y-4 py-6 text-center sm:py-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF8A00]/10 text-2xl font-bold text-[#FF8A00] sm:h-16 sm:w-16 sm:text-3xl">✓</div>
            <span className="block font-mono text-xs font-bold uppercase tracking-widest text-[#FF8A00]">Consultation request sent</span>
            <h3 className="font-display text-xl font-bold text-[#1a1c1b] sm:text-2xl">Thank you, we have your enquiry.</h3>
            <p className="mx-auto max-w-md text-xs leading-relaxed text-[#424656] sm:text-sm">Your request has been sent to the Saur team. Keep this reference if you need to follow up.</p>
            <div className="inline-block rounded-xl bg-[#eeeeec] px-4 py-2.5 font-mono text-sm font-bold tracking-wider text-[#FF8A00] sm:px-6 sm:py-3 sm:text-base">{refId}</div>
            <div className="pt-2 sm:pt-4"><button onClick={handleReset} className="rounded-xl bg-[#FF8A00] px-8 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#e67c00]">Done</button></div>
          </div>
        ) : (
          <div>
            <div className="mb-5 pr-6 sm:mb-6">
              <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF8A00] sm:text-xs">Project consultation</span>
              <h3 id="consultation-title" className="font-display text-xl font-bold leading-tight text-[#1a1c1b] sm:text-2xl md:text-3xl">Tell us about your project</h3>
              <p className="mt-1 text-xs text-[#424656]">Share the service you need and the project context. Our engineering team will review your enquiry.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" aria-busy={status === "sending"}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Full name *<input required value={formData.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Sarah Jenkins" className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] px-3.5 py-2 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00] sm:px-4 sm:py-2.5" /></label>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Work email *<input required type="email" value={formData.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] px-3.5 py-2 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00] sm:px-4 sm:py-2.5" /></label>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Company / organization *<input required value={formData.org} onChange={(event) => update("org", event.target.value)} placeholder="e.g. Vertex Dynamics" className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] px-3.5 py-2 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00] sm:px-4 sm:py-2.5" /></label>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Phone <span className="normal-case text-[#737687]">(optional)</span><input type="tel" value={formData.phone} onChange={(event) => update("phone", event.target.value)} placeholder="e.g. +91 99671 12295" className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] px-3.5 py-2 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00] sm:px-4 sm:py-2.5" /></label>
              </div>

              <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Service or discipline *<select required value={formData.discipline} onChange={(event) => update("discipline", event.target.value)} className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] px-3.5 py-2 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00] sm:px-4 sm:py-2.5"><option value="">Select a service or discipline</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>

              <fieldset><legend className="mb-1 font-mono text-[10px] font-bold uppercase text-[#424656]">Project scale <span className="normal-case text-[#737687]">(optional)</span></legend><div className="grid grid-cols-2 gap-2">{projectScales.map((scale) => <button type="button" key={scale} onClick={() => update("projectScale", formData.projectScale === scale ? "" : scale)} aria-pressed={formData.projectScale === scale} className={`rounded-xl border px-2 py-2 text-[11px] font-semibold transition-all sm:text-xs ${formData.projectScale === scale ? "border-[#FF8A00] bg-[#FF8A00] text-white" : "border-[#c3c5d9]/40 bg-[#f9f9f7] text-[#424656] hover:border-[#FF8A00]"}`}>{scale}</button>)}</div></fieldset>

              <label className="block font-mono text-[10px] font-bold uppercase text-[#424656]">Project scope and requirements *<textarea required minLength={10} rows={3} value={formData.details} onChange={(event) => update("details", event.target.value)} placeholder="Tell us the scope, location, timeline and key requirements." className="mt-1 w-full rounded-xl border border-[#c3c5d9]/50 bg-[#f9f9f7] p-3 text-xs font-sans text-[#1a1c1b] focus:border-[#FF8A00]" /></label>
              <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={formData.website} onChange={(event) => update("website", event.target.value)} /></label>

              <p className="text-[11px] leading-relaxed text-[#737687]">By submitting, you agree that Saur may use these details to respond to this enquiry, as described in our <Link href="/privacy" className="font-semibold text-[#0b233a] underline decoration-[#FF8A00]/60 underline-offset-2">Privacy Notice</Link>.</p>
              {status === "error" && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700">{error}</p>}
              <button type="submit" disabled={status === "sending"} className="mt-2 w-full rounded-xl bg-[#FF8A00] py-4 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-[#e67c00] disabled:cursor-not-allowed disabled:opacity-70">{status === "sending" ? "Sending request..." : "Submit consultation request"}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
