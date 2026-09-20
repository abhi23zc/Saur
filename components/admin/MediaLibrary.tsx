"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadMedia } from "@/app/admin/actions";
import type { MediaAsset } from "@/lib/blog/types";
import { AlertCircle, CheckCircle2, ImagePlus, Plus, Search, Upload, X } from "lucide-react";

export default function MediaLibrary({
  assets,
  onSetCover,
  onInsert,
  asModal = false,
  isOpen = false,
  onClose,
}: {
  assets: MediaAsset[];
  onSetCover?: (asset: MediaAsset) => void;
  onInsert?: (asset: MediaAsset) => void;
  asModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [showUpload, setShowUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const uploadPanelRef = useRef<HTMLDivElement>(null);

  const filtered = assets.filter((asset) =>
    (asset.fileName + " " + asset.altText + " " + (asset.caption ?? "")).toLowerCase().includes(query.toLowerCase())
  );

  function upload() {
    const form = uploadPanelRef.current;
    if (!form) return;
    const formData = new FormData();
    const file = form.querySelector<HTMLInputElement>('input[name="file"]')?.files?.[0];
    const altText = form.querySelector<HTMLInputElement>('input[name="altText"]')?.value ?? "";
    const caption = form.querySelector<HTMLInputElement>('input[name="caption"]')?.value ?? "";
    if (file) formData.set("file", file);
    formData.set("altText", altText);
    formData.set("caption", caption);

    startTransition(async () => {
      const result = await uploadMedia({}, formData);
      if (result.error) {
        setIsError(true);
        setMessage(result.error);
      } else if (result.saved) {
        setIsError(false);
        setMessage("Uploaded successfully. Reload page to view new media asset.");
        form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
          input.value = "";
        });
      }
    });
  }

  const content = (
    <div className="space-y-4">
      {/* Search & Upload Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by filename or description..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b233a] focus:bg-white transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          {showUpload ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{showUpload ? "Cancel Upload" : "Upload Image"}</span>
        </button>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div ref={uploadPanelRef} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs space-y-2.5">
          <label className="block text-[11px] font-semibold text-slate-600">Select Image File</label>
          <input
            required
            name="file"
            type="file"
            accept="image/*"
            className="block w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0b233a] file:text-white cursor-pointer"
          />
          <input
            required
            name="altText"
            placeholder="Descriptive alt text (required for SEO & accessibility) *"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0b233a]"
          />
          <input
            name="caption"
            placeholder="Optional technical caption"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0b233a]"
          />
          <button
            type="button"
            onClick={upload}
            disabled={pending}
            className="w-full rounded-lg bg-[#0b233a] hover:bg-[#163654] px-3 py-2 text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{pending ? "Uploading Media..." : "Upload Asset"}</span>
          </button>
          {message && (
            <p className={(isError ? "text-red-600" : "text-emerald-700 font-semibold") + " text-xs flex items-center gap-1.5 pt-1"}>
              {isError ? <AlertCircle className="w-3.5 h-3.5 shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
              <span>{message}</span>
            </p>
          )}
        </div>
      )}

      {/* Asset Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-[#0b233a] transition-all flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <Image
                src={asset.publicUrl}
                alt={asset.altText}
                width={180}
                height={120}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
              <p className="truncate text-[10px] font-medium text-slate-700" title={asset.fileName}>
                {asset.fileName}
              </p>
              <div className="grid grid-cols-2 gap-1 pt-1">
                {onSetCover && (
                  <button
                    type="button"
                    onClick={() => {
                      onSetCover(asset);
                      if (asModal && onClose) onClose();
                    }}
                    className="rounded-md bg-slate-100 px-1.5 py-1 text-[10px] font-semibold text-[#0b233a] hover:bg-orange-50 hover:text-[#e67c00] transition-colors text-center cursor-pointer"
                  >
                    Set Cover
                  </button>
                )}
                {onInsert && (
                  <button
                    type="button"
                    onClick={() => {
                      onInsert(asset);
                      if (asModal && onClose) onClose();
                    }}
                    className="rounded-md bg-[#0b233a] px-1.5 py-1 text-[10px] font-semibold text-white hover:bg-[#163654] transition-colors flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <ImagePlus className="w-2.5 h-2.5" />
                    <span>Inline</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="col-span-full py-8 text-center text-xs text-slate-400">
            No media assets found matching &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );

  if (!asModal) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-display font-bold text-lg text-[#0b233a]">Media Assets Library</h3>
            <p className="text-xs text-slate-500">Select an image to set as featured cover or insert into article.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
}
