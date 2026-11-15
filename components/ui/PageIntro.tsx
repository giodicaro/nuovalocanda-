import type { CSSProperties } from "react";
import { Label } from "./primitives";

const delay = (ms: number) => ({ "--ritardo": `${ms}ms` }) as CSSProperties;

/** Apertura delle pagine interne: etichetta, titolo su due righe, testo. */
export function PageIntro({
  label,
  line1,
  line2,
  intro,
}: {
  label: string;
  line1: string;
  line2: string;
  intro?: string;
}) {
  return (
    <header className="contenitore pt-[calc(var(--header-altezza)+clamp(2.5rem,7vw,6rem))] pb-[clamp(2.5rem,6vw,5rem)]">
      <div className="entra" style={delay(100)}>
        <Label>{label}</Label>
      </div>
      <h1 className="mt-5 text-[clamp(2.5rem,6vw,5.4rem)] leading-none">
        <span className="riga-titolo">
          <span style={delay(180)}>{line1}</span>
        </span>{" "}
        <span className="riga-titolo">
          <span className="text-terracotta italic" style={delay(330)}>
            {line2}
          </span>
        </span>
      </h1>
      {intro ? (
        <p className="entra mt-8 max-w-[52ch] text-[1.1rem] text-legno" style={delay(600)}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}
