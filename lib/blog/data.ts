import "server-only";

import { cache } from "react";
import { isSupabaseConfigured, createClient, createPublicClient } from "@/lib/supabase/server";
import { samplePosts } from "./sample-posts";
import type { BlogPost, BlogSchemaType, MediaAsset } from "./types";

type DatabasePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPost["content"];
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_focus_keyword: string | null;
  seo_canonical_url: string | null;
  seo_og_title: string | null;
  seo_og_description: string | null;
  seo_og_image: string | null;
  seo_twitter_title: string | null;
  seo_twitter_description: string | null;
  seo_twitter_image: string | null;
  seo_schema_type: BlogSchemaType | null;
  seo_no_index: boolean | null;
  author_name: string;
  author_role: string | null;
  status: BlogPost["status"];
  published_at: string | null;
  scheduled_for: string | null;
  original_published_at: string | null;
  created_at: string;
  updated_at: string;
  tech_takeaways: string[] | null;
  related_post_ids: string[] | null;
  post_categories: { categories: { name: string } | null }[] | null;
  post_tags: { tags: { name: string } | null }[] | null;
};

const select = "*, post_categories(categories(name)), post_tags(tags(name))";

function normalize(post: DatabasePost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.cover_image,
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    seoFocusKeyword: post.seo_focus_keyword,
    seoCanonicalUrl: post.seo_canonical_url,
    seoOgTitle: post.seo_og_title,
    seoOgDescription: post.seo_og_description,
    seoOgImage: post.seo_og_image,
    seoTwitterTitle: post.seo_twitter_title,
    seoTwitterDescription: post.seo_twitter_description,
    seoTwitterImage: post.seo_twitter_image,
    seoSchemaType: post.seo_schema_type || "BlogPosting",
    seoNoIndex: Boolean(post.seo_no_index),
    authorName: post.author_name,
    authorRole: post.author_role,
    status: post.status,
    publishedAt: post.published_at,
    scheduledFor: post.scheduled_for,
    originalPublishedAt: post.original_published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    categories: post.post_categories?.flatMap((item) => item.categories?.name ? [item.categories.name] : []) ?? [],
    tags: post.post_tags?.flatMap((item) => item.tags?.name ? [item.tags.name] : []) ?? [],
    techTakeaways: post.tech_takeaways ?? [],
    relatedPostIds: post.related_post_ids ?? [],
  };
}

export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  if (!isSupabaseConfigured) return samplePosts;
  const client = createPublicClient();
  const { data, error } = await client.from("posts").select(select).eq("status", "published").order("published_at", { ascending: false });
  if (error) throw new Error("Unable to load blog posts.");
  return (data as DatabasePost[]).map(normalize);
});

export const getPublishedPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!isSupabaseConfigured) return samplePosts.find((post) => post.slug === slug) ?? null;
  const client = createPublicClient();
  const { data, error } = await client.from("posts").select(select).eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw new Error("Unable to load blog post.");
  return data ? normalize(data as DatabasePost) : null;
});

export async function getAllAdminPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return samplePosts;
  const client = await createClient();
  const { data, error } = await client.from("posts").select(select).order("updated_at", { ascending: false });
  if (error) throw new Error("Unable to load blog posts.");
  return (data as DatabasePost[]).map(normalize);
}

export async function getAdminPost(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) return samplePosts.find((post) => post.id === id) ?? null;
  const client = await createClient();
  const { data, error } = await client.from("posts").select(select).eq("id", id).maybeSingle();
  if (error) throw new Error("Unable to load blog post.");
  return data ? normalize(data as DatabasePost) : null;
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  if (!isSupabaseConfigured) return [];
  const client = await createClient();
  const { data, error } = await client.from("media_assets").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((item) => ({ id: item.id, storagePath: item.storage_path, publicUrl: item.public_url, fileName: item.file_name, mimeType: item.mime_type, width: item.width, height: item.height, altText: item.alt_text, caption: item.caption, createdAt: item.created_at }));
}

export async function getDashboardViews(): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  const client = await createClient();
  const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
  const { data, error } = await client.from("article_metrics").select("views").gte("metric_date", since);
  return error ? 0 : (data ?? []).reduce((total, row) => total + Number(row.views || 0), 0);
}

export function plainText(content: BlogPost["content"]): string {
  const walk = (node: BlogPost["content"]): string => node.text ?? node.content?.map(walk).join(" ") ?? "";
  return walk(content).replace(/s+/g, " ").trim();
}

export function readingTime(content: BlogPost["content"]) {
  const words = plainText(content).split(/s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
