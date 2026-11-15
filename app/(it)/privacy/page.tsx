import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy", "it");

export default function Page() {
  return <LegalPage lang="it" kind="privacy" />;
}
