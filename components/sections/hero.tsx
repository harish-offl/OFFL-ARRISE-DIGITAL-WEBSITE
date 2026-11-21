"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { RotatingBadge } from "@/components/ui/rotating-badge";

const ease = [0.16, 1, 0.3, 1] as const;

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const strategy = ["Strategy", "Content", "Technology"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-10 pt-[calc(84px+1.75rem)] md:pb-14 md:pt-[calc(92px+2.5rem)]">
      <div aria-hidden="true" className="noise-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[16%] -top-[28%] size-[62vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.3),rgba(255,107,0,0.1)_45%,transparent_70%)] blur-2xl" />
      <motion.div variants={container} initial={reduce ? false : "hidden"} animate="visible" className="shell relative">
        <motion.div variants={item} className="flex flex-col gap-2 border-b border-line pb-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-ink/50" />Partners in Progress</span>
          <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5"><span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-lime" />{site.availability}</span><span className="hidden sm:inline">Remote-first · Working worldwide</span></span>
        </motion.div>
        <motion.h1 variants={item} className="mt-9 text-center font-display text-[clamp(2.6rem,7.6vw,6.4rem)] fw-bold leading-[0.95] tracking-[-0.055em] text-ink md:mt-12"><span className="block">Partners in progress.</span><span className="block">We build businesses.</span></motion.h1>
        <div className="mt-10 md:mt-12">
          <div className="flex flex-col items-center text-center"><motion.div variants={item} className="hidden lg:block"><RotatingBadge /></motion.div><motion.p variants={item} className="font-body max-w-md text-[0.9375rem] leading-relaxed text-muted md:text-base lg:mt-8">Premium digital marketing, content creation, and tech solutions that transform brands into market leaders — engineered for growth, built for impact.</motion.p><motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/work" className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-lime px-6 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-[#0D0D0D] transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:bg-[#E85D00] sm:h-14 sm:px-7">Start a Project<ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" /></Link><Link href="/contact" className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-ink/25 px-6 font-body text-[0.6875rem] fw-semibold uppercase tracking-[0.08em] text-ink transition-all duration-500 ease-out-expo hover:border-ink hover:bg-ink/[0.03] sm:h-14 sm:px-7">Let&apos;s Talk<ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></motion.div></div>
        </div>
        <motion.div variants={item} className="mt-10 flex items-center justify-between border-t border-line pt-5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted md:mt-14"><span className="inline-flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full border border-ink/15"><ArrowDown className="size-3" /></span></span><span className="hidden sm:inline">Partners in Progress.</span></motion.div>
      </motion.div>
    </section>
  );
}
