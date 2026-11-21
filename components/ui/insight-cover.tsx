import type { Insight } from "@/data/insights";
import { insightTones } from "@/data/insights";
import { cn } from "@/lib/utils";

export function InsightCover({
  insight,
  index,
  className,
}: {
  insight: Insight;
  index: number;
  className?: string;
}) {
  const tone = insightTones[insight.category];

  return (
    <div
      className={cn("grain relative h-full w-full overflow-hidden", className)}
      style={{ background: `linear-gradient(140deg, ${tone.base}, ${tone.tint})`, color: tone.ink }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `linear-gradient(to right, ${tone.ink} 1px, transparent 1px), linear-gradient(to bottom, ${tone.ink} 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 size-64 rounded-full opacity-30"
        style={{ background: tone.accent }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-10 size-52 rounded-full border opacity-25"
        style={{ borderColor: tone.ink }}
      />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.22em] opacity-60">
          {insight.category}
        </span>
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.22em] opacity-40">
          Insight 0{index + 1}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="select-none font-serif text-[clamp(5rem,12vw,10rem)] italic leading-none opacity-80"
          style={{ color: tone.accent }}
        >
          “
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <span className="text-[0.5625rem] uppercase tracking-[0.2em] opacity-55">
          Arrise Digital · Field notes
        </span>
        <span
          className="grid size-8 place-items-center rounded-full border text-xs"
          style={{ borderColor: `${tone.ink}40` }}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
    </div>
  );
}
