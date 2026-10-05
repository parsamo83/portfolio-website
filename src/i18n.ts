export const LANGS = ["en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/** Remembers a language picked with the switch, so `/` opens in it next time. */
export const LANG_COOKIE = "lang";

/** Each language's name in its own language, for the switch's accessible names. */
export const LANG_NAMES: Record<Lang, string> = { en: "English", de: "Deutsch" };

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}
