import { getDictionary } from "@/content/i18n";
import { bathAmenities, roomAmenities, rooms, type Room } from "@/content/rooms";
import { href } from "@/content/routes";
import type { Locale } from "@/content/site";
import { Frame } from "@/components/ui/Frame";
import { PageIntro } from "@/components/ui/PageIntro";
import { ButtonLink, Label, PhotoMissing, Reveal, Scallop, Tbc } from "@/components/ui/primitives";
import { RoomFacts } from "@/components/rooms/RoomFacts";

const two = (n: number) => String(n).padStart(2, "0");

export function RoomsPage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.roomsPage;
  const common = dict.common;

  const groups: { key: Room["group"]; title: string }[] = [
    { key: "private", title: t.groupPrivate },
    { key: "dorm", title: t.groupDorm },
  ];

  return (
    <>
      <PageIntro label={t.label} line1={t.title1} line2={t.title2} intro={t.intro} />

      {groups.map((group) => {
        const list = rooms.filter((room) => room.group === group.key);
        return (
          <section key={group.key} aria-labelledby={`gruppo-${group.key}`} className="contenitore pb-[clamp(3rem,7vw,6rem)]">
            <div className="flex items-baseline justify-between gap-6 border-b border-inchiostro pb-4">
              <h2 id={`gruppo-${group.key}`} className="font-serif text-[clamp(1.7rem,3vw,2.4rem)]">
                {group.title}
              </h2>
              <p className="font-serif text-[1.1rem] text-terracotta" aria-hidden="true">
                {two(list.length)}
              </p>
            </div>

            {list.map((room) => {
              const number = two(rooms.indexOf(room) + 1);
              return (
                <Reveal
                  as="article"
                  key={room.slug}
                  className="grid scroll-mt-28 gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 border-b border-sabbia py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                >
                  <div id={room.slug} className="scroll-mt-28">
                    {room.photos.length ? (
                      <div className="flex flex-wrap items-start gap-4">
                        {room.photos.map((photo, i) => (
                          <Frame
                            key={photo}
                            photo={photo}
                            lang={lang}
                            caption={i === 0 ? common.photoTbc : undefined}
                            maxWidth={i === 0 ? 300 : 190}
                            className={i === 0 ? "basis-[300px]" : "basis-[150px] sm:basis-[190px]"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="max-w-[320px] border border-sabbia bg-carta p-2.5">
                        <PhotoMissing what={room.missingPhoto[lang]} label={common.photoMissing} />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-serif text-[1.05rem] text-terracotta" aria-hidden="true">
                      {number}
                    </p>
                    <h3 className="titolo-scheda mt-2">{room.name[lang]}</h3>
                    <p className="mt-4 max-w-[48ch] text-legno">{room.blurb[lang]}</p>
                    {!room.verified ? (
                      <p className="mt-4 border-l-2 border-ocra bg-carta px-4 py-3 text-[0.95rem] text-mattone" data-da-confermare="">
                        {t.dormWarning}
                      </p>
                    ) : null}

                    <RoomFacts room={room} lang={lang} common={common} className="mt-7" />

                    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-sabbia pt-6">
                      <p className="text-[0.95rem] text-legno">
                        <span className="text-[0.66rem] font-semibold tracking-[0.2em] uppercase">
                          {t.price}
                        </span>
                        <span className="ml-3 font-serif text-[1.2rem] text-inchiostro">{t.priceTbc}</span>
                      </p>
                      <ButtonLink href={`${href("book", lang)}?camera=${room.slug}`}>
                        {common.requestRoom}
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </section>
        );
      })}

      {/* Dotazioni verificate (scheda Booking.com del 15/11/2026) */}
      <section aria-labelledby="dotazioni" className="relative mt-6 bg-carta">
        <Scallop color="var(--color-crema)" />
        <div className="contenitore sezione grid gap-x-16 gap-y-12 md:grid-cols-2">
          <Reveal>
            <Label>{t.amenitiesTitle}</Label>
            <h2 id="dotazioni" className="sr-only">
              {t.amenitiesTitle}
            </h2>
            <ul className="mt-6 border-t border-sabbia">
              {roomAmenities[lang].map((item) => (
                <li key={item} className="border-b border-sabbia py-3.5 font-serif text-[1.25rem]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <Label>{t.bathTitle}</Label>
            <ul className="mt-6 border-t border-sabbia">
              {bathAmenities[lang].map((item) => (
                <li key={item} className="border-b border-sabbia py-3.5 font-serif text-[1.25rem]">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.98rem] text-legno">
              {dict.house.stairs}
            </p>
            <p className="mt-4 text-[0.95rem]">
              <Tbc label={dict.house.tbcItems.join(", ")} tbc={common.tbc} />
            </p>
            <ButtonLink href={href("book", lang)} className="mt-8">
              {common.checkAvailability}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
