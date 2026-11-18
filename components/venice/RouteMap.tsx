import type { ReactNode } from "react";
import type { Dictionary } from "@/content/i18n";
import { googleMapsRouteUrl, ways, type Way } from "@/content/transport";
import { chipLabel, modeColor } from "./transport-ui";

/**
 * Mappa-itinerario: dalla locanda alle fermate, poi sul Ponte della Libertà
 * fino a Piazzale Roma e Santa Lucia. Disegno originale e schematico, non in
 * scala: posizioni relative vere (Marghera a sud-ovest di Mestre, Venezia a
 * sud-est), forme semplificate. Componente server, SVG nell'HTML, nessun
 * JavaScript. Due composizioni: orizzontale da 1024 px, verticale sotto.
 * Unico movimento: l'anello della locanda che pulsa (classe .fanale), che si
 * ferma con prefers-reduced-motion e con il pulsante delle animazioni.
 */

const byMode = (mode: Way["mode"]) => ways.find((w) => w.mode === mode)!;
const val = (v: string | number | null | undefined) => (v === null || v === undefined ? "?" : String(v));
const fill = (t: string, vars: Record<string, string>) =>
  t.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

/** Etichetta di linea nel colore del mezzo (come nell'elenco). */
function Chip({ x, y, w, mode, children }: { x: number; y: number; w: number; mode: Way["mode"]; children: ReactNode }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 14} width={w} height={28} rx={14} fill={modeColor[mode]} />
      <text x={x} y={y + 5.5} textAnchor="middle" fontWeight={700} fill="var(--color-carta)">
        {children}
      </text>
    </g>
  );
}

/** Fermata: cerchio chiaro con il bordo del colore del mezzo. */
function Stop({ x, y, mode, r = 9 }: { x: number; y: number; mode: Way["mode"]; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="var(--color-carta)" stroke={modeColor[mode]} strokeWidth={4} />;
}

/** La locanda: il segno più forte. */
function Inn({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle className="fanale" cx={x} cy={y} r={24} fill="none" stroke="var(--color-terracotta)" strokeWidth={2.5} />
      <circle cx={x} cy={y} r={14} fill="var(--color-terracotta)" stroke="var(--color-inchiostro)" strokeWidth={3} />
    </g>
  );
}

/** Contorno chiaro dietro le etichette: restano leggibili sopra i tratteggi. */
const halo = {
  stroke: "var(--color-crema)",
  strokeWidth: 5,
  strokeLinejoin: "round" as const,
  paintOrder: "stroke" as const,
};

const walkStyle = {
  fill: "none",
  stroke: "var(--color-legno)",
  strokeWidth: 2.5,
  strokeDasharray: "1 7",
  strokeLinecap: "round" as const,
};
const line = (mode: Way["mode"], width = 8) => ({
  fill: "none",
  stroke: modeColor[mode],
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function RouteMap({ dict }: { dict: Dictionary }) {
  const m = dict.venice.map;
  const bus = byMode("bus");
  const tram = byMode("tram");
  const train = byMode("train");
  const min = (n: number | string | null) => fill(m.min, { n: val(n) });

  const alt = fill(m.alt, {
    busLines: bus.lines.split(" · ").join(` ${dict.venice.transport.or} `),
    busStop: bus.stop.name,
    busWalk: val(bus.stop.walkMinutes.value),
    busRide: val(bus.rideMinutes.value),
    tramStop: tram.stop.name,
    tramWalk: val(tram.stop.walkMinutes.value),
    trainStop: train.stop.name,
    trainWalk: val(train.stop.walkMinutes.value),
    trainRide: val(train.rideMinutes.value),
  });

  const tramArrival = `${m.tram} ${min(tram.rideMinutes.value)} + ${m.change}`;

  return (
    <figure className="border border-sabbia bg-carta p-3 sm:p-4">
      {/* Orizzontale, da 1024 px. Testo minimo 16 nel disegno: almeno 12 px a schermo. */}
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label={alt}
        className="hidden h-auto w-full font-sans lg:block"
        fontSize={17}
      >
        <rect width="1200" height="560" fill="var(--color-laguna)" />
        <path
          d="M0 0 H660 C640 80 625 150 630 210 C635 270 590 320 545 370 C505 415 480 480 488 560 H0 Z"
          fill="var(--color-crema)"
        />
        <path
          d="M935 350 C965 312 1035 296 1105 300 C1160 304 1200 322 1200 322 V560 H1060 C1000 545 950 505 932 455 C922 425 922 380 935 350 Z"
          fill="var(--color-crema)"
        />

        {/* Nomi dei luoghi */}
        <g className="font-serif" fontSize={34} fill="var(--color-inchiostro)">
          <text x="150" y="62">{m.mestre}</text>
          <text x="60" y="505">{m.marghera}</text>
          <text x="1030" y="505">{m.venice}</text>
        </g>
        <text x="800" y="120" className="font-serif" fontSize={26} fontStyle="italic" fill="var(--color-legno)">
          {m.lagoon}
        </text>

        {/* Ponte della Libertà */}
        <path d="M625 240 L930 362" stroke="var(--color-sabbia)" strokeWidth={60} strokeLinecap="round" />
        <text x="650" y="196" fontStyle="italic" fill="var(--color-legno)">
          {m.bridge}
        </text>

        {/* A piedi dalla locanda */}
        <path d="M345 360 C300 345 270 320 255 290" {...walkStyle} />
        <path d="M345 360 C385 330 420 300 440 275" {...walkStyle} />
        <path d="M345 360 C420 330 455 260 460 190" {...walkStyle} />

        {/* Treno: stazione di Mestre → Santa Lucia */}
        <path d="M460 190 H560 C590 190 605 210 631 225 L936 347 L956 338" {...line("train")} />
        <path
          d="M460 190 H560 C590 190 605 210 631 225 L936 347"
          fill="none"
          stroke="var(--color-carta)"
          strokeWidth={3}
          strokeDasharray="9 9"
        />
        {/* Tram: T2 Giovannacci → Mestre Centro, T1 → Piazzale Roma */}
        <path
          d="M255 290 C280 230 330 200 370 190 C420 178 440 120 470 85 C540 70 595 110 612 170 L625 240 L930 362 L936 392"
          {...line("tram")}
        />
        {/* Autobus 6 · 6L: Rizzardi Carrer → Piazzale Roma */}
        <path d="M440 275 C520 275 580 262 619 255 L924 377 L936 392" {...line("bus")} />

        {/* Etichette delle linee */}
        <g fontSize={17}>
          <Chip x={770} y={249} w={76} mode="train">{chipLabel(train, m)}</Chip>
          <Chip x={880} y={295} w={130} mode="tram">{chipLabel(tram, m)}</Chip>
          <Chip x={720} y={327} w={112} mode="bus">{chipLabel(bus, m)}</Chip>
        </g>

        {/* Fermate */}
        <Stop x={460} y={190} mode="train" />
        <Stop x={440} y={275} mode="bus" />
        <Stop x={255} y={290} mode="tram" />
        <Stop x={470} y={85} mode="tram" r={8} />
        <g fill="var(--color-inchiostro)" fontWeight={700} {...halo}>
          <text x="478" y="176">{train.stop.name}</text>
          <text x="454" y="304">{bus.stop.name}</text>
          <text x="240" y="282" textAnchor="end">{tram.stop.name}</text>
          <text x="486" y="56">
            {tram.change?.at}
            <tspan fontWeight={400} fill="var(--color-legno)"> · {m.change}</tspan>
          </text>
        </g>
        <g fill="var(--color-legno)" {...halo}>
          <text x="268" y="352" textAnchor="end">{min(tram.stop.walkMinutes.value)}</text>
          <text x="400" y="342">{min(bus.stop.walkMinutes.value)}</text>
          <text x="470" y="232">{min(train.stop.walkMinutes.value)}</text>
        </g>

        {/* Arrivi */}
        <Stop x={956} y={338} mode="train" />
        <Stop x={936} y={392} mode="bus" r={10} />
        <g fill="var(--color-inchiostro)">
          <text x="975" y="334" fontWeight={700}>Santa Lucia</text>
          <text x="975" y="355" fill="var(--color-legno)">
            {m.train} {min(train.rideMinutes.value)}
          </text>
          <text x="956" y="420" fontWeight={700}>Piazzale Roma</text>
          <text x="956" y="441" fill="var(--color-legno)">
            {m.bus} {min(bus.rideMinutes.value)}
          </text>
          <text x="956" y="462" fill="var(--color-legno)">
            {tramArrival}
          </text>
        </g>

        {/* La locanda */}
        <Inn x={345} y={360} />
        <text x="374" y="404" className="font-serif" fontSize={30} fill="var(--color-inchiostro)">
          {m.inn}
        </text>
      </svg>

      {/* Verticale, sotto 1024 px. Testo minimo 15 nel disegno: almeno 12 px anche a 360 px. */}
      <svg
        viewBox="0 0 360 760"
        role="img"
        aria-label={alt}
        className="mx-auto block h-auto w-full max-w-[30rem] font-sans lg:hidden"
        fontSize={15}
      >
        <rect width="360" height="760" fill="var(--color-laguna)" />
        <path d="M0 0 H360 V250 C330 300 300 340 255 365 C190 400 110 410 0 430 Z" fill="var(--color-crema)" />
        <path d="M195 700 C215 650 300 632 360 634 V760 H200 C185 745 185 720 195 700 Z" fill="var(--color-crema)" />

        <g className="font-serif" fontSize={24} fill="var(--color-inchiostro)">
          <text x="16" y="40">{m.mestre}</text>
          <text x="16" y="408">{m.marghera}</text>
          <text x="236" y="745">{m.venice}</text>
        </g>
        <text x="20" y="600" className="font-serif" fontSize={20} fontStyle="italic" fill="var(--color-legno)">
          {m.lagoon}
        </text>

        <path d="M262 380 L292 610" stroke="var(--color-sabbia)" strokeWidth={50} strokeLinecap="round" />
        <text x="232" y="530" textAnchor="end" fontStyle="italic" fill="var(--color-legno)">
          {m.bridge}
        </text>

        {/* A piedi */}
        <path d="M110 320 C90 290 70 265 60 240" {...walkStyle} />
        <path d="M110 320 C140 290 160 265 175 240" {...walkStyle} />
        <path d="M110 320 C175 290 200 230 205 165" {...walkStyle} />

        {/* Treno */}
        <path d="M205 165 H270 C292 165 302 185 302 215 L277 378 L307 608 C310 625 318 640 330 648" {...line("train", 7)} />
        <path
          d="M205 165 H270 C292 165 302 185 302 215 L277 378 L307 608"
          fill="none"
          stroke="var(--color-carta)"
          strokeWidth={2.5}
          strokeDasharray="8 8"
        />
        {/* Tram */}
        <path
          d="M60 240 C60 180 110 125 170 115 C220 105 250 85 280 72 C325 62 345 100 345 150 L345 290 C345 330 262 340 262 380 L292 610 C280 640 245 665 222 680"
          {...line("tram", 7)}
        />
        {/* Autobus */}
        <path d="M175 240 H215 C240 240 248 258 248 285 L247 382 L277 612 C265 640 240 662 222 680" {...line("bus", 7)} />

        <g fontSize={15}>
          <Chip x={330} y={455} w={58} mode="train">{chipLabel(train, m)}</Chip>
          <Chip x={185} y={430} w={96} mode="bus">{chipLabel(bus, m)}</Chip>
          <Chip x={178} y={470} w={110} mode="tram">{chipLabel(tram, m)}</Chip>
        </g>

        <Stop x={205} y={165} mode="train" r={8} />
        <Stop x={175} y={240} mode="bus" r={8} />
        <Stop x={60} y={240} mode="tram" r={8} />
        <Stop x={280} y={72} mode="tram" r={7} />
        <g fill="var(--color-inchiostro)" fontWeight={700} {...halo}>
          <text x="196" y="196" textAnchor="end">{train.stop.name}</text>
          <text x="188" y="230">{bus.stop.name}</text>
          <text x="16" y="270">{tram.stop.name}</text>
          <text x="266" y="58" textAnchor="end">{tram.change?.at}</text>
        </g>
        <text x="266" y="76" textAnchor="end" fill="var(--color-legno)">
          {m.change}
        </text>
        <g fill="var(--color-legno)" {...halo}>
          <text x="48" y="300">{min(tram.stop.walkMinutes.value)}</text>
          <text x="148" y="300">{min(bus.stop.walkMinutes.value)}</text>
          <text x="216" y="196">{min(train.stop.walkMinutes.value)}</text>
        </g>

        <Stop x={330} y={648} mode="train" r={8} />
        <Stop x={222} y={680} mode="bus" r={9} />
        <g fill="var(--color-inchiostro)">
          <text x="206" y="652" textAnchor="end" fontWeight={700}>Piazzale Roma</text>
          <text x="206" y="670" textAnchor="end" fill="var(--color-legno)">
            {m.bus} {min(bus.rideMinutes.value)}
          </text>
          <text x="206" y="688" textAnchor="end" fill="var(--color-legno)">
            {tramArrival}
          </text>
          <text x="350" y="684" textAnchor="end" fontWeight={700}>Santa Lucia</text>
          <text x="350" y="702" textAnchor="end" fill="var(--color-legno)">
            {m.train} {min(train.rideMinutes.value)}
          </text>
        </g>

        <Inn x={110} y={322} />
        <text x="40" y="364" className="font-serif" fontSize={22} fill="var(--color-inchiostro)">
          {m.inn}
        </text>
      </svg>

      <p className="sr-only">{m.srNote}</p>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[0.9rem] text-legno">
        <span className="flex items-center gap-2">
          <svg aria-hidden="true" width="34" height="6" viewBox="0 0 34 6">
            <path d="M3 3 H31" {...walkStyle} />
          </svg>
          {m.walk}
        </span>
        <a
          href={googleMapsRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-medium text-mattone underline underline-offset-4 hover:text-inchiostro"
        >
          {m.openRoute} ↗<span className="sr-only"> ({dict.common.externalSite})</span>
        </a>
        <span className="italic">{m.caption}</span>
      </figcaption>
    </figure>
  );
}
