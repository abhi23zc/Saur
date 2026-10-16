import type { BlogPost, RichTextNode } from "./types";

export function plainText(node: RichTextNode): string {
  return (node.text ?? node.content?.map(plainText).join(" ") ?? "").replace(/\s+/g, " ").trim();
}

export function readingTime(content: RichTextNode): number {
  return Math.max(1, Math.ceil(plainText(content).split(/\s+/).filter(Boolean).length / 220));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
}

// The same traversal is used by the renderer and contents navigation.
export function articleHeadings(content: RichTextNode) {
  const counts = new Map<string, number>();
  const result: { id: string; text: string; level: number }[] = [];
  function visit(node: RichTextNode) {
    if (node.type === "heading") {
      const text = plainText(node);
      const base = headingId(text);
      const count = (counts.get(base) ?? 0) + 1;
      counts.set(base, count);
      result.push({ id: count === 1 ? base : `${base}-${count}`, text, level: Math.min(4, Math.max(2, Number(node.attrs?.level) || 2)) });
    }
    node.content?.forEach(visit);
  }
  visit(content);
  return result;
}

export function articleUrl(post: BlogPost) {
  return `/blog/${post.slug}`;
}
