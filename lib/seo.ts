import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/content/i18n";
import { routes, type RouteKey } from "@/content/routes";
import { site, type Locale } from "@/content/site";
import { photos } from "@/content/photos";

export const viewport: Viewport = {
  themeColor: "#f8eedb",
  width: "device-width",
  initialScale: 1,
};

/** Metadati comuni al layout di una lingua. */
export function layoutMetadata(lang: Locale): Metadata {
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    formatDetection: { telephone: false },
    // Senza indirizzo definitivo il sito non va indicizzato (vedi content/site.ts).
    ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: lang === "it" ? "it_IT" : "en_GB",
      alternateLocale: lang === "it" ? "en_GB" : "it_IT",
    },
  };
}

/** Metadati di una pagina: titolo, descrizione, canonical, hreflang, Open Graph. */
export function pageMetadata(key: RouteKey, lang: Locale): Metadata {
  const meta = getDictionary(lang).meta[key];
  const path = routes[key][lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        it: routes[key].it,
        en: routes[key].en,
        "x-default": routes[key].it,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: lang === "it" ? "it_IT" : "en_GB",
      alternateLocale: lang === "it" ? "en_GB" : "it_IT",
      images: [
        {
          url: "/images/og-ingresso.jpg",
          width: 1200,
          height: 630,
          alt: photos.ingresso.alt[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/og-ingresso.jpg"],
    },
  };
}
