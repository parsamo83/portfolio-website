import type { Lang } from "@/i18n";

/*
  A handwritten 7 (with the crossbar it gets in Germany) on MNIST's 28 x 28 grid,
  feeding a three-layer network: 784 inputs, a hidden layer and 10 outputs.
  The pixels were rasterized once with soft edges, like an MNIST sample, and are
  stored as flat [x, y, intensity] triples.
*/
// prettier-ignore
const PIXELS = [8,5,0.07,9,5,0.23,10,5,0.37,11,5,0.48,12,5,0.58,13,5,0.65,14,5,0.7,15,5,0.72,16,5,0.73,17,5,0.71,18,5,0.67,19,5,0.61,20,5,0.53,21,5,0.42,6,6,0.64,7,6,0.87,8,6,1,9,6,1,10,6,1,11,6,1,12,6,1,13,6,1,14,6,1,15,6,1,16,6,1,17,6,1,18,6,1,19,6,1,20,6,1,21,6,1,22,6,0.49,5,7,0.35,6,7,1,7,7,1,8,7,1,9,7,1,10,7,1,11,7,1,12,7,1,13,7,1,14,7,1,15,7,0.98,16,7,0.97,17,7,0.99,18,7,1,19,7,1,20,7,1,21,7,1,22,7,0.42,5,8,0.1,6,8,0.82,7,8,0.87,8,8,0.67,9,8,0.51,10,8,0.36,11,8,0.24,12,8,0.14,13,8,0.06,18,8,0.62,19,8,1,20,8,1,21,8,0.65,17,9,0.36,18,9,1,19,9,1,20,9,0.87,21,9,0.06,16,10,0.07,17,10,0.91,18,10,1,19,10,1,20,10,0.3,16,11,0.6,17,11,1,18,11,1,19,11,0.57,15,12,0.26,16,12,1,17,12,1,18,12,0.88,10,13,0.3,11,13,0.52,12,13,0.59,13,13,0.66,14,13,0.72,15,13,0.79,16,13,1,17,13,1,18,13,0.99,19,13,0.52,10,14,0.89,11,14,1,12,14,1,13,14,1,14,14,1,15,14,1,16,14,1,17,14,1,18,14,1,19,14,0.62,10,15,0.46,11,15,0.68,12,15,0.61,13,15,0.55,14,15,0.84,15,15,1,16,15,1,17,15,0.28,18,15,0.21,13,16,0.41,14,16,1,15,16,1,16,16,0.62,13,17,0.85,14,17,1,15,17,1,16,17,0.16,12,18,0.36,13,18,1,14,18,1,15,18,0.62,12,19,0.77,13,19,1,14,19,1,15,19,0.19,11,20,0.24,12,20,1,13,20,1,14,20,0.7,11,21,0.61,12,21,1,13,21,1,14,21,0.31,11,22,0.94,12,22,1,13,22,0.86,11,23,0.58,12,23,0.94,13,23,0.43];

const PREDICTED = 7;

const STRINGS = {
  en: {
    label:
      "A handwritten 7 on a 28 by 28 pixel grid feeding a network of 784 inputs, a hidden layer and 10 outputs, where output 7 is lit",
    hidden: "hidden",
  },
  de: {
    label:
      "Eine handgeschriebene 7 auf einem Raster von 28 mal 28 Pixeln, die in ein Netz mit 784 Eingängen, einer verborgenen Schicht und 10 Ausgängen fließt. Ausgang 7 leuchtet.",
    hidden: "verborgen",
  },
} satisfies Record<Lang, unknown>;

function column(n: number, x: number, top: number, bottom: number) {
  return Array.from({ length: n }, (_, i) => [x, top + ((bottom - top) * i) / (n - 1)] as const);
}

const INPUTS = column(6, 10, 22, 118);
const HIDDEN = column(5, 68, 34, 106);
const OUTPUTS = column(10, 126, 8, 132);

export default function DigitNetwork({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];
  const cells = [];
  for (let i = 0; i < PIXELS.length; i += 3) {
    cells.push(<rect key={i} className="fill-fg" x={PIXELS[i]} y={PIXELS[i + 1]} width={1} height={1} opacity={PIXELS[i + 2]} />);
  }

  return (
    <div
      role="img"
      aria-label={t.label}
      className="flex h-full items-center justify-center gap-[18px] p-5"
    >
      <svg viewBox="0 0 28 28" aria-hidden="true" className="size-[132px] flex-none rounded-lg border border-line bg-surface">
        <g className="stroke-line" strokeWidth={0.06}>
          {Array.from({ length: 27 }, (_, i) => (
            <g key={i}>
              <line x1={i + 1} y1={0} x2={i + 1} y2={28} />
              <line x1={0} y1={i + 1} x2={28} y2={i + 1} />
            </g>
          ))}
        </g>
        {cells}
      </svg>

      <svg viewBox="0 0 150 150" aria-hidden="true" className="size-[150px] flex-none overflow-visible font-sans">
        <g className="stroke-line" strokeWidth={0.6}>
          {INPUTS.flatMap(([x1, y1], i) => HIDDEN.map(([x2, y2], j) => <line key={`a${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} />))}
          {HIDDEN.flatMap(([x1, y1], i) => OUTPUTS.map(([x2, y2], j) => <line key={`b${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} />))}
        </g>
        {INPUTS.map(([cx, cy]) => (
          <circle key={`i${cy}`} className="fill-surface stroke-line-strong" cx={cx} cy={cy} r={4} />
        ))}
        {HIDDEN.map(([cx, cy]) => (
          <circle key={`h${cy}`} className="fill-surface stroke-line-strong" cx={cx} cy={cy} r={4.5} />
        ))}
        {OUTPUTS.map(([cx, cy], digit) => {
          const lit = digit === PREDICTED;
          return (
            <g key={`o${digit}`}>
              <circle
                className={lit ? "fill-signal stroke-ink" : "fill-surface stroke-line-strong"}
                strokeWidth={lit ? 1.2 : 1}
                cx={cx}
                cy={cy}
                r={lit ? 5 : 3.6}
              />
              <text
                x={cx + 9}
                y={cy + 2.4}
                fontSize={7}
                className={lit ? "fill-fg font-bold tabular-nums" : "fill-fg-muted tabular-nums"}
              >
                {digit}
              </text>
            </g>
          );
        })}
        <text className="fill-fg-muted" x={10} y={142} fontSize={7.5} textAnchor="middle">
          784
        </text>
        <text className="fill-fg-muted" x={68} y={142} fontSize={7.5} textAnchor="middle">
          {t.hidden}
        </text>
      </svg>
    </div>
  );
}
