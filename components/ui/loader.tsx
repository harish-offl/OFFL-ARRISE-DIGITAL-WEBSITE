"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/layout/logo-mark";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const seen = sessionStorage.getItem("arrise:visited");
    if (seen || reduce) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem("arrise:visited", "1");
    const timer = setTimeout(() => setVisible(false), 1150);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-night text-white"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="flex items-center gap-4">
            <LogoMark className="h-10 md:h-12" />
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                arrise
              </span>
              <span className="font-display text-2xl font-medium tracking-[-0.04em] text-lime md:text-4xl">
                .
              </span>
            </div>
          </div>
          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.32em] text-white/50">
            Partners in Progress
          </p>
          <div className="mt-10 h-px w-40 overflow-hidden bg-white/15">
            <motion.div
              className="h-full bg-lime"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

