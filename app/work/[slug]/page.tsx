import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPortfolioProject, clientProjects, type PortfolioProject } from "@/data/portfolio";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return clientProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Arrise Digital`,
      description: project.description,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project || project.type === "collaboration") notFound();

  const index = clientProjects.findIndex((item) => item.slug === project.slug);
  const next = clientProjects[(index + 1) % clientProjects.length];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    about: project.industry,
    keywords: project.categories.join(", "),
    url: `${site.url}/work/${project.slug}`,
  };

  return (
    <>
      <PageHero
        dark
        label={`Case study / ${project.industry}`}
        title={project.title}
        description={project.description}
        breadcrumb={`Work / ${project.title}`}
        meta={[
          { label: "Client", value: project.client },
          { label: "Industry", value: project.industry },
          { label: "Disciplines", value: `${project.categories.length}` },
          { label: "Services", value: `${project.services.length}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/20 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-white/60"
            >
              {category}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="01 / Overview"
                title="The starting point."
                description={project.description}
              />
              <p className="mt-8 font-body text-[0.9375rem] leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
                  <dl className="space-y-5">
                    <div>
                      <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                        Client
                      </dt>
                      <dd className="mt-1 font-display text-base font-medium text-ink">
                        {project.client}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                        Industry
                      </dt>
                      <dd className="mt-1 text-sm text-ink/70">{project.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                        Services delivered
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full border border-line px-2.5 py-1 text-[0.625rem] text-ink/60"
                          >
                            {service}
                          </span>
                        ))}
                      </dd>
                    </div>
                    {project.website && (
                      <div>
                        <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                          Live site
                        </dt>
                        <dd className="mt-1">
                          <ArrowLink href={project.website} external>
                            Visit the website
                          </ArrowLink>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-7 border-t border-line pt-5">
                    <ButtonLink href="/contact" variant="solid" size="md" arrow="up-right">
                      Start a similar project
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {next && next.slug !== project.slug && (
        <section className="border-t border-line py-12 md:py-16">
          <div className="shell">
            <Link
              href={`/work/${next.slug}`}
              data-cursor="View"
              className="group grid gap-8 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-4">
                <span className="eyebrow text-ink/70">Next project</span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-muted">
                  {next.title}
                </h2>
                <p className="mt-3 text-sm text-muted">{next.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ink">
                  View case study
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-paper">
                  <div className="relative h-full flex flex-col items-center justify-center p-10" style={{ backgroundColor: "#f4f0e8" }}>
                    <span className="text-[6rem] font-display font-bold select-none opacity-20">
                      {next.title.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
