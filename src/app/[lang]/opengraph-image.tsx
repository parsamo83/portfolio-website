import { getResume, PROFILE } from "@/data/resume";
import { DEFAULT_LANG, isLang, LANGS } from "@/i18n";
import { ImageResponse } from "next/og";

export const alt = PROFILE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Drawn once per language at build time, so LinkedIn's crawler gets a ready file.
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// The preview card shown when the link is shared on LinkedIn, Slack or WhatsApp.
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { meta } = getResume(isLang(lang) ? lang : DEFAULT_LANG);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "#f3f4f6",
          color: "#111418",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95 }}>{PROFILE.name}</div>
        <div style={{ width: 160, height: 12, background: "#ffd02e", marginTop: 32, marginBottom: 32, borderRadius: 6 }} />
        <div style={{ fontSize: 36, color: "#545d6b", maxWidth: 900, lineHeight: 1.35 }}>{meta.ogTagline}</div>
      </div>
    ),
    size,
  );
}
