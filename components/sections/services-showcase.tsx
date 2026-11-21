"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceVisual } from "@/components/ui/service-visual";

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <section id="services" className="relative scroll-mt-28 overflow-hidden py-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 size-[30rem] rounded-full bg-lime/[0.05] blur-3xl"
      />
      <div className="shell relative">
        <SectionHeading
          label="03 / What we do"
          title={
            <>
              Digital Solutions Built to
              <br className="hidden md:block" /> Move Your Business Forward.
            </>
          }
          description="We combine creative execution and technical expertise to help brands build visibility, connect with audiences and achieve sustainable growth."
          aside={
            <ButtonLink href="/services" variant="outline" size="md" arrow="right">
              All services
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="border-t border-line lg:col-span-7">
            {services.map((service, index) => {
              const isActive = active === index;
              return (
                <div
                  key={service.slug}
                  className="border-b border-line"
                  onMouseEnter={() => setActive(index)}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    onFocus={() => setActive(index)}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-7 md:gap-6 md:py-8"
                    aria-label={`${service.title} — ${service.tagline}`}
                  >
                    <span
                      className={cn(
                        "font-mono mt-1.5 text-[0.625rem] tracking-[0.18em] transition-colors duration-300",
                        isActive ? "text-ink" : "text-muted",
                      )}
                    >
                      {service.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3
                          className={cn(
                            "font-display text-[clamp(1.45rem,2.9vw,2.4rem)] font-medium leading-none tracking-[-0.035em] transition-colors duration-300",
                            isActive ? "text-ink" : "text-ink/35",
                          )}
                        >
                          {service.title}
                        </h3>
                        <span
                          className={cn(
                            "font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300",
                            isActive ? "text-lime" : "text-ink/35",
                          )}
                        >
                          {service.tagline}
                        </span>
                      </div>
                      <p className="mt-3 hidden font-body max-w-md text-sm leading-relaxed text-muted md:block">
                        {service.summary}
                      </p>
                      {service.highlight && (
                        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink/60">
                          <span className="size-1 rounded-full bg-lime-dark" />
                          {service.highlight.value} · {service.highlight.label}
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo md:size-10",
                        isActive
                          ? "rotate-45 border-lime bg-lime text-[#140A04]"
                          : "border-ink/15 text-muted",
                      )}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>

                  <div className="pb-8 lg:hidden">
                    <div className="overflow-hidden rounded-xl border border-line">
                      <div className="aspect-[4/3]">
                        <ServiceVisual type={service.visual} />
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.deliverables.slice(0, 6).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-2.5 py-1 font-body text-[0.625rem] text-muted"
                    >
                      {item}
                    </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <ArrowLink href={`/services/${service.slug}`}>
                        Explore {service.shortTitle.toLowerCase()}
                      </ArrowLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-[#EFEBE2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <ServiceVisual type={current.visual} label={current.title} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <p className="max-w-xs font-body text-sm leading-relaxed text-muted">{current.description}</p>
                <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                  {current.number} / 04
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {current.deliverables.slice(0, 7).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white px-2.5 py-1 font-body text-[0.625rem] text-muted"
                    >
                      {item}
                    </li>
                ))}
              </ul>

              <div className="mt-6">
                <ArrowLink href={`/services/${current.slug}`}>Explore this service</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

