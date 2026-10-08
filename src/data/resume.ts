/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  HOW TO EDIT THE SITE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything the site says is in this file, once in English (`en`) and once
 *  in German (`de`). Change the text between the quotes, commit, and Vercel
 *  publishes the new version in about a minute. If something is wrong, the
 *  build fails, Vercel emails you, and the old version stays online.
 *
 *  Rules:
 *  - Keep the quotes "…" around every text and the comma after it.
 *  - A quote inside a text needs a backslash: "He said \"hi\"". Apostrophes
 *    (I'm, Parsa's) are fine as they are.
 *  - Links: [text](https://example.com). Links to a project on the page use
 *    its id: [LoudPin](#p-loudpin).
 *  - Highlight a figure with two stars on each side: **95.2%**.
 *  - Add or remove an entry (a job, a project) in BOTH languages, and keep a
 *    project's `id` the same in both.
 *  - Things that are the same in every language (name, email, links) are in
 *    PROFILE right below.
 *  - The allowed fields are described in `types.ts` next to this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Lang } from "@/i18n";
import type { Resume } from "./types";

export type { Education, Project, ProjectVisual, Resume, Work } from "./types";

/** The same in every language. */
export const PROFILE = {
  name: "Parsa Motamed",
  avatarUrl: "/me.jpg",
  email: "motamedparsa2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/parsa-motamed-7036b1273",
  /**
   * Postal address for the Impressum (legal notice), one line per entry, for
   * example ["Musterstraße 1", "47057 Duisburg", "Deutschland"]. German law
   * asks for an address where you can be reached. Deploys on Vercel stop with
   * an error while this is empty.
   */
  address: [] as string[],
};

const en: Resume = {
  meta: {
    description:
      "Computer engineering student in Duisburg who builds websites and apps end to end. Open to working student roles from January 2027.",
    ogTagline: "Computer engineering student in Duisburg. Websites and apps, end to end.",
    locale: "en_US",
  },
  intro:
    "Hi! I study computer engineering in Duisburg and build websites and apps end to end, from the database to the way a button springs back when you let go.",
  availability: "Open to working student roles",
  summary:
    "I'm in my seventh semester of Computer Engineering (Software) at the University of Duisburg-Essen. This year I redesigned and rebuilt the website of [Turbine Tech GmbH](#p-turbinetech) during my internship, and I'm building [LoudPin](#p-loudpin), a concert finder app, with Armia Farzadmanesh. Last winter I tutored the university's object-oriented programming course in C++. Outside of code I volunteer with AIESEC Düsseldorf, connecting companies in the region with international interns.",
  location: "Duisburg, Germany",
  contact: {
    languages: "English C1, German B2",
    pitch:
      "I'm looking for a working student role in software or web development, starting January 2027. Email is the quickest way to reach me.",
  },

  work: [
    {
      company: "Turbine Tech GmbH",
      initials: "TT",
      title: "Web Developer, Nettetal",
      kind: "Internship",
      dates: "Apr 2026 – Jul 2026",
      bullets: [
        "Redesigned and rebuilt the company website, [turbinetech.de](https://turbinetech.de), from the ground up and delivered it independently within three months.",
        "Built it in Laravel/PHP and MySQL with HTML, CSS and JavaScript: localization, template caching and an admin panel.",
        "Moved the domain's DNS from DomainFactory to Cloudflare, replaced the image CAPTCHA with Cloudflare Turnstile and set up email routing for the contact form.",
        "Prepared the final presentation of the project results for company leadership.",
      ],
    },
    {
      company: "AIESEC Düsseldorf",
      initials: "AI",
      title: "International Global Talent Associate",
      kind: "Volunteer",
      dates: "Apr 2026 – now",
      bullets: [
        "Research companies in the Düsseldorf region that could host international interns for 6 to 12 months, and find the right HR contacts with Apollo.",
        "Write personalized outreach emails and plan tasks and timelines in an international team.",
      ],
    },
    {
      company: "University of Duisburg-Essen",
      initials: "UDE",
      title: "Exercise Tutor, Object-Oriented Programming",
      kind: "Tutor",
      dates: "Oct 2025 – Feb 2026",
      bullets: [
        "Held weekly exercise sessions and helped students design, write and debug object-oriented C++.",
        "Prepared session content independently and handled student feedback.",
      ],
    },
    {
      company: "FH Aachen, Jülich",
      initials: "FH",
      title: "Introduction to Web Programming",
      kind: "Internship",
    },
  ],

  education: [
    {
      school: "University of Duisburg-Essen",
      initials: "UDE",
      degree: "B.Sc. Computer Engineering (Software)",
      note: "7th semester",
      coursework:
        "Object-oriented programming, data structures and algorithms, software architecture, databases (SQL), data visualization, modeling, computer architecture.",
    },
    { school: "FH Aachen, Jülich", initials: "FH", degree: "Freshman Institute" },
  ],

  skills: {
    used: [
      { name: "Laravel and PHP", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "React Native, Expo and TypeScript", usedIn: [{ label: "LoudPin", href: "#p-loudpin" }] },
      { name: "MySQL", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "Supabase", usedIn: [{ label: "LoudPin", href: "#p-loudpin" }] },
      {
        name: "HTML, CSS and JavaScript",
        usedIn: [
          { label: "turbinetech.de", href: "#p-turbinetech" },
          { label: "Habit tracker", href: "#p-habits" },
        ],
      },
      {
        name: "Git and GitHub",
        usedIn: [
          { label: "turbinetech.de", href: "#p-turbinetech" },
          { label: "LoudPin", href: "#p-loudpin" },
        ],
      },
      { name: "Cloudflare and Apache", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "C++", usedIn: [{ label: "Ray tracer", href: "#p-raytracer" }, { label: "OOP tutoring" }] },
      { name: "MATLAB", usedIn: [{ label: "Digit recognition", href: "#p-digits" }] },
      { name: "PowerPoint and Excel", usedIn: [{ label: "Final presentation at Turbine Tech" }] },
    ],
    courses: [
      "Java",
      "Python",
      "C",
      "SQL",
      "Data structures and algorithms",
      "Software architecture",
      "Power BI",
      "Microsoft Azure",
      "Linux",
    ],
    certificates:
      "Power BI Fundamentals, Excel and Microsoft Azure (DataCamp); Java, C++, and Git and GitHub (Codecademy).",
    languages: [
      { name: "English", level: "C1", label: "professional" },
      { name: "German", level: "B2", label: "conversational" },
    ],
  },

  projects: [
    {
      id: "loudpin",
      title: "LoudPin",
      visual: "loudpin",
      feature: true,
      status: { label: "In development", tone: "progress" },
      description:
        "A concert finder for iPhone, Android and the web that I build with Armia Farzadmanesh. It shows live music around you from Ticketmaster, puts every show on a map and keeps the artists you follow close.",
      highlights: [
        "The app's design system and motion, with contrast checked in light and dark mode.",
        "Map pins that group shows at one venue, soonest first and followed artists ahead.",
        "Accounts on Supabase with email, Google and Apple, synced across devices.",
        "Layouts for every screen, from a phone's tab bar to a desktop side rail.",
      ],
      tags: ["React Native", "Expo", "TypeScript", "Supabase", "Ticketmaster API"],
    },
    {
      id: "turbinetech",
      title: "turbinetech.de",
      visual: "turbinetech",
      status: { label: "Live", tone: "live" },
      description:
        "The company website I redesigned and rebuilt from scratch during my internship at Turbine Tech GmbH, then moved to Cloudflare with Turnstile bot protection.",
      tags: ["Laravel", "PHP", "MySQL", "Cloudflare"],
      link: { label: "Visit the site", href: "https://turbinetech.de" },
    },
    {
      id: "habits",
      title: "Habit and to-do tracker",
      visual: "habits",
      description:
        "A habit and to-do tracker in a single HTML file, with no dependencies and no accounts. Tasks repeat on the weekdays you choose, and the week, month and year views show your progress. Everything stays in your browser.",
      tags: ["JavaScript", "HTML", "CSS", "localStorage"],
      link: { label: "View on GitHub", href: "https://github.com/parsamo83/todo-app" },
    },
    {
      id: "raytracer",
      title: "Ray tracer",
      visual: "raytracer",
      description:
        "A C++ program that computes an image from a scene description by following rays of light, built with two classmates. The scene above runs the same idea in your browser: move across it to move the light.",
      tags: ["C++", "Team of 3"],
    },
    {
      id: "digits",
      title: "Handwritten digit recognition",
      visual: "digits",
      description:
        "A three-layer neural network written in MATLAB without any machine learning library. Our team of five reached **95.2%** accuracy on the MNIST handwritten digits.",
      tags: ["MATLAB", "Team of 5"],
    },
    {
      id: "search",
      title: "Search engine page",
      visual: "search",
      description:
        "A search site with separate views for web results and images, built as a team on a third-party search engine API. Try the switch above.",
      tags: ["Web", "Team project"],
    },
  ],

  ui: {
    skipToContent: "Skip to content",
    getInTouch: "Get in touch",
    portraitAlt: "Portrait of Parsa Motamed",
    headings: {
      about: "About",
      work: "Work experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      contact: "Get in touch",
    },
    coursework: "Coursework",
    skillsIntro: "Each skill links to the project where I used it.",
    skillsUsed: "Used in real projects",
    skillsCourses: "From courses and certificates",
    certificates: "Certificates",
    languages: "Languages",
    cefrLabel: "{language} at level {level} of the six CEFR levels",
    projectsIntro: "A live company website, an app in progress, a tool of my own and three university projects built in teams.",
    myPart: "My part",
    builtWith: "Built with",
    copy: {
      copy: "Copy email",
      copied: "Copied",
      selected: "Selected, press Ctrl+C",
      write: "Write an email",
      status: "Email address copied",
    },
    messageOnLinkedIn: "Message me on LinkedIn",
    footer: {
      legal: "Legal notice & privacy",
      before: "Layout adapted from the open-source",
      link: "Magic UI portfolio",
      after: "template",
    },
    dock: {
      nav: "Sections",
      sections: { about: "About", work: "Experience", skills: "Skills", projects: "Projects", contact: "Contact" },
      darkTheme: "Dark theme",
      lightTheme: "Light theme",
    },
    languageSwitch: "Language",
    notFound: {
      title: "This page doesn't exist",
      body: "The link may be old or mistyped. Everything on this site is on the home page.",
      home: "Go to the home page",
    },
  },
};

const de: Resume = {
  meta: {
    description:
      "Computer-Engineering-Student in Duisburg, der Websites und Apps von Grund auf entwickelt. Offen für Werkstudentenstellen ab Januar 2027.",
    ogTagline: "Computer-Engineering-Student in Duisburg. Websites und Apps von Grund auf.",
    locale: "de_DE",
  },
  intro:
    "Hallo! Ich studiere Computer Engineering in Duisburg und entwickle Websites und Apps von Grund auf, von der Datenbank bis zu der Art, wie ein Button zurückfedert, wenn man ihn loslässt.",
  availability: "Offen für Werkstudentenstellen",
  summary:
    "Ich bin im siebten Semester im Studiengang Computer Engineering (Software) an der Universität Duisburg-Essen. In diesem Jahr habe ich im Praktikum die Website der [Turbine Tech GmbH](#p-turbinetech) neu gestaltet und neu aufgebaut, und gemeinsam mit Armia Farzadmanesh entwickle ich [LoudPin](#p-loudpin), eine App zum Finden von Konzerten. Im letzten Winter war ich Tutor für den Kurs Objektorientierte Programmierung in C++. Außerdem engagiere ich mich ehrenamtlich bei AIESEC Düsseldorf und bringe Unternehmen aus der Region mit internationalen Praktikantinnen und Praktikanten zusammen.",
  location: "Duisburg, Deutschland",
  contact: {
    languages: "Englisch C1, Deutsch B2",
    pitch:
      "Ich suche ab Januar 2027 eine Werkstudentenstelle in der Software- oder Webentwicklung. Am schnellsten erreichen Sie mich per E-Mail.",
  },

  work: [
    {
      company: "Turbine Tech GmbH",
      initials: "TT",
      title: "Webentwickler, Nettetal",
      kind: "Praktikum",
      dates: "04/2026 – 07/2026",
      bullets: [
        "Eigenständige Neugestaltung und kompletter Neuaufbau der Firmenwebsite [turbinetech.de](https://turbinetech.de) in drei Monaten.",
        "Entwicklung mit Laravel/PHP und MySQL sowie HTML, CSS und JavaScript, inklusive Lokalisierung, Template-Caching und Admin-Bereich.",
        "Umzug der DNS-Verwaltung von DomainFactory zu Cloudflare, Ersatz des alten Bild-CAPTCHAs durch Cloudflare Turnstile und Einrichtung des E-Mail-Routings für das Kontaktformular.",
        "Aufbereitung der Projektergebnisse in einer Abschlusspräsentation für die Führungsebene.",
      ],
    },
    {
      company: "AIESEC Düsseldorf",
      initials: "AI",
      title: "International Global Talent Associate",
      kind: "Ehrenamt",
      dates: "04/2026 – heute",
      bullets: [
        "Recherche von Unternehmen in der Region Düsseldorf, die internationale Praktikantinnen und Praktikanten für 6 bis 12 Monate aufnehmen könnten, samt passender HR-Ansprechpersonen über Apollo.",
        "Verfassen personalisierter E-Mails an HR-Ansprechpersonen sowie Planung von Aufgaben und Terminen in einem internationalen Team.",
      ],
    },
    {
      company: "Universität Duisburg-Essen",
      initials: "UDE",
      title: "Tutor für Objektorientierte Programmierung",
      kind: "Tutor",
      dates: "10/2025 – 02/2026",
      bullets: [
        "Durchführung wöchentlicher Übungen und Unterstützung der Studierenden bei Entwurf, Umsetzung und Fehlersuche in objektorientiertem C++.",
        "Eigenständige Vorbereitung der Übungsinhalte und Umgang mit Rückmeldungen der Studierenden.",
      ],
    },
    {
      company: "FH Aachen, Jülich",
      initials: "FH",
      title: "Einführung in die Webprogrammierung",
      kind: "Praktikum",
    },
  ],

  education: [
    {
      school: "Universität Duisburg-Essen",
      initials: "UDE",
      degree: "B.Sc. Computer Engineering (Software)",
      note: "7. Semester",
      coursework:
        "Objektorientierte Programmierung, Algorithmen und Datenstrukturen, Softwarearchitektur, Datenbanken (SQL), Datenvisualisierung, Modellierung, Rechnerarchitektur.",
    },
    { school: "FH Aachen, Jülich", initials: "FH", degree: "Freshman Institute" },
  ],

  skills: {
    used: [
      { name: "Laravel und PHP", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "React Native, Expo und TypeScript", usedIn: [{ label: "LoudPin", href: "#p-loudpin" }] },
      { name: "MySQL", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "Supabase", usedIn: [{ label: "LoudPin", href: "#p-loudpin" }] },
      {
        name: "HTML, CSS und JavaScript",
        usedIn: [
          { label: "turbinetech.de", href: "#p-turbinetech" },
          { label: "Habit-Tracker", href: "#p-habits" },
        ],
      },
      {
        name: "Git und GitHub",
        usedIn: [
          { label: "turbinetech.de", href: "#p-turbinetech" },
          { label: "LoudPin", href: "#p-loudpin" },
        ],
      },
      { name: "Cloudflare und Apache", usedIn: [{ label: "turbinetech.de", href: "#p-turbinetech" }] },
      { name: "C++", usedIn: [{ label: "Raytracer", href: "#p-raytracer" }, { label: "OOP-Tutorium" }] },
      { name: "MATLAB", usedIn: [{ label: "Ziffernerkennung", href: "#p-digits" }] },
      { name: "PowerPoint und Excel", usedIn: [{ label: "Abschlusspräsentation bei Turbine Tech" }] },
    ],
    courses: [
      "Java",
      "Python",
      "C",
      "SQL",
      "Algorithmen und Datenstrukturen",
      "Softwarearchitektur",
      "Power BI",
      "Microsoft Azure",
      "Linux",
    ],
    certificates:
      "Power BI Fundamentals, Excel und Microsoft Azure (DataCamp); Java, C++ sowie Git und GitHub (Codecademy).",
    languages: [
      { name: "Englisch", level: "C1", label: "fließend" },
      { name: "Deutsch", level: "B2", label: "gute Kenntnisse" },
    ],
  },

  projects: [
    {
      id: "loudpin",
      title: "LoudPin",
      visual: "loudpin",
      feature: true,
      status: { label: "In Entwicklung", tone: "progress" },
      description:
        "Eine Konzert-App für iPhone, Android und das Web, die ich gemeinsam mit Armia Farzadmanesh entwickle. Sie zeigt Live-Musik in der Nähe auf Basis von Ticketmaster-Daten, stellt jede Show auf einer Karte dar und behält die Acts im Blick, denen man folgt.",
      highlights: [
        "Das Designsystem und die Animationen der App, mit geprüftem Kontrast im hellen und dunklen Modus.",
        "Kartenpins, die Shows am selben Ort bündeln, mit der nächsten Show zuerst und gefolgten Acts vorne.",
        "Konten über Supabase mit E-Mail, Google und Apple, synchronisiert über alle Geräte.",
        "Layouts für jede Bildschirmgröße, von der Tab-Leiste am Handy bis zur Seitenleiste am Desktop.",
      ],
      tags: ["React Native", "Expo", "TypeScript", "Supabase", "Ticketmaster API"],
    },
    {
      id: "turbinetech",
      title: "turbinetech.de",
      visual: "turbinetech",
      status: { label: "Live", tone: "live" },
      description:
        "Die Firmenwebsite, die ich im Praktikum bei der Turbine Tech GmbH von Grund auf neu gestaltet und aufgebaut habe, inklusive Umzug zu Cloudflare mit Turnstile als Bot-Schutz.",
      tags: ["Laravel", "PHP", "MySQL", "Cloudflare"],
      link: { label: "Website ansehen", href: "https://turbinetech.de" },
    },
    {
      id: "habits",
      title: "Habit- und To-do-Tracker",
      visual: "habits",
      description:
        "Ein Habit- und To-do-Tracker in einer einzigen HTML-Datei, ohne Abhängigkeiten und ohne Konto. Aufgaben wiederholen sich an den gewählten Wochentagen, und die Ansichten für Woche, Monat und Jahr zeigen den Fortschritt. Alles bleibt im Browser.",
      tags: ["JavaScript", "HTML", "CSS", "localStorage"],
      link: { label: "Auf GitHub ansehen", href: "https://github.com/parsamo83/todo-app" },
    },
    {
      id: "raytracer",
      title: "Raytracer",
      visual: "raytracer",
      description:
        "Ein C++-Programm, das aus einer Szenenbeschreibung ein Bild berechnet, indem es Lichtstrahlen verfolgt. Entstanden im Dreierteam. Die Szene oben nutzt dasselbe Prinzip direkt im Browser: Wenn Sie darüberfahren, wandert das Licht mit.",
      tags: ["C++", "Dreierteam"],
    },
    {
      id: "digits",
      title: "Handschriftliche Ziffernerkennung",
      visual: "digits",
      description:
        "Ein dreischichtiges neuronales Netz in MATLAB, ganz ohne Machine-Learning-Bibliotheken. Unser Fünferteam erreichte **95,2 %** Genauigkeit auf den handgeschriebenen MNIST-Ziffern.",
      tags: ["MATLAB", "Fünferteam"],
    },
    {
      id: "search",
      title: "Suchmaschinen-Website",
      visual: "search",
      description:
        "Eine Suchseite mit getrennten Ansichten für Web-Ergebnisse und Bilder, im Team auf Basis einer Suchmaschinen-API gebaut. Probieren Sie den Schalter oben aus.",
      tags: ["Web", "Teamprojekt"],
    },
  ],

  ui: {
    skipToContent: "Zum Inhalt springen",
    getInTouch: "Kontakt aufnehmen",
    portraitAlt: "Porträt von Parsa Motamed",
    headings: {
      about: "Über mich",
      work: "Berufserfahrung",
      education: "Studium",
      skills: "Kenntnisse",
      projects: "Projekte",
      contact: "Kontakt",
    },
    coursework: "Studieninhalte",
    skillsIntro: "Zu jeder Kenntnis finden Sie das Projekt, in dem ich sie eingesetzt habe.",
    skillsUsed: "In echten Projekten eingesetzt",
    skillsCourses: "Aus Kursen und Zertifikaten",
    certificates: "Zertifikate",
    languages: "Sprachen",
    cefrLabel: "{language} auf Niveau {level} von sechs GER-Stufen",
    projectsIntro: "Eine live geschaltete Firmenwebsite, eine App in Entwicklung, ein eigenes Tool und drei Universitätsprojekte im Team.",
    myPart: "Mein Anteil",
    builtWith: "Technologien",
    copy: {
      copy: "E-Mail kopieren",
      copied: "Kopiert",
      selected: "Markiert, mit Strg+C kopieren",
      write: "E-Mail schreiben",
      status: "E-Mail-Adresse kopiert",
    },
    messageOnLinkedIn: "Nachricht auf LinkedIn",
    footer: {
      legal: "Impressum & Datenschutz",
      before: "Layout basiert auf der Open-Source-Vorlage",
      link: "Magic UI Portfolio",
      after: "",
    },
    dock: {
      nav: "Abschnitte",
      sections: { about: "Über mich", work: "Erfahrung", skills: "Kenntnisse", projects: "Projekte", contact: "Kontakt" },
      darkTheme: "Dunkles Design",
      lightTheme: "Helles Design",
    },
    languageSwitch: "Sprache",
    notFound: {
      title: "Diese Seite gibt es nicht",
      body: "Der Link ist vielleicht veraltet oder falsch geschrieben. Alles auf dieser Website finden Sie auf der Startseite.",
      home: "Zur Startseite",
    },
  },
};

const RESUMES: Record<Lang, Resume> = { en, de };

export function getResume(lang: Lang): Resume {
  return RESUMES[lang];
}
