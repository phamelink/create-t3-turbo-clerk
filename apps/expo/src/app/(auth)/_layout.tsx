import { Redirect, Slot, Stack, Tabs } from "expo-router"
import { SignedOut, useAuth } from "@clerk/clerk-expo"
import { Box, Center, Heading, VStack } from "native-base"

import SignInApple from "~/components/SignInApple"
import SignInGoogle from "~/components/SigninGoogle"

const Auth = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href="/" />
  }

  return (
    <SignedOut>
      <VStack flex={1} px="6" justifyContent="space-between">
        <Heading mt="12" textAlign="left">
          Welcome to this app!
        </Heading>

        <Box>
          <Slot />
        </Box>
        <Center>
          <SignInApple />
          <SignInGoogle />
        </Center>
      </VStack>
    </SignedOut>
  )
}

export default Auth
