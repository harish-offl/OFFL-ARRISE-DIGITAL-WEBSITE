import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.overview,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Arrise Digital`,
      description: project.tagline,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
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
        description={project.tagline}
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
                description={project.overview}
              />
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
                    {project.liveUrl && (
                      <div>
                        <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                          Live site
                        </dt>
                        <dd className="mt-1">
                          <ArrowLink href={project.liveUrl} external>
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

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
            <Reveal>
              <div className="flex h-full flex-col gap-6 rounded-xl border border-line bg-surface p-7 md:p-9">
                <span className="eyebrow text-ink/70">The challenge</span>
                <p className="text-[0.9375rem] leading-relaxed text-muted md:text-base">
                  {project.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-6 rounded-xl bg-night p-7 text-white md:p-9">
                <span className="eyebrow text-lime">The solution</span>
                <p className="text-[0.9375rem] leading-relaxed text-white/65 md:text-base">
                  {project.solution}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-lime py-12 text-[#140A04] md:py-16">
        <div className="shell relative">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-3">
              <span className="eyebrow-plain text-black/60">The outcome</span>
            </div>
            <div className="md:col-span-9">
              <Reveal>
                <p className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em]">
                  {project.outcome}
                </p>
              </Reveal>
              <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.14em] text-black/55">
                Described qualitatively — no client metrics are published without approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="02 / Selected frames"
            title="A look at the visual direction."
            description="A selection of the visual system and content approach created for this project."
          />
          <div className="mt-10">
            <ProjectGallery project={project} />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="eyebrow text-ink/70">Services delivered</span>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 border-b border-line pb-4 text-sm text-ink/75"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-lime-dark" />
                    {service}
                  </li>
                ))}
              </ul>
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
                <p className="mt-3 text-sm text-muted">{next.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ink">
                  View case study
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]">
                    <ProjectCover project={next} />
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

