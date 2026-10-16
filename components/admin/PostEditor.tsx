"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Bold, Italic, List, ListOrdered, Link2, ImagePlus, Undo2, Redo2, Heading2, Heading3, Quote, Table2, X, Eye, Save, Send, Maximize2, Minimize2 } from "lucide-react";
import { saveArticle, restoreRevision, getRevisions } from "@/app/admin/actions";
import { toEditor, slugify, names, lines, toLocalDateTime, publicationIssues, type EditorDocument, type SaveCommand } from "@/lib/blog/editor";
import { plainText, readingTime } from "@/lib/blog/presentation";
import { markdownToRichText, richTextToMarkdown } from "./markdownConversion";
import type { BlogPost, MediaAsset, PostStatus, RichTextNode } from "@/lib/blog/types";
import MediaLibrary from "./MediaLibrary";
import ArticleView from "@/components/blog/ArticleView";

type Props = { post?: BlogPost; assets?: MediaAsset[]; revisions?: { id: string; created_at: string }[]; allPosts?: BlogPost[]; categories?: string[] };
const categoryDefaults = ["FEED & Engineering", "Detailed Engineering", "Piping Engineering", "Offshore & Marine", "Process Safety", "Project Execution", "Workforce & Training"];
type Mode = "visual" | "markdown";

export default function PostEditor({ post, assets = [], revisions = [], allPosts = [], categories = [] }: Props) {
  const [revisionList, setRevisionList] = useState(revisions);
  const [doc, setDoc] = useState<EditorDocument>(() => toEditor(post));
  const [id] = useState(() => post?.id || crypto.randomUUID());
  const [status, setStatus] = useState<PostStatus>(post?.status || "draft");
  const [mode, setMode] = useState<Mode>("visual");
  const [tagText, setTagText] = useState(() => post?.tags.join(", ") || "");
  const [takeawayText, setTakeawayText] = useState(() => post?.techTakeaways.join("\n") || "");
  const [markdown, setMarkdown] = useState(() => richTextToMarkdown(toEditor(post).content));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [media, setMedia] = useState(false);
  const [preview, setPreview] = useState(false);
  const [focus, setFocus] = useState(false);
  const [scheduledFor, setScheduledFor] = useState("");
  const [recovery, setRecovery] = useState<EditorDocument | null>(null);
  const [linkPanel, setLinkPanel] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [extraCategories, setExtraCategories] = useState<string[]>([]);
  const [blocked, setBlocked] = useState(false);
  const version = useRef(post?.draftVersion || 0);
  const previewRef = useRef<HTMLDialogElement>(null);
  const docRef = useRef(doc);
  const changeNumber = useRef(0);
  const saving = useRef(false);
  const dirtyRef = useRef(false);
  const saveRef = useRef<(command: SaveCommand, automatic?: boolean) => Promise<boolean>>(async () => false);
  const initialId = post?.id || "new";
  const recoveryKey = `saur-article-${initialId}`;
  const lockedSlug = Boolean(post?.originalPublishedAt || status === "published");

  const change = useCallback((patch: Partial<EditorDocument>) => {
    const next = { ...docRef.current, ...patch };
    docRef.current = next;
    changeNumber.current++;
    dirtyRef.current = true;
    setDoc(next); setDirty(true); setNotice("");
    try { sessionStorage.setItem(recoveryKey, JSON.stringify(next)); sessionStorage.setItem(`saur-article-${id}`, JSON.stringify(next)); } catch { /* Recovery storage may be unavailable. */ }
  }, [recoveryKey, id]);

  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false } }), ImageExtension, TableKit.configure({ table: { resizable: false } })],
    content: toEditor(post).content, immediatelyRender: false,
    onUpdate: ({ editor: instance }) => change({ content: instance.getJSON() as EditorDocument["content"] }),
  });

  useEffect(() => {
    if (preview && !previewRef.current?.open) previewRef.current?.showModal();
  }, [preview]);

  useEffect(() => {
    // Restore notices are derived from browser storage after hydration.
    const timer = window.setTimeout(() => {
      setScheduledFor(toLocalDateTime(post?.scheduledFor));
      try { const value = sessionStorage.getItem(recoveryKey); if (value) setRecovery(JSON.parse(value)); } catch { /* Ignore malformed recovery data. */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [post?.scheduledFor, recoveryKey]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirtyRef.current) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    const guard = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (dirtyRef.current && link?.getAttribute("href")?.startsWith("/") && !link.target && !window.confirm("You have unsaved changes. Leave this article?")) { event.preventDefault(); event.stopPropagation(); }
    };
    document.addEventListener("click", guard, true);
    return () => { window.removeEventListener("beforeunload", warn); document.removeEventListener("click", guard, true); };
  }, []);

  async function persist(command: SaveCommand, automatic = false): Promise<boolean> {
    if (saving.current || blocked || (automatic && !dirtyRef.current)) return false;
    if (command === "publish" || command === "schedule") {
      const issues = publicationIssues(docRef.current);
      if (Object.keys(issues).length) { setFields(issues); setError("Please complete the highlighted details before publishing."); return false; }
    }
    saving.current = true; setBusy(true); setError(""); setFields({});
    const submittedChange = changeNumber.current;
    const form = new FormData();
    form.set("id", id); form.set("version", String(version.current)); form.set("command", command); form.set("document", JSON.stringify(docRef.current));
    if (command === "schedule" && scheduledFor) form.set("scheduledFor", new Date(scheduledFor).toISOString());
    try {
      const result = await saveArticle(form);
      if (!result.saved) { setError(result.error || "Unable to save. Please retry."); setFields(result.fields || {}); setBlocked(Boolean(result.conflict)); return false; }
      version.current = result.version!; setStatus(result.status!); setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      if (!post && window.location.pathname.endsWith("/new")) window.history.replaceState(null, "", `/admin/posts/${id}`);
      if (submittedChange === changeNumber.current) { dirtyRef.current = false; setDirty(false); try { sessionStorage.removeItem(recoveryKey); sessionStorage.removeItem(`saur-article-${id}`); } catch {} }
      setNotice(command === "publish" ? "Your article is live." : command === "schedule" ? "Article scheduled. The date below uses your local time zone." : command === "unpublish" ? "Article unpublished and saved as a draft." : automatic ? "" : "Draft saved. Live content has not changed.");
      return true;
    } catch { setError("Could not reach the server. Your work is kept in this tab. Try saving again."); return false; }
    finally { saving.current = false; setBusy(false); }
  }
  useEffect(() => { saveRef.current = persist; });
  useEffect(() => {
    const timer = window.setInterval(() => { void saveRef.current("save", true); }, 15000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") { event.preventDefault(); void saveRef.current("save"); } };
    window.addEventListener("keydown", shortcut); return () => window.removeEventListener("keydown", shortcut);
  }, []);

  function switchMode(next: Mode) {
    if (next === mode) return;
    if (next === "markdown") {
      function hasComplexFormatting(node: RichTextNode): boolean {
        return Number(node.attrs?.colspan || 1) > 1 || Number(node.attrs?.rowspan || 1) > 1 || Boolean(node.marks?.some((mark) => mark.type === "underline")) || Boolean(node.content?.some(hasComplexFormatting));
      }
      if (hasComplexFormatting(doc.content) && !window.confirm("Markdown cannot preserve merged table cells or underlining. Stay in Write mode to keep that formatting. Switch anyway?")) return;
      // Conversion happens only if the writer edits Markdown; switching back without edits preserves the source.
      setMarkdown(richTextToMarkdown(doc.content));
    } else { editor?.commands.setContent(doc.content, { emitUpdate: false }); }
    setMode(next);
  }
  function insertImage(asset: MediaAsset) {
    if (mode === "markdown") {
      const next = `${markdown}\n\n![${asset.altText}](${asset.publicUrl}${asset.caption ? ` "${asset.caption}"` : ""})`;
      setMarkdown(next); change({ content: markdownToRichText(next) });
    } else { editor?.chain().focus().setImage({ src: asset.publicUrl, alt: asset.altText, title: asset.caption || "" }).run(); }
  }
  function field(key: keyof EditorDocument, label: string, options: { type?: string; placeholder?: string; max?: number; help?: string } = {}) {
    return <div className="cms-field"><label htmlFor={`cms-${key}`}>{label}</label><input id={`cms-${key}`} type={options.type || "text"} value={String(doc[key] ?? "")} maxLength={options.max || 500} placeholder={options.placeholder} onChange={(event) => change({ [key]: event.target.value })} aria-invalid={Boolean(fields[key])} aria-describedby={fields[key] ? `error-${key}` : undefined} />{options.help && <small>{options.help}</small>}{fields[key] && <p className="cms-field-error" id={`error-${key}`}>{fields[key]}</p>}</div>;
  }
  function textarea(key: "excerpt" | "seoDescription" | "seoOgDescription" | "seoTwitterDescription", label: string, max: number) {
    return <div className="cms-field"><label htmlFor={`cms-${key}`}>{label} <span>{doc[key].length}/{max}</span></label><textarea id={`cms-${key}`} rows={3} value={doc[key]} maxLength={max} onChange={(e) => change({ [key]: e.target.value })} aria-invalid={Boolean(fields[key])} />{fields[key] && <p className="cms-field-error">{fields[key]}</p>}</div>;
  }
  const previewPost: BlogPost = { ...post, ...doc, id, status, publishedAt: post?.publishedAt || null, createdAt: post?.createdAt || new Date().toISOString(), updatedAt: post?.updatedAt || new Date().toISOString() };
  const topics = [...new Set([...categoryDefaults, ...categories, ...allPosts.flatMap((p) => p.categories), ...doc.categories, ...extraCategories])].sort();
  const issues = publicationIssues(doc);

  return <div className={`cms-editor ${focus ? "cms-focus" : ""}`}>
    <div className="cms-editor-top"><div><p className="cms-eyebrow">Editorial workspace</p><h1>{post ? "Edit article" : "Write an article"}</h1><p>Start with your story. Fine-tune the details when you’re ready.</p></div><button type="button" className="cms-secondary" onClick={() => setFocus(!focus)}>{focus ? <Minimize2 size={16} /> : <Maximize2 size={16} />}{focus ? "Exit focus" : "Focus mode"}</button></div>
    {recovery && <div className="cms-notice">There’s an unsaved draft from this tab. <button onClick={() => { change(recovery); setTagText(recovery.tags.join(", ")); setTakeawayText(recovery.techTakeaways.join("\n")); editor?.commands.setContent(recovery.content, { emitUpdate: false }); setMarkdown(richTextToMarkdown(recovery.content)); setRecovery(null); }}>Restore my writing</button><button onClick={() => { sessionStorage.removeItem(recoveryKey); setRecovery(null); }}>Dismiss</button></div>}
    {error && <div className="cms-error" role="alert">{error}{blocked && <><p>Copy any changes you want to keep, then reload to get the latest version.</p><button onClick={() => window.location.reload()}>Reload article</button></>}</div>}
    {notice && <p className="cms-notice" role="status">{notice}</p>}
    <div className="cms-editor-grid"><div className="cms-writing">
      <section className="cms-card cms-story" aria-label="Article writing">
        <label htmlFor="cms-title">Article title</label><input className="cms-title" id="cms-title" value={doc.title} placeholder="Give your article a clear title…" maxLength={160} onChange={(e) => { const next = e.target.value; change({ title: next, ...(!lockedSlug && (!doc.slug || doc.slug === slugify(doc.title)) ? { slug: slugify(next) } : {}) }); }} aria-invalid={Boolean(fields.title)} />{fields.title && <p className="cms-field-error">{fields.title}</p>}
        {textarea("excerpt", "Short summary", 320)}<p className="cms-help">A brief introduction shown on article cards. Search engines use this when no separate search description is provided.</p>
        <div className="cms-body-label"><label id="article-body-label">Article body</label><div className="cms-mode"><button aria-pressed={mode === "visual"} onClick={() => switchMode("visual")}>Write</button><button aria-pressed={mode === "markdown"} onClick={() => switchMode("markdown")}>Markdown</button></div></div>
        {mode === "visual" && <><div className="cms-toolbar" role="toolbar" aria-label="Text formatting">
          {[
            { label: "Heading 2", icon: Heading2, active: editor?.isActive("heading", {level:2}), run: () => editor?.chain().focus().toggleHeading({level:2}).run() },
            { label: "Heading 3", icon: Heading3, active: editor?.isActive("heading", {level:3}), run: () => editor?.chain().focus().toggleHeading({level:3}).run() },
            { label: "Bold", icon: Bold, active: editor?.isActive("bold"), run: () => editor?.chain().focus().toggleBold().run() },
            { label: "Italic", icon: Italic, active: editor?.isActive("italic"), run: () => editor?.chain().focus().toggleItalic().run() },
            { label: "Bullet list", icon: List, run: () => editor?.chain().focus().toggleBulletList().run() },
            { label: "Numbered list", icon: ListOrdered, run: () => editor?.chain().focus().toggleOrderedList().run() },
            { label: "Quote", icon: Quote, run: () => editor?.chain().focus().toggleBlockquote().run() },
            { label: "Link", icon: Link2, active: editor?.isActive("link"), run: () => { setLinkUrl(String(editor?.getAttributes("link").href || "")); setLinkPanel(!linkPanel); } },
            { label: "Insert image", icon: ImagePlus, run: () => setMedia(true) },
            { label: "Insert table", icon: Table2, run: () => editor?.chain().focus().insertTable({rows:3,cols:3,withHeaderRow:true}).run() },
            { label: "Undo", icon: Undo2, run: () => editor?.chain().focus().undo().run() },
            { label: "Redo", icon: Redo2, run: () => editor?.chain().focus().redo().run() },
          ].map(({label,icon: Icon,run,active}) => <button type="button" title={label} aria-label={label} aria-pressed={active} key={label} onClick={run}><Icon size={17} /></button>)}
        </div>
        {linkPanel && <div className="cms-link-panel"><label htmlFor="link-url">Link destination</label><input id="link-url" type="url" value={linkUrl} placeholder="https://example.com" onChange={(e) => setLinkUrl(e.target.value)} /><button className="cms-secondary" onClick={() => { if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(linkUrl)) { setError("Enter a valid link destination."); return; } editor?.chain().focus().extendMarkRange("link").setLink({href:linkUrl}).run(); setLinkPanel(false); }}>Apply</button><button onClick={() => { editor?.chain().focus().unsetLink().run(); setLinkPanel(false); }}>Remove link</button></div>}
        {editor?.isActive("table") && <div className="cms-table-actions">{[{label:"Add row",run:()=>editor.chain().focus().addRowAfter().run()},{label:"Add column",run:()=>editor.chain().focus().addColumnAfter().run()},{label:"Delete row",run:()=>editor.chain().focus().deleteRow().run()},{label:"Delete column",run:()=>editor.chain().focus().deleteColumn().run()},{label:"Remove table",run:()=>editor.chain().focus().deleteTable().run()}].map((item)=><button key={item.label} onClick={item.run}>{item.label}</button>)}</div>}
        <EditorContent editor={editor} className="cms-prosemirror" aria-labelledby="article-body-label" /></>}
        {mode === "markdown" && <><p className="cms-help">Markdown supports headings, lists, links, images and simple tables. Use Write mode for more complex layouts.</p><textarea className="cms-markdown" value={markdown} aria-label="Article body in Markdown" spellCheck onChange={(e) => { setMarkdown(e.target.value); change({content:markdownToRichText(e.target.value)}); }} /></>}
        {fields.content && <p className="cms-field-error">{fields.content}</p>}
        <div className="cms-count">{plainText(doc.content).split(/\s+/).filter(Boolean).length} words <span>·</span> {readingTime(doc.content)} min read</div>
      </section>
      <details className="cms-card"><summary>Search appearance <span>Optional</span></summary><div className="cms-details-content">
        {field("seoTitle", "Search title", {max:160,placeholder:doc.title,help:"Defaults to your article title. Keep it clear and concise."})}{textarea("seoDescription", "Search description", 320)}{field("seoFocusKeyword", "Main topic or phrase", {max:100,help:"An editorial reminder; this does not guarantee rankings."})}
        <div className="cms-search-preview"><small>{process.env.NEXT_PUBLIC_SITE_URL || "saurengineering.in"} › blog › {doc.slug || "article-url"}</small><h3>{doc.seoTitle || doc.title || "Your article title"}</h3><p>{doc.seoDescription || doc.excerpt || "Your article summary will appear here."}</p></div>
        <details><summary>Advanced search settings</summary><div className="cms-details-content">{field("seoCanonicalUrl", "Canonical URL", {help:"Leave empty for this article’s own URL. Set only when republishing content from another URL."})}<div className="cms-field"><label htmlFor="schema-type">Article type</label><select id="schema-type" value={doc.seoSchemaType} onChange={(e) => change({seoSchemaType:e.target.value as EditorDocument["seoSchemaType"]})}><option value="BlogPosting">Blog post</option><option value="Article">Article</option><option value="NewsArticle">News article</option></select></div><label className="cms-checkbox"><input type="checkbox" checked={doc.seoNoIndex} onChange={(e)=>change({seoNoIndex:e.target.checked})} />Keep this article out of search results</label></div></details>
      </div></details>
      <details className="cms-card"><summary>Social sharing <span>Optional</span></summary><div className="cms-details-content"><p className="cms-help">Defaults to your search title, summary and cover image.</p>{field("seoOgTitle", "Social title", {max:160})}{textarea("seoOgDescription", "Social description", 320)}{field("seoOgImage", "Social image URL")}<details><summary>X / Twitter overrides</summary><div className="cms-details-content">{field("seoTwitterTitle", "X title", {max:160})}{textarea("seoTwitterDescription", "X description", 320)}{field("seoTwitterImage", "X image URL")}</div></details></div></details>
      <details className="cms-card"><summary>Takeaways and related reading <span>Optional</span></summary><div className="cms-details-content"><div className="cms-field"><label htmlFor="takeaways">Key takeaways — one per line</label><textarea id="takeaways" rows={4} value={takeawayText} onChange={(e)=>{setTakeawayText(e.target.value);change({techTakeaways:lines(e.target.value)});}} /><small>Up to eight takeaways.</small>{fields.techTakeaways && <p className="cms-field-error">{fields.techTakeaways}</p>}</div><fieldset><legend>Related articles — up to six</legend>{allPosts.filter((item)=>item.id!==id && !item.deletedAt && item.status==="published").map((item)=><label className="cms-checkbox" key={item.id}><input type="checkbox" checked={doc.relatedPostIds.includes(item.id)} disabled={!doc.relatedPostIds.includes(item.id) && doc.relatedPostIds.length >= 6} onChange={(e)=>change({relatedPostIds:e.target.checked?[...doc.relatedPostIds,item.id].slice(0,6):doc.relatedPostIds.filter((value)=>value!==item.id)})} />{item.title}</label>)}</fieldset></div></details>
      <details className="cms-card"><summary>Version history <span>{revisionList.length} saved versions</span></summary><div className="cms-details-content"><button className="cms-secondary" disabled={busy} onClick={async()=>{try{const result=await getRevisions(id);if(result.error)setError(result.error);else setRevisionList(result.revisions);}catch{setError("Unable to refresh version history.");}}}>Refresh versions</button><p className="cms-help">Restore a version into your working draft. Published content stays live until you update it.</p>{!revisionList.length && <p className="cms-help">Previous versions appear here after you save and reopen the article.</p>}{revisionList.map((revision)=><button className="cms-revision" key={revision.id} disabled={busy} onClick={async()=>{if (!window.confirm("Restore this version into your draft? Copy any unsaved writing you want to keep first.")) return;setBusy(true);const result=await restoreRevision(id,revision.id,version.current);setBusy(false);if(result.error){setError(result.error);return;}dirtyRef.current=false;sessionStorage.removeItem(recoveryKey);window.location.reload();}}>{new Date(revision.created_at).toLocaleString()} <span>Restore draft</span></button>)}</div></details>
    </div>
    <aside className="cms-sidebar"><section className="cms-card cms-publish"><div className="cms-status-row"><h2>Publishing</h2><span className={`cms-status cms-status-${status}`}>{status}</span></div><p className="cms-save-state" role="status" aria-live="polite">{busy ? "Saving…" : dirty ? "Unsaved changes · autosave every 15 seconds" : savedAt ? `Saved at ${savedAt}` : "Ready to write"}</p>{(status==="published" || status==="scheduled") && <p className="cms-help">Saved edits stay private until you {status==="published"?"update the live article":"reschedule or publish"}.</p>}<button type="button" className="cms-secondary" disabled={busy || blocked} onClick={()=>void persist("save")}><Save size={16} />Save draft</button><button type="button" className="cms-secondary" onClick={()=>setPreview(true)}><Eye size={16} />Preview article</button><button type="button" className="cms-primary" disabled={busy || blocked} onClick={()=>void persist("publish")}><Send size={16} />{status==="published"?"Update live article":"Publish article"}</button>{Object.keys(issues).length>0 && <p className="cms-help">{Object.keys(issues).length} details to complete before publishing. You can save a draft at any time.</p>}
      {status!=="published" && <details><summary>Schedule publication</summary><div className="cms-details-content"><label htmlFor="schedule-time">Date and time in your device’s time zone</label><input id="schedule-time" type="datetime-local" value={scheduledFor} onChange={(e)=>setScheduledFor(e.target.value)} /><button className="cms-secondary" disabled={busy || blocked || !scheduledFor} onClick={()=>void persist("schedule")}>{status==="scheduled"?"Reschedule article":"Schedule article"}</button>{fields.scheduledFor && <p className="cms-field-error">{fields.scheduledFor}</p>}</div></details>}
      {status!=="draft" && <button className="cms-danger-link" disabled={busy || blocked} onClick={()=>{if(window.confirm(status==="published"?"Unpublish this article? Its public URL will stop showing the article until you publish again.":"Cancel the scheduled publication and keep this article as a draft?")) void persist("unpublish");}}>{status==="published"?"Unpublish article":"Cancel scheduled publication"}</button>}
    </section>
    <section className="cms-card"><h2>Article details</h2><div className="cms-details-content"><div className="cms-field"><label htmlFor="article-slug">Article URL</label><span className="cms-url-prefix">/blog/</span><input id="article-slug" value={doc.slug} disabled={lockedSlug} onChange={(e)=>change({slug:slugify(e.target.value)})} placeholder="generated-from-your-title" /><small>{lockedSlug?"Published URLs are preserved so existing links keep working.":"Generated from the title. You can edit it before first publication."}</small>{fields.slug && <p className="cms-field-error">{fields.slug}</p>}</div>
      <fieldset className="cms-topics"><legend>Topics</legend>{topics.map((topic)=><label className="cms-checkbox" key={topic}><input type="checkbox" checked={doc.categories.includes(topic)} disabled={!doc.categories.includes(topic) && doc.categories.length >= 8} onChange={(e)=>change({categories:e.target.checked?[...doc.categories,topic].slice(0,8):doc.categories.filter((value)=>value!==topic)})} />{topic}</label>)}</fieldset>{fields.categories && <p className="cms-field-error">{fields.categories}</p>}<div className="cms-add-topic"><label htmlFor="new-topic">Add a topic</label><input id="new-topic" maxLength={100} value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} /><button className="cms-secondary" disabled={doc.categories.length >= 8} onClick={()=>{const value=newCategory.trim();if(!value || !slugify(value))return;setExtraCategories([...extraCategories,value]);change({categories:[...new Set([...doc.categories,value])].slice(0,8)});setNewCategory("");}}>Add topic</button></div>
      <div className="cms-field"><label htmlFor="article-tags">Tags, separated by commas</label><input id="article-tags" value={tagText} onChange={(e)=>{setTagText(e.target.value);change({tags:names(e.target.value)});}} placeholder="FEED, Project delivery" /><small>Up to eight tags.</small>{fields.tags && <p className="cms-field-error">{fields.tags}</p>}</div>{field("authorName", "Author name", {max:120})}{field("authorRole", "Author role", {max:160,help:"Optional. Use the author’s actual role."})}</div></section>
    <section className="cms-card"><h2>Cover image</h2><div className="cms-details-content">{doc.coverImage && <div className="cms-cover-preview"><img src={doc.coverImage} alt={doc.coverAlt || "Selected cover"} /></div>}<button className="cms-secondary" onClick={()=>setMedia(true)}><ImagePlus size={16} />{doc.coverImage?"Change cover":"Choose or upload image"}</button>{doc.coverImage && <><button className="cms-danger-link" onClick={()=>change({coverImage:"",coverAlt:"",coverCaption:""})}>Remove cover</button>{field("coverAlt", "Describe the cover image", {help:"Describe what the image shows, rather than repeating the article title."})}{field("coverCaption", "Caption", {help:"Optional visible caption or image credit."})}</>}</div></section>
    </aside></div>
    <MediaLibrary assets={assets} asModal isOpen={media} onClose={()=>setMedia(false)} onSetCover={(asset)=>change({coverImage:asset.publicUrl,coverAlt:asset.altText,coverCaption:asset.caption || ""})} onInsert={insertImage} />
    {preview && <dialog ref={previewRef} className="cms-preview-overlay" aria-label="Article preview" onCancel={()=>setPreview(false)}><div className="cms-preview-bar"><span>Preview · unsaved changes included</span><button onClick={()=>setPreview(false)}><X size={18} />Back to writing</button></div><main className="journal journal-preview"><div className="journal-shell"><ArticleView post={previewPost} preview /></div></main></dialog>}
  </div>;
}
