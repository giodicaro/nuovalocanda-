import { getDictionary } from "@/content/i18n";
import { stay, type Locale } from "@/content/site";
import { RequestForm } from "@/components/book/RequestForm";
import { PageIntro } from "@/components/ui/PageIntro";
import { Label, Reveal, Scallop, Tbc } from "@/components/ui/primitives";

export function BookPage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.bookPage;
  const tbc = dict.common.tbc;

  // Orari e regole: tutti DA CONFERMARE in content/site.ts → stay.
  const info: { label: string; value: string | null }[] = [
    { label: t.info.checkIn, value: stay.checkIn },
    { label: t.info.checkOut, value: stay.checkOut },
    { label: t.info.reception, value: stay.receptionHours },
    { label: t.info.breakfast, value: stay.breakfast?.[lang] ?? null },
    { label: t.info.parking, value: stay.parking?.[lang] ?? null },
    { label: t.info.rules, value: stay.houseRules?.[lang].join(" · ") ?? null },
  ];

  return (
    <>
      <PageIntro label={t.label} line1={t.title1} line2={t.title2} intro={t.intro} />

      <section className="contenitore grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 pb-[clamp(4rem,9vw,8rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="entra" style={{ ["--ritardo" as string]: "700ms" }}>
          <RequestForm lang={lang} t={dict.form} common={dict.common} heading="h2" />
        </div>

        <aside aria-labelledby="orari" className="lg:pt-4">
          <Label>{t.label}</Label>
          <h2 id="orari" className="mt-4 font-serif text-[1.9rem] leading-tight">
            {t.infoTitle}
          </h2>
          <dl className="mt-6 border-t border-sabbia">
            {info.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-sabbia py-3.5"
              >
                <dt className="text-[0.7rem] font-semibold tracking-[0.18em] text-legno uppercase">
                  {row.label}
                </dt>
                <dd className="text-[0.98rem]">
                  {row.value ?? <Tbc tbc={tbc} />}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-l-2 border-ocra bg-carta px-5 py-4">
            <h3 className="font-serif text-[1.3rem]">{dict.house.stairsTitle}</h3>
            <p className="mt-2 text-[0.98rem] text-legno">{dict.house.stairs}</p>
          </div>
        </aside>
      </section>

      <section aria-labelledby="domande" className="relative bg-carta">
        <Scallop color="var(--color-crema)" />
        <div className="contenitore sezione grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <Reveal>
            <Label>{t.label}</Label>
            <h2 id="domande" className="titolo-sezione mt-5">
              {t.faqTitle}
            </h2>
          </Reveal>
          <Reveal delay={100} className="border-t border-inchiostro">
            {t.faq.map((item) => (
              <details key={item.q} className="group border-b border-sabbia">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-serif text-[1.35rem] leading-snug [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative block size-4 shrink-0 text-terracotta before:absolute before:inset-x-0 before:top-1/2 before:h-[1.5px] before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <div className="max-w-[60ch] space-y-3 pb-6 text-legno">
                  {item.a ? <p>{item.a}</p> : null}
                  {"tbc" in item && item.tbc ? (
                    <p className="text-[0.95rem]">
                      <Tbc label={item.tbc} tbc={tbc} />
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
