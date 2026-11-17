"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { rooms } from "@/content/rooms";
import { href } from "@/content/routes";
import { contacts, type Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { sendRequest } from "@/lib/booking";
import {
  todayInVenice,
  validateRequest,
  type RequestErrors,
  type RequestField,
} from "@/lib/request";
import { buttonStyles, Tbc } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

const fieldOrder: RequestField[] = [
  "name",
  "email",
  "phone",
  "arrival",
  "departure",
  "guests",
  "message",
  "consent",
];

// "Richiedi questa camera" apre /prenota?camera=slug: la sistemazione
// arriva già scelta. Si legge l'indirizzo senza passare dal server.
const noop = () => () => {};
const roomFromUrl = () => new URLSearchParams(window.location.search).get("camera") ?? "";
const roomOnServer = () => "";

const inputClass =
  "block min-h-12 w-full rounded-none border-0 border-b-[1.5px] border-legno/80 bg-transparent px-0 py-2 text-[1.05rem] text-inchiostro transition-colors duration-300 placeholder:text-legno/60 hover:border-legno focus:border-mattone aria-[invalid=true]:border-mattone";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-[0.7rem] font-semibold tracking-[0.18em] text-legno uppercase"
      >
        {label}
        {optional ? (
          <span className="font-normal tracking-normal normal-case">({optional})</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-aiuto`} className="mt-1.5 text-[0.85rem] text-legno">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-errore`} className="mt-1.5 text-[0.88rem] font-medium text-mattone">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RequestForm({
  lang,
  t,
  common,
  heading: Heading = "h3",
}: {
  lang: Locale;
  t: Dictionary["form"];
  common: Dictionary["common"];
  /** Livello del titolo: dipende dalla pagina che ospita il modulo. */
  heading?: "h2" | "h3";
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const roomParam = useSyncExternalStore(noop, roomFromUrl, roomOnServer);
  const [roomChoice, setRoomChoice] = useState<string | null>(null);
  const room = roomChoice ?? (rooms.some((r) => r.slug === roomParam) ? roomParam : "");

  const [errors, setErrors] = useState<RequestErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [failure, setFailure] = useState<"rate" | "generic" | null>(null);

  const message = (field: RequestField) => {
    const code = errors[field];
    return code ? t.errors[code] : undefined;
  };

  const describe = (field: RequestField, hint = false) =>
    errors[field] ? id(`${field}-errore`) : hint ? id(`${field}-aiuto`) : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      arrival: form.get("arrival"),
      departure: form.get("departure"),
      guests: Number(form.get("guests")),
      room,
      message: form.get("message"),
      consent: form.get("consent") === "on",
      lang,
    };

    const result = validateRequest(payload, todayInVenice());
    setFailure(null);

    if (!result.ok) {
      setErrors(result.errors);
      const first = fieldOrder.find((field) => result.errors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    const sent = await sendRequest({ ...result.data, trap: String(form.get("nlb_lasciare_vuoto") ?? "") });

    if (sent.ok) {
      setStatus("sent");
      requestAnimationFrame(() => successRef.current?.focus());
      return;
    }
    setStatus("idle");
    if (sent.reason === "invalid") setErrors(sent.errors);
    else setFailure(sent.reason);
  }

  const whatsapp = contacts.whatsapp ? (
    <a
      href={`https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonStyles.outline, "w-full sm:w-auto")}
    >
      {t.whatsapp}
      <span className="sr-only"> ({common.externalSite})</span>
    </a>
  ) : (
    <p className="text-[0.95rem]">
      <Tbc tbc={t.whatsappTbc} />
    </p>
  );

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-sabbia bg-carta p-[clamp(1.5rem,4vw,3rem)] outline-none"
      >
        <p className="font-serif text-[2.2rem] leading-tight text-verde">{t.successTitle}</p>
        <p className="mt-4 max-w-[44ch] text-legno">{t.successText}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setRoomChoice(null);
          }}
          className={cn(buttonStyles.outline, "mt-8")}
        >
          {t.another}
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="border border-sabbia bg-carta p-[clamp(1.5rem,4vw,3rem)] shadow-[0_18px_40px_-30px_rgba(34,30,26,0.45)]">
      <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={id("titolo")}>
        <Heading id={id("titolo")} className="font-serif text-[1.9rem] leading-tight">
          {t.title}
        </Heading>
        <p className="mt-2 text-[0.95rem] text-legno">{t.note}</p>

        <div aria-live="assertive">
          {hasErrors || failure ? (
            <p
              role="alert"
              className="mt-6 border-l-[3px] border-mattone bg-crema px-4 py-3 text-[0.95rem] font-medium text-mattone"
            >
              {failure ? t.errors[failure] : t.errors.summary}
              {failure === "generic" && contacts.phone ? (
                <>
                  {" "}
                  {t.errors.callUs}{" "}
                  <a className="whitespace-nowrap underline" href={`tel:${contacts.phone.replace(/\s/g, "")}`}>
                    {contacts.phone}
                  </a>
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field id={id("name")} label={t.name} error={message("name")} className="sm:col-span-2">
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={describe("name")}
              className={inputClass}
            />
          </Field>

          <Field id={id("email")} label={t.email} error={message("email")}>
            <input
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={describe("email")}
              className={inputClass}
            />
          </Field>

          <Field id={id("phone")} label={t.phone} optional={t.optional} error={message("phone")}>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={describe("phone")}
              className={inputClass}
            />
          </Field>

          <Field id={id("arrival")} label={t.arrival} error={message("arrival")}>
            <input
              id={id("arrival")}
              name="arrival"
              type="date"
              required
              aria-invalid={!!errors.arrival}
              aria-describedby={describe("arrival")}
              className={inputClass}
            />
          </Field>

          <Field id={id("departure")} label={t.departure} error={message("departure")}>
            <input
              id={id("departure")}
              name="departure"
              type="date"
              required
              aria-invalid={!!errors.departure}
              aria-describedby={describe("departure")}
              className={inputClass}
            />
          </Field>

          <Field id={id("guests")} label={t.guests} error={message("guests")}>
            <select
              id={id("guests")}
              name="guests"
              defaultValue="2"
              aria-invalid={!!errors.guests}
              aria-describedby={describe("guests")}
              className={inputClass}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field id={id("room")} label={t.room}>
            <select
              id={id("room")}
              name="room"
              value={room}
              onChange={(event) => setRoomChoice(event.target.value)}
              className={inputClass}
            >
              <option value="">{t.roomAny}</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name[lang]}
                  {r.verified ? "" : ` (${common.tbc})`}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id={id("message")}
            label={t.message}
            optional={t.optional}
            hint={t.messageHint}
            error={message("message")}
            className="sm:col-span-2"
          >
            <textarea
              id={id("message")}
              name="message"
              rows={3}
              aria-invalid={!!errors.message}
              aria-describedby={describe("message", true)}
              className={cn(inputClass, "resize-y")}
            />
          </Field>

          {/* Campo trappola anti-spam: nascosto a persone e lettori di schermo. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={id("trappola")}>Lasciare vuoto</label>
            <input id={id("trappola")} name="nlb_lasciare_vuoto" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <input
                id={id("consent")}
                name="consent"
                type="checkbox"
                required
                aria-invalid={!!errors.consent}
                aria-describedby={describe("consent")}
                className="mt-1 size-5 shrink-0 accent-mattone"
              />
              <label htmlFor={id("consent")} className="text-[0.95rem] text-inchiostro">
                {t.consent}.{" "}
                <Link prefetch={false}
                  href={href("privacy", lang)}
                  className="font-medium text-mattone underline underline-offset-4 hover:text-inchiostro"
                >
                  {t.consentLink}
                </Link>
              </label>
            </div>
            {errors.consent ? (
              <p id={id("consent-errore")} className="mt-1.5 text-[0.88rem] font-medium text-mattone">
                {t.errors.consent}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
          <button
            type="submit"
            aria-disabled={status === "sending"}
            className={cn(
              buttonStyles.solid,
              "w-full sm:w-auto",
              status === "sending" && "cursor-progress opacity-70",
            )}
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
          <span className="hidden text-[0.8rem] tracking-[0.14em] text-legno uppercase sm:inline">
            {t.or}
          </span>
          {whatsapp}
        </div>
      </form>
    </div>
  );
}
