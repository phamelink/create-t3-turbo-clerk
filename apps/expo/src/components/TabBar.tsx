import { type BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Button, Flex, Text } from "native-base"

export default function TabBar({
    state,
    descriptors,
    navigation,
    insets,
}: BottomTabBarProps) {
    // console.log(
    //     "TabBar",
    //     navigation,
    //     JSON.stringify({ state, descriptors, navigation, insets }, null, 2),
    // )

    return (
        <Flex
            safeAreaBottom
            direction="row"
            bg="red.100"
            p={2}
            shadow={2}
            h="100"
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name })
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    })
                }

                return (
                    <Button
                        key={label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                            {label}
                        </Text>
                    </Button>
                )
            })}
        </Flex>
    )
}
