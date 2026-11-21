import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const principles = [
  {
    number: "01",
    title: "Creative thinking",
    description: "Ideas with a point of view, not decoration applied at the end.",
  },
  {
    number: "02",
    title: "Technical depth",
    description: "Modern builds that are fast, accessible and built to last.",
  },
  {
    number: "03",
    title: "Business focus",
    description: "Every decision connects back to a commercial objective.",
  },
];

export function Intro() {
  return (
    <section id="about" className="relative scroll-mt-28 overflow-hidden py-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[28rem] rounded-full bg-lime/[0.05] blur-3xl"
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              label="01 / Who we are"
              title={
                <>
                  Your Creative Partner
                  <br />
                  in <span className="font-serif font-normal italic tracking-[-0.02em]">Digital</span> Growth.
                </>
              }
            />
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="font-body text-[0.9375rem] leading-relaxed text-muted md:text-base">
                Arrise Digital is a creative digital agency focused on helping businesses establish a
                powerful digital presence. We bring strategy, design, content and technology together
                to create solutions that make a meaningful difference.
              </p>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-muted md:text-base">
                We believe every business has the potential to become something bigger. Our role is
                to transform ideas into experiences, attention into opportunities and opportunities
                into growth.
              </p>
              <div className="mt-8">
                <ArrowLink href="/about" className="font-mono text-ink">
                  Discover Arrise
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid border-y border-line md:mt-20 md:grid-cols-3 md:divide-x md:divide-line">
          {principles.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 0.08}>
              <div className="group relative flex h-full flex-col justify-between gap-8 border-b border-line px-0 py-7 transition-colors duration-500 last:border-b-0 md:border-b-0 md:px-7 md:py-9 md:first:pl-0 md:last:pr-0">
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted">
                  {principle.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 size-1.5 rounded-full bg-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:right-7"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
