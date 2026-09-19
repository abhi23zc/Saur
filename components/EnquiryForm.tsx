"use client";

import { FormEvent, useState } from "react";

type Props = { type: "quote" | "training"; options: string[]; title?: string };
const initial = { name: "", email: "", organization: "", phone: "", selection: "", message: "", website: "" };

export default function EnquiryForm({ type, options, title = "Send an enquiry" }: Props) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const update = (key: keyof typeof initial, value: string) => setForm((current) => ({ ...current, [key]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault(); setStatus("sending"); setError("");
    try { const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type }) }); const body = await response.json(); if (!response.ok) throw new Error(body.error || "We could not send your enquiry."); setStatus("success"); setForm(initial); } catch (reason) { setStatus("error"); setError(reason instanceof Error ? reason.message : "We could not send your enquiry."); }
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <div className="form-heading"><p className="eyebrow">Direct enquiry</p><h2>{title}</h2></div>
    <div className="form-grid"><label>Full name<input required value={form.name} onChange={(e) => update("name", e.target.value)} /></label><label>Business email<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></label><label>Organization<input required value={form.organization} onChange={(e) => update("organization", e.target.value)} /></label><label>Phone number<input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label></div>
    <label>{type === "training" ? "Course of interest" : "Service of interest"}<select required value={form.selection} onChange={(e) => update("selection", e.target.value)}><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
    <label>How can we help?<textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your requirements, location and expected timeline." /></label>
    <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label>
    <button className="button button-primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit enquiry"} <span>↗</span></button>
    {status === "success" && <p className="form-success" role="status">Thank you. Your enquiry has been sent to the Saur team.</p>}{status === "error" && <p className="form-error" role="alert">{error}</p>}
  </form>;
}
