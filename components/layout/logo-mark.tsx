import { cn } from "@/lib/utils";

export function LogoMark({ className }: { dark?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-7 w-auto shrink-0", className)}
    >
      <path
        fill="#FF6B00"
        d="M20 0c.9 11.1 8.9 19.1 20 20-11.1.9-19.1 8.9-20 20C19.1 28.9 11.1 20.9 0 20 11.1 19.1 19.1 11.1 20 0Z"
      />
      <circle cx="20" cy="20" r="2.2" fill="#111111" />
    </svg>
  );
}
