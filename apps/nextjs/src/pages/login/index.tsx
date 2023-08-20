// ** React Imports
import { useState, type MouseEvent, type ReactNode } from "react"
// ** Next Imports
import Link from "next/link"
import { useRouter } from "next/router"
import { SignIn, useAuth, useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
// ** MUI Components
import Alert from "@mui/material/Alert"
import Box, { type BoxProps } from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import MuiFormControlLabel, {
    type FormControlLabelProps,
} from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import { styled, useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography, { type TypographyProps } from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
// ** Third Party Imports
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
// ** Icon Imports
import Icon from "src/@core/components/icon"
// ** Hooks
import useBgColor from "src/@core/hooks/useBgColor"
import { useSettings } from "src/@core/hooks/useSettings"
// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout"
// ** Configs
import themeConfig from "src/configs/themeConfig"
import * as z from "zod"
import { makeZodI18nMap, zodI18nMap } from "zod-i18n-map"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import { type i18nextKeys } from "~/@types/i18next"
import Translations from "~/layouts/components/Translations"
import UserLanguageDropdown from "~/layouts/components/UserLanguageDropdown"

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth'

// ** Styled Components

const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: "0.875rem",
    textDecoration: "none",
    color: theme.palette.primary.main,
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
    ({ theme }) => ({
        "& .MuiFormControlLabel-label": {
            fontSize: "0.875rem",
            color: theme.palette.text.secondary,
        },
    }),
)

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const defaultValues = {
    password: "123456",
    email: "philip.hamelink@gmail.com",
}

interface FormData {
    email: string
    password: string
}

const LoginPage = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    // ** Hooks
    const { signIn, isLoaded, setActive } = useSignIn()
    const theme = useTheme()
    const bgColors = useBgColor()
    const { settings } = useSettings()
    const { t } = useTranslation()

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            const { email, password } = data
            if (!isLoaded) return

            const result = await signIn.create({
                identifier: email,
                password,
            })

            if (result.status === "complete") {
                setActive({ session: result.createdSessionId })
                const { redirectUrl } = router.query
                console.log(redirectUrl)
                router.replace(redirectUrl?.toString() ?? router.basePath)
            }
        } catch (error) {
            const clerkError = ClerkErrorSchema.safeParse(error)

            console.error(error)

            if (clerkError.success) {
                setError("email", {
                    type: "manual",
                    message: clerkError.data.errors[0]?.message,
                })
            } else {
                setError("email", {
                    type: "manual",
                    message: t("Something went wrong. Please try again."),
                })
            }
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    p: 12,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.paper",
                    width: "100%",
                    [theme.breakpoints.up("sm")]: {
                        maxWidth: 600,
                    },
                }}
            >
                <Alert
                    icon={false}
                    sx={{
                        py: 3,
                        mb: 6,
                        ...bgColors.primaryLight,
                        "& .MuiAlert-message": { p: 0 },
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            mb: 2,
                            display: "block",
                            color: "primary.main",
                        }}
                    >
                        Admin: <strong>admin@materio.com</strong> / Pass:{" "}
                        <strong>admin</strong>
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ display: "block", color: "primary.main" }}
                    >
                        Client: <strong>client@materio.com</strong> / Pass:{" "}
                        <strong>client</strong>
                    </Typography>
                </Alert>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <TextField
                                    autoFocus
                                    label="Email"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.email)}
                                    placeholder="admin@materio.com"
                                />
                            )}
                        />
                        {errors.email && (
                            <FormHelperText sx={{ color: "error.main" }}>
                                <Translations
                                    text={errors.email.message as i18nextKeys}
                                />
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="auth-login-v2-password"
                            error={Boolean(errors.password)}
                        >
                            <Translations text="Password" />
                        </InputLabel>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <OutlinedInput
                                    value={value}
                                    onBlur={onBlur}
                                    label="Password"
                                    onChange={onChange}
                                    id="auth-login-v2-password"
                                    error={Boolean(errors.password)}
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                            >
                                                <Icon
                                                    icon={
                                                        showPassword
                                                            ? "mdi:eye-outline"
                                                            : "mdi:eye-off-outline"
                                                    }
                                                    fontSize={20}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            )}
                        />
                        {errors.password && (
                            <FormHelperText sx={{ color: "error.main" }} id="">
                                <Translations
                                    text={
                                        errors.password.message as i18nextKeys
                                    }
                                />
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <FormControlLabel
                            label={<Translations text="Remember me" />}
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                />
                            }
                        />
                        <LinkStyled href="/forgot-password">
                            <Translations text="Forgot Password?" />
                        </LinkStyled>
                    </Box>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ mb: 7 }}
                    >
                        <Translations text="Login" />
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            <Translations text="New on our platform?" />
                        </Typography>
                        <Typography variant="body2">
                            <LinkStyled href="/register">
                                <Translations text="Create an account" />
                            </LinkStyled>
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            my: (theme) => `${theme.spacing(5)} !important`,
                        }}
                    >
                        or
                    </Divider>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton
                            href="/"
                            component={Link}
                            sx={{ color: "#497ce2" }}
                            onClick={(e: MouseEvent<HTMLElement>) =>
                                e.preventDefault()
                            }
                        >
                            <Icon icon="mdi:facebook" />
                        </IconButton>
                        <IconButton
                            href="/"
                            component={Link}
                            sx={{ color: "#1da1f2" }}
                            onClick={(e: MouseEvent<HTMLElement>) =>
                                e.preventDefault()
                            }
                        >
                            <Icon icon="mdi:twitter" />
                        </IconButton>
                        <IconButton
                            href="/"
                            component={Link}
                            onClick={(e: MouseEvent<HTMLElement>) =>
                                e.preventDefault()
                            }
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "#272727"
                                        : "grey.300",
                            }}
                        >
                            <Icon icon="mdi:github" />
                        </IconButton>
                        <IconButton
                            href="/"
                            component={Link}
                            sx={{ color: "#db4437" }}
                            onClick={(e: MouseEvent<HTMLElement>) =>
                                e.preventDefault()
                            }
                        >
                            <Icon icon="mdi:google" />
                        </IconButton>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true
LoginPage.authGuard = false

export default LoginPage
