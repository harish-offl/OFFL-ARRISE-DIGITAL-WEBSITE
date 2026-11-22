"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site, socials } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import PillNav from "@/components/ui/pill-nav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-all duration-500 ease-out-expo",
          scrolled
            ? "border-b border-line bg-paper/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell grid h-[84px] grid-cols-[1fr_auto_1fr] items-center gap-6 lg:h-[92px]">
          <div className="justify-self-start">
            <Logo />
          </div>

          <div className="hidden lg:flex items-center justify-self-center gap-8">
            <PillNav
              items={mainNav.map((item) => ({ label: item.label, href: item.href }))}
              activeHref={pathname}
              itemStyle="pill"
              hoverEffect="fill"
              indicator="dot"
              surface="solid"
              collapse="never"
              size="md"
              ariaLabel="Primary navigation"
            />
          </div>

          <div className="justify-self-end flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex h-12 items-center gap-3 rounded-full bg-night pl-5 pr-4 font-body text-[0.75rem] fw-semibold uppercase tracking-[0.08em] text-white transition-all duration-500 ease-out-expo hover:bg-lime hover:text-[#0D0D0D]"
            >
              <span>Get a quote</span>
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-lime hover:text-lime lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[130] flex flex-col bg-paper text-ink lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(90%_90%_at_50%_120%,rgba(255,107,0,0.16),transparent_70%)]"
            />
            <div className="shell relative flex h-[84px] shrink-0 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-lime hover:text-lime"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="shell relative flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {mainNav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + index * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between border-b border-line py-4",
                        isActive(item.href) ? "text-lime" : "text-ink",
                      )}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted">
                          0{index + 1}
                        </span>
                        <span className="font-display text-[2rem] font-medium leading-tight tracking-[-0.03em]">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight className="size-5 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted">
                  Start a conversation
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block break-all font-body text-lg tracking-tight text-ink"
                >
                  {site.email}
                </a>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-lime hover:text-lime"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
                <ButtonLink
                  href="/contact"
                  variant="lime"
                  size="lg"
                  className="mt-6 w-full"
                  magnetic={false}
                >
                  Start a Project
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
