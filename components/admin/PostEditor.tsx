"use client";

import { useActionState, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import {
  AlertCircle,
  Bold,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Eye,
  FileText,
  Heading2,
  Heading3,
  History,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Maximize2,
  Minimize2,
  Minus,
  Quote,
  Redo2,
  RotateCcw,
  Undo2,
} from "lucide-react";
import { autosavePost, restoreRevision, savePost, type FormState } from "@/app/admin/actions";
import MediaLibrary from "@/components/admin/MediaLibrary";
import RichText from "@/components/blog/RichText";
import { markdownToRichText, plainTextFromMarkdown, richTextToMarkdown } from "@/components/admin/markdownConversion";
import type { BlogPost, MediaAsset, PostStatus, RichTextNode } from "@/lib/blog/types";

const initialContent: RichTextNode = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "Start drafting the engineering analysis, FEED milestone details, or equipment specifications..." }],
    },
  ],
};

const CATEGORY_OPTIONS = [
  "FEED & Engineering",
  "Piping Engineering",
  "Offshore & Marine",
  "Civil & Structural",
  "Process Safety",
  "Project Execution",
  "Procurement & EPC",
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const comma = (value?: string[]) => value?.join(", ") ?? "";
const lines = (value?: string[]) => value?.join("\n") ?? "";

type Revision = { id: string; created_at: string };
type EditorMode = "visual" | "markdown" | "preview";

function ToolButton({
  active,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={
        (active
          ? "bg-[#0b233a] text-white shadow-xs"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900") +
        " rounded-lg p-1.5 sm:p-2 text-xs transition-colors cursor-pointer inline-flex items-center justify-center min-h-[32px] min-w-[32px]"
      }
    >
      {children}
    </button>
  );
}

function readJsonContent(content: string): RichTextNode {
  try {
    return JSON.parse(content) as RichTextNode;
  } catch {
    return initialContent;
  }
}

export default function PostEditor({
  post,
  assets = [],
  revisions = [],
  allPosts = [],
}: {
  post?: BlogPost;
  assets?: MediaAsset[];
  revisions?: Revision[];
  allPosts?: BlogPost[];
}) {
  const initialDoc = post?.content ?? initialContent;
  const [editorMode, setEditorMode] = useState<EditorMode>("visual");
  const [intent, setIntent] = useState<PostStatus>(post?.status ?? "draft");
  const [content, setContent] = useState(JSON.stringify(initialDoc));
  const [markdown, setMarkdown] = useState(() => richTextToMarkdown(initialDoc));
  const [conversionError, setConversionError] = useState("");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [category, setCategory] = useState(post?.categories?.[0] ?? "FEED & Engineering");
  const [customCategory, setCustomCategory] = useState("");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [relatedIds, setRelatedIds] = useState<string[]>(post?.relatedPostIds ?? []);
  const [fullscreen, setFullscreen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isRevisionsOpen, setIsRevisionsOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, {});
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [autosaveLabel, setAutosaveLabel] = useState("");
  const [isRestoring, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const dirty = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit, LinkExtension.configure({ openOnClick: false }), ImageExtension],
    content: initialDoc,
    immediatelyRender: false,
    onUpdate: ({ editor: instance }) => {
      dirty.current = true;
      setContent(JSON.stringify(instance.getJSON()));
      setConversionError("");
      setAutosaveStatus("idle");
    },
  });

  useEffect(() => {
    const warning = (event: BeforeUnloadEvent) => {
      if (dirty.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warning);
    return () => window.removeEventListener("beforeunload", warning);
  }, []);

  // Autosave timer (30s)
  useEffect(() => {
    if (!post?.id) return;
    const timer = window.setInterval(() => {
      if (!dirty.current || !formRef.current) return;
      const formData = new FormData(formRef.current);
      formData.set("content", content);
      formData.set("intent", intent);
      formData.set("relatedPostIds", relatedIds.join(","));
      formData.set("categories", customCategory || category);
      setAutosaveStatus("saving");
      setAutosaveLabel("Autosaving...");
      autosavePost(formData).then((result) => {
        if (result.saved) {
          dirty.current = false;
          setAutosaveStatus("saved");
          const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          setAutosaveLabel(`Autosaved at ${timeStr}`);
        } else {
          setAutosaveStatus("error");
          setAutosaveLabel(result.error || "Autosave failed");
        }
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, [post?.id, content, intent, relatedIds, category, customCategory]);

  const activeText = editorMode === "markdown" ? plainTextFromMarkdown(markdown) : editor?.getText().trim() ?? "";
  const wordCount = activeText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));
  const previewDoc = useMemo(() => readJsonContent(content), [content]);
  const relatedOptions = useMemo(() => allPosts.filter((item) => item.id !== post?.id), [allPosts, post?.id]);

  function markDirty() {
    dirty.current = true;
    setAutosaveStatus("idle");
  }

  function setDoc(doc: RichTextNode, updateEditor = false) {
    setContent(JSON.stringify(doc));
    if (updateEditor) editor?.commands.setContent(doc);
  }

  function syncMarkdownToJson(value: string) {
    try {
      const doc = markdownToRichText(value);
      setDoc(doc);
      setConversionError("");
      return doc;
    } catch (error) {
      setConversionError(error instanceof Error ? error.message : "Markdown could not be converted.");
      return null;
    }
  }

  function switchMode(nextMode: EditorMode) {
    if (editorMode === nextMode) return;
    if (editorMode === "markdown") {
      const doc = syncMarkdownToJson(markdown);
      if (!doc) return;
      if (nextMode === "visual") editor?.commands.setContent(doc);
    } else if (nextMode === "markdown") {
      setMarkdown(richTextToMarkdown(readJsonContent(content)));
    }
    setEditorMode(nextMode);
  }

  function addLink() {
    const href = window.prompt("Paste the destination URL");
    if (href) editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  function replaceMarkdownSelection(replacement: string, cursorOffset?: number) {
    const textarea = markdownRef.current;
    if (!textarea) {
      const next = markdown + replacement;
      setMarkdown(next);
      syncMarkdownToJson(next);
      markDirty();
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = markdown.slice(0, start) + replacement + markdown.slice(end);
    setMarkdown(next);
    syncMarkdownToJson(next);
    markDirty();
    requestAnimationFrame(() => {
      textarea.focus();
      const position = cursorOffset === undefined ? start + replacement.length : start + cursorOffset;
      textarea.setSelectionRange(position, position);
    });
  }

  function wrapMarkdown(prefix: string, suffix: string) {
    const textarea = markdownRef.current;
    const selected = textarea ? markdown.slice(textarea.selectionStart, textarea.selectionEnd) : "";
    replaceMarkdownSelection(prefix + selected + suffix, selected ? prefix.length + selected.length + suffix.length : prefix.length);
  }

  function prependMarkdown(prefix: string) {
    const textarea = markdownRef.current;
    if (!textarea) return replaceMarkdownSelection(prefix);
    const lineStart = markdown.lastIndexOf("\n", textarea.selectionStart - 1) + 1;
    const next = markdown.slice(0, lineStart) + prefix + markdown.slice(lineStart);
    setMarkdown(next);
    syncMarkdownToJson(next);
    markDirty();
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(textarea.selectionStart + prefix.length, textarea.selectionStart + prefix.length);
    });
  }

  function insertInline(asset: MediaAsset) {
    if (!asset.altText) return;
    if (editorMode === "markdown") {
      const caption = asset.caption ? ' "' + asset.caption + '"' : "";
      replaceMarkdownSelection("![" + asset.altText + "](" + asset.publicUrl + caption + ")");
      return;
    }
    editor?.chain().focus().setImage({ src: asset.publicUrl, alt: asset.altText, title: asset.caption || "" }).run();
    markDirty();
  }

  return (
    <>
      <form
        ref={formRef}
        action={action}
        className={
          fullscreen
            ? "fixed inset-0 z-50 overflow-y-auto bg-[#F4F6F9] p-3 sm:p-6 md:p-8"
            : "w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-12 sm:pb-20"
        }
      >
        {/* Hidden Form Sync Inputs */}
        <input type="hidden" name="id" value={post?.id ?? ""} />
        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="intent" value={intent} />
        <input type="hidden" name="coverImage" value={coverImage} />
        <input type="hidden" name="relatedPostIds" value={relatedIds.join(",")} />
        <input type="hidden" name="categories" value={customCategory || category} />

        {/* Top Error Notification */}
        {state?.error && (
          <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4 text-xs font-semibold text-red-700 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{state.error}</span>
          </div>
        )}

        {/* Main Document Card Container (Webifyit Clean Design Structure) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-7 md:p-10 shadow-xs space-y-6 sm:space-y-8">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-slate-100">
            <div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b233a]">
                {post ? "Edit Article" : "New Article"}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Write in Rich Text or Markdown. Preview renders exactly as the live engineering blog.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-slate-700 font-semibold"># {wordCount.toLocaleString()} words</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-slate-700 font-semibold">{readTime} min read</strong>
              </span>
            </div>
          </div>

          {/* Section 1: Article Title */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              Article Title <span className="text-[#FF8A00]">*</span>
            </label>
            <input
              required
              name="title"
              value={title}
              onChange={(event) => {
                const next = event.target.value;
                setTitle(next);
                if (!slug || slug === slugify(title)) setSlug(slugify(next));
                markDirty();
              }}
              minLength={8}
              maxLength={160}
              placeholder="e.g. The Human-in-the-Loop Pattern: Engineering Safe Autonomous Workflows"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-bold text-[#0b233a] placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Section 2: URL Slug & Category (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* URL Slug */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                URL Slug <span className="text-[#FF8A00]">*</span>
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3 sm:px-3.5 py-2 sm:py-2.5 focus-within:border-[#0b233a] focus-within:bg-white transition-all shadow-2xs min-w-0">
                <span className="text-xs font-mono text-slate-400 select-none pr-1 shrink-0">/blog/</span>
                <input
                  required
                  name="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlug(slugify(event.target.value));
                    markDirty();
                  }}
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  placeholder="article-slug"
                  className="w-full text-xs font-mono font-semibold text-[#0b233a] bg-transparent outline-none focus:outline-none focus:ring-0 min-w-0"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Category <span className="text-[#FF8A00]">*</span>
              </label>
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  markDirty();
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-medium text-slate-800 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Meta Description & Summary */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              <span>
                Meta Description / Abstract <span className="text-[#FF8A00]">*</span> (SEO)
              </span>
              <span className={excerpt.length > 320 || (excerpt.length > 0 && excerpt.length < 30) ? "text-[#FF8A00]" : "text-slate-400"}>
                {excerpt.length}/320
              </span>
            </div>
            <textarea
              required
              name="excerpt"
              value={excerpt}
              onChange={(event) => {
                setExcerpt(event.target.value);
                markDirty();
              }}
              minLength={30}
              maxLength={320}
              rows={3}
              placeholder="Why engineering teams reject hands-off workflows for mission-critical systems. Practical architecture patterns for stateful checkpointing, human approvals, and audit logs."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Section 4: Author Name, Author Role, Status (3-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Author Name */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Author Name
              </label>
              <input
                name="authorName"
                defaultValue={post?.authorName ?? "Saur Engineering Team"}
                onChange={markDirty}
                placeholder="e.g. Atharv K"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 sm:py-2.5 text-xs font-medium text-slate-800 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
              />
            </div>

            {/* Author Role */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Author Role
              </label>
              <input
                name="authorRole"
                defaultValue={post?.authorRole ?? "Principal Systems Engineer"}
                onChange={markDirty}
                placeholder="e.g. Systems Explorer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 sm:py-2.5 text-xs font-medium text-slate-800 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
              />
            </div>

            {/* Status Dropdown */}
            <div className="space-y-1.5 sm:space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Publishing Status
              </label>
              <select
                value={intent}
                onChange={(event) => {
                  setIntent(event.target.value as PostStatus);
                  markDirty();
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 sm:py-2.5 text-xs font-semibold text-[#0b233a] outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Schedule Picker if Scheduled */}
          {intent === "scheduled" && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 sm:p-4 space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Publish Schedule Date &amp; Time</span>
              </label>
              <input
                required
                name="scheduledFor"
                type="datetime-local"
                defaultValue={post?.scheduledFor?.slice(0, 16)}
                className="w-full sm:w-80 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0"
              />
            </div>
          )}

          {/* Section 5: Featured Cover & Tags (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2 border-t border-slate-100">
            {/* Featured Cover */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Featured Cover Image
                </label>
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage("");
                      markDirty();
                    }}
                    className="text-[11px] font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
              {coverImage ? (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                  <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#0b233a] text-xs font-bold shadow-sm cursor-pointer"
                    >
                      Change Cover
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="w-full h-[100px] sm:h-[120px] rounded-xl border border-dashed border-slate-300 hover:border-[#0b233a] bg-slate-50/60 hover:bg-slate-50 p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 group"
                >
                  <ImagePlus className="w-5 h-5 text-slate-400 group-hover:text-[#FF8A00] transition-colors" />
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0b233a]">
                    Select / Upload Cover Image
                  </span>
                </button>
              )}
            </div>

            {/* Tags & Standards */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Tags &amp; Industry Standards
              </label>
              <textarea
                name="tags"
                defaultValue={comma(post?.tags)}
                onChange={markDirty}
                rows={4}
                placeholder="ASME B31.3, Smart 3D, ADNOC, CAESAR II, Subsea"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-3.5 text-xs text-slate-800 leading-relaxed outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Section 6: Article Content / Editor */}
          <div className="space-y-3 pt-3 sm:pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FF8A00]" />
                <span>Article Content</span>
                <span className="text-[#FF8A00]">*</span>
              </label>

              <div className="flex items-center gap-2">
                {/* Mode Selector */}
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-0.5">
                  {(["visual", "markdown", "preview"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => switchMode(mode)}
                      className={
                        (editorMode === mode
                          ? "bg-[#0b233a] text-white shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900 font-medium") +
                        " rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs capitalize transition-colors cursor-pointer"
                      }
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Focus Mode */}
                <button
                  type="button"
                  onClick={() => setFullscreen(!fullscreen)}
                  title={fullscreen ? "Exit Focus Mode" : "Focus Mode"}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 sm:p-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                >
                  {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Editor Box */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
              {/* Sticky Visual Toolbar */}
              {editorMode === "visual" && (
                <div className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 sm:gap-1 border-b border-slate-200 bg-slate-50/80 backdrop-blur-xs p-1.5 sm:p-2.5">
                  <ToolButton label="Heading 2" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Heading 3" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 className="h-4 w-4" />
                  </ToolButton>
                  <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1" />
                  <ToolButton label="Bold" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <Bold className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Italic" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <Italic className="h-4 w-4" />
                  </ToolButton>
                  <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1" />
                  <ToolButton label="Bulleted List" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                    <List className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Numbered List" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Blockquote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
                    <Quote className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Code Block" active={editor?.isActive("codeBlock")} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
                    <Code2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Divider Line" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                    <Minus className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Insert Link" onClick={addLink}>
                    <Link2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Insert Media" onClick={() => setIsMediaModalOpen(true)}>
                    <ImagePlus className="h-4 w-4 text-[#FF8A00]" />
                  </ToolButton>
                  <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1" />
                  <ToolButton label="Undo" onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Redo" onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2 className="h-4 w-4" />
                  </ToolButton>
                </div>
              )}

              {/* Sticky Markdown Toolbar */}
              {editorMode === "markdown" && (
                <div className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 sm:gap-1 border-b border-slate-200 bg-slate-50/80 backdrop-blur-xs p-1.5 sm:p-2.5">
                  <ToolButton label="Heading 2" onClick={() => prependMarkdown("## ")}>
                    <Heading2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Heading 3" onClick={() => prependMarkdown("### ")}>
                    <Heading3 className="h-4 w-4" />
                  </ToolButton>
                  <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1" />
                  <ToolButton label="Bold" onClick={() => wrapMarkdown("**", "**")}>
                    <Bold className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Italic" onClick={() => wrapMarkdown("*", "*")}>
                    <Italic className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Inline Code" onClick={() => wrapMarkdown("`", "`")}>
                    <Code2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Code Block" onClick={() => replaceMarkdownSelection("\n```\n\n```\n", 5)}>
                    <Code2 className="h-4 w-4 text-emerald-600" />
                  </ToolButton>
                  <ToolButton label="Quote" onClick={() => prependMarkdown("> ")}>
                    <Quote className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Bulleted List" onClick={() => prependMarkdown("- ")}>
                    <List className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Numbered List" onClick={() => prependMarkdown("1. ")}>
                    <ListOrdered className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Link" onClick={() => wrapMarkdown("[", "](url)")}>
                    <Link2 className="h-4 w-4" />
                  </ToolButton>
                  <ToolButton label="Insert Media" onClick={() => setIsMediaModalOpen(true)}>
                    <ImagePlus className="h-4 w-4 text-[#FF8A00]" />
                  </ToolButton>
                </div>
              )}

              {/* Conversion Alert */}
              {conversionError && (
                <div className="m-3 sm:m-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{conversionError}</span>
                </div>
              )}

              {/* Visual Editor */}
              {editorMode === "visual" && (
                <div className="p-3.5 sm:p-6 md:p-8 min-h-[350px] sm:min-h-[480px]">
                  <EditorContent
                    editor={editor}
                    className="min-h-[320px] sm:min-h-[420px] text-sm sm:text-base leading-relaxed text-slate-800 outline-none focus:outline-none
                      [&_.ProseMirror]:min-h-[320px]
                      [&_.ProseMirror]:sm:min-h-[420px]
                      [&_.ProseMirror]:outline-none
                      [&_.ProseMirror_h2]:mt-6
                      [&_.ProseMirror_h2]:sm:mt-8
                      [&_.ProseMirror_h2]:mb-3
                      [&_.ProseMirror_h2]:font-display
                      [&_.ProseMirror_h2]:font-extrabold
                      [&_.ProseMirror_h2]:text-xl
                      [&_.ProseMirror_h2]:sm:text-2xl
                      [&_.ProseMirror_h2]:text-[#0b233a]
                      [&_.ProseMirror_h3]:mt-5
                      [&_.ProseMirror_h3]:sm:mt-6
                      [&_.ProseMirror_h3]:mb-2
                      [&_.ProseMirror_h3]:font-display
                      [&_.ProseMirror_h3]:font-bold
                      [&_.ProseMirror_h3]:text-lg
                      [&_.ProseMirror_h3]:sm:text-xl
                      [&_.ProseMirror_h3]:text-[#0b233a]
                      [&_.ProseMirror_p]:mb-4
                      [&_.ProseMirror_p]:text-slate-700
                      [&_.ProseMirror_p]:leading-7
                      [&_.ProseMirror_ul]:mb-4
                      [&_.ProseMirror_ul]:list-disc
                      [&_.ProseMirror_ul]:pl-5
                      [&_.ProseMirror_ul]:sm:pl-6
                      [&_.ProseMirror_ul]:space-y-1
                      [&_.ProseMirror_ol]:mb-4
                      [&_.ProseMirror_ol]:list-decimal
                      [&_.ProseMirror_ol]:pl-5
                      [&_.ProseMirror_ol]:sm:pl-6
                      [&_.ProseMirror_ol]:space-y-1
                      [&_.ProseMirror_blockquote]:my-5
                      [&_.ProseMirror_blockquote]:sm:my-6
                      [&_.ProseMirror_blockquote]:border-l-4
                      [&_.ProseMirror_blockquote]:border-[#FF8A00]
                      [&_.ProseMirror_blockquote]:bg-orange-50/30
                      [&_.ProseMirror_blockquote]:p-3.5
                      [&_.ProseMirror_blockquote]:sm:p-4
                      [&_.ProseMirror_blockquote]:rounded-r-xl
                      [&_.ProseMirror_blockquote]:italic
                      [&_.ProseMirror_blockquote]:text-slate-700
                      [&_.ProseMirror_code]:bg-slate-100
                      [&_.ProseMirror_code]:px-1.5
                      [&_.ProseMirror_code]:py-0.5
                      [&_.ProseMirror_code]:rounded-md
                      [&_.ProseMirror_code]:font-mono
                      [&_.ProseMirror_code]:text-xs
                      [&_.ProseMirror_pre]:my-5
                      [&_.ProseMirror_pre]:bg-[#0b233a]
                      [&_.ProseMirror_pre]:text-slate-100
                      [&_.ProseMirror_pre]:p-3.5
                      [&_.ProseMirror_pre]:sm:p-4
                      [&_.ProseMirror_pre]:rounded-xl
                      [&_.ProseMirror_pre]:overflow-x-auto
                      [&_.ProseMirror_img]:my-5
                      [&_.ProseMirror_img]:rounded-xl
                      [&_.ProseMirror_img]:border
                      [&_.ProseMirror_img]:border-slate-200
                      [&_.ProseMirror_hr]:my-6
                      [&_.ProseMirror_hr]:sm:my-8
                      [&_.ProseMirror_hr]:border-slate-200"
                  />
                </div>
              )}

              {/* Markdown Editor */}
              {editorMode === "markdown" && (
                <textarea
                  ref={markdownRef}
                  value={markdown}
                  onChange={(event) => {
                    const next = event.target.value;
                    setMarkdown(next);
                    syncMarkdownToJson(next);
                    markDirty();
                  }}
                  onKeyDown={(event) => {
                    const mod = event.metaKey || event.ctrlKey;
                    if (mod && event.key.toLowerCase() === "b") {
                      event.preventDefault();
                      wrapMarkdown("**", "**");
                    }
                    if (mod && event.key.toLowerCase() === "i") {
                      event.preventDefault();
                      wrapMarkdown("*", "*");
                    }
                    if (mod && event.key.toLowerCase() === "k") {
                      event.preventDefault();
                      wrapMarkdown("[", "](url)");
                    }
                    if (event.key === "Tab") {
                      event.preventDefault();
                      replaceMarkdownSelection("  ");
                    }
                  }}
                  spellCheck
                  rows={20}
                  className="w-full min-h-[350px] sm:min-h-[480px] resize-y bg-white p-3.5 sm:p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400"
                  placeholder="Write article body in Markdown syntax..."
                />
              )}

              {/* Live Preview */}
              {editorMode === "preview" && (
                <div className="p-3.5 sm:p-6 md:p-8 min-h-[350px] sm:min-h-[480px] bg-slate-50/30">
                  <div className="max-w-3xl mx-auto">
                    <RichText content={previewDoc} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 7: Technical Takeaways & Related Articles (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-3 sm:pt-4 border-t border-slate-100">
            {/* Takeaways */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Key Technical Takeaways (One per line)
              </label>
              <textarea
                name="techTakeaways"
                defaultValue={lines(post?.techTakeaways)}
                onChange={markDirty}
                rows={4}
                placeholder="FEED milestone check 1&#10;ASME / API compliance rule 2&#10;Risk & cost reduction outcome 3"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-3.5 text-xs text-slate-800 leading-relaxed outline-none focus:outline-none focus:border-[#0b233a] focus:ring-0 focus:bg-white transition-all shadow-2xs"
              />
            </div>

            {/* Related Articles */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Related Articles
                </label>
                <span className="text-[10px] font-mono text-slate-400">{relatedIds.length} selected</span>
              </div>
              <div className="max-h-28 space-y-1.5 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/60 p-2">
                {relatedOptions.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-2 rounded-lg p-1.5 hover:bg-white text-xs transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={relatedIds.includes(item.id)}
                      onChange={(event) => {
                        setRelatedIds(
                          event.target.checked
                            ? [...relatedIds, item.id].slice(0, 6)
                            : relatedIds.filter((id) => id !== item.id)
                        );
                        markDirty();
                      }}
                      className="mt-0.5 rounded border-slate-300 text-[#0b233a] focus:ring-0 focus:outline-none"
                    />
                    <span className="truncate font-medium text-slate-800 text-[11px]">{item.title}</span>
                  </label>
                ))}
                {!relatedOptions.length && (
                  <p className="text-xs text-slate-400 p-2 text-center">No other articles available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 8: Version Snapshots (if revisions exist) */}
          {revisions.length > 0 && (
            <div className="space-y-3 pt-3 sm:pt-4 border-t border-slate-100">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsRevisionsOpen(!isRevisionsOpen)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-[#0b233a] transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <History className="w-4 h-4 text-[#FF8A00] shrink-0" />
                    <span>Version History ({revisions.length} Snapshots)</span>
                  </span>
                  {isRevisionsOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>

                {isRevisionsOpen && (
                  <div className="p-3.5 sm:p-4 pt-0 space-y-2 border-t border-slate-200/80 bg-white">
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {revisions.slice(0, 6).map((revision) => (
                        <button
                          key={revision.id}
                          disabled={isRestoring}
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              await restoreRevision(post!.id, revision.id);
                              window.location.reload();
                            })
                          }
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-[#0b233a] bg-slate-50/60 hover:bg-slate-50 text-left text-xs text-slate-700 transition-colors cursor-pointer group"
                        >
                          <div>
                            <span className="font-semibold text-slate-800 block">
                              {new Date(revision.created_at).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <span className="text-[10px] text-slate-400">Restore Snapshot</span>
                          </div>
                          <RotateCcw className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#FF8A00] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 9: Sticky Bottom Publishing Action Bar */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-slate-100">
            {/* Left: Autosave indicator */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-slate-500 py-1">
              {autosaveStatus === "saving" && (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                  <span>Autosaving draft...</span>
                </>
              )}
              {autosaveStatus === "saved" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{autosaveLabel || "All changes saved locally"}</span>
                </>
              )}
              {autosaveStatus === "idle" && (
                <span className="text-slate-400 text-center sm:text-left">
                  {dirty.current ? "Unsaved changes" : "Autosaves automatically every 30s"}
                </span>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {post && (
                <a
                  href={`/admin/posts/${post.id}/preview`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold font-mono uppercase tracking-wider text-slate-700 transition-colors shadow-2xs min-h-[42px]"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </a>
              )}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b233a] hover:bg-[#163654] active:scale-[0.99] px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer disabled:opacity-60 min-h-[42px]"
              >
                {pending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : intent === "published" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#FF8A00]" />
                    <span>{post ? "Update Article" : "Publish Article Now"}</span>
                  </>
                ) : intent === "scheduled" ? (
                  <>
                    <Calendar className="w-4 h-4 text-[#FF8A00]" />
                    <span>Schedule Article</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#FF8A00]" />
                    <span>Save Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </form>

      {/* Media Library Modal */}
      <MediaLibrary
        assets={assets}
        asModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSetCover={(asset) => {
          setCoverImage(asset.publicUrl);
          markDirty();
        }}
        onInsert={insertInline}
      />
    </>
  );
}
