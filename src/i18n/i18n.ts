import en from 'i18n/en'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'common'
export const resources = {
  en,
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['components', 'pages'],
    defaultNS,
    resources,
  })

export default i18n
