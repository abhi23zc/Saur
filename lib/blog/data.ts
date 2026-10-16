import "server-only";

import { cache } from "react";
import { isSupabaseConfigured, createClient, createPublicClient } from "@/lib/supabase/server";
import { toDatabase, toEditor } from "./editor";
import { samplePosts } from "./sample-posts";
import type { BlogPost, BlogSchemaType, MediaAsset } from "./types";

type DatabasePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPost["content"];
  cover_image: string | null;
  cover_alt?: string;
  cover_caption?: string;
  deleted_at?: string | null;
  post_drafts?: { document: Record<string, unknown>; version: number; updated_at: string } | { document: Record<string, unknown>; version: number; updated_at: string }[] | null;
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
    coverAlt: post.cover_alt || "",
    coverCaption: post.cover_caption || "",
    deletedAt: post.deleted_at,
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
  const { data, error } = await client.from("posts").select(select).eq("status", "published").is("deleted_at", null).order("published_at", { ascending: false });
  if (error) throw new Error("Unable to load blog posts.");
  return (data as unknown as DatabasePost[]).map(normalize);
});

export const getPublishedPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!isSupabaseConfigured) return samplePosts.find((post) => post.slug === slug) ?? null;
  const client = createPublicClient();
  const { data, error } = await client.from("posts").select(select).eq("slug", slug).eq("status", "published").is("deleted_at", null).maybeSingle();
  if (error) throw new Error("Unable to load blog post.");
  return data ? normalize(data as unknown as DatabasePost) : null;
});

function normalizeAdmin(post: DatabasePost): BlogPost {
  const live = normalize(post);
  const draft = Array.isArray(post.post_drafts) ? post.post_drafts[0] : post.post_drafts;
  if (!draft) return { ...live, draftVersion: 0 };
  const doc = draft.document;
  const categories = Array.isArray(doc.categories) ? doc.categories as string[] : live.categories;
  const tags = Array.isArray(doc.tags) ? doc.tags as string[] : live.tags;
  const updated = normalize({ ...post, ...doc, post_categories: categories.map((name) => ({ categories: { name } })), post_tags: tags.map((name) => ({ tags: { name } })) } as DatabasePost);
  const base = toDatabase(toEditor(live));
  const changed = Object.entries(base).some(([key, value]) => JSON.stringify(value) !== JSON.stringify(doc[key]));
  return { ...updated, status: live.status, slug: live.originalPublishedAt ? live.slug : updated.slug, publishedAt: live.publishedAt, originalPublishedAt: live.originalPublishedAt, scheduledFor: live.scheduledFor, deletedAt: live.deletedAt, updatedAt: draft.updated_at, draftVersion: draft.version, hasUnpublishedChanges: live.status !== "draft" && changed };
}

export async function getAllAdminPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return samplePosts;
  const client = await createClient();
  const { data, error } = await client.from("posts").select(select + ", post_drafts(document,version,updated_at)").order("updated_at", { ascending: false });
  if (error) throw new Error("Unable to load blog posts.");
  return (data as unknown as DatabasePost[]).map(normalizeAdmin);
}

export async function getAdminPost(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) return samplePosts.find((post) => post.id === id) ?? null;
  const client = await createClient();
  const { data, error } = await client.from("posts").select(select + ", post_drafts(document,version,updated_at)").eq("id", id).maybeSingle();
  if (error) throw new Error("Unable to load blog post.");
  return data ? normalizeAdmin(data as unknown as DatabasePost) : null;
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

export { plainText, readingTime } from "./presentation";

export async function getBlogIndex(query: string, category: string, page: number, pageSize = 6) {
  if (!isSupabaseConfigured) {
    const posts = samplePosts.filter((post) => (!category || post.categories.includes(category)) && (!query || `${post.title} ${post.excerpt} ${post.authorName} ${post.categories.join(" ")} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())));
    return { posts: posts.slice((page - 1) * pageSize, page * pageSize), count: posts.length, categories: [...new Set(samplePosts.flatMap((post) => post.categories))].sort() };
  }
  const { data, error } = await createPublicClient().rpc("blog_index", { p_query: query, p_category: category, p_page: page, p_page_size: pageSize });
  if (error) throw new Error("Unable to load engineering insights. Please try again.");
  const result = data as { posts: DatabasePost[]; count: number; categories: string[] };
  return { posts: result.posts.map(normalize), count: result.count, categories: result.categories };
}
