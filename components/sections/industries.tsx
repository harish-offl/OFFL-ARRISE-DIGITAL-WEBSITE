import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/data/company";

export function Industries() {
  return (
    <section className="on-dark grain grain-dark relative overflow-hidden bg-night py-section text-white">
      <div
        aria-hidden="true"
        className="noise-grid-dark pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="shell relative">
        <SectionHeading
          dark
          label="07 / Industries"
          title={
            <>
              Built for Businesses
              <br className="hidden md:block" /> Ready to Move Forward.
            </>
          }
          description="Different industries need different instincts. We adapt the strategy and the craft to the context — while keeping the standard the same."
        />

        <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} delay={(index % 4) * 0.05}>
              <div className="group relative flex h-full min-h-[11rem] flex-col justify-between gap-8 border-b border-r border-white/10 p-5 transition-colors duration-500 hover:bg-lime md:min-h-[13rem] md:p-6">
                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl font-medium text-white/20 transition-colors duration-500 group-hover:text-[#140A04]/50 md:text-3xl">
                    {industry.glyph}
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-white/25 transition-colors duration-500 group-hover:text-[#140A04]/50">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-medium tracking-[-0.01em] text-white transition-colors duration-500 group-hover:text-[#140A04] md:text-lg">
                    {industry.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.8125rem] leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-[#140A04]/70">
                    {industry.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[0.8125rem] text-white/40">
            Don&apos;t see your industry? The approach adapts more than the list suggests.
          </p>
          <ArrowLink href="/contact" className="text-white">
            Tell us about your business
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

