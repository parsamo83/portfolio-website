import { Icons } from "@/components/icons";
import { RichText } from "@/components/rich-text";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import { getResume, PROFILE } from "@/data/resume";
import { isLang } from "@/i18n";
import { Mail } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const resume = getResume(lang);
  const { ui } = resume;
  const [first, ...rest] = PROFILE.name.split(" ");

  return (
    <main id="main" className="flex flex-col gap-16 sm:gap-20">
      <section id="about" aria-labelledby="name" className="flex flex-col gap-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-6">
          <div className="flex min-w-0 flex-col gap-4">
            <h1 id="name" className="display text-[clamp(2.5rem,8.4vw,3.85rem)]">
              {first}
              <br />
              {rest.join(" ")}
            </h1>
            <p className="max-w-[42em] text-lg leading-relaxed text-fg-muted">{resume.intro}</p>
          </div>
          <Image
            src={PROFILE.avatarUrl}
            alt={ui.portraitAlt}
            width={256}
            height={256}
            priority
            className="size-[92px] rounded-full border border-line bg-sunken object-cover object-[50%_22%] shadow-raised sm:size-32"
          />
          <div className="col-span-2 flex flex-col gap-4">
            <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface py-[7px] pr-3.5 pl-3 text-sm leading-snug font-[550]">
              <span
                aria-hidden="true"
                className="size-[7px] flex-none rounded-full bg-success shadow-[0_0_0_3px_color-mix(in_srgb,var(--success)_22%,transparent)]"
              />
              {resume.availability}
            </span>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#contact">
                <Mail strokeWidth={1.8} aria-hidden="true" />
                {ui.getInTouch}
              </a>
              <a className="btn btn-secondary" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                <Icons.linkedin />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="heading">{ui.headings.about}</h2>
          <p className="max-w-[72ch] text-fg-muted">
            <RichText text={resume.summary} />
          </p>
        </div>
      </section>

      <section id="work" aria-labelledby="work-h" className="flex flex-col gap-12">
        <WorkSection lang={lang} />
        <EducationSection lang={lang} />
      </section>

      <SkillsSection lang={lang} />
      <ProjectsSection lang={lang} />
      <ContactSection lang={lang} />

    </main>
  );
}
