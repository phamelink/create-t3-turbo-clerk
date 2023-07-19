// ** React Imports
import { useEffect, type ReactElement, type ReactNode } from "react"
// ** Next Import
import { useRouter } from "next/router"
import { useAuth } from "@clerk/nextjs"

import { api } from "~/utils/api"

interface AuthGuardProps {
    children: ReactNode
    fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children, fallback } = props
    const auth = useAuth()
    const router = useRouter()

    useEffect(
        () => {
            if (!router.isReady) {
                return
            }

            if (!auth.isSignedIn) {
                if (router.asPath !== "/") {
                    router.replace({
                        pathname: "/login",
                        query: { returnUrl: router.asPath },
                    })
                } else {
                    router.replace("/login")
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.route],
    )

    if (!auth.isLoaded) {
        return fallback
    }

    return <>{children}</>
}

export default AuthGuard
