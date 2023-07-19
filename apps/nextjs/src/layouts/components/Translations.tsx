// ** Third Party Import

import { useTranslation } from "react-i18next"

import { type i18nextKeys } from "~/@types/i18next"

interface Props {
    text: i18nextKeys
    interpolation?: Record<string, string>
}

const Translations = ({ text, interpolation }: Props) => {
    // ** Hook
    const { t } = useTranslation()

    return <>{`${t(text, interpolation)}`}</>
}

export default Translations
