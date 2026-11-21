"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCover } from "@/components/ui/project-cover";

type Filter = "All" | ProjectCategory;

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = filter === "All" || project.categories.includes(filter);
      const matchesQuery =
        !term ||
        [project.title, project.client, project.industry, ...project.categories, ...project.services]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2 py-1">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "shrink-0 font-mono rounded-full border px-4 py-2 text-[0.6875rem] fw-medium uppercase tracking-[0.1em] transition-colors duration-300",
                filter === category
                  ? "border-lime bg-lime text-[#140A04]"
                  : "border-line bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="relative flex w-full items-center lg:w-64">
          <Search className="pointer-events-none absolute left-0 size-4 text-muted" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects"
            className="w-full border-b border-line bg-transparent py-2 pl-6 pr-2 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduce}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="View"
                  className="group relative block h-full overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]">
                      <ProjectCover project={project} />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/80">
                      {project.categories.join(" · ")}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full bg-paper text-ink">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl text-ink">No projects match that search.</p>
          <p className="font-body mt-2 text-sm text-muted">Try a different category or a broader term.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className="mt-5 rounded-full font-mono bg-lime px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-[#140A04] transition-colors hover:bg-accent"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
