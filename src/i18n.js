import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./JsonFiles/language/en.json";
import ro from "./JsonFiles/language/ro.json";
import it from "./JsonFiles/language/it.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ro: {
      translation: ro,
    },
    it: {
      translation: it,
    },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
