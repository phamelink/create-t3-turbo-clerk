// ** React Imports
import { Fragment, useState, type SyntheticEvent } from "react"
// ** Next Import
import { useRouter } from "next/router"
import { useAuth } from "@clerk/nextjs"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
// ** MUI Imports
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
// ** Icon Imports
import Icon from "src/@core/components/icon"
// ** Context
// import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { type Settings } from "src/@core/context/settingsContext"

import { api } from "~/utils/api"
import Translations from "~/layouts/components/Translations"

interface Props {
    settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}))

const UserDropdown = (props: Props) => {
    // ** Props
    const { settings } = props

    // ** States
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    // ** Hooks
    const router = useRouter()
    const { signOut } = useAuth()
    const { data: user } = api.auth.getProfile.useQuery()
    const { data: url } = api.auth.getProfilePictureUrl.useQuery()

    // ** Vars
    const { direction } = settings

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }

    const styles = {
        py: 2,
        px: 4,
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        textDecoration: "none",
        "& svg": {
            mr: 2,
            fontSize: "1.375rem",
            color: "text.primary",
        },
    }

    const handleLogout = () => {
        signOut().finally(() => {
            handleDropdownClose()
        })
    }

    return (
        <Fragment>
            <Badge
                overlap="circular"
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: "pointer" }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Avatar
                    alt={user ? `${user.firstname} ${user.lastname}` : ""}
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                    src={url ?? "/images/avatars/1.png"}
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: direction === "ltr" ? "right" : "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: direction === "ltr" ? "right" : "left",
                }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Badge
                            overlap="circular"
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                        >
                            <Avatar
                                alt={
                                    user
                                        ? `${user.firstname} ${user.lastname}`
                                        : ""
                                }
                                src={url ?? "/images/avatars/1.png"}
                                sx={{ width: "2.5rem", height: "2.5rem" }}
                            />
                        </Badge>
                        <Box
                            sx={{
                                display: "flex",
                                ml: 3,
                                alignItems: "flex-start",
                                flexDirection: "column",
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>
                                {user
                                    ? `${user.firstname} ${user.lastname}`
                                    : ""}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: "0.8rem",
                                    color: "text.disabled",
                                }}
                            ></Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: "0 !important" }} />
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:account-outline" />
                        <Translations text="Profile" />
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:email-outline" />
                        <Translations text="Inbox" />
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:message-outline" />
                        <Translations text="Messages" />
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:cog-outline" />
                        <Translations text="Settings" />
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:currency-usd" />
                        <Translations text="Pricing" />
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <Icon icon="mdi:help-circle-outline" />
                        <Translations text="FAQ" />
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        py: 2,
                        "& svg": {
                            mr: 2,
                            fontSize: "1.375rem",
                            color: "text.primary",
                        },
                    }}
                >
                    <Icon icon="mdi:logout-variant" />
                    <Translations text="Logout" />
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown
