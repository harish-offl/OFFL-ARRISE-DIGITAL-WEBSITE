import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import {
  DeliveredServices,
  ProjectGallery,
} from "@/components/sections/delivered-services";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  clientProjects,
  deliveredServices,
  getPortfolioProject,
  hasWebsite,
  SERVICE_LABELS,
} from "@/data/portfolio";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return clientProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project || project.type === "collaboration") return {};

  return {
    title: `${project.client} — Client Project`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.client} — Arrise Digital`,
      description: project.description,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project || project.type === "collaboration") notFound();
  // Legacy slugs (le-brew, bon-appetit, abs-utility-solutions) land here.
  if (project.slug !== slug) redirect(`/work/${project.slug}`);

  const index = clientProjects.findIndex((item) => item.slug === project.slug);
  const previous = clientProjects[(index - 1 + clientProjects.length) % clientProjects.length];
  const next = clientProjects[(index + 1) % clientProjects.length];
  const services = deliveredServices(project);
  const liveWebsite = hasWebsite(project);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.client,
    description: project.description,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    about: project.industry,
    keywords: project.categories.join(", "),
    url: `${site.url}/work/${project.slug}`,
    ...(liveWebsite
      ? { sameAs: project.website?.url, mainEntityOfPage: project.website?.url }
      : {}),
  };

  return (
    <>
      <PageHero
        dark
        label={`Our Work / Client Project ${project.projectNumber.replace(/\D+/g, "")}`}
        title={project.client}
        description={project.intro}
        breadcrumb={`Work / ${project.client}`}
        meta={[
          { label: "Client", value: project.client },
          { label: "Industry", value: project.industry },
          { label: "Project", value: project.projectNumber },
          { label: "Services", value: `${services.length}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to all projects
          </Link>
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/40">
            {services.length} service{services.length === 1 ? "" : "s"} delivered
          </span>
        </div>
      </PageHero>

      {/* SECTION 1 — Client cover + overview */}
      <section className="py-section">
        <div className="shell">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
            <div
              className="grain relative flex min-h-[16rem] flex-col items-center justify-center gap-4 px-6 py-16 text-center md:min-h-[22rem]"
              style={{
                backgroundImage: `linear-gradient(140deg, ${project.accent} 0%, #0D0D0D 78%)`,
              }}
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-white/70">
                {project.projectNumber}
              </span>
              <span className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-[-0.05em] text-white">
                {project.monogram}
              </span>
              <span className="max-w-xl font-display text-lg font-medium tracking-[-0.02em] text-white md:text-2xl">
                {project.client}
              </span>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                {project.industry}
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16 lg:mt-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="01 / Overview"
                title="The starting point."
                description={project.intro}
              />
              <p className="mt-8 font-body text-[0.9375rem] leading-relaxed text-muted md:text-base">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.6875rem] text-ink/70"
                  >
                    {SERVICE_LABELS[service]}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
                  <dl className="space-y-5">
                    <div>
                      <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                        Project
                      </dt>
                      <dd className="mt-1 font-display text-base font-medium text-ink">
                        {project.projectNumber}
                      </dd>
                    </div>
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
                        {services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full border border-line px-2.5 py-1 text-[0.625rem] text-ink/60"
                          >
                            {SERVICE_LABELS[service]}
                          </span>
                        ))}
                      </dd>
                    </div>
                    {liveWebsite && (
                      <div>
                        <dt className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                          Live site
                        </dt>
                        <dd className="mt-1 break-all text-sm text-ink/70">
                          {project.website?.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
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

      {/* SECTION 2 — Services delivered */}
      <DeliveredServices project={project} />

      {/* SECTION 3 — Project gallery */}
      <ProjectGallery project={project} />

      {/* SECTION 4 — External project link */}
      {liveWebsite && project.website && (
        <section className="border-t border-line py-14 md:py-20">
          <div className="shell">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center md:p-12">
                <div>
                  <span className="eyebrow mb-4 block text-lime-dark">04 / Live website</span>
                  <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
                    See the finished website in the wild.
                  </h2>
                  <p className="mt-3 break-all font-mono text-[0.625rem] tracking-[0.1em] text-muted">
                    {project.website.url.replace(/^https?:\/\//, "")}
                  </p>
                </div>
                <a
                  href={project.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-lime px-8 font-body fw-semibold text-sm uppercase tracking-[0.06em] text-[#140A04] transition-colors duration-500 ease-out-expo hover:bg-[#E85D00]"
                >
                  Visit live website
                  <ExternalLink className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* SECTION 5 — Project navigation */}
      <section className="border-t border-line py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to all projects
            </Link>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              {project.projectNumber}
            </span>
          </div>

          <div className="mt-10 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
            {previous && previous.slug !== project.slug && (
              <Link
                href={`/work/${previous.slug}`}
                className="group flex flex-col justify-between gap-6 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink/30 md:p-8"
              >
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                  Previous project
                </span>
                <span>
                  <span className="block font-display text-xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-lime-dark md:text-2xl">
                    {previous.client}
                  </span>
                  <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    {previous.industry}
                  </span>
                </span>
              </Link>
            )}

            {next && next.slug !== project.slug && (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col justify-between gap-6 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink/30 md:p-8 sm:items-end sm:text-right"
              >
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                  Next project
                </span>
                <span>
                  <span className="inline-flex items-center gap-2 font-display text-xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-lime-dark md:text-2xl">
                    {next.client}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    {next.industry}
                  </span>
                </span>
              </Link>
            )}
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
