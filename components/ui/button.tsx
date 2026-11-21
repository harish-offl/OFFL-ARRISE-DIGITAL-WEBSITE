"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  lime: "bg-lime text-[#0D0D0D] hover:bg-[#E85D00] border border-transparent shadow-[0_0_0_1px_rgba(255,107,0,0.25)]",
  solid: "bg-night text-white hover:bg-lime hover:text-[#0D0D0D] border border-night",
  outline: "border border-ink/20 text-ink hover:bg-night hover:text-white",
  ghost: "border border-transparent text-ink hover:bg-ink/5",
  "dark-outline": "border border-white/25 text-white hover:bg-white hover:text-[#0D0D0D]",
  "dark-solid": "bg-white text-[#0D0D0D] hover:bg-lime border border-white",
};

const sizes = {
  md: "h-11 px-6 text-[0.8125rem]",
  lg: "h-14 px-8 text-sm",
};

type CommonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  arrow?: "right" | "up-right" | "none";
  magnetic?: boolean;
};

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.28;
    setPos({ x, y });
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function Inner({ children, arrow }: { children: ReactNode; arrow: CommonProps["arrow"] }) {
  return (
    <span className="relative z-10 inline-flex items-center justify-center gap-2 font-body fw-medium tracking-[0.01em]">
      <span>{children}</span>
      {arrow === "right" && (
        <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
      )}
      {arrow === "up-right" && (
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "lime",
  size = "md",
  className,
  arrow = "up-right",
  magnetic = true,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-body fw-semibold uppercase tracking-[0.06em] transition-colors duration-500 ease-out-expo",
    variants[variant],
    sizes[size],
    className,
  );

  const content = <Inner arrow={arrow}>{children}</Inner>;

  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

export function Button({
  children,
  variant = "lime",
  size = "md",
  className,
  arrow = "up-right",
  magnetic = true,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-body fw-semibold uppercase tracking-[0.06em] transition-colors duration-500 ease-out-expo disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const button = (
    <button className={classes} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex items-center gap-2 text-sm font-medium tracking-tight",
    className,
  );
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
