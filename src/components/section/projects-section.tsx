import { ProjectCard } from "@/components/project-card";
import { getResume } from "@/data/resume";
import type { Lang } from "@/i18n";

export default function ProjectsSection({ lang }: { lang: Lang }) {
  const { projects, ui } = getResume(lang);

  return (
    <section id="projects" aria-labelledby="projects-h" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="projects-h" className="heading">
          {ui.headings.projects}
        </h2>
        <p className="max-w-[72ch] text-fg-muted">{ui.projectsIntro}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} labels={{ myPart: ui.myPart, builtWith: ui.builtWith }} />
        ))}
      </div>
    </section>
  );
}
