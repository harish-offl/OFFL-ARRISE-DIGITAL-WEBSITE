"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import {
  insightCategories,
  insights,
  type InsightCategory,
} from "@/data/insights";
import { readingTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { InsightCover } from "@/components/ui/insight-cover";

type Filter = "All" | InsightCategory;

export function InsightsGrid({ excludeSlug }: { excludeSlug?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const pool = useMemo(
    () => insights.filter((insight) => insight.slug !== excludeSlug),
    [excludeSlug],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return pool.filter((insight) => {
      const matchesCategory = filter === "All" || insight.category === filter;
      const matchesQuery =
        !term ||
        [insight.title, insight.category, insight.excerpt].join(" ").toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [filter, pool, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2 py-1">
          {insightCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "shrink-0 font-mono rounded-full border px-4 py-2 text-[0.6875rem] fw-medium uppercase tracking-[0.1em] transition-colors duration-300",
                filter === category
                  ? "border-lime bg-lime text-[#140A04]"
                  : "border-line text-ink/60 hover:border-ink/40 hover:text-ink",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="relative flex w-full items-center lg:w-60">
          <Search className="pointer-events-none absolute left-0 size-4 text-muted" />
          <span className="sr-only">Search insights</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search insights"
            className="w-full border-b border-line bg-transparent py-2 pl-6 pr-2 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((insight) => (
              <motion.article
                key={insight.slug}
                layout={!reduce}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link href={`/insights/${insight.slug}`} className="block">
                  <div className="overflow-hidden rounded-lg">
                    <div className="aspect-[16/10] transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.03]">
                      <InsightCover
                        insight={insight}
                        index={insights.findIndex((item) => item.slug === insight.slug)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    <span>{insight.category}</span>
                    <span className="size-0.5 rounded-full bg-muted" />
                    <span>
                      {readingTime([
                        insight.intro,
                        ...insight.sections.flatMap((section) => section.paragraphs),
                      ])}{" "}
                      min read
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-medium leading-tight tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-muted">
                    {insight.title}
                  </h3>
                  <p className="mt-2 font-body line-clamp-2 text-sm leading-relaxed text-muted">
                    {insight.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.625rem] fw-semibold uppercase tracking-[0.14em] text-ink">
                    Read insight
                    <span className="h-px w-6 bg-lime transition-all duration-500 group-hover:w-10" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl text-ink">No insights match that search.</p>
          <p className="font-body mt-2 text-sm text-muted">Try another category or a broader term.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className="mt-5 rounded-full bg-lime px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-[#140A04] transition-colors hover:bg-accent"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
