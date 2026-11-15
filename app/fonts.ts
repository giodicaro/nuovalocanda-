import { Figtree, Fraunces } from "next/font/google";

/**
 * Titoli: serif morbido e un po' rétro, tondo e corsivo. Licenza OFL.
 * Un solo peso (400) senza assi variabili: i due file pesano circa 41 KB
 * invece di 270 KB. È una scelta di velocità su rete mobile.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Testo e interfaccia: sans amichevole e leggibile. Licenza OFL. */
export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
