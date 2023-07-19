import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

// export default (req, _res: any) => {
//     return NextResponse.next(req)
// }
export default authMiddleware({
    publicRoutes: ["/login", "/register"],
    signInUrl: "/login",
    // publicRoutes: ["/login", "/register", "/forgot-password"],
    // ignoredRoutes: ["/api/webhooks/user"],
})

// Stop Middleware running on static files
export const config = {
    matcher: [
        /*
         * Match request paths except for the ones starting with:
         * - _next
         * - static (static files)
         * - favicon.ico (favicon file)
         *
         * This includes images, and requests from TRPC.
         */
        "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico|api/webhooks/user).*)",
    ],
}
