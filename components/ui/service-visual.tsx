import { cn } from "@/lib/utils";
import type { ServiceVisual as ServiceVisualType } from "@/data/services";

const barHeights = [38, 62, 30, 78, 52, 88, 44, 70, 34, 60, 46, 82, 28, 66, 50, 74];

export function ServiceVisual({
  type,
  className,
  label,
}: {
  type: ServiceVisualType;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("grain relative h-full w-full overflow-hidden", className)}>
      {type === "social" && <Social />}
      {type === "video" && <Video />}
      {type === "web" && <Web />}
      {type === "ai" && <Ai />}
      {label && (
        <span className="absolute bottom-4 left-4 z-20 rounded-full border border-white/10 bg-night/90 px-3 py-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}

function Social() {
  return (
    <div className="relative h-full w-full bg-[#140A05]">
      <div className="noise-grid absolute inset-0 opacity-60" />
      <div className="absolute -left-10 -top-10 size-40 rounded-full bg-lime/50 blur-2xl" />

      <div className="absolute left-[7%] top-[11%] h-[80%] w-[43%] rotate-[-5deg] rounded-[1.75rem] border-[5px] border-ink bg-paper p-1.5 shadow-[0_30px_60px_-20px_rgba(17,17,17,0.45)] transition-transform duration-700 group-hover:rotate-[-3deg]">
        <div className="flex h-full flex-col rounded-[1.4rem] bg-night p-2.5">
          <div className="mx-auto h-1 w-8 rounded-full bg-white/30" />
          <div className="mt-3 flex items-center gap-2">
            <div className="size-6 rounded-full bg-lime" />
            <div className="flex-1">
              <div className="h-1.5 w-14 rounded-full bg-white/70" />
              <div className="mt-1 h-1 w-9 rounded-full bg-white/25" />
            </div>
            <div className="size-4 rounded-full border border-white/25" />
          </div>
          <div className="mt-2.5 grid flex-1 grid-cols-3 grid-rows-3 gap-1">
            {[
              "bg-[#FF6B00]","bg-[#4A1F08]","bg-[#3A1A08]","bg-[#FF8A2B]","bg-[#4A1F08]","bg-[#FF6B00]","bg-[#1A0D06]","bg-[#FFB15C]","bg-[#B24A00]",
            ].map((tone, index) => (
              <div key={index} className={cn("rounded-[3px]", tone)} />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="h-1 w-8 rounded-full bg-white/40" />
            <div className="h-1 w-4 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="absolute right-[5%] top-[16%] w-[44%] rotate-[3deg] rounded-xl border border-white/10 bg-night-2 p-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:rotate-[1deg]">
        <div className="flex items-center justify-between">
          <span className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ink/50">
            Content performance
          </span>
          <span className="size-1.5 rounded-full bg-lime-dark" />
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[34, 56, 42, 72, 48, 88, 64, 94].map((height, index) => (
            <div
              key={index}
              className={cn("flex-1 rounded-t-sm", index === 7 ? "bg-lime" : "bg-white/15")}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-white/[0.04] p-2">
            <div className="h-1 w-6 rounded-full bg-ink/20" />
            <div className="mt-1.5 font-display text-[0.625rem] font-semibold">Reach</div>
          </div>
          <div className="rounded-md bg-lime p-2">
            <div className="h-1 w-6 rounded-full bg-ink/30" />
            <div className="mt-1.5 font-display text-[0.625rem] font-semibold text-[#140A04]">Saves</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[12%] right-[8%] flex items-center gap-2 rounded-full border border-white/10 bg-night px-3 py-2 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg">
        <span className="size-1.5 rounded-full bg-lime" />
        Always on
      </div>
    </div>
  );
}

function Video() {
  return (
    <div className="relative h-full w-full bg-[#191919] p-4 md:p-5">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#FF6B00_0,transparent_45%),radial-gradient(circle_at_80%_60%,#C25400_0,transparent_45%)]" />
      <div className="relative flex gap-2">
        <div className="relative aspect-video flex-1 overflow-hidden rounded-md bg-gradient-to-br from-[#1A0A04] via-[#B24A00] to-[#FF6B00]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,210,150,0.4),transparent_60%)]" />
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#FF5C5C]" />
            <span className="text-[0.4375rem] uppercase tracking-[0.18em] text-white/60">Rec</span>
          </div>
          <div className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[0.4375rem] tracking-widest text-white/70">
            00:24
          </div>
          <div className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
            <span className="ml-0.5 text-[0.5rem] text-white">▶</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-6 items-end gap-[2px] px-2 pb-1">
            {barHeights.slice(0, 24).map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-full bg-white/40"
                style={{ height: `${Math.max(10, height / 2.4)}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex w-[30%] flex-col gap-1.5">
          {[
            "from-[#FF6B00] to-[#8A3500]",
            "from-[#FF8A2B] to-[#B24A00]",
            "from-[#FFB15C] to-[#4A1F08]",
          ].map((tone, index) => (
            <div
              key={index}
              className={cn(
                "relative flex-1 overflow-hidden rounded bg-gradient-to-br",
                tone,
                index === 0 && "ring-1 ring-lime",
              )}
            >
              <span className="absolute bottom-1 left-1 text-[0.375rem] tracking-widest text-black/50">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-3 flex items-center gap-1.5">
        {barHeights.map((height, index) => (
          <span
            key={index}
            className={cn(
              "flex-1 rounded-full",
              index > 5 && index < 12 ? "bg-lime" : "bg-white/20",
            )}
            style={{ height: `${height / 4}px` }}
          />
        ))}
      </div>

      <div className="relative mt-3 flex gap-1.5">
        <div className="flex-1 rounded-sm bg-lime px-2 py-1.5">
          <span className="text-[0.4375rem] font-semibold uppercase tracking-[0.14em] text-[#140A04]">Reel 01
          </span>
        </div>
        <div className="flex-1 rounded-sm bg-white/10 px-2 py-1.5">
          <span className="text-[0.4375rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            Reel 02
          </span>
        </div>
        <div className="flex-1 rounded-sm bg-white/10 px-2 py-1.5">
          <span className="text-[0.4375rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            Short 01
          </span>
        </div>
      </div>
    </div>
  );
}

function Web() {
  return (
    <div className="relative h-full w-full bg-[#140A05] p-4 md:p-5">
      <div className="absolute -right-8 -top-8 size-40 rounded-full bg-lime/20 blur-2xl" />
      <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#140A05] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#1A0D06] px-3 py-2">
          <span className="size-1.5 rounded-full bg-[#FF6058]" />
          <span className="size-1.5 rounded-full bg-[#FFBD2E]" />
          <span className="size-1.5 rounded-full bg-[#28C840]" />
          <div className="ml-2 h-3 flex-1 rounded-full bg-white/10" />
        </div>
        <div className="flex h-[calc(100%-28px)]">
          <div className="flex w-[58%] flex-col justify-between p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="font-display text-[0.5rem] font-bold tracking-[0.08em]">ARRISE</div>
              <div className="flex gap-1.5">
                <div className="h-1 w-4 rounded-full bg-ink/20" />
                <div className="h-1 w-4 rounded-full bg-ink/20" />
                <div className="h-1 w-4 rounded-full bg-ink/20" />
              </div>
            </div>
            <div>
              <div className="text-[0.375rem] uppercase tracking-[0.2em] text-ink/40">Studio</div>
              <div className="mt-1.5 font-display text-[clamp(0.75rem,1.4vw,1.15rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                Digital
                <br />
                experiences
                <br />
                that convert.
              </div>
              <div className="mt-2 inline-flex rounded-full bg-lime px-2 py-1 text-[0.375rem] font-semibold uppercase tracking-widest">
                Start a project
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-1 w-8 rounded-full bg-ink/15" />
              <div className="h-1 w-5 rounded-full bg-ink/15" />
            </div>
          </div>
          <div className="relative flex-1 bg-[#111111]">
            <div className="absolute inset-3 rounded-sm bg-[radial-gradient(circle_at_40%_30%,#FF6B00,transparent_60%),radial-gradient(circle_at_70%_75%,#FFB15C,transparent_55%)]" />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
              <div className="font-display text-[0.5rem] uppercase tracking-widest text-white/50">
                01 / 04
              </div>
              <div className="size-4 rounded-full border border-white/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-1 right-3 w-[24%] rounded-[0.9rem] border-[3px] border-white/20 bg-night p-1 shadow-[0_18px_35px_-12px_rgba(17,17,17,0.5)]">
        <div className="rounded-[0.6rem] bg-night-2 p-1.5">
          <div className="mx-auto h-0.5 w-3 rounded-full bg-white/30" />
          <div className="mt-1.5 space-y-1">
            <div className="h-3 rounded-sm bg-[radial-gradient(circle_at_60%_30%,#FF6B00,#140A05)]" />
            <div className="h-1 w-6 rounded-full bg-white/50" />
            <div className="h-1 w-4 rounded-full bg-white/20" />
            <div className="h-2 w-7 rounded-full bg-lime" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ai() {
  return (
    <div className="relative h-full w-full bg-[#140A05] p-4 md:p-5">
      <div className="noise-grid absolute inset-0 opacity-40" />
      <div className="absolute -left-6 bottom-0 size-36 rounded-full bg-lime/25 blur-2xl" />

      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M80 80 C 150 80, 160 150, 220 150 S 300 120, 330 120"
          fill="none"
          stroke="#FF6B00"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          opacity="0.45"
        />
        <path
          d="M220 150 C 260 150, 270 220, 320 220"
          fill="none"
          stroke="#FF6B00"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          opacity="0.45"
        />
      </svg>

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="rounded-md border border-white/10 bg-night-2 px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded bg-lime/15 text-[0.5rem]">
                ⚡
              </span>
              <div>
                <div className="h-1 w-8 rounded-full bg-ink/70" />
                <div className="mt-0.5 h-1 w-5 rounded-full bg-ink/20" />
              </div>
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-[0.4375rem] font-semibold uppercase tracking-widest text-[#FF6B00] backdrop-blur">
            Workflow
          </div>
        </div>

        <div className="mx-auto w-[78%] space-y-1.5">
          <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-[#4A1F08] px-3 py-2 text-[0.5rem] leading-relaxed text-ink/80">
            New enquiry received
          </div>
          <div className="w-fit max-w-[88%] rounded-xl rounded-bl-sm border border-white/10 bg-night-2 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-lime-dark" />
              <span className="text-[0.5rem] font-semibold text-ink">Auto-reply sent</span>
            </div>
            <div className="mt-1 h-1 w-20 rounded-full bg-ink/15" />
            <div className="mt-0.5 h-1 w-14 rounded-full bg-ink/10" />
          </div>
          <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-[#FF6B00] px-3 py-2 text-[0.5rem] leading-relaxed text-white">
            Assigned to team · CRM updated
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-night-2/90 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-[#FF6B00]" />
            <span className="text-[0.4375rem] font-semibold uppercase tracking-[0.16em] text-ink/60">
              Follow-up automation
            </span>
          </div>
          <div className="flex h-3 w-6 items-center rounded-full bg-[#FF6B00] px-0.5">
            <span className="ml-auto size-2 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
