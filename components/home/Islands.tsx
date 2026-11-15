"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

/**
 * Parti interattive della home che stanno sotto il primo schermo:
 * lo slider delle sistemazioni e il modulo di richiesta.
 *
 * Nell'HTML c'è una versione statica (`fallback`, scritta dal server).
 * Il codice interattivo si scarica e si attiva solo quando la parte si
 * avvicina allo schermo. Così il primo caricamento resta leggero, e
 * senza JavaScript il contenuto statico è comunque visibile.
 */

const RoomsSlider = lazy(() =>
  import("./RoomsSlider").then((mod) => ({ default: mod.RoomsSlider })),
);

const RequestForm = lazy(() =>
  import("@/components/book/RequestForm").then((mod) => ({ default: mod.RequestForm })),
);

function useNearViewport<T extends Element>(margin = "800px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, near] as const;
}

type IslandProps = {
  fallback: ReactNode;
  lang: Locale;
  common: Dictionary["common"];
};

export function RoomsIsland({ fallback, lang, common, t }: IslandProps & { t: Dictionary["rooms"] }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={fallback}>
          <RoomsSlider lang={lang} t={t} common={common} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

export function FormIsland({ fallback, lang, common, t }: IslandProps & { t: Dictionary["form"] }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={fallback}>
          <RequestForm lang={lang} t={t} common={common} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
