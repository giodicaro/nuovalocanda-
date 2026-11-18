import { Fragment, type ReactNode } from "react";
import type { Dictionary } from "@/content/i18n";
import { tickets, type Fact, type Way } from "@/content/transport";
import { Tbc } from "@/components/ui/primitives";

/**
 * Pezzi condivisi tra la pagina Venezia (elenco completo) e la home (card).
 * I dati vengono da content/transport.ts, le parole dai dizionari.
 */

/** Colore di ogni mezzo: lo stesso sulla mappa, nell'elenco e nelle card. */
export const modeColor: Record<Way["mode"], string> = {
  bus: "var(--color-verde)",
  tram: "var(--color-canale)",
  train: "var(--color-inchiostro)",
};

/** Sostituisce {chiave} nel testo con valori anche non testuali. */
export function fill(template: string, vars: Record<string, ReactNode>): ReactNode {
  return template.split(/(\{\w+\})/).map((part, i) => {
    const key = /^\{(\w+)\}$/.exec(part)?.[1];
    return <Fragment key={i}>{key && key in vars ? vars[key] : part}</Fragment>;
  });
}

/** Il valore di un dato, oppure il segnaposto "da confermare". */
export function fact<T extends string | number>(f: Fact<T> | undefined, tbc: string): ReactNode {
  if (!f || f.value === null) return <Tbc tbc={tbc} />;
  return String(f.value);
}

/** Etichetta della linea nel colore del mezzo, uguale a quella sulla mappa. */
export function LineChip({ way, label }: { way: Way; label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-0.5 text-[0.85rem] leading-6 font-semibold text-carta"
      style={{ background: modeColor[way.mode] }}
    >
      {label}
    </span>
  );
}

/** Testo dell'etichetta: "Bus 6 · 6L", "Tram T2 › T1", "Treno". */
export function chipLabel(way: Way, map: Dictionary["venice"]["map"]) {
  if (way.mode === "train") return map.train;
  return `${way.mode === "bus" ? map.bus : map.tram} ${way.lines}`;
}

type Words = { dict: Dictionary };

/** Una riga del blocco dati: etichetta sopra, valore sotto (anche su desktop stretto). */
function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-sabbia pt-2.5">
      <dt className="text-[0.85rem] font-semibold text-legno">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

/** Voce completa della pagina Venezia. */
export function WayDetails({ way, dict }: { way: Way } & Words) {
  const v = dict.venice;
  const w = v.transport;
  const tbc = dict.common.tbc;
  const words = v.ways[way.mode];
  const walk = (n: Fact<number>) => fill(w.walk, { n: fact(n, tbc) });

  const frequency = way.frequency.map((f, i) => (
    <Fragment key={f.band}>
      {i > 0 ? " · " : null}
      {w.bands[f.band]} {fill(w.everyValue, { n: fact(f.every, tbc) })}
      {way.mode === "bus" && f.band === "evening" ? ` (${w.eveningBusNote})` : null}
    </Fragment>
  ));

  const firstLast = (first: Fact<string>, last: Fact<string>, holiday?: Fact<string>) => (
    <>
      {fill(w.firstLast, { first: fact(first, tbc), last: fact(last, tbc) })}
      {holiday ? <> ({fill(w.holidayLast, { last: fact(holiday, tbc) })})</> : null}
    </>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3 className="font-serif text-[2rem] leading-none">{words.name}</h3>
        <LineChip way={way} label={chipLabel(way, v.map)} />
        {way.mode === "bus" ? (
          <span className="text-[0.92rem] font-semibold text-mattone">{w.simplest}</span>
        ) : null}
      </div>
      <p className="mt-3 max-w-[52ch] text-legno">{words.lead}</p>

      <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Row label={way.mode === "train" ? w.station : w.stop}>
          {way.stop.name}, {walk(way.stop.walkMinutes)}
        </Row>
        <Row label={w.line}>
          {fill(words.line, { lines: way.lines.split(" · ").join(` ${w.or} `), direction: fact(way.direction, tbc) })}
        </Row>
        <Row label={fill(w.ride, { place: way.arrival })}>
          {way.change
            ? fill(w.rideChange, { n: fact(way.rideMinutes, tbc), at: way.change.at })
            : fill(w.rideValue, { n: fact(way.rideMinutes, tbc) })}
        </Row>
        <Row label={w.every}>{frequency}</Row>
        <Row label={w.toVenice}>{firstLast(way.first, way.last, way.lastHoliday)}</Row>
        <Row label={w.back}>
          {fill(w.backValue, {
            from: way.back.from,
            stop: way.back.stop.name,
            walk: walk(way.back.stop.walkMinutes),
          })}
          <br />
          {firstLast(way.back.first, way.back.last, way.back.lastHoliday)}
          {way.back.night ? (
            <>
              <br />
              {fill(w.night, {
                line: way.back.night.line,
                n: fact(way.back.night.every, tbc),
                from: fact(way.back.night.from, tbc),
                to: fact(way.back.night.to, tbc),
              })}
            </>
          ) : null}
        </Row>
      </dl>
      <p className="mt-3">
        <a
          href={way.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center text-[0.95rem] font-medium text-mattone underline underline-offset-4 hover:text-inchiostro"
        >
          {w.official} ↗<span className="sr-only"> ({dict.common.externalSite})</span>
        </a>
      </p>
    </div>
  );
}

/** Riassunto in una riga per le card della home. */
export function WaySummary({ way, dict }: { way: Way } & Words) {
  const w = dict.venice.transport;
  const tbc = dict.common.tbc;
  const line =
    way.mode === "bus"
      ? fill(w.cardLineBus, { lines: way.lines.split(" · ").join(` ${w.or} `) })
      : way.mode === "tram"
        ? w.cardLineTram
        : w.cardLineTrain;
  return (
    <>
      {fill(w.card, {
        stopLabel: way.mode === "train" ? w.station : w.stop,
        stop: way.stop.name,
        walk: fill(w.walk, { n: fact(way.stop.walkMinutes, tbc) }),
        line,
        ride: way.change
          ? fill(w.cardRideChange, { n: fact(way.rideMinutes, tbc) })
          : fill(w.rideValue, { n: fact(way.rideMinutes, tbc) }),
        place: way.arrival,
      })}
    </>
  );
}

/** Le frasi sui biglietti, con i prezzi presi dai dati. */
export function ticketLines(dict: Dictionary) {
  const tbc = dict.common.tbc;
  return dict.venicePage.tickets.map((t) =>
    fill(t, {
      busTram: fact(tickets.busTram75, tbc),
      train: fact(tickets.train, tbc),
      daily: fact(tickets.mestreDailyPass, tbc),
      app: tickets.app,
    }),
  );
}
