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
- [ ] Approvazione dell'utente.

### Decisioni proposte (da approvare)

- Mezzo consigliato: **autobus 6 o 6L**, fermata **Rizzardi Carrer**, direzione **VENEZIA**, 13 minuti fino a Piazzale Roma, senza cambi.
- Ritorno: 6 o 6L da Piazzale Roma, scendere a **Durando Bellinato**. Di notte la **N2**.
- Tram: la T2 serve per Mestre centro; per Venezia serve il cambio con la T1 a Mestre Centro, quindi non si consiglia.
- Tre colori di linea: autobus verde, tram blu (nuovo token), treno inchiostro. Locanda terracotta.

## Fase 2 — dati
- [ ] `content/transport.ts` con tipi, fonti e date.
- [ ] Aggiornare `research_notes/Dati Nuova Locanda Belvedere/trasporti.md`.

## Fase 3 — testi, elenco e card
- [ ] Dizionari it/en, `VenicePage.tsx`, `VeniceSection`.

## Fase 4 — mappa
- [ ] Nuovo componente, versione mobile, link a Google Maps, animazione opzionale, pulizia del mosaico.

## Fase 5 — verifica
- [ ] tsc, lint, build, route uguali; browser a 375 e 1440 in it/en; movimento ridotto e senza JavaScript; contrasti; tre dati ricontrollati; test dei 5 secondi.

## Fase 6 — documenti e commit
- [ ] `docs/progress.md`, `docs/direzione-visiva.md`, `docs/da-completare.md`; un commit per fase, niente push.
