import { getResume, PROFILE } from "@/data/resume";
import type { Lang } from "@/i18n";
import Link from "next/link";

/** On every page, so the legal notice is always one click away. */
export default function SiteFooter({ lang }: { lang: Lang }) {
  const { footer } = getResume(lang).ui;

  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line pt-4 text-[0.8125rem] text-fg-muted sm:mt-20">
      <span>
        © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <Link
        href={`/${lang}/legal`}
        className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-fg"
      >
        {footer.legal}
      </Link>
      <span>
        {footer.before}{" "}
        <a
          className="underline underline-offset-2 hover:text-fg"
          href="https://github.com/dillionverma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          {footer.link}
        </a>
        {footer.after && ` ${footer.after}`}
      </span>
    </footer>
  );
}
