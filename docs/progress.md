# Avanzamento — sito Nuova Locanda Belvedere

Presentazione al cliente: giovedì 19/11/2026, mattina.
Brief completo: messaggio dell'utente del 15/11/2026. Direzione: `docs/direzione-visiva.md`.

## Fasi

- [x] **Fase 1 — studio e direzione visiva** (15/11/2026). In attesa di approvazione.
- [ ] Fase 2 — fondamenta (git, token, font, lingue, layout, header, footer, Lenis)
- [ ] Fase 3 — pagine e contenuti (IT + EN)
- [ ] Fase 4 — interazioni e rifinitura
- [ ] Fase 5 — verifica (tsc, lint, build, Lighthouse, revisione testi)

## Fatto in Fase 1

- Letto `AGENTS.md`. Stato del progetto: template create-next-app, Next 16.4.6, Tailwind 4.3, git non inizializzato.
- Aperte le 17 foto e le 3 immagini dell'anima. Classificazione corretta in `docs/direzione-visiva.md`, sezione 8.
- Studiato dal vivo `hotelaurelia.online` (home, `/odalar`, `/rezervasyon`).
- Campionati i colori dalle foto e calcolati i contrasti WCAG.
- Consultate le skill `ui-ux-pro-max`, `design-system`, `ui-styling`. Python non è installato, quindi gli script di ricerca della skill non partono: ho letto i file dati direttamente.
- Verificato che `next/font/google` di questa versione include Fraunces (assi SOFT, WONK, opsz, wght) e Figtree.

## Decisioni prese

- Font: Fraunces + Figtree.
- Palette: quella del brief più `--mattone` `#9C4526` (testo e pulsanti, AA) e `--sabbia` `#E6DAC6` (linee).
- Animazioni: Framer Motion resta, GSAP da rimuovere. Three.js: un solo effetto candidato, da togliere se pesa.
- Foto 02 (doppione), 08 e 10 (opere di terzi) non pubblicate.
- La foto 14 è una tripla (tre letti), non una doppia.
- Sezione "Dicono di noi": spenta da configurazione finché il titolare non conferma.

## Da fare in Fase 2 e 3 (promemoria tecnico)

- Leggere `node_modules/next/dist/docs/` per: routing e lingue, `proxy` (ex middleware), metadata, sitemap, `cacheComponents`.
- Lingue senza dipendenze esterne: italiano in radice, inglese sotto `/en` con percorsi tradotti.
- Verificare su fonti ufficiali (ACTV/AVM, Trenitalia, Comune di Venezia) i collegamenti e il contributo di accesso. Fonte in commento nel codice, tempi come "indicativi".
- Registrazione Booking, se servono altri dettagli: `C:\Users\foscolo\Videos\Registrazioni dello schermo\Registrazione dello schermo 2026-11-15 045940.mp4`.
