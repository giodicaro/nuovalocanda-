# Direzione visiva — Nuova Locanda Belvedere

Stato: **approvata il 15/11/2026** con due modifiche chieste dal committente: palette un po' più accesa e hero animata in modo simpatico ma misurato. Questo documento è aggiornato alle scelte finali.
La tavola di stile `docs/tavola-di-stile.html` mostra la prima proposta, prima delle due modifiche: vale come documento storico.

## 1. Concept

**"La locanda arancione alle porte di Venezia."**
Un posto semplice e accogliente, dove si dorme bene spendendo il giusto e la mattina si parte per Venezia in tram, autobus o treno.
Il sito usa come motivi grafici le cose vere della casa: l'intonaco terracotta, la tenda crema smerlata, l'insegna verticale "ALLOGGI", il balconcino bianco, la mappa di Venezia a tessere e il mosaico con il logo NLB.

## 2. Che cosa ho imparato dal sito di riferimento

Ho studiato dal vivo `hotelaurelia.online` (home, pagina camere, pagina prenotazione).

| Elemento del riferimento | Che cosa riprendo | Come lo adatto |
|---|---|---|
| Titoli serif su due righe, la seconda in corsivo | Il ritmo a due righe | Fraunces tondo + corsivo, in terracotta |
| Etichette piccole maiuscole molto spaziate (10–11 px) | Sì | Figtree 11–12 px, spaziatura 0,22em, con un quadratino terracotta |
| Sezioni alte con molto spazio vuoto (144 px sopra e sotto) | Sì | 96–160 px su desktop, 64–88 px su mobile |
| Slider camere a tutto schermo con scheda dati, contatore "03/03", frecce | La struttura | Foto verticale in cornice (non a tutto schermo), scheda dati accanto |
| Selettore estate/inverno nell'hero | L'idea di una scelta iniziale | Selettore del tipo di viaggio: da solo, in due, in gruppo |
| Schede numerate "01 / 10" | Sì | Numerazione per sistemazioni e per i tre mezzi di trasporto |
| Pagina camere: numero, titolo, testo, griglia dati, dotazioni, pulsante | Sì | Griglia dati: ospiti, letti, superficie, bagno |
| Form con campi a sola linea inferiore | Sì | Con etichette sempre visibili e messaggi di errore vicino al campo |
| Footer scuro con ora locale e grande scritta | Sì | Footer verde persiana, ora di Venezia, grande "Belvedere" in Fraunces |
| Hero con video, palette beige/marrone, font commerciali, testi, immagini | **No** | Tutto nuovo e nostro |
| Sezioni spa, golf, yacht, matrimoni, ristorante | **No** | La locanda non le ha |

Un difetto del riferimento da non ripetere: se lo scroll non attiva le animazioni, le pagine interne restano vuote. Nel nostro sito il contenuto è visibile anche senza JavaScript e senza animazioni.

## 3. Palette definitiva

Colori derivati dalle foto 03, 04, 06, 07, 09, 12 e 13, poi resi un po' più accesi su richiesta del committente.

| Token | Colore | Uso | Contrasto |
|---|---|---|---|
| `--color-crema` | `#F8EEDB` | Sfondo principale (la tenda) | — |
| `--color-carta` | `#FEFAF2` | Card, cornici e sezioni chiare | — |
| `--color-sabbia` | `#EBDDC2` | Linee sottili e bordi | solo decorativo |
| `--color-terracotta` | `#D5602B` | Accento principale: titoli grandi, grafica | 3,29 su crema: **solo testo grande (≥ 24 px) e grafica** |
| `--color-mattone` | `#A8421A` | Link, numeri e testo piccolo d'accento, pulsanti, fascia "Prenotare da qui" | 5,27 su crema, AA |
| `--color-ocra` | `#EBAE34` | Accento raro: pulsanti e titoli su verde | inchiostro su ocra 8,38 |
| `--color-ocra-chiara` | `#F4CB72` | Testo piccolo su verde e su mattone | AA |
| `--color-verde` | `#1F5540` | Footer, sezione sistemazioni, menu mobile | crema su verde 7,50, AAA |
| `--color-legno` | `#6B4A32` | Testo secondario, linee | 6,88 su crema, AA |
| `--color-inchiostro` | `#221E1A` | Testo corrente | AAA |

Rispetto alla proposta di partenza ho aggiunto `mattone`, `sabbia` e `ocra-chiara`. Il motivo è l'accessibilità: la terracotta della facciata è troppo chiara per il testo piccolo.
I token sono in `app/globals.css` su tre livelli: colori grezzi (`@theme`) → ruoli (`--sfondo`, `--testo`, `--accento`) → componenti (`--pulsante-sfondo`).

Le skill di progetto propongono per gli hotel "blu navy e oro" e glassmorphism. Non li uso: contraddicono la locanda reale. Dalle skill tengo le regole di UX: contrasto AA, aree di tocco di almeno 44 px, etichette visibili nei form, focus visibile, spazio riservato alle immagini.

## 4. Tipografia definitiva

| Ruolo | Font | Motivo |
|---|---|---|
| Titoli | **Fraunces** (peso 400, tondo e corsivo, licenza OFL) | Serif "old style" morbido con un sapore anni Settanta, vicino alle insegne dipinte. Ha il corsivo, che serve per i titoli a due righe. Young Serif non ha il corsivo. Uso un solo peso senza assi variabili: i due file pesano 41 KB invece di 270 KB, e su rete mobile la differenza si sente. |
| Testo e interfaccia | **Figtree** (variabile, licenza OFL) | Sans amichevole e molto leggibile, con forme leggermente tonde che si accordano a Fraunces. Regge bene le etichette maiuscole spaziate. |
| Insegna | Figtree 800 in maiuscolo, una lettera per casella | Riprende l'insegna verticale "ALLOGGI": lettere impilate in caselle chiare con bordo, in terracotta. |

Scala: titolo hero `clamp(2.75rem, 7.5vw, 7rem)`; titoli di sezione `clamp(2rem, 4.5vw, 3.75rem)`; testo 17–18 px con interlinea 1,65; etichette 11–12 px maiuscole.
Coppia diversa da Cormorant Garamond + Raleway, come richiesto.

## 5. Motivi grafici

1. **Bordo smerlato della tenda**: divisore tra le sezioni e bordo inferiore della cornice dell'hero (SVG).
2. **Insegna verticale**: lettere impilate in caselle. "ALLOGGI" nell'hero, poi "VENEZIA", "CAMERE".
3. **Tessere di mosaico**: la mappa di Venezia della hall ridisegnata da zero in SVG a quadretti. È anche il segnaposto delle foto mancanti.
4. **Monogramma NLB**: logo testuale in Fraunces. Lo ridisegno in forma tipografica; il file originale del logo va chiesto al titolare.
5. **Cornici**: ogni foto sta in una cornice con bordo sottile e didascalia piccola, come una stampa appesa. Mai a tutto schermo.

## 6. Movimento

**La hero animata** (richiesta del committente: simpatica, che colpisca, non esagerata):

1. Le lettere dell'insegna "ALLOGGI" si accendono una alla volta, come un neon. Ogni tanto una lettera sfarfalla.
2. Il titolo sale riga per riga da dietro una maschera.
3. Sopra la foto si srotola una tenda crema smerlata con la scritta "Belvedere". Poi si muove piano, come al vento.
4. In basso un piccolo tram parte dalla locanda arancione, passa il Ponte della Libertà e arriva a Venezia. Poi riparte.
5. Con il mouse, la foto in cornice si inclina leggermente.

Tutto è fatto con CSS e SVG, senza librerie. Con `prefers-reduced-motion` le animazioni si fermano e il tram resta a metà del ponte.

**Librerie**

- **Framer Motion** resta, solo per lo slider delle sistemazioni, e si carica dopo l'avvio della pagina. **GSAP è stato rimosso.**
- **Lenis** per lo scroll morbido: solo su desktop con mouse, spento con `prefers-reduced-motion`.
- **Three.js è stato rimosso** (con `@react-three/fiber` e `@react-three/drei`). L'effetto di carattere è il tram in SVG, che racconta il punto di forza della locanda e pesa pochissimo. Un effetto WebGL avrebbe abbassato il punteggio Lighthouse mobile.

**Nel resto del sito**: comparse dal basso con dissolvenza, foto scoperte da una maschera, header trasparente che diventa crema, menu mobile a tutto schermo, tessere della mappa che compaiono a gruppi. Il contenuto è sempre nell'HTML: senza JavaScript resta tutto visibile.

## 7. Sitemap

| Pagina | Italiano | Inglese |
|---|---|---|
| Home | `/` | `/en` |
| Camere | `/camere` | `/en/rooms` |
| Venezia | `/venezia` | `/en/venice` |
| Prenota | `/prenota` | `/en/book` |
| Privacy | `/privacy` | `/en/privacy` |
| Cookie | `/cookie` | `/en/cookies` |

Sezioni della home, in ordine: Hero → Manifesto → Le sistemazioni → Venezia a portata di tram → Perché prenotare da qui → La casa → Dicono di noi (spenta finché il titolare non conferma) → Prenota → Footer.

**Selettore del tipo di viaggio: l'idea regge e la propongo.** Sta sopra lo slider delle sistemazioni e filtra così:

| Scelta | Sistemazioni mostrate |
|---|---|
| Da solo | Singola con bagno in comune, Singola con bagno, letto in camerata |
| In due | Matrimoniale, Doppia con letti singoli, Standard doppia con letti singoli |
| In gruppo | Tripla, Quadrupla, Quadrupla Economy, Camerata condivisa |

Ogni scheda dichiara subito ospiti, letti, superficie e **bagno privato o in comune**.

## 8. Le foto: classificazione corretta

Ho aperto tutte le 17 foto a piena risoluzione. Regola di misura: una foto non supera mai a schermo la sua larghezza reale, e su desktop resta entro circa due terzi di essa.

| Foto | Che cosa mostra davvero | Decisione | Misura massima a schermo |
|---|---|---|---|
| 01-facciata-notte (720×720) | Facciata di sera, tenda "BELVEDERE", insegna accesa. Scatto con forte distorsione e filtro colore | **Uso piccolo**, sezione Prenota ("di sera") | 380 px |
| 02-facciata-insegna | Stesso scatto della 03, molto contrastato e artificiale | **Scartata** (doppione) | — |
| 03-balcone (1280×853) | Facciata, balconcino bianco, tende "Hotel Belvedere" e "Bar Trattoria Belvedere" | **Uso ritagliato** sul balcone e sulla tenda alta, sezione La casa. Il ritaglio esclude la scritta "Bar Trattoria" | 560 px |
| 04-esterno-strada (1200×900) | Ingresso d'angolo, tenda crema, insegna "ALLOGGI", fiori rossi. È la stessa immagine di anima-01 | **Foto dell'hero** | 640 px |
| 05-terrazza (1280×857) | Terrazza coperta, balaustra bianca, tavolo. Si vedono uno stendino e dei posacenere | **Uso ritagliato** su tavolo e balaustra, sezione La casa | 640 px |
| 06-reception (1280×720) | Reception: bancone in legno, mappa, quadro, **gradini interni** | **Uso**, sezione Manifesto | 760 px |
| 07-hall (1280×720) | Hall verso la porta d'ingresso, divano, soffitto a cassettoni | **Uso**, sezione La casa | 760 px |
| 08-mosaico-mappa-venezia | Non è un mosaico: è una stampa "Venezia forma urbis" (Comune di Venezia, Marsilio Editori) | **Non pubblicata**: è un'opera di terzi. Base per la mappa SVG ridisegnata | — |
| 09-logo-nlb (1280×853) | Tavolino a mosaico con il biglietto "NLB Nuova Locanda Belvedere" | **Uso ritagliato**, sezione Manifesto | 420 px |
| 10-quadro-gondoliere | Primo piano di una stampa fotografica di terzi (maschere e gondole). È il quadro della camera nella foto 11 | **Non pubblicata** come immagine a sé | — |
| 11-camera-doppia-quadro (675×900) | Camera matrimoniale, moquette verde, quadro delle maschere | Uso, camere | 420 px |
| 12-camera-due-singoli (506×900) | Due letti singoli, **bagno in camera visibile** | Uso, camere | 320 px |
| 13-camera-calda (506×900) | Due letti singoli, parquet | Uso, camere | 320 px |
| 14-camera-tv (506×900) | **Tre letti singoli**, TV, scrivania, parquet: è una tripla | Uso, camere | 320 px |
| 15-camera-matrimoniale (675×900) | Matrimoniale, copriletto grigio | Uso, camere | 420 px |
| 16-camera-matrimoniale-nuova (675×900) | Matrimoniale, copriletto a foglie. La più luminosa | Uso, camere e slider | 420 px |
| 17-bagno (675×900) | Bagno in camera: lavabo, specchio | Uso piccolo, camere | 320 px |

Usate: 14. Scartate o non pubblicate: 3 (02, 08, 10).

### Mappa sezione → foto

| Sezione | Foto |
|---|---|
| Hero | 04 in cornice con bordo smerlato |
| Manifesto | 06 + ritaglio della 09 |
| Le sistemazioni (slider) | 16, 12, 14 + segnaposto |
| Venezia a portata di tram | Nessuna foto: mappa SVG a tessere |
| Perché prenotare da qui | Nessuna foto: tipografia |
| La casa | 07, ritaglio della 05, ritaglio della 03 |
| Dicono di noi | Nessuna foto |
| Prenota | 01 piccola |
| Open Graph | 04 ritagliata a 1200×630 |

### Abbinamento foto → tipologia (ipotesi, DA CONFERMARE CON IL TITOLARE)

| Tipologia | Bagno | Foto ipotizzata |
|---|---|---|
| Singola con bagno in comune (9 m²) | In comune | Segnaposto |
| Singola con bagno | Privato | Segnaposto |
| Matrimoniale (16 m²) | Privato | 16, 15, 11 |
| Doppia con letti singoli (16 m²) | Privato | 12, 17 |
| Standard doppia con letti singoli (16 m²) | In comune | 13 |
| Tripla (18 m²) | Privato | 14 |
| Quadrupla (20 m²) | Privato | Segnaposto |
| Quadrupla Economy (20 m², 4 letti a castello) | In comune | Segnaposto |
| Camerata condivisa mista (5 letti, da confermare) | In comune | Segnaposto |

## 9. Segnaposto

**Foto da fornire** (componente unico con la scritta "Foto da fornire: …"): camerata, bagni in comune, camere singole, quadrupla, quadrupla economy, colazione (se esiste), dintorni e fermata, ritratto di chi accoglie.

**Dati mostrati come segnaposto visibile**: indirizzo, telefono, email, numero WhatsApp, CIN, prezzi, orari di check-in e check-out, colazione, parcheggio, regole della casa, linee e fermate dei mezzi, vantaggi della prenotazione diretta, tre citazioni di ospiti.

**Dati scritti come "indicativi" con la fonte nel codice**: tempi di viaggio per Venezia (fonti: ACTV/AVM, Trenitalia), contributo di accesso a Venezia (fonte: Comune di Venezia).

## 10. Domande per il titolare

1. Indirizzo esatto, telefono, email, numero WhatsApp.
2. Codice identificativo nazionale (CIN), obbligatorio negli annunci.
3. Orari di check-in e check-out; orario della reception.
4. Prezzi, o almeno un "da … € a notte" per tipologia.
5. La camerata ha 4 o 5 letti? È la "Quadrupla Economy" di Booking o una stanza diversa?
6. Le camere sono su un solo piano? Nella foto della reception si vedono gradini e Booking parla di scale.
7. Bar e trattoria sono attivi? Le insegne compaiono nelle foto.
8. Quale foto appartiene a quale tipologia di camera.
9. Foto mancanti (vedi sopra).
10. Possiamo mostrare i punteggi di Booking.com e Google? Quali recensioni possiamo citare, e con quale nome?
11. Quali vantaggi offre a chi prenota direttamente (prezzo, cancellazione, altro)?
12. La veduta aerea (anima-02) mostra la locanda o solo il territorio? Sembra un tratto di fiume con ville, non Marghera.
13. Chi ha scattato le foto, e il titolare ha il diritto di pubblicarle?
14. Esiste il file originale del logo NLB?
15. Colazione, parcheggio, deposito bagagli, animali: ci sono?

## 11. Decisioni approvate

1. Palette con l'aggiunta di `mattone` e `sabbia`. **Modificata: più accesa.**
2. Fraunces per i titoli, Figtree per il testo.
3. Foto 04 come immagine dell'hero, in cornice. **Modificata: hero animata.**
4. Selettore del tipo di viaggio: da solo, in due, in gruppo.
5. Framer Motion resta, GSAP esce.
6. Foto 02, 08 e 10 non pubblicate.
