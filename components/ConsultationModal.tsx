"use client";

import { useState } from "react";
import { useModalDismiss } from "@/lib/useModalDismiss";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    discipline: "Mechanical Systems",
    budget: "$10M - $50M",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  useModalDismiss(isOpen, onClose);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = "SAUR-" + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      org: "",
      discipline: "Mechanical Systems",
      budget: "$10M - $50M",
      details: "",
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="modal-surface bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c5d9]/40 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close consultation modal"
          className="absolute top-6 right-6 p-2 rounded-full text-[#737687] hover:text-[#1a1c1b] hover:bg-[#eeeeec] transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FF8A00]/10 text-[#FF8A00] flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-widest block">
              Consultation Initialized
            </span>
            <h3 className="font-display text-2xl font-bold text-[#1a1c1b]">
              Enterprise Request Received
            </h3>
            <p className="font-sans text-sm text-[#424656] max-w-md mx-auto leading-relaxed">
              Our Senior Principal Engineering Partner has been assigned to your profile. Reference Dispatch ID:
            </p>
            <div className="font-mono text-base font-bold text-[#FF8A00] bg-[#eeeeec] py-3 px-6 rounded-xl inline-block tracking-wider">
              {refId}
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#FF8A00] text-white px-8 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-widest block mb-1">
                Saur Engagement Protocol
              </span>
              <h3 className="font-display text-3xl font-bold text-[#1a1c1b]">
                Initiate Technical Consultation
              </h3>
              <p className="font-sans text-xs text-[#424656] mt-1">
                Direct engagement with Saur engineering leadership and feasibility specialists.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#f9f9f7] border border-[#c3c5d9]/50 rounded-xl px-4 py-2.5 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                    Enterprise Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="s.jenkins@enterprise.com"
                    className="w-full bg-[#f9f9f7] border border-[#c3c5d9]/50 rounded-xl px-4 py-2.5 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                    Organization / Govt Body *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.org}
                    onChange={(e) =>
                      setFormData({ ...formData, org: e.target.value })
                    }
                    placeholder="e.g. Vertex Dynamics"
                    className="w-full bg-[#f9f9f7] border border-[#c3c5d9]/50 rounded-xl px-4 py-2.5 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                    Primary Discipline
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) =>
                      setFormData({ ...formData, discipline: e.target.value })
                    }
                    className="w-full bg-[#f9f9f7] border border-[#c3c5d9]/50 rounded-xl px-4 py-2.5 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00]"
                  >
                    <option value="Mechanical Systems">Mechanical Systems</option>
                    <option value="Subsea Engineering">Subsea Engineering</option>
                    <option value="Process Automation">Process Automation</option>
                    <option value="Hyper-Scale Infrastructure">Hyper-Scale Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                  Target Capital Expenditure (CapEx)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["$1M - $10M", "$10M - $50M", "$50M+"].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2 rounded-xl text-xs font-sans font-semibold border transition-all ${
                        formData.budget === b
                          ? "bg-[#FF8A00] text-white border-[#FF8A00]"
                          : "bg-[#f9f9f7] text-[#424656] border-[#c3c5d9]/40 hover:border-[#FF8A00]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#424656] font-bold uppercase block mb-1">
                  Project Scope & Technical Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Outline key operational constraints, location, timeline target..."
                  className="w-full bg-[#f9f9f7] border border-[#c3c5d9]/50 rounded-xl p-3 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF8A00] text-white py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-colors shadow-lg mt-2"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
