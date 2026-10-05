import Dock from "@/components/dock";
import LanguageSwitch from "@/components/language-switch";
import SiteFooter from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getResume, PROFILE } from "@/data/resume";
import { isLang, LANGS } from "@/i18n";
import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

// Variable Archivo with its width axis: the display type uses the expanded cut,
// running text the normal one, so the whole site stays in one family.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = getResume(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: PROFILE.name, template: `%s | ${PROFILE.name}` },
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", de: "/de", "x-default": "/" },
    },
    openGraph: {
      title: PROFILE.name,
      description: meta.description,
      url: `/${lang}`,
      siteName: PROFILE.name,
      locale: meta.locale,
      alternateLocale: LANGS.filter((other) => other !== lang).map((other) => getResume(other).meta.locale),
      type: "website",
    },
    twitter: { title: PROFILE.name, card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

export default async function LangLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { ui } = getResume(lang);

  return (
    <html lang={lang} className={archivo.variable} suppressHydrationWarning>
      <body className="min-h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="absolute left-4 -top-16 z-[100] rounded-control bg-ink px-4 py-2.5 font-semibold text-on-ink focus:top-4"
          >
            {ui.skipToContent}
          </a>
          <div className="mx-auto box-content max-w-[1040px] px-4 pt-5 pb-40 sm:px-6 sm:pt-8 sm:pb-44">
            <header className="mb-8 flex justify-end sm:mb-12">
              {/* Keyed by language so the switch starts fresh on the page it navigated to. */}
              <LanguageSwitch key={lang} lang={lang} label={ui.languageSwitch} />
            </header>
            {children}
            <SiteFooter lang={lang} />
          </div>
          <Dock lang={lang} labels={ui.dock} />
        </ThemeProvider>
      </body>
    </html>
  );
}
