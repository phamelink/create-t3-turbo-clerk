// ** React Import
import { useEffect } from "react"
// ** Third Party Import
import { useTranslation } from "react-i18next"
// ** Icon Imports
import Icon from "src/@core/components/icon"
// ** Custom Components Imports
import OptionsMenu from "src/@core/components/option-menu"
// ** Type Import
import { type Settings } from "src/@core/context/settingsContext"

interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
    // ** Hook
    const { i18n } = useTranslation()

    // ** Vars
    const { layout } = settings

    const handleLangItemClick = (lang: "en" | "fr") => {
        i18n.changeLanguage(lang)
    }

    // ** Change html `lang` attribute when changing locale
    useEffect(() => {
        document.documentElement.setAttribute("lang", i18n.language)
    }, [i18n.language])

    return (
        <OptionsMenu
            icon={<Icon icon="mdi:translate" />}
            menuProps={{ sx: { "& .MuiMenu-paper": { mt: 4, minWidth: 130 } } }}
            iconButtonProps={{
                color: "inherit",
                sx: {
                    ...(layout === "vertical" ? { mr: 0.75 } : { mx: 0.75 }),
                    m: 2,
                },
            }}
            options={[
                {
                    text: "English",
                    icon: <Icon icon="flagpack:gb-ukm" />,
                    menuItemProps: {
                        sx: { py: 2 },
                        selected: i18n.language === "en",
                        onClick: () => {
                            handleLangItemClick("en")
                            saveSettings({ ...settings, direction: "ltr" })
                        },
                    },
                },
                {
                    text: "French",
                    icon: <Icon icon="twemoji:flag-for-flag-france" />,
                    menuItemProps: {
                        sx: { p: 2 },
                        selected: i18n.language === "fr",
                        onClick: () => {
                            handleLangItemClick("fr")
                            saveSettings({ ...settings, direction: "ltr" })
                        },
                    },
                },
            ]}
        />
    )
}

export default LanguageDropdown
