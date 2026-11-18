/**
 * Trasporti dalla locanda verso Venezia: tutti i dati in un solo posto.
 *
 * Regola (la stessa di content/site.ts): ogni orario, linea, fermata e prezzo
 * ha una fonte ufficiale con la data di verifica. Un valore `null` non è mai
 * scritto come fatto: nel sito compare il segnaposto "da confermare".
 * Le parole (etichette, frasi) stanno nei dizionari it/en; qui solo i dati.
 *
 * Quando riverificare:
 * - orari ACTV: i dati aperti valgono fino al 15/01/2027 e a ogni cambio
 *   d'orario (estivo/invernale, scolastico);
 * - treni: il quadro orario RFI letto vale fino al 12/12/2026; il nuovo
 *   orario ferroviario parte il 13/12/2026.
 * Metodo: scaricare di nuovo il GTFS ACTV (fonte "gtfs"), contare le corse
 * per fermata e fascia, e confrontare con i PDF delle linee.
 */

/** Data dell'ultima verifica di tutti i dati qui sotto (formato ISO). */
export const transportCheckedOn = "2026-11-18";

/** Coordinate della locanda (Google Maps, scheda letta il 16/11/2026). */
export const innCoordinates = { lat: 45.4767445, lon: 12.2311417 } as const;

export type SourceId = keyof typeof sources;

/** Fonti ufficiali, lette il 18/11/2026 salvo diversa indicazione. */
export const sources = {
  gtfs: {
    name: "ACTV, dati aperti GTFS bus e tram (actv_aut.zip, pubblicato il 13/11/2026, valido 16/11/2026–15/01/2027)",
    url: "https://actv.avmspa.it/sites/default/files/attachments/opendata/automobilistico/actv_aut.zip",
  },
  line6: {
    name: "ACTV, orario PDF linea 6 (VENEZIA – SFMR Spinea)",
    url: "https://avm.avmspa.it/sites/default/files/attachments/pdf/UM/U-6.pdf",
  },
  line6L: {
    name: "ACTV, orario PDF linea 6L (VENEZIA – Correnti)",
    url: "https://avm.avmspa.it/sites/default/files/attachments/pdf/UM/U-6L.pdf",
  },
  lineN2: {
    name: "ACTV, orario PDF linea notturna N2",
    url: "https://avm.avmspa.it/sites/default/files/attachments/pdf/UM/U-N2.pdf",
  },
  lineT2: {
    name: "ACTV, orario PDF tram T2 (Mestre Centro – Marghera Salamonio)",
    url: "https://avm.avmspa.it/sites/default/files/attachments/pdf/UM/U-T_2.pdf",
  },
  lineT1: {
    name: "ACTV, orario PDF tram T1 (Monte Celo – Venezia)",
    url: "https://avm.avmspa.it/sites/default/files/attachments/pdf/UM/U-T_1.pdf",
  },
  urbanLines: {
    name: "ACTV, linee urbane di Mestre: orari e percorsi",
    url: "https://avm.avmspa.it/it/content/linee-urbane-0",
  },
  actvFares: {
    name: "AVM/ACTV, tariffe del servizio urbano del Comune di Venezia",
    url: "https://avm.avmspa.it/it/content/urbano-venezia-0",
  },
  rfiSantaLucia: {
    name: "RFI, quadro orario di Venezia Santa Lucia (orario programmato 14/06–12/12/2026)",
    url: "https://prm.rfi.it/qo_prm/QO_Arrivi_SiPMR.aspx?Id=2796&lin=&dalle=00.00&alle=23.59&ora=00.00",
  },
  trenitaliaFare: {
    name: "Trenitalia, tariffa 14/VE zona metropolitana di Venezia (in vigore dal 01/01/2026)",
    url: "https://www.trenitalia.com/content/dam/trenitalia/allegati/info/condizioni-generali-di-trasporto/parte-iii-trasporto-regionale/tariffe-14/Tariffa_14_VE.pdf",
  },
  googleWalk: {
    name: "Google Maps, percorso a piedi dalle coordinate della locanda (letto il 18/11/2026)",
    url: "https://www.google.com/maps/dir/45.4767445,12.2311417/45.479492,12.231233/data=!4m2!4m1!3e2",
  },
} as const satisfies Record<string, { name: string; url: string }>;

/** Un dato con la sua fonte. `value: null` = da confermare. */
export type Fact<T> = { value: T | null; source: SourceId };

export type Stop = {
  /** Nome esatto come lo scrive ACTV (o RFI per la stazione). */
  name: string;
  /** Minuti a piedi dalla locanda (Google Maps, percorso pedonale). */
  walkMinutes: Fact<number>;
};

/** Fascia di frequenza. Le parole delle fasce sono nei dizionari. */
export type FrequencyBand = {
  band: "day" | "evening" | "weekdayMorning" | "weekdayAfternoon" | "holiday";
  /** Minuti tra una corsa e l'altra, es. "10–12". */
  every: Fact<string>;
};

export type Way = {
  mode: "bus" | "tram" | "train";
  /** Nome della linea come compare sul mezzo e sulla mappa. */
  lines: string;
  /** Dove si sale andando a Venezia. */
  stop: Stop;
  /** Scritta da leggere sul mezzo. */
  direction: Fact<string>;
  /** Dove si arriva a Venezia. */
  arrival: "Piazzale Roma" | "Santa Lucia";
  /** Minuti a bordo fino all'arrivo (senza attesa). */
  rideMinutes: Fact<string>;
  /** Cambio lungo il percorso, se serve. */
  change: { at: string; line: string; rideMinutes: Fact<number> } | null;
  frequency: FrequencyBand[];
  /** Prima e ultima corsa verso Venezia. */
  first: Fact<string>;
  last: Fact<string>;
  /** Ultima corsa nei festivi, se diversa. */
  lastHoliday?: Fact<string>;
  /** Ritorno: dove si scende e l'ultima corsa utile. */
  back: {
    /** Dove si risale per tornare. */
    from: string;
    stop: Stop;
    first: Fact<string>;
    last: Fact<string>;
    lastHoliday?: Fact<string>;
    /** Linea notturna, se esiste. */
    night: { line: string; from: Fact<string>; to: Fact<string>; every: Fact<number> } | null;
  };
  /** Pagina ufficiale da linkare accanto alla voce. */
  officialUrl: string;
};

/**
 * I tre modi, nell'ordine in cui il sito li consiglia.
 * L'autobus è "il modo più semplice": diretto, senza cambi, fino a notte.
 */
export const ways: Way[] = [
  {
    // GTFS: dalla fermata Rizzardi Carrer (codice 334) le linee 6 e 6L
    // arrivano alla fermata VENEZIA (Piazzale Roma) in 13 minuti.
    // Corse di giorno (7–21) ogni 8–12 minuti feriali e sabato, 12 nei festivi;
    // dopo le 21:40 solo la 6, ogni 15 minuti. Prima 04:18, ultima 00:07,
    // tutti i giorni (controllati mer 25/11, sab 21/11, dom 22/11/2026).
    mode: "bus",
    lines: "6 · 6L",
    stop: { name: "Rizzardi Carrer", walkMinutes: { value: 6, source: "googleWalk" } },
    direction: { value: "VENEZIA", source: "line6" },
    arrival: "Piazzale Roma",
    rideMinutes: { value: "13", source: "gtfs" },
    change: null,
    frequency: [
      { band: "day", every: { value: "10–12", source: "gtfs" } },
      { band: "evening", every: { value: "15", source: "gtfs" } },
    ],
    first: { value: "04:18", source: "gtfs" },
    last: { value: "00:07", source: "gtfs" },
    back: {
      from: "Piazzale Roma",
      // GTFS e PDF linea 6: da VENEZIA A3 la prima fermata a Marghera è
      // Durando Bellinato (codice 333), 9 minuti. Prima 05:55, ultima 00:40.
      // Google Maps: 4–5 minuti a piedi (300–350 m), letto il 18/11/2026.
      stop: { name: "Durando Bellinato", walkMinutes: { value: 5, source: "googleWalk" } },
      first: { value: "05:55", source: "gtfs" },
      last: { value: "00:40", source: "gtfs" },
      // N2 circolare: da VENEZIA ogni 30 minuti, 00:01–04:31, tutte le notti
      // del GTFS controllate; scende a Durando Bellinato dopo 9 minuti.
      night: {
        line: "N2",
        from: { value: "00:01", source: "lineN2" },
        to: { value: "04:31", source: "lineN2" },
        every: { value: 30, source: "lineN2" },
      },
    },
    officialUrl: sources.line6.url,
  },
  {
    // GTFS e PDF T2: dalla fermata Piazzale Giovannacci (6049) a MESTRE CENTRO
    // in 11 minuti. Lì si cambia per la T1 (MESTRE CENTRO A1 → VENEZIA), 20
    // minuti. Feriali e sabato ogni 10 minuti fino alle 10, poi ogni 15;
    // festivi ogni 20. Da Giovannacci prima 07:05, ultima 22:07 (feriali).
    // Ritorno: ultima T2 da Mestre Centro alle 21:25 (feriali e sabato),
    // 21:45 (festivi). Google Maps: 5 minuti a piedi (350 m).
    mode: "tram",
    lines: "T2 › T1",
    stop: { name: "Piazzale Giovannacci", walkMinutes: { value: 5, source: "googleWalk" } },
    direction: { value: "MESTRE CENTRO", source: "lineT2" },
    arrival: "Piazzale Roma",
    rideMinutes: { value: "31", source: "gtfs" },
    change: { at: "Mestre Centro", line: "T1", rideMinutes: { value: 20, source: "lineT1" } },
    frequency: [
      { band: "weekdayMorning", every: { value: "10", source: "lineT2" } },
      { band: "weekdayAfternoon", every: { value: "15", source: "lineT2" } },
      { band: "holiday", every: { value: "20", source: "lineT2" } },
    ],
    first: { value: "07:05", source: "gtfs" },
    last: { value: "22:07", source: "gtfs" },
    lastHoliday: { value: "22:25", source: "lineT2" },
    back: {
      from: "Mestre Centro",
      stop: { name: "Piazzale Giovannacci", walkMinutes: { value: 5, source: "googleWalk" } },
      first: { value: "06:25", source: "gtfs" },
      last: { value: "21:25", source: "gtfs" },
      lastHoliday: { value: "21:45", source: "lineT2" },
      night: null,
    },
    officialUrl: sources.lineT2.url,
  },
  {
    // RFI (arrivi a Santa Lucia): da Venezia Mestre 10–11 minuti con i
    // Regionali; di giorno più treni ogni ora (8–14 contati sul quadro RFI
    // del 19/11/2026): sul sito "almeno ogni 10 minuti". Primo 05:28, ultimo
    // 23:48. Ritorno: primo 05:01; ultimo tutti i giorni 23:09 (17079, senza
    // limiti di periodicità); più tardi solo alcuni giorni (23:51 non il
    // venerdì e prefestivi, 00:13 non sabato e festivi).
    // Google Maps: 12 minuti a piedi (800 m) fino alla stazione.
    mode: "train",
    lines: "Treno",
    stop: { name: "Venezia Mestre", walkMinutes: { value: 12, source: "googleWalk" } },
    direction: { value: "Venezia S. Lucia", source: "rfiSantaLucia" },
    arrival: "Santa Lucia",
    rideMinutes: { value: "10–11", source: "rfiSantaLucia" },
    change: null,
    frequency: [{ band: "day", every: { value: "10", source: "rfiSantaLucia" } }],
    first: { value: "05:28", source: "rfiSantaLucia" },
    last: { value: "23:48", source: "rfiSantaLucia" },
    back: {
      from: "Santa Lucia",
      stop: { name: "Venezia Mestre", walkMinutes: { value: 12, source: "googleWalk" } },
      first: { value: "05:01", source: "rfiSantaLucia" },
      last: { value: "23:09", source: "rfiSantaLucia" },
      night: null,
    },
    officialUrl: "https://www.trenitalia.com",
  },
];

/** Biglietti (prezzi 2026, fonti ufficiali). */
export const tickets = {
  /** ACTV, biglietto ordinario automobilistico 75 minuti: bus e tram di terraferma. */
  busTram75: { value: "1,50 €", source: "actvFares" } as Fact<string>,
  /** Trenitalia, corsa singola nella zona metropolitana (tariffa 14/VE). */
  train: { value: "1,50 €", source: "trenitaliaFare" } as Fact<string>,
  /** Mestre Daily Pass: 24 ore su bus, tram e treni R/RV nel Comune, solo in app. */
  mestreDailyPass: { value: "5,00 €", source: "actvFares" } as Fact<string>,
  /** Nome esatto dell'app ufficiale. */
  app: "AVM Venezia Official App",
  faresUrl: sources.actvFares.url,
} as const;

/** Link "Apri il percorso in Google Maps": dalla locanda a Piazzale Roma con i mezzi. */
export const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&origin=${innCoordinates.lat},${innCoordinates.lon}&destination=Piazzale+Roma,+Venezia&travelmode=transit`;
