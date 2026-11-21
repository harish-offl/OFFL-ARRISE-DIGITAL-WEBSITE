import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Arrise Digital — home"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span
        className={cn(
          "font-display text-[1.15rem] font-semibold leading-none tracking-[-0.02em] transition-colors md:text-[1.3rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        ARRISE
      </span>
      <LogoMark className="h-[0.9rem] w-[0.9rem] transition-transform duration-500 ease-out-expo group-hover:rotate-90 md:h-[1rem] md:w-[1rem]" />
      <span
        className={cn(
          "font-display text-[1.15rem] font-medium leading-none tracking-[-0.02em] transition-colors md:text-[1.3rem]",
          dark ? "text-white/55" : "text-muted",
        )}
      >
        DIGITAL
      </span>
    </Link>
  );
}
