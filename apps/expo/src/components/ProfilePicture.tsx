import { use, useEffect, useState } from "react"
import { Entypo } from "@expo/vector-icons"
import {
    Alert,
    AspectRatio,
    Badge,
    Box,
    Icon,
    Image,
    Skeleton,
    ZStack,
} from "native-base"

import { api } from "~/utils/api"
import { useImagePicker } from "~/hooks/useImagePicker"
import useToast from "~/hooks/useToast"
// import Image from "./Image"
import TouchableOpacity from "./NBFactory/TouchableOpacity"

interface ProfilePictureProps {
    isLoading?: boolean
    isEditable?: boolean
    uri?: string | null
}

export default function ProfilePicture({
    isLoading = false,
    isEditable = false,
    uri,
}: ProfilePictureProps) {
    if (isEditable) {
        return <EditPicture isLoading={isLoading} uri={uri} />
    }

    return <ViewPicture isLoading={isLoading} uri={uri} />
}

function ViewPicture({ isLoading = false, uri }: ProfilePictureProps) {
    return (
        <AspectRatio ratio={1} w="1/2" alignSelf="center">
            <Box shadow="9" h="full" w="full" bg="amber.100" rounded="full">
                <Skeleton
                    isLoaded={!isLoading}
                    w="full"
                    h="full"
                    rounded="full"
                >
                    {uri && (
                        <Image
                            source={{
                                uri,
                            }}
                            h="full"
                            w="full"
                            rounded="full"
                            alt="Profile Picture"
                            borderColor="amber.100"
                            borderWidth="4"
                            // placeholder={profilePicture}
                        />
                    )}
                </Skeleton>
            </Box>
        </AspectRatio>
    )
}

function EditPicture({ isLoading = false, uri }: ProfilePictureProps) {
    const { pickImage } = useImagePicker()
    const { showToast } = useToast()

    const utils = api.useContext()

    const handlePickImage = async () => {
        try {
            const image = await pickImage()
            if (!image) {
                return
            }
            showToast({ description: "Uploading image..." })

            const url = await utils.auth.getProfilePictureUploadUrl.fetch()

            if (!url) {
                showToast({
                    error: "Something went wrong while uploading your image.",
                })

                return
            }

            await fetch(url, {
                method: "PUT",
                body: image.imageBody,
            })
        } catch (err) {
            console.log("\n\n\nError uploading image in handlePickImage")
            console.error(JSON.stringify(err, null, 2))
            showToast({
                error: "Something went wrong while uploading your image.",
            })
        }
    }

    return (
        <AspectRatio ratio={1} w="1/2" alignSelf="center">
            <ZStack justifyContent="flex-end" alignItems="flex-end">
                <Box shadow="9" h="full" w="full" bg="amber.100" rounded="full">
                    <Skeleton
                        isLoaded={!isLoading}
                        w="full"
                        h="full"
                        rounded="full"
                    >
                        {uri && (
                            <Image
                                source={{
                                    uri,
                                }}
                                h="full"
                                w="full"
                                rounded="full"
                                alt="Profile Picture"
                                borderColor="amber.100"
                                borderWidth="4"
                            />
                        )}
                    </Skeleton>
                </Box>
                <AspectRatio ratio={1} w="1/3" bg="amber.100" rounded="full">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handlePickImage}
                    >
                        <Badge
                            bg="darkBlue.200"
                            rounded="full"
                            borderColor="amber.100"
                            borderWidth="4"
                            w="full"
                            h="full"
                        >
                            <Icon as={Entypo} name="edit" size="lg" />
                        </Badge>
                    </TouchableOpacity>
                </AspectRatio>
            </ZStack>
        </AspectRatio>
    )
}
