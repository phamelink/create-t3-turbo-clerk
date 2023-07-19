import { useCallback } from "react"
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo"
import { AntDesign } from "@expo/vector-icons"
import { Button, Icon } from "native-base"

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser"

WebBrowser.maybeCompleteAuthSession()

const SignInGoogle = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow()

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err)
    }
  }, [])

  return (
    <Button
      onPress={onPress}
      w={200}
      h={44}
      leftIcon={<Icon as={AntDesign} name="google" />}
    >
      Sign in with Google
    </Button>
  )
}
export default SignInGoogle
