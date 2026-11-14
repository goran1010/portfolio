import en from "../locales/en.json";
import sr from "../locales/sr.json";

type ResolvedLanguage = "en" | "sr";
type Language = ResolvedLanguage | "system";

type KeyPaths<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${KeyPaths<T[K]>}`;
}[keyof T & string];

type TranslationKey = KeyPaths<typeof en>;
type TFunction = (key: TranslationKey) => string;

interface TranslationMap {
  [key: string]: string | TranslationMap;
}

const LANGUAGE_STORAGE_KEY = "language";
const LANGUAGES = ["system", "en", "sr"] as const;

const translations: Record<ResolvedLanguage, typeof en> = { en, sr };

// BCP 47 tags for <html lang>; a bare "sr" means Cyrillic, and the Serbian
// bundle is written in Latin script
const LANGUAGE_TAGS: Record<ResolvedLanguage, string> = {
  en: "en",
  sr: "sr-Latn",
};

// Bosnian, Croatian and Montenegrin readers get the Serbian bundle, the
// closer of the two
const SERBIAN_BUNDLE_CODES = new Set(["sr", "bs", "hr", "cnr"]);

function getSystemLanguage(): ResolvedLanguage {
  for (const tag of navigator.languages) {
    const code = tag.split("-")[0]?.toLowerCase() ?? "";
    if (SERBIAN_BUNDLE_CODES.has(code)) return "sr";
    if (code === "en") return "en";
  }
  return "en";
}

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.some((language) => language === value);
}

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : "system";
  } catch (error) {
    console.warn("Could not read language from localStorage:", error);
    return "system";
  }
}

function writeStoredLanguage(language: Language) {
  try {
    if (language === "system") localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    else localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Could not save language to localStorage:", error);
  }
}

// Returns the key itself when it does not lead to a string, so a missing
// translation is visible instead of blank
function translate(language: ResolvedLanguage, key: TranslationKey): string {
  let value: string | TranslationMap | undefined = translations[language];

  for (const part of key.split(".")) {
    if (typeof value !== "object") return key;
    value = value[part];
  }

  return typeof value === "string" ? value : key;
}

export {
  LANGUAGES,
  LANGUAGE_TAGS,
  getSystemLanguage,
  isLanguage,
  readStoredLanguage,
  writeStoredLanguage,
  translate,
};
export type {
  Language,
  ResolvedLanguage,
  TranslationKey,
  TFunction,
  TranslationMap,
};
