import type { Dictionary } from "./it";

/** English copy. Warm, direct, concrete. Addresses the reader as "you". */
export const en: Dictionary = {
  meta: {
    home: {
      title: "Nuova Locanda Belvedere — A place to sleep in Marghera, near Venice",
      description:
        "An eight-room inn in Marghera, on the Venice mainland. Single, double, triple and quadruple rooms. Venice is a tram, bus or train ride away. Ask the inn directly, with no middleman.",
    },
    rooms: {
      title: "Rooms — Nuova Locanda Belvedere, Marghera Venice",
      description:
        "Every place to sleep at the inn: single, double, twin, triple and quadruple rooms. Guests, beds, size and bathroom type for each one.",
    },
    venice: {
      title: "Getting to Venice from Marghera — Nuova Locanda Belvedere",
      description:
        "A practical guide for guests staying in Marghera: tram, bus and train to Venice, tips for the day, the access fee and the events of the year.",
    },
    book: {
      title: "Book — Nuova Locanda Belvedere, Marghera Venice",
      description:
        "Send a request straight to the inn: dates, guests and room. We reply with availability and price. No online payment.",
    },
    privacy: {
      title: "Privacy — Nuova Locanda Belvedere",
      description: "Information on how personal data is handled (draft).",
    },
    cookies: {
      title: "Cookies — Nuova Locanda Belvedere",
      description: "Information on the use of cookies on this site (draft).",
    },
  },

  nav: {
    home: "Home",
    rooms: "Rooms",
    venice: "Venice",
    book: "Book",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    main: "Main navigation",
    language: "Language",
    switchTo: "Italiano",
    pauseMotion: "Pause animations",
    playMotion: "Resume animations",
    homeAria: "Nuova Locanda Belvedere, home page",
  },

  common: {
    tbc: "to be confirmed",
    tbcWithOwner: "To be confirmed with the owner",
    checkAvailability: "Check availability",
    requestRoom: "Request this room",
    allRooms: "All rooms",
    guests: "Guests",
    beds: "Beds",
    area: "Size",
    bath: "Bathroom",
    bathPrivate: "Private",
    bathShared: "Shared",
    photoMissing: "Photo needed",
    photoTbc: "Photo match to be confirmed",
    indicative: "approximate",
    placeholder: "Placeholder",
    externalSite: "external site",
  },

  hero: {
    label: "Marghera · Venice",
    title1: "A room in Marghera.",
    title2: "Venice, just across the bridge.",
    text: "Eight simple, clean rooms on the mainland. In the morning you leave for Venice by tram, bus or train. In the evening you come back home.",
    ctaSecondary: "See the rooms",
    sign: "Alloggi",
    photoCaption: "The entrance, on the corner",
    tramFrom: "Marghera",
    tramBridge: "Ponte della Libertà",
    tramTo: "Venice",
    tramAlt:
      "Decorative illustration: a tram crosses the Ponte della Libertà, from the mainland towards Venice",
  },

  manifesto: {
    label: "The welcome",
    title1: "Here, the door is opened",
    title2: "by a person.",
    p1: "Guests who have stayed here talk first about the people who welcomed them. At reception you can ask how to get to Venice and where best to set off from.",
    p2: "It is an old-style inn. The orange front, the awning over the door, the 'Alloggi' sign you can see from the street. In the hall there is a large map of Venice: the right place to plan your day.",
    aside: "Simple, clean, no frills.",
    captionReception: "The reception",
    captionMosaic: "Our card",
  },

  rooms: {
    label: "Where you sleep",
    title1: "Tell us how you travel.",
    title2: "We'll tell you where to sleep.",
    intro:
      "Single, double, triple and quadruple rooms. Each card tells you straight away how many beds there are and whether the bathroom is private or shared.",
    filterLabel: "Type of trip",
    trips: { solo: "On my own", duo: "For two", group: "In a group" },
    prev: "Previous room",
    next: "Next room",
    carousel: "Rooms",
    slideOf: "of",
    goTo: "Go to room",
  },

  venice: {
    label: "Venice",
    title1: "Three ways",
    title2: "to cross the bridge.",
    intro:
      "Marghera is on the mainland, facing Venice. The two shores are joined by the Ponte della Libertà, which you cross by tram, bus or train.",
    ways: [
      {
        name: "Tram",
        text: "The ACTV network has two tram lines. T2 links Marghera to Mestre Centro. T1 links Favaro Veneto to Venice, Piazzale Roma.",
        tbc: "Nearest stop and travel time",
      },
      {
        name: "Bus",
        text: "ACTV city buses link the mainland to Piazzale Roma, the Venice terminus.",
        tbc: "Line and nearest stop",
      },
      {
        name: "Train",
        text: "From Venezia Mestre station, regional trains reach Venezia Santa Lucia in about 10–15 minutes (approximate time).",
        tbc: "Distance from the station",
      },
    ],
    placesTitle: "Where to get off, what to see",
    places: [
      {
        name: "Piazzale Roma",
        text: "Where trams and buses arrive. From here you explore Venice on foot or by vaporetto.",
      },
      {
        name: "Santa Lucia",
        text: "The railway station, facing the Grand Canal.",
      },
      { name: "Rialto", text: "The most famous bridge and its market." },
      { name: "San Marco", text: "The square, the basilica, the bell tower." },
      {
        name: "Mestre, Piazza Ferretto",
        text: "The centre of Mestre, for a quieter evening.",
      },
    ],
    cta: "The guide to getting to Venice",
    mapCaption: "Illustrated map, not to scale",
    mapAlt:
      "Mosaic-tile map: the inn in Marghera on the mainland, the Ponte della Libertà over the lagoon, and Venice",
    mapLocanda: "The inn",
    mapMestre: "Mestre",
    mapBridge: "Ponte della Libertà",
    mapVenice: "Venice",
    mapLagoon: "Lagoon",
  },

  direct: {
    label: "Booking here",
    title1: "No middleman.",
    title2: "You talk to us.",
    text: "When you write from this site, your request reaches the inn and not a booking portal. The people who reply are the people who work here.",
    placeholderTitle: "Benefit to be confirmed",
    placeholderText:
      "A real benefit for guests who book directly goes here. The owner will provide it.",
    cta: "Write to the inn",
  },

  house: {
    label: "The house",
    title1: "A yellow hall, a terrace,",
    title2: "a small white balcony.",
    text: "The hall has yellow walls and a wooden ceiling. There is a covered terrace, with a table and a white balustrade overlooking the street.",
    amenitiesTitle: "What you'll find",
    amenities: ["Free WiFi", "Air conditioning and heating in the rooms", "Reception"],
    tbcItems: ["Breakfast", "Parking", "Luggage storage"],
    stairsTitle: "Steps and stairs",
    stairs:
      "There are steps and stairs in the house. If they are a problem for you, write to us before booking: we will tell you what the room is like.",
    captionHall: "The hall",
    captionTerrace: "The terrace",
    captionBalcony: "The balcony",
  },

  reviews: {
    label: "Guest reviews",
    title1: "What our guests",
    title2: "say.",
    bookingSource: "Score on Booking.com",
    googleSource: "Score on Google",
    reviewsWord: "reviews",
    checkedOn: "Checked on",
    details: {
      staff: "Staff",
      cleanliness: "Cleanliness",
      location: "Location",
      value: "Value for money",
      comfort: "Comfort",
      wifi: "WiFi",
      facilities: "Facilities",
    },
    quotePlaceholder:
      "PLACEHOLDER — a guest's words go here, published with their consent.",
    quoteAuthor: "Guest name, to be confirmed",
  },

  bookCta: {
    label: "Book",
    title1: "Send us your dates.",
    title2: "You'll hear from us.",
    text: "This is a request, not a payment. We reply with availability and price.",
    eveningCaption: "The inn, in the evening",
  },

  footer: {
    tagline: "An inn in Marghera, on Venice's doorstep.",
    clock: "Time in Venice",
    where: "Where we are",
    contacts: "Contact",
    pages: "The site",
    address: "Address",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    cin: "CIN",
    vat: "VAT number",
    privacy: "Privacy",
    cookies: "Cookies",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  roomsPage: {
    label: "The rooms",
    title1: "Every place to sleep,",
    title2: "one by one.",
    intro:
      "For each one you'll find guests, beds, size and bathroom type. Prices are not published here: ask with a request and we will reply.",
    groupPrivate: "Private rooms",
    groupDorm: "Shared dormitory",
    amenitiesTitle: "In the rooms",
    bathTitle: "In the bathrooms, private and shared",
    dormWarning:
      "To be confirmed with the owner: the number of beds and what the room includes have not been verified yet.",
    price: "Price",
    priceTbc: "On request",
  },

  venicePage: {
    label: "Practical guide",
    title1: "From Marghera to Venice,",
    title2: "without getting lost.",
    intro:
      "Sleeping in Marghera means having Venice close at hand and coming back, in the evening, to the mainland. Here is how to get there and what to know before you set off.",
    waysTitle: "How to get there",
    waysNote:
      "Lines, stops and travel times from the inn are to be confirmed. For current timetables and fares, check the official sites.",
    officialActv: "ACTV timetables and fares",
    officialTrenitalia: "Trenitalia train times",
    tipsTitle: "Tips for the day",
    tips: [
      {
        title: "Leave early",
        text: "Venice is quieter in the morning. The streets fill up around midday.",
      },
      {
        title: "Comfortable shoes",
        text: "You explore Venice on foot, and the bridges have steps.",
      },
      {
        title: "Ticket before boarding",
        text: "Buy your tram or bus ticket before boarding and validate it on board.",
      },
      {
        title: "High water",
        text: "In autumn and winter the tide can flood the lowest areas. Check the forecast from the City of Venice tide centre.",
      },
      {
        title: "The last ride back",
        text: "Before dinner, check the time of the last service back to Marghera.",
      },
    ],
    feeTitle: "The access fee",
    feeBadge: "Information to check",
    fee: [
      "On some days of the year, day visitors to Venice must register and pay an access fee. In 2026 it applied on certain dates between April and July.",
      "Marghera is part of the Municipality of Venice. Guests staying in accommodation within the Municipality are normally exempt, but still have to register their exemption.",
      "The rules change every year. Before you travel, check the official City of Venice portal.",
    ],
    feeLink: "Official access fee portal",
    eventsTitle: "Venice through the year",
    eventsNote: "Dates change every year: check them before you book.",
    events: [
      { when: "Winter", name: "Carnival", text: "Masks and costumes all over the city." },
      {
        when: "Spring to autumn",
        name: "Biennale",
        text: "The international exhibition at the Giardini and the Arsenale.",
      },
      {
        when: "July",
        name: "Festa del Redentore",
        text: "The bridge of boats and fireworks over the lagoon.",
      },
      {
        when: "Late summer",
        name: "Venice Film Festival",
        text: "The film festival, on the Lido.",
      },
      {
        when: "September",
        name: "Regata Storica",
        text: "The boat parade and races on the Grand Canal.",
      },
      {
        when: "21 November",
        name: "Madonna della Salute",
        text: "The pilgrimage to the Salute basilica.",
      },
    ],
    cta: "Choose your room",
  },

  bookPage: {
    label: "Book",
    title1: "Ask for",
    title2: "your room.",
    intro:
      "Send us your dates and how many of you there are. We reply with availability and price. You pay nothing on this site.",
    infoTitle: "Times and house rules",
    info: {
      checkIn: "Check-in",
      checkOut: "Check-out",
      reception: "Reception",
      breakfast: "Breakfast",
      parking: "Parking",
      rules: "House rules",
    },
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is this a booking or a request?",
        a: "It is a request. We reply with availability and price. Your booking is confirmed only when we confirm it.",
      },
      {
        q: "Do I have to pay online?",
        a: "No. You pay nothing on this site.",
        tbc: "Payment methods",
      },
      {
        q: "Is the bathroom private?",
        a: "It depends on the room, and each card says so. 'Private' means for your room only. 'Shared' means shared with other guests.",
      },
      {
        q: "Are there stairs?",
        a: "Yes, there are steps and stairs in the house. If they are a problem for you, say so in your request.",
      },
      {
        q: "How do I get to Venice?",
        a: "Venice is on the other side of the Ponte della Libertà. You get there by tram, bus or train: the details are on the Venice page.",
      },
      {
        q: "Can I book a single bed in the dormitory?",
        a: "",
        tbc: "Dormitory rules",
      },
    ],
  },

  form: {
    title: "Your request",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    room: "Room",
    roomAny: "No preference",
    message: "Message",
    messageHint: "Arrival time, special requests, questions.",
    consent: "I have read the privacy notice",
    consentLink: "Read the notice",
    submit: "Send request",
    sending: "Sending…",
    note: "This is a request, not a payment.",
    successTitle: "Request sent.",
    successText:
      "Thank you. We will reply as soon as possible to the email address you gave us.",
    another: "Send another request",
    errors: {
      summary: "Please check the highlighted fields.",
      required: "This field is required.",
      email: "Enter a valid email address.",
      date: "Choose a valid date.",
      past: "The arrival date is in the past.",
      order: "Departure must be after arrival.",
      guests: "Enter between 1 and 12 guests.",
      consent: "We need your confirmation to send the request.",
      tooLong: "The text is too long.",
      rate: "Too many requests in a short time. Please try again in a few minutes.",
      generic: "We could not send your request. Please try again shortly.",
    },
    whatsapp: "Write on WhatsApp",
    whatsappTbc: "WhatsApp: number to be confirmed",
    whatsappMessage:
      "Hello, I would like some information about a stay at Nuova Locanda Belvedere.",
    or: "or",
  },

  legal: {
    draft:
      "DRAFT — This text must be checked by the owner's adviser before publication.",
    updated: "Last updated: to be set on publication",
    privacy: {
      label: "Privacy",
      title: "Privacy notice",
      sections: [
        {
          h: "Who handles your data",
          p: [
            "The data controller is the operator of Nuova Locanda Belvedere, in Marghera (Venice), Italy.",
          ],
          tbc: ["Controller's legal name, address and VAT number", "Email for privacy requests"],
        },
        {
          h: "What data we collect",
          p: [
            "We collect only the data you enter in the request form: name, email, phone if you give it, dates of stay, number of guests, chosen room and message.",
            "To protect the form from abuse, the server keeps the IP address of anyone who sends a request for a few minutes. The request may appear in the server's technical logs.",
            "The site uses no analytics and no profiling tools.",
          ],
        },
        {
          h: "Why we use it",
          p: [
            "We use the data to reply to your request and, if you confirm, to manage your booking. The legal basis is the performance of pre-contractual steps at your request (Article 6(1)(b) of Regulation (EU) 2016/679).",
          ],
        },
        {
          h: "How long we keep it",
          p: ["We keep the data for as long as needed to handle your request."],
          tbc: ["Exact retention period"],
        },
        {
          h: "Who we share it with",
          p: [
            "Your data is not sold or passed on. It may be processed by the technical providers that run the site and the email delivery, acting as data processors.",
          ],
          tbc: ["Name of the hosting provider", "Name of the email delivery service"],
        },
        {
          h: "WhatsApp",
          p: [
            "If you write to us on WhatsApp, the conversation takes place in the WhatsApp application and is also governed by its terms.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You can ask to access your data, correct it, delete it, restrict its use, receive it in a readable format and object to its processing.",
            "You can lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali).",
          ],
        },
      ],
    },
    cookies: {
      label: "Cookies",
      title: "Information on cookies",
      sections: [
        {
          h: "This site uses no profiling cookies",
          p: [
            "The site uses no profiling cookies, no analytics tools and loads no third-party scripts.",
            "For this reason no consent banner is shown.",
          ],
        },
        {
          h: "Fonts and images",
          p: [
            "Fonts and images are served by the site itself. They are not requested from external servers.",
          ],
        },
        {
          h: "External links",
          p: [
            "The site contains links to external sites, such as public transport sites and WhatsApp. When you open them, the rules of those sites apply.",
          ],
        },
        {
          h: "If something changes",
          p: [
            "If we add tools that use cookies in the future, we will update this page and ask for your consent before turning them on.",
          ],
        },
      ],
    },
  },
};
