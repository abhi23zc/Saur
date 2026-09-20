"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import {
  ArrowRight,
  Award,
  BookOpen,
  Boxes,
  Compass,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  Layers,
  MapPin,
  Phone,
  Zap,
} from "lucide-react";

const learningPaths = [
  {
    number: "01",
    title: "Piping Engineering & Design",
    icon: Layers,
    tone: "bg-[#0b233a] text-white",
    detail: "Technical learning for piping engineering and design.",
  },
  {
    number: "02",
    title: "Process Engineering & Design",
    icon: Compass,
    tone: "bg-[#f3f5f7] text-[#0b233a]",
    detail: "Technical learning for process engineering and design.",
  },
  {
    number: "03",
    title: "Mechanical Engineering & Design",
    icon: Boxes,
    tone: "bg-[#d98a16] text-white",
    detail: "Technical learning for mechanical engineering and design.",
  },
  {
    number: "04",
    title: "Instrumentation Engineering & Design",
    icon: Cpu,
    tone: "bg-[#eef2f6] text-[#0b233a]",
    detail: "Technical learning for instrumentation engineering and design.",
  },
  {
    number: "05",
    title: "Electrical Engineering & Design",
    icon: Zap,
    tone: "bg-[#0b233a] text-white",
    detail: "Technical learning for electrical engineering and design.",
  },
  {
    number: "06",
    title: "PDMS, SP3D, E3D & AutoCAD",
    icon: FileSpreadsheet,
    tone: "bg-[#f3f5f7] text-[#0b233a]",
    detail: "Design software learning for plant and engineering documentation.",
  },
];

const audiences = [
  {
    title: "Professionals",
    text: "Customised learning that builds technical capability.",
    icon: Award,
  },
  {
    title: "Students",
    text: "Engineering learning designed to build expertise.",
    icon: GraduationCap,
  },
  {
    title: "Organisations",
    text: "Customised courses that support stronger team capability.",
    icon: BookOpen,
  },
];

export default function TrainingPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#0b233a] selection:bg-[#d98a16] selection:text-white">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main>
        <section className="relative flex min-h-[480px] w-full items-stretch overflow-hidden bg-[#0b233a] pb-8 pt-20 sm:min-h-[520px] sm:pb-12 lg:min-h-[560px] lg:pb-12 lg:pt-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/page-training-hero.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-[#0b233a]/85 to-black/60 sm:bg-gradient-to-r sm:via-[#0b233a]/65 sm:to-black/40" />
            <div className="absolute right-16 top-12 hidden text-right text-white xl:block">
              <div className="mb-2 ml-auto h-0.5 w-8 bg-[#FF8A00]" />
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">SAUR ACADEMY</div>
              <div className="text-xs font-normal text-slate-300">Chennai engineering training centre</div>
            </div>
          </div>

          <div className="relative z-10 flex w-full flex-col justify-center bg-[#0b233a]/95 px-4 py-10 sm:bg-[#0b233a] sm:px-8 sm:py-12 md:px-14 lg:w-[68%] lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] lg:px-16 lg:py-16 xl:w-[62%]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF8A00]/25 bg-[#FF8A00]/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8A00]">Training &amp; Development</span>
              </div>
              <h1 className="mb-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                We don&apos;t just teach. <br />
                <span className="text-[#FF8A00]">We prepare you to lead.</span>
              </h1>
              <p className="mb-8 max-w-xl text-xs font-normal leading-relaxed text-slate-200 sm:text-sm md:text-base">
                Empowering professionals, students, and organisations through customised courses that build expertise and drive exceptional results.
              </p>
              <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a href="#learning-paths" className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FF8A00] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0b233a] shadow-md transition-all hover:bg-[#E67C00] active:scale-[0.98] sm:w-auto sm:px-7">
                  <span>Explore courses</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button onClick={() => setConsultationOpen(true)} className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto sm:px-7">
                  Discuss a course
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-white sm:gap-4 sm:pt-6">
                {audiences.map(({ title, icon: Icon }, index) => (
                  <div key={title}>
                    <div className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                      <span className={index === 0 ? "text-[#FF8A00]" : "text-white"}>0{index + 1}</span>
                      <Icon className="hidden h-4 w-4 text-white/60 sm:block" />
                    </div>
                    <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300 sm:text-[10px]">{title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="learning-paths" className="scroll-mt-24 border-b border-slate-200 bg-[#f8f8f5] py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
            <div className="grid gap-7 border-b border-slate-300 pb-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c87510]">Our courses</p>
                <h2 className="mt-3 max-w-md font-display text-3xl font-extrabold tracking-tight text-[#0b233a] sm:text-5xl">Choose an engineering path.</h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                Six focused course areas designed to build practical engineering knowledge across core disciplines and design software.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {learningPaths.map(({ number, title, icon: Icon, tone, detail }, index) => (
                <article
                  key={title}
                  className={`${tone} group relative min-h-[245px] overflow-hidden border border-[#0b233a]/10 p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 0 || index === 5 ? "xl:col-span-1" : ""}`}
                >
                  <span className="absolute -right-4 -top-7 font-display text-9xl font-bold opacity-[0.07]">{number}</span>
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold tracking-[0.18em] opacity-70">{number}</span>
                        <Icon className="h-7 w-7 opacity-80" />
                      </div>
                      <h3 className="mt-12 max-w-[17rem] font-display text-2xl font-bold leading-tight">{title}</h3>
                    </div>
                    <div className="flex items-end justify-between gap-5 border-t border-current/20 pt-4">
                      <p className="max-w-[16rem] text-sm leading-relaxed opacity-80">{detail}</p>
                      <button
                        onClick={() => setConsultationOpen(true)}
                        aria-label={`Enquire about ${title}`}
                        className="grid h-10 w-10 shrink-0 place-items-center border border-current/30 transition-colors hover:bg-current/10"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-16">
            <div className="relative min-h-[330px] overflow-hidden bg-[#0b233a] sm:min-h-[420px]">
              <img
                src="/media/saur-engineering-coordination.png"
                alt="Engineers reviewing plant model and technical drawings"
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061626] via-[#061626]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0b154]">Learning by discipline</span>
                <p className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white">Technical learning connects engineering knowledge with thoughtful design practice.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c87510]">Training &amp; development</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight text-[#0b233a] sm:text-5xl">Build capability with a course shaped around your needs.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
                Saur provides customised courses for professionals, students and organisations. Training is part of our wider engineering and upskilling capability.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Customised courses"],
                  ["02", "Engineering expertise"],
                  ["03", "Professional development"],
                ].map(([number, label]) => (
                  <div key={number} className="border-l-2 border-[#d98a16] pl-3">
                    <p className="font-mono text-[10px] font-bold text-[#c87510]">{number}</p>
                    <p className="mt-1 text-sm font-bold text-[#0b233a]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#eef2f5] py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-16">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c87510]">Training centre</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0b233a] sm:text-4xl">Chennai engineering training centre.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-slate-300 bg-white p-5">
                <MapPin className="h-5 w-5 text-[#d98a16]" />
                <p className="mt-4 text-sm font-bold text-[#0b233a]">Chennai</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026</p>
              </div>
              <div className="border border-slate-300 bg-white p-5">
                <Phone className="h-5 w-5 text-[#d98a16]" />
                <p className="mt-4 text-sm font-bold text-[#0b233a]">Training enquiries</p>
                <a className="mt-2 block text-sm text-slate-600 hover:text-[#c87510]" href="tel:+919967112295">+91 99671 12295</a>
                <a className="mt-1 block text-sm text-slate-600 hover:text-[#c87510]" href="tel:+918828612183">+91 88286 12183</a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b233a] py-16 text-white sm:py-20">
          <div className="absolute inset-0 opacity-20 blueprint-grid" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-16">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0b154]">Custom training enquiry</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">Build your next learning programme with Saur.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">Tell us your discipline, audience and training objectives. We will help scope a customised programme.</p>
            </div>
            <button
              onClick={() => setConsultationOpen(true)}
              className="inline-flex min-h-12 items-center gap-2 bg-[#d98a16] px-6 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#bd7010]"
            >
              Start an enquiry <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onSelectDiscipline={() => {}} onSelectWhitepaper={() => {}} />
    </div>
  );
}
