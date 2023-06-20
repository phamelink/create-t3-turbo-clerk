import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <main>
    <div>
      <div>
        <h1>Sign In</h1>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  </main>
);

export default SignUpPage;
