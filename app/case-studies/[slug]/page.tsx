import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyBySlug, caseStudies } from "@/data/site";
import CaseStudyDetailView from "@/components/CaseStudyDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const cs = caseStudyBySlug(resolvedParams.slug);
  return cs
    ? {
        title: `${cs.title} | Saur Engineering & Consultancy`,
        description: cs.scope,
      }
    : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const cs = caseStudyBySlug(resolvedParams.slug);
  if (!cs) notFound();

  // Find index for linear navigation
  const currentIdx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const prevCs = caseStudies[(currentIdx - 1 + caseStudies.length) % caseStudies.length];
  const nextCs = caseStudies[(currentIdx + 1) % caseStudies.length];

  // Related case studies (prioritize same operator or matching disciplines)
  const relatedCaseStudies = caseStudies
    .filter(
      (c) =>
        c.slug !== cs.slug &&
        (c.endUser === cs.endUser || c.disciplines.some((d) => cs.disciplines.includes(d)))
    )
    .slice(0, 3);

  return (
    <CaseStudyDetailView
      caseStudy={cs}
      prevCaseStudy={prevCs}
      nextCaseStudy={nextCs}
      relatedCaseStudies={relatedCaseStudies}
    />
  );
}
