import { ArrowLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqs } from "@/data/faqs";

export function Faq() {
  return (
    <section className="border-t border-line py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                label="09 / FAQ"
                title={
                  <>
                    Questions
                    <br />
                    Before We
                    <br />
                    Get Started?
                  </>
                }
                description="Straight answers to the things people usually ask before a first call."
              />
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <ArrowLink href="/contact">Ask us something else</ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={homeFaqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
