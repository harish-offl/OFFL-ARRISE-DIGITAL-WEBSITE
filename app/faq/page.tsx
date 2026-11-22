import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Arrise Digital services, projects, pricing, timelines and support.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Clarity before we begin."
        description="Everything you need to know about working with Arrise Digital — our services, process, pricing and collaboration."
        meta={[
          { label: "Questions", value: `${faqs.length} answered` },
          { label: "Approach", value: "Clear & tailored" },
          { label: "Working", value: "Remote-first" },
        ]}
        breadcrumb="FAQ"
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  On this page
                </p>
                <div className="mt-4 space-y-2 border-l border-line pl-4 text-sm text-muted">
                  <a className="block hover:text-ink" href="#questions">Common questions</a>
                  <a className="block hover:text-ink" href="#still-questions">Still have questions?</a>
                </div>
              </nav>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <section id="questions" className="scroll-mt-28">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[0.625rem] tracking-[0.18em] text-muted">01</span>
                  <h2 className="font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium leading-tight tracking-[-0.025em] text-ink">
                    Common questions
                  </h2>
                </div>
                <div className="mt-5">
                  <Accordion items={faqs} />
                </div>
              </section>

              <section id="still-questions" className="mt-16 scroll-mt-28 rounded-xl bg-night p-7 text-white md:p-10">
                <p className="eyebrow text-lime">Still have questions?</p>
                <h2 className="mt-4 max-w-lg font-display text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
                  Let&apos;s talk about what your business needs next.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                  Share your goals, timeline and any relevant links. We&apos;ll help you find the right digital solution.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
