import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";


const resources = {
  en: {
    translation: require("./locale/en.json")
  },
  id: {
    translation: require("./locale/id.json")
  }
};

i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;