import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/data/company";

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-28 overflow-hidden border-t border-line py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 size-[26rem] rounded-full bg-lime/[0.05] blur-3xl"
      />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                label="06 / Our process"
                title={
                  <>
                    From First Conversation
                    <br />
                    to Final Launch.
                  </>
                }
                description="A clear process keeps creative work accountable. These are the stages we move through, adapted to the scope of each project."
              />
              <Reveal delay={0.12}>
                <div className="mt-10 hidden items-center gap-3 lg:flex">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                    01 — {String(processSteps.length).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="size-1.5 rounded-full bg-lime" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-lime/60 via-line to-transparent md:left-[19px]"
              />
              <ol className="space-y-1">
                {processSteps.map((step, index) => (
                  <Reveal key={step.number} delay={index * 0.05}>
                    <li className="group relative flex gap-5 rounded-lg py-5 transition-colors duration-500 md:gap-7 md:py-6">
                      <span className="relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 bg-paper font-mono text-[0.5rem] tracking-[0.1em] text-ink transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-[#0D0D0D] md:size-10 md:text-[0.5625rem]">
                        {step.number}
                      </span>
                      <div className="border-b border-line pb-5 transition-colors duration-500 group-hover:border-ink/20 md:pb-6">
                        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink md:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-muted">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
