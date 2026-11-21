import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-heading";

export function PageHero({
  label,
  title,
  description,
  meta,
  children,
  dark = false,
  breadcrumb,
}: {
  label: string;
  title: string;
  description?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
  dark?: boolean;
  breadcrumb?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b pt-[calc(76px+clamp(3rem,7vw,6rem))] pb-[clamp(3.5rem,8vw,7rem)]",
        dark ? "on-dark grain grain-dark border-white/10 bg-night text-white" : "border-line bg-paper",
      )}
    >
      {!dark && (
        <div
          aria-hidden="true"
          className="noise-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
      )}
      <div className="shell relative">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-8 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em]",
              dark ? "text-white/40" : "text-muted",
            )}
          >
            <Link
              href="/"
              className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-ink")}
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className={dark ? "text-white/70" : "text-ink/70"}>{breadcrumb ?? label}</span>
          </nav>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <SectionLabel dark={dark}>{label}</SectionLabel>
            <RevealText
              as="h1"
              text={title}
              delay={0.1}
              className={cn(
                "mt-6 font-display text-[clamp(2.6rem,6.4vw,6rem)] font-medium leading-[0.94] tracking-[-0.045em]",
                dark ? "text-white" : "text-ink",
              )}
            />
          </div>
          <div className="lg:col-span-4 lg:pt-14">
            {description && (
              <Reveal delay={0.15}>
                <p
                  className={cn(
                    "font-body max-w-md text-[0.9375rem] leading-relaxed",
                    dark ? "text-white/60" : "text-muted",
                  )}
                >
                  {description}
                </p>
              </Reveal>
            )}
            {meta && (
              <Reveal delay={0.2}>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line/80 pt-6">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt
                        className={cn(
                          "font-mono text-[0.5625rem] uppercase tracking-[0.18em]",
                          dark ? "text-white/35" : "text-muted",
                        )}
                      >
                        {item.label}
                      </dt>
                      <dd
                        className={cn(
                          "mt-1 font-display text-sm font-medium",
                          dark ? "text-white" : "text-ink",
              )}
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {children && <Reveal delay={0.25}>{children}</Reveal>}
          </div>
        </div>
      </div>
    </section>
  );
}


