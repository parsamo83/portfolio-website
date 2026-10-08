import type { Lang } from "@/i18n";
import Image from "next/image";

/*
  Two screenshots of the Habits app, stacked like windows: the empty first-run
  screen in the dark theme behind, today's plan in the light theme in front.
  Both are positioned from the top and sized by the card's width.
*/

const STRINGS = {
  en: {
    empty: "Habits in the dark theme on first run: no tasks yet, with buttons to add one or start from an example set",
    today: "Habits in the light theme: today's plan with one task, a progress bar and the tabs for week, month and year",
  },
  de: {
    empty: "Habits im dunklen Design beim ersten Start: noch keine Aufgaben, mit Schaltflächen zum Anlegen oder für ein Beispielset",
    today: "Habits im hellen Design: der Plan für heute mit einer Aufgabe, einem Fortschrittsbalken und den Reitern für Woche, Monat und Jahr",
  },
} satisfies Record<Lang, Record<"empty" | "today", string>>;

const WINDOW = "absolute h-auto rounded-lg border border-line shadow-floating";

export default function HabitsScreens({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];

  return (
    <>
      <Image
        src="/projects/habits/empty.webp"
        alt={t.empty}
        width={1248}
        height={694}
        sizes="(min-width: 640px) 360px, 80vw"
        className={`${WINDOW} top-[10%] left-[5%] w-[68%]`}
      />
      <Image
        src="/projects/habits/today.webp"
        alt={t.today}
        width={1248}
        height={694}
        sizes="(min-width: 640px) 360px, 80vw"
        className={`${WINDOW} top-[34%] left-[27%] w-[68%]`}
      />
    </>
  );
}
