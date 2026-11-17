# Nuova Locanda Belvedere — sito web

Sito bilingue (italiano e inglese) di una locanda di otto camere a Marghera, Venezia.
Serve a ricevere richieste di prenotazione dirette.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.

## Avvio

```bash
npm install
npm run dev
```

Il sito si apre su `http://localhost:3000`.

Per provare la versione di produzione:

```bash
npm run build
npm run start
```

## Pagine

| Pagina | Italiano | Inglese |
|---|---|---|
| Home | `/` | `/en` |
| Camere | `/camere` | `/en/rooms` |
| Venezia | `/venezia` | `/en/venice` |
| Prenota | `/prenota` | `/en/book` |
| Privacy | `/privacy` | `/en/privacy` |
| Cookie | `/cookie` | `/en/cookies` |

## Dove si cambiano i contenuti

- **Contatti, CIN, orari, punteggi:** `content/site.ts`. Un valore `null` compare nel sito come "da confermare". Per confermarlo si scrive il valore al posto di `null`.
- **Sistemazioni:** `content/rooms.ts`.
- **Testi:** `content/i18n/it.ts` e `content/i18n/en.ts`.
- **Foto:** si aggiungono in `public/images/` e si registrano in `content/photos.ts`.

## Variabili d'ambiente

Copiare `.env.example` in `.env.local`. Nessun valore è obbligatorio per avviare il sito.
Senza la chiave del servizio email il modulo non accetta richieste: risponde con un errore e propone il telefono. I dati degli ospiti non finiscono mai nel log.

## Documenti

- `docs/direzione-visiva.md`: concept, palette, font, foto, domande per il titolare.
- `docs/progress.md`: fasi, decisioni tecniche, esiti delle verifiche.
- `AGENTS.md`: note per chi lavora sul codice con questa versione di Next.js.
