import React, { useEffect } from "react"
import { InputAccessoryView, TextInput } from "react-native"
import { isLoading } from "expo-font"
import {
    AspectRatio,
    Box,
    Button,
    Image,
    ScrollView,
    Skeleton,
} from "native-base"

import { api } from "~/utils/api"
import DKBox from "~/components/DismissKeyboard/Box"

const Index = () => {
    return (
        <Box flex={1} bg="white">
            <Button>Invalidate</Button>
            <AspectRatio
                ratio={1}
                w="1/2"
                alignSelf="center"
                shadow="9"
                rounded="full"
                bg="amber.100"
            >
                <Skeleton isLoaded={true} w="full" h="full" rounded="full">
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
                        }}
                        h="full"
                        w="full"
                        rounded="full"
                        alt="Profile Picture"
                        borderColor="amber.100"
                        borderWidth="4"
                    />
                </Skeleton>
            </AspectRatio>
        </Box>
    )
}

export default Index
