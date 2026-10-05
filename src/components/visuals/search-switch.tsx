"use client";

import type { Lang } from "@/i18n";
import { Search } from "lucide-react";
import { useId, useRef, useState } from "react";

const STRINGS = {
  en: {
    query: "ray tracing",
    tablist: "Search view",
    views: ["Results", "Images"],
    results: [
      { site: "en.wikipedia.org", title: "Ray tracing (graphics)" },
      { site: "raytracing.github.io", title: "Ray Tracing in One Weekend" },
    ],
  },
  de: {
    query: "raytracing",
    tablist: "Suchansicht",
    views: ["Ergebnisse", "Bilder"],
    results: [
      { site: "de.wikipedia.org", title: "Raytracing" },
      { site: "raytracing.github.io", title: "Ray Tracing in One Weekend" },
    ],
  },
} satisfies Record<Lang, unknown>;

/** A working miniature of the project's results / images switch. */
export default function SearchSwitch({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];
  const [view, setView] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const select = (i: number, focus = false) => {
    setView(i);
    if (focus) tabs.current[i]?.focus();
  };

  return (
    <div className="absolute inset-[18px] flex flex-col gap-2.5">
      <div
        aria-hidden="true"
        className="flex h-[34px] items-center gap-2 rounded-[10px] border border-line-strong bg-surface px-3 text-[0.8125rem]"
      >
        <Search className="size-3.5 text-fg-muted" strokeWidth={2.4} />
        {t.query}
      </div>

      <div
        role="tablist"
        aria-label={t.tablist}
        className="relative grid w-[196px] grid-cols-2 self-start rounded-[11px] bg-muted p-[3px] shadow-sunken"
        style={{ "--seg": view } as React.CSSProperties}
      >
        <span aria-hidden="true" className="seg-thumb" />
        {t.views.map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={view === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={view === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                select(i === 0 ? 1 : 0, true);
              }
            }}
            className="relative z-[1] min-h-8 cursor-pointer rounded-lg text-[0.8125rem] font-semibold text-fg-muted transition-colors duration-[var(--dur-fast)] aria-selected:text-fg active:scale-[0.97] motion-reduce:active:scale-100"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          role="tabpanel"
          id={`${id}-panel-0`}
          aria-labelledby={`${id}-tab-0`}
          data-off={view === 0 ? undefined : ""}
          inert={view !== 0}
          className="panel"
        >
          {t.results.map((r, i) => (
            <div key={r.site} className={i > 0 ? "flex flex-col gap-[3px] border-t border-line px-0.5 py-1.5" : "flex flex-col gap-[3px] px-0.5 py-1.5"}>
              <small className="text-[0.68rem] text-fg-muted">{r.site}</small>
              <b className="text-[0.8rem] font-semibold underline decoration-signal underline-offset-2">{r.title}</b>
            </div>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${id}-panel-1`}
          aria-labelledby={`${id}-tab-1`}
          data-off={view === 1 ? undefined : ""}
          inert={view !== 1}
          className="panel"
        >
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="grid place-items-center rounded-lg border border-line bg-surface">
                <i
                  className="block aspect-square w-[38%] rounded-full"
                  style={{
                    background:
                      i === 1 || i === 5
                        ? "radial-gradient(circle at 35% 30%, #fff6cf 0 8%, var(--signal) 55%, #9a7400 100%)"
                        : "radial-gradient(circle at 35% 30%, var(--surface) 0 8%, var(--line-strong) 60%, var(--fg) 100%)",
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
