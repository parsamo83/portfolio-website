"use client";

import { getResume } from "@/data/resume";
import { DEFAULT_LANG, isLang } from "@/i18n";
import Link from "next/link";
import { useParams } from "next/navigation";

// A client component because not-found pages don't receive route params.
export default function NotFound() {
  const params = useParams<{ lang: string }>();
  const lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const { notFound } = getResume(lang).ui;

  return (
    <main id="main" className="flex min-h-[60dvh] flex-col justify-center gap-4">
      <p className="display text-[clamp(4rem,18vw,8rem)] text-line-strong">404</p>
      <h1 className="heading">{notFound.title}</h1>
      <p className="max-w-[48ch] text-fg-muted">{notFound.body}</p>
      <Link href={`/${lang}`} className="btn btn-primary self-start">
        {notFound.home}
      </Link>
    </main>
  );
}
