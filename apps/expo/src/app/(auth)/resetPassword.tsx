import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { useSignIn, useSignUp } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Heading, Text } from "native-base"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import VStack from "~/components/DismissKeyboard/VStack"
import FormControllerTextInput from "~/components/FormControllerTextInput"

const zodSchema = z
    .object({
        code: z.string().min(1, { message: "Code is required" }),
        password: z
            .string()
            .min(8, { message: "Password must be atleast 8 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    })

type SchemaType = z.infer<typeof zodSchema>

const ResetPassword = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { control: controlOTP, handleSubmit: handleSubmitOTP } =
        useForm<SchemaType>({
            resolver: zodResolver(zodSchema),
        })

    // This verifies the user using email code that is delivered.
    const onPressReset = async (data: SchemaType) => {
        if (!isLoaded || loading) {
            return
        }
        setLoading(true)

        try {
            const completeSignIn = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: data.code,
                password: data.password,
            })

            await setActive({ session: completeSignIn.createdSessionId })
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
                name="code"
                label="Reset Code"
                required
            />
            <FormControllerTextInput
                control={controlOTP}
                name="password"
                label="New password"
                required
            />
            <FormControllerTextInput
                control={controlOTP}
                name="confirmPassword"
                label="Confirm new password"
                required
            />
            <Button
                mt="12"
                onPress={handleSubmitOTP(onPressReset)}
                isLoading={loading}
            >
                Reset Password
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

export default ResetPassword
