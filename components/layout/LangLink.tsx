"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { href, routeKeyFromPath } from "@/content/routes";
import type { Locale } from "@/content/site";

/** Collegamento alla stessa pagina nell'altra lingua. */
export function LangLink({
  to,
  className,
  children,
}: {
  to: Locale;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <a href={href(routeKeyFromPath(pathname) ?? "home", to)} hrefLang={to} lang={to} className={className}>
      {children}
    </a>
  );
}
