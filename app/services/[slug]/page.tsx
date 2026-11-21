import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceVisual } from "@/components/ui/service-visual";
import { getProject } from "@/data/projects";
import { getService, services } from "@/data/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — Arrise Digital`,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const others = services.filter((item) => item.slug !== service.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    areaServed: "Worldwide",
    url: `${site.url}/services/${service.slug}`,
  };

  return (
    <>
      <PageHero
        dark
        label={`Service ${service.number} / 04`}
        title={service.headline}
        description={service.description}
        breadcrumb={service.title}
        meta={[
          { label: "Deliverables", value: `${service.deliverables.length} core` },
          {
            label: "Highlight",
            value: service.highlight ? service.highlight.value : "Built around the brief",
          },
          { label: "Engagement", value: "Project or retainer" },
          { label: "Related work", value: `${related.length} projects` },
        ]}
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="01 / Overview"
                title="What this looks like in practice."
                description="Every engagement starts with the business problem, not a preset package. The scope below is shaped around what the project actually needs."
              />
              <Reveal delay={0.1}>
                <div className="mt-10 overflow-hidden rounded-xl border border-line">
                  <div className="aspect-[16/10]">
                    <ServiceVisual type={service.visual} label={service.title} />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="rounded-xl border border-line bg-night p-6 md:p-8">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    What you get
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-lime"><Check className="size-2.5 text-[#140A04]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {service.highlight && (
                <Reveal delay={0.16}>
                  <div className="mt-4 rounded-xl bg-night p-6 text-ink md:p-8">
                    <p className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em] text-lime">
                      {service.highlight.value}
                    </p>
                    <p className="mt-3 text-sm text-white/70">{service.highlight.label}</p>
                    {service.highlight.note && (
                      <p className="mt-4 border-t border-white/10 pt-3 text-[0.6875rem] leading-relaxed text-white/35">
                        {service.highlight.note}
                      </p>
                    )}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.22}>
                <div className="mt-4">
                  <ButtonLink href="/contact" variant="solid" size="md" arrow="up-right">
                    Discuss this service
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="02 / Why it matters"
            title="The outcome is the point."
            description="These are the practical differences a considered engagement should make to the business."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.07} className="h-full">
                <div className="flex h-full flex-col justify-between gap-10 bg-paper p-6 transition-colors duration-500 hover:bg-night-2 md:p-8">
                  <span className="font-display text-[0.625rem] tracking-[0.18em] text-muted">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  label="03 / How it works"
                  title={
                    <>
                      A clear path
                      <br />
                      from brief
                      <br />
                      to outcome.
                    </>
                  }
                  description="The exact steps flex with the scope, but the sequence stays consistent."
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-t border-line">
                {service.process.map((step, index) => (
                  <Reveal key={step.title} delay={index * 0.05}>
                    <li className="group grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6 md:gap-8 md:py-7">
                      <span className="mt-1 font-display text-[0.625rem] tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-ink">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line py-section">
          <div className="shell">
            <SectionHeading
              label="04 / Related work"
              title="See it in context."
              aside={
                <ArrowLink href="/work">All projects</ArrowLink>
              }
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
              {related.slice(0, 2).map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.08}>
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor="View"
                    className="group relative block aspect-[16/11] overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]">
                      <ProjectCover project={project} />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                label="05 / FAQ"
                title={
                  <>
                    Questions about
                    <br />
                    this service.
                  </>
                }
                description="A few things worth knowing before we start."
              />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <div className="shell">
          <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">Other services</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors duration-300 hover:bg-night-2"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-[0.5625rem] tracking-[0.16em] text-muted">
                    {item.number}
                  </span>
                  <span className="font-display text-sm font-medium text-ink">{item.title}</span>
                </span>
                <ArrowUpRight className="size-4 text-ink/40 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
