"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || window.innerWidth < 1024) return;

    setEnabled(true);
    document.documentElement.classList.add("hide-native-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const holder = target?.closest?.("[data-cursor]");
      setLabel(holder?.getAttribute("data-cursor") ?? "");
    };

    const onLeave = () => setLabel("");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[300] hidden lg:block">
      <motion.div style={{ x: springX, y: springY }} className="relative">
        <motion.div
          animate={{
            width: label ? 86 : 12,
            height: label ? 86 : 12,
            backgroundColor: label ? "#FF6B00" : "#FAF6F2",
            color: "#140A04",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        >
          {label && (
            <span className="font-mono text-[10px] fw-semibold uppercase tracking-[0.16em]">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
