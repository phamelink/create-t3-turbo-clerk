import { useState } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import AntDesign from "@expo/vector-icons/AntDesign"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import {
    FormControl,
    IconButton,
    Input,
    KeyboardAvoidingView,
    type IInputProps,
} from "native-base"
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
    type PathValue,
} from "react-hook-form"

interface FormControllerProps<T extends FieldValues> extends IInputProps {
    control: Control<T>
    name: Path<T>
    label: string
    required?: boolean
    password?: boolean
    isDate?: boolean
}

function FormControllerTextInput<T extends FieldValues>({
    name,
    control,
    label,
    required = false,
    password = false,
    isDate = false,
    ...props
}: FormControllerProps<T>) {
    const [show, setShow] = useState(false)

    if (isDate) {
        return (
            <Controller
                control={control}
                rules={{ required }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <FormControl
                        isRequired={required}
                        isInvalid={!!error}
                        flexDir="row"
                        my="3"
                        alignItems="center"
                    >
                        <FormControl.Label>{label}</FormControl.Label>
                        <RNDateTimePicker
                            mode="date"
                            value={value ? new Date(value) : new Date()}
                            onChange={(e, d) => {
                                if (!d) {
                                    onChange("" as PathValue<T, Path<T>>)
                                } else {
                                    onChange(
                                        d.toISOString() as PathValue<
                                            T,
                                            Path<T>
                                        >,
                                    )
                                }
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {error?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                )}
                name={name}
            />
        )
    }

    return (
        <Controller
            control={control}
            rules={{ required }}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FormControl isRequired={required} isInvalid={!!error}>
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
                            {...props}
                        />
                        <FormControl.ErrorMessage>
                            {error?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </TouchableWithoutFeedback>
            )}
            name={name}
        />
    )
}

export default FormControllerTextInput
