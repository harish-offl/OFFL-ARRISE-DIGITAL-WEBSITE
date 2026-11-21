import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceBlock } from "@/components/sections/service-block";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media marketing, video production, web development and AI automation. Explore the four core services Arrise Digital uses to move businesses forward.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Digital Solutions Built to Move Your Business Forward."
        description="We combine creative execution and technical expertise to help brands build visibility, connect with audiences and achieve sustainable growth."
        meta={[
          { label: "Core services", value: "Four" },
          { label: "Engagements", value: "Single or combined" },
          { label: "Approach", value: "Strategy-led" },
          { label: "Reporting", value: "Transparent" },
        ]}
        breadcrumb="Services"
      />

      <section className="pb-4 pt-10 md:pt-14">
        <div className="shell">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors duration-300 hover:bg-[#F0F0ED]"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-[0.5625rem] tracking-[0.16em] text-muted">
                    {service.number}
                  </span>
                  <span className="font-display text-sm font-medium tracking-[-0.01em] text-ink">
                    {service.title}
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-ink/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="shell">
          {services.map((service, index) => (
            <ServiceBlock key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>

      <Process />

      <section className="border-t border-line py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                label="Good to know"
                title={
                  <>
                    Answers before
                    <br />
                    the first call.
                  </>
                }
                description="If your question is not here, ask it directly. We would rather clarify than guess."
              />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqs} defaultOpen={null} />
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

