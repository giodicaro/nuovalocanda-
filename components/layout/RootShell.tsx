import type { ReactNode } from "react";
import { figtree, fraunces } from "@/app/fonts";
import { getDictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";
import { ClientEffects } from "./ClientEffects";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Struttura comune ai due layout radice (italiano e inglese). */
export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const dict = getDictionary(lang);
  return (
    <html lang={lang} className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="flex min-h-[100svh] flex-col">
        <Header lang={lang} nav={dict.nav} />
        <main id="contenuto" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <ClientEffects />
      </body>
    </html>
  );
}
