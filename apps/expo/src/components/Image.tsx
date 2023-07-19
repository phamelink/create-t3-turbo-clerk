import { Component } from "react"
import { Image, type ImageProps } from "expo-image"
import { Factory, type IImageProps } from "native-base"

type IProps = Omit<IImageProps & ImageProps, "children">

function CustomImage(props: IProps) {
    const MyImage = Factory(Image)

    return <MyImage {...props} />
}

export default CustomImage
