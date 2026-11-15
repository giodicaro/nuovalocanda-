import type { Metadata } from "next";
import { VenicePage } from "@/components/pages/VenicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("venice", "en");

export default function Page() {
  return <VenicePage lang="en" />;
}
