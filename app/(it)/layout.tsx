import type { Metadata } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { layoutMetadata } from "@/lib/seo";

export { viewport } from "@/lib/seo";
export const metadata: Metadata = layoutMetadata("it");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="it">{children}</RootShell>;
}
