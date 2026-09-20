"use client";

import { motion } from "framer-motion";
import { useModalDismiss } from "@/lib/useModalDismiss";
import { type CertificateItem } from "@/data/site";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  useModalDismiss(!!certificate, onClose);

  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col modal-surface"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="min-w-0 pr-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold uppercase bg-amber-50 text-[#FF8A00] border border-amber-200">
              {certificate.badge}
            </div>
            <h3 className="font-display text-base sm:text-xl font-bold text-[#0b233a] mt-1 truncate sm:whitespace-normal">
              {certificate.title} — {certificate.subtitle}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-1.5 sm:p-2 text-slate-600 hover:text-[#FF8A00] hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-mono font-bold"
              title="Open full size image"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              <span className="hidden sm:inline">Open File</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Two-column layout with image preview & official metadata */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Left: Certificate Document Viewer */}
          <div className="md:col-span-7 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center p-2">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full max-h-[42vh] sm:max-h-[65vh] object-contain rounded shadow-sm bg-white"
            />
          </div>

          {/* Right: Verified Data Details */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  Accreditation Body
                </span>
                <p className="font-display text-sm font-bold text-[#0b233a]">
                  {certificate.authority}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
                    Certificate No.
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FF8A00]">
                    {certificate.certificateNumber}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
                    Validity
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {certificate.validity}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">
                  Certified Activities & Scope:
                </span>
                <ul className="space-y-2">
                  {certificate.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={certificate.image}
                download
                className="w-full bg-[#0b233a] hover:bg-[#071727] text-white py-2.5 px-4 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Download Official Certificate</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
