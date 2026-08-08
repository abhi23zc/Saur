"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrecisionDisciplines, { Discipline } from "@/components/PrecisionDisciplines";
import StrategicPartnerships from "@/components/StrategicPartnerships";
import SectorInsights from "@/components/SectorInsights";
import LifecycleTimeline from "@/components/LifecycleTimeline";
import TechnicalWhitepapers, { Whitepaper } from "@/components/TechnicalWhitepapers";
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
    <div className="relative min-h-screen bg-background text-on-background">
      {/* Background Grids & Scans */}
      <div className="fixed inset-0 micro-grid pointer-events-none z-[-1] opacity-[0.25]" />
      <div className="fixed inset-0 scanlines pointer-events-none z-50 mix-blend-overlay opacity-[0.06]" />

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

        {/* 2. Precision Disciplines Bento Grid */}
        <PrecisionDisciplines
          onSelectDiscipline={(discipline) => setSelectedDiscipline(discipline)}
        />

        {/* 3. Strategic Partnerships Infinite Ticker */}
        <StrategicPartnerships />

        {/* 4. Human Element Sector Insights */}
        <SectorInsights
          onOpenCaseStudy={() =>
            setSelectedWhitepaper({
              id: "cs-petrochemical",
              category: "PETROCHEMICAL EPC",
              date: "MAR 2026",
              tag: "PROJECT",
              title: "Integrated EPC Execution for Petrochemical Expansion",
              summary:
                "Delivering specialized engineering solutions across critical sectors. Our multidisciplinary approach ensures safety, efficiency, and sustainability from FEED to final handover.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAGilywHHJWKX8_xH8PH0-KU7bj4qbyZppnHnxDo0U23bbFMfCUR41S16mbhdI136MrakXpNGOdKx8kiruKm2e25PfVCKDyWW6FgGXwy2hM_Qk9i9gJtnF2xfQCDonydx-2yaEmo0CuhkhRIkwg_KMuHKzzNKe9DwJNcJDrOnKMXJKgqFzUv1g1Airpk9l1_Dcyh_Qy6qhSHBtsDtzjAu322hTarK3MSeUJVJquxBk4idUo0YjY9_c",
              readTime: "5 min read",
              author: "Saur Project Management Office",
              takeaways: [
                "100% ISO 9001 compliance in FEED design.",
                "Cross-disciplinary integration between Piping and E&I teams.",
                "Zero safety incidents across the entire execution phase.",
              ],
            })
          }
        />

        {/* 5. Axon Engineering Lifecycle */}
        <LifecycleTimeline />

        {/* 6. Technical Whitepapers Grid */}
        <TechnicalWhitepapers
          onSelectWhitepaper={(whitepaper) => setSelectedWhitepaper(whitepaper)}
        />

        {/* 7. Leadership & Human Capital */}
        <HumanCapital onOpenLeadership={() => setLeadershipOpen(true)} />

        {/* 8. Global Footprint Map */}
        <GlobalFootprintMap />

        {/* 9. Initiate Consultation CTA */}
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
