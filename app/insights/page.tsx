import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { InsightsGrid } from "@/components/sections/insights-grid";
import { InsightCover } from "@/components/ui/insight-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { insights } from "@/data/insights";
import { readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical thinking on social media, video, web development, branding and automation from the Arrise Digital studio.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const featured = insights.find((insight) => insight.featured) ?? insights[0];
  const featuredIndex = insights.findIndex((insight) => insight.slug === featured.slug);
  const featuredTime = readingTime([
    featured.intro,
    ...featured.sections.flatMap((section) => section.paragraphs),
  ]);

  return (
    <>
      <PageHero
        label="Insights"
        title="Notes on Building Better Digital Work."
        description="Practical thinking on marketing, content, technology and growth. No recycled statistics, no filler — just what we have learned from doing the work."
        meta={[
          { label: "Articles", value: `${insights.length} published` },
          { label: "Topics", value: "Seven" },
          { label: "Format", value: "Field notes" },
          { label: "Author", value: "Arrise Digital" },
        ]}
        breadcrumb="Insights"
      />

      <section className="pb-section pt-12 md:pt-16">
        <div className="shell">
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid gap-8 border-b border-line pb-12 lg:grid-cols-12 lg:items-center lg:gap-12"
          >
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl">
                <div className="aspect-[16/10] transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.025]">
                  <InsightCover insight={featured} index={featuredIndex} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <span className="eyebrow text-ink/70">Featured insight</span>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                <span>{featured.category}</span>
                <span className="size-0.5 rounded-full bg-muted" />
                <span>{featuredTime} min read</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink">
                Read the insight
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          <div className="mt-12">
            <Reveal>
              <SectionHeading
                label="All insights"
                title="Browse the field notes."
                description="Filter by discipline or search for a topic you are working through."
              />
            </Reveal>
            <div className="mt-10">
              <InsightsGrid excludeSlug={featured.slug} />
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
