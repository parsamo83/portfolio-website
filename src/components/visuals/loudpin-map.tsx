import { Icons } from "@/components/icons";
import type { Lang } from "@/i18n";

/*
  An illustration of LoudPin's map tab, drawn in the portfolio's own tokens.
  The acts are made up; the behaviour is real: pins carry the artist and date,
  the selected pin takes the accent, and shows at one venue merge into one pin
  with a count badge.
*/

type Pin = { x: number; y: number; name: string; date?: string; selected?: boolean; count?: number };

const STRINGS = {
  en: {
    label:
      "Illustration of LoudPin's map: show pins with artist names and dates, one selected pin, and one venue pin grouping three shows",
    dates: ["14 Nov", "21 Nov", "6 Dec"],
    sheet: "3 shows at Zakk",
    months: ["Nov", "Nov", "Dec"],
    times: ["Tue, 20:00", "Sat, 19:30", "Thu, 20:00"],
  },
  de: {
    label:
      "Illustration der LoudPin-Karte: Pins mit Act und Datum, ein ausgewählter Pin und ein Pin für einen Ort mit drei Shows",
    dates: ["14. Nov.", "21. Nov.", "6. Dez."],
    sheet: "3 Shows im Zakk",
    months: ["Nov", "Nov", "Dez"],
    times: ["Di., 20:00", "Sa., 19:30", "Do., 20:00"],
  },
} satisfies Record<Lang, unknown>;

const ACTS = ["Glass Harbour", "The Quiet Engines", "Mira Lund"];
const DAYS = ["18", "29", "04"];

/** Pill width from the label lengths, so longer German dates still fit. */
function pinWidth(pin: Pin) {
  const name = pin.name.length * (pin.selected ? 7.3 : 6.9);
  const date = pin.date ? 10 + pin.date.length * 6.3 : 0;
  return Math.max(64, Math.ceil(28 + name + date));
}

function MapPin({ pin }: { pin: Pin }) {
  const fill = pin.selected ? "fill-signal" : "fill-ink";
  const text = pin.selected ? "fill-on-signal" : "fill-on-ink";
  const width = pinWidth(pin);
  const left = -width / 2;

  return (
    <g transform={`translate(${pin.x} ${pin.y})`}>
      <rect className={fill} x={left} y={-40} width={width} height={28} rx={14} />
      <path className={fill} d="M-6 -13h12l-6 8z" />
      <circle className="fill-ink stroke-surface" strokeWidth={2} r={4} />
      {pin.date ? (
        <>
          <text className={text} x={left + 12} y={-21.5} fontSize={12} fontWeight={pin.selected ? 700 : 650}>
            {pin.name}
          </text>
          <text className={text} x={-left - 12} y={-21.5} fontSize={12} textAnchor="end" opacity={0.78}>
            {pin.date}
          </text>
        </>
      ) : (
        <text className={text} y={-21.5} fontSize={12} fontWeight={650} textAnchor="middle">
          {pin.name}
        </text>
      )}
      {pin.count && (
        <>
          <circle className="fill-signal stroke-surface" strokeWidth={2.5} cx={-left - 2} cy={-40} r={10} />
          <text className="fill-on-signal" x={-left - 2} y={-36} fontSize={11} fontWeight={800} textAnchor="middle">
            {pin.count}
          </text>
        </>
      )}
    </g>
  );
}

export default function LoudPinMap({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];
  const pins: Pin[] = [
    { x: 176, y: 96, name: "Kettle Moth", date: t.dates[0] },
    { x: 372, y: 152, name: "Ada Vale", date: t.dates[1], selected: true },
    { x: 444, y: 66, name: "Zakk", count: 3 },
    { x: 250, y: 236, name: "Northbound", date: t.dates[2] },
  ];

  return (
    <>
      <svg
        className="size-full font-sans"
        viewBox="0 0 720 272"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={t.label}
      >
        <rect className="fill-sunken" width="720" height="272" />
        <path className="fill-muted" d="M40 20h120l20 70-90 30-60-40z" />
        <path className="fill-muted" d="M430 200l90-20 40 60-30 40H420z" />
        <path className="fill-none stroke-water" strokeWidth={34} strokeLinecap="round" d="M-20 222C120 170 220 262 360 214S560 120 740 150" />
        <g className="fill-none stroke-surface" strokeLinecap="round">
          <path strokeWidth={10} d="M-10 120C160 110 300 150 470 110S640 60 730 70" />
          <path strokeWidth={10} d="M250 -10C260 80 230 170 270 290" />
          <path strokeWidth={8} d="M520 -10C500 90 540 170 600 290" />
          <path strokeWidth={4} opacity={0.75} d="M90 -10L130 290M370 -10L340 290M-10 60H720M180 180L470 160M640 0L700 290" />
        </g>
        {pins.map((pin) => (
          <MapPin key={pin.name} pin={pin} />
        ))}
      </svg>

      <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 rounded-control border border-line bg-surface py-1.5 pr-3 pl-1.5 text-sm font-bold shadow-floating">
        <Icons.loudpin className="size-[26px] rounded-[7px]" />
        LoudPin
      </span>

      <div
        aria-hidden="true"
        className="absolute inset-y-3.5 right-3.5 hidden w-[214px] flex-col gap-2.5 rounded-[14px] border border-line bg-surface p-3.5 shadow-floating sm:flex"
      >
        <p className="text-sm leading-snug font-bold">{t.sheet}</p>
        {ACTS.map((act, i) => (
          <div key={act} className="grid grid-cols-[38px_1fr] items-center gap-2.5">
            <div
              className={
                i === 0
                  ? "flex h-[38px] flex-col items-center justify-center rounded-[9px] bg-signal leading-none text-on-signal"
                  : "flex h-[38px] flex-col items-center justify-center rounded-[9px] bg-sunken leading-none shadow-sunken"
              }
            >
              <b className="text-[0.9rem] tabular-nums">{DAYS[i]}</b>
              <small className={i === 0 ? "text-[0.62rem] font-semibold" : "text-[0.62rem] font-semibold text-fg-muted"}>
                {t.months[i]}
              </small>
            </div>
            <div className="min-w-0 text-[0.8125rem] leading-tight">
              {act}
              <span className="block text-xs text-fg-muted">{t.times[i]}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
