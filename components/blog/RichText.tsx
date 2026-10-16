import Image from "next/image";
import type { RichTextNode } from "@/lib/blog/types";

import { articleHeadings } from "@/lib/blog/presentation";
export { headingId } from "@/lib/blog/presentation";

function safeHref(value: unknown) {
  const href = String(value ?? "#").trim();
  return /^(https?:|mailto:|tel:|\/|#)/i.test(href) && !href.startsWith("//") ? href : "#";
}

function textWithMarks(node: RichTextNode, key: string) {
  let value: React.ReactNode = node.text ?? "";
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") value = <strong key={`${key}-bold`} className="font-bold text-slate-900">{value}</strong>;
    if (mark.type === "strike") value = <s key={`${key}-strike`}>{value}</s>;
    if (mark.type === "underline") value = <u key={`${key}-underline`}>{value}</u>;
    if (mark.type === "italic") value = <em key={`${key}-italic`} className="italic">{value}</em>;
    if (mark.type === "code") {
      value = (
        <code key={`${key}-code`} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] text-[#0b233a] border border-slate-200/80">
          {value}
        </code>
      );
    }
    if (mark.type === "link") {
      value = (
        <a
          key={`${key}-link`}
          href={safeHref(mark.attrs?.href)}
          target={String(mark.attrs?.href ?? "").startsWith("http") ? "_blank" : undefined}
          rel={String(mark.attrs?.href ?? "").startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-semibold text-[#e67c00] hover:text-[#0b233a] underline underline-offset-4 transition-colors"
        >
          {value}
        </a>
      );
    }
  }
  return value;
}

function renderNode(node: RichTextNode, key: string, headingIds: string[], cursor: { index: number }): React.ReactNode {
  if (node.type === "text") return textWithMarks(node, key);
  const children = node.content?.map((child, index) => renderNode(child, `${key}-${index}`, headingIds, cursor));

  if (node.type === "doc") return children;

  if (node.type === "paragraph") {
    return (
      <p key={key} className="mb-6 text-base sm:text-lg leading-relaxed sm:leading-8 text-slate-700">
        {children}
      </p>
    );
  }

  if (node.type === "heading") {
    const level = Math.max(2, Number(node.attrs?.level ?? 2));
    const id = headingIds[cursor.index++];

    if (level === 2) {
      return (
        <h2 id={id} key={key} className="mt-12 mb-4 scroll-mt-28 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b233a]">
          {children}
        </h2>
      );
    }
    if (level === 3) {
      return (
        <h3 id={id} key={key} className="mt-8 mb-3 scroll-mt-28 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0b233a]">
          {children}
        </h3>
      );
    }
    return (
      <h4 id={id} key={key} className="mt-6 mb-2 scroll-mt-28 font-display text-lg font-bold text-[#0b233a]">
        {children}
      </h4>
    );
  }

  if (node.type === "bulletList") {
    return (
      <ul key={key} className="mb-7 list-disc space-y-2.5 pl-6 text-base sm:text-lg leading-relaxed text-slate-700">
        {children}
      </ul>
    );
  }

  if (node.type === "orderedList") {
    return (
      <ol key={key} className="mb-7 list-decimal space-y-2.5 pl-6 text-base sm:text-lg leading-relaxed text-slate-700">
        {children}
      </ol>
    );
  }

  if (node.type === "listItem") {
    return <li key={key} className="pl-1">{children}</li>;
  }

  if (node.type === "blockquote") {
    return (
      <blockquote key={key} className="my-8 border-l-4 border-[#FF8A00] bg-orange-50/50 rounded-r-2xl px-6 py-5 font-display text-lg sm:text-xl font-semibold leading-relaxed text-[#0b233a]">
        {children}
      </blockquote>
    );
  }

  if (node.type === "codeBlock") {
    return (
      <pre key={key} className="my-7 overflow-x-auto rounded-2xl bg-[#0b233a] p-5 font-mono text-xs sm:text-sm leading-6 text-slate-100 shadow-md">
        <code>{children}</code>
      </pre>
    );
  }

  if (node.type === "horizontalRule") {
    return <hr key={key} className="my-10 border-slate-200" />;
  }

  if (node.type === "image" && typeof node.attrs?.src === "string") {
    return (
      <figure key={key} className="my-8">
        <Image
          src={node.attrs.src}
          alt={String(node.attrs.alt ?? "Article illustration")}
          width={1200}
          height={675}
          sizes="(max-width: 760px) 100vw, 760px"
          className="h-auto w-full rounded-2xl shadow-md border border-slate-200/80"
        />
        {typeof node.attrs?.title === "string" && node.attrs.title && (
          <figcaption className="mt-2 text-center text-xs sm:text-sm text-slate-500 font-mono">
            {node.attrs.title}
          </figcaption>
        )}
      </figure>
    );
  }

  if (node.type === "table") return <div className="journal-table-scroll" key={key}><table><tbody>{children}</tbody></table></div>;
  if (node.type === "tableRow") return <tr key={key}>{children}</tr>;
  if (node.type === "tableCell" || node.type === "tableHeader") {
    const Cell = node.type === "tableHeader" ? "th" : "td";
    return <Cell key={key} colSpan={Math.min(20, Math.max(1, Number(node.attrs?.colspan) || 1))} rowSpan={Math.min(100, Math.max(1, Number(node.attrs?.rowspan) || 1))}>{children}</Cell>;
  }

  if (node.type === "hardBreak") return <br key={key} />;

  return children;
}

export default function RichText({ content }: { content: RichTextNode }) {
  return <div className="article-body">{renderNode(content, "root", articleHeadings(content).map((heading) => heading.id), { index: 0 })}</div>;
}
