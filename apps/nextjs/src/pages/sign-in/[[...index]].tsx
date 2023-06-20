import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <main>
    <div>
      <div>
        <h1>Sign In</h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  </main>
);

export default SignInPage;
