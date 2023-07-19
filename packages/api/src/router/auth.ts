import {
    getProfile,
    getProfilePictureUploadUrl,
    getProfilePictureUrl,
    updateProfile,
} from "../controllers/auth"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
    getSession: publicProcedure.query(({ ctx }) => {
        return !ctx.auth.session
    }),
    getSecretMessage: protectedProcedure.query(() => {
        return "you can see this secret message!"
    }),
    getProfile,
    updateProfile,
    getProfilePictureUploadUrl,
    getProfilePictureUrl,
})
