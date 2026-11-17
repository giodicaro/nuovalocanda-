import type { Metadata } from "next";
import "./globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { NotFoundContent } from "@/components/pages/NotFoundContent";
import { Scallop } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { layoutMetadata } from "@/lib/seo";

/**
 * 404 per gli indirizzi che non corrispondono a nessuna pagina.
 * Il sito ha due layout radice (italiano e inglese), quindi serve la 404
 * globale (flag experimental.globalNotFound in next.config.ts).
 * Questa pagina non conosce l'indirizzo richiesto: mostra prima l'italiano,
 * poi l'inglese. Next.js aggiunge da solo il meta robots "noindex".
 */
export { viewport } from "@/lib/seo";
export const metadata: Metadata = {
  ...layoutMetadata("it"),
  title: `Pagina non trovata · Page not found — ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="it">
      <NotFoundContent lang="it" />
      <div lang="en" className="relative bg-carta">
        <Scallop color="var(--color-crema)" />
        <NotFoundContent lang="en" compact />
      </div>
    </RootShell>
  );
}
