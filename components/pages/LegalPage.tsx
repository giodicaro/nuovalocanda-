import { getDictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { Tbc } from "@/components/ui/primitives";

/**
 * Pagine legali: testi BOZZA, da far verificare al consulente del
 * titolare prima della pubblicazione. Il sito non usa strumenti di
 * statistica né script di terze parti, quindi non ha un banner cookie.
 */
export function LegalPage({ lang, kind }: { lang: Locale; kind: "privacy" | "cookies" }) {
  const dict = getDictionary(lang);
  const legal = dict.legal;
  const page = legal[kind];
  const [first, ...rest] = page.title.split(" ");

  return (
    <>
      <PageIntro label={page.label} line1={first} line2={rest.join(" ")} />
      <div className="contenitore pb-[clamp(4rem,9vw,8rem)]">
        <p
          role="note"
          data-da-confermare=""
          className="max-w-[70ch] border border-dashed border-mattone bg-carta px-5 py-4 text-[0.95rem] font-medium text-mattone"
        >
          {legal.draft}
        </p>
        <div className="mt-12 max-w-[68ch] space-y-12">
          {page.sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-serif text-[1.75rem] leading-tight">{section.h}</h2>
              <div className="mt-4 space-y-4 text-legno">
                {section.p.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {"tbc" in section && section.tbc ? (
                  <ul className="space-y-1.5 text-[0.95rem]">
                    {section.tbc.map((item) => (
                      <li key={item}>
                        <Tbc label={item} tbc={dict.common.tbc} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 text-[0.9rem] text-legno">
          <Tbc tbc={legal.updated} />
        </p>
      </div>
    </>
  );
}
