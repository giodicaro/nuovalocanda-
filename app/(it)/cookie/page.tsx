import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("cookies", "it");

export default function Page() {
  return <LegalPage lang="it" kind="cookies" />;
}
