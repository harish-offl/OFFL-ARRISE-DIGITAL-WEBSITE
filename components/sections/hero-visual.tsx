import { ArrowRight } from "lucide-react";

export function HeroScene(_props?: { x?: unknown; y?: unknown }) {
  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] border border-ink/[0.06] bg-[#EFEBE2]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(17,17,17,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.055)_1px,transparent_1px)] [background-size:44px_44px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[20%] -top-[35%] size-[75%] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.42),rgba(255,107,0,0.12)_45%,transparent_70%)] blur-2xl"
        />

        <div className="absolute left-[5%] top-[16%] z-20 w-[36%] overflow-hidden rounded-[0.65rem] border border-ink/10 bg-white shadow-[0_24px_50px_-22px_rgba(17,17,17,0.35)]">
          <div className="flex items-center gap-1 border-b border-ink/[0.06] px-3 py-2">
            <span className="size-1.5 rounded-full bg-[#FF6058]" />
            <span className="size-1.5 rounded-full bg-[#FFBD2E]" />
            <span className="size-1.5 rounded-full bg-[#28C840]" />
            <span className="ml-auto h-1.5 w-12 rounded-full bg-ink/[0.06]" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-[0.5rem] font-bold tracking-[0.18em] text-ink">
                ARRISE
              </span>
              <span className="text-[0.45rem] text-lime">✦</span>
              <span className="font-display text-[0.5rem] font-medium tracking-[0.18em] text-muted">
                DIGITAL
              </span>
            </div>
            <p className="mt-3 text-[0.4rem] uppercase tracking-[0.2em] text-muted">
              Creative digital studio
            </p>
            <p className="mt-1.5 font-display text-[clamp(0.7rem,1.6vw,1.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-ink">
              We build
              <br />
              businesses,
              <br />
              not just
              <br />
              campaigns.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-lime px-2 py-1 text-[0.34rem] font-semibold uppercase tracking-[0.12em] text-[#0D0D0D]">
              Start a project
              <ArrowRight className="size-2" />
            </span>
          </div>
        </div>

        <div className="absolute left-[18%] top-[44%] z-10 h-[42%] w-[50%] overflow-hidden rounded-[0.55rem] border-[0.28rem] border-[#1A1A1A] bg-[#101010] shadow-[0_26px_55px_-25px_rgba(17,17,17,0.65)]">
          <div className="relative h-full w-full overflow-hidden bg-[#0B0B0B]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,#2C37D8_0%,transparent_42%),radial-gradient(circle_at_78%_58%,#FF6B00_0%,transparent_42%),radial-gradient(circle_at_45%_90%,#FFB15C_0%,transparent_48%)] opacity-90" />
            <div className="absolute inset-x-0 bottom-0 flex h-[18%] items-end gap-[2px] bg-gradient-to-t from-black/50 to-transparent px-2 pb-1.5">
              {[22, 34, 18, 42, 30, 48, 20, 36, 26, 44, 18, 38, 28, 46, 24, 32, 40, 22, 36, 30].map(
                (height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-full bg-white/55"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
            <div className="absolute left-2 top-2 font-display text-[0.35rem] uppercase tracking-[0.18em] text-white/60">
              NEW DROP · 00:24
            </div>
          </div>
        </div>

        <div className="absolute right-[3%] top-[6%] z-30 w-[31%] rotate-[4deg] overflow-hidden rounded-[0.85rem] border-[0.28rem] border-white bg-white shadow-[0_26px_55px_-22px_rgba(17,17,17,0.4)]">
          <div className="flex items-center gap-1 border-b border-ink/[0.06] px-2 py-1.5">
            <span className="size-1 rounded-full bg-[#FF6058]" />
            <span className="ml-auto h-0.5 w-5 rounded-full bg-ink/20" />
          </div>
          <div className="m-1 h-[7.2rem] rounded-[0.45rem] bg-[radial-gradient(circle_at_35%_25%,#FFD9B8_0%,#C98255_38%,#6E3B24_78%,#3A1F14_100%)] sm:h-[9rem] md:h-[11rem]">
            <div className="flex h-full flex-col justify-end p-2">
              <span className="font-display text-[0.35rem] uppercase tracking-[0.24em] text-white/80">
                New drop
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[7%] right-[4%] z-20 w-[32%] rounded-[0.45rem] bg-lime px-3 py-2 shadow-[0_18px_35px_-18px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.3rem] uppercase tracking-[0.2em] text-[#0D0D0D]/60">
              Follow-up time
            </span>
            <span className="text-[0.4rem] text-[#0D0D0D]/50">✦</span>
          </div>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p className="font-display text-[clamp(0.85rem,2.1vw,1.8rem)] font-medium leading-none tracking-[-0.04em] text-[#0D0D0D]">
              3h <span className="text-[0.5em]">→</span> 20m
            </p>
            <div className="flex w-[42%] items-end gap-[2px]">
              {[40, 72, 100, 66].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-[1px] bg-[#0D0D0D]"
                  style={{ height: `${height / 3}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-[4%] left-[4%] z-20 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/85 px-2.5 py-1.5 backdrop-blur">
          <span className="size-1 rounded-full bg-lime" />
          <span className="text-[0.32rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
            15M+ views
          </span>
        </div>
      </div>
    </div>
  );
}

