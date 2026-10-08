import { RichText } from "@/components/rich-text";
import DigitNetwork from "@/components/visuals/digit-network";
import HabitsScreens from "@/components/visuals/habits-screens";
import LoudPinScreens from "@/components/visuals/loudpin-screens";
import RayTracer from "@/components/visuals/ray-tracer";
import RequestPath from "@/components/visuals/request-path";
import SearchSwitch from "@/components/visuals/search-switch";
import type { Project, ProjectVisual } from "@/data/resume";
import type { Lang } from "@/i18n";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const VISUALS: Record<ProjectVisual, (props: { lang: Lang }) => React.ReactNode> = {
  loudpin: LoudPinScreens,
  turbinetech: RequestPath,
  habits: HabitsScreens,
  raytracer: RayTracer,
  digits: DigitNetwork,
  search: SearchSwitch,
};

export function ProjectCard({
  project,
  lang,
  labels,
}: {
  project: Project;
  lang: Lang;
  labels: { myPart: string; builtWith: string };
}) {
  const Visual = VISUALS[project.visual];
  const headingId = `${project.id}-h`;

  return (
    <article
      id={`p-${project.id}`}
      aria-labelledby={headingId}
      className={cn(
        "flex min-w-0 scroll-mt-8 flex-col overflow-hidden rounded-card border border-line bg-surface shadow-raised",
        project.feature && "sm:col-span-2",
      )}
    >
      <div className={cn("relative overflow-hidden border-b border-line bg-sunken", project.feature ? "aspect-[720/272] max-h-[340px] min-h-[240px]" : "h-[232px]")}>
        <Visual lang={lang} />
      </div>

      <div className={cn("flex flex-1 flex-col p-6", project.feature ? "gap-4" : "gap-3")}>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 id={headingId} className={cn("leading-snug font-[650]", project.feature ? "text-xl" : "text-[1.0625rem]")}>
            {project.title}
          </h3>
          {project.status?.tone === "progress" && (
            <span className="badge">
              <span aria-hidden="true" className="size-[7px] rounded-full bg-signal-text" />
              {project.status.label}
            </span>
          )}
        </div>

        {project.highlights ? (
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
            <p className="text-[0.9375rem] text-fg-muted">
              <RichText text={project.description} />
            </p>
            <div>
              <p className="mb-1.5 text-[0.8125rem] font-[650]">{labels.myPart}</p>
              <ul className="bullets">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-[0.9375rem] text-fg-muted">
            <RichText text={project.description} />
          </p>
        )}

        <ul className="flex flex-wrap gap-1.5" aria-label={labels.builtWith}>
          {project.tags.map((tag) => (
            <li key={tag} className="badge">
              {tag}
            </li>
          ))}
        </ul>

        {(project.link || project.status?.tone === "live") && (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
            {project.status?.tone === "live" && (
              <span className="badge">
                <span aria-hidden="true" className="size-[7px] rounded-full bg-success" />
                {project.status.label}
              </span>
            )}
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold underline decoration-signal decoration-2 underline-offset-4"
              >
                {project.link.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
