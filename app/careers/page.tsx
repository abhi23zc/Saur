import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";
import { getPublicJobs } from "@/lib/careers/data";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Careers, Training & Internships | Saur Engineering",
  description: "Explore engineering vacancies, practical training, and the 60-day engineering internship at Saur Engineering & Consultancy.",
  alternates: { canonical: "/careers" },
};
export default async function Careers() { return <CareersPage {...await getPublicJobs()} />; }
