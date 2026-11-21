import { cn } from "@/lib/utils";

export function Marquee({
  items,
  reverse = false,
  dark = false,
  className,
  itemClassName,
  speed,
}: {
  items: string[];
  reverse?: boolean;
  dark?: boolean;
  className?: string;
  itemClassName?: string;
  speed?: "fast" | "normal" | "slow";
}) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap px-6 font-display text-[clamp(1.6rem,4.2vw,3.75rem)] font-medium uppercase leading-none tracking-[-0.02em] md:px-9",
              itemClassName,
            )}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "select-none text-[clamp(0.9rem,1.6vw,1.4rem)]",
              dark ? "text-lime" : "text-ink/30",
            )}
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y py-6 md:py-8",
        dark ? "border-white/10 bg-night text-white" : "border-line bg-paper text-ink",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          speed === "fast" && "[animation-duration:24s]",
          speed === "slow" && "[animation-duration:58s]",
        )}
      >
        {content}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {content}
        </div>
      </div>
    </div>
  );
}
