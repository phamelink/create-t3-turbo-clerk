import * as z from "zod"

const SigninSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z.string().nonempty("Please enter a password"),
  // confirmPassword: z
  //   .string()
  //   .min(1, { message: "Confirm Password is required" }),
  // terms: z.boolean().refine((data) => data, {
  //   message: "You must accept terms and conditions",
  // }),
})
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Password don't match",
// });

export default SigninSchema

export type SigninSchemaType = z.infer<typeof SigninSchema>
