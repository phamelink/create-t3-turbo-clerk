import { Link, Redirect, Slot, Stack, Tabs, usePathname } from "expo-router"
import { SignedOut, useAuth } from "@clerk/clerk-expo"
import { AntDesign } from "@expo/vector-icons"
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Icon,
    IconButton,
    Text,
    VStack,
} from "native-base"

import SignInApple from "~/components/SignInApple"
import SignInGoogle from "~/components/SigninGoogle"

function getText(
    path:
        | "/signin"
        | "/signup"
        | "/verify"
        | "/forgotPassword"
        | "/resetPassword"
        | string,
) {
    switch (path) {
        case "/signin":
            return {
                heading: "Sign in to continue!",
                text: "Don't have an account?",
                linkLabel: "Register",
                link: "/signup",
            }
        case "/signup":
            return {
                heading: "Register to continue!",
                text: "Already have an account?",
                linkLabel: "Sign in",
                link: "/signin",
            }
        case "/verify":
            return {
                heading: "Verify your email!",
                text: null,
                linkLabel: null,
                link: null,
            }
        case "/forgotPassword":
            return {
                heading: "Forgot your password?",
                text: null,
                linkLabel: null,
                link: null,
            }
        case "/resetPassword":
            return {
                heading: "Reset your password with the code we sent you!",
                text: null,
                linkLabel: null,
                link: null,
            }
        default:
            return {
                heading: null,
                text: null,
                linkLabel: null,
                link: null,
            }
    }
}

const Auth = () => {
    const { isSignedIn } = useAuth()
    const path = usePathname()

    if (isSignedIn) {
        return <Redirect href="/" />
    }

    const { heading, text, link, linkLabel } = getText(path)

    return (
        <SignedOut>
            <VStack
                flex={1}
                px="6"
                justifyContent="space-between"
                safeAreaBottom
            >
                {heading && (
                    <Heading mt="12" textAlign="left">
                        {heading}
                    </Heading>
                )}
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            backgroundColor: "transparent",
                        },
                        animation: "none",
                    }}
                >
                    {/* <Stack.Screen
            name="forgotPassword"
            options={{
              headerShown: true,
              headerBackground: () => null,
              title: "",
              headerRight: () => (
                <Link href="/signin" asChild>
                  <IconButton icon={<Icon as={AntDesign} name="close" />} />
                </Link>
              ),
              headerBackVisible: false,
              // presentation: "modal",
              // contentStyle: {
              //   backgroundColor: "white",
              // },
              // animation: "default",
            }}
          /> */}
                </Stack>
                {path === "/signin" || path === "/signup" ? (
                    <Center pt="3">
                        <Flex
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Divider flex={1} orientation="horizontal" />
                            <Text color="warmGray.400" m="4">
                                Or continue with
                            </Text>
                            <Divider flex={1} orientation="horizontal" />
                        </Flex>
                        <VStack space={2}>
                            <SignInApple />
                            <SignInGoogle />
                        </VStack>
                        {text && link && linkLabel && (
                            <Box
                                mt="3"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="row"
                            >
                                <Text>{text}</Text>
                                <Link href={link} asChild>
                                    <Button
                                        variant="unstyled"
                                        _text={{
                                            fontSize: "sm",
                                            color: "warmGray.600",
                                            underline: true,
                                        }}
                                    >
                                        {linkLabel}
                                    </Button>
                                </Link>
                            </Box>
                        )}
                    </Center>
                ) : null}
            </VStack>
        </SignedOut>
    )
}

export default Auth
