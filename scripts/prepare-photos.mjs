// Copia le foto della locanda in public/images con nomi descrittivi.
// Non modifica mai gli originali. I ritagli sono documentati qui e in docs/direzione-visiva.md.
// Uso: node scripts/prepare-photos.mjs "C:\Users\...\Foto Nuova Locanda Belvedere"
// (sharp è installato come dipendenza di Next.js)
import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const src = process.argv[2];
if (!src) {
  console.error("Indicare la cartella delle foto originali.");
  process.exit(1);
}
const out = path.resolve("public/images");
await mkdir(out, { recursive: true });

/** @type {Array<{from: string, to: string, crop?: {left:number, top:number, width:number, height:number}}>} */
const jobs = [
  { from: "04-esterno-strada.jpg", to: "ingresso-insegna-alloggi.jpg" },
  // Open Graph 1200x630: stessa foto, ritaglio orizzontale.
  { from: "04-esterno-strada.jpg", to: "og-ingresso.jpg", crop: { left: 0, top: 8, width: 1200, height: 630 } },
  { from: "01-facciata-notte.jpg", to: "facciata-di-sera.jpg" },
  // Solo il balconcino: il ritaglio esclude la tenda "Hotel Belvedere" e le
  // insegne "Bar Trattoria". Il nome della struttura è Nuova Locanda Belvedere.
  { from: "03-balcone.jpg", to: "balconcino-bianco.jpg", crop: { left: 345, top: 228, width: 380, height: 240 } },
  // Tavolo, balaustra e case di fronte.
  { from: "05-terrazza.jpg", to: "terrazza-coperta.jpg", crop: { left: 560, top: 250, width: 720, height: 607 } },
  { from: "06-reception.jpg", to: "reception-bancone.jpg" },
  { from: "07-hall.jpg", to: "hall-ingresso.jpg" },
  // Tavolino a mosaico con il biglietto NLB.
  { from: "09-logo-nlb.jpg", to: "mosaico-logo-nlb.jpg", crop: { left: 300, top: 3, width: 850, height: 850 } },
  { from: "11-camera-doppia-quadro.jpg", to: "camera-matrimoniale-quadro.jpg" },
  { from: "12-camera-due-singoli.jpg", to: "camera-due-letti-bagno.jpg" },
  { from: "13-camera-calda.jpg", to: "camera-due-letti-parquet.jpg" },
  { from: "14-camera-tv.jpg", to: "camera-tre-letti.jpg" },
  { from: "15-camera-matrimoniale.jpg", to: "camera-matrimoniale-grigia.jpg" },
  { from: "16-camera-matrimoniale-nuova.jpg", to: "camera-matrimoniale-foglie.jpg" },
  { from: "17-bagno.jpg", to: "bagno-in-camera.jpg" },
];

for (const job of jobs) {
  let img = sharp(path.join(src, job.from));
  if (job.crop) img = img.extract(job.crop);
  const info = await img.jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(out, job.to));
  console.log(`${job.to}  ${info.width}x${info.height}`);
}
