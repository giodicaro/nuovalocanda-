"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, routeKeyFromPath, type RouteKey } from "@/content/routes";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { buttonStyles } from "@/components/ui/primitives";

type NavKey = Extract<RouteKey, "home" | "rooms" | "venice" | "book">;
const links: NavKey[] = ["rooms", "venice"];

export function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const current = routeKeyFromPath(pathname);
  const other: Locale = lang === "it" ? "en" : "it";
  const otherHref = href(current ?? "home", other);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile: blocca lo scroll, chiude con Esc, tiene il focus dentro.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const items = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-calmo",
        solid && !open
          ? "border-b border-sabbia bg-crema/95 shadow-[0_10px_30px_-24px_rgba(34,30,26,0.5)] backdrop-blur-sm"
          : "border-b border-transparent",
        open && "su-scuro",
      )}
    >
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-inchiostro focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-carta"
      >
        {nav.skip}
      </a>

      <div className="contenitore flex h-(--header-altezza) items-center justify-between gap-6">
        <Link prefetch={false}
          href={href("home", lang)}
          onClick={() => setOpen(false)}
          className={cn(
            "relative z-[55] flex items-baseline gap-2.5 font-serif leading-none transition-colors duration-300",
            open ? "text-crema" : "text-inchiostro",
          )}
        >
          <span
            className={cn(
              "text-[1.6rem] tracking-[0.04em]",
              open ? "text-ocra" : "text-terracotta",
            )}
          >
            NLB
          </span>
          <span className="text-[0.95rem] tracking-[0.01em] max-xs:sr-only">
            Nuova Locanda Belvedere
          </span>
        </Link>

        <nav aria-label={nav.main} className="hidden items-center gap-9 md:flex">
          {links.map((key) => (
            <Link prefetch={false}
              key={key}
              href={href(key, lang)}
              aria-current={current === key ? "page" : undefined}
              className={cn(
                "group relative py-2 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300",
                current === key ? "text-verde" : "text-inchiostro hover:text-mattone",
              )}
            >
              {nav[key]}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-calmo",
                  current === key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
          <a
            href={otherHref}
            hrefLang={other}
            lang={other}
            className="py-2 text-[0.78rem] font-semibold tracking-[0.16em] text-legno uppercase transition-colors duration-300 hover:text-mattone"
          >
            <span className="sr-only">{nav.language}: </span>
            {nav.switchTo}
          </a>
          <Link prefetch={false} href={href("book", lang)} className={cn(buttonStyles.solid, "min-h-11 px-6")}>
            {nav.book}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative z-[55] -mr-2 flex min-h-12 items-center gap-3 px-2 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 md:hidden",
            open ? "text-crema" : "text-inchiostro",
          )}
        >
          {open ? nav.close : nav.menu}
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-500 ease-calmo",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-500 ease-calmo",
                open && "-translate-y-[5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile a tutto schermo */}
      <div
        id="menu-mobile"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menu}
        hidden={!open}
        className="su-scuro fixed inset-0 z-50 flex h-[100svh] flex-col justify-between overflow-y-auto bg-verde px-[clamp(1.25rem,4vw,3.5rem)] pt-28 pb-10 text-crema md:hidden"
      >
        <nav aria-label={nav.main} className="flex flex-col">
          {(["home", ...links, "book"] as NavKey[]).map((key, i) => (
            <Link prefetch={false}
              key={key}
              href={href(key, lang)}
              onClick={() => setOpen(false)}
              aria-current={current === key ? "page" : undefined}
              className="entra flex items-baseline justify-between border-b border-crema/20 py-4 font-serif text-[2.6rem] leading-none"
              style={{ ["--ritardo" as string]: `${80 + i * 70}ms` }}
            >
              <span className={current === key ? "text-ocra italic" : undefined}>
                {nav[key]}
              </span>
              <span aria-hidden="true" className="font-sans text-xs tracking-[0.2em] text-sabbia">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>
        <a
          href={otherHref}
          hrefLang={other}
          lang={other}
          className="entra mt-10 inline-flex min-h-12 items-center self-start text-[0.8rem] font-semibold tracking-[0.18em] text-ocra-chiara uppercase"
          style={{ ["--ritardo" as string]: "420ms" }}
        >
          <span className="sr-only">{nav.language}: </span>
          {nav.switchTo} →
        </a>
      </div>
    </header>
  );
}
