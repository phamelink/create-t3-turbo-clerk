// ** React Imports
import { useEffect, type ReactNode } from "react"
// ** Next Import
import { useRouter } from "next/router"
import { useAuth } from "@clerk/nextjs"
import Spinner from "src/@core/components/spinner"
import BlankLayout from "src/@core/layouts/BlankLayout"
// ** Types

// ** Config Import
import { buildAbilityFor, type ACLObj, type AppAbility } from "src/configs/acl"
// ** Context Imports
import { AbilityContext } from "src/layouts/components/acl/Can"
// ** Util Import
import getHomeRoute from "src/layouts/components/acl/getHomeRoute"
// ** Component Import
import NotAuthorized from "src/pages/401"

import { api } from "~/utils/api"

interface AclGuardProps {
    children: ReactNode
    authGuard?: boolean
    guestGuard?: boolean
    aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
    // ** Props
    const {
        aclAbilities,
        children,
        guestGuard = false,
        authGuard = true,
    } = props

    // ** Hooks
    const { isSignedIn } = useAuth()
    const { data: user } = api.auth.getProfile.useQuery(undefined, {
        enabled: isSignedIn,
    })
    const router = useRouter()

    // ** Vars
    let ability: AppAbility | undefined

    useEffect(() => {
        // console.log("AclGuard: ISSIGNED IN", isSignedIn)
        if (user && user.role && !guestGuard && router.route === "/") {
            const homeRoute = getHomeRoute(user.role)
            router.replace(homeRoute)
        }
    }, [user, guestGuard, router])

    // User is logged in, build ability for the user based on his role
    if (user && !ability) {
        ability = buildAbilityFor(user.role, aclAbilities.subject)
        if (router.route === "/") {
            return <Spinner />
        }
    }

    // If guest guard or no guard is true or any error page
    if (
        guestGuard ||
        router.route === "/404" ||
        router.route === "/500" ||
        !authGuard
    ) {
        // If user is logged in and his ability is built
        if (user && ability) {
            return (
                <AbilityContext.Provider value={ability}>
                    {children}
                </AbilityContext.Provider>
            )
        } else {
            // If user is not logged in (render pages like login, register etc..)
            return <>{children}</>
        }
    }

    // Check the access of current user and render pages
    if (
        ability &&
        user &&
        ability.can(aclAbilities.action, aclAbilities.subject)
    ) {
        if (router.route === "/") {
            return <Spinner />
        }

        return (
            <AbilityContext.Provider value={ability}>
                {children}
            </AbilityContext.Provider>
        )
    }

    // Render Not Authorized component if the current user has limited access
    return (
        <BlankLayout>
            <NotAuthorized />
        </BlankLayout>
    )
}

export default AclGuard
