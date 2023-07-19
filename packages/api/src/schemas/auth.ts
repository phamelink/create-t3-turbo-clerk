import * as z from "zod"

export const updateProfileSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    birthdate: z.string().datetime().optional(),
})
