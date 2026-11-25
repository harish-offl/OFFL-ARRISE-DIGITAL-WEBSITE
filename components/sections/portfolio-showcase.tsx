"use client";

import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  portfolioProjects,
  portfolioCategories,
  clientProjects,
  collaborations,
  mediaCount,
  SERVICE_LABELS,
  type PortfolioProject,
  type PortfolioProjectType,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ChromaGrid, type ChromaItem } from "@/components/ui/chroma-grid";

type Filter = "All Projects" | PortfolioProjectType;

export function PortfolioShowcase() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      portfolioProjects.filter((project) => {
        if (filter === "All Projects") return true;
        return project.categories.includes(filter);
      }),
    [filter],
  );

  const items = useMemo(() => filtered.map(toCardItem), [filtered]);

  const clientCount = clientProjects.length;
  const collabCount = collaborations.length;

  const handleFilter = useCallback((next: Filter) => {
    setFilter(next);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Section A — Hero */}
      <section className="relative py-[calc(84px+2rem)] pb-14 md:py-[calc(92px+3rem)] md:pb-20">
        <div className="shell relative z-10">
          <span className="eyebrow mb-6 block">Client portfolio</span>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] fw-extrabold leading-[0.92] tracking-[-0.05em] text-ink mb-6">
            One Card. Every Service.
          </h2>
          <p className="font-body text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-muted max-w-[64ch] mb-10 md:mb-12">
            One card per client — open any project to explore every service
            Arrise Digital delivered for that business, from the website to the
            video production and social media work.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="p-6 rounded-xl border border-line bg-surface min-w-[10rem]">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted block mb-2">
                Client Projects
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-ink">
                {clientCount}
              </span>
            </div>
            <div className="p-6 rounded-xl border border-line bg-surface min-w-[10rem]">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted block mb-2">
                Services Covered
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-ink">
                {portfolioCategories.length - 1}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section B — Category Navigation + Portfolio Grid */}
      <section className="border-t border-line py-10 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <span className="eyebrow mb-0">Filter by category</span>
            <div className="flex flex-wrap gap-3 overflow-x-auto no-scrollbar pb-2 md:overflow-visible md:pb-0">
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

          <p
            className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted"
            aria-live="polite"
          >
            Showing {filtered.length} of {portfolioProjects.length} projects
          </p>

          <div className="mt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filter}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {items.length > 0 ? (
                  <ChromaGrid
                    items={items}
                    columns={3}
                    minCardWidth={300}
                    gap={24}
                    cardRadius={24}
                    aspectRatio="3 / 2"
                    reveal="spotlight"
                    theme="dark"
                    aria-label="Arrise Digital client projects"
                  />
                ) : (
                  <div className="rounded-xl border border-dashed border-line py-20 text-center">
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
              </motion.div>
            </AnimatePresence>
          </div>
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
          <div className="mx-auto max-w-5xl text-center">
            <span className="eyebrow mb-6 block text-lime">Ready to work together?</span>
            <h2 className="mx-auto max-w-5xl font-display text-[clamp(2.5rem,7vw,5rem)] fw-bold leading-[1.05] tracking-[-0.04em] text-ink mb-6 md:mb-8">
              <span className="block">Your Brand Could Be</span>
              <span className="block">Our Next Project.</span>
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

/**
 * Maps one client record to exactly ONE ChromaGrid card.
 * Navigation is always internal — `href` points at /work/[slug], never at the
 * client's external website.
 */
function toCardItem(project: PortfolioProject): ChromaItem {
  const isCollab = project.type === "collaboration";
  const count = mediaCount(project);

  return {
    id: project.slug,
    badge: project.projectNumber,
    monogram: project.monogram,
    title: project.title,
    subtitle: project.industry,
    tags: project.services.map((service) => SERVICE_LABELS[service]),
    cta: isCollab ? undefined : "View project",
    meta: isCollab
      ? undefined
      : count > 0
        ? `${count} media asset${count === 1 ? "" : "s"}`
        : `${project.services.length} service${project.services.length === 1 ? "" : "s"}`,
    accent: project.accent,
    interactive: !isCollab,
    href: isCollab ? undefined : `/work/${project.slug}`,
  };
}

function CollaborationCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="relative group flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 md:p-12 text-center hover:border-ink/40 transition-all duration-500">
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
        {project.description}
      </p>
    </article>
  );
}
