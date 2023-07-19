import { Stack } from "expo-router"

const _layout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "white",
                },
                animation: "fade",
            }}
        ></Stack>
    )
}

export default _layout
