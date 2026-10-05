import CopyEmail from "@/components/copy-email";
import { Icons } from "@/components/icons";
import { getResume, PROFILE } from "@/data/resume";
import type { Lang } from "@/i18n";
import { Globe, MapPin } from "lucide-react";

export default function ContactSection({ lang }: { lang: Lang }) {
  const { contact, location, ui } = getResume(lang);

  return (
    <section id="contact" aria-labelledby="contact-h" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="contact-h" className="heading">
          {ui.headings.contact}
        </h2>
        <p className="max-w-[72ch] text-fg-muted">{contact.pitch}</p>
      </div>

      <div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-raised sm:p-8">
        <CopyEmail email={PROFILE.email} labels={ui.copy} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-[0.9375rem] text-fg-muted">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-fg underline decoration-signal decoration-2 underline-offset-4"
          >
            <Icons.linkedin className="size-4" />
            {ui.messageOnLinkedIn}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {contact.languages}
          </span>
        </div>
      </div>
    </section>
  );
}
