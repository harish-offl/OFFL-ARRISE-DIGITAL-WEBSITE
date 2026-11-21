import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats } from "@/data/company";

export function Stats() {
  return (
    <section
      id="results"
      className="on-dark grain grain-dark relative scroll-mt-28 overflow-hidden bg-night py-section text-white"
    >
      <div
        aria-hidden="true"
        className="noise-grid-dark pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[30rem] rounded-full bg-lime/[0.08] blur-3xl"
      />
      <div className="shell relative">
        <SectionHeading
          dark
          label="02 / Our impact"
          title={
            <>
              Measured in outcomes,
              <br />
              not just output.
            </>
          }
          description="We keep the numbers we can stand behind. Every metric below comes from work we have delivered or a workflow we have demonstrated."
          aside={
            <span className="font-mono inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.625rem] uppercase tracking-[0.16em] text-white/50">
              <span className="size-1.5 rounded-full bg-lime" />
              Verified figures
            </span>
          }
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07} className="h-full">
              <div className="group relative flex h-full flex-col justify-between gap-10 bg-night p-6 transition-colors duration-500 hover:bg-night-2 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-white/35">
                    0{index + 1}
                  </span>
                  <span className="size-1.5 rounded-full bg-lime/40 transition-colors duration-500 group-hover:bg-lime" />
                </div>
                <div>
                  <p className="font-display text-[clamp(2.75rem,5.2vw,4.75rem)] fw-extrabold leading-none tracking-[-0.05em] text-white">
                    {"display" in stat ? (
                      stat.display
                    ) : (
                      <Counter value={stat.value} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="mt-4 max-w-[18ch] font-body text-[0.8125rem] leading-relaxed text-white/50">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl font-body text-[0.6875rem] leading-relaxed text-white/30">
          The follow-up figure refers to a demonstrated workflow, not a universal guarantee.
          Results depend on the process, tools and team involved.
        </p>
      </div>
    </section>
  );
}

