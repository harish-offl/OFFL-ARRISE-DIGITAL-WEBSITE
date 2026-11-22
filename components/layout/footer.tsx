import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { site, socials } from "@/lib/site";
import { Logo } from "./logo";
import { BackToTop } from "./back-to-top";

export function Footer() {
  return (
    <footer className="on-dark grain grain-dark relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 size-[36rem] rounded-full bg-lime/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 bottom-0 size-[30rem] rounded-full border border-lime/10"
      />
      <div className="shell relative z-10 pb-8 pt-16 md:pt-20">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-lime">Partners in progress</span>
            <p className="mt-5 max-w-xl font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-white md:text-3xl">
              Partners in Progress.
              <br />
              We build businesses.
            </p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 font-body text-lg tracking-tight text-white md:text-xl"
          >
            <span className="link-underline break-all">{site.email}</span>
            <ArrowUpRight className="size-5 shrink-0 text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Premium digital marketing, content creation and tech solutions that transform brands
              into market leaders.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-lime hover:text-lime"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNav.explore} className="lg:col-span-2" />
          <FooterColumn title="Services" links={footerNav.services} className="lg:col-span-3" />

          <div className="lg:col-span-2">
            <p className="font-mono text-[0.625rem] fw-semibold uppercase tracking-[0.22em] text-white/40">
              Connect
            </p>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/60">
              <li>
                <a href={`mailto:${site.email}`} className="link-underline hover:text-white">
                  Email us
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-lime" />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60">
                {site.availability}
              </span>
            </div>
          </div>
        </div>

        <div className="relative -mx-1 select-none overflow-hidden">
          <p className="whitespace-nowrap font-display text-[clamp(3rem,13.5vw,13rem)] font-medium leading-[0.85] tracking-[-0.055em] text-white/[0.07]">
            ARRISE DIGITAL<span className="text-lime/50">.</span>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] text-white/40">
            <span>
              © 2025 {site.name}. All rights reserved.
            </span>
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="link-underline hover:text-white/70">
                {item.label}
              </Link>
            ))}
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.625rem] fw-semibold uppercase tracking-[0.22em] text-white/40">
        {title}
      </p>
      <ul className="mt-5 space-y-3 font-body text-sm text-white/60">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="link-underline hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

