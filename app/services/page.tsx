"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    number: "01",
    icon: "architecture",
    title: "Plan the right project",
    description: "We turn early ideas into a clear, practical engineering plan—so you can make decisions with confidence before work begins.",
    outcomes: ["Feasibility and FEED studies", "Clear scope, cost and risk inputs"],
  },
  {
    number: "02",
    icon: "account_tree",
    title: "Design it for delivery",
    description: "Our multidisciplinary team develops coordinated engineering and 3D models that are ready for procurement, fabrication and construction.",
    outcomes: ["Detailed engineering packages", "Coordinated 3D plant models"],
  },
  {
    number: "03",
    icon: "precision_manufacturing",
    title: "Support fabrication and site work",
    description: "We help yards and project teams resolve issues quickly, keep work moving and hand over reliable, buildable information.",
    outcomes: ["Fabrication drawings and support", "Site queries and as-built updates"],
  },
  {
    number: "04",
    icon: "groups",
    title: "Extend your engineering team",
    description: "Bring in experienced engineers, analysts and modelers when your project needs additional specialist capacity.",
    outcomes: ["Dedicated engineering teams", "Flexible specialist deployment"],
  },
];

const engagementModels = [
  { icon: "assignment_turned_in", title: "Defined project scope", description: "A complete package for a clearly defined outcome, delivered to agreed milestones.", bestFor: "Best for one-off packages and fixed deliverables." },
  { icon: "hub", title: "Dedicated team", description: "A scalable engineering team that works as an extension of your in-house project office.", bestFor: "Best for ongoing programmes and changing workloads." },
  { icon: "badge", title: "Specialist support", description: "Experienced technical professionals placed where your project needs them most.", bestFor: "Best for site needs, specialist roles and project peaks." },
];

const deliveryStages = [
  { number: "01", title: "Understand", description: "We align on priorities, scope and project constraints.", nodePosition: "left-[24.4%] top-[74%]", copyPosition: "left-[17%] top-[78%]" },
  { number: "02", title: "Plan", description: "We set out the right team, information and delivery approach.", nodePosition: "left-[43.5%] top-[55%]", copyPosition: "left-[36%] top-[59%]" },
  { number: "03", title: "Deliver", description: "We develop coordinated packages and resolve issues early.", nodePosition: "left-[63.5%] top-[37%]", copyPosition: "left-[57%] top-[41%]" },
  { number: "04", title: "Support", description: "We stay available through handover, fabrication and site activity.", nodePosition: "left-[89%] top-[18%]", copyPosition: "left-[78%] top-[22%]" },
];

export default function ServicesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />
      <main className="flex-1">
        <section className="relative flex min-h-[500px] w-full items-stretch overflow-hidden bg-[#0b233a] pb-6 pt-20 sm:min-h-[540px] sm:pt-22 lg:min-h-[580px] lg:pt-24">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/media/page-services-hero.png')", backgroundPosition: "center right" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b233a]/95 via-[#0b233a]/90 to-[#0b233a] lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/50" />
            <div className="absolute right-16 top-12 hidden text-right text-white xl:block"><div className="mb-2 ml-auto h-0.5 w-8 bg-[#FF8A00]" /><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">FROM SCOPE TO SITE</p><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">END-TO-END ENGINEERING</p></div>
            <p className="absolute bottom-12 right-16 hidden text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 xl:block">CLEAR. COORDINATED. BUILDABLE.</p>
          </div>
          <div className="relative z-10 flex w-full flex-col justify-center bg-transparent px-4 py-8 sm:px-8 sm:py-10 md:px-16 lg:w-[60%] lg:bg-[#0b233a] lg:py-14 xl:w-[54%] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4"><div className="h-0.5 w-5 bg-[#FF8A00] sm:w-6" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-[11px] sm:tracking-[0.2em]">ENGINEERING SERVICES</span></div>
              <h1 className="mb-3 font-display text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:mb-5 sm:text-4xl sm:leading-[1.12] md:text-5xl lg:text-[3.25rem]">Engineering Services <br className="hidden sm:inline" /><span className="text-white">That Take Projects</span>{" "}<span className="text-[#FF8A00]">From Idea to Reality.</span></h1>
              <p className="mb-6 max-w-lg font-sans text-xs font-light leading-relaxed text-slate-200 sm:mb-7 sm:text-sm md:text-base">From early planning and detailed design to fabrication, site support and flexible engineering teams, we help complex industrial projects move forward with clarity.</p>
              <div className="mb-6 flex w-full flex-col items-stretch gap-3 sm:mb-8 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <button onClick={() => setConsultationOpen(true)} className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF8A00] px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#E67C00] hover:shadow sm:w-auto sm:rounded sm:px-7 sm:py-3.5"><span>Discuss Your Project</span><span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></button>
                <a href="#services" className="inline-flex w-full items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-center font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto sm:rounded sm:px-7 sm:py-3.5">Explore Services</a>
              </div>
              <div className="flex flex-wrap items-center gap-2 border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300 sm:gap-3 sm:pt-5 sm:text-[10px] sm:tracking-[0.2em] sm:text-slate-400"><span>PLAN</span><span className="text-white/30">•</span><span>DESIGN</span><span className="text-white/30">•</span><span>DELIVER</span><span className="text-white/30">•</span><span className="font-bold text-amber-400">SITE SUPPORT</span></div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-slate-200 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 md:px-16">
            {[["One engineering partner", "From concept through construction"], ["Built around your project", "Defined scope, teams or specialists"], ["Quality-led delivery", "Coordinated, practical project outputs"]].map(([title, detail]) => (
              <div key={title} className="py-5 sm:px-6 sm:py-6 first:sm:pl-0 last:sm:pr-0"><p className="font-display text-sm font-bold text-[#0b233a]">{title}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{detail}</p></div>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-16">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-[11px]">What we do</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0b233a] sm:text-4xl">The support your project needs, without the noise.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">We focus on the engineering activities that help you make sound decisions, deliver buildable designs and keep projects progressing.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
              {services.map((service) => (
                <article key={service.number} className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#FF8A00]/60 hover:shadow-lg sm:p-6">
                  <div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b233a] text-white transition-colors group-hover:bg-[#FF8A00]"><span className="material-symbols-outlined text-xl">{service.icon}</span></div><span className="font-mono text-xs font-bold text-slate-300">{service.number}</span></div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[#0b233a]">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-2 text-xs leading-snug text-slate-700"><span className="material-symbols-outlined text-sm text-[#FF8A00]">check_circle</span>{outcome}</li>)}</ul>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">Need digital engineering or domain expertise? We also support industrial software, intelligent plant data and digital transformation initiatives.</p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-16">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-[11px]">How we work</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0b233a] sm:text-4xl">Choose the engagement that fits.</h2><p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">We can deliver a complete package, become part of your project office, or provide the specialist support you need.</p></div><button onClick={() => setConsultationOpen(true)} className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-wider text-[#e67c00] hover:text-[#0b233a] md:self-auto">Help me choose <span className="material-symbols-outlined text-base">arrow_forward</span></button></div>
            <div className="mt-9 grid gap-4 md:grid-cols-3 sm:gap-5">{engagementModels.map((model) => <article key={model.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"><span className="material-symbols-outlined text-3xl text-[#FF8A00]">{model.icon}</span><h3 className="mt-4 font-display text-xl font-bold text-[#0b233a]">{model.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{model.description}</p><p className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold leading-relaxed text-slate-700">{model.bestFor}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-16 lg:gap-16">
            <div className="rounded-2xl bg-[#0b233a] p-7 text-white sm:p-9">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-[11px]">What you receive</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Clear information your team can act on.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">The value is not just in the design work. It is in making the next project decision or construction step easier and safer for everyone involved.</p>
              <Link href="/expertise" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF8A00] hover:text-white">Explore our expertise <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
            </div>
            <div className="space-y-4">
              <div className="relative h-44 overflow-hidden rounded-2xl bg-[#0b233a] sm:h-52">
                <Image src="/media/saur-engineering-coordination.png" alt="Engineering team coordinating a plant design" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b233a]/85 via-[#0b233a]/25 to-transparent" />
                <p className="absolute bottom-4 left-5 max-w-[13rem] font-display text-lg font-bold leading-tight text-white">Coordination that turns design into action.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["fact_check", "Coordinated outputs", "Information that works across engineering disciplines, suppliers and site teams."],
                  ["view_in_ar", "Buildable design", "Practical drawings and models that support procurement, fabrication and construction."],
                  ["support_agent", "Responsive support", "A team that helps resolve questions as the project develops."],
                ].map(([icon, title, detail]) => (
                  <div key={title} className="rounded-xl border border-slate-200 p-5">
                    <span className="material-symbols-outlined text-2xl text-[#FF8A00]">{icon}</span>
                    <h3 className="mt-4 font-display text-base font-bold text-[#0b233a]">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-16">
            <div className="relative mt-2 hidden min-h-[530px] overflow-hidden rounded-[28px] border border-slate-200 bg-white lg:block">
              <div className="absolute -right-20 -top-20 h-[520px] w-[520px] rounded-full bg-slate-50" />
              <div className="absolute left-12 top-11 z-10 max-w-[340px]">
                <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#0b233a]">How we work with your project.</h2>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">We make the path forward clear early, so your project team can focus on the decisions that matter and move with confidence.</p>
              </div>
              <button onClick={() => setConsultationOpen(true)} className="absolute left-[4%] top-[48%] z-20 inline-flex items-center gap-2 rounded-full bg-[#FF4E2B] px-6 py-3 text-xs font-bold text-white shadow-[0_10px_22px_rgba(255,78,43,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#e64121]">Start a project <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              <svg viewBox="0 0 1200 530" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path d="M-20 230 C80 230 116 258 156 286 C210 346 247 392 293 392 C408 392 449 291 522 291 C626 291 681 204 762 204 C886 204 966 105 1068 105 C1137 105 1186 82 1220 72" fill="none" stroke="#FF4E2B" strokeWidth="3" strokeLinecap="round" className="service-flow-line" />
              </svg>
              {deliveryStages.map((stage, index) => (
                <span key={stage.number} className={`service-flow-node service-flow-node-${index} absolute z-10 h-4 w-4 rounded-full border-[3px] border-white bg-[#FF4E2B] shadow-[0_0_0_4px_rgba(255,78,43,0.15)] ${stage.nodePosition}`} aria-hidden="true" />
              ))}
              {deliveryStages.map((stage) => (
                <article key={stage.title} className={`absolute z-10 w-[220px] ${stage.copyPosition}`}>
                  <span className="pointer-events-none absolute -left-7 -top-14 font-display text-[6rem] font-extrabold leading-none tracking-tight text-slate-100">{stage.number.replace("0", "")}</span>
                  <h3 className="relative font-display text-lg font-bold text-[#0b233a]">{stage.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{stage.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6 lg:hidden">
              <h2 className="max-w-sm font-display text-3xl font-bold leading-tight tracking-tight text-[#0b233a]">How we work with your project.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">We make the path forward clear early, so your project team can move with confidence.</p>
              <button onClick={() => setConsultationOpen(true)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF4E2B] px-5 py-2.5 text-xs font-bold text-white">Start a project <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              <div className="relative mt-8 space-y-0 border-l-2 border-[#FF4E2B]/30 pl-7">
                {deliveryStages.map((stage, index) => (
                  <article key={stage.number} className="relative pb-8 last:pb-0"><span className={`service-flow-node service-flow-node-${index} absolute -left-[35px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-[#FF4E2B] shadow-[0_0_0_4px_rgba(255,78,43,0.15)]`} /><span className="font-mono text-xs font-bold text-[#FF4E2B]">{stage.number}</span><h3 className="mt-1 font-display text-lg font-bold text-[#0b233a]">{stage.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{stage.description}</p></article>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center"><p className="max-w-2xl text-sm leading-relaxed text-slate-600">Want to see the type of projects we support? Explore selected work across engineering, fabrication and industrial delivery.</p><Link href="/projects" className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e67c00] hover:text-[#0b233a]">View selected projects <span className="material-symbols-outlined text-base">arrow_forward</span></Link></div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-16"><div className="rounded-2xl bg-[#0b233a] px-6 py-9 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-[11px]">Start a conversation</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Tell us what your project needs.</h2><p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">We’ll help you identify the most useful engineering support and the best way to engage our team.</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0"><button onClick={() => setConsultationOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#FF8A00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#e67c00]">Request consultation <span className="material-symbols-outlined text-base">arrow_forward</span></button><Link href="/projects" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">View projects</Link></div></div></div>
        </section>
      </main>
      <Footer />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
