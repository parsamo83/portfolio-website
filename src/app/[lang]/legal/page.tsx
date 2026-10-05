import { RichText } from "@/components/rich-text";
import { getLegal } from "@/data/legal";
import { PROFILE } from "@/data/resume";
import { isLang } from "@/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  return {
    title: getLegal(lang).title,
    alternates: {
      canonical: `/${lang}/legal`,
      languages: { en: "/en/legal", de: "/de/legal" },
    },
    // Keeps the postal address out of search results.
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { title, impressum, privacy } = getLegal(lang);

  // The Impressum needs a postal address. Locally the page shows a reminder;
  // on Vercel the build stops, so the site never goes live without it.
  if (PROFILE.address.length === 0 && process.env.VERCEL) {
    throw new Error("The Impressum has no postal address. Add it to PROFILE.address in src/data/resume.ts.");
  }

  return (
    <main id="main" className="flex max-w-[72ch] flex-col gap-12">
      <h1 className="display text-[clamp(2rem,6vw,2.75rem)]">{title}</h1>

      <section aria-labelledby="impressum-h" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="impressum-h" className="heading">
            {impressum.heading}
          </h2>
          <p className="text-sm text-fg-muted">{impressum.basis}</p>
        </div>
        <address className="not-italic leading-relaxed">
          {PROFILE.name}
          {PROFILE.address.length > 0 ? (
            PROFILE.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          ) : (
            <span className="mt-1 block rounded-lg bg-signal-soft px-3 py-2 text-sm">{impressum.addressMissing}</span>
          )}
        </address>
        <div>
          <h3 className="font-[650]">{impressum.contact}</h3>
          <p className="text-fg-muted">
            {impressum.email}:{" "}
            <a className="link" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="privacy-h" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 id="privacy-h" className="heading">
            {privacy.heading}
          </h2>
          <p className="text-sm text-fg-muted">{privacy.updated}</p>
        </div>
        {privacy.sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-2">
            <h3 className="text-[1.0625rem] font-[650]">{section.heading}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-fg-muted">
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
