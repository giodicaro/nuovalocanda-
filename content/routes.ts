import type { Locale } from "./site";

/** Percorsi tradotti. Italiano in radice, inglese sotto /en. */
export const routes = {
  home: { it: "/", en: "/en" },
  rooms: { it: "/camere", en: "/en/rooms" },
  venice: { it: "/venezia", en: "/en/venice" },
  book: { it: "/prenota", en: "/en/book" },
  privacy: { it: "/privacy", en: "/en/privacy" },
  cookies: { it: "/cookie", en: "/en/cookies" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const href = (key: RouteKey, lang: Locale, hash?: string) =>
  routes[key][lang] + (hash ? `#${hash}` : "");

/** Dato un percorso, trova la pagina corrispondente (per il cambio lingua). */
export function routeKeyFromPath(pathname: string): RouteKey | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].it === clean || routes[key].en === clean) return key;
  }
  return null;
}
