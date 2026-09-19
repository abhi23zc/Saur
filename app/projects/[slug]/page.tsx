import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/data/site";
import ProjectDetailView from "@/components/ProjectDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectBySlug(resolvedParams.slug);
  return project
    ? {
        title: `${project.title} | Saur Engineering & Consultancy`,
        description: project.scope,
      }
    : {};
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = projectBySlug(resolvedParams.slug);
  if (!project) notFound();

  // Related projects
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug && p.disciplines.some((d) => project.disciplines.includes(d)))
    .slice(0, 3);

  return (
    <ProjectDetailView
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
