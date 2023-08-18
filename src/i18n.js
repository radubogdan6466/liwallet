import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./JsonFiles/language/en.json";
import ro from "./JsonFiles/language/ro.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ro: {
      translation: ro,
    },
  },
  lng: localStorage.getItem("language") || "ro",
  fallbackLng: "ro",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
