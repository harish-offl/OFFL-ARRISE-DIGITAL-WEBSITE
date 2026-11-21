"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./chroma-grid.css";

export type ChromaItem = {
  /** Stable key. Falls back to `title` + index. */
  id?: string;
  /** Real project thumbnail. When omitted, a branded monogram plate is rendered. */
  image?: string;
  monogram?: string;
  title?: string;
  subtitle?: string;
  /** e.g. "PROJECT 05" */
  badge?: string;
  tags?: string[];
  /** e.g. "3 media assets" */
  meta?: string;
  /** e.g. "View project" */
  cta?: string;
  accent?: string;
  alt?: string;
  /**
   * INTERNAL route (e.g. "/work/smp-food-products").
   * Card navigation stays inside the site — external links belong on the
   * project detail page, never on the portfolio card.
   */
  href?: string;
  /** Optional click handler used when `href` is not supplied. */
  onSelect?: (item: ChromaItem) => void;
  /** Renders a static, non-interactive card (collaborations). */
  interactive?: boolean;
};

export type ChromaGridProps = {
  items?: ChromaItem[];
  columns?: number;
  minCardWidth?: number;
  gap?: number;
  radius?: number;
  softness?: number;
  damping?: number;
  fadeOut?: number;
  grayscale?: number;
  dim?: number;
  glow?: number;
  borderGlow?: number;
  reveal?: "spotlight" | "card";
  aspectRatio?: string;
  cardRadius?: number;
  showInfo?: boolean;
  frame?: boolean;
  theme?: "dark" | "light";
  className?: string;
  "aria-label"?: string;
};

const THEMES: Record<"dark" | "light", Record<string, string>> = {
  dark: {
    "--chroma-frame": "rgba(38, 35, 46, 0.66)",
    "--chroma-frame-edge": "rgba(255, 255, 255, 0.08)",
    "--chroma-frame-highlight": "rgba(255, 255, 255, 0.07)",
    "--chroma-frame-shadow":
      "0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)",
    "--chroma-tile": "linear-gradient(180deg, #3a3644 0%, #27242f 100%)",
    "--chroma-tile-edge": "rgba(255, 255, 255, 0.07)",
    "--chroma-tile-highlight": "rgba(255, 255, 255, 0.12)",
    "--chroma-tile-shadow": "0 4px 10px -4px rgba(0, 0, 0, 0.7)",
    "--chroma-media-edge": "rgba(255, 255, 255, 0.06)",
    "--chroma-well": "rgba(255, 255, 255, 0.08)",
    "--chroma-ink": "#f4f4f5",
    "--chroma-muted": "rgba(244, 244, 245, 0.55)",
    "--chroma-tag-edge": "rgba(255, 255, 255, 0.14)",
    "--chroma-hover": "brightness(1.12)",
    "--chroma-press": "brightness(0.85)",
  },
  light: {
    "--chroma-frame": "rgba(240, 240, 243, 0.8)",
    "--chroma-frame-edge": "rgba(24, 24, 27, 0.07)",
    "--chroma-frame-highlight": "rgba(255, 255, 255, 0.95)",
    "--chroma-frame-shadow":
      "0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)",
    "--chroma-tile": "linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)",
    "--chroma-tile-edge": "rgba(24, 24, 27, 0.08)",
    "--chroma-tile-highlight": "rgba(255, 255, 255, 1)",
    "--chroma-tile-shadow": "0 4px 10px -5px rgba(24, 24, 27, 0.25)",
    "--chroma-media-edge": "rgba(24, 24, 27, 0.06)",
    "--chroma-well": "rgba(24, 24, 27, 0.05)",
    "--chroma-ink": "#27272a",
    "--chroma-muted": "rgba(39, 39, 42, 0.55)",
    "--chroma-tag-edge": "rgba(24, 24, 27, 0.12)",
    "--chroma-hover": "brightness(0.97)",
    "--chroma-press": "brightness(0.92)",
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const falloffStops = (softness: number) => {
  const core = clamp(1 - softness, 0, 0.95);
  const stops: string[] = [];
  for (let i = 0; i <= 12; i += 1) {
    const t = i / 12;
    const u = clamp((t - core) / Math.max(0.0001, 1 - core), 0, 1);
    const alpha = 1 - u * u * u * (u * (u * 6 - 15) + 10);
    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(t * 100).toFixed(1)}%`);
  }
  return stops.join(", ");
};

export const ChromaGrid = ({
  items,
  columns = 3,
  minCardWidth = 260,
  gap = 16,
  radius = 260,
  softness = 0.6,
  damping = 0.45,
  fadeOut = 0.6,
  grayscale = 1,
  dim = 0.12,
  glow = 0.5,
  borderGlow = 1,
  reveal = "spotlight",
  aspectRatio = "3 / 2",
  cardRadius = 22,
  showInfo = true,
  frame = false,
  theme = "dark",
  className = "",
  "aria-label": ariaLabel,
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<{
    damping: number;
    fadeOut: number;
    spotlight: boolean;
  } | null>(null);
  const placeRef = useRef<(() => void) | null>(null);
  const data = items ?? [];

  settingsRef.current = {
    damping,
    fadeOut,
    spotlight: reveal !== "card",
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || data.length === 0) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    // Spotlight only makes sense with a real pointer — skip it on touch devices.
    const hoverCapable =
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? true;

    if (!hoverCapable) {
      root.setAttribute("data-static", "");
      return undefined;
    }

    const state = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      power: 0,
      target: 0,
      primed: false,
    };
    let raf = 0;
    let last = 0;

    const place = () => {
      const box = root.getBoundingClientRect();
      root.querySelectorAll<HTMLElement>("[data-chroma-area]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--chroma-ox", `${rect.left - box.left}px`);
        node.style.setProperty("--chroma-oy", `${rect.top - box.top}px`);
      });
    };
    placeRef.current = place;

    const frame = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      if (!s) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const follow = reduce
        ? 1
        : 1 - Math.exp(-dt / Math.max(0.01, s.damping * 0.32));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const span = state.target > state.power ? 0.1 : Math.max(0.02, s.fadeOut * 0.35);
      state.power += (state.target - state.power) * (reduce ? 1 : 1 - Math.exp(-dt / span));
      root.style.setProperty("--chroma-x", `${state.x.toFixed(2)}px`);
      root.style.setProperty("--chroma-y", `${state.y.toFixed(2)}px`);
      root.style.setProperty("--chroma-power", state.power.toFixed(4));
      const settled =
        Math.abs(state.tx - state.x) < 0.1 &&
        Math.abs(state.ty - state.y) < 0.1 &&
        Math.abs(state.target - state.power) < 0.002;
      if (settled) {
        state.power = state.target;
        root.style.setProperty("--chroma-power", state.power.toFixed(4));
        last = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (!settingsRef.current?.spotlight) return;
      const box = root.getBoundingClientRect();
      state.tx = event.clientX - box.left;
      state.ty = event.clientY - box.top;
      if (!state.primed || state.power < 0.02) {
        state.x = state.tx;
        state.y = state.ty;
        state.primed = true;
      }
      state.target = 1;
      wake();
    };

    const onLeave = () => {
      state.target = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(place);
    resizeObserver.observe(root);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    place();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      placeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  useLayoutEffect(() => {
    placeRef.current?.();
  });

  const rootStyle = {
    ...(THEMES[theme] ?? THEMES.dark),
    "--chroma-cols": Math.max(1, Math.round(columns)),
    "--chroma-min": `${Math.max(80, minCardWidth)}px`,
    "--chroma-gap": `${Math.max(0, gap)}px`,
    "--chroma-r": `${Math.max(20, radius)}px`,
    "--chroma-stops": falloffStops(clamp(softness, 0, 1)),
    "--chroma-gray": clamp(grayscale, 0, 1),
    "--chroma-dim": clamp(dim, 0, 0.9),
    "--chroma-glow": clamp(glow, 0, 1),
    "--chroma-border": clamp(borderGlow, 0, 1),
    "--chroma-fade": `${Math.max(0, fadeOut)}s`,
    "--chroma-ratio": aspectRatio,
    "--chroma-radius": `${Math.max(0, cardRadius)}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`chroma-grid${frame ? " has-frame" : ""}${className ? ` ${className}` : ""}`}
      data-reveal={reveal === "card" ? "card" : "spotlight"}
      style={rootStyle}
      aria-label={ariaLabel}
    >
      <div className="chroma-grid-inner">
        {data.map((item, index) => {
          const accent = item.accent ?? "#FF6B00";
          const key = item.id ?? `${item.title ?? "item"}-${index}`;
          const interactive =
            item.interactive ?? Boolean(item.href ?? item.onSelect);

          const cardStyle = {
            "--chroma-accent": accent,
            "--chroma-plate-a": accent,
            "--chroma-plate-b": "#141414",
            "--chroma-plate-ink": "#ffffff",
          } as CSSProperties;

          const body = (
            <>
              <span className="chroma-wash" aria-hidden="true" />
              <div className="chroma-media" data-chroma-area="">
                {item.image ? (
                  <>
                    <img
                      className="chroma-mono"
                      src={item.image}
                      alt={item.alt ?? item.title ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="chroma-color"
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </>
                ) : (
                  <>
                    <div className="chroma-plate chroma-plate-mono" aria-hidden="true">
                      <span className="chroma-monogram">{item.monogram ?? "—"}</span>
                      <span className="chroma-plate-label">{item.subtitle}</span>
                    </div>
                    <div className="chroma-plate chroma-plate-color" aria-hidden="true">
                      <span className="chroma-monogram">{item.monogram ?? "—"}</span>
                      <span className="chroma-plate-label">{item.subtitle}</span>
                    </div>
                  </>
                )}
                {(item.badge || (interactive && (item.image || item.monogram))) && (
                  <div className="chroma-overlay">
                    {item.badge && <span className="chroma-badge">{item.badge}</span>}
                    {interactive && (
                      <span className="chroma-arrow" aria-hidden="true">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    )}
                  </div>
                )}
                <span className="chroma-media-rim" aria-hidden="true" />
              </div>

              {showInfo && (item.title || item.subtitle) && (
                <div className="chroma-info">
                  {item.title && <span className="chroma-title">{item.title}</span>}
                  {item.subtitle && <span className="chroma-subtitle">{item.subtitle}</span>}
                </div>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="chroma-tags">
                  {item.tags.map((tag) => (
                    <span className="chroma-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {interactive && (item.cta || item.meta) && (
                <div className="chroma-footer">
                  {item.cta && (
                    <span className="chroma-cta">
                      {item.cta}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  )}
                  {item.meta && <span className="chroma-meta">{item.meta}</span>}
                </div>
              )}

              <span className="chroma-card-rim" aria-hidden="true" />
              <span className="chroma-card-glow" aria-hidden="true" />
            </>
          );

          if (item.href) {
            return (
              <Link
                key={key}
                href={item.href}
                className="chroma-card"
                data-chroma-area=""
                style={cardStyle}
                aria-label={
                  item.title
                    ? `${item.cta ?? "View project"}: ${item.title}`
                    : undefined
                }
              >
                {body}
              </Link>
            );
          }

          if (item.onSelect) {
            return (
              <button
                key={key}
                type="button"
                className="chroma-card"
                data-chroma-area=""
                style={cardStyle}
                onClick={() => item.onSelect?.(item)}
              >
                {body}
              </button>
            );
          }

          return (
            <article key={key} className="chroma-card" data-chroma-area="" style={cardStyle}>
              {body}
            </article>
          );
        })}
      </div>
      {frame && <span className="chroma-frame-rim" aria-hidden="true" />}
    </div>
  );
};

export default ChromaGrid;
