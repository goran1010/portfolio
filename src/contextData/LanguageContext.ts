import { createContext } from "react";

import type { Language, ResolvedLanguage, TFunction } from "../utils/language";

type SetLanguage = (language: Language) => void;

interface LanguageContextType {
  language: Language;
  resolvedLanguage: ResolvedLanguage;
  setLanguage: SetLanguage;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "system",
  resolvedLanguage: "en",
  setLanguage: (prop) => prop,
  t: (key) => key,
});

export { LanguageContext };
export type { SetLanguage, LanguageContextType };
