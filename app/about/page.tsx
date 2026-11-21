import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Process } from "@/components/sections/process";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arrise Digital is a creative digital growth studio combining strategy, design, content and technology. Learn how we think, how we work and what we believe.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    number: "01",
    title: "Curiosity",
    description:
      "We ask questions before we make assumptions. Understanding the business is part of the creative work, not a box to tick.",
  },
  {
    number: "02",
    title: "Craft",
    description:
      "The details are the difference between work that is merely finished and work that is worth remembering.",
  },
  {
    number: "03",
    title: "Candour",
    description:
      "We would rather give you an honest opinion than a comfortable one. Clear communication is part of the service.",
  },
  {
    number: "04",
    title: "Momentum",
    description:
      "Strategy without execution is a document. We care about what actually ships, and what it does next.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Arrise Digital"
        title="We Believe in Building What Comes Next."
        description="Arrise Digital is a creative digital growth studio built around one idea: the work should move the business forward. Not just look good. Not just fill a calendar. Move something."
        meta={[
          { label: "Approach", value: "Creative + technology" },
          { label: "Focus", value: "Business growth" },
          { label: "Working", value: "Remote-first" },
          { label: "Slogan", value: site.slogan },
        ]}
        breadcrumb="About"
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="01 / Our belief"
                title={
                  <>
                    Good digital work lives where creativity meets commercial{" "}
                    <span className="font-serif font-normal italic tracking-[-0.02em]">
                      clarity.
                    </span>
                  </>
                }
              />
            </div>
            <div className="lg:col-span-5 lg:pt-16">
              <Reveal delay={0.1}>
                <p className="text-[0.9375rem] leading-relaxed text-muted md:text-base">
                  A beautiful campaign that does not connect to a business objective is expensive
                  decoration. A technically flawless website that nobody wants to use is an
                  expensive brochure. The interesting work happens when both sides are held to the
                  same standard.
                </p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted md:text-base">
                  That is the standard we set for ourselves. Strategy, design, content and
                  technology are not separate departments here. They are different parts of the
                  same conversation about how your business grows.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
            <Reveal>
              <div className="flex h-full flex-col justify-between gap-12 rounded-xl bg-night p-7 text-white md:p-10">
                <span className="eyebrow text-lime">Our mission</span>
                <div>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.025em] md:text-3xl">
                    Help ambitious businesses build a digital presence that earns trust and creates
                    opportunity.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                    We do that by combining creative execution with the technical and strategic
                    work that makes it hold together.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between gap-12 rounded-xl border border-line bg-surface p-7 md:p-10">
                <span className="eyebrow text-ink/70">Our vision</span>
                <div>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-ink md:text-3xl">
                    A studio where the quality of the thinking matches the quality of the output.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                    We want clients to come for the craft and stay for the clarity — a partnership
                    that gets easier and more valuable over time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="02 / What we value"
            title="The principles behind the work."
            description="These are not wall posters. They are the filters we use when a project gets complicated."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.number} delay={index * 0.06} className="h-full">
                <div className="group flex h-full flex-col justify-between gap-10 bg-paper p-6 transition-colors duration-500 hover:bg-[#F0F0ED] md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[0.625rem] tracking-[0.18em] text-muted">
                      {value.number}
                    </span>
                    <span className="size-1.5 rounded-full bg-white/15 transition-colors duration-500 group-hover:bg-lime-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{value.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark grain grain-dark relative overflow-hidden bg-night py-section text-white">
        <div
          aria-hidden="true"
          className="noise-grid-dark pointer-events-none absolute inset-0 opacity-40"
        />
        <div className="shell relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow text-lime">03 / The studio</span>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                  Small by design.
                  <br />
                  <span className="font-serif font-normal italic tracking-[-0.02em]">
                    Direct by default.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:pt-14">
              <Reveal delay={0.1}>
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/60">
                  We keep the team close to the work. The people who shape the strategy are the
                  people who review the design, check the build and sit in the conversations. No
                  layers of account management between you and the decisions that matter.
                </p>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/60">
                  It means we take on fewer projects at once. It also means the ones we take on get
                  proper attention.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/contact" variant="dark-solid" size="md" arrow="up-right">
                    Work with us
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { label: "Direct collaboration", value: "You talk to the people doing the work." },
              { label: "Senior attention", value: "Strategy and craft stay in the same hands." },
              { label: "Focused scope", value: "Fewer projects, more deliberate work." },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.18em] text-lime">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FinalCta />
    </>
  );
}

