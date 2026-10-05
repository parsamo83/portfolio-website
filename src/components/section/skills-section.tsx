import { getResume } from "@/data/resume";
import type { Lang } from "@/i18n";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function SkillsSection({ lang }: { lang: Lang }) {
  const { skills, ui } = getResume(lang);
  const { used, courses, certificates, languages } = skills;

  return (
    <section id="skills" aria-labelledby="skills-h" className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 id="skills-h" className="heading">
          {ui.headings.skills}
        </h2>
        <p className="max-w-[72ch] text-fg-muted">{ui.skillsIntro}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[1.0625rem] font-[650]">{ui.skillsUsed}</h3>
        <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-8">
          {used.map((skill) => (
            <li key={skill.name} className="flex flex-col gap-0.5 border-b border-line py-3">
              <span className="font-[650]">{skill.name}</span>
              <span className="text-sm text-fg-muted">
                {skill.usedIn.map((place, i) => (
                  <span key={place.label}>
                    {i > 0 && ", "}
                    {place.href ? (
                      <a
                        href={place.href}
                        className="underline decoration-line-strong underline-offset-[3px] hover:text-fg hover:decoration-signal"
                      >
                        {place.label}
                      </a>
                    ) : (
                      place.label
                    )}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[1.0625rem] font-[650]">{ui.skillsCourses}</h3>
        <ul className="flex flex-wrap gap-1.5">
          {courses.map((name) => (
            <li key={name} className="badge">
              {name}
            </li>
          ))}
        </ul>
        <p className="max-w-[72ch] text-[0.8125rem] leading-normal text-fg-muted">
          {ui.certificates}: {certificates}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[1.0625rem] font-[650]">{ui.languages}</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {languages.map((language) => {
            const reached = CEFR.indexOf(language.level as (typeof CEFR)[number]);
            return (
              <div key={language.name}>
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <b className="font-[650]">{language.name}</b>
                  <span className="text-sm text-fg-muted">
                    {language.level}, {language.label}
                  </span>
                </div>
                <div
                  className="cefr grid grid-cols-6 gap-1"
                  role="img"
                  aria-label={ui.cefrLabel.replace("{language}", language.name).replace("{level}", language.level)}
                >
                  {CEFR.map((level, i) => (
                    <span key={level} data-on={i <= reached ? "" : undefined}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
