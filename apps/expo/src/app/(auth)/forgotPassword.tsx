import React, { useState } from "react"
import { useRouter } from "expo-router"
import { useSignIn } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Text } from "native-base"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import VStack from "~/components/DismissKeyboard/VStack"
import FormControllerTextInput from "~/components/FormControllerTextInput"

const zodSchema = z.object({
    email: z.string().email(),
})

type SchemaType = z.infer<typeof zodSchema>

const ForgotPassword = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { control: controlOTP, handleSubmit: handleSubmitOTP } =
        useForm<SchemaType>({
            resolver: zodResolver(zodSchema),
        })

    // This verifies the user using email code that is delivered.
    const onPressForgot = async (data: SchemaType) => {
        if (!isLoaded || loading) {
            return
        }
        setLoading(true)

        try {
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: data.email,
            })

            router.replace("/resetPassword")
        } catch (err: unknown) {
            const result = ClerkErrorSchema.safeParse(err)
            if (result.success) {
                setErrorMessage(result.data.errors[0]?.message ?? null)
            } else {
                setErrorMessage("An error has occured, please try again later.")
            }

            console.error(JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack space={3} mt="5">
            <FormControllerTextInput
                control={controlOTP}
                name="email"
                label="Enter your email address:"
                required
            />
            <Button
                mt="12"
                onPress={handleSubmitOTP(onPressForgot)}
                isLoading={loading}
            >
                Send password reset code
            </Button>
            {errorMessage && <Text color="error.400">{errorMessage}</Text>}
            <Button
                mt="6"
                variant="outline"
                onPress={() => router.replace("/signin")}
            >
                Cancel
            </Button>
        </VStack>
    )
}

export default ForgotPassword
