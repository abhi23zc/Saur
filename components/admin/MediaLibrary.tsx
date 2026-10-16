"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { uploadMedia, updateMedia, deleteMedia } from "@/app/admin/actions";
import type { MediaAsset } from "@/lib/blog/types";
import { X, ImagePlus } from "lucide-react";

export default function MediaLibrary({ assets, onSetCover, onInsert, asModal = false, isOpen = false, onClose }: { assets: MediaAsset[]; onSetCover?: (asset: MediaAsset) => void; onInsert?: (asset: MediaAsset) => void; asModal?: boolean; isOpen?: boolean; onClose?: () => void }) {
  const [uploads,setUploads] = useState<MediaAsset[]>([]);
  const [updates,setUpdates] = useState<Record<string, Partial<MediaAsset>>>({});
  const [deleted,setDeleted] = useState<string[]>([]);
  const [query,setQuery] = useState("");
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const [pending,startTransition] = useTransition();
  const [editing,setEditing] = useState<string | null>(null);
  const [alt,setAlt] = useState("");
  const [caption,setCaption] = useState("");
  const [selectedFile,setSelectedFile] = useState<File | null>(null);
  const [uploadAlt,setUploadAlt] = useState("");
  const [uploadCaption,setUploadCaption] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    if (!asModal) return;
    const dialog=dialogRef.current;
    if (isOpen && !dialog?.open) dialog?.showModal();
    if (!isOpen && dialog?.open) dialog.close();
  },[isOpen,asModal]);
  const combined=[...uploads,...assets.filter((asset)=>!uploads.some((item)=>item.id===asset.id))].filter((asset)=>!deleted.includes(asset.id)).map((asset)=>({...asset,...updates[asset.id]}));
  const filtered=combined.filter((asset)=>`${asset.fileName} ${asset.altText} ${asset.caption || ""}`.toLowerCase().includes(query.toLowerCase()));
  function upload() {
    setError("");setMessage("");
    if (!selectedFile || !uploadAlt.trim()) {setError("Choose an image and add a description before uploading.");return;}
    const form=new FormData();form.set("file",selectedFile);form.set("altText",uploadAlt);form.set("caption",uploadCaption);
    startTransition(async()=>{
      try {
        const result=await uploadMedia({},form);
        if(result.error || !result.asset){setError(result.error || "Unable to upload image.");return;}
        setUploads((items)=>[result.asset!,...items]);setSelectedFile(null);setUploadAlt("");setUploadCaption("");if(fileRef.current)fileRef.current.value="";setMessage("Image uploaded. You can use it immediately.");setQuery("");
      } catch {setError("The upload could not reach the server. Please try again.");}
    });
  }
  const content=<div className="cms-media">
    <div className="cms-field"><label htmlFor={asModal?"media-search-modal":"media-search"}>Search images</label><input id={asModal?"media-search-modal":"media-search"} type="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Filename, description or caption" /></div>
    <details className="cms-media-upload"><summary>Upload a new image</summary><div className="cms-details-content"><div className="cms-field"><label htmlFor={asModal?"upload-image-modal":"upload-image"}>Image file</label><input ref={fileRef} id={asModal?"upload-image-modal":"upload-image"} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(e)=>setSelectedFile(e.target.files?.[0] || null)} /><small>JPG, PNG, WebP, GIF or AVIF · maximum 5 MB</small></div><div className="cms-field"><label htmlFor="upload-alt">Describe the image</label><input id="upload-alt" value={uploadAlt} maxLength={500} onChange={(e)=>setUploadAlt(e.target.value)} placeholder="For example, engineers reviewing a piping model" /></div><div className="cms-field"><label htmlFor="upload-caption">Caption or image credit (optional)</label><input id="upload-caption" value={uploadCaption} maxLength={500} onChange={(e)=>setUploadCaption(e.target.value)} /></div><button type="button" className="cms-primary" disabled={pending} onClick={upload}>{pending?"Uploading…":"Upload image"}</button></div></details>
    {error && <p className="cms-error" role="alert">{error}</p>}{message && <p className="cms-notice" role="status">{message}</p>}
    <div className="cms-media-grid">{filtered.map((asset)=><div className="cms-media-item" key={asset.id}><img src={asset.publicUrl} alt={asset.altText} loading="lazy" /><div className="cms-media-copy"><p title={asset.fileName}>{asset.fileName}</p><small>{asset.altText}</small><div className="cms-media-actions">{onSetCover && <button type="button" className="cms-secondary" onClick={()=>{onSetCover(asset);onClose?.();}}>Use as cover</button>}{onInsert && <button type="button" className="cms-secondary" onClick={()=>{onInsert(asset);onClose?.();}}><ImagePlus size={14} />Insert</button>}<button type="button" onClick={()=>{setEditing(asset.id);setAlt(asset.altText);setCaption(asset.caption || "");}}>Edit details</button>{!asModal && <button type="button" className="cms-danger-link" disabled={pending} onClick={()=>{if(!window.confirm("Delete this unused image? Images used by an article or revision are protected."))return;startTransition(async()=>{const result=await deleteMedia(asset.id);if(result.error)setError(result.error);else{setDeleted((ids)=>[...ids,asset.id]);setMessage("Image deleted.");}});}}>Delete unused image</button>}</div>{editing===asset.id && <div className="cms-field"><label htmlFor={`alt-${asset.id}`}>Image description</label><input id={`alt-${asset.id}`} value={alt} onChange={(e)=>setAlt(e.target.value)} /><label htmlFor={`caption-${asset.id}`}>Caption</label><input id={`caption-${asset.id}`} value={caption} onChange={(e)=>setCaption(e.target.value)} /><small>Existing article images keep the description saved with the article.</small><button type="button" className="cms-secondary" disabled={pending} onClick={()=>startTransition(async()=>{const result=await updateMedia(asset.id,alt,caption);if(result.error){setError(result.error);return;}setUpdates((items)=>({...items,[asset.id]:{altText:alt,caption}}));setEditing(null);setMessage("Image details saved.");})}>Save details</button></div>}</div></div>)}</div>{!filtered.length && <p className="cms-help">No images found. Upload an image to get started.</p>}
  </div>;
  if(!asModal)return content;
  return <dialog ref={dialogRef} aria-label="Image library" className="cms-media-dialog" onCancel={()=>onClose?.()} onClick={(e)=>{if(e.target===dialogRef.current)onClose?.();}}><div className="cms-dialog-heading"><h2>Image library</h2><button type="button" aria-label="Close image library" onClick={()=>onClose?.()}><X size={22} /></button></div>{content}</dialog>;
}
