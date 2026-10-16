"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Props = {
  type?: "quote" | "training";
  options?: string[];
  title?: string;
};

const defaultServiceOptions = [
  "FEED & Detail Engineering",
  "Piping & Mechanical Engineering",
  "Electrical Engineering",
  "Instrumentation & Control",
  "3D Plant Modelling",
  "Pipe Stress Analysis",
  "Civil & Structural Engineering",
  "Skid Design & Fabrication Support",
  "Pipeline Engineering",
  "Manpower & Deputation",
  "Training & Professional Courses",
  "Other / General Inquiry",
];

const initial = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  selection: "",
  message: "",
  website: "",
};

export default function EnquiryForm({
  type: initialType = "quote",
  options,
  title = "Send an enquiry",
}: Props) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const activeOptions = options && options.length > 0 ? options : defaultServiceOptions;

  const update = (key: keyof typeof initial, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.organization.trim()) {
      setError("Please enter your organization.");
      return;
    }
    if (!form.selection) {
      setError("Please select a service of interest.");
      return;
    }
    if (form.message.trim().length < 10) {
      setError("Please enter at least 10 characters in your message.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: initialType,
        }),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || "We could not send your enquiry. Please try again.");
      }

      setReferenceId("SEC-" + Math.floor(100000 + Math.random() * 900000));
      setStatus("success");
      setForm(initial);
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "Submission failed. Please try again or email us directly.");
    }
  }

  const resetForm = () => {
    setStatus("idle");
    setError("");
    setForm(initial);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      {status === "success" ? (
        <div className="py-8 text-center animate-in fade-in duration-200">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            Message received
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
            Thank you. Our team will review your requirements and respond within 24 business hours.
          </p>

          <div className="inline-block rounded-lg bg-slate-50 border border-slate-200 px-4 py-2 font-mono text-xs text-slate-700 mb-6">
            Reference: <span className="font-bold text-[#FF8A00]">{referenceId}</span>
          </div>

          <div>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {title}
            </h2>
            <p className="text-sm text-slate-500">
              Fill in your details below and an engineer will get back to you shortly.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="e.g. Petrocon / ADNOC"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone number <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 99671 12295"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service of interest <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.selection}
                onChange={(e) => update("selection", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors cursor-pointer"
              >
                <option value="">Select an option</option>
                {activeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Scope brief <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us about your requirements, timeline, or project scope..."
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-colors"
              />
            </div>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="sec-honeypot">Website</label>
              <input
                id="sec-honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            {status === "error" && error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-[#FF8A00] hover:bg-[#e67c00] active:bg-[#cc6d00] text-white font-semibold text-sm py-2.5 px-5 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit enquiry</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Protected under confidential NDA. View our{" "}
              <Link href="/privacy" className="text-slate-600 underline hover:text-[#FF8A00]">
                Privacy Notice
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
