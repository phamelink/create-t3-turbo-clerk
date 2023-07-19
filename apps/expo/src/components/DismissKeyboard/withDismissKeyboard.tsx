import { type ComponentType } from "react"
import {
    Keyboard,
    TouchableWithoutFeedback,
    type ViewProps,
} from "react-native"

export default function withDismissKeyboard<T extends ViewProps>(
    Component: ComponentType<T>,
) {
    return function DismissKeyboardComponent(props: T) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Component {...props} />
            </TouchableWithoutFeedback>
        )
    }
}
