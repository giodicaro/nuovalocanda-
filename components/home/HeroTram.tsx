import type { CSSProperties } from "react";

/**
 * Striscia illustrata dell'hero: il tram parte dalla locanda arancione,
 * passa il Ponte della Libertà e arriva a Venezia.
 * Disegno originale in SVG. È una scena, non una mappa: non indica
 * linee, fermate o tempi reali.
 */
function Scene({ width, id }: { width: number; id: string }) {
  const H = 140;
  const deck = 112;
  const bridgeStart = 205;
  const bridgeEnd = width - 235;
  const bridgeLen = bridgeEnd - bridgeStart;
  const vx = width - 222;
  const tramStart = 146;
  const run = bridgeEnd - 74 - tramStart;

  const poles: number[] = [];
  for (let x = bridgeStart + 30; x < bridgeEnd; x += 118) poles.push(x);

  return (
    <div className="relative [container-type:inline-size]" aria-hidden="true">
    <svg viewBox={`0 0 ${width} ${H}`} className="block h-auto w-full" focusable="false">
      <defs>
        <pattern id={`${id}-arco`} width="40" height="18" patternUnits="userSpaceOnUse">
          <path
            d="M3 18 A17 17 0 0 1 37 18"
            fill="none"
            stroke="var(--color-legno)"
            strokeWidth="2"
          />
        </pattern>
        <pattern id={`${id}-onda`} width="48" height="8" patternUnits="userSpaceOnUse">
          <path
            d="M0 4 Q12 0 24 4 T48 4"
            fill="none"
            stroke="var(--color-verde)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
        </pattern>
        <clipPath id={`${id}-laguna`}>
          <rect x={bridgeStart - 22} y="118" width={bridgeLen + 44} height="24" />
        </clipPath>
      </defs>

      {/* Linea aerea e pali */}
      <line
        x1="150"
        y1="72"
        x2={vx + 4}
        y2="72"
        stroke="var(--color-legno)"
        strokeWidth="0.8"
        opacity="0.45"
      />
      {poles.map((x) => (
        <line
          key={x}
          x1={x}
          y1="72"
          x2={x}
          y2={deck}
          stroke="var(--color-legno)"
          strokeWidth="1"
          opacity="0.35"
        />
      ))}

      {/* Laguna */}
      <g clipPath={`url(#${id}-laguna)`}>
        <rect
          x={bridgeStart - 22}
          y="131"
          width={bridgeLen + 100}
          height="8"
          fill={`url(#${id}-onda)`}
        />
      </g>

      {/* Ponte */}
      <rect
        x={bridgeStart}
        y={deck + 5}
        width={bridgeLen}
        height="18"
        fill={`url(#${id}-arco)`}
      />
      <rect x={bridgeStart - 6} y={deck} width={bridgeLen + 12} height="5" rx="1.5" fill="var(--color-legno)" />

      {/* Terraferma e locanda */}
      <line x1="0" y1={deck + 1} x2={bridgeStart} y2={deck + 1} stroke="var(--color-legno)" strokeWidth="2" />
      <g>
        <polygon points="34,58 140,58 128,45 46,45" fill="var(--color-mattone)" />
        <rect x="40" y="58" width="94" height="54" fill="var(--color-terracotta)" />
        <rect x="51" y="67" width="12" height="16" fill="var(--color-verde)" />
        <rect x="110" y="67" width="12" height="16" fill="var(--color-verde)" />
        <rect x="79" y="88" width="16" height="24" fill="var(--color-verde-scuro)" />
        {/* tenda smerlata */}
        <rect x="71" y="79" width="32" height="6" fill="var(--color-carta)" />
        {[75, 83, 91, 99].map((cx) => (
          <circle key={cx} cx={cx} cy="85" r="4" fill="var(--color-carta)" />
        ))}
        {/* insegna verticale */}
        <rect
          x="137"
          y="60"
          width="7"
          height="34"
          rx="1.5"
          fill="var(--color-carta)"
          stroke="var(--color-terracotta)"
          strokeWidth="1.2"
        />
        {[65, 71, 77, 83, 89].map((cy) => (
          <rect key={cy} x="139" y={cy} width="3" height="3" fill="var(--color-terracotta)" />
        ))}
        {/* fiori alla finestra */}
        {[112, 116, 120].map((cx) => (
          <circle key={cx} cx={cx} cy="84" r="2" fill="var(--color-ocra)" />
        ))}
      </g>
      <g>
        <rect x="170" y="98" width="3" height="14" fill="var(--color-legno)" />
        <circle cx="171.5" cy="92" r="11" fill="var(--color-verde)" />
      </g>

      {/* Venezia */}
      <g fill="var(--color-verde)">
        <rect x={vx} y="84" width="26" height="29" />
        <rect x={vx + 26} y="74" width="22" height="39" />
        <rect x={vx + 48} y="90" width="32" height="23" />
        {/* campanile */}
        <rect x={vx + 86} y="40" width="14" height="73" />
        <polygon points={`${vx + 83},40 ${vx + 93},20 ${vx + 103},40`} />
        {/* cupola */}
        <rect x={vx + 108} y="82" width="46" height="31" />
        <path d={`M${vx + 111} 82 A20 20 0 0 1 ${vx + 151} 82 Z`} />
        <rect x={vx + 129} y="54" width="4" height="10" />
        <rect x={vx + 154} y="88" width="26" height="25" />
        <rect x={vx + 180} y="78" width="22" height="35" />
        <rect x={vx + 202} y="92" width="20" height="21" />
      </g>
      <g fill="var(--color-ocra)">
        <rect x={vx + 32} y="82" width="4" height="5" />
        <rect x={vx + 40} y="92" width="4" height="5" />
        <rect x={vx + 91} y="50" width="4" height="7" />
        <rect x={vx + 162} y="96" width="4" height="5" />
        <rect x={vx + 187} y="86" width="4" height="5" />
      </g>
      <line x1={bridgeEnd} y1={deck + 1} x2={width} y2={deck + 1} stroke="var(--color-legno)" strokeWidth="2" />

    </svg>

      {/* Tram: un elemento a sé, mosso solo con transform. Così l'animazione
          gira sul compositore e non impegna il processore a ogni fotogramma. */}
      <svg
        viewBox="0 68 74 46"
        focusable="false"
        className="tram absolute h-auto will-change-transform"
        style={
          {
            left: `${(tramStart / width) * 100}%`,
            top: `${(68 / H) * 100}%`,
            width: `${(74 / width) * 100}%`,
            "--corsa": `${(run / width) * 100}cqw`,
          } as CSSProperties
        }
      >
        <path
          d="M36 86 L44 79 L36 72 M44 79 L52 79"
          fill="none"
          stroke="var(--color-inchiostro)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="0" y="86" width="74" height="23" rx="7" fill="var(--color-mattone)" />
        <rect x="0" y="101" width="74" height="4" fill="var(--color-ocra)" />
        {[7, 23, 39, 55].map((x) => (
          <rect key={x} x={x} y="90.5" width="12" height="8" rx="1.5" fill="var(--color-carta)" />
        ))}
        <circle cx="16" cy="110" r="3.6" fill="var(--color-inchiostro)" />
        <circle cx="58" cy="110" r="3.6" fill="var(--color-inchiostro)" />
        <circle cx="71" cy="103" r="2" fill="var(--color-carta)" />
      </svg>
    </div>
  );
}

export function HeroTram({
  from,
  bridge,
  to,
}: {
  from: string;
  bridge: string;
  to: string;
}) {
  return (
    <div className="contenitore entra" style={{ "--ritardo": "1100ms" } as CSSProperties}>
      <div className="md:hidden">
        <Scene width={640} id="tram-s" />
      </div>
      <div className="hidden md:block">
        <Scene width={980} id="tram-l" />
      </div>
      <p className="mt-2 flex items-baseline justify-between gap-4 text-[0.66rem] font-semibold tracking-[0.2em] text-legno uppercase">
        <span>{from}</span>
        <span className="hidden sm:inline">{bridge}</span>
        <span>{to}</span>
      </p>
    </div>
  );
}
