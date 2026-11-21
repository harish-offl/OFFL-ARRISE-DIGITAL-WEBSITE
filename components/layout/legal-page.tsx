import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export function LegalPage({
  title,
  description,
  updated,
  sections,
  footer,
}: {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  footer?: ReactNode;
}) {
  return (
    <>
      <PageHero
        label="Legal"
        title={title}
        description={description}
        meta={[
          { label: "Last updated", value: updated },
          { label: "Applies to", value: "This website" },
        ]}
        breadcrumb={title}
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  Contents
                </p>
                <ol className="mt-4 border-l border-line">
                  {sections.map((section, index) => (
                    <li key={section.title}>
                      <a
                        href={`#section-${index + 1}`}
                        className="flex gap-3 border-l border-transparent py-2 pl-4 text-[0.8125rem] text-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        <span className="font-display text-[0.5625rem] tracking-[0.1em] text-muted/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={`section-${index + 1}`}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[0.625rem] tracking-[0.18em] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium leading-tight tracking-[-0.025em] text-ink">
                        {section.title}
                      </h2>
                    </div>
                    {section.paragraphs && (
                      <div className="mt-4 space-y-3 pl-0 md:pl-8">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 40)}
                            className="text-[0.9375rem] leading-[1.8] text-ink/70"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                    {section.list && (
                      <ul className="mt-4 space-y-2 pl-0 md:pl-8">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink/70"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-lime-dark" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {footer && <div className="mt-12">{footer}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
