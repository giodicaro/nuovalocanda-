import { getDictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import {
  BookSection,
  DirectSection,
  HouseSection,
  Manifesto,
  ReviewsSection,
  RoomsSection,
  VeniceSection,
} from "@/components/home/sections";
import { jsonLdString, lodgingJsonLd } from "@/lib/jsonld";

export function HomePage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(lodgingJsonLd(lang)) }}
      />
      <Hero lang={lang} dict={dict} />
        <Manifesto lang={lang} dict={dict} />
        <RoomsSection lang={lang} dict={dict} />
        <VeniceSection lang={lang} dict={dict} />
        <DirectSection lang={lang} dict={dict} />
        <HouseSection lang={lang} dict={dict} />
        <ReviewsSection lang={lang} dict={dict} />
        <BookSection lang={lang} dict={dict} />
    </>
  );
}
