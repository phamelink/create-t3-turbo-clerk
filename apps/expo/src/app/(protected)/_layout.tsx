import { useEffect } from "react"
import { Redirect, Slot, Stack, Tabs, usePathname } from "expo-router"
import { SignedIn, useAuth } from "@clerk/clerk-expo"
import { FontAwesome } from "@expo/vector-icons"
import { Box, IconButton } from "native-base"

import TabBar from "~/components/TabBar"

const Protected = () => {
    const { signOut, isSignedIn } = useAuth()

    if (!isSignedIn) {
        return <Redirect href="/signin" />
    }
    return (
        <SignedIn>
            <Tabs
                initialRouteName="profile"
                sceneContainerStyle={{
                    backgroundColor: "transparent",
                    paddingHorizontal: 8,
                }}
                screenOptions={{
                    header: () => (
                        <Box w="full" alignItems="flex-end">
                            <IconButton
                                _icon={{
                                    as: FontAwesome,
                                    name: "sign-out",
                                }}
                                h="10"
                                w="10"
                                onPress={() => signOut()}
                            />
                        </Box>
                    ),
                }}
                tabBar={TabBar}
            >
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                    }}
                />
                <Tabs.Screen
                    name="posts"
                    options={{
                        title: "Posts",
                    }}
                />
            </Tabs>
        </SignedIn>
    )
}

export default Protected
