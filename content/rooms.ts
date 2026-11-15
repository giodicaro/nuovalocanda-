import { dormBeds, type Localized } from "./site";
import type { PhotoKey } from "./photos";

/**
 * Le sistemazioni della locanda.
 *
 * VERIFICATO (schede Booking.com e Google del 15/11/2026):
 * tipologie, superfici, letti, tipo di bagno, dotazioni.
 *
 * DA CONFERMARE CON IL TITOLARE:
 * - l'abbinamento tra foto e tipologia (`photos`): è un'ipotesi fatta
 *   guardando le foto, perché l'abbinamento reale non è noto;
 * - la camerata condivisa (numero di letti in content/site.ts → dormBeds);
 * - la superficie della "Singola con bagno" (non rilevata su Booking.com);
 * - i prezzi: non sono noti e il sito non li mostra.
 */

export type TripType = "solo" | "duo" | "group";
export type BathType = "private" | "shared";

export type Room = {
  slug: string;
  group: "private" | "dorm";
  /** Per quale tipo di viaggio è adatta (filtro nella home). */
  trips: TripType[];
  name: Localized;
  blurb: Localized;
  guests: number;
  beds: Localized;
  /** `null` = non rilevata: il sito mostra "da confermare". */
  areaSqm: number | null;
  bath: BathType;
  /** DA CONFERMARE CON IL TITOLARE: abbinamento foto-camera ipotizzato. */
  photos: PhotoKey[];
  /** Testo del segnaposto quando non ci sono foto. */
  missingPhoto: Localized;
  /** `false` = tipologia non pubblicata su Booking.com, da confermare. */
  verified: boolean;
};

export const rooms: Room[] = [
  {
    slug: "singola-bagno-in-comune",
    group: "private",
    trips: ["solo"],
    name: { it: "Singola con bagno in comune", en: "Single room, shared bathroom" },
    blurb: {
      it: "La stanza più piccola della casa. Un letto, una scrivania, una porta che si chiude. Il bagno è in comune con altri ospiti.",
      en: "The smallest room in the house. A bed, a desk, a door that closes. The bathroom is shared with other guests.",
    },
    guests: 1,
    beds: { it: "1 letto singolo", en: "1 single bed" },
    areaSqm: 9,
    bath: "shared",
    photos: [],
    missingPhoto: { it: "camera singola", en: "single room" },
    verified: true,
  },
  {
    slug: "singola-con-bagno",
    group: "private",
    trips: ["solo"],
    name: { it: "Singola con bagno", en: "Single room, private bathroom" },
    blurb: {
      it: "Per chi viaggia da solo e vuole il bagno tutto per sé.",
      en: "For solo travellers who want a bathroom of their own.",
    },
    guests: 1,
    beds: { it: "1 letto singolo", en: "1 single bed" },
    areaSqm: null,
    bath: "private",
    photos: [],
    missingPhoto: { it: "camera singola con bagno", en: "single room with bathroom" },
    verified: true,
  },
  {
    slug: "matrimoniale",
    group: "private",
    trips: ["duo"],
    name: { it: "Matrimoniale", en: "Double room" },
    blurb: {
      it: "Un letto matrimoniale, la scrivania, l'armadio. Il bagno è in camera.",
      en: "A double bed, a desk, a wardrobe. The bathroom is in the room.",
    },
    guests: 2,
    beds: { it: "1 letto matrimoniale", en: "1 double bed" },
    areaSqm: 16,
    bath: "private",
    photos: ["matrimonialeFoglie", "matrimonialeGrigia", "matrimonialeQuadro"],
    missingPhoto: { it: "camera matrimoniale", en: "double room" },
    verified: true,
  },
  {
    slug: "doppia-letti-singoli",
    group: "private",
    trips: ["duo"],
    name: { it: "Doppia con letti singoli", en: "Twin room" },
    blurb: {
      it: "Due letti singoli oppure un matrimoniale: ditecelo quando prenotate. Il bagno è in camera.",
      en: "Two single beds or one double: tell us when you book. The bathroom is in the room.",
    },
    guests: 2,
    beds: {
      it: "2 letti singoli oppure 1 matrimoniale",
      en: "2 single beds or 1 double bed",
    },
    areaSqm: 16,
    bath: "private",
    photos: ["dueLettiBagno", "bagno"],
    missingPhoto: { it: "camera doppia", en: "twin room" },
    verified: true,
  },
  {
    slug: "standard-doppia-letti-singoli",
    group: "private",
    trips: ["duo"],
    name: {
      it: "Standard doppia con letti singoli",
      en: "Standard twin room, shared bathroom",
    },
    blurb: {
      it: "Due letti singoli, con il bagno in comune con altri ospiti.",
      en: "Two single beds, with a bathroom shared with other guests.",
    },
    guests: 2,
    beds: { it: "2 letti singoli", en: "2 single beds" },
    areaSqm: 16,
    bath: "shared",
    photos: ["dueLettiParquet"],
    missingPhoto: { it: "camera doppia standard", en: "standard twin room" },
    verified: true,
  },
  {
    slug: "tripla",
    group: "private",
    trips: ["group"],
    name: { it: "Tripla", en: "Triple room" },
    blurb: {
      it: "Tre letti e il bagno in camera. Per tre amici, o per una famiglia con un figlio.",
      en: "Three beds and an en-suite bathroom. For three friends, or a family with one child.",
    },
    guests: 3,
    beds: { it: "3 letti singoli oppure 2 singoli", en: "3 single beds or 2 single beds" },
    areaSqm: 18,
    bath: "private",
    photos: ["treLetti"],
    missingPhoto: { it: "camera tripla", en: "triple room" },
    verified: true,
  },
  {
    slug: "quadrupla",
    group: "private",
    trips: ["group"],
    name: { it: "Quadrupla", en: "Quadruple room" },
    blurb: {
      it: "La stanza delle famiglie: quattro posti letto e il bagno in camera.",
      en: "The family room: four sleeping places and an en-suite bathroom.",
    },
    guests: 4,
    beds: {
      it: "Letto a castello, matrimoniale e singoli in varie combinazioni",
      en: "Bunk bed, double bed and single beds in various combinations",
    },
    areaSqm: 20,
    bath: "private",
    photos: [],
    missingPhoto: { it: "camera quadrupla", en: "quadruple room" },
    verified: true,
  },
  {
    slug: "quadrupla-economy",
    group: "private",
    trips: ["group"],
    name: { it: "Quadrupla Economy", en: "Economy quadruple room" },
    blurb: {
      it: "Quattro letti a castello in una stanza tutta per il vostro gruppo. Il bagno è in comune.",
      en: "Four bunk beds in a room just for your group. The bathroom is shared.",
    },
    guests: 4,
    beds: { it: "4 letti a castello", en: "4 bunk beds" },
    areaSqm: 20,
    bath: "shared",
    photos: [],
    missingPhoto: { it: "quadrupla economy", en: "economy quadruple room" },
    verified: true,
  },
  {
    slug: "camerata-condivisa",
    group: "dorm",
    trips: ["solo", "group"],
    name: { it: "Camerata condivisa mista", en: "Mixed shared dormitory" },
    blurb: {
      it: "Un letto in una stanza condivisa con altri viaggiatori, uomini e donne. Il bagno è in comune.",
      en: "A bed in a room shared with other travellers, men and women. The bathroom is shared.",
    },
    guests: dormBeds,
    beds: {
      it: `${dormBeds} letti in stanza condivisa`,
      en: `${dormBeds} beds in a shared room`,
    },
    areaSqm: null,
    bath: "shared",
    photos: [],
    missingPhoto: { it: "camerata", en: "dormitory" },
    verified: false,
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);

/** Dotazioni delle camere pubblicate su Booking.com (verificate). */
export const roomAmenities: Localized<string[]> = {
  it: [
    "Aria condizionata indipendente",
    "Riscaldamento",
    "WiFi gratuito",
    "TV a schermo piatto",
    "Biancheria da letto",
    "Scrivania",
    "Armadio e appendiabiti",
    "Ferro da stiro",
  ],
  en: [
    "Individual air conditioning",
    "Heating",
    "Free WiFi",
    "Flat-screen TV",
    "Bed linen",
    "Desk",
    "Wardrobe and clothes rack",
    "Iron",
  ],
};

/** Dotazioni dei bagni, privati o in comune (verificate). */
export const bathAmenities: Localized<string[]> = {
  it: ["Doccia o vasca", "Asciugamani", "Asciugacapelli"],
  en: ["Shower or bath", "Towels", "Hairdryer"],
};
