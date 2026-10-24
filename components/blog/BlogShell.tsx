"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import ConsultationModal from "@/components/ConsultationModal";

export default function BlogShell({ children }: { children: React.ReactNode }) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  return <div className="min-h-screen bg-[#f9f9f7]"><a href="#main-content" className="journal-skip">Skip to content</a><Navbar onOpenConsultation={() => setConsultationOpen(true)} />{children}<footer className="journal-footer"><div className="journal-shell"><Link href="/" className="journal-footer-brand">SAUR <span>Engineering &amp; Consultancy</span></Link><nav aria-label="Footer navigation"><Link href="/company">About</Link><Link href="/services">Services</Link><Link href="/expertise">Expertise</Link><Link href="/projects">Projects</Link><Link href="/case-studies">Case Studies</Link><Link href="/careers">Careers &amp; Training</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><a href="/api/rss.xml">RSS</a></nav><SocialLinks /><p>© {new Date().getFullYear()} Saur Engineering &amp; Consultancy</p></div></footer><ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} /></div>;
}
