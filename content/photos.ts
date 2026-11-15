import type { StaticImageData } from "next/image";
import type { Localized } from "./site";

import ingresso from "@/public/images/ingresso-insegna-alloggi.jpg";
import sera from "@/public/images/facciata-di-sera.jpg";
import balconcino from "@/public/images/balconcino-bianco.jpg";
import terrazza from "@/public/images/terrazza-coperta.jpg";
import reception from "@/public/images/reception-bancone.jpg";
import hall from "@/public/images/hall-ingresso.jpg";
import mosaico from "@/public/images/mosaico-logo-nlb.jpg";
import matrimonialeQuadro from "@/public/images/camera-matrimoniale-quadro.jpg";
import dueLettiBagno from "@/public/images/camera-due-letti-bagno.jpg";
import dueLettiParquet from "@/public/images/camera-due-letti-parquet.jpg";
import treLetti from "@/public/images/camera-tre-letti.jpg";
import matrimonialeGrigia from "@/public/images/camera-matrimoniale-grigia.jpg";
import matrimonialeFoglie from "@/public/images/camera-matrimoniale-foglie.jpg";
import bagno from "@/public/images/bagno-in-camera.jpg";

export type Photo = {
  src: StaticImageData;
  alt: Localized;
  /**
   * Larghezza massima a schermo, in px CSS.
   * Le foto sono piccole: non vanno mai mostrate oltre la loro larghezza
   * reale, e su desktop restano entro circa due terzi di essa.
   */
  maxWidth: number;
};

export const photos = {
  ingresso: {
    src: ingresso,
    maxWidth: 640,
    alt: {
      it: "L'ingresso d'angolo della locanda: intonaco arancione, tenda crema smerlata, insegna verticale Alloggi e fiori rossi alla finestra",
      en: "The corner entrance of the inn: orange plaster, scalloped cream awning, vertical Alloggi sign and red flowers at the window",
    },
  },
  sera: {
    src: sera,
    maxWidth: 380,
    alt: {
      it: "La facciata della locanda di sera, con la tenda illuminata sopra l'ingresso",
      en: "The front of the inn in the evening, with the awning lit above the entrance",
    },
  },
  balconcino: {
    src: balconcino,
    maxWidth: 340,
    alt: {
      it: "Il balconcino bianco traforato sulla facciata arancione, sotto una tenda crema",
      en: "The white fretwork balcony on the orange facade, under a cream awning",
    },
  },
  terrazza: {
    src: terrazza,
    maxWidth: 520,
    alt: {
      it: "La terrazza coperta con il tavolo, le sedie e la balaustra bianca affacciata sulla strada alberata",
      en: "The covered terrace with table, chairs and white balustrade overlooking the tree-lined street",
    },
  },
  reception: {
    src: reception,
    maxWidth: 760,
    alt: {
      it: "La reception: bancone curvo in legno, pareti gialle, soffitto a cassettoni e una grande mappa di Venezia incorniciata",
      en: "The reception: curved wooden desk, yellow walls, coffered ceiling and a large framed map of Venice",
    },
  },
  hall: {
    src: hall,
    maxWidth: 760,
    alt: {
      it: "La hall vista dal bancone verso la porta d'ingresso, con il divano e il soffitto in legno",
      en: "The hall seen from the desk towards the front door, with the sofa and the wooden ceiling",
    },
  },
  mosaico: {
    src: mosaico,
    maxWidth: 420,
    alt: {
      it: "Un tavolino a mosaico con il biglietto NLB Nuova Locanda Belvedere",
      en: "A mosaic side table with the NLB Nuova Locanda Belvedere card",
    },
  },
  matrimonialeFoglie: {
    src: matrimonialeFoglie,
    maxWidth: 420,
    alt: {
      it: "Camera con letto matrimoniale, copriletto a foglie, testiera e comodini in legno chiaro",
      en: "Room with a double bed, leaf-pattern bedspread, light wood headboard and bedside tables",
    },
  },
  matrimonialeGrigia: {
    src: matrimonialeGrigia,
    maxWidth: 420,
    alt: {
      it: "Camera con letto matrimoniale, copriletto grigio e due asciugamani arrotolati",
      en: "Room with a double bed, grey bedspread and two rolled towels",
    },
  },
  matrimonialeQuadro: {
    src: matrimonialeQuadro,
    maxWidth: 420,
    alt: {
      it: "Camera con letto matrimoniale e un quadro con le maschere del Carnevale alla parete",
      en: "Room with a double bed and a picture of Carnival masks on the wall",
    },
  },
  dueLettiBagno: {
    src: dueLettiBagno,
    maxWidth: 320,
    alt: {
      it: "Camera con due letti singoli, copriletti marroni e la porta del bagno in camera",
      en: "Room with two single beds, brown bedspreads and the door to the en-suite bathroom",
    },
  },
  dueLettiParquet: {
    src: dueLettiParquet,
    maxWidth: 320,
    alt: {
      it: "Camera con due letti singoli e pavimento in parquet, illuminata dalla finestra",
      en: "Room with two single beds and a parquet floor, lit by the window",
    },
  },
  treLetti: {
    src: treLetti,
    maxWidth: 320,
    alt: {
      it: "Camera con tre letti singoli, scrivania, TV a parete e due finestre",
      en: "Room with three single beds, a desk, a wall-mounted TV and two windows",
    },
  },
  bagno: {
    src: bagno,
    maxWidth: 320,
    alt: {
      it: "Un bagno in camera con lavabo, specchio e mensola in vetro",
      en: "An en-suite bathroom with washbasin, mirror and glass shelf",
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
