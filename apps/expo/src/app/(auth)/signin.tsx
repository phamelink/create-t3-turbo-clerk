import React, { useState } from "react"
import { InputAccessoryView } from "react-native"
import { Link } from "expo-router"
import { useSignIn } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Center, Heading, Text } from "native-base"
import { useForm } from "react-hook-form"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import SigninSchema, { type SigninSchemaType } from "~/utils/schemas/signin"
import VStack from "~/components/DismissKeyboard/VStack"
import FormControllerTextInput from "~/components/FormControllerTextInput"
import SignInApple from "~/components/SignInApple"
import SignInGoogle from "~/components/SigninGoogle"

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm<SigninSchemaType>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "philip.hamelink@gmail.com",
            password: "123456",
        },
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async (data: SigninSchemaType) => {
        if (!isLoaded || loading) {
            return
        }
        setLoading(true)

        try {
            const completeSignIn = await signIn.create({
                identifier: data.email,
                password: data.password,
            })
            await setActive({ session: completeSignIn.createdSessionId })
        } catch (err: unknown) {
            const result = ClerkErrorSchema.safeParse(err)
            if (result.success) {
                if (result.data.errors[0]?.message) {
                    setErrorMessage(result.data.errors[0].message)
                } else if (result.data.status === 500) {
                    setErrorMessage(
                        "Internal server error, please try again later.",
                    )
                }
            } else {
                setErrorMessage("An error has occured, please try again later.")
            }

            console.error(JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack space={4} mt="8" flex={1} justifyContent="flex-start">
            <FormControllerTextInput
                control={control}
                name="email"
                label="Email:"
                required
                returnKeyType="next"
                keyboardType="email-address" // to add @ on the keyboard
                autoCapitalize="none" // no uppercase please
                autoComplete="email" // for android
                autoCorrect={false}
            />

            <FormControllerTextInput
                control={control}
                name="password"
                label="Password:"
                required
                password
            />
            {errorMessage && <Text color="error.400">{errorMessage}</Text>}
            <Box alignItems="flex-end">
                <Link href="/forgotPassword" asChild>
                    <Button
                        variant="ghost"
                        _text={{
                            fontSize: "md",
                            color: "warmGray.600",
                            underline: true,
                        }}
                    >
                        Forgot password
                    </Button>
                </Link>
            </Box>
            <Box flex={1} />
            <Button my="6" onPress={handleSubmit(onSubmit)} isLoading={loading}>
                Sign in
            </Button>
        </VStack>
    )
}

export default SignIn
