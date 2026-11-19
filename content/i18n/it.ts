/**
 * Testi in italiano. Voce: calda, diretta, concreta. Si dà del "voi".
 * Nessun dato non verificato è scritto come fatto: i valori mancanti
 * sono in content/site.ts e compaiono come segnaposto "da confermare".
 */
export const it = {
  meta: {
    home: {
      title: "Nuova Locanda Belvedere — Dormire a Marghera, vicino a Venezia",
      description:
        "Locanda con otto camere a Marghera, sulla terraferma di Venezia. Venezia si raggiunge in tram, autobus o treno. Richiesta diretta, senza intermediari.",
    },
    rooms: {
      title: "Camere — Nuova Locanda Belvedere, Marghera Venezia",
      description:
        "Tutte le sistemazioni della locanda: singole, matrimoniali, doppie, triple e quadruple. Per ognuna ospiti, letti, superficie e tipo di bagno.",
    },
    venice: {
      title: "Come arrivare a Venezia da Marghera — Nuova Locanda Belvedere",
      description:
        "Guida pratica per chi dorme a Marghera: tram, autobus e treno per Venezia, consigli per la giornata, contributo di accesso ed eventi dell'anno.",
    },
    book: {
      title: "Prenota — Nuova Locanda Belvedere, Marghera Venezia",
      description:
        "Inviate una richiesta diretta alla locanda: date, ospiti e sistemazione. Vi rispondiamo con disponibilità e prezzo. Nessun pagamento online.",
    },
    privacy: {
      title: "Privacy — Nuova Locanda Belvedere",
      description: "Informativa sul trattamento dei dati personali (bozza).",
    },
    cookies: {
      title: "Cookie — Nuova Locanda Belvedere",
      description: "Informazioni sull'uso dei cookie in questo sito (bozza).",
    },
  },

  nav: {
    home: "Home",
    rooms: "Camere",
    venice: "Venezia",
    book: "Prenota",
    menu: "Menu",
    close: "Chiudi",
    skip: "Vai al contenuto",
    main: "Navigazione principale",
    language: "Lingua",
    switchTo: "English",
    pauseMotion: "Ferma le animazioni",
    playMotion: "Riavvia le animazioni",
    homeAria: "Nuova Locanda Belvedere, pagina iniziale",
  },

  common: {
    tbc: "da confermare",
    tbcWithOwner: "Da confermare con il titolare",
    checkAvailability: "Verifica disponibilità",
    requestRoom: "Richiedi questa camera",
    allRooms: "Tutte le camere",
    guests: "Ospiti",
    beds: "Letti",
    area: "Superficie",
    bath: "Bagno",
    bathPrivate: "Privato",
    bathShared: "In comune",
    photoMissing: "Foto da fornire",
    photoTbc: "Abbinamento foto da confermare",
    indicative: "indicativo",
    placeholder: "Segnaposto",
    externalSite: "sito esterno",
  },

  hero: {
    label: "Marghera · Venezia",
    title1: "Una stanza a Marghera.",
    title2: "Venezia, appena oltre il ponte.",
    text: "Otto camere semplici e pulite, sulla terraferma. La mattina partite per Venezia in tram, in autobus o in treno. La sera tornate a casa.",
    ctaSecondary: "Guardate le sistemazioni",
    sign: "Alloggi",
    photoCaption: "L'ingresso, all'angolo",
    tramFrom: "Marghera",
    tramBridge: "Ponte della Libertà",
    tramTo: "Venezia",
    tramAlt:
      "Illustrazione decorativa: un tram attraversa il Ponte della Libertà, dalla terraferma verso Venezia",
  },

  manifesto: {
    label: "L'accoglienza",
    title1: "Qui la porta ve la apre",
    title2: "una persona.",
    p1: "Chi è stato qui parla prima di tutto delle persone che lo hanno accolto. Alla reception potete chiedere come si arriva a Venezia e da dove conviene partire.",
    p2: "È una locanda di una volta. La facciata arancione, la tenda sopra la porta, l'insegna «Alloggi» che si vede dalla strada. Nella hall c'è una grande mappa di Venezia: è il posto giusto per decidere il giro della giornata.",
    aside: "Semplice, pulita, senza fronzoli.",
    captionReception: "La reception",
    captionMosaic: "Il nostro biglietto",
  },

  rooms: {
    label: "Le sistemazioni",
    title1: "Diteci come viaggiate.",
    title2: "Vi diciamo dove dormire.",
    intro:
      "Camere singole, doppie, triple e quadruple. Ogni scheda dice subito quanti letti ci sono e se il bagno è privato o in comune.",
    filterLabel: "Tipo di viaggio",
    trips: { solo: "Da solo", duo: "In due", group: "In gruppo" },
    prev: "Sistemazione precedente",
    next: "Sistemazione successiva",
    carousel: "Sistemazioni",
    slideOf: "di",
    goTo: "Vai alla sistemazione",
  },

  venice: {
    label: "Venezia",
    title1: "Tre modi",
    title2: "per passare il ponte.",
    intro:
      "Marghera è sulla terraferma, di fronte a Venezia. Il Ponte della Libertà si attraversa in autobus, in tram o in treno. Il modo più semplice è l'autobus.",
    /** Le parole di ogni mezzo. I dati (fermate, orari) sono in content/transport.ts. */
    ways: {
      bus: {
        name: "Autobus",
        lead: "Va diretto a Piazzale Roma, senza cambi, dalla mattina presto fino a dopo mezzanotte.",
        line: "{lines}, direzione {direction}",
      },
      tram: {
        name: "Tram",
        lead: "La T2 porta a Mestre centro. Per Venezia si cambia con la T1: ci vuole più tempo che in autobus.",
        line: "T2 direzione {direction}, poi T1 per Venezia",
      },
      train: {
        name: "Treno",
        lead: "Dalla stazione di Venezia Mestre i treni regionali arrivano a Santa Lucia, sul Canal Grande.",
        line: "Treni regionali, direzione {direction}",
      },
    },
    transport: {
      or: "o",
      simplest: "Il modo più semplice",
      stop: "Fermata",
      station: "Stazione",
      walk: "{n} min a piedi",
      line: "Linea",
      ride: "Fino a {place}",
      rideValue: "{n} min",
      rideChange: "{n} min a bordo, più l'attesa del cambio a {at}",
      every: "Passa",
      everyValue: "ogni {n} min",
      bands: {
        day: "di giorno",
        evening: "la sera",
        weekdayMorning: "feriali e sabato fino alle 10",
        weekdayAfternoon: "poi",
        holiday: "festivi",
      },
      eveningBusNote: "solo la 6",
      toVenice: "Verso Venezia",
      firstLast: "prima {first}, ultima {last}",
      holidayLast: "festivi {last}",
      back: "Ritorno",
      backValue: "da {from} a {stop} ({walk})",
      night: "Di notte la {line}, ogni {n} min dalle {from} alle {to}",
      official: "Orario ufficiale",
      card: "{stopLabel} {stop}, {walk} · {line} · {place} in {ride}",
      cardLineBus: "linea {lines}",
      cardLineTram: "T2 e cambio con la T1",
      cardLineTrain: "treno",
      cardRideChange: "{n} min più il cambio",
      cardMore: "Orari e ritorno",
    },
    placesTitle: "Dove scendere, che cosa vedere",
    places: [
      {
        name: "Piazzale Roma",
        text: "Dove arrivano autobus e tram. Da qui Venezia si gira a piedi o in vaporetto.",
      },
      {
        name: "Santa Lucia",
        text: "La stazione dei treni, affacciata sul Canal Grande.",
      },
      { name: "Rialto", text: "Il ponte più famoso e il suo mercato." },
      { name: "San Marco", text: "La piazza, la basilica, il campanile." },
      {
        name: "Mestre, Piazza Ferretto",
        text: "Il centro di Mestre, per una sera più tranquilla.",
      },
    ],
    cta: "La guida per arrivare a Venezia",
    map: {
      caption: "Schema semplificato, non in scala",
      alt: "Schema del percorso dalla locanda a Venezia. Autobus {busLines}: fermata {busStop}, a {busWalk} minuti a piedi, fino a Piazzale Roma in {busRide} minuti. Tram T2: fermata {tramStop}, a {tramWalk} minuti a piedi, cambio con la T1 a Mestre Centro, fino a Piazzale Roma. Treno: stazione di {trainStop}, a {trainWalk} minuti a piedi, fino a Santa Lucia in {trainRide} minuti.",
      srNote: "Orari, frequenze e ritorno di ogni mezzo sono nell'elenco della pagina.",
      inn: "La locanda",
      mestre: "Mestre",
      marghera: "Marghera",
      venice: "Venezia",
      lagoon: "Laguna",
      bridge: "Ponte della Libertà",
      walk: "a piedi",
      min: "{n} min",
      change: "cambio T1",
      bus: "Bus",
      train: "Treno",
      tram: "Tram",
      openRoute: "Apri il percorso in Google Maps",
    },
  },

  direct: {
    label: "Prenotare da qui",
    title1: "Senza intermediari.",
    title2: "Parlate con noi.",
    text: "Quando scrivete da questo sito, la richiesta arriva alla locanda e non a un portale. Vi risponde chi lavora qui.",
    placeholderTitle: "Vantaggio da confermare",
    placeholderText:
      "Qui va un vantaggio reale per chi prenota direttamente. Lo indica il titolare.",
    cta: "Scrivete alla locanda",
  },

  house: {
    label: "La casa",
    title1: "Una hall gialla, una terrazza,",
    title2: "un balconcino bianco.",
    text: "La hall ha le pareti gialle e il soffitto in legno. C'è una terrazza coperta, con un tavolo e una balaustra bianca affacciata sulla strada.",
    amenitiesTitle: "Che cosa trovate",
    amenities: [
      "WiFi gratuito",
      "Aria condizionata e riscaldamento in camera",
      "Reception",
      "Parcheggio privato gratuito",
      "Deposito bagagli",
    ],
    tbcItems: ["Colazione"],
    stairsTitle: "Gradini e scale",
    stairs:
      "Nella casa ci sono gradini e scale. Se per voi sono un problema, scriveteci prima di prenotare: vi diciamo com'è la stanza.",
    captionHall: "La hall",
    captionTerrace: "La terrazza",
    captionBalcony: "Il balconcino",
  },

  reviews: {
    label: "Dicono di noi",
    title1: "Che cosa dicono",
    title2: "gli ospiti.",
    bookingSource: "Punteggio su Booking.com",
    googleSource: "Punteggio su Google",
    reviewsWord: "recensioni",
    checkedOn: "Rilevato il",
    details: {
      staff: "Staff",
      cleanliness: "Pulizia",
      location: "Posizione",
      value: "Rapporto qualità-prezzo",
      comfort: "Comfort",
      wifi: "WiFi",
      facilities: "Servizi",
    },
    quotePlaceholder:
      "PLACEHOLDER — qui va la frase di un ospite, pubblicata con il suo consenso.",
    quoteAuthor: "Nome dell'ospite, da confermare",
  },

  bookCta: {
    label: "Prenota",
    title1: "Scriveteci le date.",
    title2: "Vi rispondiamo noi.",
    text: "Questa è una richiesta, non un pagamento. Vi rispondiamo con disponibilità e prezzo.",
    eveningCaption: "La locanda, di sera",
  },

  footer: {
    tagline: "Una locanda a Marghera, alle porte di Venezia.",
    clock: "Ora a Venezia",
    where: "Dove siamo",
    contacts: "Contatti",
    pages: "Il sito",
    address: "Indirizzo",
    phone: "Telefono",
    email: "Email",
    whatsapp: "WhatsApp",
    cin: "CIN",
    vat: "Partita IVA",
    privacy: "Privacy",
    cookies: "Cookie",
    rights: "Tutti i diritti riservati.",
    backToTop: "Torna su",
  },

  roomsPage: {
    label: "Le camere",
    title1: "Tutte le sistemazioni,",
    title2: "una per una.",
    intro:
      "Per ogni sistemazione trovate ospiti, letti, superficie e tipo di bagno. I prezzi non sono pubblicati qui: chiedeteli con una richiesta, vi rispondiamo noi.",
    groupPrivate: "Camere private",
    groupDorm: "Camerata condivisa",
    amenitiesTitle: "Nelle camere",
    bathTitle: "Nei bagni, privati e in comune",
    dormWarning:
      "Sistemazione da confermare con il titolare: il numero di letti e le dotazioni non sono ancora verificati.",
    price: "Prezzo",
    priceTbc: "Su richiesta",
  },

  venicePage: {
    label: "Guida pratica",
    title1: "Da Marghera a Venezia,",
    title2: "senza perdersi.",
    intro:
      "Dormire a Marghera vuol dire avere Venezia a portata di mano e tornare, la sera, sulla terraferma. Qui trovate come arrivarci e che cosa sapere prima di partire.",
    waysTitle: "Come arrivare",
    ticketsTitle: "Biglietti",
    tickets: [
      "Autobus e tram: biglietto ACTV da 75 minuti, {busTram}. Si compra nell'app {app} o nelle rivendite autorizzate. Sul tram non si compra a bordo.",
      "Convalidate il biglietto quando salite. Quello dell'app si attiva 3 minuti prima di salire.",
      "Treno da Mestre a Santa Lucia: {train}. Il Mestre Daily Pass ({daily}, solo nell'app) vale 24 ore su autobus, tram e treni regionali fino a Santa Lucia.",
    ],
    verified: "Orari verificati a novembre 2026 sui dati ufficiali ACTV e RFI. Cambiano con le stagioni: prima di partire controllate gli orari ufficiali.",
    officialActv: "Orari delle linee ACTV",
    officialFares: "Tariffe ACTV",
    officialTrenitalia: "Orari dei treni Trenitalia",
    tipsTitle: "Consigli per la giornata",
    tips: [
      {
        title: "Partite presto",
        text: "La mattina Venezia è più tranquilla. Le calli si riempiono verso mezzogiorno.",
      },
      {
        title: "Scarpe comode",
        text: "Venezia si gira a piedi, e i ponti hanno i gradini.",
      },
      {
        title: "Il biglietto prima di salire",
        text: "Comprate il biglietto di tram e autobus prima di salire e convalidatelo a bordo.",
      },
      {
        title: "L'acqua alta",
        text: "In autunno e in inverno la marea può allagare le zone più basse. Controllate le previsioni del Centro Maree del Comune di Venezia.",
      },
      {
        title: "L'ultimo mezzo",
        text: "Prima di cena guardate l'orario dell'ultima corsa per tornare a Marghera.",
      },
    ],
    feeTitle: "Il contributo di accesso",
    feeBadge: "Informazione da controllare",
    fee: [
      "In alcune giornate dell'anno chi visita Venezia senza pernottare deve registrarsi e pagare un contributo di accesso. Nel 2026 è stato applicato in alcune date tra aprile e luglio.",
      "Marghera fa parte del Comune di Venezia. Chi dorme in una struttura del Comune di norma è esente, ma deve comunque registrare l'esenzione.",
      "Le regole cambiano ogni anno. Prima di partire controllate il portale ufficiale del Comune di Venezia.",
    ],
    feeLink: "Portale ufficiale del contributo di accesso",
    eventsTitle: "Venezia durante l'anno",
    eventsNote: "Le date cambiano ogni anno: controllatele prima di prenotare.",
    events: [
      { when: "Inverno", name: "Carnevale", text: "Maschere e costumi in tutta la città." },
      {
        when: "Da primavera ad autunno",
        name: "Biennale",
        text: "L'esposizione internazionale ai Giardini e all'Arsenale.",
      },
      {
        when: "Luglio",
        name: "Festa del Redentore",
        text: "Il ponte di barche e i fuochi sulla laguna.",
      },
      {
        when: "Fine estate",
        name: "Mostra del Cinema",
        text: "Il festival del cinema, al Lido.",
      },
      {
        when: "Settembre",
        name: "Regata Storica",
        text: "Il corteo di barche e le gare sul Canal Grande.",
      },
      {
        when: "21 novembre",
        name: "Madonna della Salute",
        text: "Il pellegrinaggio alla basilica della Salute.",
      },
    ],
    cta: "Scegliete la stanza",
  },

  bookPage: {
    label: "Prenota",
    title1: "Chiedete",
    title2: "la vostra stanza.",
    intro:
      "Scriveteci le date e quanti siete. Vi rispondiamo con disponibilità e prezzo. Da questo sito non si paga nulla.",
    infoTitle: "Orari e regole",
    info: {
      checkIn: "Check-in",
      checkOut: "Check-out",
      reception: "Reception",
      breakfast: "Colazione",
      parking: "Parcheggio",
      rules: "Regole della casa",
    },
    faqTitle: "Domande frequenti",
    faq: [
      {
        q: "È una prenotazione o una richiesta?",
        a: "È una richiesta. Vi rispondiamo con disponibilità e prezzo. La prenotazione vale solo dopo la nostra conferma.",
      },
      {
        q: "Devo pagare online?",
        a: "No. Da questo sito non si paga nulla.",
        tbc: "Modalità di pagamento",
      },
      {
        q: "Il bagno è privato?",
        a: "Dipende dalla sistemazione, e ogni scheda lo dice. «Privato» vuol dire a uso esclusivo della vostra camera. «In comune» vuol dire condiviso con altri ospiti.",
      },
      {
        q: "Ci sono scale?",
        a: "Sì, nella casa ci sono gradini e scale. Se per voi sono un problema, scrivetelo nella richiesta.",
      },
      {
        q: "Come si arriva a Venezia?",
        a: "Venezia è dall'altra parte del Ponte della Libertà. Si arriva in tram, in autobus o in treno: i dettagli sono nella pagina Venezia.",
      },
      {
        q: "Posso prenotare un solo letto nella camerata?",
        a: "",
        tbc: "Regole della camerata",
      },
    ],
  },

  form: {
    title: "La vostra richiesta",
    name: "Nome e cognome",
    email: "Email",
    phone: "Telefono",
    optional: "facoltativo",
    arrival: "Arrivo",
    departure: "Partenza",
    guests: "Ospiti",
    room: "Sistemazione",
    roomAny: "Nessuna preferenza",
    message: "Messaggio",
    messageHint: "Orario di arrivo, richieste particolari, domande.",
    consent: "Ho letto l'informativa sulla privacy",
    consentLink: "Leggi l'informativa",
    submit: "Invia la richiesta",
    sending: "Invio in corso…",
    note: "È una richiesta, non un pagamento.",
    successTitle: "Richiesta inviata.",
    successText:
      "Grazie. Vi rispondiamo appena possibile all'indirizzo email che avete indicato.",
    another: "Invia un'altra richiesta",
    errors: {
      summary: "Controllate i campi segnalati.",
      required: "Questo campo è obbligatorio.",
      email: "Scrivete un indirizzo email valido.",
      date: "Scegliete una data valida.",
      past: "La data di arrivo è già passata.",
      order: "La partenza deve essere dopo l'arrivo.",
      guests: "Indicate da 1 a 12 ospiti.",
      consent: "Per inviare la richiesta serve la vostra conferma.",
      tooLong: "Il testo è troppo lungo.",
      rate: "Troppe richieste in poco tempo. Riprovate tra qualche minuto.",
      generic: "Non siamo riusciti a inviare la richiesta. Riprovate tra poco.",
      callUs: "Oppure telefonateci:",
    },
    whatsapp: "Scrivete su WhatsApp",
    whatsappTbc: "WhatsApp: numero da confermare",
    whatsappMessage:
      "Buongiorno, vorrei informazioni per un soggiorno alla Nuova Locanda Belvedere.",
    or: "oppure",
  },

  legal: {
    draft:
      "BOZZA — Questo testo va verificato dal consulente del titolare prima della pubblicazione.",
    updated: "Ultimo aggiornamento: da indicare alla pubblicazione",
    privacy: {
      label: "Privacy",
      title: "Informativa sulla privacy",
      sections: [
        {
          h: "Chi tratta i dati",
          p: [
            "Il titolare del trattamento è il gestore di Nuova Locanda Belvedere, a Marghera (Venezia).",
          ],
          tbc: ["Ragione sociale, indirizzo e partita IVA del titolare", "Email per le richieste sulla privacy"],
        },
        {
          h: "Quali dati raccogliamo",
          p: [
            "Raccogliamo solo i dati che scrivete nel modulo di richiesta: nome, email, telefono se lo indicate, date del soggiorno, numero di ospiti, sistemazione scelta e messaggio.",
            "Per proteggere il modulo dagli abusi, il server tiene per pochi minuti l'indirizzo IP di chi invia una richiesta. La richiesta può comparire nei registri tecnici del server.",
            "Il sito non usa strumenti di statistica né di profilazione.",
          ],
        },
        {
          h: "Perché li usiamo",
          p: [
            "Usiamo i dati per rispondere alla vostra richiesta e, se confermate, per gestire la prenotazione. La base giuridica è l'esecuzione di misure precontrattuali richieste da voi (art. 6, paragrafo 1, lettera b del Regolamento UE 2016/679).",
          ],
        },
        {
          h: "Per quanto tempo li conserviamo",
          p: ["Conserviamo i dati per il tempo necessario a gestire la richiesta."],
          tbc: ["Durata esatta della conservazione"],
        },
        {
          h: "A chi li comunichiamo",
          p: [
            "I dati non sono venduti né ceduti. Possono essere trattati dai fornitori tecnici che fanno funzionare il sito e l'invio delle email, come responsabili del trattamento.",
          ],
          tbc: ["Nome del fornitore di hosting", "Nome del servizio di invio email"],
        },
        {
          h: "WhatsApp",
          p: [
            "Se ci scrivete con WhatsApp, la conversazione avviene nell'applicazione WhatsApp ed è regolata anche dalle sue condizioni.",
          ],
        },
        {
          h: "I vostri diritti",
          p: [
            "Potete chiedere di accedere ai vostri dati, di correggerli, di cancellarli, di limitarne l'uso, di riceverli in un formato leggibile e di opporvi al trattamento.",
            "Potete presentare un reclamo al Garante per la protezione dei dati personali.",
          ],
        },
      ],
    },
    cookies: {
      label: "Cookie",
      title: "Informazioni sui cookie",
      sections: [
        {
          h: "Questo sito non usa cookie di profilazione",
          p: [
            "Il sito non usa cookie di profilazione, non usa strumenti di statistica e non carica script di terze parti.",
            "Per questo motivo non compare un banner di consenso.",
          ],
        },
        {
          h: "Caratteri e immagini",
          p: [
            "I caratteri tipografici e le immagini sono serviti dal sito stesso. Non vengono richiesti a server esterni.",
          ],
        },
        {
          h: "Collegamenti esterni",
          p: [
            "Il sito contiene collegamenti a siti esterni, per esempio quelli dei trasporti pubblici e WhatsApp. Quando li aprite valgono le regole di quei siti.",
          ],
        },
        {
          h: "Se qualcosa cambia",
          p: [
            "Se in futuro aggiungeremo strumenti che usano cookie, aggiorneremo questa pagina e chiederemo il vostro consenso prima di attivarli.",
          ],
        },
      ],
    },
  },

  notFound: {
    metaTitle: "Pagina non trovata",
    label: "Errore 404",
    title1: "Questa pagina",
    title2: "non c'è.",
    text: "Forse l'indirizzo è sbagliato o la pagina è stata spostata. Da qui potete tornare al sito o scriverci per una richiesta.",
    home: "Torna alla home",
    rooms: "Vedi le camere",
    book: "Verifica disponibilità",
    call: "Preferite telefonare?",
  },
};

export type Dictionary = typeof it;
