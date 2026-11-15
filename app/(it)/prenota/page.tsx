import type { Metadata } from "next";
import { BookPage } from "@/components/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("book", "it");

export default function Page() {
  return <BookPage lang="it" />;
}
