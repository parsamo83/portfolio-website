import { Icons } from "@/components/icons";
import type { Lang } from "@/i18n";
import Image from "next/image";

/*
  LoudPin's discover screen on the three layouts it ships with, from the real
  app. The devices rise from the bottom edge and are bottom-aligned, so their
  heights follow the card's height and nothing depends on its width. The web
  shot only shows from `sm` up; on a phone-sized card the tablet and phone fit.
*/

const STRINGS = {
  en: {
    desktop: "LoudPin on the web: genre and price filters beside a featured show and a list of upcoming concerts",
    tablet: "LoudPin on a tablet, with the navigation rail on the left and two columns of upcoming concerts",
    phone: "LoudPin on a phone: a featured concert card above the tab bar",
  },
  de: {
    desktop: "LoudPin im Web: Filter für Genre und Preis neben einer hervorgehobenen Show und einer Liste kommender Konzerte",
    tablet: "LoudPin auf dem Tablet, mit der Navigationsleiste links und zwei Spalten kommender Konzerte",
    phone: "LoudPin auf dem Handy: eine hervorgehobene Konzertkarte über der Tab-Leiste",
  },
} satisfies Record<Lang, Record<"desktop" | "tablet" | "phone", string>>;

export default function LoudPinScreens({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];

  return (
    <>
      <div className="absolute inset-0 flex items-end justify-center gap-3">
        <Image
          src="/projects/loudpin/desktop.webp"
          alt={t.desktop}
          width={2000}
          height={1046}
          sizes="450px"
          className="hidden h-[60%] w-auto translate-y-[8%] rounded-xl border border-line shadow-floating sm:block lg:h-[68%]"
        />
        <Image
          src="/projects/loudpin/tablet.webp"
          alt={t.tablet}
          width={1488}
          height={2000}
          sizes="250px"
          className="h-[78%] w-auto translate-y-[6%] sm:h-[88%] lg:h-[98%]"
        />
        <Image
          src="/projects/loudpin/phone.webp"
          alt={t.phone}
          width={947}
          height={2000}
          sizes="160px"
          className="h-[78%] w-auto translate-y-[6%] sm:h-[88%] lg:h-[98%]"
        />
      </div>

      <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 rounded-control border border-line bg-surface py-1.5 pr-3 pl-1.5 text-sm font-bold shadow-floating">
        <Icons.loudpin className="size-[26px] rounded-[7px]" />
        LoudPin
      </span>
    </>
  );
}
