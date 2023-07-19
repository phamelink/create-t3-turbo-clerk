import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import commonEn from "public/locales/en/common.json"
import zodEn from "public/locales/en/zod.json"
import commonFr from "public/locales/fr/common.json"
import zodFr from "public/locales/fr/zod.json"
import { initReactI18next } from "react-i18next"

i18n
    // Enables the i18next backend
    .use(Backend)
    // Enable automatic language detection
    .use(LanguageDetector)

    // Enables the hook initialization module
    .use(initReactI18next)
    .init({
        lng: "fr",
        ns: ["common"],
        // resources: {
        //     fr: {
        //         zod: zodFr,
        //         common: commonFr,
        //     },
        //     en: {
        //         zod: zodEn,
        //         common: commonEn,
        //     },
        // },
        backend: {
            /* translation file path */
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        // fallbackLng: "fr",
        debug: true,
        keySeparator: false,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
    })

export default i18n
