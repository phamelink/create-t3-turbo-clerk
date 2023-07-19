import type common from "public/locales/en/common.json"
import type zod from "public/locales/en/zod.json"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common"
        resources: {
            common: typeof common
            zod: typeof zod
        }
    }
}

export type i18nextKeys = keyof typeof common
