import { Platform } from "react-native"
import {
  Box,
  KeyboardAvoidingView as NBKeyboardAvoidingView,
} from "native-base"
import { type InterfaceKeyboardAvoidingViewProps } from "native-base/lib/typescript/components/basic/KeyboardAvoidingView/types"
import { type InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box"

const BEHAVIOR = Platform.OS === "ios" ? "padding" : undefined

const KeyboardAvoidingView = ({
  children,
  ...props
}: InterfaceKeyboardAvoidingViewProps) => {
  return (
    <NBKeyboardAvoidingView behavior={BEHAVIOR} flex={1} {...props}>
      {children}
    </NBKeyboardAvoidingView>
  )
}

export default KeyboardAvoidingView
