import * as z from "zod"

export const ClerkErrorSchema = z.object({
  status: z.number(),
  clerkError: z.boolean(),
  errors: z.array(
    z.object({
      code: z.string(),
      message: z.string(),
      longMessage: z.string(),
      meta: z.object({
        paramName: z.string(),
      }),
    }),
  ),
})
