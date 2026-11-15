import { rooms } from "@/content/rooms";
import { locales, type Locale } from "@/content/site";

/**
 * Richiesta di soggiorno: struttura dei dati e validazione.
 * Lo stesso codice gira nel browser (prima dell'invio) e sul server
 * (route /api/richiesta), così le regole non possono divergere.
 */

export type RequestData = {
  name: string;
  email: string;
  phone: string;
  /** Date nel formato AAAA-MM-GG. */
  arrival: string;
  departure: string;
  guests: number;
  /** Slug della sistemazione, oppure "" per nessuna preferenza. */
  room: string;
  message: string;
  consent: boolean;
  lang: Locale;
};

export type RequestField = keyof Omit<RequestData, "lang" | "room">;

/** Codici di errore: i testi stanno nei file di traduzione (form.errors). */
export type RequestErrorCode =
  | "required"
  | "email"
  | "date"
  | "past"
  | "order"
  | "guests"
  | "consent"
  | "tooLong";

export type RequestErrors = Partial<Record<RequestField, RequestErrorCode>>;

export type ValidationResult =
  | { ok: true; data: RequestData }
  | { ok: false; errors: RequestErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const isRealDate = (value: string) => {
  if (!DATE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/**
 * @param input dati non fidati (dal modulo o dal corpo della richiesta)
 * @param today data di oggi a Venezia, AAAA-MM-GG
 */
export function validateRequest(input: unknown, today: string): ValidationResult {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const errors: RequestErrors = {};

  const name = text(raw.name);
  if (!name) errors.name = "required";
  else if (name.length > 120) errors.name = "tooLong";

  const email = text(raw.email);
  if (!email) errors.email = "required";
  else if (email.length > 200 || !EMAIL.test(email)) errors.email = "email";

  const phone = text(raw.phone);
  if (phone.length > 40) errors.phone = "tooLong";

  const arrival = text(raw.arrival);
  if (!arrival) errors.arrival = "required";
  else if (!isRealDate(arrival)) errors.arrival = "date";
  else if (arrival < today) errors.arrival = "past";

  const departure = text(raw.departure);
  if (!departure) errors.departure = "required";
  else if (!isRealDate(departure)) errors.departure = "date";
  else if (!errors.arrival && departure <= arrival) errors.departure = "order";

  const guests = Number(raw.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) errors.guests = "guests";

  const message = text(raw.message);
  if (message.length > 2000) errors.message = "tooLong";

  if (raw.consent !== true) errors.consent = "consent";

  const roomSlug = text(raw.room);
  const room = rooms.some((r) => r.slug === roomSlug) ? roomSlug : "";
  const lang = locales.includes(raw.lang as Locale) ? (raw.lang as Locale) : "it";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: { name, email, phone, arrival, departure, guests, room, message, consent: true, lang },
  };
}

/** Data di oggi a Venezia, AAAA-MM-GG. */
export const todayInVenice = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date());
