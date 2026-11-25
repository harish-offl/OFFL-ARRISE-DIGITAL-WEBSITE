"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { saasProducts, type SaasProduct } from "@/data/saas-products";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChromaGrid, type ChromaItem } from "@/components/ui/chroma-grid";

const approach = [
  {
    number: "01",
    title: "Problem First",
    description:
      "We identify real workflow challenges before choosing the features or the technology.",
  },
  {
    number: "02",
    title: "Built for People",
    description:
      "Every product prioritizes clear interfaces, useful feedback and practical user experiences.",
  },
  {
    number: "03",
    title: "Designed to Scale",
    description:
      "We build around reliability and future growth, not just the first version.",
  },
];

const stages = [
  "Idea & Research",
  "UI/UX Design",
  "Development",
  "Testing & Refinement",
  "Public Launch",
];

export function SaasShowcase() {
  const [selected, setSelected] = useState<SaasProduct | null>(null);
  const productCards: ChromaItem[] = saasProducts.map((product) => ({
    id: product.name,
    monogram: product.number,
    title: product.name,
    subtitle: product.category,
    badge: product.status,
    tags: product.features.slice(0, 3),
    cta: "Explore product",
    meta: `${product.features.length} planned features`,
    accent: product.accent,
    onSelect: () => setSelected(product),
  }));

  return (
    <>
      <section id="products" className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="01 / The product ecosystem"
            title="Ideas, taking shape."
            description="Six software products in development, each built around a problem worth solving."
          />

          <div className="mt-12">
            <ChromaGrid
              items={productCards}
              columns={3}
              minCardWidth={260}
              gap={24}
              cardRadius={24}
              aspectRatio="3 / 2"
              reveal="spotlight"
              theme="dark"
              aria-label="Arrise Digital SaaS products"
            />
          </div>
        </div>
      </section>

      <section id="approach" className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="02 / Our approach"
            title={
              <>
                From Ideas to{" "}
                <span className="font-serif font-normal italic tracking-[-0.02em]">
                  Impact.
                </span>
              </>
            }
            description="Every product begins with a problem worth solving. Our development team creates practical, scalable and user-friendly digital solutions."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {approach.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06} className="h-full">
                <article className="group flex h-full flex-col justify-between gap-12 bg-paper p-6 transition-colors duration-500 hover:bg-[#F0F0ED] md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                      {item.number}
                    </span>
                    <span className="size-1.5 rounded-full bg-line transition-colors duration-500 group-hover:bg-lime" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="03 / The journey ahead"
            title="Building in stages."
            description="Our products are taking shape. Follow a clear path from the first idea to a working digital solution."
          />

          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {stages.map((stage, index) => (
              <Reveal key={stage} delay={index * 0.06}>
                <li className="border-t border-line pt-5 md:pt-6">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-display text-base font-medium tracking-[-0.01em] text-ink md:mt-6">
                    {stage}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] grid place-items-center bg-night/70 p-5 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-paper p-7 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="eyebrow text-lime">{selected.category}</span>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em]">
                  {selected.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelected(null)}
                className="rounded-full border border-line p-2 transition-colors hover:border-ink/30"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
              {selected.description}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {selected.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm">
                  <Check className="size-4 shrink-0 text-lime" />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-8" magnetic={false}>
              Ask About This Product
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}

