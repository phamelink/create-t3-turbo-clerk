/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ** React Imports
import { useEffect, useState, type ReactElement, type ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps, AppType } from "next/app"
// ** Next Imports
import Head from "next/head"
import { Router } from "next/router"
import type { EmotionCache } from "@emotion/cache"
// ** Emotion Imports
import { CacheProvider } from "@emotion/react"
import { appWithTranslation } from "next-i18next"
// ** Loader Import
import NProgress from "nprogress"
// ** Third Party Import
import { Toaster } from "react-hot-toast"
import AclGuard from "src/@core/components/auth/AclGuard"
import AuthGuard from "src/@core/components/auth/AuthGuard"
import GuestGuard from "src/@core/components/auth/GuestGuard"
// ** Spinner Import
import Spinner from "src/@core/components/spinner"
// ** Contexts
import {
    SettingsConsumer,
    SettingsProvider,
    type PageSpecificSettings,
} from "src/@core/context/settingsContext"
// ** Styled Components
import ReactHotToast from "src/@core/styles/libs/react-hot-toast"
import ThemeComponent from "src/@core/theme/ThemeComponent"
// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache"
// ** Config Imports

import { defaultACLObj, type ACLObj } from "src/configs/acl"
import themeConfig from "src/configs/themeConfig"
// ** Component Imports
import UserLayout from "src/layouts/UserLayout"

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css"
import "src/iconify-bundle/icons-bundle-react"

import { ClerkProvider } from "@clerk/nextjs"

import "src/configs/i18n"

import { enUS, frFR } from "@clerk/localizations"
import i18next from "i18next"

import { api } from "~/utils/api"

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
    Component: NextPage & {
        acl?: ACLObj
        guestGuard?: boolean
        authGuard?: boolean
        getLayout?: (page: ReactElement) => ReactNode
        setConfig?: () => void | PageSpecificSettings
        contentHeightFixed?: boolean
    }
    emotionCache: EmotionCache
}

type GuardProps = {
    authGuard: boolean
    guestGuard: boolean
    children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
    Router.events.on("routeChangeStart", () => {
        NProgress.start()
    })
    Router.events.on("routeChangeError", () => {
        NProgress.done()
    })
    Router.events.on("routeChangeComplete", () => {
        NProgress.done()
    })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    if (guestGuard) {
        return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
        return <>{children}</>
    } else {
        return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props

    const [clerkLanguage, setLanguage] = useState(enUS)

    // Variables
    const contentHeightFixed = Component.contentHeightFixed ?? false
    const getLayout =
        Component.getLayout ??
        ((page: ReactNode) => (
            <UserLayout contentHeightFixed={contentHeightFixed}>
                {page}
            </UserLayout>
        ))

    const setConfig = Component.setConfig ?? undefined

    const authGuard = Component.authGuard ?? true

    const guestGuard = Component.guestGuard ?? false

    const aclAbilities = Component.acl ?? defaultACLObj

    useEffect(() => {
        i18next.on("languageChanged", (lng) => {
            if (lng === "fr") {
                setLanguage(frFR)
            } else {
                setLanguage(enUS)
            }
        })

        return () => {
            i18next.off("languageChanged")
        }
    }, [])

    return (
        <ClerkProvider {...pageProps} localization={clerkLanguage}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
                    <meta
                        name="description"
                        content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
                    />
                    <meta
                        name="keywords"
                        content="Material Design, MUI, Admin Template, React Admin Template"
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>

                <SettingsProvider
                    {...(setConfig ? { pageSettings: setConfig() } : {})}
                >
                    <SettingsConsumer>
                        {({ settings }) => {
                            return (
                                <ThemeComponent settings={settings}>
                                    <Guard
                                        authGuard={authGuard}
                                        guestGuard={guestGuard}
                                    >
                                        <AclGuard
                                            aclAbilities={aclAbilities}
                                            guestGuard={guestGuard}
                                            authGuard={authGuard}
                                        >
                                            {getLayout(
                                                <Component {...pageProps} />,
                                            )}
                                        </AclGuard>
                                    </Guard>
                                    <ReactHotToast>
                                        <Toaster
                                            position={settings.toastPosition}
                                            toastOptions={{
                                                className: "react-hot-toast",
                                            }}
                                        />
                                    </ReactHotToast>
                                </ThemeComponent>
                            )
                        }}
                    </SettingsConsumer>
                </SettingsProvider>
            </CacheProvider>
        </ClerkProvider>
    )
}

export default api.withTRPC(appWithTranslation(App))
