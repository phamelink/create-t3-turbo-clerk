// ** MUI Imports
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
// ** Icon Imports
import Icon from "src/@core/components/icon"
// ** Type Import
import { type Settings } from "src/@core/context/settingsContext"
// ** Components
import ModeToggler from "src/@core/layouts/components/shared-components/ModeToggler"
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown"

import UserLanguageDropdown from "../UserLanguageDropdown"

interface Props {
    hidden: boolean
    settings: Settings
    toggleNavVisibility: () => void
    saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility } = props

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box
                className="actions-left"
                sx={{ mr: 2, display: "flex", alignItems: "center" }}
            >
                {hidden ? (
                    <IconButton
                        color="inherit"
                        sx={{ ml: -2.75 }}
                        onClick={toggleNavVisibility}
                    >
                        <Icon icon="mdi:menu" />
                    </IconButton>
                ) : null}

                <ModeToggler settings={settings} saveSettings={saveSettings} />
            </Box>
            <Box
                className="actions-right"
                sx={{ display: "flex", alignItems: "center" }}
            >
                <UserDropdown settings={settings} />
            </Box>
            <UserLanguageDropdown settings={settings} />
        </Box>
    )
}

export default AppBarContent
