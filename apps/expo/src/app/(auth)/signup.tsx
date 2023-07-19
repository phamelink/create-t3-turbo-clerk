import React, { useState } from "react"
import { Link, useRouter } from "expo-router"
import { useSignUp } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Box,
    Button,
    Center,
    Checkbox,
    FormControl,
    Heading,
    Text,
} from "native-base"
import { Controller, useForm } from "react-hook-form"

import { ClerkErrorSchema } from "@acme/api/src/schemas/common/clerk"

import SignupSchema, { type SignupSchemaType } from "~/utils/schemas/signup"
import VStack from "~/components/DismissKeyboard/VStack"
import FormControllerTextInput from "~/components/FormControllerTextInput"
import SignInApple from "~/components/SignInApple"
import SignInGoogle from "~/components/SigninGoogle"

const SignUp = () => {
    const { isLoaded, signUp } = useSignUp()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema),
    })
    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSignUpPress = async (data: SignupSchemaType) => {
        if (!isLoaded || loading) {
            return
        }
        setLoading(true)

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            })

            // send the email.
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            })

            router.replace("/verify")
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
        <VStack space={2} mt="8" flex={1} justifyContent="flex-start">
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
            <FormControllerTextInput
                control={control}
                name="confirmPassword"
                label="Confirm password:"
                required
                password
            />

            <Controller
                control={control}
                name="terms"
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FormControl isInvalid={!!error}>
                        <Checkbox onChange={onChange} value={String(value)}>
                            {" "}
                            Accept terms and conditions?
                        </Checkbox>
                        <FormControl.ErrorMessage>
                            {error?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                )}
            />
            {errorMessage && <Text color="error.400">{errorMessage}</Text>}
            <Box flex={1} />
            <Button
                my="6"
                onPress={handleSubmit(onSignUpPress)}
                isLoading={loading}
            >
                Sign up
            </Button>
        </VStack>
    )
}

export default SignUp
