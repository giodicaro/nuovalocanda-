"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Leggera inclinazione che segue il mouse. Solo con mouse e solo se
 * l'utente non ha chiesto di ridurre il movimento. Nessuna libreria.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        el.style.transform = `perspective(1100px) rotateY(${(x * 5).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg) translate3d(${(x * -10).toFixed(1)}px, ${(y * -8).toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
