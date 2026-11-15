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

    // Nessuna misura sincrona della pagina: decide tutto l'observer.
    // Al primo avviso, ciò che è già nello schermo (o sopra) resta com'è;
    // ciò che è sotto viene nascosto e compare quando entra.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!el.dataset.comparsa) {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              el.dataset.comparsa = "visto";
              observer.unobserve(el);
            } else {
              el.dataset.comparsa = "attesa";
            }
          } else if (entry.isIntersecting) {
            el.dataset.comparsa = "dentro";
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    for (const el of targets) observer.observe(el);

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
