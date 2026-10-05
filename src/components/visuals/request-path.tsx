import type { Lang } from "@/i18n";
import { Lock } from "lucide-react";

// The order is the order a request travels in, which is why this is a numbered list.
const HOPS = ["Cloudflare", "Apache", "Laravel", "MySQL"];

const STRINGS = {
  en: {
    label: "turbinetech.de request path: Cloudflare, then Apache, then Laravel, then MySQL",
    roles: ["DNS, Turnstile", "Web server", "Pages, cache, admin", "Content"],
  },
  de: {
    label: "Weg einer Anfrage an turbinetech.de: Cloudflare, dann Apache, dann Laravel, dann MySQL",
    roles: ["DNS, Turnstile", "Webserver", "Seiten, Cache, Admin", "Inhalte"],
  },
} satisfies Record<Lang, unknown>;

export default function RequestPath({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];

  return (
    <div
      role="img"
      aria-label={t.label}
      className="absolute inset-x-[18px] top-[18px] -bottom-px flex flex-col rounded-t-xl border border-b-0 border-line bg-surface shadow-floating"
    >
      <div className="mx-2.5 mt-2.5 flex h-[30px] items-center gap-2 rounded-lg bg-sunken px-2.5 text-[0.8125rem] font-[550] shadow-sunken">
        <Lock className="size-[13px] text-success" strokeWidth={2.4} aria-hidden="true" />
        turbinetech.de
      </div>
      <ol className="flex flex-col gap-2.5 px-4 py-3.5">
        {HOPS.map((hop, i) => (
          <li
            key={hop}
            className="relative flex h-7 items-center justify-between gap-2 rounded-lg border border-line bg-surface px-2.5 text-[0.8rem]"
          >
            {i > 0 && <span aria-hidden="true" className="absolute -top-[11px] left-[22px] h-2.5 w-[1.5px] bg-line-strong" />}
            <b className="font-[650]">{hop}</b>
            <span className="truncate text-fg-muted">{t.roles[i]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
