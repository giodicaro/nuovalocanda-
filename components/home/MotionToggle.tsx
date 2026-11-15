"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Pulsante che ferma e riavvia le animazioni che non finiscono da sole
 * (tram, tenda, insegna, anello sulla mappa). Chi si distrae con il
 * movimento deve poterlo fermare (WCAG 2.2.2).
 * La pausa vera è in CSS: html[data-animazioni-ferme] in globals.css.
 */
export function MotionToggle({
  pause,
  play,
  className,
}: {
  pause: string;
  play: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-animazioni-ferme", paused);
    return () => document.documentElement.removeAttribute("data-animazioni-ferme");
  }, [paused]);

  const Icon = paused ? Play : Pause;
  const label = paused ? play : pause;

  return (
    <button
      type="button"
      onClick={() => setPaused((value) => !value)}
      aria-label={label}
      title={label}
      className={cn("group grid size-11 place-items-center", className)}
    >
      <span className="grid size-7 place-items-center rounded-full border border-legno/60 bg-crema text-legno transition-colors duration-300 group-hover:border-inchiostro group-hover:text-inchiostro">
        <Icon aria-hidden="true" className="size-3" strokeWidth={2} />
      </span>
    </button>
  );
}
