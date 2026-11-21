import type { Metadata } from "next";
import { Mail, MessageCircle, Instagram, ArrowUpRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Arrise Digital. Tell us about your business, your goals and the timeline. We reply personally — no automated sales sequence.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  {
    number: "01",
    title: "We read the brief",
    description: "Your enquiry reaches us directly. We review the context before replying.",
  },
  {
    number: "02",
    title: "We ask real questions",
    description: "A short conversation to understand the goal, constraints and scope.",
  },
  {
    number: "03",
    title: "You get a clear proposal",
    description: "Scope, timeline and cost — itemised, so you know what you are agreeing to.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Build Something Meaningful."
        description="Tell us what you're working on. The more context you share, the more useful our first reply will be — whether or not we end up working together."
        meta={[
          { label: "Reply", value: "Personal, not automated" },
          { label: "Availability", value: site.availability },
          { label: "Working", value: "Remote-first" },
          { label: "Channels", value: "Email · WhatsApp" },
        ]}
        breadcrumb="Contact"
      />

      <section className="py-section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="Project enquiry"
                title="Tell us about the project."
                description="A few details now saves a lot of back-and-forth later. Required fields are marked with an asterisk."
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="on-dark grain grain-dark overflow-hidden rounded-xl bg-night p-7 text-white md:p-8">
                  <p className="eyebrow text-lime">Direct line</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-5 block break-all font-display text-xl font-medium tracking-[-0.02em] text-white transition-colors hover:text-lime md:text-2xl"
                  >
                    {site.email}
                  </a>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#140A04] transition-colors hover:bg-accent"
                    >
                      <MessageCircle className="size-3.5" />
                      WhatsApp us
                    </a>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-lime hover:text-lime"
                    >
                      <Instagram className="size-3.5" />
                      Instagram
                    </a>
                  </div>

                  <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-white/55">
                    <p className="flex items-center gap-2.5">
                      <MapPin className="size-4 text-lime" />
                      {site.location}
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock3 className="size-4 text-lime" />
                      {site.availability}
                    </p>
                    <p className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-lime" />
                      Your details stay with us.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-line bg-surface p-7 md:p-8">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    What happens next
                  </p>
                  <ol className="mt-5 space-y-5">
                    {nextSteps.map((step) => (
                      <li key={step.number} className="flex gap-4">
                        <span className="mt-0.5 font-display text-[0.625rem] tracking-[0.14em] text-muted">
                          {step.number}
                        </span>
                        <div>
                          <p className="font-display text-sm font-medium text-ink">{step.title}</p>
                          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-4 rounded-xl border border-line p-5">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    Find us elsewhere
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-1 text-[0.75rem] text-ink/60 transition-colors hover:text-ink"
                      >
                        {social.label}
                        <ArrowUpRight className="size-3 opacity-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-section">
        <div className="shell">
          <SectionHeading
            label="Not ready for a form?"
            title="A direct message works too."
            description="If the form feels like too much, send a short email with what you are working on. We will take it from there."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-ink/30 md:p-7"
              >
                <Mail className="size-5 text-ink/50 transition-colors group-hover:text-ink" />
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">Email</p>
                  <p className="mt-2 break-all font-display text-base font-medium text-ink">
                    {site.email}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.07}>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-ink/30 md:p-7"
              >
                <MessageCircle className="size-5 text-ink/50 transition-colors group-hover:text-ink" />
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">WhatsApp</p>
                  <p className="mt-2 font-display text-base font-medium text-ink">{site.phone}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-ink/30 md:p-7"
              >
                <Instagram className="size-5 text-ink/50 transition-colors group-hover:text-ink" />
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">Instagram</p>
                  <p className="mt-2 font-display text-base font-medium text-ink">@arrisedigital</p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

