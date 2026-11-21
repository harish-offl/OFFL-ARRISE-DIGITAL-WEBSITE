import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { ServiceVisual } from "@/components/ui/service-visual";
import { Reveal } from "@/components/ui/reveal";

export function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
      <Reveal className={cn("lg:col-span-6", reversed && "lg:order-2")} y={24}>
        <Link
          href={`/services/${service.slug}`}
          className="group block overflow-hidden rounded-xl border border-line"
          aria-label={`Explore ${service.title}`}
        >
          <div className="aspect-[4/3]">
            <div className="h-full w-full transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]">
              <ServiceVisual type={service.visual} label={service.title} />
            </div>
          </div>
        </Link>
      </Reveal>

      <div
        className={cn(
          "flex flex-col justify-center lg:col-span-6",
          reversed && "lg:order-1",
        )}
      >
        <Reveal delay={0.08}>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
              {service.number} / 04
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-lime-dark">
              {service.tagline}
            </span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
            {service.headline}
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted md:text-[0.9375rem]">
            {service.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {service.deliverables.slice(0, 8).map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 font-body text-[0.8125rem] text-ink/70"
              >
                <span className="size-1 shrink-0 rounded-full bg-lime-dark" />
                {item}
              </span>
            ))}
          </div>

          {service.highlight && (
            <div className="mt-7 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-night/[0.04] px-4 py-3">
              <span className="font-display text-lg font-medium tracking-[-0.02em] text-ink">
                {service.highlight.value}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                {service.highlight.label}
              </span>
            </div>
          )}

          <Link
            href={`/services/${service.slug}`}
            className="group mt-7 inline-flex items-center gap-2 font-mono text-[0.6875rem] fw-semibold uppercase tracking-[0.16em] text-ink"
          >
            Explore this service
            <span className="grid size-8 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-[#140A04]">
              <ArrowUpRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
