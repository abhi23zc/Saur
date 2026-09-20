"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrecisionDisciplines, { Discipline } from "@/components/PrecisionDisciplines";
import StrategicPartnerships from "@/components/StrategicPartnerships";
import MajorProjects from "@/components/MajorProjects";
import SectorInsights from "@/components/SectorInsights";
import LifecycleTimeline from "@/components/LifecycleTimeline";
import type { Whitepaper } from "@/components/TechnicalWhitepapers";
import HumanCapital from "@/components/HumanCapital";
import GlobalFootprintMap from "@/components/GlobalFootprintMap";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

// Modals
import SearchModal from "@/components/SearchModal";
import ConsultationModal from "@/components/ConsultationModal";
import DisciplineModal from "@/components/DisciplineModal";
import WhitepaperModal from "@/components/WhitepaperModal";
import LeadershipModal from "@/components/LeadershipModal";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<Whitepaper | null>(null);
  const [leadershipOpen, setLeadershipOpen] = useState(false);

  const scrollToDisciplines = () => {
    const el = document.getElementById("disciplines");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {/* 1. Hero Section */}
        <HeroSection
          onExplore={scrollToDisciplines}
          onOpenConsultation={() => setConsultationOpen(true)}
        />

        {/* 2. Precision Disciplines Grid */}
        <PrecisionDisciplines
          onSelectDiscipline={(discipline) => setSelectedDiscipline(discipline)}
        />

        {/* 3. Specialized Software Infinite Ticker */}
        <StrategicPartnerships />

        {/* 4. Major Projects Executed (Real PDF Case Studies) */}
        <MajorProjects />

        {/* 5. Industries Served */}
        <SectorInsights
          onOpenCaseStudy={() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 6. Engineering Lifecycle */}
        <LifecycleTimeline />

        {/* 7. Manpower & Workforce Solutions */}
        <HumanCapital onOpenLeadership={() => setLeadershipOpen(true)} />

        {/* 8. Global Footprint & Delivery Centers */}
        <GlobalFootprintMap />

        {/* 9. Direct Consultation CTA */}
        <ConsultationCTA onOpenConsultation={() => setConsultationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDiscipline={(d) => setSelectedDiscipline(d)}
        onSelectWhitepaper={(w) => setSelectedWhitepaper(w)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <DisciplineModal
        discipline={selectedDiscipline}
        onClose={() => setSelectedDiscipline(null)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <WhitepaperModal
        whitepaper={selectedWhitepaper}
        onClose={() => setSelectedWhitepaper(null)}
      />

      <LeadershipModal
        isOpen={leadershipOpen}
        onClose={() => setLeadershipOpen(false)}
      />
    </div>
  );
}
