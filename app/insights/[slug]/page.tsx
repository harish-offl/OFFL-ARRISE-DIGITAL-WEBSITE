import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { InsightCover } from "@/components/ui/insight-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getInsight, insights } from "@/data/insights";
import { readingTime, slugify } from "@/lib/utils";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: `${insight.title} — Arrise Digital`,
      description: insight.excerpt,
      url: `${site.url}/insights/${insight.slug}`,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const time = readingTime([
    insight.intro,
    ...insight.sections.flatMap((section) => section.paragraphs),
  ]);

  const related = insights
    .filter((item) => item.slug !== insight.slug)
    .sort((a, b) => {
      const aMatch = a.category === insight.category ? 0 : 1;
      const bMatch = b.category === insight.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    articleSection: insight.category,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/insights/${insight.slug}`,
    inLanguage: "en",
  };

  return (
    <>
      <PageHero
        label={insight.category}
        title={insight.title}
        description={insight.intro}
        breadcrumb={`Insights / ${insight.title}`}
        meta={[
          { label: "Author", value: "Arrise Digital" },
          { label: "Reading time", value: `${time} min` },
          { label: "Category", value: insight.category },
          { label: "Format", value: "Field note" },
        ]}
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  On this page
                </p>
                <nav aria-label="Article sections" className="mt-4 border-l border-line">
                  {insight.sections.map((section, index) => (
                    <a
                      key={section.heading}
                      href={`#${slugify(section.heading)}`}
                      className="group flex gap-3 border-l border-transparent py-2 pl-4 text-[0.8125rem] text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <span className="font-display text-[0.5625rem] tracking-[0.1em] text-muted/70">
                        0{index + 1}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  ))}
                  <a
                    href="#takeaways"
                    className="group flex gap-3 border-l border-transparent py-2 pl-4 text-[0.8125rem] text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <span className="font-display text-[0.5625rem] tracking-[0.1em] text-muted/70">
                      ✦
                    </span>
                    <span>Key takeaways</span>
                  </a>
                </nav>
                <div className="mt-8 rounded-lg border border-line bg-surface p-4">
                  <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                    Written by
                  </p>
                  <p className="mt-2 font-display text-sm font-medium text-ink">Arrise Digital</p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                    The studio&apos;s notes on building brands, content and digital products.
                  </p>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-8 lg:col-start-5">
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="aspect-[16/9]">
                  <InsightCover
                    insight={insight}
                    index={insights.findIndex((item) => item.slug === insight.slug)}
                  />
                </div>
              </div>

              <div className="mt-10 space-y-12">
                {insight.sections.map((section, index) => (
                  <Reveal key={section.heading}>
                    <section
                      id={slugify(section.heading)}
                      className="scroll-mt-28"
                      aria-labelledby={`${slugify(section.heading)}-heading`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-[0.625rem] tracking-[0.18em] text-muted">
                          0{index + 1}
                        </span>
                        <h2
                          id={`${slugify(section.heading)}-heading`}
                          className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium leading-tight tracking-[-0.03em] text-ink"
                        >
                          {section.heading}
                        </h2>
                      </div>
                      <div className="mt-5 space-y-4 pl-0 md:pl-9">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 40)}
                            className="text-[0.9375rem] leading-[1.8] text-ink/70 md:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <div
                id="takeaways"
                className="mt-14 scroll-mt-28 rounded-xl bg-lime p-7 md:p-9"
              >
                <p className="eyebrow-plain text-ink/60">Key takeaways</p>
                <ul className="mt-5 space-y-3">
                  {insight.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink/80"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#0D0D0D]" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-base font-medium text-ink">
                    Want to apply this to your business?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Tell us what you are working on. We will tell you honestly if we can help.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-night px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1A1A1A]"
                >
                  Start a conversation
                  <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="Keep reading"
            title="Related field notes."
            aside={
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ink"
              >
                All insights
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/insights/${item.slug}`} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-[16/10] transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.03]">
                    <InsightCover
                      insight={item}
                      index={insights.findIndex((entry) => entry.slug === item.slug)}
                    />
                  </div>
                </div>
                <p className="mt-4 text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-medium leading-tight tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

