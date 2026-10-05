"use client";

import type { Lang } from "@/i18n";
import { Briefcase, Layers, LayoutGrid, Mail, Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const SECTIONS = [
  { id: "about", Icon: UserRound },
  { id: "work", Icon: Briefcase },
  { id: "skills", Icon: Layers },
  { id: "projects", Icon: LayoutGrid },
  { id: "contact", Icon: Mail },
] as const;

type Labels = {
  nav: string;
  sections: Record<(typeof SECTIONS)[number]["id"], string>;
  darkTheme: string;
  lightTheme: string;
};

/**
 * The template's dock, rebuilt opaque. A pill springs to the section in view;
 * every item is a 44px target, and the theme switch sits after a divider.
 * On other pages (the legal notice, a 404) the items link back to the home
 * page's sections and none of them is marked as current.
 */
export default function Dock({ lang, labels }: { lang: Lang; labels: Labels }) {
  const onHome = usePathname() === `/${lang}`;
  const [active, setActive] = useState(0);
  const current = onHome ? active : -1;
  // False during server render and hydration, true after: the theme is only known in the browser.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  // While a dock click is scrolling the page, ignore the sections it passes.
  const lockUntil = useRef(0);

  useEffect(() => {
    if (!onHome) return;
    let ticking = false;

    const spy = () => {
      if (performance.now() < lockUntil.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = 0;
      if (atBottom) current = SECTIONS.length - 1;
      else
        SECTIONS.forEach(({ id }, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.38) current = i;
        });
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        spy();
      });
    };
    const onScrollEnd = () => {
      lockUntil.current = 0;
      spy();
    };

    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [onHome]);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <nav
      aria-label={labels.nav}
      className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-dock border border-line bg-surface p-1.5 shadow-overlay"
    >
      <div className="relative grid auto-cols-[44px] grid-flow-col gap-0.5" style={{ "--i": Math.max(current, 0) } as React.CSSProperties}>
        <span aria-hidden="true" className="dock-pill" data-hidden={current < 0 ? "" : undefined} />
        {SECTIONS.map(({ id, Icon }, i) => (
          <a
            key={id}
            href={onHome ? `#${id}` : `/${lang}#${id}`}
            aria-label={labels.sections[id]}
            data-tip={labels.sections[id]}
            aria-current={current === i ? "true" : "false"}
            onClick={() => {
              setActive(i);
              lockUntil.current = performance.now() + 900;
            }}
            className="dock-item"
          >
            <Icon strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
      </div>
      <span aria-hidden="true" className="h-6 w-px bg-line" />
      <button
        type="button"
        role="switch"
        className="dock-item theme-switch"
        aria-label={labels.darkTheme}
        aria-checked={mounted ? dark : undefined}
        data-tip={dark ? labels.lightTheme : labels.darkTheme}
        onClick={() => setTheme(dark ? "light" : "dark")}
      >
        {/* The knob's position comes from the .dark class, so it is right before hydration too. */}
        <span aria-hidden="true" className="theme-track">
          <Sun strokeWidth={2} className="theme-track-icon" />
          <Moon strokeWidth={2} className="theme-track-icon" />
          <span className="theme-knob">
            <Sun strokeWidth={2} className="dark:hidden" />
            <Moon strokeWidth={2} className="hidden dark:block" />
          </span>
        </span>
      </button>
    </nav>
  );
}
