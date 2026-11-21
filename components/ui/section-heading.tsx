import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "./reveal";

export function SectionLabel({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow font-mono", dark ? "text-lime" : "text-lime-dark", className)}>{children}</span>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  dark = false,
  className,
  titleClassName,
  descriptionClassName,
  align = "left",
  aside,
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  dark?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  align?: "left" | "center";
  aside?: ReactNode;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {label && (
        <Reveal>
          <SectionLabel dark={dark} className={cn(align === "center" && "justify-center")}>
            {label}
          </SectionLabel>
        </Reveal>
      )}
      <div className={cn("mt-6", aside && "md:flex md:items-end md:justify-between md:gap-12")}>
        <div className={cn(aside && "md:max-w-3xl")}>
          {typeof title === "string" ? (
            <RevealText
              as="h2"
              text={title}
              className={cn(
                "font-display text-display-md font-medium",
                dark ? "text-white" : "text-ink",
                titleClassName,
              )}
            />
          ) : (
            <Reveal>
              <h2
                className={cn(
                  "font-display text-display-md font-medium",
                  dark ? "text-white" : "text-ink",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            </Reveal>
          )}
          {description && (
            <Reveal delay={0.1}>
              <div
                className={cn(
                  "font-body mt-6 max-w-prose text-[0.9375rem] leading-relaxed md:text-base",
                  dark ? "text-white/60" : "text-muted",
                  align === "center" && "mx-auto",
                  descriptionClassName,
                )}
              >
                {description}
              </div>
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.15} className={cn(align === "center" ? "mt-8" : "mt-6 md:mt-0")}>
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
