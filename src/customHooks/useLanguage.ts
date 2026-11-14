import { use } from "react";
import { LanguageContext } from "../contextData/LanguageContext";

function useLanguage() {
  return use(LanguageContext);
}

export { useLanguage };
