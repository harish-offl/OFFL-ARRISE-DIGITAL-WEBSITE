import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/data/team";
import { site } from "@/lib/site";

export function TeamProfiles() {
  return (
    <div>
      {team.map((member) => (
        <section
          key={member.id}
          id={member.id}
          aria-labelledby={`${member.id}-name`}
          className="border-b border-line py-14 md:py-20"
        >
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="hidden lg:col-span-1 lg:block">
                <Reveal>
                  <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-lime-dark">
                    {member.number}
                  </span>
                </Reveal>
              </div>

              <div className="lg:col-span-4">
                <Reveal delay={0.05}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-surface">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.imageAlt ?? member.name}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 100vw"
                        style={{ objectPosition: member.imagePosition ?? "center top" }}
                        className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#EFEBE2]">
                        <div aria-hidden="true" className="noise-grid absolute inset-0 opacity-70" />
                        <div
                          aria-hidden="true"
                          className="absolute -right-10 -top-12 size-44 rounded-full bg-lime/20 blur-2xl"
                        />
                        <span className="relative font-display text-[clamp(5rem,12vw,8rem)] fw-bold leading-none tracking-[-0.06em] text-ink/75">
                          {member.initials}
                        </span>
                        <span aria-hidden="true" className="absolute bottom-4 right-5 text-lime">
                          ✦
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:pt-3">
                <Reveal delay={0.1}>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Profile {member.number}
                  </p>
                  <h2
                    id={`${member.id}-name`}
                    className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] fw-bold leading-[0.98] tracking-[-0.045em] text-ink"
                  >
                    {member.name}
                  </h2>
                  <p className="mt-3 font-display text-lg font-medium tracking-[-0.02em] text-ink/70 md:text-xl">
                    {member.designation}
                  </p>
                  <p className="mt-6 max-w-xl font-body text-[0.9375rem] leading-relaxed text-muted md:text-base">
                    {member.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-5 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-500 ease-out-expo hover:border-ink"
                      >
                        Portfolio
                        <ExternalLink className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {member.whatsapp && (
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-5 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-500 ease-out-expo hover:border-ink"
                      >
                        WhatsApp
                        <Phone className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-night px-5 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-white transition-colors duration-500 ease-out-expo hover:bg-lime hover:text-[#0D0D0D]"
                    >
                      Email
                      <Mail className="size-3.5" />
                    </a>
                    <Link
                      href="/contact"
                      className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-5 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-500 ease-out-expo hover:border-ink"
                    >
                      Start a project
                      <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
