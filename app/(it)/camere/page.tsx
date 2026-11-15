import type { Metadata } from "next";
import { RoomsPage } from "@/components/pages/RoomsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("rooms", "it");

export default function Page() {
  return <RoomsPage lang="it" />;
}
