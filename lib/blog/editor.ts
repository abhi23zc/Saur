import { z } from "zod";
import type { BlogPost, RichTextNode } from "./types";
import { plainText } from "./presentation";

export const emptyDocument: RichTextNode = { type: "doc", content: [{ type: "paragraph" }] };
export const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const names = (value: string) => [...new Set(value.split(",").map((part) => part.trim()).filter(Boolean))];
export const lines = (value: string) => [...new Set(value.split(/\r?\n/).map((part) => part.trim()).filter(Boolean))];
const url = z.string().trim().max(2000).refine((value) => !value || /^https?:\/\/[^\s]+$/i.test(value) || /^\/(?!\/)/.test(value), "Use an https:// URL or a site image path.");
const externalUrl = z.string().trim().max(2000).refine((value) => !value || /^https?:\/\/[^\s]+$/i.test(value), "Use a complete https:// URL.");
export const editorSchema = z.object({
  title: z.string().trim().max(160), slug: z.string().trim().max(180).regex(/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens for the URL."), excerpt: z.string().trim().max(320),
  content: z.custom<RichTextNode>(), coverImage: url, coverAlt: z.string().trim().max(500), coverCaption: z.string().trim().max(500),
  categories: z.array(z.string().trim().min(1).max(100)).max(8), tags: z.array(z.string().trim().min(1).max(100)).max(8, "Use up to eight tags."), authorName: z.string().trim().max(120), authorRole: z.string().trim().max(160),
  techTakeaways: z.array(z.string().trim().max(500)).max(8, "Use up to eight key takeaways."), relatedPostIds: z.array(z.string().uuid()).max(6),
  seoTitle: z.string().trim().max(160), seoDescription: z.string().trim().max(320), seoFocusKeyword: z.string().trim().max(100), seoCanonicalUrl: externalUrl,
  seoOgTitle: z.string().trim().max(160), seoOgDescription: z.string().trim().max(320), seoOgImage: url,
  seoTwitterTitle: z.string().trim().max(160), seoTwitterDescription: z.string().trim().max(320), seoTwitterImage: url,
  seoSchemaType: z.enum(["Article", "BlogPosting", "NewsArticle"]), seoNoIndex: z.boolean(),
});
export type EditorDocument = z.infer<typeof editorSchema>;
export type SaveCommand = "save" | "publish" | "schedule" | "unpublish";

const allowedNodes = new Set(["doc", "paragraph", "text", "heading", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock", "horizontalRule", "image", "hardBreak", "table", "tableRow", "tableCell", "tableHeader"]);
export function validContent(node: unknown, depth = 0, count = { value: 0 }): node is RichTextNode {
  if (!node || typeof node !== "object" || depth > 40 || ++count.value > 20000) return false;
  const n = node as RichTextNode;
  if (!allowedNodes.has(n.type) || (n.text !== undefined && typeof n.text !== "string")) return false;
  if (n.type === "heading" && ![2, 3, 4].includes(Number(n.attrs?.level))) return false;
  if (n.type === "image" && (!url.safeParse(n.attrs?.src).success || !n.attrs?.src)) return false;
  if (n.marks && (!Array.isArray(n.marks) || n.marks.some((mark) => !["bold", "italic", "strike", "code", "link", "underline"].includes(mark.type) || (mark.type === "link" && !/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(String(mark.attrs?.href || "")))))) return false;
  return n.content === undefined || (Array.isArray(n.content) && n.content.every((child) => validContent(child, depth + 1, count)));
}
export function publicationIssues(doc: EditorDocument): Record<string, string> {
  const errors: Record<string, string> = {};
  if (doc.title.length < 8) errors.title = "Add a title of at least 8 characters.";
  if (!doc.slug) errors.slug = "Add an article URL.";
  if (doc.excerpt.length < 30) errors.excerpt = "Add a useful summary of at least 30 characters.";
  if (!doc.authorName) errors.authorName = "Add the author's name.";
  if (!doc.categories.length) errors.categories = "Choose at least one topic.";
  if (!plainText(doc.content).trim()) errors.content = "Write the article before publishing.";
  if (doc.coverImage && !doc.coverAlt) errors.coverAlt = "Describe the cover image for readers using assistive technology.";
  function walk(n: RichTextNode) {
    if (n.type === "image" && !String(n.attrs?.alt || "").trim()) errors.content = "Add alternative text to every article image.";
    n.content?.forEach(walk);
  }
  walk(doc.content);
  return errors;
}
export function toEditor(post?: BlogPost): EditorDocument {
  return { title: post?.title || "", slug: post?.slug || "", excerpt: post?.excerpt || "", content: post?.content || emptyDocument, coverImage: post?.coverImage || "", coverAlt: post?.coverAlt || "", coverCaption: post?.coverCaption || "", categories: post?.categories || [], tags: post?.tags || [], authorName: post?.authorName || "Saur Engineering Team", authorRole: post?.authorRole || "", techTakeaways: post?.techTakeaways || [], relatedPostIds: post?.relatedPostIds || [], seoTitle: post?.seoTitle || "", seoDescription: post?.seoDescription || "", seoFocusKeyword: post?.seoFocusKeyword || "", seoCanonicalUrl: post?.seoCanonicalUrl || "", seoOgTitle: post?.seoOgTitle || "", seoOgDescription: post?.seoOgDescription || "", seoOgImage: post?.seoOgImage || "", seoTwitterTitle: post?.seoTwitterTitle || "", seoTwitterDescription: post?.seoTwitterDescription || "", seoTwitterImage: post?.seoTwitterImage || "", seoSchemaType: post?.seoSchemaType || "BlogPosting", seoNoIndex: post?.seoNoIndex || false };
}
export function toDatabase(doc: EditorDocument) {
  return { title: doc.title || "Untitled article", slug: doc.slug, excerpt: doc.excerpt, content: doc.content, cover_image: doc.coverImage || null, cover_alt: doc.coverAlt, cover_caption: doc.coverCaption, categories: doc.categories, tags: doc.tags, author_name: doc.authorName || "Saur Engineering Team", author_role: doc.authorRole || null, tech_takeaways: doc.techTakeaways, related_post_ids: doc.relatedPostIds, seo_title: doc.seoTitle || null, seo_description: doc.seoDescription || null, seo_focus_keyword: doc.seoFocusKeyword || null, seo_canonical_url: doc.seoCanonicalUrl || null, seo_og_title: doc.seoOgTitle || null, seo_og_description: doc.seoOgDescription || null, seo_og_image: doc.seoOgImage || null, seo_twitter_title: doc.seoTwitterTitle || null, seo_twitter_description: doc.seoTwitterDescription || null, seo_twitter_image: doc.seoTwitterImage || null, seo_schema_type: doc.seoSchemaType, seo_no_index: doc.seoNoIndex };
}
export function toLocalDateTime(iso?: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
