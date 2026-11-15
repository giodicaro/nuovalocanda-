import type { Room } from "@/content/rooms";
import { href } from "@/content/routes";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { Frame } from "@/components/ui/Frame";
import { ButtonLink, PhotoMissing, Tbc } from "@/components/ui/primitives";
import { RoomFacts } from "./RoomFacts";

const two = (n: number) => String(n).padStart(2, "0");

export const slideGridClass =
  "grid items-end gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 lg:grid-cols-[minmax(0,22.5rem)_minmax(0,1fr)]";

/**
 * Il contenuto di una scheda dello slider, su fondo verde.
 * È un componente senza stato: lo usano sia lo slider interattivo
 * sia la versione statica che si vede prima che lo slider si attivi.
 */
export function RoomSlide({
  room,
  lang,
  common,
  position,
  total,
}: {
  room: Room;
  lang: Locale;
  common: Dictionary["common"];
  /** Posizione nella lista filtrata, da 0. */
  position: number;
  total: number;
}) {
  const photo = room.photos[0];
  return (
    <>
      <div className="mx-auto w-full max-w-[22.5rem] lg:mx-0">
        {photo ? (
          <Frame
            photo={photo}
            lang={lang}
            caption={common.photoTbc}
            number={two(position + 1)}
            className="text-inchiostro"
          />
        ) : (
          <div className="border border-sabbia bg-carta p-2.5">
            <PhotoMissing what={room.missingPhoto[lang]} label={common.photoMissing} />
          </div>
        )}
      </div>

      <div>
        <p className="font-serif text-[2.75rem] leading-none text-ocra" aria-hidden="true">
          {two(position + 1)}
          <span className="ml-2 text-[1.1rem] text-sabbia">/ {two(total)}</span>
        </p>
        <h3 className="titolo-scheda mt-3">{room.name[lang]}</h3>
        <p className="mt-4 max-w-[46ch] text-sabbia">{room.blurb[lang]}</p>
        {!room.verified ? (
          <p className="mt-3 text-[0.9rem]">
            <Tbc tbc={common.tbcWithOwner} tone="dark" />
          </p>
        ) : null}

        <RoomFacts room={room} lang={lang} common={common} tone="dark" className="mt-7" />

        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          <ButtonLink href={`${href("book", lang)}?camera=${room.slug}`} variant="onDark">
            {common.requestRoom}
          </ButtonLink>
          <ButtonLink href={href("rooms", lang, room.slug)} variant="outlineOnDark">
            {common.allRooms}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
