"use client";

import { useState } from "react";
import { ExternalLink, MonitorPlay, RotateCw } from "lucide-react";

export function WebsitePreview({
  url,
  title,
  monogram,
  accent = "#FF6B00",
}: {
  url: string;
  title: string;
  monogram: string;
  accent?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-float">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3">
        <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#E5E5E5]" />
          <span className="size-2.5 rounded-full bg-[#E5E5E5]" />
          <span className="size-2.5 rounded-full bg-[#E5E5E5]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.08em] text-muted">
          {host}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink/40"
        >
          Visit
          <ExternalLink className="size-3" />
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full bg-paper">
        {loaded ? (
          <iframe
            src={url}
            title={`${title} live website preview`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 bg-white"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <span
              className="grid size-16 place-items-center rounded-full font-display text-xl font-bold"
              style={{ backgroundColor: `${accent}1f`, color: accent }}
              aria-hidden="true"
            >
              {monogram}
            </span>
            <div>
              <p className="font-display text-lg font-medium tracking-[-0.02em] text-ink">
                Live website preview
              </p>
              <p className="mt-1 break-all font-mono text-[0.625rem] tracking-[0.1em] text-muted">
                {host}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-night hover:text-white"
              >
                <MonitorPlay className="size-3.5" />
                Load live preview
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#140A04] transition-colors hover:bg-[#E85D00]"
              >
                Visit live website
                <ExternalLink className="size-3.5" />
              </a>
            </div>
            <p className="max-w-sm font-body text-[0.6875rem] leading-relaxed text-muted">
              Some sites block embedded previews. If the frame stays blank, open
              the live website in a new tab.
            </p>
          </div>
        )}
      </div>

      {loaded && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
            Live preview of {host}
          </span>
          <button
            type="button"
            onClick={() => setLoaded(false)}
            className="inline-flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
          >
            <RotateCw className="size-3" />
            Show details
          </button>
        </div>
      )}
    </div>
  );
}
