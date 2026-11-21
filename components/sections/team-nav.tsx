"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/data/team";

const ease = [0.16, 1, 0.3, 1] as const;

export function TeamNav({ members }: { members: TeamMember[] }) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");
  const reduce = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = members
      .map((member) => document.getElementById(member.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const measure = () => {
      const header = document.querySelector<HTMLElement>("header");
      const offset = (navRef.current?.offsetHeight ?? 0) + (header?.offsetHeight ?? 0) + 18;
      sections.forEach((section) => {
        section.style.scrollMarginTop = `${offset}px`;
      });
    };

    measure();
    window.addEventListener("resize", measure);

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));

        const active = sections
          .filter((section) => visible.get(section.id))
          .sort((a, b) => {
            const aTop = Math.abs(a.getBoundingClientRect().top - 200);
            const bTop = Math.abs(b.getBoundingClientRect().top - 200);
            return aTop - bTop;
          })[0];

        if (active) setActiveId(active.id);
      },
      {
        rootMargin: "-200px 0px -45% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [members]);

  useEffect(() => {
    const item = itemRefs.current[activeId];
    const scroller = scrollerRef.current;
    if (!item || !scroller) return;

    const target = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [activeId, reduce]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      setActiveId(id);
      window.history.replaceState(null, "", `#${id}`);
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce],
  );

  return (
    <nav
      ref={navRef}
      aria-label="Team members"
      className="sticky top-[84px] z-[110] border-b border-line bg-paper/90 backdrop-blur-xl lg:top-[92px]"
    >
      <div className="shell">
        <div
          ref={scrollerRef}
          className="no-scrollbar relative overflow-x-auto overscroll-x-contain"
        >
          <div className="flex w-max gap-1 py-2.5 lg:mx-auto lg:gap-2 lg:py-3">
            {members.map((member) => {
              const active = member.id === activeId;

              return (
                <a
                  key={member.id}
                  ref={(node) => {
                    itemRefs.current[member.id] = node;
                  }}
                  href={`#${member.id}`}
                  onClick={(event) => handleClick(event, member.id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group relative flex shrink-0 flex-col justify-center rounded-full px-4 py-2 text-left transition-colors duration-500 ease-out-expo sm:px-5",
                    active ? "text-ink" : "text-muted hover:bg-ink/[0.03] hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="team-nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-lime-soft"
                      transition={{ duration: reduce ? 0 : 0.5, ease }}
                    />
                  )}
                  <span className="relative flex items-center gap-2.5">
                    <span
                      className={cn(
                        "font-mono text-[0.5625rem] tracking-[0.18em] transition-colors duration-500",
                        active ? "text-lime-dark" : "text-muted/70",
                      )}
                    >
                      {member.number}
                    </span>
                    <span className="font-display text-[0.8125rem] fw-medium tracking-[-0.01em]">
                      {member.name}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "relative mt-0.5 hidden font-mono text-[0.5rem] uppercase tracking-[0.14em] md:ml-[1.55rem] md:block",
                      active ? "text-ink/55" : "text-muted",
                    )}
                  >
                    {member.designation}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-[2px] rounded-full bg-lime transition-transform duration-500 ease-out-expo",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    )}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
