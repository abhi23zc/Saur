"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminPost, getMediaAssets } from "@/lib/blog/data";
import { editorSchema, publicationIssues, toDatabase, toEditor, validContent, type SaveCommand } from "@/lib/blog/editor";
import type { MediaAsset, PostStatus } from "@/lib/blog/types";

export type FormState = { error?: string; saved?: boolean; id?: string; version?: number; status?: PostStatus; updatedAt?: string; fields?: Record<string, string>; asset?: MediaAsset; conflict?: boolean };
function refresh(slug?: string) {
  revalidatePath("/admin"); revalidatePath("/blog", "layout"); revalidatePath("/sitemap.xml"); revalidatePath("/api/rss.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}
const uuid = z.string().uuid();
const commandSchema = z.enum(["save", "publish", "schedule", "unpublish"]);

export async function saveArticle(formData: FormData): Promise<FormState> {
  const { client } = await requireAdmin();
  try {
    const id = uuid.parse(formData.get("id"));
    const command: SaveCommand = commandSchema.parse(formData.get("command"));
    const version = z.coerce.number().int().min(0).parse(formData.get("version"));
    const raw = String(formData.get("document") || "");
    if (raw.length > 2_000_000) return { error: "This article is too large. Please reduce embedded content." };
    const parsed = editorSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return { error: parsed.error.issues[0].message, fields: Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])) };
    const doc = parsed.data;
    if (doc.content?.type !== "doc" || !validContent(doc.content)) return { error: "The article contains unsupported formatting or an invalid link. Please review the content." };
    if (command === "publish" || command === "schedule") {
      const fields = publicationIssues(doc);
      if (Object.keys(fields).length) return { error: "A few details need attention before publishing.", fields };
    }
    const scheduledFor = String(formData.get("scheduledFor") || "");
    if (command === "schedule" && (!scheduledFor || Number.isNaN(Date.parse(scheduledFor)) || Date.parse(scheduledFor) <= Date.now())) return { error: "Choose a future publication date and time.", fields: { scheduledFor: "Choose a future date." } };
    const { data, error } = await client.rpc("save_editor_post", { p_id: id, p_document: { ...toDatabase(doc), scheduled_for: command === "schedule" ? scheduledFor : null }, p_action: command, p_expected_version: version });
    if (error) return { error: error.code === "23505" ? "That article URL is already in use. Choose another URL." : ["40001", "PT409"].includes(error.code) ? "Another tab saved this article. Reload to review those changes; your work is still shown here." : error.message.includes("save_editor_post") ? "The blogging database upgrade is required. Ask your administrator to run the latest migration." : error.message, conflict: ["40001", "PT409"].includes(error.code) };
    const result = data as { id: string; version: number; status: PostStatus; updatedAt: string };
    // Private saves must not refresh the editor and interrupt ongoing writing.
    if (command !== "save") refresh(doc.slug);
    return { saved: true, ...result };
  } catch (error) {
    return { error: error instanceof z.ZodError ? "The save request was invalid. Reload and try again." : "Unable to save. Your work is still in the editor; please try again." };
  }
}

export async function restoreRevision(postId: string, revisionId: string, version: number): Promise<FormState> {
  const { client } = await requireAdmin();
  if (!uuid.safeParse(postId).success || !uuid.safeParse(revisionId).success) return { error: "Invalid revision." };
  const post = await getAdminPost(postId);
  const { data, error } = await client.from("post_revisions").select("snapshot").eq("id", revisionId).eq("post_id", postId).maybeSingle();
  if (!post || error || !data) return { error: "Revision not found." };
  const snapshot = data.snapshot as Record<string, unknown>;
  const merged = { ...toDatabase(toEditor(post)), ...snapshot };
  // Old snapshots used joined taxonomy rows rather than plain name arrays.
  if (!Array.isArray(snapshot.categories)) merged.categories = post.categories;
  if (!Array.isArray(snapshot.tags)) merged.tags = post.tags;
  if (post.originalPublishedAt) merged.slug = post.slug;
  const result = await client.rpc("save_editor_post", { p_id: postId, p_document: merged, p_action: "save", p_expected_version: version });
  if (result.error) return { error: result.error.message };
  refresh(post.slug);
  return { saved: true, ...result.data };
}

export async function bulkPostAction(ids: string[], action: "publish" | "unpublish" | "delete" | "restore"): Promise<FormState> {
  const { client } = await requireAdmin();
  if (!["publish", "unpublish", "delete", "restore"].includes(action)) return { error: "Invalid article action." };
  const clean = [...new Set(ids.filter((id) => uuid.safeParse(id).success))].slice(0, 100);
  if (!clean.length) return { error: "Select at least one article." };
  // Publishing requires the editor's validation and explicit publication action.
  if (action === "publish") return { error: "Open each article to review and publish it." };
  for (const id of clean) {
    const post = await getAdminPost(id);
    if (!post) return { error: "An article was not found. Refresh the dashboard." };
    if (action === "unpublish") {
      const result = await client.rpc("save_editor_post", { p_id: id, p_document: toDatabase(toEditor(post)), p_action: "unpublish", p_expected_version: post.draftVersion || 0 });
      if (result.error) return { error: result.error.message };
    } else {
      const { error } = await client.from("posts").update(action === "delete" ? { deleted_at: new Date().toISOString(), status: "draft", scheduled_for: null } : { deleted_at: null, status: "draft" }).eq("id", id);
      if (error) return { error: "Could not update this article. Please refresh and retry." };
    }
    refresh(post.slug);
  }
  return { saved: true };
}

export async function duplicatePost(postId: string): Promise<FormState> {
  await requireAdmin();
  if (!uuid.safeParse(postId).success) return { error: "Invalid article." };
  const post = await getAdminPost(postId);
  if (!post || post.deletedAt) return { error: "Article not found." };
  const doc = toEditor(post);
  const id = crypto.randomUUID();
  doc.title = `${doc.title.slice(0, 150)} (Copy)`;
  doc.slug = `${doc.slug.slice(0, 135)}-copy-${id.slice(0, 8)}`;
  doc.seoCanonicalUrl = "";
  const form = new FormData();
  form.set("id", id); form.set("version", "0"); form.set("command", "save"); form.set("document", JSON.stringify(doc));
  return saveArticle(form);
}

export async function uploadMedia(_: FormState, formData: FormData): Promise<FormState> {
  const { client, user } = await requireAdmin();
  const file = formData.get("file");
  const altText = String(formData.get("altText") || "").trim().slice(0, 500);
  const caption = String(formData.get("caption") || "").trim().slice(0, 500);
  const formats: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };
  if (!(file instanceof File) || !file.size || !formats[file.type] || file.size > 5 * 1024 * 1024) return { error: "Choose a JPG, PNG, WebP, GIF or AVIF image smaller than 5 MB." };
  if (!altText) return { error: "Describe the image for readers using assistive technology." };
  const path = `${user.id}/${crypto.randomUUID()}.${formats[file.type]}`;
  const { error } = await client.storage.from("blog-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: "Image upload failed. Please try again." };
  const { data: url } = client.storage.from("blog-media").getPublicUrl(path);
  const { data, error: insertError } = await client.from("media_assets").insert({ storage_path: path, public_url: url.publicUrl, file_name: file.name, mime_type: file.type, alt_text: altText, caption: caption || null, uploaded_by: user.id }).select("*").single();
  if (insertError) { await client.storage.from("blog-media").remove([path]); return { error: "Could not save image details. Please try again." }; }
  const asset: MediaAsset = { id: data.id, storagePath: data.storage_path, publicUrl: data.public_url, fileName: data.file_name, mimeType: data.mime_type, width: data.width, height: data.height, altText: data.alt_text, caption: data.caption, createdAt: data.created_at };
  // Media pages are dynamic; keep the open library and unsaved editor state intact.
  return { saved: true, asset };
}

export async function updateMedia(assetId: string, altText: string, caption: string): Promise<FormState> {
  const { client } = await requireAdmin();
  if (!uuid.safeParse(assetId).success || !altText.trim()) return { error: "Add a description for this image." };
  const { error } = await client.from("media_assets").update({ alt_text: altText.trim().slice(0, 500), caption: caption.trim().slice(0, 500) }).eq("id", assetId);
  // Media pages are dynamic; keep the open library and unsaved editor state intact.
  return error ? { error: "Unable to update image details." } : { saved: true };
}

export async function deleteMedia(assetId: string): Promise<FormState> {
  const { client } = await requireAdmin();
  if (!uuid.safeParse(assetId).success) return { error: "Invalid image." };
  const { data, error } = await client.from("media_assets").select("storage_path, public_url").eq("id", assetId).maybeSingle();
  if (error || !data) return { error: "Image not found." };
  const [posts, drafts, revisions] = await Promise.all([client.from("posts").select("cover_image,content,seo_og_image,seo_twitter_image"), client.from("post_drafts").select("document"), client.from("post_revisions").select("snapshot")]);
  if (posts.error || drafts.error || revisions.error) return { error: "Could not verify image usage. Please retry." };
  if ([posts.data, drafts.data, revisions.data].some((rows) => JSON.stringify(rows).includes(data.public_url))) return { error: "This image is used by an article, draft or revision and cannot be deleted." };
  const removed = await client.storage.from("blog-media").remove([data.storage_path]);
  if (removed.error) return { error: "Could not remove the image file." };
  const deleted = await client.from("media_assets").delete().eq("id", assetId);
  // Media pages are dynamic; keep the open library and unsaved editor state intact.
  return deleted.error ? { error: "File removed, but image details could not be removed. Please retry." } : { saved: true };
}

export async function listMedia() { await requireAdmin(); return getMediaAssets(); }

export async function getRevisions(postId: string): Promise<{ revisions: { id: string; created_at: string }[]; error?: string }> {
  const { client } = await requireAdmin();
  if (!uuid.safeParse(postId).success) return { revisions: [] };
  const { data, error } = await client.from("post_revisions").select("id,created_at").eq("post_id", postId).order("created_at", { ascending: false }).limit(30);
  return error ? { revisions: [], error: "Unable to load version history." } : { revisions: data || [] };
}
