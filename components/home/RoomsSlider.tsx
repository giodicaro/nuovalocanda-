"use client";

import { AnimatePresence, LazyMotion, useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState, type KeyboardEvent } from "react";
import { rooms, type TripType } from "@/content/rooms";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { RoomSlide, slideGridClass } from "@/components/rooms/RoomSlide";
import { cn } from "@/lib/cn";

const trips: TripType[] = ["solo", "duo", "group"];
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Slider delle sistemazioni con filtro per tipo di viaggio.
 * Tastiera: frecce sinistra e destra sullo slider, Tab sui controlli.
 */
export function RoomsSlider({
  lang,
  t,
  common,
}: {
  lang: Locale;
  t: Dictionary["rooms"];
  common: Dictionary["common"];
}) {
  const [trip, setTrip] = useState<TripType>("duo");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();

  const list = useMemo(() => rooms.filter((room) => room.trips.includes(trip)), [trip]);
  const room = list[Math.min(index, list.length - 1)];
  const position = list.indexOf(room);

  const go = (step: number) => {
    setDirection(step);
    setIndex((position + step + list.length) % list.length);
  };

  const pick = (next: TripType) => {
    setDirection(1);
    setTrip(next);
    setIndex(0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const onTripKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = trips[(i + step + trips.length) % trips.length];
    pick(next);
    document.getElementById(`viaggio-${next}`)?.focus();
  };

  const offset = reduced ? 0 : 36 * direction;

  return (
    <LazyMotion features={loadFeatures} strict>
      {/* Filtro per tipo di viaggio */}
      <div
        role="radiogroup"
        aria-label={t.filterLabel}
        className="inline-flex flex-wrap gap-1.5 rounded-[1.75rem] border border-crema/30 p-1.5"
      >
        {trips.map((key, i) => {
          const active = key === trip;
          return (
            <button
              key={key}
              id={`viaggio-${key}`}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => pick(key)}
              onKeyDown={(event) => onTripKey(event, i)}
              className={cn(
                "min-h-11 rounded-full px-5 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ease-calmo sm:px-6",
                active ? "bg-ocra text-inchiostro" : "text-crema hover:bg-crema/10",
              )}
            >
              {t.trips[key]}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`${t.carousel}: ${t.trips[trip]}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mt-10 rounded-sm outline-offset-8 lg:mt-14"
      >
        <div aria-live="polite" aria-atomic="true" className="min-h-[34rem] lg:min-h-[36rem]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.div
              key={room.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} ${t.slideOf} ${list.length}: ${room.name[lang]}`}
              initial={{ opacity: 0, x: offset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -offset }}
              transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={slideGridClass}
            >
              <RoomSlide room={room} lang={lang} common={common} position={position} total={list.length} />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Controlli */}
        <div className="mt-8 flex items-center justify-between gap-6 border-t border-crema/25 pt-6">
          <div className="flex gap-2" role="group" aria-label={t.carousel}>
            {list.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`${t.goTo} ${i + 1}: ${item.name[lang]}`}
                aria-current={i === position ? "true" : undefined}
                onClick={() => {
                  setDirection(i > position ? 1 : -1);
                  setIndex(i);
                }}
                className="grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500 ease-calmo",
                    i === position ? "w-9 bg-ocra" : "w-5 bg-crema/40",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2.5">
            {(
              [
                [-1, t.prev, ArrowLeft],
                [1, t.next, ArrowRight],
              ] as const
            ).map(([step, label, Icon]) => (
              <button
                key={step}
                type="button"
                aria-label={label}
                onClick={() => go(step)}
                className="grid size-12 place-items-center rounded-full border-[1.5px] border-crema/60 text-crema transition-colors duration-300 ease-calmo hover:bg-crema hover:text-verde"
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
