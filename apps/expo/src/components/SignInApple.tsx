import { useCallback } from "react"
import { Button } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo"

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser"

WebBrowser.maybeCompleteAuthSession()

const SignInApple = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow()

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
      }
    } catch (err) {
      console.error("OAuth error", err)
    }
  }, [])

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={4}
      style={{ width: 200, height: 44 }}
      onPress={onPress}
    />
  )
}
export default SignInApple
