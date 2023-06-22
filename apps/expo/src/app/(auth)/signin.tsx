import React, { useState } from "react"
import { Link } from "expo-router"
import { useSignIn } from "@clerk/clerk-expo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Center, Heading, Text, VStack } from "native-base"
import { useForm } from "react-hook-form"

import { ClerkErrorSchema } from "~/utils/schemas/clerkError"
import SigninSchema, { type SigninSchemaType } from "~/utils/schemas/signin"
import FormControllerTextInput from "~/components/FormControllerTextInput"

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
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
        Sign in to continue!
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
        />

        <Button my="12" onPress={handleSubmit(onSubmit)} isLoading={loading}>
          Sign in
        </Button>
        {errorMessage && <Text color="error.400">{errorMessage}</Text>}
        <Center>
          <Text fontSize="md">Don&#39;t have an account ?</Text>

          <Link href="/signup" asChild>
            <Button
              variant="ghost"
              _text={{
                fontSize: "md",
                color: "warmGray.600",
                underline: true,
              }}
            >
              Sign up instead!
            </Button>
          </Link>
        </Center>
      </VStack>
    </Box>
  )
}

export default SignIn
