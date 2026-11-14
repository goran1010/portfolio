import { useCallback, useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import {
  LANGUAGE_TAGS,
  getSystemLanguage,
  readStoredLanguage,
  translate,
  writeStoredLanguage,
} from "../utils/language";

import type { ReactNode } from "react";
import type { Language, TFunction } from "../utils/language";

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  const resolvedLanguage =
    language === "system" ? getSystemLanguage() : language;

  useEffect(() => {
    writeStoredLanguage(language);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = LANGUAGE_TAGS[resolvedLanguage];
    document.title = translate(resolvedLanguage, "meta.title");
  }, [resolvedLanguage]);

  const t: TFunction = useCallback(
    (key) => translate(resolvedLanguage, key),
    [resolvedLanguage],
  );

  return (
    <LanguageContext value={{ language, resolvedLanguage, setLanguage, t }}>
      {children}
    </LanguageContext>
  );
}

export { LanguageProvider };
