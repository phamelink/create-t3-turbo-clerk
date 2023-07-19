/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef } from "react"
import {
    Alert,
    useToast as useToastNB,
    type IAlertProps,
    type IToastProps,
} from "native-base"

interface CustomToastProps extends IToastProps {
    error?: string | null
    status?: IAlertProps["status"]
}

// type a = IToastProps["status"]

export default function useToast() {
    const toast = useToastNB()

    const toastId = useRef(null)

    const show = ({ error, status, ...props }: CustomToastProps) => {
        if (toastId.current) {
            toast.close(toastId.current)
        }

        toastId.current = toast.show({
            render: () => (
                <Alert
                    status={error ? "error" : status ?? "info"}
                    variant="left-accent"
                >
                    {error ? error : props.description}
                </Alert>
            ),
            ...props,
        })
    }

    const cancel = (id: string | number) => toast.close(id)

    return {
        showToast: show,
        cancelToast: cancel,
    }
}
