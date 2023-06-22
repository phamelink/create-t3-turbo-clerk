import { Redirect, Slot, Stack } from "expo-router"
import { SignedIn, useAuth } from "@clerk/clerk-expo"
import { FontAwesome } from "@expo/vector-icons"
import { IconButton } from "native-base"

import { TRPCProvider } from "~/utils/api"

const Protected = () => {
  const { signOut, isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/signin" />
  }
  return (
    <TRPCProvider>
      <SignedIn>
        <Stack
          initialRouteName="/"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <IconButton
                _icon={{
                  as: FontAwesome,
                  name: "sign-out",
                }}
                onPress={() => signOut()}
              />
            ),
          }}
        />
        {/* <Slot /> */}
      </SignedIn>
    </TRPCProvider>
  )
}

export default Protected
