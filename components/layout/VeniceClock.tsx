"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "Europe/Rome",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
};

const getSnapshot = () => formatter.format(new Date());
// Sul server non si legge l'ora: l'HTML resta uguale a ogni richiesta.
const getServerSnapshot = () => "––:––:––";

/** L'ora locale di Venezia, aggiornata ogni secondo nel browser. */
export function VeniceClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {time}
    </span>
  );
}
