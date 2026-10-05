import { RichText } from "@/components/rich-text";
import { getResume } from "@/data/resume";
import type { Lang } from "@/i18n";

export function Monogram({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden="true"
      className="grid size-11 place-items-center rounded-well border border-line bg-surface text-[0.78rem] font-extrabold tracking-[0.02em] shadow-raised [font-stretch:118%]"
    >
      {initials}
    </div>
  );
}

export default function WorkSection({ lang }: { lang: Lang }) {
  const { work, ui } = getResume(lang);

  return (
    <div className="flex flex-col gap-6">
      <h2 id="work-h" className="heading">
        {ui.headings.work}
      </h2>
      <ol className="flex flex-col gap-8">
        {work.map((job) => (
          <li key={job.company + job.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
            <Monogram initials={job.initials} />
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-[1.0625rem] leading-snug font-[650]">{job.company}</h3>
                <span className="badge">{job.kind}</span>
                {job.dates && (
                  <span className="ml-auto text-sm whitespace-nowrap text-fg-muted tabular-nums">{job.dates}</span>
                )}
              </div>
              <p className="text-[0.9375rem] text-fg-muted">{job.title}</p>
              {job.bullets && (
                <ul className="bullets mt-1">
                  {job.bullets.map((bullet, i) => (
                    <li key={i}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
