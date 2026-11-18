# Trasporti e mappa: checklist delle fasi

Branch: `feature/trasporti-mappa`. Niente merge, push o deploy senza approvazione.
Se il contesto si perde: ripartire da questo file, `git log` e `git status`.

## Fase 1 — ricerca e proposta (punto di arresto)

- [x] Letti i file del prompt (mappa a mosaico, VenicePage, VeniceSection, dizionari, ricerca del 16/11).
- [x] Punto di partenza sul codice di `main` (18/11/2026): `npx tsc --noEmit` exit 0, `npm run lint` exit 0, `npm run build` exit 0.
  Route: `/`, `/_not-found`, `/api/richiesta` (dinamica), `/camere`, `/cookie`, `/en`, `/en/book`, `/en/cookies`, `/en/privacy`, `/en/rooms`, `/en/venice`, `/icon.svg`, `/prenota`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/venezia`. Tutte statiche tranne `/api/richiesta`.
- [x] Creato il branch.
- [x] Ricerca su fonti ufficiali: GTFS ACTV (`actv_aut.zip`, valido 16/11/2026–15/01/2027), PDF orari ACTV di 6, 6L, T1, T2, N1, N2, avvisi ACTV, Google Maps per i minuti a piedi.
- [x] Treno (quadro orario RFI di Santa Lucia, valido 14/06–12/12/2026; tariffa Trenitalia 14/VE) e biglietti (pagina tariffe AVM): ricontrollati di persona prezzo 1,50 € bus/tram, 1,50 € treno, primo e ultimo treno.
- [x] Schizzo della mappa (solo nello scratchpad, non nel progetto).
- [x] Approvazione dell'utente (18/11/2026).

### Decisioni proposte (da approvare)

- Mezzo consigliato: **autobus 6 o 6L**, fermata **Rizzardi Carrer**, direzione **VENEZIA**, 13 minuti fino a Piazzale Roma, senza cambi.
- Ritorno: 6 o 6L da Piazzale Roma, scendere a **Durando Bellinato**. Di notte la **N2**.
- Tram: la T2 serve per Mestre centro; per Venezia serve il cambio con la T1 a Mestre Centro, quindi non si consiglia.
- Tre colori di linea: autobus verde, tram blu (nuovo token), treno inchiostro. Locanda terracotta.

## Fase 2 — dati
- [x] `content/transport.ts` con tipi, fonti e date.
- [x] `research_notes/Dati Nuova Locanda Belvedere/trasporti.md`: nuova sezione del 18/11/2026 (la cartella non è nel repository).

## Fase 3 — testi, elenco e card
- [x] Dizionari it/en (stessi campi, controllato con tsc), `VenicePage.tsx`, `VeniceSection`, `components/venice/transport-ui.tsx`.
- Nessun dato resta "da confermare": tutti hanno una fonte ufficiale.

## Fase 4 — mappa
- [x] `components/venice/RouteMap.tsx`: SVG server, orizzontale da 1024 px, verticale sotto, link a Google Maps, anello della locanda che pulsa (unica animazione).
- [x] Rimossi `MosaicMap.tsx`, `MosaicTiles.tsx`, `mosaic-grid.ts` e gli stili `.mosaico` (non usati altrove; le foto mancanti usano un motivo CSS).
- [x] Nuovi token `--color-laguna` e `--color-canale`.

## Fase 5 — verifica (18/11/2026)
- [x] tsc, lint, build: exit 0. Route identiche alla Fase 1 (18, tutte statiche tranne `/api/richiesta`).
- [x] Home e Venezia, it/en, 375 e 1440 px: nessuno scroll orizzontale, nessun errore o avviso in console.
- [x] Senza JavaScript e con movimento ridotto: mappa completa, anello fermo.
- [x] Testo della mappa: minimo 12,3 px a 360 px, 12,9 a 375, 12,9 a 1024, 16,5 a 1440.
- [x] Contrasti misurati sui token: testo ≥ 5,97, linee e simboli ≥ 3,29.
- [x] Ricontrollati sulla fonte: N2 00:01–04:31 ogni 30 min (PDF ACTV), biglietto bus e tram 1,50 € (AVM), treno 1,50 € (Trenitalia).
- [x] Test dei 5 secondi sulla pagina Venezia a 375 px: superato.

## Fase 6 — documenti e commit
- [x] `docs/progress.md`, `docs/direzione-visiva.md` aggiornati; `docs/da-completare.md` aggiornato (file non nel repository).
- [x] Un commit per fase sul branch. Nessun push.

## Cosa resta
- Approvare e unire il branch (e il push, che fa partire il deploy).
- Domande al titolare: mezzo o fermata che consiglia; linea 53E da Bandiera Durando; civico.
- Riverificare gli orari: treni dopo il 13/12/2026, ACTV prima del 15/01/2027.
