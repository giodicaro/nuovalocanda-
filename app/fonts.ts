import { Figtree, Fraunces } from "next/font/google";

/** Titoli: serif morbido e un po' rétro, tondo e corsivo. Licenza OFL. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Testo e interfaccia: sans amichevole e leggibile. Licenza OFL. */
export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
