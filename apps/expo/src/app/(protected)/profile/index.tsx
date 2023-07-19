import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import {
    Alert,
    AspectRatio,
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Skeleton,
    Text,
} from "native-base"

import { api } from "~/utils/api"
import ProfilePicture from "~/components/ProfilePicture"
import useToast from "~/hooks/useToast"

const Profile = () => {
    const {
        data: profile,
        error,
        isLoading: isLoadingProfile,
    } = api.auth.getProfile.useQuery()
    const router = useRouter()
    const { showToast } = useToast()
    const { data: profilePictureUrl, isLoading: isLoadingProfilePictureUrl } =
        api.auth.getProfilePictureUrl.useQuery()

    useEffect(() => {
        if (error) {
            showToast({ error: error.message })
        }
    }, [error])

    return (
        <Box m="4" p="6" bg="amber.100" flex={1} borderRadius="2xl" shadow="3">
            <Heading my="4" color="darkBlue.700" textAlign="center">
                Profile
            </Heading>
            <ProfilePicture
                uri={profilePictureUrl}
                isLoading={isLoadingProfile || isLoadingProfilePictureUrl}
            />

            <HStack mt="12" alignItems="center">
                <Text color="warmGray.600" fontSize="lg">
                    Email:{" "}
                </Text>
                <Skeleton.Text lines={1} flex={1} isLoaded={!isLoadingProfile}>
                    <Text color="warmGray.600" fontSize="lg" fontWeight="bold">
                        {profile?.email ?? "No email"}
                    </Text>
                </Skeleton.Text>
            </HStack>
            <HStack mt="4" alignItems="center">
                <Text color="warmGray.600" fontSize="lg">
                    ID:{" "}
                </Text>
                <Skeleton.Text lines={1} flex={1} isLoaded={!isLoadingProfile}>
                    <Text color="warmGray.600" fontSize="md" fontWeight="bold">
                        {profile?.id ?? "No email"}
                    </Text>
                </Skeleton.Text>
            </HStack>
            <HStack mt="4" alignItems="center">
                <Text color="warmGray.600" fontSize="lg">
                    Firstname:{" "}
                </Text>
                <Skeleton.Text lines={1} flex={1} isLoaded={!isLoadingProfile}>
                    <Text color="warmGray.600" fontSize="md" fontWeight="bold">
                        {profile?.firstname ?? "Not given"}
                    </Text>
                </Skeleton.Text>
            </HStack>
            <HStack mt="4" alignItems="center">
                <Text color="warmGray.600" fontSize="lg">
                    Lastname:{" "}
                </Text>
                <Skeleton.Text lines={1} flex={1} isLoaded={!isLoadingProfile}>
                    <Text color="warmGray.600" fontSize="md" fontWeight="bold">
                        {profile?.lastname ?? "Not given"}
                    </Text>
                </Skeleton.Text>
            </HStack>
            <HStack mt="4" alignItems="center">
                <Text color="warmGray.600" fontSize="lg">
                    Birthdate:{" "}
                </Text>
                <Skeleton.Text lines={1} flex={1} isLoaded={!isLoadingProfile}>
                    <Text color="warmGray.600" fontSize="md" fontWeight="bold">
                        {profile?.birthdate?.toDateString() ?? "Not given"}
                    </Text>
                </Skeleton.Text>
            </HStack>
            <Box flex={1} />
            <Button
                onPress={() => router.push("./profile/editProfile")}
                isLoading={isLoadingProfile}
                shadow="2"
            >
                Edit Profile
            </Button>
        </Box>
    )
}

export default Profile
