import type { Room } from "@/content/rooms";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { Tbc } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Scheda dati di una sistemazione: ospiti, superficie, bagno, letti.
 * Il tipo di bagno e il numero di letti sono sempre dichiarati.
 */
export function RoomFacts({
  room,
  lang,
  common,
  tone = "light",
  className,
}: {
  room: Room;
  lang: Locale;
  common: Dictionary["common"];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const dt = cn(
    "text-[0.66rem] font-semibold tracking-[0.2em] uppercase",
    dark ? "text-sabbia" : "text-legno",
  );
  const dd = "mt-1.5 font-serif text-[1.3rem] leading-tight";
  const cell = cn("border-t py-4 pr-4", dark ? "border-crema/25" : "border-sabbia");

  return (
    <dl className={cn("grid grid-cols-2 sm:grid-cols-3", className)}>
      <div className={cell}>
        <dt className={dt}>{common.guests}</dt>
        <dd className={dd}>
          {room.guests}
          {!room.verified ? (
            <>
              {" "}
              <Tbc tbc={common.tbc} tone={tone} className="font-sans text-[0.8rem]" />
            </>
          ) : null}
        </dd>
      </div>
      <div className={cell}>
        <dt className={dt}>{common.area}</dt>
        <dd className={dd}>
          {room.areaSqm ? (
            <>
              {room.areaSqm} m²
            </>
          ) : (
            <Tbc tbc={common.tbc} tone={tone} className="font-sans text-[0.95rem]" />
          )}
        </dd>
      </div>
      <div className={cn(cell, "col-span-2 sm:col-span-1")}>
        <dt className={dt}>{common.bath}</dt>
        <dd className={dd}>
          {room.bath === "private" ? common.bathPrivate : common.bathShared}
        </dd>
      </div>
      <div className={cn(cell, "col-span-2 sm:col-span-3")}>
        <dt className={dt}>{common.beds}</dt>
        <dd className={dd}>{room.beds[lang]}</dd>
      </div>
    </dl>
  );
}
