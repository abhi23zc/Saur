import { marked } from "marked";
import type { RichTextNode } from "@/lib/blog/types";

type Mark = { type: string; attrs?: Record<string, unknown> };
type MarkedToken = Record<string, unknown> & { type: string; raw?: string; text?: string; tokens?: MarkedToken[]; items?: MarkedToken[] };

const textNode = (text: string, marks?: Mark[]): RichTextNode => marks?.length ? { type: "text", text, marks } : { type: "text", text };
const paragraph = (content: RichTextNode[] = []): RichTextNode => ({ type: "paragraph", content: content.length ? content : [textNode("")] });
const normalizeLevel = (level: unknown) => Math.min(3, Math.max(2, Number(level || 2)));

function withMark(nodes: RichTextNode[], mark: Mark) {
  return nodes.map((node) => {
    if (node.type !== "text") return node;
    return { ...node, marks: [...(node.marks ?? []), mark] };
  });
}

function inlineTokens(tokens: MarkedToken[] = []): RichTextNode[] {
  const nodes: RichTextNode[] = [];
  for (const token of tokens) {
    if (token.type === "text") {
      if (Array.isArray(token.tokens)) nodes.push(...inlineTokens(token.tokens));
      else nodes.push(textNode(String(token.text ?? token.raw ?? "")));
    } else if (token.type === "escape") {
      nodes.push(textNode(String(token.text ?? token.raw ?? "")));
    } else if (token.type === "strong") {
      nodes.push(...withMark(inlineTokens(token.tokens), { type: "bold" }));
    } else if (token.type === "em") {
      nodes.push(...withMark(inlineTokens(token.tokens), { type: "italic" }));
    } else if (token.type === "codespan") {
      nodes.push(textNode(String(token.text ?? ""), [{ type: "code" }]));
    } else if (token.type === "link") {
      nodes.push(...withMark(inlineTokens(token.tokens), { type: "link", attrs: { href: String(token.href ?? "#") } }));
    } else if (token.type === "image") {
      nodes.push({ type: "image", attrs: { src: String(token.href ?? ""), alt: String(token.text ?? "Article illustration"), title: String(token.title ?? "") } });
    } else if (token.type === "br") {
      nodes.push({ type: "hardBreak" });
    } else if (typeof token.text === "string") {
      nodes.push(textNode(token.text));
    }
  }
  return nodes;
}

function blockTokens(tokens: MarkedToken[] = []): RichTextNode[] {
  const blocks: RichTextNode[] = [];
  for (const token of tokens) {
    if (token.type === "space") continue;
    if (token.type === "heading") {
      blocks.push({ type: "heading", attrs: { level: normalizeLevel(token.depth) }, content: inlineTokens(token.tokens) });
    } else if (token.type === "paragraph") {
      const content = inlineTokens(token.tokens);
      const images = content.filter((node) => node.type === "image");
      const nonImages = content.filter((node) => node.type !== "image" && !(node.type === "text" && !node.text?.trim()));
      if (images.length && !nonImages.length) blocks.push(...images);
      else blocks.push(paragraph(content));
    } else if (token.type === "text") {
      blocks.push(paragraph(token.tokens ? inlineTokens(token.tokens) : [textNode(String(token.text ?? ""))]));
    } else if (token.type === "list") {
      const ordered = Boolean(token.ordered);
      blocks.push({
        type: ordered ? "orderedList" : "bulletList",
        content: (token.items ?? []).map((item) => {
          const itemBlocks = blockTokens(item.tokens);
          return { type: "listItem", content: itemBlocks.length ? itemBlocks : [paragraph([textNode(String(item.text ?? ""))])] };
        }),
      });
    } else if (token.type === "blockquote") {
      blocks.push({ type: "blockquote", content: blockTokens(token.tokens) });
    } else if (token.type === "code") {
      blocks.push({ type: "codeBlock", attrs: token.lang ? { language: token.lang } : undefined, content: [textNode(String(token.text ?? ""))] });
    } else if (token.type === "hr") {
      blocks.push({ type: "horizontalRule" });
    } else if (token.type === "html") {
      const value = String(token.text ?? token.raw ?? "").replace(/<[^>]+>/g, "").trim();
      if (value) blocks.push(paragraph([textNode(value)]));
    }
  }
  return blocks;
}

export function markdownToRichText(markdown: string): RichTextNode {
  const tokens = marked.lexer(markdown, { gfm: true, breaks: false }) as MarkedToken[];
  const content = blockTokens(tokens);
  return { type: "doc", content: content.length ? content : [paragraph()] };
}

const escapeMarkdown = (value: string) => value.replace(/\\/g, "\\\\").replace(/([*_`\[\]])/g, "\\$1");

function inlineMarkdown(node: RichTextNode): string {
  if (node.type === "text") {
    let value = escapeMarkdown(node.text ?? "");
    for (const mark of node.marks ?? []) {
      if (mark.type === "code") value = "`" + (node.text ?? "") + "`";
      if (mark.type === "bold") value = "**" + value + "**";
      if (mark.type === "italic") value = "*" + value + "*";
      if (mark.type === "link") value = "[" + value + "](" + String(mark.attrs?.href ?? "#") + ")";
    }
    return value;
  }
  if (node.type === "image" && typeof node.attrs?.src === "string") {
    const alt = String(node.attrs.alt ?? "Article illustration");
    const title = typeof node.attrs.title === "string" && node.attrs.title ? " \"" + node.attrs.title + "\"" : "";
    return "![" + alt + "](" + node.attrs.src + title + ")";
  }
  if (node.type === "hardBreak") return "\n";
  return node.content?.map(inlineMarkdown).join("") ?? "";
}

function blockMarkdown(node: RichTextNode, depth = 0): string {
  const children = node.content ?? [];
  if (node.type === "doc") return children.map((child) => blockMarkdown(child, depth)).filter(Boolean).join("\n\n");
  if (node.type === "paragraph") return children.map(inlineMarkdown).join("");
  if (node.type === "heading") return "#".repeat(normalizeLevel(node.attrs?.level)) + " " + children.map(inlineMarkdown).join("");
  if (node.type === "bulletList") return children.map((child) => blockMarkdown(child, depth)).join("\n");
  if (node.type === "orderedList") return children.map((child, index) => blockMarkdown(child, depth).replace(/^[-*] /, index + 1 + ". ")).join("\n");
  if (node.type === "listItem") return children.map((child, index) => {
    const value = blockMarkdown(child, depth + 1);
    return index === 0 ? "- " + value : value.split("\n").map((line) => "  " + line).join("\n");
  }).join("\n");
  if (node.type === "blockquote") return children.map((child) => blockMarkdown(child, depth).split("\n").map((line) => "> " + line).join("\n")).join("\n>");
  if (node.type === "codeBlock") return "```\n" + (children.map((child) => child.text ?? "").join("\n")) + "\n```";
  if (node.type === "horizontalRule") return "---";
  if (node.type === "image") return inlineMarkdown(node);
  return children.map((child) => blockMarkdown(child, depth)).join("\n\n");
}

export function richTextToMarkdown(content: RichTextNode): string {
  return blockMarkdown(content).trim();
}

export function plainTextFromMarkdown(markdown: string) {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[#>*_`~\-]+/g, " ").replace(/\s+/g, " ").trim();
}
