import { Monogram } from "@/components/section/work-section";
import { getResume } from "@/data/resume";
import type { Lang } from "@/i18n";

export default function EducationSection({ lang }: { lang: Lang }) {
  const { education, ui } = getResume(lang);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="heading">{ui.headings.education}</h2>
      <ol className="flex flex-col gap-8">
        {education.map((item) => (
          <li key={item.school + item.degree} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
            <Monogram initials={item.initials} />
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-[1.0625rem] leading-snug font-[650]">{item.school}</h3>
                {item.note && (
                  <span className="ml-auto text-sm whitespace-nowrap text-fg-muted tabular-nums">{item.note}</span>
                )}
              </div>
              <p className="text-[0.9375rem] text-fg-muted">{item.degree}</p>
              {item.coursework && (
                <p className="max-w-[72ch] text-[0.8125rem] leading-normal text-fg-muted">
                  {ui.coursework}: {item.coursework}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
