import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ---------- Comparsa allo scroll ----------
 * Il contenuto è visibile nell'HTML. Il componente RevealController
 * (client) nasconde solo ciò che è sotto lo schermo e lo fa comparire
 * quando entra. Senza JavaScript tutto resta visibile.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  // suppressHydrationWarning: ClientEffects può scrivere data-comparsa su
  // questo elemento prima che React lo attivi. Vale solo per i suoi attributi.
  return (
    <Tag
      data-reveal=""
      suppressHydrationWarning
      className={className}
      style={delay ? ({ "--ritardo": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---------- Etichetta di sezione ---------- */
export function Label({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "etichetta",
        tone === "light" ? "text-legno" : "text-sabbia",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-[7px] shrink-0",
          tone === "light" ? "bg-terracotta" : "bg-ocra",
        )}
      />
      {children}
    </p>
  );
}

/* ---------- Titolo su due righe: tondo + corsivo ---------- */
export function TwoLineTitle({
  line1,
  line2,
  as: Tag = "h2",
  className,
  accentClassName = "text-terracotta",
}: {
  line1: string;
  line2: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accentClassName?: string;
}) {
  return (
    <Tag className={className}>
      {line1}{" "}
      <em className={cn("block italic", accentClassName)}>{line2}</em>
    </Tag>
  );
}

/* ---------- Pulsanti ---------- */
const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-300 ease-calmo active:scale-[0.98]";

export const buttonStyles = {
  solid: cn(buttonBase, "bg-mattone text-carta hover:bg-inchiostro"),
  outline: cn(
    buttonBase,
    "border-[1.5px] border-inchiostro text-inchiostro hover:bg-inchiostro hover:text-carta",
  ),
  onDark: cn(buttonBase, "bg-ocra text-inchiostro hover:bg-carta"),
  outlineOnDark: cn(
    buttonBase,
    "border-[1.5px] border-crema/70 text-crema hover:bg-crema hover:text-verde",
  ),
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link prefetch={false} href={href} className={cn(buttonStyles[variant], className)}>
      {children}
    </Link>
  );
}

/* ---------- Segnaposto visibile per un dato da confermare ---------- */
export function Tbc({
  label,
  tbc,
  tone = "light",
  className,
}: {
  /** Che cosa manca, es. "Indirizzo". */
  label?: string;
  /** Testo "da confermare" nella lingua corrente. */
  tbc: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      data-da-confermare=""
      className={cn(
        "border-b border-dashed pb-px",
        tone === "light"
          ? "border-mattone/70 text-mattone"
          : "border-ocra/80 text-ocra-chiara",
        className,
      )}
    >
      {label ? `${label}: ${tbc}` : tbc}
    </span>
  );
}

/* ---------- Bordo smerlato, come la tenda sopra l'ingresso ---------- */
export function Scallop({
  color = "var(--color-carta)",
  className,
  size = 28,
}: {
  color?: string;
  className?: string;
  size?: number;
}) {
  const r = size / 2;
  return (
    <div
      aria-hidden="true"
      className={cn("w-full", className)}
      style={{
        height: r,
        backgroundImage: `radial-gradient(circle at ${r}px 0, ${color} ${r - 0.5}px, transparent ${r}px)`,
        backgroundSize: `${size}px ${r}px`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center top",
      }}
    />
  );
}

/* ---------- Insegna verticale, come "ALLOGGI" sulla facciata ---------- */
export function Sign({
  text,
  className,
  animated = false,
  direction = "vertical",
}: {
  text: string;
  className?: string;
  animated?: boolean;
  direction?: "vertical" | "horizontal";
}) {
  return (
    <p
      role="img"
      aria-label={text}
      className={cn(
        "flex gap-[5px]",
        direction === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
    >
      {text
        .toUpperCase()
        .split("")
        .map((letter, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "grid size-8 place-items-center rounded-[5px] border-[1.5px] border-terracotta bg-carta text-[0.95rem] leading-none font-extrabold text-mattone sm:size-9 sm:text-[1.05rem]",
              animated && "lettera-insegna",
            )}
            style={
              animated
                ? ({ "--ritardo": `${350 + i * 140}ms` } as CSSProperties)
                : undefined
            }
          >
            {letter}
          </span>
        ))}
    </p>
  );
}

/* ---------- Segnaposto per una foto che manca ---------- */
export function PhotoMissing({
  what,
  label,
  className,
  ratio = "3 / 4",
}: {
  /** Che cosa deve mostrare la foto, es. "camerata". */
  what: string;
  /** "Foto da fornire" nella lingua corrente. */
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      data-foto-mancante=""
      className={cn(
        "grid w-full place-items-center border border-sabbia p-4 text-center",
        className,
      )}
      style={{
        aspectRatio: ratio,
        backgroundImage:
          "repeating-conic-gradient(var(--color-sabbia) 0 25%, var(--color-carta) 0 50%)",
        backgroundSize: "28px 28px",
      }}
    >
      <span className="border border-dashed border-mattone bg-carta px-3 py-2 text-[0.72rem] leading-snug font-semibold tracking-[0.12em] text-mattone uppercase">
        {label}: {what}
      </span>
    </div>
  );
}
