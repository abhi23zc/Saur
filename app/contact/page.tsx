"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import EnquiryForm from "@/components/EnquiryForm";
import { site, services } from "@/data/site";

const faqs = [
  {
    question: "What information should we share for an engineering quote?",
    answer:
      "Sharing your available Design Basis, P&IDs or equipment list, battery limits, and expected timeline allows us to provide a detailed scope and man-hour estimate within 24 to 48 hours.",
  },
  {
    question: "Do you offer on-site deputation to client offices or yards?",
    answer:
      "Yes. We second qualified engineers and designers across Piping, E&I, and Civil/Structural disciplines for design office peaks, yard fabrication, and commissioning support.",
  },
  {
    question: "What software platforms does your team work with?",
    answer:
      "We deliver in Intergraph Smart 3D (S3D), Aveva E3D, PDMS, SmartPlant Instrumentation (SPI), CAESAR II, PVElite, ETAP, Dialux, STAAD Pro, and AutoCAD Plant 3D.",
  },
];

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Navbar
        onOpenSearch={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative w-full bg-[#05080c] pt-32 sm:pt-36 pb-16 sm:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none"
          style={{ backgroundImage: "url('/media/page-contact-hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/90 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8A00]">
                Contact Saur
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl leading-tight">
              Let&apos;s solve the next{" "}
              <span className="text-[#FF8A00]">engineering challenge.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Talk to our team about an engineering assignment, yard fabrication
              support, workforce deputation, or professional training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid: Details (Left) + Form (Right) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Offices & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Offices */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
                    Offices
                  </span>
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    Our Delivery Centres
                  </h2>
                </div>

                {/* Mumbai */}
                <div className="space-y-1.5 border-b border-slate-100 pb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FF8A00]" />
                      Mumbai Office
                    </h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Real+Tech+Park+Sector+30A+Vashi+Navi+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#FF8A00] hover:underline inline-flex items-center gap-1"
                    >
                      Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    507, 5th Floor, Real Tech Park, Sector 30A, Vashi, Navi
                    Mumbai, Maharashtra – 400703
                  </p>
                  <p className="text-xs font-mono text-slate-500 pl-6">
                    Tel:{" "}
                    <a
                      href="tel:+919967112295"
                      className="text-slate-800 hover:text-[#FF8A00]"
                    >
                      +91 99671 12295
                    </a>
                  </p>
                </div>

                {/* Chennai */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FF8A00]" />
                      Chennai Office
                    </h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=31+Kumaran+Colony+2nd+Street+Vadapalani+Chennai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#FF8A00] hover:underline inline-flex items-center gap-1"
                    >
                      Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai,
                    Tamil Nadu – 600026
                  </p>
                  <p className="text-xs font-mono text-slate-500 pl-6">
                    Tel:{" "}
                    <a
                      href="tel:+918828612183"
                      className="text-slate-800 hover:text-[#FF8A00]"
                    >
                      +91 88286 12183
                    </a>
                  </p>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#FF8A00]" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      General Inquiries
                    </span>
                    <a
                      href="mailto:contact@saurengineering.in"
                      className="text-xs font-medium text-slate-900 hover:text-[#FF8A00] transition-colors"
                    >
                      contact@saurengineering.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Clock className="h-4 w-4 text-[#FF8A00]" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Working Hours
                    </span>
                    <span className="text-xs text-slate-700">
                      Mon – Sat: 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Profile Link */}
              {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-900">
                    Company Profile
                  </h4>
                  <p className="text-xs text-slate-500">Credentials, software & track record</p>
                </div>
                <a
                  href="/media/saur-company-profile.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-[#FF8A00] text-white text-xs font-medium transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>PDF (26 MB)</span>
                </a>
              </div> */}
            </div>

            {/* Right: Clean Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm
                type="quote"
                options={services.map((s) => s.title)}
                title="Send an enquiry"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs (Clean & Minimal) */}
      <section className="py-12 border-t border-slate-200/80 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-900 hover:text-[#FF8A00] transition-colors py-1 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? "rotate-180 text-[#FF8A00]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="pt-2 pb-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
