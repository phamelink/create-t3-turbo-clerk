import React, { useState } from "react"
import { useSignUp } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Heading, Text, VStack } from "native-base"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import FormControllerTextInput from "~/components/FormControllerTextInput"

const Verify = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [loading, setLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { control: controlOTP, handleSubmit: handleSubmitOTP } = useForm<{
        otp: string
    }>({
        resolver: zodResolver(
            z.object({
                otp: z.string().nonempty(),
            }),
        ),
    })

    // This verifies the user using email code that is delivered.
    const onPressVerify = async (data: { otp: string }) => {
        if (!isLoaded || loading) {
            return
        }
        setLoading(true)

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: data.otp,
                },
            )

            await setActive({ session: completeSignUp.createdSessionId })
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
                name="otp"
                label="6-digit verification code:"
                required
            />

            <Button
                mt="12"
                onPress={handleSubmitOTP(onPressVerify)}
                isLoading={loading}
            >
                Verify Email
            </Button>
            {errorMessage && <Text color="error.400">{errorMessage}</Text>}
        </VStack>
    )
}

export default Verify
