// ** React Imports
import { useState, type ReactNode } from "react"
// ** Next Import
import Link from "next/link"
import { useRouter } from "next/router"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import Box from "@mui/material/Box"
// ** MUI Components
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import { styled, useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
// ** Icon Imports
import Icon from "src/@core/components/icon"
// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout"
import * as z from "zod"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import { type i18nextKeys } from "~/@types/i18next"
import Translations from "~/layouts/components/Translations"

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
}))

const schema = z
    .object({
        email: z.string().email({
            message: "Must be a valid email",
        }),
        password: z
            .string()
            .min(8, { message: "Password must be atleast 8 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
        terms: z.boolean().refine((data) => data, {
            message: "You must accept terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    })

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
}

const Register = () => {
    // ** States
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // ** Hooks
    const theme = useTheme()
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()
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

            console.log(data)

            const result = await signUp.create({
                emailAddress: email,
                password,
            })

            console.log(result.status)

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
                <Typography variant="h5" my={2}>
                    <Translations text="Create an account" />
                </Typography>
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
                    <FormControl fullWidth sx={{ my: 2 }}>
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
                            <FormHelperText
                                sx={{ color: "error.main", mb: 2 }}
                                id=""
                            >
                                <Translations
                                    text={
                                        errors.password.message as i18nextKeys
                                    }
                                />
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel
                            htmlFor="auth-login-v2-password"
                            error={Boolean(errors.password)}
                        >
                            <Translations text="Confirm password" />
                        </InputLabel>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <OutlinedInput
                                    value={value}
                                    onBlur={onBlur}
                                    label={
                                        <Translations text="Confirm password" />
                                    }
                                    onChange={onChange}
                                    id="auth-login-v2-password"
                                    error={Boolean(errors.password)}
                                    type={showPassword ? "text" : "password"}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <FormHelperText
                                sx={{ color: "error.main", mb: 2 }}
                                id=""
                            >
                                <Translations
                                    text={
                                        errors.confirmPassword
                                            .message as i18nextKeys
                                    }
                                />
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Box
                        alignItems="center"
                        sx={{
                            mb: 4,
                            mt: 1.5,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Controller
                                    name="terms"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Checkbox
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                            }
                            sx={{
                                "& .MuiFormControlLabel-label": {
                                    fontSize: "0.875rem",
                                },
                            }}
                            label={
                                <>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        <Translations text="I agree to" />{" "}
                                    </Typography>
                                    <LinkStyled
                                        href="/"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Translations text="privacy policy & terms" />
                                    </LinkStyled>
                                </>
                            }
                        />
                        {errors.terms && (
                            <FormHelperText
                                sx={{ color: "error.main", mb: 2 }}
                                id=""
                            >
                                <Translations
                                    text={errors.terms.message as i18nextKeys}
                                />
                            </FormHelperText>
                        )}
                    </Box>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ mb: 7 }}
                    >
                        <Translations text="Sign up" />
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
                            <Translations text="Already have an account?" />
                        </Typography>
                        <Typography variant="body2">
                            <LinkStyled href="/login">
                                <Translations text="Sign in instead" />
                            </LinkStyled>
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            my: (theme) => `${theme.spacing(5)} !important`,
                        }}
                    >
                        <Translations text="or" />
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
                            onClick={(e) => e.preventDefault()}
                        >
                            <Icon icon="mdi:facebook" />
                        </IconButton>
                        <IconButton
                            href="/"
                            component={Link}
                            sx={{ color: "#1da1f2" }}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Icon icon="mdi:twitter" />
                        </IconButton>
                        <IconButton
                            href="/"
                            component={Link}
                            onClick={(e) => e.preventDefault()}
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
                            onClick={(e) => e.preventDefault()}
                        >
                            <Icon icon="mdi:google" />
                        </IconButton>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true
Register.authGuard = false

export default Register
