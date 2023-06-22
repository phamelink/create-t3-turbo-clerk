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
  VStack,
} from "native-base"
import { Controller, useForm } from "react-hook-form"

import { ClerkErrorSchema } from "~/utils/schemas/clerkError"
import SignupSchema, { type SignupSchemaType } from "~/utils/schemas/signup"
import FormControllerTextInput from "~/components/FormControllerTextInput"

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
    <Box>
      <Heading
        size="md"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControllerTextInput
          control={control}
          name="email"
          label="Email:"
          required
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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

        <Button
          mt="12"
          onPress={handleSubmit(onSignUpPress)}
          isLoading={loading}
        >
          Sign up
        </Button>
        {errorMessage && <Text color="error.400">{errorMessage}</Text>}
        <Center>
          <Text fontSize="md">Already have an account ?</Text>
          <Link href="/signin" asChild>
            <Button
              variant="ghost"
              _text={{
                fontSize: "md",
                color: "warmGray.600",
                underline: true,
              }}
            >
              Sign in instead
            </Button>
          </Link>
        </Center>
      </VStack>
    </Box>
  )
}

export default SignUp
