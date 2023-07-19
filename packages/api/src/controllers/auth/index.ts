import schemas from "../../schemas"
import { protectedProcedure } from "../../trpc"
import { blurhashFromURL } from "../../utils/blurhashFromUrl"
import {
    generateReadSignedUrl,
    generateWriteSignedUrl,
} from "../../utils/signedUrls"

export const getProfile = protectedProcedure.query(({ ctx }) => {
    const { auth, prisma } = ctx
    return prisma.user.findUnique({
        where: {
            id: auth.userId,
        },
    })
})

export const updateProfile = protectedProcedure
    .input(schemas.auth.updateProfileSchema)
    .mutation(({ ctx, input }) => {
        const { auth, prisma } = ctx

        return prisma.user.update({
            where: {
                id: auth.userId,
            },
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                birthdate: input.birthdate,
            },
        })
    })

export const getProfilePictureUploadUrl = protectedProcedure.query(
    ({ ctx }) => {
        const { auth } = ctx

        const filePath = `profilePicture/${auth.userId}`

        return generateWriteSignedUrl(filePath)
    },
)

export const getProfilePictureUrl = protectedProcedure.query(({ ctx }) => {
    const { auth } = ctx

    const filePath = `profilePicture/${auth.userId}`

    return generateReadSignedUrl(filePath)
})
