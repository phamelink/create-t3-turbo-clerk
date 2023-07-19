import { type UserRole } from "@acme/db"

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: UserRole) => {
    if (role === "CLIENT") return "/acl"
    else return "/home"
}

export default getHomeRoute
