"use client";

import { useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageUploadProps = {
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  value?: string | string[];
  onUpload?: (urls: string[] | string) => void;
  onRemove?: (url: string, index: number) => void;
  className?: string;
  maxSizeMB?: number;
  folder?: string;
};

export function ImageUpload({
  accept = "image/*",
  disabled = false,
  multiple = false,
  value,
  onUpload,
  onRemove,
  className,
  maxSizeMB = 5,
  folder = "images",
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const current = Array.isArray(value) ? value : value ? [value] : [];
  const maxFiles = multiple ? undefined : 1;

  const open = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    setError("");

    if (!multiple && selected.length > 1) {
      setError("Please upload only one image.");
      return;
    }

    const next = [...files, ...selected];
    if (maxFiles !== undefined && next.length > maxFiles) {
      setError(`Maximum ${maxFiles} image allowed.`);
      return;
    }

    const sizeLimit = maxSizeMB * 1024 * 1024;
    for (const file of selected) {
      if (file.size > sizeLimit) {
        setError(`${file.name} exceeds ${maxSizeMB} MB.`);
        return;
      }
    }

    const newPreviews = { ...previews };
    for (const file of selected) {
      newPreviews[file.name + file.size] = URL.createObjectURL(file);
    }
    setPreviews(newPreviews);
    setFiles(next);
  };

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;
    setUploading(true);
    setError("");

    const results: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as {
          ok?: boolean;
          url?: string;
          error?: string;
        };

        if (!response.ok || !data.ok || !data.url) {
          throw new Error(data.error ?? "Upload failed.");
        }

        results.push(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
        setUploading(false);
        return;
      }
    }

    setUploading(false);
    setFiles([]);
    inputRef.current?.value?.toString();
    inputRef.current = inputRef.current!;
    inputRef.current!.value = "";
    setPreviews({});

    if (onUpload) {
      onUpload(multiple ? results : results[0]);
    }
  }, [files, multiple, onUpload]);

  const removePreview = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name + f.size !== name));
    const next = { ...previews };
    delete next[name];
    setPreviews(next);
  };

  const currentPreviews = current.map((url, i) => ({ url, index: i }));

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || uploading}
          onChange={handleChange}
          className="sr-only"
        />
        <button
          type="button"
          onClick={open}
          disabled={disabled || uploading}
          className={cn(
            "inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-line px-5 text-[0.8125rem] text-ink transition-colors hover:bg-night/10 disabled:opacity-50 disabled:cursor-not-allowed",
            uploading && "animate-pulse",
          )}
        >
          <Plus className="mr-2 size-4 shrink-0" />
          {uploading ? "Uploading..." : "Choose image"}
        </button>

        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>

      {uploading && (
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-xs text-muted">Uploading image…</span>
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => {
          const key = file.name + file.size;
          const preview = previews[key] ?? URL.createObjectURL(file);
          return (
            <div key={key} className="relative group">
              <img
                src={preview}
                alt={file.name}
                className="aspect-square w-full rounded-lg border border-line object-cover bg-night/5"
              />
              <button
                type="button"
                onClick={() => removePreview(key)}
                className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-red-500/90 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="size-3.5" />
              </button>
              <span className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 text-[10px] text-white truncate">
                {file.name}
              </span>
            </div>
          );
        })}

        {currentPreviews.map(({ url, index }) => (
          <div key={index} className="relative group aspect-square w-full rounded-lg border border-line object-cover bg-night/5">
            <img src={url} alt="uploaded" className="h-full w-full object-cover" />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(url, index)}
                className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-red-500/90 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        ))}

        {currentPreviews.length > 0 && (
          <div className="flex items-center justify-center gap-2 rounded-full bg-lime text-[#140A04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
            <CheckCircle2 className="mr-1 size-3" />
            Uploaded
          </div>
        )}
      </div>
    </div>
  );
}
