import type { CSSProperties } from "react";
import { href } from "@/content/routes";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { Frame } from "@/components/ui/Frame";
import { ButtonLink, Label, Scallop, Sign } from "@/components/ui/primitives";
import { HeroTram } from "./HeroTram";
import { Tilt } from "./Tilt";

const delay = (ms: number) => ({ "--ritardo": `${ms}ms` }) as CSSProperties;

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section
      aria-labelledby="hero-titolo"
      className="relative overflow-hidden pt-[calc(var(--header-altezza)+clamp(0.75rem,3svh,3rem))] pb-[clamp(1.5rem,3svh,3rem)] lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-between"
    >
      <div className="contenitore grid items-center gap-x-[clamp(2rem,4vw,4.5rem)] gap-y-10 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,29rem)]">
        {/* L'insegna: le lettere si accendono una alla volta */}
        <Sign
          text={t.sign}
          animated
          className="flex-row lg:col-span-2 xl:col-span-1 xl:flex-col xl:self-center"
        />

        <div className="max-w-[44rem]">
          <div className="entra" style={delay(150)}>
            <Label>{t.label}</Label>
          </div>
          <h1 id="hero-titolo" className="titolo-hero mt-5">
            <span className="riga-titolo">
              <span style={delay(250)}>{t.title1}</span>
            </span>
            <span className="riga-titolo">
              <span className="text-terracotta italic" style={delay(420)}>
                {t.title2}
              </span>
            </span>
          </h1>
          <p className="entra mt-6 max-w-[42ch] text-[1.08rem] text-legno" style={delay(750)}>
            {t.text}
          </p>
          <div className="entra mt-7 flex flex-wrap gap-3" style={delay(900)}>
            <ButtonLink href={href("book", lang)}>{dict.common.checkAvailability}</ButtonLink>
            <ButtonLink href={href("home", lang, "sistemazioni")} variant="outline">
              {t.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        {/* La foto sotto la tenda: la tenda si srotola, poi si muove al vento */}
        <Tilt className="relative mx-auto w-full max-w-[660px] pt-11 lg:mx-0 lg:justify-self-end">
          <div className="tenda-srotola absolute -inset-x-2 top-0 z-10 sm:-inset-x-3.5" style={delay(500)}>
            <div
              className="grid h-10 place-items-center rounded-t-[10px] border border-b-0 border-sabbia font-serif text-[0.78rem] tracking-[0.42em] text-inchiostro uppercase shadow-[0_-1px_0_rgba(255,255,255,0.6)_inset]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--color-carta) 0 26px, var(--color-sabbia) 26px 28px)",
              }}
              aria-hidden="true"
            >
              Belvedere
            </div>
            <div className="tenda-brezza drop-shadow-[0_3px_3px_rgba(34,30,26,0.16)]">
              <Scallop color="var(--color-carta)" size={28} />
            </div>
          </div>
          <Frame
            photo="ingresso"
            lang={lang}
            caption={t.photoCaption}
            number="N. 01"
            eager
            maskClassName="foto-posa"
          />
        </Tilt>
      </div>

      <div className="mt-[clamp(1.75rem,3.5svh,3.5rem)]">
        <HeroTram from={t.tramFrom} bridge={t.tramBridge} to={t.tramTo} />
        <p className="sr-only">{t.tramAlt}</p>
      </div>
    </section>
  );
}
