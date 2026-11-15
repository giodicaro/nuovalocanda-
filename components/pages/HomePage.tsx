import { Suspense } from "react";
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
  // I confini Suspense spezzano l'attivazione di React in attività brevi.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(lodgingJsonLd(lang)) }}
      />
      <Hero lang={lang} dict={dict} />
      <Suspense>
        <Manifesto lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <RoomsSection lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <VeniceSection lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <DirectSection lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <HouseSection lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <ReviewsSection lang={lang} dict={dict} />
      </Suspense>
      <Suspense>
        <BookSection lang={lang} dict={dict} />
      </Suspense>
    </>
  );
}
