"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import EnquiryForm from "@/components/EnquiryForm";
import { site, services } from "@/data/site";

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-on-background">
      <div className="fixed inset-0 micro-grid pointer-events-none z-[-1] opacity-[0.25]" />

      <Navbar
        onOpenSearch={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[55svh] flex flex-col justify-end bg-[#05080c] overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen" style={{ backgroundImage: "url('/media/page-contact-hero.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/80 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Contact Saur</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Let&apos;s solve the next<br />
              <span className="text-[#FF8A00]">engineering challenge.</span>
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl leading-relaxed">
              Talk to our team about an engineering assignment, workforce requirement or professional training need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Details */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-6 block">Reach Our Team</span>
              <h2 className="font-display text-3xl font-bold text-[#1a1c1b] tracking-tight mb-8">
                Two offices. One responsive engineering partner.
              </h2>

              <div className="space-y-8">
                {site.offices.map((office) => (
                  <div key={office.city} className="bg-white border border-[#e2e3e1] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-xl text-[#FF8A00]">location_on</span>
                      <h3 className="font-display text-lg font-bold text-[#1a1c1b]">{office.city}</h3>
                    </div>
                    <p className="text-sm text-[#424656] ml-9">{office.address}</p>
                  </div>
                ))}

                <div className="bg-white border border-[#e2e3e1] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-xl text-[#FF8A00]">call</span>
                    <h3 className="font-display text-lg font-bold text-[#1a1c1b]">Call or Email</h3>
                  </div>
                  <div className="ml-9 space-y-2">
                    {site.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block text-sm text-[#424656] hover:text-[#FF8A00] transition-colors">
                        {phone}
                      </a>
                    ))}
                    {site.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="block text-sm text-[#424656] hover:text-[#FF8A00] transition-colors">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#e2e3e1] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-xl text-[#FF8A00]">description</span>
                    <h3 className="font-display text-lg font-bold text-[#1a1c1b]">Company Profile</h3>
                  </div>
                  <div className="ml-9">
                    <a
                      href="/media/saur-company-profile.pdf"
                      download
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#FF8A00] hover:gap-3 transition-all duration-300"
                    >
                      Download our company profile (PDF)
                      <span className="material-symbols-outlined text-sm">download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div>
              <EnquiryForm
                type="quote"
                options={services.map((s) => s.title)}
                title="Tell us about your requirement"
              />
            </div>
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
