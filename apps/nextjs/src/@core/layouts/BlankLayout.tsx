// ** MUI Imports
import Box, { type BoxProps } from "@mui/material/Box"
import { styled } from "@mui/material/styles"

import { useSettings } from "../hooks/useSettings"
import LanguageDropdown from "./components/shared-components/LanguageDropdown"
import UserDropdown from "./components/shared-components/UserDropdown"
// ** Types
import { type BlankLayoutProps } from "./types"

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: "100vh",

    // For V1 Blank layout pages
    "& .content-center": {
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(5),
    },

    // For V2 Blank layout pages
    "& .content-right": {
        display: "flex",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
    },
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
    const { settings, saveSettings } = useSettings()
    return (
        <BlankLayoutWrapper className="layout-wrapper">
            <LanguageDropdown settings={settings} saveSettings={saveSettings} />
            <Box
                className="app-content"
                sx={{
                    minHeight: "100vh",
                    overflowX: "hidden",
                    position: "relative",
                }}
            >
                {children}
            </Box>
        </BlankLayoutWrapper>
    )
}

export default BlankLayout
