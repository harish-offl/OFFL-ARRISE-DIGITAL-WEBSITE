"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioCategories,
  clientProjects,
  collaborations,
  type PortfolioProject,
  type PortfolioProjectType,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

type Filter = "All Projects" | PortfolioProjectType;

const CATEGORY_LABELS: Record<string, string> = {
  "Website Development": "Website Development",
  "Video Production": "Video Production",
  "Social Media Management": "Social Media",
  "Content Creation": "Content Creation",
  Collaboration: "Collaboration",
};

export function PortfolioShowcase() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    return portfolioProjects.filter((project) => {
      if (filter === "All Projects") return true;
      return project.categories.includes(filter);
    });
  }, [filter]);

  const clientCount = clientProjects.length;
  const collabCount = collaborations.length;

  const handleFilter = useCallback((next: Filter) => {
    setFilter(next);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Section A — Hero */}
      <section
        className="relative py-[calc(84px+2rem)] pb-14 md:py-[calc(92px+3rem)] md:pb-20"
      >
        <div className="shell relative z-10">
          <span className="eyebrow mb-6 block">Our Work / Selected Projects</span>
          <h2
            className="font-display text-[clamp(3rem,8vw,6rem)] fw-extrabold leading-[0.92] tracking-[-0.05em] text-ink mb-6"
          >
            Work That Moves Businesses Forward.
          </h2>
          <p className="font-body text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-muted max-w-[64ch] mb-10 md:mb-12">
            Explore the businesses we&apos;ve worked with, the digital
            experiences we&apos;ve created, and the creative collaborations that
            bring ideas to life.
          </p>

          <div className="p-6 rounded-xl border border-line bg-surface">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted block mb-2">
              Client Projects
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              {clientCount}
            </span>
          </div>
        </div>
      </section>

      {/* Section B — Category Navigation */}
      <section className="border-t border-line py-10 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <span className="eyebrow mb-0">Filter by category</span>
            <div
              className="flex flex-wrap gap-3 overflow-x-auto no-scrollbar pb-2 md:overflow-visible md:pb-0"
            >
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleFilter(category)}
                  aria-pressed={filter === category}
                  className={cn(
                    "shrink-0 font-mono rounded-full border px-5 py-2.5 text-[0.6875rem] fw-medium uppercase tracking-[0.12em] transition-colors duration-400",
                    filter === category
                      ? "border-lime bg-lime text-[#140A04]"
                      : "border-line bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
            Showing {filtered.length} of {portfolioProjects.length} projects
          </p>

          {/* Portfolio Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout={!reduce}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <PortfolioCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-xl border border-dashed border-line py-20 text-center">
              <p className="font-display text-xl text-ink">
                No projects match that category.
              </p>
              <p className="font-body mt-2 text-sm text-muted">
                Try a different filter or view all projects.
              </p>
              <button
                type="button"
                onClick={() => handleFilter("All Projects")}
                className="mt-6 rounded-full font-mono bg-lime px-6 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-[#140A04] transition-colors hover:bg-[#E85D00]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section C — Creative Collaborations */}
      {collabCount > 0 && (
        <section className="py-14 md:py-20 border-t border-line">
          <div className="shell">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between text-center md:text-left max-w-4xl mx-auto">
              <div>
                <span className="eyebrow mb-4 block">Creative Collaborations</span>
                <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] fw-bold leading-[1.1] tracking-[-0.04em] text-ink">
                  Great ideas grow through great partnerships.
                </h3>
                <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-muted max-w-md">
                  We collaborate with creative teams and brands to bring
                  impactful ideas to life.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {collaborations.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout={!reduce}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative"
                  >
                    <CollaborationCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* Section D — Final CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="shell relative z-10">
          <div className="max-w-[60ch] mx-auto text-center">
            <span className="eyebrow mb-6 block text-lime">Ready to work together?</span>
            <h2
              className="font-display text-[clamp(2.5rem,7vw,5rem)] fw-bold leading-[1.05] tracking-[-0.04em] text-ink mb-6 md:mb-8"
            >
              Your Brand Could Be Our Next Project.
            </h2>
            <p className="font-body text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-muted max-w-[48ch] mx-auto mb-10 md:mb-12">
              Have an idea, a business, or a brand ready to grow? Let&apos;s
              create something meaningful together.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
              <ButtonLink href="/contact" variant="lime" size="lg" arrow="right">
                Start a Project
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="lg"
                arrow="right"
                className="border-ink/20 hover:border-ink"
              >
                Talk to Our Team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function PortfolioCard({ project }: { project: PortfolioProject }) {
  const hasWebsite = Boolean(project.website);
  const isCollab = project.type === "collaboration";

  return (
    <Link
      href={hasWebsite ? project.website! : `/work/${project.slug}`}
      target={hasWebsite ? "_blank" : undefined}
      rel={hasWebsite ? "noopener noreferrer" : undefined}
      data-cursor="View"
      className="group block"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-paper transition-all duration-500 ease-out-expo group-hover:border-ink/40">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]">
          <ProjectThumbnail project={project} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex flex-col gap-1">
            <span
              className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/90"
            >
              {project.projectNumber}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.625rem] fw-medium uppercase tracking-[0.1em]",
                isCollab
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/20 bg-white/5 text-white/80",
              )}
            >
              {CATEGORY_LABELS[project.categories[0] ?? ""]}
            </span>
          </div>
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-transform duration-500 group-hover:rotate-45"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <span className="font-display text-lg font-medium leading-tight tracking-[-0.02em] text-ink group-hover:text-ink transition-colors duration-300">
          {project.title}
        </span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
          {project.industry}
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-line px-2.5 py-1 text-[0.625rem] text-ink/60"
            >
              {service}
            </span>
          ))}
        </div>
        {!hasWebsite && (
          <span className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            View project details
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </Link>
  );
}

function CollaborationCard({ project }: { project: PortfolioProject }) {
  return (
    <article
      className="relative group flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 md:p-12 text-center hover:border-ink/40 transition-all duration-500"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-[10rem] opacity-5 select-none">✦</span>
      </div>

      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-white mb-5">
        <span className="text-xl opacity-60">✦</span>
      </div>

      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/50 mb-2 block">
        COLLABORATION
      </span>
      <h4 className="font-display text-xl font-medium leading-tight tracking-[-0.02em] text-ink">
        {project.title}
      </h4>
      <p className="mt-3 font-body text-sm leading-relaxed text-muted max-w-xs">
        {project.description ||
          "A creative collaboration bringing impactful ideas to life through partnership."}
      </p>
    </article>
  );
}

function ProjectThumbnail({ project }: { project: PortfolioProject }) {
  // Deterministic, neutral placeholder based on project slug
  const hue = project.slug
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12"
      style={{ backgroundColor: `hsl(${hue}, 12%, 94%)` }}
    >
      <div className="relative inline-flex items-center justify-center aspect-square max-w-[200px] max-h-[200px] rounded-full border border-white/60 bg-white shadow-sm">
        <span
          className="text-[clamp(3rem,8vw,6rem)] font-display font-bold tracking-tighter select-none opacity-80"
          style={{ color: `hsl(${hue}, 40%, 35%)` }}
        >
          {project.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </span>
      </div>
      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink/40">
          {project.client}
        </span>
        <span className="font-display text-lg font-medium tracking-[-0.02em] text-ink">
          {project.title}
        </span>
      </div>
    </div>
  );
}
