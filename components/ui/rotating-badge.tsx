export function RotatingBadge({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative grid size-32 place-items-center md:size-36">
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
          <defs>
            <path
              id="badge-circle"
              d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
              fill="none"
            />
          </defs>
          <text className="fill-ink/60 font-display text-[13px] font-semibold uppercase tracking-[0.34em]">
            <textPath href="#badge-circle">
              Partners in progress · Arrise Digital ·
            </textPath>
          </text>
        </svg>
        <span className="grid size-16 place-items-center rounded-full bg-lime md:size-20 text-[#140A04]">
          <span className="text-xl">✦</span>
        </span>
      </div>
    </div>
  );
}
