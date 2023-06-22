import { useState } from "react"
import { Platform } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import AntDesign from "@expo/vector-icons/AntDesign"
import {
  FormControl,
  IconButton,
  Input,
  KeyboardAvoidingView,
} from "native-base"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface FormControllerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  required?: boolean
  password?: boolean
}

function FormControllerTextInput<T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  password = false,
}: FormControllerProps<T>) {
  const [show, setShow] = useState(false)
  return (
    <Controller
      control={control}
      rules={{ required }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <FormControl isRequired isInvalid={!!error}>
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            key={name}
            autoCapitalize="none"
            onChangeText={onChange as (i: string) => void}
            onBlur={onBlur}
            value={value}
            type={password && !show ? "password" : "text"}
            InputRightElement={
              password ? (
                <IconButton
                  onPress={() => setShow((curr) => !curr)}
                  colorScheme="primary"
                  variant="outline"
                  rounded="0"
                  borderColor="transparent"
                  _icon={{
                    as: Ionicons,
                    name: show ? "eye" : "eye-off",
                  }}
                  size="sm"
                />
              ) : undefined
            }
          />
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </FormControl>
      )}
      name={name}
    />
  )
}

export default FormControllerTextInput
