"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/data/site";

export default function ProjectPortfolio({ projects }: { projects: Project[] }) {
  const disciplines = ["All", ...Array.from(new Set(projects.flatMap((project) => project.disciplines))).sort()];
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => projects.filter((project) => (active === "All" || project.disciplines.includes(active)) && `${project.title} ${project.client} ${project.endUser} ${project.scope}`.toLowerCase().includes(query.toLowerCase())), [active, projects, query]);
  return <><div className="filter-row">{disciplines.map((discipline) => <button type="button" onClick={() => setActive(discipline)} key={discipline} aria-pressed={active === discipline}>{discipline}</button>)}</div><label className="portfolio-search">Search projects<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Project, client or discipline" /></label><div className="project-list">{visible.map((project) => <Link className="project-row" href={`/projects/${project.slug}`} key={project.slug}><p>{project.year}</p><h3>{project.title}</h3><p>{project.client}<br />{project.endUser}</p><p>{project.disciplines.join(" · ")} →</p></Link>)}</div>{visible.length === 0 && <p className="empty-state">No projects match that search.</p>}</>;
}
