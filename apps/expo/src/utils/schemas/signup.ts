import * as z from "zod"

const SignupSchema = z
  .object({
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    terms: z.boolean().refine((data) => data, {
      message: "You must accept terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  })

export default SignupSchema

export type SignupSchemaType = z.infer<typeof SignupSchema>
