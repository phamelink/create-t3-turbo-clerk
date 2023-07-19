import * as ImagePicker from "expo-image-picker"

import useToast from "./useToast"

export function useImagePicker(options?: ImagePicker.ImagePickerOptions) {
    const { showToast } = useToast()
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync(
                options || {
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                },
            )

            if (result.canceled) {
                showToast({ description: "You did not select any image." })

                return null
            }

            const [asset] = result.assets

            if (!asset) {
                throw new Error("No asset found")
            }

            const resp = await fetch(asset.uri)
            const imageBody = await resp.blob()

            return { imageBody, imageUri: asset.uri }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
            showToast({
                error: "Something went wrong while selecting your image.",
            })

            return null
        }
    }

    return { pickImage }
}
