import { roomBySlug } from "@/content/rooms";
import { site } from "@/content/site";
import { todayInVenice, validateRequest, type RequestData } from "@/lib/request";

/**
 * POST /api/richiesta — riceve una richiesta di soggiorno.
 * Non gestisce pagamenti. Protezioni: campo trappola, limite di
 * frequenza per indirizzo IP, limite di dimensione, validazione.
 *
 * Invio email: se in .env ci sono RESEND_API_KEY, REQUEST_TO_EMAIL e
 * REQUEST_FROM_EMAIL la richiesta parte con il servizio Resend.
 * Senza chiave la richiesta è scritta nel log del server e l'ospite
 * vede comunque la conferma.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 10_000;

// Limite semplice in memoria: basta per un solo server.
// Con più istanze va spostato su un archivio condiviso.
const hits = new Map<string, number[]>();

function tooManyRequests(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function emailText(data: RequestData) {
  const room = data.room ? roomBySlug(data.room)?.name.it : "Nessuna preferenza";
  return [
    `Nuova richiesta dal sito ${site.name}`,
    "",
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Telefono: ${data.phone || "non indicato"}`,
    `Arrivo: ${data.arrival}`,
    `Partenza: ${data.departure}`,
    `Ospiti: ${data.guests}`,
    `Sistemazione: ${room}`,
    `Lingua dell'ospite: ${data.lang}`,
    "",
    "Messaggio:",
    data.message || "(nessun messaggio)",
  ].join("\n");
}

async function deliver(data: RequestData) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REQUEST_TO_EMAIL;
  const from = process.env.REQUEST_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.info("[richiesta] Email non configurata: richiesta registrata nel log.\n" + emailText(data));
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Richiesta dal sito: ${data.name}, ${data.arrival} → ${data.departure}`,
      text: emailText(data),
    }),
  });
  if (!response.ok) {
    console.error("[richiesta] Invio email non riuscito:", response.status, await response.text());
  }
  return response.ok;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ ok: false }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Campo trappola: un ospite vero non lo vede e non lo compila.
  // Si risponde "ok" per non dare indizi a chi invia spam.
  const trap = (body as { website?: unknown } | null)?.website;
  if (typeof trap === "string" && trap.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "sconosciuto";
  if (tooManyRequests(ip, Date.now())) {
    return Response.json({ ok: false }, { status: 429, headers: { "Retry-After": "600" } });
  }

  const result = validateRequest(body, todayInVenice());
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  try {
    const sent = await deliver(result.data);
    if (!sent) return Response.json({ ok: false }, { status: 502 });
  } catch (error) {
    console.error("[richiesta] Errore durante l'invio:", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
