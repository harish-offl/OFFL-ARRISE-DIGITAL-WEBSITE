import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyArrise } from "@/data/company";

export function WhyArrise() {
  return (
    <section className="relative border-t border-line py-section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                label="04 / Why partner with us"
                title={
                  <>
                    More Than a
                    Service Provider.
                    <br />
                    <span className="font-serif font-normal italic tracking-[-0.02em]">Your Growth Partner.</span>
                  </>
                }
                description="We are not here to deliver a checklist and disappear. We stay close to the objective, the audience and the result."
              />
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <ArrowLink href="/about" className="font-mono text-ink">
                    How we think
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {whyArrise.map((item, index) => (
                <Reveal key={item.number} delay={index * 0.06}>
                  <div className="group relative grid grid-cols-[auto_1fr] gap-5 border-b border-line py-7 transition-colors duration-500 md:gap-8 md:py-9">
                    <span className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-lime">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-tight tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-lg font-body text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

