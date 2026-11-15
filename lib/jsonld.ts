import { routes } from "@/content/routes";
import { bathAmenities, roomAmenities } from "@/content/rooms";
import { contacts, site, type Locale } from "@/content/site";
import { getDictionary } from "@/content/i18n";

/**
 * Dati strutturati LodgingBusiness per la home.
 * Contiene solo dati verificati: indirizzo, telefono e punteggi
 * entrano qui solo quando sono confermati in content/site.ts.
 */
export function lodgingJsonLd(lang: Locale) {
  const meta = getDictionary(lang).meta.home;
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${site.url}/#locanda`,
    name: site.name,
    description: meta.description,
    url: site.url + routes.home[lang],
    image: `${site.url}/images/og-ingresso.jpg`,
    numberOfRooms: site.roomCount,
    availableLanguage: ["it", "en"],
    address: {
      "@type": "PostalAddress",
      ...(contacts.address ? { streetAddress: contacts.address } : {}),
      ...(contacts.postalCode ? { postalCode: contacts.postalCode } : {}),
      addressLocality: `${site.locality}, ${site.city}`,
      addressRegion: site.province,
      addressCountry: site.country,
    },
    ...(contacts.phone ? { telephone: contacts.phone } : {}),
    ...(contacts.email ? { email: contacts.email } : {}),
    amenityFeature: [...roomAmenities[lang], ...bathAmenities[lang]].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}

/** Serializza in modo sicuro per un tag <script>. */
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
