import type { Locale } from "../site";
import { it, type Dictionary } from "./it";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { it, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];
export type { Dictionary };
