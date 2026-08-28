"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const springX = useSpring(x, { stiffness: 480, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 480, damping: 32, mass: 0.4 });

  useEffect(() => {
    const precisePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!precisePointer.matches || reducedMotion.matches) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="crosshair-cursor"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <span className="crosshair-cursor-ring" />
      <span className="crosshair-cursor-core" />
    </motion.div>
  );
}
