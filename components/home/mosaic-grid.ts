/**
 * Misure della mappa a mosaico, condivise tra il componente server
 * (MosaicMap) e quello client (MosaicTiles). Stanno in un file a parte
 * perché un componente server non può leggere i valori esportati da un
 * file "use client".
 */
export const COLS = 38;
export const ROWS = 18;
export const CELL = 18;
export const GAP = 2;

/** Posizione della locanda sulla mappa, in unità del disegno. */
export const PIN = { x: 5 * CELL + CELL / 2, y: 9 * CELL + CELL / 2 };
