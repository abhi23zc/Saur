"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export default function BlogShell({ children }: { children: React.ReactNode }) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  return <div className="min-h-screen bg-[#f9f9f7]"><Navbar onOpenConsultation={() => setConsultationOpen(true)} />{children}<Footer /><ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} /></div>;
}
