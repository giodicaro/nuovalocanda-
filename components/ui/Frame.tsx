import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { photos, type PhotoKey } from "@/content/photos";
import type { Locale } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Una foto in cornice, come una stampa appesa.
 * La cornice non supera mai `maxWidth` della foto: le immagini sono
 * piccole e non devono essere ingrandite oltre la loro risoluzione.
 */
export function Frame({
  photo,
  lang,
  caption,
  number,
  className,
  eager = false,
  maxWidth,
  maskClassName,
  maskStyle,
  children,
}: {
  photo: PhotoKey;
  lang: Locale;
  caption?: string;
  number?: string;
  className?: string;
  /** Solo per l'immagine principale della pagina. */
  eager?: boolean;
  /** Per ridurre ancora la misura. Non può superare quella della foto. */
  maxWidth?: number;
  /** Classe e stile della maschera che scopre la foto (hero). */
  maskClassName?: string;
  maskStyle?: CSSProperties;
  children?: ReactNode;
}) {
  const p = photos[photo];
  const width = Math.min(maxWidth ?? p.maxWidth, p.maxWidth);
  const pad = 10;

  return (
    <figure
      className={cn(
        "relative w-full border border-sabbia bg-carta shadow-[0_18px_40px_-28px_rgba(34,30,26,0.45)]",
        className,
      )}
      style={{ maxWidth: width + pad * 2, padding: pad, paddingBottom: 0 }}
    >
      <div className={cn("maschera-foto overflow-hidden bg-sabbia", maskClassName)} style={maskStyle}>
        <Image
          src={p.src}
          alt={p.alt[lang]}
          sizes={`(max-width: ${width + 64}px) calc(100vw - 4rem), ${width}px`}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding={eager ? "sync" : "async"}
          className="h-auto w-full"
        />
      </div>
      {children}
      <figcaption className="flex min-h-9 items-center justify-between gap-3 px-0.5 text-[0.62rem] font-medium tracking-[0.14em] text-legno uppercase sm:text-[0.68rem] sm:tracking-[0.18em]">
        <span>{caption}</span>
        {number ? <span aria-hidden="true">{number}</span> : null}
      </figcaption>
    </figure>
  );
}
