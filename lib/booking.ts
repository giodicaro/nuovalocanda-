import type { RequestData, RequestErrors } from "./request";

/**
 * Punto unico da cui il modulo invia la richiesta.
 *
 * Oggi chiama POST /api/richiesta, che manda un'email alla locanda.
 * Un futuro booking engine con pagamento sostituisce solo questa
 * funzione (e la route): il modulo e i dati restano gli stessi.
 */

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: RequestErrors }
  | { ok: false; reason: "rate" | "generic" };

export async function sendRequest(
  data: RequestData & { /** Campo trappola anti-spam: deve restare vuoto. */ trap: string },
): Promise<SendResult> {
  try {
    const response = await fetch("/api/richiesta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) return { ok: true };
    if (response.status === 429) return { ok: false, reason: "rate" };
    if (response.status === 422) {
      const body = (await response.json()) as { errors?: RequestErrors };
      return { ok: false, reason: "invalid", errors: body.errors ?? {} };
    }
    return { ok: false, reason: "generic" };
  } catch {
    return { ok: false, reason: "generic" };
  }
}
