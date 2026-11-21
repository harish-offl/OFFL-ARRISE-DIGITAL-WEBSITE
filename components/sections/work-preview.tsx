import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkPreview() {
  const [first, second, third] = featuredProjects;

  return (
    <section id="work" className="relative scroll-mt-28 border-t border-line py-section">
      <div className="shell">
        <SectionHeading
          label="05 / Selected projects"
          title="Good Ideas Deserve Great Execution."
          description="Explore how we transform business challenges into creative digital solutions."
          aside={
            <ButtonLink href="/work" variant="outline" size="md" arrow="right" className="whitespace-nowrap">
              View all projects
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-12">
          {first && (
            <Reveal className="lg:col-span-7">
              <ProjectCard project={first} className="h-full min-h-[24rem] lg:min-h-0" />
            </Reveal>
          )}
          <div className="grid gap-4 md:gap-5 lg:col-span-5">
            {second && (
              <Reveal delay={0.08}>
                <ProjectCard project={second} className="aspect-[4/3] lg:aspect-[16/11]" />
              </Reveal>
            )}
            {third && (
              <Reveal delay={0.16}>
                <ProjectCard project={third} className="aspect-[4/3] lg:aspect-[16/11]" />
              </Reveal>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">
            Branding · Social · Video · Web · Automation
          </p>
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.16em] text-ink"
          >
            All work
            <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  className,
}: {
  project: (typeof featuredProjects)[number];
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className={cn("group relative block overflow-hidden rounded-2xl", className)}
      aria-label={`View project: ${project.title}`}
    >
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]">
        <ProjectCover project={project} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute right-4 top-4 z-20 flex translate-y-2 items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-[#140A04] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        View project
        <ArrowUpRight className="size-3" />
      </span>
    </Link>
  );
}

