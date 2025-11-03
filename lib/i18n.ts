import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ko',
    fallbackLng: 'ko',
    debug: false,
    resources: {
      ko: {
        translation: {}
      },
      en: {
        translation: {}
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


