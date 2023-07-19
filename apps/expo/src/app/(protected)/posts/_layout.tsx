import { Stack } from "expo-router"

const _layout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "transparent",
                },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="addPost" />
        </Stack>
    )
}

export default _layout
