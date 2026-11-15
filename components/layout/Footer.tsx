import Link from "next/link";
import { href } from "@/content/routes";
import { contacts, site, type Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { Label, Scallop, Tbc } from "@/components/ui/primitives";
import { VeniceClock } from "./VeniceClock";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const tbc = dict.common.tbc;
  const other: Locale = lang === "it" ? "en" : "it";

  const linkClass =
    "inline-flex min-h-11 items-center border-b border-transparent transition-colors duration-300 hover:border-ocra hover:text-ocra";

  return (
    <footer className="su-scuro relative bg-verde text-crema">
      <Scallop color="var(--color-crema)" />

      <div className="contenitore pt-[clamp(3.5rem,8vw,6.5rem)] pb-8">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
          <div>
            <Label tone="dark">{t.clock}</Label>
            <p className="mt-3 font-serif text-[2.4rem] leading-none">
              <VeniceClock />
            </p>
            <p className="mt-6 max-w-[28ch] text-[0.95rem] text-sabbia">{t.tagline}</p>
          </div>

          <div>
            <Label tone="dark">{t.where}</Label>
            <address className="mt-4 space-y-1 text-[0.98rem] not-italic">
              <p className="font-serif text-xl">{site.name}</p>
              <p>
                {contacts.address ? (
                  <>
                    {contacts.address}
                    {contacts.postalCode ? `, ${contacts.postalCode}` : ""}
                  </>
                ) : (
                  <Tbc label={t.address} tbc={tbc} tone="dark" />
                )}
              </p>
              <p>
                {site.locality}, {site.city} ({site.province})
              </p>
            </address>
          </div>

          <div>
            <Label tone="dark">{t.contacts}</Label>
            <ul className="mt-4 space-y-1 text-[0.98rem]">
              <li>
                {contacts.phone ? (
                  <a className={linkClass} href={`tel:${contacts.phone.replace(/\s/g, "")}`}>
                    {contacts.phone}
                  </a>
                ) : (
                  <Tbc label={t.phone} tbc={tbc} tone="dark" />
                )}
              </li>
              <li>
                {contacts.email ? (
                  <a className={linkClass} href={`mailto:${contacts.email}`}>
                    {contacts.email}
                  </a>
                ) : (
                  <Tbc label={t.email} tbc={tbc} tone="dark" />
                )}
              </li>
              <li>
                {contacts.whatsapp ? (
                  <a
                    className={linkClass}
                    href={`https://wa.me/${contacts.whatsapp}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t.whatsapp}
                    <span className="sr-only"> ({dict.common.externalSite})</span>
                  </a>
                ) : (
                  <Tbc label={t.whatsapp} tbc={tbc} tone="dark" />
                )}
              </li>
            </ul>
          </div>

          <nav aria-label={t.pages}>
            <Label tone="dark">{t.pages}</Label>
            <ul className="mt-2 text-[0.98rem]">
              {(["rooms", "venice", "book"] as const).map((key) => (
                <li key={key}>
                  <Link className={linkClass} href={href(key, lang)}>
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className={linkClass}
                  href={href("home", other)}
                  hrefLang={other}
                  lang={other}
                >
                  {dict.nav.switchTo}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Grande scritta, come nell'insegna */}
        <p
          aria-hidden="true"
          className="mt-[clamp(3rem,8vw,6rem)] font-serif text-[clamp(4.2rem,17.5vw,15rem)] leading-[0.82] tracking-[-0.03em] text-ocra italic select-none"
          style={{ fontVariationSettings: '"SOFT" 100' }}
        >
          Belvedere
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-crema/20 pt-6 text-[0.82rem] text-sabbia md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>
              {contacts.cin ? `${t.cin} ${contacts.cin}` : <Tbc label={t.cin} tbc={tbc} tone="dark" />}
            </span>
            <span>
              {contacts.vatNumber ? (
                `${t.vat} ${contacts.vatNumber}`
              ) : (
                <Tbc label={t.vat} tbc={tbc} tone="dark" />
              )}
            </span>
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link className={linkClass} href={href("privacy", lang)}>
              {t.privacy}
            </Link>
            <Link className={linkClass} href={href("cookies", lang)}>
              {t.cookies}
            </Link>
            <a className={linkClass} href="#contenuto">
              {t.backToTop} ↑
            </a>
          </p>
        </div>
        <p className="mt-4 text-[0.82rem] text-sabbia">
          © {site.name}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
