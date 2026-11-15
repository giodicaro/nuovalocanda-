# Avanzamento — sito Nuova Locanda Belvedere

Presentazione al cliente: giovedì 19/11/2026, mattina.
Brief completo: messaggio del committente del 15/11/2026. Direzione: `docs/direzione-visiva.md`.

## Fasi

- [x] **Fase 1 — studio e direzione visiva.** Approvata il 15/11/2026 con due modifiche: palette più accesa, hero animata.
- [x] **Fase 2 — fondamenta.** Git, token, font, due lingue, layout, header, footer, scroll morbido.
- [x] **Fase 3 — pagine e contenuti.** Home, camere, Venezia, prenota, privacy, cookie, in italiano e in inglese.
- [x] **Fase 4 — interazioni e rifinitura.** Slider con filtro, mappa a mosaico, modulo con route API, WhatsApp, SEO, dati strutturati.
- [x] **Fase 5 — verifica.** tsc, lint, build, quattro larghezze, modulo, tastiera, Lighthouse, revisione indipendente.

## Come riprendere il lavoro

```bash
npm install
npm run dev        # sviluppo, http://localhost:3000
npm run build      # build di produzione
npm run start      # avvia la build di produzione
npx tsc --noEmit   # controllo dei tipi
npm run lint       # controllo del codice
```

Dove stanno le cose:

| Che cosa | File |
|---|---|
| Contatti, CIN, orari, punteggi, numero di letti della camerata | `content/site.ts` |
| Sistemazioni e abbinamento foto-camera | `content/rooms.ts` |
| Foto, testi alternativi, misura massima a schermo | `content/photos.ts` |
| Testi in italiano e in inglese | `content/i18n/it.ts`, `content/i18n/en.ts` |
| Percorsi delle pagine nelle due lingue | `content/routes.ts` |
| Colori, font, animazioni | `app/globals.css`, `app/fonts.ts` |
| Modulo: validazione, invio, route | `lib/request.ts`, `lib/booking.ts`, `app/api/richiesta/route.ts` |
| Variabili d'ambiente | `.env.example` |
| Ritagli delle foto | `scripts/prepare-photos.mjs` |

Per confermare un dato: in `content/site.ts` si sostituisce `null` con il valore. Il segnaposto "da confermare" sparisce da solo.

## Decisioni prese

- **Lingue senza librerie.** Due layout radice: `app/(it)` e `app/(en)`. Ogni pagina è un file sottile che richiama un componente in `components/pages/` con la lingua. Il cambio lingua ricarica la pagina, perché i due layout hanno `<html lang>` diverso.
- **Font.** Fraunces (peso 400, tondo e corsivo) e Figtree, serviti dal sito con `next/font`. Fraunces senza assi variabili: 41 KB invece di 270 KB.
- **Animazioni.** Hero in solo CSS e SVG. Framer Motion solo nello slider, caricato dopo. GSAP e Three.js rimossi.
- **Comparsa allo scroll.** Un solo componente client (`ClientEffects`) con IntersectionObserver. Il contenuto è nell'HTML e resta visibile senza JavaScript.
- **Prestazioni.** Sezioni con `content-visibility: auto`. Slider e modulo della home si attivano quando si avvicinano allo schermo (`components/home/Islands.tsx`), con una versione statica scritta dal server. La mappa a mosaico disegna le tessere nel browser. I link non precaricano le altre pagine. L'orologio di Venezia gira solo quando è visibile e ha misure fisse.
- **Un file "use client" non può esportare valori a un componente server.** Le misure della mappa stanno in `components/home/mosaic-grid.ts` per questo motivo.
- **Stili di base nel livello `base`.** Senza `@layer base` le regole su `h1`, `h2`, `h3` vincono sulle utilità Tailwind.
- **Titolo dell'hero.** "Una stanza a Marghera. Venezia, appena oltre il ponte." Non dice "a un tram da Venezia": secondo ACTV la linea T2 collega Marghera a Mestre Centro e la T1 collega Mestre a Venezia, quindi il viaggio in tram può richiedere un cambio.
- **Foto.** 14 usate, 3 non pubblicate: la 02 è un doppione, la 08 e la 10 sono riproduzioni di opere di terzi.
- **Recensioni.** Sezione spenta (`ratings.enabled = false`) finché il titolare non conferma.
- **Pagina 404.** È quella predefinita di Next.js. Una pagina 404 personalizzata con due layout radice richiede una funzione ancora sperimentale: rimandata.

## Esiti della verifica (15/11/2026)

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: senza errori. 12 pagine statiche, 1 route dinamica.
- 12 pagine × 4 larghezze (1440, 1024, 390, 375 px): nessuno scroll orizzontale, un solo `h1`, nessun errore di console, nessuna richiesta a server esterni, nessun contenuto rimasto nascosto.
- Modulo: campi vuoti rifiutati, email non valida e date invertite rifiutate, invio corretto confermato, limite di frequenza attivo, sistemazione precompilata da "Richiedi questa camera".
- Tastiera: frecce nello slider, Esc nel menu mobile con ritorno del focus, focus sul primo campo errato.
- Movimento ridotto: animazioni ferme, niente scroll morbido.
- Lighthouse mobile (Performance / Accessibilità / Best Practices / SEO): Home 91 / 100 / 100 / 100; Camere 95 / 100 / 100 / 100; Venezia 90 / 100 / 100 / 100; Prenota 90 / 100 / 100 / 100; Home inglese 95 / 100 / 100 / 100; Camere inglese 96 / 100 / 100 / 100. La Performance cambia di alcuni punti da una prova all'altra secondo il carico del computer.

## Da fare prima della messa online

Vedi l'elenco "Domande per il titolare" in `docs/direzione-visiva.md`, sezione 10. In sintesi: contatti e CIN, orari, prezzi, camerata, scale, foto mancanti, abbinamento foto-camera, vantaggi della prenotazione diretta, uso dei punteggi, diritti sulle foto, verifica dei testi legali, dominio, chiave del servizio email.
