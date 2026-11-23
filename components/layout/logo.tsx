import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Arrise Digital — home"
      className={cn("group inline-flex h-14 items-center gap-2.5 md:h-16 md:gap-3", className)}
    >
      <Image
        src="/images/arrise-digital-logo.png"
        alt="Arrise Digital"
        width={500}
        height={500}
        priority={!dark}
        className="size-12 shrink-0 object-contain md:size-14"
      />
      <span
        className={cn(
          "whitespace-nowrap font-display text-[1.05rem] font-semibold leading-none tracking-[-0.03em] md:text-[1.25rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        Arrise <span className="text-[#F97316]">Digital</span>
      </span>
    </Link>
  );
}
