/**
 * Dati della struttura e valori DA CONFERMARE CON IL TITOLARE.
 *
 * Regola: un valore `null` non è mai scritto come fatto nel sito.
 * Al suo posto compare un segnaposto visibile ("da confermare").
 * Per confermare un dato basta sostituire `null` con il valore.
 */

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export type Localized<T = string> = Record<Locale, T>;

export const site = {
  name: "Nuova Locanda Belvedere",
  shortName: "NLB",
  /** Dominio definitivo: DA CONFERMARE. Si imposta con NEXT_PUBLIC_SITE_URL. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.nuovalocandabelvedere.example"
  ).replace(/\/$/, ""),
  locality: "Marghera",
  city: "Venezia",
  province: "VE",
  country: "IT",
  timeZone: "Europe/Rome",
  /** Numero totale di camere (dato del titolare). */
  roomCount: 8,
} as const;

/** Contatti e dati legali: tutti DA CONFERMARE CON IL TITOLARE. */
export const contacts: {
  address: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  /** Solo cifre con prefisso internazionale, es. "393331234567". Da .env. */
  whatsapp: string | null;
  /** Codice Identificativo Nazionale, obbligatorio negli annunci. */
  cin: string | null;
  vatNumber: string | null;
  legalName: string | null;
} = {
  address: null,
  postalCode: null,
  phone: null,
  email: null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || null,
  cin: null,
  vatNumber: null,
  legalName: null,
};

/** Soggiorno: tutto DA CONFERMARE CON IL TITOLARE. */
export const stay: {
  checkIn: string | null;
  checkOut: string | null;
  receptionHours: string | null;
  breakfast: Localized | null;
  parking: Localized | null;
  houseRules: Localized<string[]> | null;
} = {
  checkIn: null,
  checkOut: null,
  receptionHours: null,
  breakfast: null,
  parking: null,
  houseRules: null,
};

/**
 * Camerata condivisa mista.
 * DA CONFERMARE: il titolare parla di 5 letti, Booking.com mostra una
 * "Quadrupla Economy" con 4 letti a castello. Il numero sta solo qui.
 */
export const dormBeds = 5;

/**
 * Vantaggi della prenotazione diretta: DA CONFERMARE CON IL TITOLARE.
 * Finché l'elenco è vuoto il sito mostra tre riquadri segnaposto.
 * Non scrivere promesse non verificate ("miglior prezzo garantito").
 */
export const directBenefits: Localized<{ title: string; text: string }[]> = {
  it: [],
  en: [],
};

/**
 * Punteggi pubblici, rilevati il 15/11/2026 dalle schede Booking.com e Google.
 * `enabled` resta `false` finché il titolare non conferma che si possono mostrare.
 */
export const ratings = {
  enabled: false as boolean,
  checkedOn: "2026-11-15",
  booking: {
    score: 8.6,
    outOf: 10,
    reviews: 675,
    label: { it: "Favoloso", en: "Fabulous" } satisfies Localized,
    details: [
      { key: "staff", score: 9.3 },
      { key: "cleanliness", score: 9.1 },
      { key: "location", score: 8.9 },
      { key: "value", score: 8.9 },
      { key: "comfort", score: 8.7 },
      { key: "wifi", score: 8.6 },
      { key: "facilities", score: 8.4 },
    ],
  },
  google: { score: 4.2, outOf: 5, reviews: 294 },
} as const;
