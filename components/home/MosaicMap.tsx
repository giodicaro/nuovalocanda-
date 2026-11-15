import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content/i18n";

/**
 * Mappa a tessere di mosaico: terraferma, Ponte della Libertà, Venezia.
 * È un disegno originale, ispirato alla grande mappa appesa nella hall.
 * Non è in scala e non riproduce la stampa originale.
 */

const COLS = 38;
const ROWS = 18;
const CELL = 18;
const GAP = 2;

type Kind = "land" | "locanda" | "bridge" | "venice" | "canal" | "lagoon";

/** Numero pseudo-casuale stabile (niente Math.random: l'HTML non cambia mai). */
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

export function MosaicMap({ t }: { t: Dictionary["venice"] }) {
  const width = COLS * CELL;
  const height = ROWS * CELL;
  const tiles: ReactNode[] = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const kind = kindAt(x, y);
      if (!kind) continue;
      const palette = fills[kind];
      const fill = palette[Math.floor(hash(x + 3, y + 7) * palette.length)];
      tiles.push(
        <rect
          key={`${x}-${y}`}
          className="tessera"
          x={x * CELL + GAP / 2}
          y={y * CELL + GAP / 2}
          width={CELL - GAP}
          height={CELL - GAP}
          rx="2"
          fill={fill}
          style={{ "--ritardo": `${Math.round(hash(x, y) * 1100)}ms` } as CSSProperties}
        />,
      );
    }
  }

  const pin = { x: 5 * CELL + CELL / 2, y: 9 * CELL + CELL / 2 };

  const legend: { label: string; swatch: string; round?: boolean }[] = [
    { label: t.mapLocanda, swatch: "var(--color-terracotta)", round: true },
    { label: t.mapBridge, swatch: "var(--color-legno)" },
    { label: t.mapVenice, swatch: "var(--color-mattone)" },
    { label: t.mapLagoon, swatch: "#a7c6b3" },
  ];

  return (
    <figure className="border border-sabbia bg-carta p-3 shadow-[0_18px_40px_-28px_rgba(34,30,26,0.45)] sm:p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={t.mapAlt}
        className="block h-auto w-full"
      >
        {tiles}
        {/* La locanda: un anello che pulsa piano */}
        <circle cx={pin.x} cy={pin.y} r="15" fill="none" stroke="var(--color-inchiostro)" strokeWidth="2" />
        <circle
          className="fanale"
          cx={pin.x}
          cy={pin.y}
          r="22"
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
        />
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-1">
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-legno uppercase">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={item.round ? "size-3 rounded-full ring-2 ring-inchiostro ring-offset-1 ring-offset-carta" : "size-3 rounded-[2px]"}
                style={{ background: item.swatch }}
              />
              {item.label}
            </li>
          ))}
        </ul>
        <span className="text-[0.72rem] text-legno italic">{t.mapCaption}</span>
      </figcaption>
    </figure>
  );
}
