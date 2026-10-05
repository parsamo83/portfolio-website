"use client";

import { LANG_COOKIE, LANG_NAMES, LANGS, type Lang } from "@/i18n";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

/** Saves the choice for a year, so the proxy opens `/` in this language next time. */
function rememberLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** The same page in another language: /en/legal becomes /de/legal. */
function inLang(pathname: string, target: Lang) {
  return pathname.replace(/^\/(en|de)(?=\/|$)/, `/${target}`);
}

/**
 * EN / DE segmented switch. Each side is a real link to that language's page,
 * so it works without JavaScript and can be opened in a new tab. On a plain
 * click the thumb springs across first, then the page changes, keeping the
 * scroll position and the section in the address bar.
 */
export default function LanguageSwitch({ lang, label }: { lang: Lang; label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [shown, setShown] = useState<Lang>(lang);

  const choose = (event: React.MouseEvent<HTMLAnchorElement>, target: Lang) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (target === lang) return;

    rememberLang(target);
    setShown(target);
    const href = `${inLang(pathname, target)}${window.location.hash}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Long enough for the spring to cover most of its travel before the page swaps.
    window.setTimeout(() => router.push(href, { scroll: false }), reduced ? 0 : 160);
  };

  return (
    <nav aria-label={label} className="flex items-center gap-2">
      <Languages className="size-4 text-fg-muted" strokeWidth={1.8} aria-hidden="true" />
      <div
        className="relative grid grid-cols-2 rounded-[11px] bg-muted p-[3px] shadow-sunken"
        style={{ "--seg": LANGS.indexOf(shown) } as React.CSSProperties}
      >
        <span aria-hidden="true" className="seg-thumb" />
        {LANGS.map((code) => (
          <Link
            key={code}
            href={inLang(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-label={LANG_NAMES[code]}
            aria-current={code === lang ? "true" : undefined}
            data-active={code === shown ? "" : undefined}
            onClick={(event) => choose(event, code)}
            className="relative z-[1] grid min-h-[38px] min-w-[52px] place-items-center rounded-lg text-[0.8125rem] font-semibold tracking-[0.04em] text-fg-muted transition-colors duration-[var(--dur-fast)] hover:text-fg data-[active]:text-fg"
          >
            {code.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
