import React, { useCallback, useEffect } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import Constants from "expo-constants"
import { useFonts } from "expo-font"
import { Slot, Stack, Tabs, usePathname } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import {
    Box,
    Button,
    KeyboardAvoidingView,
    NativeBaseProvider,
} from "native-base"

import { TRPCProvider } from "~/utils/api"
import { tokenCache } from "~/utils/cache"
import { theme } from "~/utils/theme"
import { fonts } from "~/config/fonts"

void SplashScreen.preventAutoHideAsync()

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
    const [fontsLoaded] = useFonts(fonts)
    // const path = usePathname()

    // useEffect(() => {
    //     console.log("PATH", path)
    // }, [path])

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
                <TRPCProvider>
                    <Box
                        safeAreaTop
                        safeAreaX
                        onLayout={() => void onLayoutRootView()}
                        flex={1}
                    >
                        <StatusBar />
                        <Slot />
                    </Box>
                </TRPCProvider>
            </ClerkProvider>
        </NativeBaseProvider>
    )
}

export default RootLayout
