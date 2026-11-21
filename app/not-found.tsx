import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-paper pb-16 pt-[calc(76px+4rem)] text-ink">
      <div
        aria-hidden="true"
        className="noise-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 size-[28rem] rounded-full bg-lime/40 blur-3xl"
      />
      <div className="shell relative">
        <p className="font-display text-[clamp(6rem,20vw,16rem)] font-medium leading-none tracking-[-0.06em] text-ink">
          404
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1] tracking-[-0.04em]">
              This page took a different route.
            </h1>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              The link may be outdated, or the page may have moved. The good work is still where you
              left it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/" variant="lime" size="md" arrow="right">
              Back home
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="md" arrow="up-right">
              See our work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
