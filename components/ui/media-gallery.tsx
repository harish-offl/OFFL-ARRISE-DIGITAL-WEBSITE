"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import type { ImageAsset } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type MediaGalleryProps = {
  images: ImageAsset[];
  accent?: string;
  /** Slots rendered when no asset has been delivered/integrated yet. */
  pendingLabels?: string[];
  /** Compact two-column layout for service blocks. */
  dense?: boolean;
};

export function AssetPending({
  label,
  hint,
  accent = "#FF6B00",
  icon,
}: {
  label: string;
  hint?: string;
  accent?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-line bg-surface p-6">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-line bg-paper text-ink/60">
          {icon ?? <ImageIcon className="size-5" />}
        </span>
        <p className="font-display text-base font-medium text-ink">{label}</p>
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
          Asset pending integration
        </p>
        {hint && (
          <p className="max-w-sm font-body text-[0.8125rem] leading-relaxed text-muted">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

export function MediaGallery({
  images,
  accent = "#FF6B00",
  pendingLabels = ["Asset 01", "Asset 02"],
  dense = false,
}: MediaGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) => {
        if (index === null) return index;
        return (index + delta + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  if (images.length === 0) {
    return (
      <div className={cn("grid gap-5", dense ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        {pendingLabels.map((label) => (
          <AssetPending key={label} label={label} accent={accent} />
        ))}
      </div>
    );
  }

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div
        className={cn(
          "grid gap-4",
          dense ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={cn(
              "group relative block w-full overflow-hidden rounded-xl border border-line bg-surface text-left transition-colors hover:border-ink/30",
              !dense && index % 5 === 0 && "sm:col-span-2",
            )}
            aria-label={`Open ${image.alt}`}
          >
            <span className="relative block aspect-[4/3] w-full overflow-hidden bg-paper">
              {image.src.startsWith("/") ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={dense ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              )}
            </span>
            <span className="flex items-start justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <span className="block truncate font-body text-[0.8125rem] font-medium text-ink">
                  {image.alt}
                </span>
                {image.caption && (
                  <span className="mt-0.5 block truncate font-body text-[0.75rem] text-muted">
                    {image.caption}
                  </span>
                )}
              </span>
              <span
                className="mt-0.5 size-2 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-night/95 p-4 md:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
            aria-label="Close gallery"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-night"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>

          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex max-h-[70vh] items-center justify-center overflow-hidden rounded-xl bg-black">
              {active.src.startsWith("/") ? (
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={1200}
                  className="h-auto max-h-[70vh] w-auto object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.src}
                  alt={active.alt}
                  className="h-auto max-h-[70vh] w-auto object-contain"
                />
              )}
            </div>
            <figcaption className="mt-4 text-center">
              <p className="font-display text-base font-medium text-white">{active.alt}</p>
              {active.caption && (
                <p className="mt-1 font-body text-sm text-white/60">{active.caption}</p>
              )}
              <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/40">
                {(openIndex ?? 0) + 1} / {images.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
