import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectGallery({ project }: { project: Project }) {
  const { base, tint, accent, ink } = project.palette;

  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-5">
      {project.gallery.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "grain relative overflow-hidden rounded-xl",
            index === 2 ? "md:col-span-12" : index === 0 ? "md:col-span-7" : "md:col-span-5",
          )}
          style={{
            background: `linear-gradient(${index % 2 === 0 ? "135deg" : "215deg"}, ${base}, ${tint})`,
            color: ink,
          }}
        >
          <div
            className={cn(
              "relative",
              index === 2 ? "aspect-[16/9] md:aspect-[16/6]" : "aspect-[4/3] md:aspect-[4/3]",
            )}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: `linear-gradient(to right, ${ink} 1px, transparent 1px), linear-gradient(to bottom, ${ink} 1px, transparent 1px)`,
                backgroundSize: "56px 56px",
              }}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute rounded-full opacity-25",
                index === 1 ? "-left-16 -bottom-16 size-56" : "-right-20 -top-20 size-64",
              )}
              style={{ background: accent }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[18%] left-[10%] h-px w-[55%] rotate-[-12deg]"
              style={{ background: ink, opacity: 0.25 }}
            />

            <span className="absolute left-5 top-5 font-mono text-[0.5625rem] fw-semibold uppercase tracking-[0.22em] opacity-60">
              {item.label}
            </span>
            <span className="absolute right-5 top-4 font-mono text-[clamp(2rem,5vw,4rem)] fw-medium leading-none tracking-[-0.05em] opacity-25">
              0{index + 1}
            </span>

            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-lg font-medium leading-tight tracking-[-0.02em] md:text-xl">
                  {project.title}
                </p>
                <p className="mt-1 max-w-sm font-body text-[0.75rem] leading-relaxed opacity-65">
                  {item.caption}
                </p>
              </div>
              <span
                className="grid size-8 place-items-center rounded-full border text-xs"
                style={{ borderColor: `${ink}44` }}
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
