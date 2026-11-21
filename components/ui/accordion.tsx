"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: string };

export function Accordion({
  items,
  dark = false,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  dark?: boolean;
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <div className={cn("divide-y", dark ? "divide-white/15" : "divide-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors md:py-7",
                  dark ? "text-ink hover:text-lime" : "text-ink hover:text-muted",
                )}
              >
                <span className="flex items-start gap-4 md:gap-8">
                  <span
                    className={cn(
                      "mt-1 font-display text-[0.6875rem] tracking-[0.18em]",
                      dark ? "text-white/40" : "text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-medium tracking-[-0.01em] md:text-xl">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo",
                    isOpen
                      ? "rotate-45 border-transparent bg-lime text-[#140A04]"
                      : dark
                        ? "border-white/25 text-ink group-hover:border-white"
                        : "border-ink/20 text-ink group-hover:border-ink",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-prose pb-7 pl-0 text-[0.9375rem] leading-relaxed md:pl-[3.75rem]",
                      dark ? "text-white/65" : "text-muted",
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
