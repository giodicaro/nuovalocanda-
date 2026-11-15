"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Effetti globali lato browser, senza stato React:
 * 1. comparsa degli elementi [data-reveal] quando entrano nello schermo;
 * 2. scroll morbido con Lenis, solo su desktop con mouse e solo se
 *    l'utente non ha chiesto di ridurre il movimento.
 */
export function ClientEffects() {
  const pathname = usePathname();

  // 1. Comparsa allo scroll. Riparte a ogni cambio di pagina.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-comparsa])"),
    );
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.comparsa = "dentro";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const limit = window.innerHeight * 0.92;
    for (const el of targets) {
      // Ciò che è già visibile resta com'è: niente lampeggi al caricamento.
      if (el.getBoundingClientRect().top < limit) {
        el.dataset.comparsa = "visto";
        continue;
      }
      el.dataset.comparsa = "attesa";
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  // 2. Scroll morbido.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.095 });
      destroy = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
