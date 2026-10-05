/*
 * Text of the legal notice (Impressum) and privacy policy, per language.
 * Name, address and email come from PROFILE in resume.ts.
 *
 * Written from the usual elements of a German Impressum (§ 5 DDG) and
 * privacy policy (GDPR, TDDDG) for a site hosted on Vercel without analytics.
 * It is a starting point, not legal advice: compare it with a free generator
 * such as e-recht24.de or datenschutz-generator.de before relying on it, and
 * update it if the site adds analytics, embeds or a contact form.
 * Paragraphs may contain [links](https://...).
 */
import type { Lang } from "@/i18n";

type Section = { heading: string; paragraphs: string[] };

export type Legal = {
  title: string;
  impressum: { heading: string; basis: string; contact: string; email: string; addressMissing: string };
  privacy: { heading: string; updated: string; sections: Section[] };
};

const VERCEL_ADDRESS = "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA";

const en: Legal = {
  title: "Legal notice & privacy",
  impressum: {
    heading: "Legal notice (Impressum)",
    basis: "Information according to § 5 of the German Digital Services Act (DDG)",
    contact: "Contact",
    email: "Email",
    addressMissing: "Postal address missing: add it to PROFILE.address in src/data/resume.ts.",
  },
  privacy: {
    heading: "Privacy policy",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "Who is responsible",
        paragraphs: [
          "The person responsible for processing personal data on this website (the controller under the GDPR) is Parsa Motamed. The contact details are in the legal notice above.",
        ],
      },
      {
        heading: "Hosting and server logs",
        paragraphs: [
          `This website is hosted by ${VERCEL_ADDRESS}. When you open a page, Vercel automatically processes technical data your browser sends: your IP address, the date and time, the page requested, the page you came from, and your browser and operating system. This is necessary to deliver the website securely and reliably (Art. 6(1)(f) GDPR).`,
          "This data may be processed in the USA. Vercel is certified under the EU-U.S. Data Privacy Framework, for which the European Commission has issued an adequacy decision (Art. 45 GDPR). More in [Vercel's privacy notice](https://vercel.com/legal/privacy-notice).",
        ],
      },
      {
        heading: "Fonts",
        paragraphs: [
          "The typeface is served from this website itself. Opening a page does not connect you to Google Fonts or any other font service.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "If you pick a language with the switch at the top, the site stores your choice in a cookie named \"lang\" for one year, so the home page opens in that language next time. If you switch between the light and dark theme, your choice is kept in your browser's local storage.",
          "Both only provide a function you asked for (§ 25(2) no. 2 TDDDG) and are never used for tracking. You can delete them in your browser settings at any time.",
        ],
      },
      {
        heading: "No tracking",
        paragraphs: [
          "This website uses no analytics, tracking or advertising services and does not embed content from other providers.",
        ],
      },
      {
        heading: "Email",
        paragraphs: [
          "If you email me, I use your address and message only to reply (Art. 6(1)(b) and (f) GDPR) and delete them once they are no longer needed.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "Links to LinkedIn, GitHub and other websites only take you there when you click them. From then on, their own privacy policies apply.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18) and data portability (Art. 20), and you may object to processing based on Art. 6(1)(f) (Art. 21). To use these rights, send me an email.",
          "You can also complain to a data protection supervisory authority, for example the [State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (LDI NRW)](https://www.ldi.nrw.de).",
        ],
      },
    ],
  },
};

const de: Legal = {
  title: "Impressum & Datenschutz",
  impressum: {
    heading: "Impressum",
    basis: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)",
    contact: "Kontakt",
    email: "E-Mail",
    addressMissing: "Postanschrift fehlt: bitte in src/data/resume.ts unter PROFILE.address eintragen.",
  },
  privacy: {
    heading: "Datenschutzerklärung",
    updated: "Stand: Oktober 2026",
    sections: [
      {
        heading: "Verantwortlicher",
        paragraphs: [
          "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der DSGVO ist Parsa Motamed. Die Kontaktdaten stehen im Impressum oben.",
        ],
      },
      {
        heading: "Hosting und Server-Logfiles",
        paragraphs: [
          `Diese Website wird bei ${VERCEL_ADDRESS} gehostet. Beim Aufruf einer Seite verarbeitet Vercel automatisch technische Daten, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite, die zuvor besuchte Seite sowie Browser und Betriebssystem. Das ist erforderlich, um die Website sicher und zuverlässig bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).`,
          "Die Daten können in den USA verarbeitet werden. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO). Mehr dazu in der [Datenschutzerklärung von Vercel](https://vercel.com/legal/privacy-notice).",
        ],
      },
      {
        heading: "Schriftarten",
        paragraphs: [
          "Die Schriftart wird direkt von dieser Website ausgeliefert. Beim Aufruf wird keine Verbindung zu Google Fonts oder anderen Schriftanbietern hergestellt.",
        ],
      },
      {
        heading: "Cookies und lokaler Speicher",
        paragraphs: [
          "Wenn Sie oben mit dem Sprachschalter eine Sprache wählen, speichert die Website Ihre Wahl für ein Jahr in einem Cookie namens „lang“, damit die Startseite beim nächsten Besuch in dieser Sprache öffnet. Wenn Sie zwischen hellem und dunklem Design wechseln, wird Ihre Wahl im lokalen Speicher Ihres Browsers abgelegt.",
          "Beides stellt nur eine von Ihnen gewünschte Funktion bereit (§ 25 Abs. 2 Nr. 2 TDDDG) und dient nie der Nachverfolgung. Sie können beides jederzeit in Ihren Browsereinstellungen löschen.",
        ],
      },
      {
        heading: "Kein Tracking",
        paragraphs: [
          "Diese Website verwendet keine Analyse-, Tracking- oder Werbedienste und bindet keine Inhalte anderer Anbieter ein.",
        ],
      },
      {
        heading: "E-Mail",
        paragraphs: [
          "Wenn Sie mir eine E-Mail schreiben, verwende ich Ihre Adresse und Nachricht nur, um zu antworten (Art. 6 Abs. 1 lit. b und f DSGVO), und lösche sie, sobald sie nicht mehr benötigt werden.",
        ],
      },
      {
        heading: "Links zu anderen Websites",
        paragraphs: [
          "Links zu LinkedIn, GitHub und anderen Websites führen Sie erst beim Anklicken dorthin. Ab dann gelten deren Datenschutzhinweise.",
        ],
      },
      {
        heading: "Ihre Rechte",
        paragraphs: [
          "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20) sowie das Recht, Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f zu widersprechen (Art. 21). Schreiben Sie mir dazu einfach eine E-Mail.",
          "Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der [Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)](https://www.ldi.nrw.de).",
        ],
      },
    ],
  },
};

const LEGAL: Record<Lang, Legal> = { en, de };

export function getLegal(lang: Lang): Legal {
  return LEGAL[lang];
}
