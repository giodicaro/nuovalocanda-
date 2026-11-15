import Link from "next/link";
import { href } from "@/content/routes";
import { directBenefits, ratings, type Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { Frame } from "@/components/ui/Frame";
import {
  ButtonLink,
  Label,
  Reveal,
  Scallop,
  Tbc,
  TwoLineTitle,
} from "@/components/ui/primitives";
import { rooms } from "@/content/rooms";
import { RoomSlide, slideGridClass } from "@/components/rooms/RoomSlide";
import { cn } from "@/lib/cn";
import { FormIsland, RoomsIsland } from "./Islands";
import { MosaicMap } from "./MosaicMap";

type Props = { lang: Locale; dict: Dictionary };

const two = (n: number) => String(n).padStart(2, "0");

/* ---------- Manifesto: l'accoglienza ---------- */
export function Manifesto({ lang, dict }: Props) {
  const t = dict.manifesto;
  return (
    <section aria-labelledby="manifesto-titolo" className="sezione relative bg-carta">
      <Scallop color="var(--color-crema)" className="absolute inset-x-0 top-0" />
      <div className="contenitore grid items-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <Reveal>
            <Label>{t.label}</Label>
            <TwoLineTitle
              line1={t.title1}
              line2={t.title2}
              className="titolo-sezione mt-5"
            />
          </Reveal>
          <Reveal delay={120} className="mt-8 max-w-[46ch] space-y-5 text-[1.08rem] text-legno">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-10 border-l-2 border-terracotta pl-5 font-serif text-[1.55rem] leading-snug text-inchiostro italic">
              {t.aside}
            </p>
          </Reveal>
        </div>

        <div className="relative pb-16 sm:pb-20">
          <Reveal>
            <Frame photo="reception" lang={lang} caption={t.captionReception} number="N. 02" />
          </Reveal>
          <Reveal
            delay={200}
            className="absolute right-0 bottom-0 w-[42%] max-w-[230px] sm:right-4"
          >
            <Frame
              photo="mosaico"
              lang={lang}
              caption={t.captionMosaic}
              maxWidth={210}
              className="rotate-3"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Le sistemazioni ---------- */
export function RoomsSection({ lang, dict }: Props) {
  const t = dict.rooms;
  const duoRooms = rooms.filter((room) => room.trips.includes("duo"));
  return (
    <section
      id="sistemazioni"
      aria-labelledby="sistemazioni-titolo"
      className="su-scuro sezione bg-verde text-crema [content-visibility:visible]"
    >
      <div className="contenitore">
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Reveal>
            <Label tone="dark">{t.label}</Label>
            <h2 id="sistemazioni-titolo" className="titolo-sezione mt-5">
              {t.title1} <em className="block text-ocra italic">{t.title2}</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[44ch] text-sabbia">{t.intro}</p>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-16">
          {/* Lo slider si attiva quando si avvicina allo schermo. Prima, e senza
              JavaScript, si vede questa versione statica: la prima sistemazione
              del filtro "In due". */}
          <RoomsIsland
            lang={lang}
            t={t}
            common={dict.common}
            fallback={
              <>
                <div
                  aria-hidden="true"
                  className="inline-flex flex-wrap gap-1.5 rounded-[1.75rem] border border-crema/30 p-1.5"
                >
                  {(["solo", "duo", "group"] as const).map((key) => (
                    <span
                      key={key}
                      className={cn(
                        "grid min-h-11 place-items-center rounded-full px-5 text-[0.78rem] font-semibold tracking-[0.12em] uppercase sm:px-6",
                        key === "duo" ? "bg-ocra text-inchiostro" : "text-crema",
                      )}
                    >
                      {t.trips[key]}
                    </span>
                  ))}
                </div>
                <div className="mt-10 lg:mt-14">
                  <div className="min-h-[34rem] lg:min-h-[36rem]">
                    <div className={slideGridClass}>
                      <RoomSlide
                        room={duoRooms[0]}
                        lang={lang}
                        common={dict.common}
                        position={0}
                        total={duoRooms.length}
                      />
                    </div>
                  </div>
                  <div aria-hidden="true" className="mt-8 h-[4.5rem] border-t border-crema/25" />
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Venezia: tre modi per passare il ponte ---------- */
export function VeniceSection({ lang, dict }: Props) {
  const t = dict.venice;
  return (
    <section aria-labelledby="venezia-titolo" className="sezione">
      <div className="contenitore">
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <Label>{t.label}</Label>
            <h2 id="venezia-titolo" className="titolo-sezione mt-5">
              {t.title1} <em className="block text-terracotta italic">{t.title2}</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[46ch] text-[1.08rem] text-legno">{t.intro}</p>
          </Reveal>
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <MosaicMap t={t} />
        </Reveal>

        {/* Fonti: ACTV (https://actv.avmspa.it/it/content/tram-0) per le linee
            T1 e T2; orario Trenitalia per il tempo Mestre – Santa Lucia.
            Tempi indicativi. Fermate e linee dalla locanda: da confermare. */}
        <ol className="mt-12 grid gap-px border border-sabbia bg-sabbia md:grid-cols-3">
          {t.ways.map((way, i) => (
            <Reveal as="li" key={way.name} delay={i * 110} className="bg-crema p-[clamp(1.5rem,3vw,2.4rem)]">
              <p className="font-serif text-[1.05rem] text-mattone" aria-hidden="true">
                {two(i + 1)} / {two(t.ways.length)}
              </p>
              <h3 className="mt-5 font-serif text-[2rem] leading-none">{way.name}</h3>
              <p className="mt-4 text-legno">{way.text}</p>
              <p className="mt-4 text-[0.92rem]">
                <Tbc label={way.tbc} tbc={dict.common.tbc} />
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <Reveal>
            <h3 className="font-serif text-[1.9rem] leading-tight">{t.placesTitle}</h3>
            <ButtonLink href={href("venice", lang)} variant="outline" className="mt-7">
              {t.cta}
            </ButtonLink>
          </Reveal>
          <ul className="border-t border-sabbia">
            {t.places.map((place, i) => (
              <Reveal
                as="li"
                key={place.name}
                delay={i * 70}
                className="grid gap-x-8 gap-y-1 border-b border-sabbia py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-baseline"
              >
                <span className="font-serif text-[1.45rem] leading-tight">{place.name}</span>
                <span className="text-legno">{place.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Perché prenotare da qui ---------- */
export function DirectSection({ lang, dict }: Props) {
  const t = dict.direct;
  const benefits = directBenefits[lang];
  return (
    <section aria-labelledby="diretto-titolo" className="su-scuro sezione bg-mattone text-carta [content-visibility:visible]">
      <div className="contenitore">
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <Label tone="dark" className="text-carta">
              {t.label}
            </Label>
            <h2 id="diretto-titolo" className="titolo-sezione mt-5">
              {t.title1} <em className="block text-ocra-chiara italic">{t.title2}</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[44ch] text-[1.08rem]">{t.text}</p>
            <ButtonLink href={href("book", lang)} variant="onDark" className="mt-7">
              {t.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {benefits.length
            ? benefits.map((benefit, i) => (
                <Reveal as="li" key={benefit.title} delay={i * 110} className="border border-carta/35 p-7">
                  <p className="font-serif text-[1.05rem] text-ocra-chiara" aria-hidden="true">
                    {two(i + 1)}
                  </p>
                  <h3 className="mt-4 font-serif text-[1.6rem] leading-tight">{benefit.title}</h3>
                  <p className="mt-3">{benefit.text}</p>
                </Reveal>
              ))
            : [0, 1, 2].map((i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 110}
                  className="border border-dashed border-carta/60 p-7"
                >
                  <p className="font-serif text-[1.05rem] text-ocra-chiara" aria-hidden="true">
                    {two(i + 1)}
                  </p>
                  <h3 className="mt-4 font-serif text-[1.6rem] leading-tight" data-da-confermare="">
                    {t.placeholderTitle}
                  </h3>
                  <p className="mt-3 text-[0.98rem]">{t.placeholderText}</p>
                </Reveal>
              ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- La casa ---------- */
export function HouseSection({ lang, dict }: Props) {
  const t = dict.house;
  return (
    <section aria-labelledby="casa-titolo" className="sezione bg-carta">
      <div className="contenitore">
        <Reveal>
          <Label>{t.label}</Label>
          <h2 id="casa-titolo" className="titolo-sezione mt-5 max-w-[18ch]">
            {t.title1} <em className="block text-terracotta italic">{t.title2}</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <Frame photo="hall" lang={lang} caption={t.captionHall} number="N. 03" />
            </Reveal>
            <div className="mt-8 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-5 sm:gap-8">
              <Reveal delay={100}>
                <Frame photo="terrazza" lang={lang} caption={t.captionTerrace} />
              </Reveal>
              <Reveal delay={200} className="mt-10">
                <Frame photo="balconcino" lang={lang} caption={t.captionBalcony} />
              </Reveal>
            </div>
          </div>

          <div className="lg:pt-6">
            <Reveal>
              <p className="max-w-[44ch] text-[1.08rem] text-legno">{t.text}</p>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <h3 className="etichetta font-sans text-legno">{t.amenitiesTitle}</h3>
              <ul className="mt-4 border-t border-sabbia">
                {t.amenities.map((item) => (
                  <li key={item} className="border-b border-sabbia py-3.5 font-serif text-[1.25rem]">
                    {item}
                  </li>
                ))}
                {t.tbcItems.map((item) => (
                  <li key={item} className="border-b border-sabbia py-3.5 text-[1rem]">
                    <Tbc label={item} tbc={dict.common.tbc} />
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180} className="mt-10 border-l-2 border-ocra bg-crema px-5 py-4">
              <h3 className="font-serif text-[1.3rem]">{t.stairsTitle}</h3>
              <p className="mt-2 text-[0.98rem] text-legno">{t.stairs}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dicono di noi ----------
 * Compare solo se ratings.enabled è true in content/site.ts,
 * cioè dopo la conferma del titolare.
 */
export function ReviewsSection({ lang, dict }: Props) {
  if (!ratings.enabled) return null;
  const t = dict.reviews;
  const number = new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-GB", {
    minimumFractionDigits: 1,
  });
  const checked = ratings.checkedOn.split("-").reverse().join("/");

  return (
    <section aria-labelledby="recensioni-titolo" className="sezione">
      <div className="contenitore">
        <Reveal>
          <Label>{t.label}</Label>
          <h2 id="recensioni-titolo" className="titolo-sezione mt-5">
            {t.title1} <em className="block text-terracotta italic">{t.title2}</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <Reveal className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-serif text-[4.2rem] leading-none text-terracotta">
                {number.format(ratings.booking.score)}
              </p>
              <p className="mt-3 text-[0.92rem] text-legno">
                {t.bookingSource} · {ratings.booking.label[lang]} · {ratings.booking.reviews}{" "}
                {t.reviewsWord}
              </p>
            </div>
            <div>
              <p className="font-serif text-[4.2rem] leading-none text-terracotta">
                {number.format(ratings.google.score)}
              </p>
              <p className="mt-3 text-[0.92rem] text-legno">
                {t.googleSource} · {ratings.google.reviews} {t.reviewsWord}
              </p>
            </div>
            <p className="col-span-2 text-[0.85rem] text-legno">
              {t.checkedOn} {checked}.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {ratings.booking.details.map((detail) => (
                <div
                  key={detail.key}
                  className="flex items-baseline justify-between border-b border-sabbia py-3"
                >
                  <dt className="text-legno">{t.details[detail.key]}</dt>
                  <dd className="font-serif text-[1.35rem]">{number.format(detail.score)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 110}
              className="border border-dashed border-mattone/60 p-7"
            >
              <blockquote className="font-serif text-[1.25rem] leading-snug text-mattone">
                {t.quotePlaceholder}
              </blockquote>
              <p className="mt-4 text-[0.88rem] text-legno">{t.quoteAuthor}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Prenota ---------- */
export function BookSection({ lang, dict }: Props) {
  const t = dict.bookCta;
  return (
    <section id="prenota" aria-labelledby="prenota-titolo" className="sezione">
      <div className="contenitore grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <Reveal>
            <Label>{t.label}</Label>
            <h2 id="prenota-titolo" className="titolo-sezione mt-5">
              {t.title1} <em className="block text-terracotta italic">{t.title2}</em>
            </h2>
            <p className="mt-7 max-w-[38ch] text-[1.08rem] text-legno">{t.text}</p>
            <p className="mt-5">
              <Link prefetch={false}
                href={href("book", lang)}
                className="font-medium text-mattone underline underline-offset-4 hover:text-inchiostro"
              >
                {dict.bookPage.faqTitle} →
              </Link>
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10 max-w-[300px] -rotate-2">
            <Frame photo="sera" lang={lang} caption={t.eveningCaption} maxWidth={280} />
          </Reveal>
        </div>
        <Reveal delay={100}>
          {/* Il modulo si attiva quando si avvicina allo schermo. Prima, e senza
              JavaScript, c'è un riquadro con il collegamento alla pagina Prenota. */}
          <FormIsland
            lang={lang}
            t={dict.form}
            common={dict.common}
            fallback={
              <div className="min-h-[40rem] border border-sabbia bg-carta p-[clamp(1.5rem,4vw,3rem)]">
                <h3 className="font-serif text-[1.9rem] leading-tight">{dict.form.title}</h3>
                <p className="mt-2 text-[0.95rem] text-legno">{dict.form.note}</p>
                <ButtonLink href={href("book", lang)} className="mt-8">
                  {dict.common.checkAvailability}
                </ButtonLink>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
