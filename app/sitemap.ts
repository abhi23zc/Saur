import type { MetadataRoute } from "next";
import { projects } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://saurengineering.in"; const routes = ["", "/company", "/services", "/digital-workforce", "/expertise", "/technology", "/projects", "/training", "/contact", "/privacy"]; return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date() }))]; }
