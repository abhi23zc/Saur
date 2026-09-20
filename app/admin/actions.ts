"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/admin";
import type { BlogSchemaType } from "@/lib/blog/types";

export type FormState = { error?: string; saved?: boolean; id?: string };

const optionalUuid = z.preprocess((value) => value === "" ? undefined : value, z.string().uuid().optional());
const schemaType = z.enum(["Article", "BlogPosting", "NewsArticle"]);
const postSchema = z.object({
  id: optionalUuid,
  title: z.string().trim().min(8).max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  excerpt: z.string().trim().min(30).max(320),
  content: z.string().min(2),
  coverImage: z.string().trim().max(1000).optional(),
  categories: z.string(),
  tags: z.string(),
  authorName: z.string().trim().max(120).optional(),
  authorRole: z.string().trim().max(160).optional(),
  techTakeaways: z.string().max(2000).optional(),
  relatedPostIds: z.string().max(4000).optional(),
  seoTitle: z.string().trim().max(160).optional(),
  seoDescription: z.string().trim().max(320).optional(),
  seoFocusKeyword: z.string().trim().max(100).optional(),
  seoCanonicalUrl: z.string().trim().max(500).optional(),
  seoOgTitle: z.string().trim().max(160).optional(),
  seoOgDescription: z.string().trim().max(320).optional(),
  seoOgImage: z.string().trim().max(1000).optional(),
  seoTwitterTitle: z.string().trim().max(160).optional(),
  seoTwitterDescription: z.string().trim().max(320).optional(),
  seoTwitterImage: z.string().trim().max(1000).optional(),
  seoSchemaType: schemaType.default("BlogPosting"),
  seoNoIndex: z.preprocess((value) => value === "on" || value === "true", z.boolean()).default(false),
  intent: z.enum(["draft", "scheduled", "published"]),
  scheduledFor: z.string().optional(),
});

const parseNames = (value: string) => [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))].slice(0, 8);
const parseLines = (value = "") => [...new Set(value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean))].slice(0, 8);
const parseIds = (value = "") => [...new Set(value.split(",").map((item) => item.trim()).filter((id) => z.string().uuid().safeParse(id).success))].slice(0, 6);
const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type AdminClient = Awaited<ReturnType<typeof requireAdmin>>["client"];

async function syncTaxonomy(client: AdminClient, postId: string, categoriesValue: string, tagsValue: string) {
  for (const [table, join, value] of [["categories", "post_categories", categoriesValue], ["tags", "post_tags", tagsValue]] as const) {
    await client.from(join).delete().eq("post_id", postId);
    const ids: string[] = [];
    for (const name of parseNames(value)) {
      const { data } = await client.from(table).upsert({ name, slug: slugify(name) }, { onConflict: "slug" }).select("id").single();
      if (data) ids.push(data.id);
    }
    if (ids.length) await client.from(join).insert(ids.map((id) => ({ post_id: postId, [table === "categories" ? "category_id" : "tag_id"]: id })));
  }
}

function publicPaths(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath("/blog/" + slug);
}

async function save(formData: FormData, shouldRedirect: boolean): Promise<FormState> {
  let savedId = "";
  try {
    const input = postSchema.parse(Object.fromEntries(formData.entries()));
    const { client, user } = await requireAdmin();
    let content: unknown;
    try {
      content = JSON.parse(input.content);
    } catch {
      return { error: "Article content is invalid." };
    }

    if (input.intent === "scheduled" && (!input.scheduledFor || Number.isNaN(new Date(input.scheduledFor).valueOf()) || new Date(input.scheduledFor) <= new Date())) {
      return { error: "Choose a future date and time for this scheduled post." };
    }

    const canonical = input.seoCanonicalUrl?.trim();
    if (canonical && !/^https?:\/\//i.test(canonical)) return { error: "Canonical URL must start with http:// or https://." };

    const scheduledFor = input.intent === "scheduled" ? new Date(input.scheduledFor!).toISOString() : null;
    const existing = input.id ? await client.from("posts").select("*").eq("id", input.id).maybeSingle() : null;
    if (existing?.data) await client.from("post_revisions").insert({ post_id: input.id, snapshot: existing.data, created_by: user.id });

    const now = new Date().toISOString();
    const publishNow = input.intent === "published";
    const payload = {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content,
      cover_image: input.coverImage || null,
      author_name: input.authorName || user.user_metadata.full_name || user.email || "Saur Engineering Team",
      author_role: input.authorRole || null,
      tech_takeaways: parseLines(input.techTakeaways),
      related_post_ids: parseIds(input.relatedPostIds).filter((id) => id !== input.id),
      seo_title: input.seoTitle || null,
      seo_description: input.seoDescription || null,
      seo_focus_keyword: input.seoFocusKeyword || null,
      seo_canonical_url: canonical || null,
      seo_og_title: input.seoOgTitle || null,
      seo_og_description: input.seoOgDescription || null,
      seo_og_image: input.seoOgImage || null,
      seo_twitter_title: input.seoTwitterTitle || null,
      seo_twitter_description: input.seoTwitterDescription || null,
      seo_twitter_image: input.seoTwitterImage || null,
      seo_schema_type: input.seoSchemaType as BlogSchemaType,
      seo_no_index: input.seoNoIndex,
      status: input.intent,
      scheduled_for: scheduledFor,
      published_at: publishNow ? (existing?.data?.published_at || now) : null,
      original_published_at: publishNow ? (existing?.data?.original_published_at || now) : existing?.data?.original_published_at || null,
      published_by: publishNow ? user.id : existing?.data?.published_by || null,
      updated_at: now,
    };

    const result = input.id ? await client.from("posts").update(payload).eq("id", input.id).select("id").single() : await client.from("posts").insert(payload).select("id").single();
    if (result.error || !result.data) return { error: result.error?.code === "23505" ? "That URL slug is already in use." : "Could not save the article." };
    savedId = result.data.id;
    await syncTaxonomy(client, savedId, input.categories, input.tags);
    publicPaths(input.slug);
  } catch (error) {
    if (error instanceof z.ZodError) return { error: error.issues[0]?.message || "Please check the article fields." };
    return { error: "Could not save the article. Please try again." };
  }

  if (shouldRedirect) revalidatePath("/admin");
  return { saved: true, id: savedId };
}

export async function savePost(_: FormState, formData: FormData): Promise<FormState> {
  return save(formData, true);
}

export async function autosavePost(formData: FormData): Promise<FormState> {
  return save(formData, false);
}

export async function bulkPostAction(ids: string[], action: "publish" | "unpublish" | "delete") {
  const { client, user } = await requireAdmin();
  const clean = ids.filter((id) => z.string().uuid().safeParse(id).success);
  if (!clean.length) return;
  if (action === "delete") {
    await client.from("posts").delete().in("id", clean);
  } else if (action === "publish") {
    const now = new Date().toISOString();
    await client.from("posts").update({ status: "published", published_at: now, original_published_at: now, published_by: user.id, scheduled_for: null, updated_at: now }).in("id", clean);
  } else {
    await client.from("posts").update({ status: "draft", scheduled_for: null, updated_at: new Date().toISOString() }).in("id", clean);
  }
  publicPaths();
}

export async function duplicatePost(postId: string): Promise<FormState> {
  const { client, user } = await requireAdmin();
  if (!z.string().uuid().safeParse(postId).success) return { error: "Invalid article." };
  const { data, error } = await client.from("posts").select("*, post_categories(categories(name)), post_tags(tags(name))").eq("id", postId).maybeSingle();
  if (error || !data) return { error: "Original article not found." };

  const newSlug = data.slug + "-copy-" + Date.now().toString(36);
  const now = new Date().toISOString();
  const { data: created, error: insertError } = await client.from("posts").insert({
    title: data.title + " (Copy)",
    slug: newSlug,
    excerpt: data.excerpt,
    content: data.content,
    cover_image: data.cover_image,
    seo_title: data.seo_title,
    seo_description: data.seo_description,
    seo_focus_keyword: data.seo_focus_keyword,
    seo_canonical_url: null,
    seo_og_title: data.seo_og_title,
    seo_og_description: data.seo_og_description,
    seo_og_image: data.seo_og_image,
    seo_twitter_title: data.seo_twitter_title,
    seo_twitter_description: data.seo_twitter_description,
    seo_twitter_image: data.seo_twitter_image,
    seo_schema_type: data.seo_schema_type || "BlogPosting",
    seo_no_index: true,
    author_name: data.author_name || user.email || "Saur Engineering Team",
    author_role: data.author_role,
    tech_takeaways: data.tech_takeaways || [],
    related_post_ids: data.related_post_ids || [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
    original_published_at: null,
    published_by: null,
    created_at: now,
    updated_at: now,
  }).select("id").single();
  if (insertError || !created) return { error: "Could not duplicate the article." };

  const categories = (data.post_categories ?? []).flatMap((item: { categories?: { name?: string } | null }) => item.categories?.name ? [item.categories.name] : []);
  const tags = (data.post_tags ?? []).flatMap((item: { tags?: { name?: string } | null }) => item.tags?.name ? [item.tags.name] : []);
  await syncTaxonomy(client, created.id, categories.join(", "), tags.join(", "));
  publicPaths(newSlug);
  return { saved: true, id: created.id };
}

export async function restoreRevision(postId: string, revisionId: string) {
  const { client } = await requireAdmin();
  const { data } = await client.from("post_revisions").select("snapshot").eq("id", revisionId).eq("post_id", postId).maybeSingle();
  if (!data?.snapshot) throw new Error("Revision not found.");
  const snapshot = data.snapshot as Record<string, unknown>;
  await client.from("posts").update({
    title: snapshot.title,
    slug: snapshot.slug,
    excerpt: snapshot.excerpt,
    content: snapshot.content,
    cover_image: snapshot.cover_image,
    seo_title: snapshot.seo_title,
    seo_description: snapshot.seo_description,
    seo_focus_keyword: snapshot.seo_focus_keyword,
    seo_canonical_url: snapshot.seo_canonical_url,
    seo_og_title: snapshot.seo_og_title,
    seo_og_description: snapshot.seo_og_description,
    seo_og_image: snapshot.seo_og_image,
    seo_twitter_title: snapshot.seo_twitter_title,
    seo_twitter_description: snapshot.seo_twitter_description,
    seo_twitter_image: snapshot.seo_twitter_image,
    seo_schema_type: snapshot.seo_schema_type || "BlogPosting",
    seo_no_index: Boolean(snapshot.seo_no_index),
    author_name: snapshot.author_name,
    author_role: snapshot.author_role,
    tech_takeaways: snapshot.tech_takeaways || [],
    related_post_ids: snapshot.related_post_ids || [],
    status: "draft",
    scheduled_for: null,
    updated_at: new Date().toISOString(),
  }).eq("id", postId);
  revalidatePath("/admin/posts/" + postId);
  publicPaths(String(snapshot.slug || ""));
}

export async function uploadMedia(_: FormState, formData: FormData): Promise<FormState> {
  const { client, user } = await requireAdmin();
  const file = formData.get("file");
  const altText = String(formData.get("altText") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  if (!(file instanceof File) || !file.size || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return { error: "Upload an image smaller than 5 MB." };
  if (!altText) return { error: "Alt text is required for every image." };
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = user.id + "/" + crypto.randomUUID() + "." + extension;
  const { error } = await client.storage.from("blog-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: "Media upload failed." };
  const { data: url } = client.storage.from("blog-media").getPublicUrl(path);
  const { data, error: insertError } = await client.from("media_assets").insert({ storage_path: path, public_url: url.publicUrl, file_name: file.name, mime_type: file.type, alt_text: altText, caption: caption || null, uploaded_by: user.id }).select("id").single();
  return insertError ? { error: "Image uploaded but could not be catalogued." } : { saved: true, id: data.id };
}

export async function deleteMedia(assetId: string) {
  const { client } = await requireAdmin();
  const { data } = await client.from("media_assets").select("storage_path, public_url").eq("id", assetId).maybeSingle();
  if (!data) return;
  const { data: posts } = await client.from("posts").select("id, cover_image, content");
  const inUse = (posts ?? []).some((post) => post.cover_image === data.public_url || JSON.stringify(post.content).includes(data.public_url));
  if (inUse) throw new Error("This image is in use by an article and cannot be deleted.");
  await client.storage.from("blog-media").remove([data.storage_path]);
  await client.from("media_assets").delete().eq("id", assetId);
}
