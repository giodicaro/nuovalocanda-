import type { Dictionary } from "@/content/i18n";
import { CELL, COLS, PIN, ROWS } from "./mosaic-grid";
import { MosaicTiles } from "./MosaicTiles";

/**
 * Mappa a tessere di mosaico: terraferma, Ponte della Libertà, Venezia.
 * È un disegno originale, ispirato alla grande mappa appesa nella hall.
 * Non è in scala e non riproduce la stampa originale.
 */
export function MosaicMap({ t }: { t: Dictionary["venice"] }) {
  const width = COLS * CELL;
  const height = ROWS * CELL;

  const legend: { label: string; swatch: string; round?: boolean }[] = [
    { label: t.map.inn, swatch: "var(--color-terracotta)", round: true },
    { label: t.map.bridge, swatch: "var(--color-legno)" },
    { label: t.map.venice, swatch: "var(--color-mattone)" },
    { label: t.map.lagoon, swatch: "#a7c6b3" },
  ];

  return (
    <figure className="border border-sabbia bg-carta p-3 shadow-[0_18px_40px_-28px_rgba(34,30,26,0.45)] sm:p-4">
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={t.map.caption}
          className="mosaico block h-auto w-full"
        >
          {/* Disegno semplice: è ciò che si vede prima delle tessere e senza JavaScript. */}
          <g className="mosaico-base">
            <rect x="8" y="8" width={width - 16} height={height - 16} rx="14" fill="#b9d2c0" />
            <path
              d={`M8 22 Q8 8 22 8 L150 8 Q168 60 132 110 Q118 170 160 230 Q150 290 140 ${height - 8} L22 ${height - 8} Q8 ${height - 8} 8 ${height - 22} Z`}
              fill="var(--color-sabbia)"
            />
            <rect x="130" y="128" width="200" height="14" rx="3" fill="var(--color-legno)" />
            <ellipse cx="478" cy="146" rx="150" ry="76" fill="var(--color-terracotta)" />
            <ellipse cx="362" cy="134" rx="50" ry="46" fill="var(--color-terracotta)" />
            <ellipse cx="614" cy="178" rx="62" ry="38" fill="var(--color-terracotta)" />
            <ellipse cx="458" cy="268" rx="118" ry="19" fill="var(--color-mattone)" />
            <rect x={PIN.x - 9} y={PIN.y - 9} width="18" height="18" rx="2" fill="var(--color-terracotta)" />
          </g>
          <MosaicTiles />
          <circle
            cx={PIN.x}
            cy={PIN.y}
            r="15"
            fill="none"
            stroke="var(--color-inchiostro)"
            strokeWidth="2"
          />
        </svg>
        {/* La locanda: un anello che pulsa piano (solo opacità) */}
        <span
          aria-hidden="true"
          className="fanale absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-terracotta"
          style={{
            left: `${(PIN.x / width) * 100}%`,
            top: `${(PIN.y / height) * 100}%`,
            width: `${(46 / width) * 100}%`,
          }}
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-1">
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-legno uppercase">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={
                  item.round
                    ? "size-3 rounded-full ring-2 ring-inchiostro ring-offset-1 ring-offset-carta"
                    : "size-3 rounded-[2px]"
                }
                style={{ background: item.swatch }}
              />
              {item.label}
            </li>
          ))}
        </ul>
        <span className="text-[0.72rem] text-legno italic">{t.map.caption}</span>
      </figcaption>
    </figure>
  );
}
