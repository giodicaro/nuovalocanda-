"use client";

import { useEffect, useRef } from "react";

const formatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "Europe/Rome",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * L'ora locale di Venezia.
 *
 * - Sul server non si legge l'ora: l'HTML è uguale a ogni richiesta.
 * - L'orologio gira solo quando è visibile nello schermo.
 * - Ha misure fisse e `contain: strict`: l'aggiornamento di ogni secondo
 *   non costringe il browser a ricalcolare l'impaginazione della pagina.
 */
export function VeniceClock({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const tick = () => {
      el.textContent = formatter.format(new Date());
    };
    const start = () => {
      if (timer) return;
      tick();
      timer = window.setInterval(tick, 1000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return stop;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
      else stop();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        width: "4.4em",
        height: "1.05em",
        lineHeight: 1.05,
        contain: "strict",
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      ––:––:––
    </span>
  );
}
