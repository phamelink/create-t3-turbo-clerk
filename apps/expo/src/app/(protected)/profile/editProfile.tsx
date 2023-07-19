import { useEffect } from "react"
import { useRouter } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Heading, VStack } from "native-base"
import { useForm } from "react-hook-form"

import schemas from "@acme/api/src/schemas"

import { api } from "~/utils/api"
import FormControllerTextInput from "~/components/FormControllerTextInput"
import ProfilePicture from "~/components/ProfilePicture"
import useToast from "~/hooks/useToast"

type FormValues = Zod.infer<typeof schemas.auth.updateProfileSchema>

const EditProfile = () => {
    const { data: profile, isLoading: isLoadingProfile } =
        api.auth.getProfile.useQuery()
    const router = useRouter()
    const { showToast } = useToast()
    const utils = api.useContext()

    const { data: profilePictureUrl, isLoading: isLoadingProfilePictureUrl } =
        api.auth.getProfilePictureUrl.useQuery()

    const { control, handleSubmit } = useForm<FormValues>({
        resolver: zodResolver(schemas.auth.updateProfileSchema),
        defaultValues: profile
            ? {
                  firstname: profile.firstname ? profile.firstname : undefined,
                  lastname: profile.lastname ? profile.lastname : undefined,
                  birthdate: profile.birthdate?.toISOString() ?? undefined,
              }
            : undefined,
    })

    const { mutate: updateProfile, isLoading: isLoadingMutation } =
        api.auth.updateProfile.useMutation({
            onSettled: () => utils.auth.getProfile.invalidate(),
            onMutate: () =>
                showToast({
                    description: "Updating profile...",
                    duration: 10000,
                }),
            onSuccess: () =>
                showToast({
                    description: "Profile updated successfully!",
                    status: "success",
                    duration: 10000,
                }),
            onError: (error) => showToast({ error: error.message }),
        })

    const onSubmit = async (formData: FormValues) => {
        console.log(formData, profile)
        if (
            (formData.birthdate &&
                profile?.birthdate?.toISOString() !== formData.birthdate) ||
            profile?.firstname !== formData.firstname ||
            profile?.lastname !== formData.lastname
        ) {
            updateProfile(formData)
        }
    }

    const isLoading = isLoadingMutation || isLoadingProfile

    return (
        <Box m="4" p="6" bg="amber.100" flex={1} borderRadius="2xl" shadow="3">
            <Heading my="4" color="darkBlue.700" textAlign="center">
                Edit profile
            </Heading>
            <ProfilePicture
                isLoading={isLoadingProfile || isLoadingProfilePictureUrl}
                uri={profilePictureUrl}
                isEditable
            />

            <VStack mt="12" alignItems="center">
                <FormControllerTextInput
                    control={control}
                    name="firstname"
                    label="Firstname:"
                    placeholder="John"
                    bg="gray.50"
                    _focus={{ backgroundColor: "gray.50:alpha.70" }}
                />
                <FormControllerTextInput
                    control={control}
                    name="lastname"
                    label="Lastname:"
                    placeholder="Doe"
                    bg="gray.50"
                    _focus={{ backgroundColor: "gray.50:alpha.70" }}
                />
                <FormControllerTextInput
                    control={control}
                    name="birthdate"
                    label="Birthdate:"
                    isDate
                />
            </VStack>

            <Box flex={1} />
            <Button
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                shadow="2"
            >
                Update Profile
            </Button>
            <Button
                variant="outline"
                mt="2"
                bg="gray.100"
                onPress={() => router.push("/profile")}
                shadow="2"
            >
                Cancel
            </Button>
        </Box>
    )
}

export default EditProfile
