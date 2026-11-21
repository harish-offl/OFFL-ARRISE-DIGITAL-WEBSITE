import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="grain relative scroll-mt-24 overflow-hidden bg-lime py-section text-[#0D0D0D]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-[30rem] rounded-full border border-black/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full border border-black/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[14%] hidden font-serif text-[10rem] leading-none text-black/[0.08] lg:block"
      >
        ✦
      </div>

      <div className="shell relative">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.5rem,7.6vw,7rem)] fw-bold leading-[0.92] tracking-[-0.05em]">
            Let&apos;s build your
            <br />
            business{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em]">together.</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-night px-7 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-white shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:bg-[#1A1A1A]"
            >
              Let&apos;s Connect
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-black/55">
              Globally
            </span>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.6875rem] uppercase tracking-[0.16em] text-black/55">
            Arrise Digital — We don&apos;t just generate leads. We build businesses.
          </p>
          <a
            href="mailto:arrisedigital@gmail.com"
            className="font-body link-underline text-[0.6875rem] uppercase tracking-[0.16em] text-[#0D0D0D]"
          >
            arrisedigital@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
