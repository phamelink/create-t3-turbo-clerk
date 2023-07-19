// ** React Imports
import { useEffect, type ReactElement, type ReactNode } from "react"
// ** Next Import
import { useRouter } from "next/router"
import { useAuth } from "@clerk/nextjs"

import { api } from "~/utils/api"

interface GuestGuardProps {
    children: ReactNode
    fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
    const { children, fallback } = props
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) {
            return
        }

        if (auth.isSignedIn) {
            router.replace("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.route])

    if (!auth.isLoaded) {
        return fallback
    }

    return <>{children}</>
}

export default GuestGuard
