import { Phone } from "lucide-react";
import { href } from "@/content/routes";
import { contacts, type Locale } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { ButtonLink, Label, Sign } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Contenuto della pagina "non trovata". Solo componenti server e link:
 * Next.js invia i file not-found con ogni pagina della loro sezione.
 * `compact`: versione ridotta, usata per la seconda lingua nella 404 globale.
 */
export function NotFoundContent({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const t = getDictionary(lang).notFound;
  const Heading = compact ? "h2" : "h1";

  return (
    <section
      aria-labelledby={`non-trovata-${lang}`}
      className={cn(
        "contenitore",
        compact
          ? "py-[clamp(3rem,7vw,5rem)]"
          : "pt-[calc(var(--header-altezza)+clamp(2.5rem,7vw,6rem))] pb-[clamp(3rem,7vw,5rem)]",
      )}
    >
      {compact ? null : <Sign text="404" animated direction="horizontal" className="mb-8" />}
      <div>
        <Label>{t.label}</Label>
        <Heading
          id={`non-trovata-${lang}`}
          className={cn(
            "mt-5 leading-none",
            compact ? "text-[clamp(2rem,4.5vw,3.2rem)]" : "text-[clamp(2.5rem,6vw,5.4rem)]",
          )}
        >
          {t.title1} <em className="block text-terracotta italic">{t.title2}</em>
        </Heading>
        <p className="mt-6 max-w-[48ch] text-[1.08rem] text-legno">{t.text}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={href("book", lang)}>{t.book}</ButtonLink>
          <ButtonLink href={href("rooms", lang)} variant="outline">
            {t.rooms}
          </ButtonLink>
          <ButtonLink href={href("home", lang)} variant="outline">
            {t.home}
          </ButtonLink>
        </div>

        {contacts.phone ? (
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[1rem] text-legno">
            <span>{t.call}</span>
            <a
              href={`tel:${contacts.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-11 items-center gap-2 font-semibold whitespace-nowrap text-mattone underline underline-offset-4 hover:text-inchiostro"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
              {contacts.phone}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
