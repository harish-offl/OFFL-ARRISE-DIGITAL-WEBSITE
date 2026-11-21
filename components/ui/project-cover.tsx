import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectCover({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  const { base, tint, accent, ink } = project.palette;

  return (
    <div
      className={cn("grain relative isolate h-full w-full overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${base} 0%, ${tint} 100%)`, color: ink }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `linear-gradient(to right, ${ink} 1px, transparent 1px), linear-gradient(to bottom, ${ink} 1px, transparent 1px)`,
          backgroundSize: compact ? "40px 40px" : "72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -right-[18%] -top-[22%] size-[70%] rounded-full opacity-25 blur-[2px]"
        style={{ background: accent }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-[30%] -left-[10%] size-[55%] rounded-full border opacity-30"
        style={{ borderColor: ink }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] right-[12%] size-[22%] rotate-12 rounded-2xl border opacity-40"
        style={{ borderColor: ink }}
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 md:px-6">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.22em] opacity-70">
          {project.industry}
        </span>
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.22em] opacity-70">
          {project.categories[0]}
        </span>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span
          className={cn(
            "select-none font-display font-medium leading-none tracking-[-0.06em]",
            compact ? "text-[5rem]" : "text-[clamp(5rem,14vw,11rem)]",
          )}
          style={{ color: accent }}
        >
          {project.monogram}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-5 md:px-6 md:pb-6">
        <div>
          <p className="font-display text-lg font-medium leading-tight tracking-[-0.02em] md:text-xl">
            {project.title}
          </p>
          <p className="mt-1 text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
            {project.services[0]}
          </p>
        </div>
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full border text-sm transition-transform duration-500 group-hover:rotate-45"
          style={{ borderColor: `${ink}44` }}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
    </div>
  );
}
