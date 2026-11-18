import { getDictionary } from "@/content/i18n";
import { href } from "@/content/routes";
import type { Locale } from "@/content/site";
import { MosaicMap } from "@/components/home/MosaicMap";
import { PageIntro } from "@/components/ui/PageIntro";
import { ButtonLink, Label, Reveal, Scallop } from "@/components/ui/primitives";
import { ticketLines, WayDetails } from "@/components/venice/transport-ui";
import { sources, ways } from "@/content/transport";

const two = (n: number) => String(n).padStart(2, "0");

/**
 * Trasporti: dati, fonti e date di verifica in content/transport.ts.
 * Contributo di accesso: le regole cambiano ogni anno. Portale ufficiale
 * https://cda.ve.it — DA VERIFICARE sul portale prima della pubblicazione.
 */
const links = {
  actv: sources.urbanLines.url,
  fares: sources.actvFares.url,
  trenitalia: "https://www.trenitalia.com",
  fee: "https://cda.ve.it",
};

function External({ href: url, children, note }: { href: string; children: string; note: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center font-medium text-mattone underline underline-offset-4 hover:text-inchiostro"
    >
      {children} ↗<span className="sr-only"> ({note})</span>
    </a>
  );
}

export function VenicePage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.venicePage;
  const v = dict.venice;
  const external = dict.common.externalSite;

  return (
    <>
      <PageIntro label={t.label} line1={t.title1} line2={t.title2} intro={t.intro} />

      {/* Come arrivare */}
      <section aria-labelledby="come-arrivare" className="contenitore pb-[clamp(4rem,9vw,8rem)]">
        <Reveal>
          <MosaicMap t={v} />
        </Reveal>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <Reveal>
            <Label>{v.label}</Label>
            <h2 id="come-arrivare" className="titolo-sezione mt-5">
              {t.waysTitle}
            </h2>
            <p className="mt-6 max-w-[40ch] text-legno">{v.intro}</p>
          </Reveal>

          <div>
            <ol className="border-t border-inchiostro">
              {ways.map((way, i) => (
                <Reveal
                  as="li"
                  key={way.mode}
                  delay={i * 90}
                  className="grid gap-x-8 gap-y-2 border-b border-sabbia py-7 sm:grid-cols-[4rem_minmax(0,1fr)]"
                >
                  <p className="font-serif text-[1.05rem] text-mattone" aria-hidden="true">
                    {two(i + 1)}
                  </p>
                  <WayDetails way={way} dict={dict} />
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-8">
              <h3 className="font-serif text-[1.6rem] leading-tight">{t.ticketsTitle}</h3>
              <ul className="mt-3 max-w-[60ch] space-y-2 text-legno">
                {ticketLines(dict).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="mt-4 max-w-[60ch] text-[0.95rem] text-legno">{t.verified}</p>
              <p className="mt-2 flex flex-wrap gap-x-8">
                <External href={links.fares} note={external}>
                  {t.officialFares}
                </External>
                <External href={links.actv} note={external}>
                  {t.officialActv}
                </External>
                <External href={links.trenitalia} note={external}>
                  {t.officialTrenitalia}
                </External>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Consigli per la giornata */}
      <section aria-labelledby="consigli" className="su-scuro relative bg-verde text-crema">
        <Scallop color="var(--color-crema)" />
        <div className="contenitore sezione [content-visibility:visible]">
          <Reveal>
            <Label tone="dark">{t.label}</Label>
            <h2 id="consigli" className="titolo-sezione mt-5">
              {t.tipsTitle}
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.tips.map((tip, i) => (
              <Reveal as="li" key={tip.title} delay={(i % 3) * 100} className="border-t border-crema/30 pt-5">
                <p className="font-serif text-[1.05rem] text-ocra" aria-hidden="true">
                  {two(i + 1)}
                </p>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-tight">{tip.title}</h3>
                <p className="mt-3 text-sabbia">{tip.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Dove scendere + contributo di accesso */}
      <section className="contenitore sezione grid gap-x-16 gap-y-14 lg:grid-cols-2">
        <Reveal>
          <Label>{v.label}</Label>
          <h2 className="mt-5 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">
            {v.placesTitle}
          </h2>
          <ul className="mt-7 border-t border-sabbia">
            {v.places.map((place) => (
              <li key={place.name} className="border-b border-sabbia py-4">
                <p className="font-serif text-[1.4rem] leading-tight">{place.name}</p>
                <p className="mt-1 text-legno">{place.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-sabbia bg-carta p-[clamp(1.5rem,3.5vw,2.75rem)]">
            <p
              className="inline-block border border-dashed border-mattone px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-mattone uppercase"
              data-da-confermare=""
            >
              {t.feeBadge}
            </p>
            <h2 className="mt-5 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">
              {t.feeTitle}
            </h2>
            <div className="mt-5 space-y-4 text-legno">
              {t.fee.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4">
              <External href={links.fee} note={external}>
                {t.feeLink}
              </External>
            </p>
          </div>
        </Reveal>
      </section>

      {/* Venezia durante l'anno */}
      <section aria-labelledby="eventi" className="relative bg-carta">
        <Scallop color="var(--color-crema)" />
        <div className="contenitore sezione">
          <div className="grid items-end gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <Reveal>
              <Label>{t.label}</Label>
              <h2 id="eventi" className="titolo-sezione mt-5">
                {t.eventsTitle}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-legno">{t.eventsNote}</p>
            </Reveal>
          </div>
          <ul className="mt-12 border-t border-inchiostro">
            {t.events.map((event, i) => (
              <Reveal
                as="li"
                key={event.name}
                delay={i * 60}
                className="grid gap-x-8 gap-y-1 border-b border-sabbia py-5 md:grid-cols-[minmax(0,13rem)_minmax(0,18rem)_minmax(0,1fr)] md:items-baseline"
              >
                <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-legno uppercase">
                  {event.when}
                </span>
                <span className="font-serif text-[1.5rem] leading-tight">{event.name}</span>
                <span className="text-legno">{event.text}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 flex flex-wrap gap-3.5">
            <ButtonLink href={href("rooms", lang)}>{t.cta}</ButtonLink>
            <ButtonLink href={href("book", lang)} variant="outline">
              {dict.common.checkAvailability}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
