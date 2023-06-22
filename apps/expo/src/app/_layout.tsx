import React, { useCallback, useEffect } from "react"
import { Platform } from "react-native"
import Constants from "expo-constants"
import { useFonts } from "expo-font"
import { Stack, Tabs, usePathname } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { ClerkProvider } from "@clerk/clerk-expo"
import {
  Box,
  Button,
  KeyboardAvoidingView,
  NativeBaseProvider,
} from "native-base"

import { tokenCache } from "~/utils/cache"
import { theme } from "~/utils/theme"
import { fonts } from "~/config/fonts"

void SplashScreen.preventAutoHideAsync()

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [fontsLoaded] = useFonts(fonts)
  const path = usePathname()

  useEffect(() => {
    console.log("PATH", path)
  }, [path])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={theme}>
      <ClerkProvider
        publishableKey={
          Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
        }
        tokenCache={tokenCache}
      >
        {/* <TRPCProvider> */}
        <Box
          bg="amber.100"
          safeArea
          onLayout={() => void onLayoutRootView()}
          flex={1}
        >
          <KeyboardAvoidingView
            flex={1}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <StatusBar />
            <Stack
              screenOptions={({ route, navigation }) => ({
                headerShown: true,
                contentStyle: {
                  backgroundColor: "transparent",
                },
                // headerRight: (props) => (
                //   <Button
                //     onPress={() => {
                //       console.log(route)
                //       navigation.navigate("_sitemap")
                //     }}
                //   >
                //     go
                //   </Button>
                // ),
              })}
            ></Stack>
          </KeyboardAvoidingView>
        </Box>
        {/* </TRPCProvider> */}
      </ClerkProvider>
    </NativeBaseProvider>
  )
}

export default RootLayout
