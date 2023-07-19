import { type ReactNode } from "react"
import { SignIn } from "@clerk/nextjs"

import BlankLayout from "~/@core/layouts/BlankLayout"

const SignInPage = () => (
    <main>
        <div>
            <div>
                <h1>Sign In</h1>
                {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
            </div>
        </div>
    </main>
)

SignInPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

SignInPage.guestGuard = true

export default SignInPage
