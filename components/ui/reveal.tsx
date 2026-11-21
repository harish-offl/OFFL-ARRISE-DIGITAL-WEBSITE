"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  amount = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: i * 0.045, ease: easing },
  }),
};

export function RevealText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n").map((line) => line.split(" "));
  const srText = text.replace(/\n/g, " ");
  let wordIndex = 0;

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line.join(" ")}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{srText}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        transition={{ delayChildren: delay }}
      >
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.map((word, index) => {
              const current = wordIndex++;
              return (
                <span
                  key={`${word}-${current}`}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    variants={wordVariants}
                    custom={current + delay * 20}
                  >
                    {word}
                    {index < line.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function LineGrow({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1, delay, ease: easing }}
    />
  );
}
