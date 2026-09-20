import type { MetadataRoute } from "next";
import { caseStudies, projects } from "@/data/site";
import { getPublishedPosts } from "@/lib/blog/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://saurengineering.in";
  const posts = await getPublishedPosts();
  const routes = ["", "/company", "/services", "/digital-workforce", "/expertise", "/technology", "/projects", "/case-studies", "/training", "/contact", "/privacy", "/blog"];
  return [
    ...routes.map((route) => ({ url: base + route, lastModified: new Date() })),
    ...projects.map((project) => ({ url: base + "/projects/" + project.slug, lastModified: new Date() })),
    ...caseStudies.map((caseStudy) => ({ url: base + "/case-studies/" + caseStudy.slug, lastModified: new Date() })),
    ...posts.map((post) => ({ url: base + "/blog/" + post.slug, lastModified: new Date(post.updatedAt) })),
  ];
}
