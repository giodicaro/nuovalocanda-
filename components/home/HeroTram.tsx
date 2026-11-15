import type { CSSProperties } from "react";

/**
 * Striscia illustrata dell'hero: il tram parte dalla locanda arancione,
 * passa il Ponte della Libertà e arriva a Venezia.
 * Disegno originale. È una scena, non una mappa: non indica linee,
 * fermate o tempi reali.
 *
 * La scena fissa è un'immagine SVG incorporata nella pagina (data URI):
 * per il browser è una sola immagine, molto più leggera da impaginare
 * di un disegno fatto di decine di elementi. Il tram è un elemento a sé,
 * mosso solo con `transform`.
 *
 * I colori sono scritti in esadecimale perché un SVG usato come immagine
 * non legge le variabili CSS della pagina. Sono gli stessi di globals.css.
 */
const C = {
  terracotta: "#d5602b",
  mattone: "#a8421a",
  verde: "#1f5540",
  verdeScuro: "#173f30",
  carta: "#fefaf2",
  ocra: "#ebae34",
  legno: "#6b4a32",
  inchiostro: "#221e1a",
};

const H = 140;
const DECK = 112;
const TRAM_START = 146;
const TRAM_W = 74;

function geometry(width: number) {
  const bridgeStart = 205;
  const bridgeEnd = width - 235;
  return { bridgeStart, bridgeEnd, vx: width - 222, run: bridgeEnd - TRAM_W - TRAM_START };
}

function sceneSvg(width: number) {
  const { bridgeStart, bridgeEnd, vx } = geometry(width);
  const bridgeLen = bridgeEnd - bridgeStart;

  let poles = "";
  for (let x = bridgeStart + 30; x < bridgeEnd; x += 118) {
    poles += `<line x1="${x}" y1="72" x2="${x}" y2="${DECK}" stroke="${C.legno}" stroke-width="1" opacity=".35"/>`;
  }
  const rect = (x: number, y: number, w: number, h: number, fill: string, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${H}">` +
    `<defs>` +
    `<pattern id="a" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M3 18 A17 17 0 0 1 37 18" fill="none" stroke="${C.legno}" stroke-width="2"/></pattern>` +
    `<pattern id="o" width="48" height="8" patternUnits="userSpaceOnUse"><path d="M0 4 Q12 0 24 4 T48 4" fill="none" stroke="${C.verde}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/></pattern>` +
    `</defs>` +
    // linea aerea e pali
    `<line x1="150" y1="72" x2="${vx + 4}" y2="72" stroke="${C.legno}" stroke-width=".8" opacity=".45"/>` +
    poles +
    // laguna e ponte
    rect(bridgeStart - 22, 131, bridgeLen + 44, 8, "url(#o)") +
    rect(bridgeStart, DECK + 5, bridgeLen, 18, "url(#a)") +
    rect(bridgeStart - 6, DECK, bridgeLen + 12, 5, C.legno, ' rx="1.5"') +
    // terraferma e locanda
    `<line x1="0" y1="${DECK + 1}" x2="${bridgeStart}" y2="${DECK + 1}" stroke="${C.legno}" stroke-width="2"/>` +
    `<polygon points="34,58 140,58 128,45 46,45" fill="${C.mattone}"/>` +
    rect(40, 58, 94, 54, C.terracotta) +
    rect(51, 67, 12, 16, C.verde) +
    rect(110, 67, 12, 16, C.verde) +
    rect(79, 88, 16, 24, C.verdeScuro) +
    rect(71, 79, 32, 6, C.carta) +
    [75, 83, 91, 99].map((cx) => `<circle cx="${cx}" cy="85" r="4" fill="${C.carta}"/>`).join("") +
    `<rect x="137" y="60" width="7" height="34" rx="1.5" fill="${C.carta}" stroke="${C.terracotta}" stroke-width="1.2"/>` +
    [65, 71, 77, 83, 89].map((cy) => rect(139, cy, 3, 3, C.terracotta)).join("") +
    [112, 116, 120].map((cx) => `<circle cx="${cx}" cy="84" r="2" fill="${C.ocra}"/>`).join("") +
    rect(170, 98, 3, 14, C.legno) +
    `<circle cx="171.5" cy="92" r="11" fill="${C.verde}"/>` +
    // Venezia
    `<g fill="${C.verde}">` +
    `<rect x="${vx}" y="84" width="26" height="29"/><rect x="${vx + 26}" y="74" width="22" height="39"/><rect x="${vx + 48}" y="90" width="32" height="23"/>` +
    `<rect x="${vx + 86}" y="40" width="14" height="73"/><polygon points="${vx + 83},40 ${vx + 93},20 ${vx + 103},40"/>` +
    `<rect x="${vx + 108}" y="82" width="46" height="31"/><path d="M${vx + 111} 82 A20 20 0 0 1 ${vx + 151} 82 Z"/><rect x="${vx + 129}" y="54" width="4" height="10"/>` +
    `<rect x="${vx + 154}" y="88" width="26" height="25"/><rect x="${vx + 180}" y="78" width="22" height="35"/><rect x="${vx + 202}" y="92" width="20" height="21"/>` +
    `</g>` +
    `<g fill="${C.ocra}">` +
    `<rect x="${vx + 32}" y="82" width="4" height="5"/><rect x="${vx + 40}" y="92" width="4" height="5"/><rect x="${vx + 91}" y="50" width="4" height="7"/><rect x="${vx + 162}" y="96" width="4" height="5"/><rect x="${vx + 187}" y="86" width="4" height="5"/>` +
    `</g>` +
    `<line x1="${bridgeEnd}" y1="${DECK + 1}" x2="${width}" y2="${DECK + 1}" stroke="${C.legno}" stroke-width="2"/>` +
    `</svg>`
  );
}

function Scene({ width }: { width: number }) {
  const { run } = geometry(width);
  const src = `data:image/svg+xml,${encodeURIComponent(sceneSvg(width))}`;

  return (
    <div className="relative [container-type:inline-size]" aria-hidden="true">
      {/* Immagine SVG incorporata: next/image qui non serve. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={width}
        height={H}
        decoding="async"
        className="block h-auto w-full"
      />

      {/* Tram */}
      <svg
        viewBox="0 68 74 46"
        focusable="false"
        className="tram absolute h-auto will-change-transform"
        style={
          {
            left: `${(TRAM_START / width) * 100}%`,
            top: `${(68 / H) * 100}%`,
            width: `${(TRAM_W / width) * 100}%`,
            "--corsa": `${(run / width) * 100}cqw`,
          } as CSSProperties
        }
      >
        <path
          d="M36 86 L44 79 L36 72 M44 79 L52 79"
          fill="none"
          stroke={C.inchiostro}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="0" y="86" width="74" height="23" rx="7" fill={C.mattone} />
        <rect x="0" y="101" width="74" height="4" fill={C.ocra} />
        {[7, 23, 39, 55].map((x) => (
          <rect key={x} x={x} y="90.5" width="12" height="8" rx="1.5" fill={C.carta} />
        ))}
        <circle cx="16" cy="110" r="3.6" fill={C.inchiostro} />
        <circle cx="58" cy="110" r="3.6" fill={C.inchiostro} />
        <circle cx="71" cy="103" r="2" fill={C.carta} />
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
        <Scene width={640} />
      </div>
      <div className="hidden md:block">
        <Scene width={980} />
      </div>
      <p className="mt-2 flex items-baseline justify-between gap-4 text-[0.66rem] font-semibold tracking-[0.2em] text-legno uppercase">
        <span>{from}</span>
        <span className="hidden sm:inline">{bridge}</span>
        <span>{to}</span>
      </p>
    </div>
  );
}
