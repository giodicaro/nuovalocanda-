"use client";

import { useEffect, useRef } from "react";
import { CELL, COLS, GAP, ROWS } from "./mosaic-grid";

/**
 * Le tessere della mappa a mosaico.
 *
 * Nell'HTML c'è solo un disegno semplice (terraferma, ponte, Venezia).
 * Le circa 600 tessere sono disegnate nel browser quando la mappa entra
 * nello schermo: così non pesano sulla pagina e non rallentano l'avvio.
 * Senza JavaScript resta visibile il disegno semplice.
 */

type Kind = "land" | "locanda" | "bridge" | "venice" | "canal" | "lagoon";

/** Numero pseudo-casuale stabile: il mosaico è sempre lo stesso. */
const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) =>
  ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

function kindAt(x: number, y: number): Kind | null {
  const coast = 7.4 + 1.5 * Math.sin(y * 0.8 + 0.6);

  if (x === 5 && y === 9) return "locanda";
  if (x < coast) return "land";

  const venice =
    inEllipse(x, y, 26, 7.6, 8.4, 4.2) ||
    inEllipse(x, y, 19.6, 6.9, 2.7, 2.5) ||
    inEllipse(x, y, 33.6, 9.4, 3.5, 2.1) ||
    inEllipse(x, y, 25, 14.4, 6.6, 1.05);

  if (venice) {
    // Il Canal Grande: una "S" rovesciata dentro la città.
    const canalY = 7.6 + 2.3 * Math.sin((x - 21) * 0.52);
    if (x >= 20 && x <= 31 && y < 12 && Math.abs(y - canalY) < 0.62) return "canal";
    return "venice";
  }

  if (y === 7 && x < 18) return "bridge";

  // Ai bordi mancano alcune tessere, come in un mosaico vero.
  const edge = Math.min(x, COLS - 1 - x, y, ROWS - 1 - y);
  if (edge < 2 && hash(x, y) < 0.42) return null;
  if (hash(x + 9, y + 3) < 0.05) return null;
  return "lagoon";
}

const fills: Record<Kind, string[]> = {
  land: ["var(--color-sabbia)", "#e2cfa9", "#d9c498"],
  locanda: ["var(--color-terracotta)"],
  bridge: ["var(--color-legno)"],
  venice: ["var(--color-terracotta)", "var(--color-mattone)", "#c7562a", "#e07a47"],
  canal: ["#9fc0ad"],
  lagoon: ["#b9d2c0", "#a7c6b3", "#c6dbc9", "#96bba6"],
};

const GROUPS = 10;

/** Le tessere sono divise in gruppi sparsi: ogni gruppo compare insieme. */
function buildTiles() {
  const groups: string[] = Array.from({ length: GROUPS }, () => "");
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const kind = kindAt(x, y);
      if (!kind) continue;
      const palette = fills[kind];
      const fill = palette[Math.floor(hash(x + 3, y + 7) * palette.length)];
      groups[Math.floor(hash(x, y) * GROUPS)] +=
        `<rect x="${x * CELL + GAP / 2}" y="${y * CELL + GAP / 2}" width="${CELL - GAP}" height="${CELL - GAP}" rx="2" fill="${fill}"/>`;
    }
  }
  return groups
    .map((tiles, i) => `<g class="tessere" style="--ritardo:${i * 120}ms">${tiles}</g>`)
    .join("");
}

export function MosaicTiles() {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const group = ref.current;
    const svg = group?.ownerSVGElement;
    if (!group || !svg) return;

    const draw = () => {
      group.innerHTML = buildTiles();
      svg.dataset.mosaico = "vivo";
    };

    if (!("IntersectionObserver" in window)) {
      draw();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          draw();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return <g ref={ref} />;
}
