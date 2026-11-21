"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-lime"
    >
      Back to top
      <span className="grid size-8 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
        <ArrowUp className="size-3.5" />
      </span>
    </button>
  );
}
