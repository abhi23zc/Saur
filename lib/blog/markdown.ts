import { marked } from "marked";
import type { RichTextNode } from "./types";

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
    } else if (token.type === "del") {
      nodes.push(...withMark(inlineTokens(token.tokens), { type: "strike" }));
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
      else if (images.length) {
        let run: RichTextNode[] = [];
        for (const node of content) {
          if (node.type === "image") { if (run.length) blocks.push(paragraph(run)); run = []; blocks.push(node); }
          else run.push(node);
        }
        if (run.length) blocks.push(paragraph(run));
      } else blocks.push(paragraph(content));
    } else if (token.type === "text") {
      blocks.push(paragraph(token.tokens ? inlineTokens(token.tokens) : [textNode(String(token.text ?? ""))]));
    } else if (token.type === "list") {
      const ordered = Boolean(token.ordered);
      blocks.push({
        type: ordered ? "orderedList" : "bulletList",
        ...(ordered ? { attrs: { start: Number(token.start) || 1 } } : {}),
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
    } else if (token.type === "table") {
      const header = token.header as { tokens: MarkedToken[] }[];
      const rows = token.rows as { tokens: MarkedToken[] }[][];
      const row = (cells: { tokens: MarkedToken[] }[], type: string): RichTextNode => ({ type: "tableRow", content: cells.map((cell) => ({ type, attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [paragraph(inlineTokens(cell.tokens))] })) });
      blocks.push({ type: "table", content: [row(header, "tableHeader"), ...rows.map((cells) => row(cells, "tableCell"))] });
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

function inlineMarkdown(node?: RichTextNode): string {
  if (!node) return "";
  if (node.type === "hardBreak") return "\n";
  if (node.type === "image") {
    const alt = String(node.attrs?.alt ?? "Article illustration");
    const src = String(node.attrs?.src ?? "");
    const title = node.attrs?.title ? ` "${node.attrs.title}"` : "";
    return `![${alt}](${src}${title})`;
  }
  let text = node.text ?? (node.content?.map(inlineMarkdown).join("") ?? "");
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") text = `**${text}**`;
    if (mark.type === "italic") text = `*${text}*`;
    if (mark.type === "strike") text = `~~${text}~~`;
    if (mark.type === "code") text = `\`${text}\``;
    if (mark.type === "link") text = `[${text}](${String(mark.attrs?.href ?? "#")})`;
  }
  return text;
}

export function richTextToMarkdown(node?: RichTextNode): string {
  if (!node) return "";
  if (node.type === "doc") return (node.content ?? []).map(richTextToMarkdown).join("\n\n").trim();
  if (node.type === "paragraph") return (node.content ?? []).map(inlineMarkdown).join("");
  if (node.type === "heading") {
    const level = Math.min(3, Math.max(2, Number(node.attrs?.level || 2)));
    return `${"#".repeat(level)} ${(node.content ?? []).map(inlineMarkdown).join("")}`;
  }
  if (node.type === "bulletList") return (node.content ?? []).map((item) => `- ${(item.content ?? []).map(inlineMarkdown).join(" ")}`).join("\n");
  if (node.type === "orderedList") return (node.content ?? []).map((item, index) => `${index + 1}. ${(item.content ?? []).map(inlineMarkdown).join(" ")}`).join("\n");
  if (node.type === "blockquote") return (node.content ?? []).map(richTextToMarkdown).join("\n\n").split("\n").map((line) => `> ${line}`).join("\n");
  if (node.type === "codeBlock") return `\`\`\`${String(node.attrs?.language ?? "")}\n${(node.content ?? []).map((child) => child.text ?? "").join("")}\n\`\`\``;
  if (node.type === "horizontalRule") return "---";
  if (node.type === "image") return inlineMarkdown(node);
  if (node.type === "table") {
    const rows = (node.content ?? []).map((row) => (row.content ?? []).map((cell) => (cell.content ?? []).map(inlineMarkdown).join(" ").replace(/\|/g, "\\|").trim()));
    if (!rows.length) return "";
    const [header, ...body] = rows;
    const divider = header.map(() => "---");
    return [`| ${header.join(" | ")} |`, `| ${divider.join(" | ")} |`, ...body.map((row) => `| ${row.join(" | ")} |`)].join("\n");
  }
  return (node.content ?? []).map(richTextToMarkdown).join("\n\n");
}
