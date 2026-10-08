/**
 * The shape of the content in `resume.ts`. Both languages share these types,
 * so the build stops with an error that names the line if an entry is
 * missing, misspelled or shaped differently in one of them.
 */

export type ProjectVisual = "loudpin" | "turbinetech" | "habits" | "raytracer" | "digits" | "search";

type Place = { label: string; href?: string };

export type Work = {
  company: string;
  initials: string;
  title: string;
  kind: string;
  dates?: string;
  /** Each bullet may contain [links](https://...) and **highlights**. */
  bullets?: string[];
};

export type Education = {
  school: string;
  initials: string;
  degree: string;
  note?: string;
  coursework?: string;
};

export type Project = {
  /** Must be the same in both languages: links like #p-loudpin point at it. */
  id: string;
  title: string;
  visual: ProjectVisual;
  /** May contain [links](https://...) and **highlights**. */
  description: string;
  tags: string[];
  /** Spans the full width of the grid and shows `highlights` beside the description. */
  feature?: boolean;
  highlights?: string[];
  status?: { label: string; tone: "live" | "progress" };
  link?: { label: string; href: string };
};

export type Resume = {
  meta: { description: string; ogTagline: string; locale: string };
  intro: string;
  availability: string;
  /** May contain [links](#p-loudpin) and **highlights**. */
  summary: string;
  location: string;
  contact: { languages: string; pitch: string };
  work: Work[];
  education: Education[];
  skills: {
    /** Skills used in real work, each with the project that shows it. */
    used: { name: string; usedIn: Place[] }[];
    courses: string[];
    certificates: string;
    languages: { name: string; level: string; label: string }[];
  };
  projects: Project[];
  /** Labels for headings, buttons and other interface text. */
  ui: {
    skipToContent: string;
    getInTouch: string;
    portraitAlt: string;
    headings: { about: string; work: string; education: string; skills: string; projects: string; contact: string };
    coursework: string;
    skillsIntro: string;
    skillsUsed: string;
    skillsCourses: string;
    certificates: string;
    languages: string;
    /** `{language}` and `{level}` are filled in. */
    cefrLabel: string;
    projectsIntro: string;
    myPart: string;
    builtWith: string;
    copy: { copy: string; copied: string; selected: string; write: string; status: string };
    messageOnLinkedIn: string;
    footer: { legal: string; before: string; link: string; after: string };
    dock: {
      nav: string;
      sections: { about: string; work: string; skills: string; projects: string; contact: string };
      darkTheme: string;
      lightTheme: string;
    };
    languageSwitch: string;
    notFound: { title: string; body: string; home: string };
  };
};
